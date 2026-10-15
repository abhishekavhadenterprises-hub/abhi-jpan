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
 * Clay3DAssemblyComponent
 * Form: Annual General Meeting Delegation Chamber & Curved Conference Dais
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DAssemblyComponent({
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

      // 1. Curved Assembly Table / Dais
      const daisCurve = new THREE.CylinderGeometry(0.9, 0.9, 0.22, 32, 1, false, 0, Math.PI);
      const dais = new THREE.Mesh(daisCurve, accentMaterial);
      dais.position.set(0, -0.4, 0);
      dais.rotation.x = Math.PI / 2.2;
      modelGroup.add(dais);

      // 2. Center Speaker / Chair Figure
      const centerHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 16), bodyMaterial);
      centerHead.position.set(0, 0.35, 0);
      modelGroup.add(centerHead);

      const centerTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.32, 0.45, 20), accentMaterial);
      centerTorso.position.set(0, -0.05, 0);
      modelGroup.add(centerTorso);

      // 3. Left Delegate Figure
      const leftHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 14), ringMaterial);
      leftHead.position.set(-0.52, 0.2, -0.15);
      modelGroup.add(leftHead);

      const leftTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 0.38, 18), bodyMaterial);
      leftTorso.position.set(-0.52, -0.12, -0.15);
      modelGroup.add(leftTorso);

      // 4. Right Delegate Figure
      const rightHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 14), ringMaterial);
      rightHead.position.set(0.52, 0.2, -0.15);
      modelGroup.add(rightHead);

      const rightTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 0.38, 18), bodyMaterial);
      rightTorso.position.set(0.52, -0.12, -0.15);
      modelGroup.add(rightTorso);

      // --- BLUE LINES ON HOVER ---
      const daisArcPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 20; i++) {
        const angle = (i / 20) * Math.PI;
        daisArcPoints.push(new THREE.Vector3(Math.cos(angle) * 0.92, -0.38, Math.sin(angle) * 0.4 + 0.15));
      }
      const daisArcCurve = new THREE.CatmullRomCurve3(daisArcPoints);
      const daisArcGeo = new THREE.TubeGeometry(daisArcCurve, 20, 0.016, 8, false);
      modelGroup.add(new THREE.Mesh(daisArcGeo, blueLineMaterial));

      const centerRing = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.016, 12, 24), blueLineMaterial);
      centerRing.position.set(0, 0.35, 0);
      centerRing.rotation.x = Math.PI / 2;
      modelGroup.add(centerRing);

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("assembly-chamber", buildScene, size);

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
