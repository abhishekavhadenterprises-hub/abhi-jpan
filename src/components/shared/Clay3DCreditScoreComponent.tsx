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
 * Clay3DCreditScoreComponent
 * Form: Credit Rating Gauge Meter with High-Tier Upward Needle & Pivot Hub
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DCreditScoreComponent({
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

      // 1. Semi-Circular Gauge Outer Dial Arc
      const gaugeArc = new THREE.CylinderGeometry(1.0, 1.0, 0.25, 32, 1, false, 0, Math.PI);
      const dialMesh = new THREE.Mesh(gaugeArc, bodyMaterial);
      dialMesh.position.set(0, -0.15, 0);
      dialMesh.rotation.x = Math.PI / 2.2;
      modelGroup.add(dialMesh);

      // Inner Recessed Gauge Face
      const innerFace = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.3, 24, 1, false, 0, Math.PI), accentMaterial);
      innerFace.position.set(0, -0.15, 0.02);
      innerFace.rotation.x = Math.PI / 2.2;
      modelGroup.add(innerFace);

      // 2. Center Pivot Hub Disc
      const hubMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.2, 24), ringMaterial);
      hubMesh.position.set(0, -0.15, 0.18);
      hubMesh.rotation.x = Math.PI / 2.2;
      modelGroup.add(hubMesh);

      // 3. Upward Rating Indicator Needle
      const needleCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, -0.15, 0.22),
        new THREE.Vector3(0.48, 0.55, 0.22)
      );
      const needleMesh = new THREE.Mesh(new THREE.TubeGeometry(needleCurve, 16, 0.05, 14, false), ringMaterial);
      modelGroup.add(needleMesh);

      const needleTip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.25, 14), accentMaterial);
      needleTip.position.set(0.52, 0.6, 0.22);
      needleTip.rotation.z = -Math.PI / 4.5;
      modelGroup.add(needleTip);

      // --- BLUE LINES ON HOVER ---
      const arcPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 24; i++) {
        const angle = (i / 24) * Math.PI;
        arcPoints.push(new THREE.Vector3(
          Math.cos(angle) * 1.02,
          -0.15 + Math.sin(angle) * 0.95,
          0.16
        ));
      }
      const arcCurve = new THREE.CatmullRomCurve3(arcPoints);
      const arcGeo = new THREE.TubeGeometry(arcCurve, 24, 0.016, 8, false);
      modelGroup.add(new THREE.Mesh(arcGeo, blueLineMaterial));

      const needleLine = new THREE.Mesh(new THREE.TubeGeometry(needleCurve, 16, 0.018, 10, false), blueLineMaterial);
      needleLine.position.z += 0.02;
      modelGroup.add(needleLine);

      const hubBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.018, 12, 28), blueLineMaterial);
      hubBlueRing.position.set(0, -0.15, 0.24);
      modelGroup.add(hubBlueRing);

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("credit-gauge", buildScene, size);

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
