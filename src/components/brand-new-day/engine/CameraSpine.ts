import * as THREE from 'three';
import { ScrollState, clamp01, smoothstep, lerp } from './types';
import { CONDUIT_TABLE } from './ConduitSystem';

export class CameraSpine {
  public camera: THREE.PerspectiveCamera;
  private defaultUp = new THREE.Vector3(0, 1, 0);

  constructor() {
    this.camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Explicit rotation order 'YXZ' to prevent Euler roll leakage
    this.camera.rotation.order = 'YXZ';
    this.camera.up.set(0, 1, 0);
  }

  /**
   * Pure deterministic spine path evaluated at spVal [0, 1]
   * Smoothstepped at rest waypoints, LINEAR through the high-speed corridor legs
   * with gear changes 300 -> 150 -> 360 units per unit of sp
   */
  public getSpinePosition(spVal: number): THREE.Vector3 {
    const sp = clamp01(spVal);
    const pos = new THREE.Vector3();

    // Act 1 (sp: 0 -> 0.22): Rest viewing of the 40k bead pipe figure at (0, 9, 0)
    // Camera starts at (0, 9, 24) and orbits smoothly
    if (sp <= 0.22) {
      const t = smoothstep(0, 0.22, sp);
      // Gentle dolly-in from 26 to 18
      pos.x = Math.sin(t * 0.45) * 2.5;
      pos.y = lerp(9.0, 8.5, t);
      pos.z = lerp(26.0, 16.0, t);
      return pos;
    }

    // Corridor Transition (sp: 0.22 -> 0.27): Smoothstep acceleration into corridor
    if (sp <= 0.27) {
      const t = smoothstep(0.22, 0.27, sp);
      pos.x = lerp(Math.sin(0.45) * 2.5, 0.0, t);
      pos.y = lerp(8.5, 7.0, t);
      pos.z = lerp(16.0, 0.0, t);
      return pos;
    }

    // Corridor Legs (sp: 0.27 -> 0.78):
    // GEAR 1 (0.27 -> 0.38): 300 units/sp
    // GEAR 2 (0.38 -> 0.45): 150 units/sp (strand pulls taut across)
    // GEAR 3 (0.45 -> 0.78): 360 units/sp (rapid corridor plunge)
    const zBase = 0.0;
    if (sp <= 0.38) {
      const dt = sp - 0.27; // 0 -> 0.11
      pos.x = 0;
      pos.y = 7.0;
      pos.z = zBase - dt * 300.0; // drops from 0 to -33
      return pos;
    }

    const zGear1End = zBase - 0.11 * 300.0; // -33.0

    if (sp <= 0.45) {
      const dt = sp - 0.38; // 0 -> 0.07
      pos.x = 0;
      pos.y = 7.0;
      pos.z = zGear1End - dt * 150.0; // drops from -33 to -43.5
      return pos;
    }

    const zGear2End = zGear1End - 0.07 * 150.0; // -43.5

    if (sp <= 0.78) {
      const dt = sp - 0.45; // 0 -> 0.33
      pos.x = 0;
      pos.y = 7.0;
      pos.z = zGear2End - dt * 360.0; // drops from -43.5 to -162.3
      return pos;
    }

    // Act 5 deceleration into Act 6 (sp: 0.78 -> 1.0)
    const zGear3End = zGear2End - 0.33 * 360.0; // -162.3
    const tDecel = smoothstep(0.78, 1.0, sp);
    pos.x = 0;
    pos.y = lerp(7.0, 8.0, tDecel);
    pos.z = lerp(zGear3End, zGear3End - 45.0, tDecel);
    return pos;
  }

  /**
   * Evaluates camera position and orientation as a pure function of scrollState
   */
  public update(state: ScrollState, sceneFog?: THREE.FogExp2 | THREE.Fog) {
    const { p, sp, mouseX, mouseY, reducedMotion } = state;

    // 1. Get base spine position
    const spinePos = this.getSpinePosition(sp);
    const camPos = spinePos.clone();

    // 2. Look target (holds the view axis forward)
    let lookTarget: THREE.Vector3;
    if (sp <= 0.22) {
      // Look at the center of the bead cloud figure
      lookTarget = new THREE.Vector3(0, 9.0, 0);
    } else {
      // In corridor: look forward down -Z (never add swing offset to look target!)
      lookTarget = new THREE.Vector3(0, camPos.y, camPos.z - 45.0);
    }

    // 3. S-WEAVE SWING: Add positional offset to camera from the conduit table
    // u runs 0.08 - 0.82 of each strand's life
    let lateralOffset = 0.0;
    let verticalDip = 0.0;
    let bankAngle = 0.0;

    const swingAmpMultiplier = reducedMotion ? 0.0 : 1.0;

    for (let i = 0; i < CONDUIT_TABLE.length; i++) {
      const entry = CONDUIT_TABLE[i];
      const localT = (sp - entry.at) / entry.span;

      // Envelope u in [0.08, 0.82]
      if (localT >= 0.08 && localT <= 0.82) {
        const u = (localT - 0.08) / (0.82 - 0.08); // [0, 1]
        const sinU = Math.sin(Math.PI * u); // exactly zero at both ends!

        // Lateral swing: side * 3.2 * sin(pi*u)
        lateralOffset += entry.side * 3.2 * sinU * swingAmpMultiplier;
        // Vertical dip: 1.5 dip so you pass under anchor
        verticalDip -= 1.5 * sinU * swingAmpMultiplier;
        // Bank: 0.15 rad into the turn
        bankAngle += -entry.side * 0.15 * sinU * swingAmpMultiplier;
      }
    }

    // Add swing to position ONLY (never to look target!)
    camPos.x += lateralOffset;
    camPos.y += verticalDip;

    // Mouse parallax (subtle)
    if (sp <= 0.22) {
      camPos.x += mouseX * 0.8;
      camPos.y += mouseY * 0.5;
    }

    this.camera.position.copy(camPos);

    // 4. Rodrigues Banking: Rotate UP vector about view axis
    // View direction
    const forward = new THREE.Vector3().subVectors(lookTarget, camPos).normalize();
    const up = this.defaultUp.clone();

    if (Math.abs(bankAngle) > 0.001) {
      // Clamp max bank to ~15 deg (0.26 rad)
      const clampedBank = Math.max(-0.26, Math.min(0.26, bankAngle));
      // Rodrigues formula: v_rot = v*cos(th) + (k x v)*sin(th) + k*(k.v)*(1-cos(th))
      const k = forward;
      const cosTh = Math.cos(clampedBank);
      const sinTh = Math.sin(clampedBank);
      const kCrossUp = new THREE.Vector3().crossVectors(k, up);
      const kDotUp = k.dot(up);

      up.copy(
        up.clone().multiplyScalar(cosTh)
          .add(kCrossUp.multiplyScalar(sinTh))
          .add(k.clone().multiplyScalar(kDotUp * (1 - cosTh)))
      ).normalize();
    }

    this.camera.up.copy(up);
    this.camera.lookAt(lookTarget);

    // 5. Act 6 Closing Wipe: Fog far closes down so the far end dissolves smoothly
    if (sceneFog && 'density' in sceneFog) {
      // Act 6 runs on raw p in [0.82, 1.0]
      if (p > 0.82) {
        const wipeT = clamp01((p - 0.82) / 0.18);
        sceneFog.density = lerp(0.003, 0.055, smoothstep(0, 1, wipeT));
      } else {
        sceneFog.density = 0.003;
      }
    }
  }

  public setAspect(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
