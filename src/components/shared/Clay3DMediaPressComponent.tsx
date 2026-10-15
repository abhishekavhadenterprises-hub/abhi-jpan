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
 * Clay3DMediaPressComponent
 * Form: Public Broadcast Megaphone / Press Bullhorn
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DMediaPressComponent({
  isHovered = false,
  className,
  size = 100,
}: Clay3DProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(-0.1, 0, 0);
      scene.add(modelGroup);

      // 1. Conical Megaphone Horn
      const hornGeo = new THREE.CylinderGeometry(0.75, 0.35, 1.25, 32, 1, true);
      const horn = new THREE.Mesh(hornGeo, bodyMaterial);
      horn.position.set(0.35, 0.15, 0);
      horn.rotation.z = -Math.PI / 2.8;
      modelGroup.add(horn);

      // Flared Horn Mouth Lip
      const mouthLip = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.065, 16, 32), accentMaterial);
      mouthLip.position.set(0.88, 0.48, 0);
      mouthLip.rotation.y = Math.PI / 2.8;
      mouthLip.rotation.x = Math.PI / 2;
      modelGroup.add(mouthLip);

      // 2. Rear Acoustic Driver Housing
      const driverGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.55, 24);
      const driver = new THREE.Mesh(driverGeo, accentMaterial);
      driver.position.set(-0.35, -0.25, 0);
      driver.rotation.z = -Math.PI / 2.8;
      modelGroup.add(driver);

      const driverDome = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 16), ringMaterial);
      driverDome.position.set(-0.58, -0.38, 0);
      driverDome.scale.set(0.6, 1, 1);
      modelGroup.add(driverDome);

      // 3. Ergonomic Pistol Grip Handle
      const handleCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.25, -0.22, 0),
        new THREE.Vector3(-0.35, -0.65, 0),
        new THREE.Vector3(-0.48, -0.95, 0),
        new THREE.Vector3(-0.38, -1.15, 0)
      );
      const handleMesh = new THREE.Mesh(
        new THREE.TubeGeometry(handleCurve, 20, 0.1, 16, false),
        accentMaterial
      );
      modelGroup.add(handleMesh);

      // --- BLUE LINES ON HOVER ---
      const mouthBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.77, 0.018, 12, 36), blueLineMaterial);
      mouthBlueRing.position.set(0.88, 0.48, 0);
      mouthBlueRing.rotation.y = Math.PI / 2.8;
      mouthBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(mouthBlueRing);

      const hornLine = new THREE.LineCurve3(
        new THREE.Vector3(-0.15, -0.12, 0.36),
        new THREE.Vector3(0.85, 0.45, 0.72)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(hornLine, 16, 0.016, 10, false), blueLineMaterial));

      const driverBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.018, 12, 28), blueLineMaterial);
      driverBlueRing.position.set(-0.12, -0.12, 0);
      driverBlueRing.rotation.y = Math.PI / 2.8;
      driverBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(driverBlueRing);

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("media-press", buildScene, size);

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
