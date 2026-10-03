import * as THREE from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { ConduitEntry, ScrollState, clamp01 } from './types';

// The Single Shared Drive Table
export const CONDUIT_TABLE: ConduitEntry[] = [
  { at: 0.270, span: 0.078, side: -1, radius: 4.3, lift: 2.5, lead: 4.3 * 3.8 },
  { at: 0.315, span: 0.074, side:  1, radius: 4.1, lift: 2.3, lead: 4.1 * 3.8 },
  { at: 0.360, span: 0.070, side: -1, radius: 3.9, lift: 2.2, lead: 3.9 * 3.8 },
  { at: 0.398, span: 0.065, side:  1, radius: 3.7, lift: 2.1, lead: 3.7 * 3.8 },
  { at: 0.433, span: 0.060, side: -1, radius: 3.5, lift: 2.0, lead: 3.5 * 3.8 },
  { at: 0.464, span: 0.056, side:  1, radius: 3.4, lift: 1.9, lead: 3.4 * 3.8 },
];

export class ConduitSystem {
  public group: THREE.Group;
  private lineMesh: LineSegments2 | null = null;
  private geometry: LineSegmentsGeometry | null = null;
  private material: LineMaterial | null = null;

  private segmentsPerStrand: number;
  private totalSegments: number;
  private posBuffer: Float32Array;
  private colorBuffer: Float32Array;

  // Stride 6 layout: [x1, y1, z1, x2, y2, z2] per segment
  constructor(isMobile: boolean = false) {
    this.group = new THREE.Group();
    // Fewer segments per strand on mobile, NEVER fewer strands!
    this.segmentsPerStrand = isMobile ? 18 : 36;
    this.totalSegments = CONDUIT_TABLE.length * this.segmentsPerStrand;

    this.posBuffer = new Float32Array(this.totalSegments * 6);
    this.colorBuffer = new Float32Array(this.totalSegments * 6);

    this.init();
  }

  private init() {
    this.geometry = new LineSegmentsGeometry();
    this.geometry.setPositions(this.posBuffer);
    this.geometry.setColors(this.colorBuffer);

    // Fat lines: LineMaterial with linewidth 2.4, screen space, additive blending
    this.material = new LineMaterial({
      color: 0xffffff,
      linewidth: 2.4, // fat line in screen pixels
      vertexColors: true,
      dashed: false,
      alphaToCoverage: false,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    });

    this.lineMesh = new LineSegments2(this.geometry, this.material);
    this.lineMesh.computeLineDistances();
    this.group.add(this.lineMesh);
  }

  public setResolution(width: number, height: number) {
    if (this.material) {
      this.material.resolution.set(width, height);
    }
  }

  /**
   * Update fat lines in-place into persistent Float32 stride-6 buffer
   * Never reallocating!
   */
  public update(state: ScrollState, getSpinePosition: (spVal: number) => THREE.Vector3) {
    if (!this.geometry || !this.material) return;

    const { sp } = state;
    const pos = this.posBuffer;
    const col = this.colorBuffer;

    // Bone-50 base color at 1.25 gain (deliberately over bloom threshold 1.15)
    // #f2f3f5 -> rgb(0.949, 0.953, 0.961) * 1.25 = (1.186, 1.191, 1.201)
    const boneR = 0.95 * 1.25;
    const boneG = 0.95 * 1.25;
    const boneB = 0.96 * 1.25;

    // Scarlet #e0202b
    const scarletR = 0.88;
    const scarletG = 0.12;
    const scarletB = 0.17;

    let segmentOffset = 0;

    for (let i = 0; i < CONDUIT_TABLE.length; i++) {
      const entry = CONDUIT_TABLE[i];
      // Local t for this strand [0, 1]
      const localT = (sp - entry.at) / entry.span;

      // Anchor derived from camera spine: spine(at) + (side * radius, lift, -lead)
      const spineAt = getSpinePosition(entry.at);
      const anchor = new THREE.Vector3(
        spineAt.x + entry.side * entry.radius,
        spineAt.y + entry.lift,
        spineAt.z - entry.lead
      );

      // Camera / muzzle origin at current sp
      const origin = getSpinePosition(Math.max(0, Math.min(1, sp)));
      // Offset muzzle slightly down & right/left from camera eye
      origin.x += entry.side * 0.45;
      origin.y -= 0.35;
      origin.z -= 0.6;

      if (localT < 0 || localT > 1.0) {
        // Strand is dead: collapse segments to origin with zero color
        for (let s = 0; s < this.segmentsPerStrand; s++) {
          const idx = (segmentOffset + s) * 6;
          pos[idx + 0] = origin.x; pos[idx + 1] = origin.y; pos[idx + 2] = origin.z;
          pos[idx + 3] = origin.x; pos[idx + 4] = origin.y; pos[idx + 5] = origin.z;

          col[idx + 0] = 0; col[idx + 1] = 0; col[idx + 2] = 0;
          col[idx + 3] = 0; col[idx + 4] = 0; col[idx + 5] = 0;
        }
        segmentOffset += this.segmentsPerStrand;
        continue;
      }

      // 4 PHASES:
      // FIRE 0.0 - 0.12: free end shoots out to anchor
      // TAUT 0.12 - 0.55: near-zero sag
      // RELEASE 0.55 - 0.80: sag grows, wave travels
      // FADE 0.80 - 1.0: fades out
      let fireProgress = 1.0;
      let sagAmp = 0.0;
      let wavePhase = 0.0;
      let alphaFade = 1.0;
      let scarletImpulse = 0.0;

      if (localT < 0.12) {
        fireProgress = localT / 0.12;
        // Scarlet impulse mixed at firing tip (not added to prevent white-out wash)
        scarletImpulse = 1.0 - fireProgress * 0.7;
        sagAmp = 0.02;
      } else if (localT < 0.55) {
        // Taut: near zero sag
        fireProgress = 1.0;
        sagAmp = 0.04;
      } else if (localT < 0.80) {
        // Release: sag grows, wave travels it
        fireProgress = 1.0;
        const relT = (localT - 0.55) / 0.25;
        sagAmp = 0.04 + relT * 1.85;
        wavePhase = relT * Math.PI * 4.0;
      } else {
        // Fade: 0.80 -> 1.0
        fireProgress = 1.0;
        sagAmp = 1.85;
        alphaFade = 1.0 - (localT - 0.80) / 0.20;
      }

      // Generate chain of points from origin to currentTarget
      const currentTarget = new THREE.Vector3().lerpVectors(origin, anchor, fireProgress);

      let prevPoint = origin.clone();

      for (let s = 0; s < this.segmentsPerStrand; s++) {
        const u = (s + 1) / this.segmentsPerStrand;
        const pt = new THREE.Vector3().lerpVectors(origin, currentTarget, u);

        // Sag: parabolic drop under gravity + sinusoidal traveling wave
        const parabolicSag = Math.sin(u * Math.PI) * sagAmp;
        const wave = Math.sin(u * 6.0 - wavePhase) * (sagAmp * 0.35);
        pt.y -= (parabolicSag + wave);

        const idx = (segmentOffset + s) * 6;
        pos[idx + 0] = prevPoint.x;
        pos[idx + 1] = prevPoint.y;
        pos[idx + 2] = prevPoint.z;
        pos[idx + 3] = pt.x;
        pos[idx + 4] = pt.y;
        pos[idx + 5] = pt.z;

        // Color computation: Bone 1.25 gain with scarlet mix impulse at tip
        // In additive blending, fade MUST live in vertex colors
        const segMix = s / this.segmentsPerStrand;
        const isTip = segMix > 0.85 ? (segMix - 0.85) / 0.15 : 0;
        const impulse = scarletImpulse * isTip;

        // Mix scarlet into bone (rather than straight add)
        const finalR = (boneR * (1.0 - impulse) + scarletR * impulse * 1.3) * alphaFade;
        const finalG = (boneG * (1.0 - impulse) + scarletG * impulse * 0.3) * alphaFade;
        const finalB = (boneB * (1.0 - impulse) + scarletB * impulse * 0.4) * alphaFade;

        col[idx + 0] = finalR; col[idx + 1] = finalG; col[idx + 2] = finalB;
        col[idx + 3] = finalR; col[idx + 4] = finalG; col[idx + 5] = finalB;

        prevPoint.copy(pt);
      }

      segmentOffset += this.segmentsPerStrand;
    }

    // In-place updates to instanced line buffers
    this.geometry.setPositions(this.posBuffer);
    this.geometry.setColors(this.colorBuffer);
  }

  public dispose() {
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
  }
}
