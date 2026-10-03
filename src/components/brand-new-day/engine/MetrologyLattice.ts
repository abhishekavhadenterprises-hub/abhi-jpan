import * as THREE from 'three';
import { ScrollState, clamp01, smoothstep } from './types';

export class MetrologyLattice {
  public group: THREE.Group;

  // Act 1: Procedural wireframe cage
  private latticeLineSegments: THREE.LineSegments | null = null;
  private latticeGeometry: THREE.BufferGeometry | null = null;
  private basePositions: Float32Array;
  private currentPositions: Float32Array;
  private segmentMeta: Array<{ startT: number; endT: number; threshold: number }>;
  private segmentCount = 280;

  // Act 2: Three nested wireframe cylinders
  private cylinderInner: THREE.LineSegments | null = null;
  private cylinderMid: THREE.LineSegments | null = null;
  private cylinderOuter: THREE.LineSegments | null = null;

  // Horizon bar
  private horizonBar: THREE.Mesh | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.basePositions = new Float32Array(this.segmentCount * 6);
    this.currentPositions = new Float32Array(this.segmentCount * 6);
    this.segmentMeta = [];

    this.buildLattice();
    this.buildGridRoom();
    this.buildHorizon();
  }

  private buildLattice() {
    // Generate a bounding cage around the figure (centered at y = 9.0, width 12, height 16, depth 6)
    const bounds = { minX: -6.0, maxX: 6.0, minY: 1.5, maxY: 16.5, minZ: -3.0, maxZ: 3.0 };
    
    // Seeded random
    let seed = 42;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    const pos = this.basePositions;
    for (let i = 0; i < this.segmentCount; i++) {
      // Pick random segment in cage volume
      const isVertical = rand() > 0.5;
      let x1 = bounds.minX + rand() * (bounds.maxX - bounds.minX);
      let y1 = bounds.minY + rand() * (bounds.maxY - bounds.minY);
      let z1 = bounds.minZ + rand() * (bounds.maxZ - bounds.minZ);

      let x2 = x1, y2 = y1, z2 = z1;
      if (isVertical) {
        y2 = Math.min(bounds.maxY, y1 + 1.5 + rand() * 3.5);
      } else {
        const dx = (rand() - 0.5) * 4.0;
        const dz = (rand() - 0.5) * 2.5;
        x2 = Math.max(bounds.minX, Math.min(bounds.maxX, x1 + dx));
        z2 = Math.max(bounds.minZ, Math.min(bounds.maxZ, z1 + dz));
      }

      pos[i * 6 + 0] = x1;
      pos[i * 6 + 1] = y1;
      pos[i * 6 + 2] = z1;
      pos[i * 6 + 3] = x2;
      pos[i * 6 + 4] = y2;
      pos[i * 6 + 5] = z2;

      // Staggered build scalar threshold [0.02, 0.20]
      const threshold = 0.02 + rand() * 0.16;
      this.segmentMeta.push({
        startT: threshold,
        endT: Math.min(0.24, threshold + 0.05 + rand() * 0.04),
        threshold
      });
    }

    this.currentPositions.set(this.basePositions);
    this.latticeGeometry = new THREE.BufferGeometry();
    this.latticeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.currentPositions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    // Scarlet / Cobalt wireframe
    const latticeMaterial = new THREE.LineBasicMaterial({
      color: 0xe0202b, // scarlet accent for the figure's enclosure in Act 1
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.latticeLineSegments = new THREE.LineSegments(this.latticeGeometry, latticeMaterial);
    this.group.add(this.latticeLineSegments);
  }

  private buildGridRoom() {
    // Three nested wireframe cylinders at r = 9.0 / 13.95 / 19.8
    // rotateX(PI/2) so the axis runs down -Z, camera inside.
    const cobaltColor = 0x2b4fd0; // Raw cobalt 500
    const cylinderMaterial = new THREE.LineBasicMaterial({
      color: cobaltColor,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const createCylinderSegments = (radius: number, length: number, radialSegs: number, heightSegs: number) => {
      const geom = new THREE.CylinderGeometry(radius, radius, length, radialSegs, heightSegs, true);
      const wireGeom = new THREE.WireframeGeometry(geom);
      const line = new THREE.LineSegments(wireGeom, cylinderMaterial.clone());
      // RotateX(PI/2) to orient down -Z
      line.rotation.x = Math.PI / 2;
      // Center along the corridor trajectory (running -Z from 0 to -350)
      line.position.set(0, 7.0, -140);
      return line;
    };

    const tunnelLength = 380;
    this.cylinderInner = createCylinderSegments(9.0, tunnelLength, 24, 40);
    this.cylinderMid = createCylinderSegments(13.95, tunnelLength, 32, 50);
    this.cylinderOuter = createCylinderSegments(19.8, tunnelLength, 40, 60);

    this.group.add(this.cylinderInner);
    this.group.add(this.cylinderMid);
    this.group.add(this.cylinderOuter);
  }

  private buildHorizon() {
    // One thin horizon bar only (no finite ground plane that cuts off)
    const barGeom = new THREE.PlaneGeometry(160, 0.12);
    const barMat = new THREE.MeshBasicMaterial({
      color: 0x75666a, // bone-500
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.horizonBar = new THREE.Mesh(barGeom, barMat);
    this.horizonBar.position.set(0, 0.05, -120);
    this.group.add(this.horizonBar);
  }

  /**
   * Pure deterministic function of scrollState
   */
  public update(state: ScrollState) {
    const { sp } = state;

    // 1. Act 1: Weave and un-weave lattice
    if (this.latticeGeometry && this.latticeLineSegments) {
      const pos = this.currentPositions;
      const base = this.basePositions;

      // In Act 1 (sp: 0 -> 0.22), segments draw from one end as build scalar passes threshold
      // Beyond sp > 0.22, lattice unweaves / dissolves
      for (let i = 0; i < this.segmentCount; i++) {
        const meta = this.segmentMeta[i];
        let progress = 0;

        if (sp <= 0.22) {
          progress = smoothstep(meta.startT, meta.endT, sp);
        } else {
          // Unweave smoothly
          const unweaveT = smoothstep(0.22, 0.32, sp);
          progress = Math.max(0, 1.0 - unweaveT);
        }

        const x1 = base[i * 6 + 0];
        const y1 = base[i * 6 + 1];
        const z1 = base[i * 6 + 2];
        const x2 = base[i * 6 + 3];
        const y2 = base[i * 6 + 4];
        const z2 = base[i * 6 + 5];

        // Vertex 1 stays at x1,y1,z1; Vertex 2 extends towards x2,y2,z2
        pos[i * 6 + 0] = x1;
        pos[i * 6 + 1] = y1;
        pos[i * 6 + 2] = z1;
        pos[i * 6 + 3] = x1 + (x2 - x1) * progress;
        pos[i * 6 + 4] = y1 + (y2 - y1) * progress;
        pos[i * 6 + 5] = z1 + (z2 - z1) * progress;
      }

      this.latticeGeometry.attributes.position.needsUpdate = true;
      const latMat = this.latticeLineSegments.material as THREE.LineBasicMaterial;
      latMat.opacity = sp < 0.32 ? (1.0 - smoothstep(0.24, 0.32, sp)) * 0.75 : 0;
      this.latticeLineSegments.visible = latMat.opacity > 0.01;
    }

    // 2. Act 2: Grid Room counter-rotation drift
    // Drift: 0.055 / -0.03 / 0.014 (outer shell counter-rotates!)
    // As a pure function of sp (deterministic!):
    const corridorActive = smoothstep(0.12, 0.24, sp) * (1.0 - smoothstep(0.82, 0.98, sp));

    if (this.cylinderInner) {
      this.cylinderInner.rotation.z = sp * 0.055 * 80.0;
      (this.cylinderInner.material as THREE.LineBasicMaterial).opacity = 0.22 * corridorActive;
      this.cylinderInner.visible = corridorActive > 0.005;
    }

    if (this.cylinderMid) {
      // Counter-rotates!
      this.cylinderMid.rotation.z = sp * -0.030 * 80.0;
      (this.cylinderMid.material as THREE.LineBasicMaterial).opacity = 0.18 * corridorActive;
      this.cylinderMid.visible = corridorActive > 0.005;
    }

    if (this.cylinderOuter) {
      this.cylinderOuter.rotation.z = sp * 0.014 * 80.0;
      (this.cylinderOuter.material as THREE.LineBasicMaterial).opacity = 0.15 * corridorActive;
      this.cylinderOuter.visible = corridorActive > 0.005;
    }

    if (this.horizonBar) {
      this.horizonBar.visible = sp < 0.85;
    }
  }

  public dispose() {
    if (this.latticeGeometry) this.latticeGeometry.dispose();
    if (this.latticeLineSegments) (this.latticeLineSegments.material as THREE.Material).dispose();
    if (this.cylinderInner) {
      this.cylinderInner.geometry.dispose();
      (this.cylinderInner.material as THREE.Material).dispose();
    }
    if (this.cylinderMid) {
      this.cylinderMid.geometry.dispose();
      (this.cylinderMid.material as THREE.Material).dispose();
    }
    if (this.cylinderOuter) {
      this.cylinderOuter.geometry.dispose();
      (this.cylinderOuter.material as THREE.Material).dispose();
    }
    if (this.horizonBar) {
      this.horizonBar.geometry.dispose();
      (this.horizonBar.material as THREE.Material).dispose();
    }
  }
}
