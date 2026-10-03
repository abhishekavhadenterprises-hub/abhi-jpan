import * as THREE from 'three';
import { clamp01, smoothstep } from './types';

export interface TravelFrame {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  opacity: number;
}

export class FullPageScrollTracker {
  /**
   * Pure deterministic function of scroll scalar p [0, 1] and mouse [-1, 1]
   * Maps smooth flight trajectory throughout the entire webpage
   */
  public evaluate(
    p: number,
    mouseX: number = 0,
    mouseY: number = 0,
    reducedMotion: boolean = false
  ): TravelFrame {
    const rawP = clamp01(p);

    // Lateral weave path across the width of the webpage
    // Oscillates between right side (+3.2) and left side (-3.2)
    const lateralSwing = Math.sin(rawP * Math.PI * 3.2) * 3.4;
    // Vertical float path
    const verticalFloat = Math.cos(rawP * Math.PI * 2.8) * 1.2;
    // Depth path (bringing component closer and further in Z)
    const depthWave = Math.sin(rawP * Math.PI * 2.0) * 1.8;

    // Interactive mouse parallax (subtle)
    const mouseParallaxX = mouseX * 0.75;
    const mouseParallaxY = mouseY * 0.55;

    // Base position
    const pos = new THREE.Vector3(
      lateralSwing + mouseParallaxX,
      verticalFloat + mouseParallaxY,
      depthWave
    );

    // Continuous 3D tumbling rotation as you scroll down the page
    const rotSpeed = reducedMotion ? 0.3 : 1.0;
    const rotX = (rawP * Math.PI * 2.2 * rotSpeed) + mouseY * 0.25 + 0.15;
    const rotY = (rawP * Math.PI * 3.8 * rotSpeed) + mouseX * 0.35 + 0.40;
    const rotZ = Math.sin(rawP * Math.PI * 2.5) * 0.35;

    const rot = new THREE.Euler(rotX, rotY, rotZ, 'YXZ');

    // Scale & Opacity Choreography:
    // 1. Entrance after Hero: scale from 0.85 -> 1.25 as p goes 0.0 -> 0.08
    const enterScale = smoothstep(0.0, 0.08, rawP);
    let scale = (0.85 + enterScale * 0.40);

    // 2. Exit before Globe Section (p: 0.88 -> 1.0):
    // Recede into deep Z and fade opacity to 0 so the Globe section has 100% clean isolation
    let opacity = 1.0;
    if (rawP > 0.86) {
      const exitProgress = smoothstep(0.86, 0.98, rawP);
      pos.z -= exitProgress * 28.0;
      scale = Math.max(0.01, scale * (1.0 - exitProgress * 0.8));
      opacity = 1.0 - exitProgress;
    }

    return {
      position: pos,
      rotation: rot,
      scale,
      opacity,
    };
  }
}
