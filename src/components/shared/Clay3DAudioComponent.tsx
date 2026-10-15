"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DAudioComponent
 * Form: Studio Conference Broadcast Microphone on Suspension Fork Stand
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DAudioComponent({
  isHovered = false,
  className,
  size = 75,
}: Clay3DProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. Microphone Capsule (Cylinder + Dome Cap)
      const capsuleGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.75, 24);
      const capsule = new THREE.Mesh(capsuleGeo, bodyMaterial);
      capsule.position.set(0, 0.25, 0);
      modelGroup.add(capsule);

      const grilleDome = new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 16), accentMaterial);
      grilleDome.position.set(0, 0.62, 0);
      modelGroup.add(grilleDome);

      const capsuleRing = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.04, 14, 28), ringMaterial);
      capsuleRing.position.set(0, 0.25, 0);
      capsuleRing.rotation.x = Math.PI / 2;
      modelGroup.add(capsuleRing);

      // 2. U-Shaped Suspension Cradle Fork
      const uForkCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.6, 0.35, 0),
        new THREE.Vector3(-0.6, -0.4, 0),
        new THREE.Vector3(0.6, -0.4, 0),
        new THREE.Vector3(0.6, 0.35, 0)
      );
      const forkMesh = new THREE.Mesh(new THREE.TubeGeometry(uForkCurve, 24, 0.06, 14, false), accentMaterial);
      modelGroup.add(forkMesh);

      // Pivot Knobs
      const leftKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16), ringMaterial);
      leftKnob.position.set(-0.6, 0.35, 0);
      leftKnob.rotation.z = Math.PI / 2;
      modelGroup.add(leftKnob);

      const rightKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16), ringMaterial);
      rightKnob.position.set(0.6, 0.35, 0);
      rightKnob.rotation.z = Math.PI / 2;
      modelGroup.add(rightKnob);

      // 3. Desk Stand Stem & Base
      const stemGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.45, 16);
      const stem = new THREE.Mesh(stemGeo, accentMaterial);
      stem.position.set(0, -0.55, 0);
      modelGroup.add(stem);

      const baseGeo = new THREE.CylinderGeometry(0.55, 0.62, 0.12, 28);
      const baseMesh = new THREE.Mesh(baseGeo, ringMaterial);
      baseMesh.position.set(0, -0.78, 0);
      modelGroup.add(baseMesh);

      // --- BLUE LINES ON HOVER ---
      const equatorBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.018, 12, 32), blueLineMaterial);
      equatorBlueRing.position.set(0, 0.25, 0);
      equatorBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(equatorBlueRing);

      const forkLine = new THREE.Mesh(new THREE.TubeGeometry(uForkCurve, 24, 0.016, 10, false), blueLineMaterial);
      forkLine.position.z += 0.04;
      modelGroup.add(forkLine);

      const baseBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.018, 12, 32), blueLineMaterial);
      baseBlueRing.position.set(0, -0.76, 0);
      baseBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(baseBlueRing);

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("audio-mic", buildScene, size);

  return (
    <StaticClayView
      base={base}
      hover={hover}
      isHovered={isHovered}
      size={size}
      className={className}
    />
  );
}
