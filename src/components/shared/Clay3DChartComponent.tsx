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
 * Clay3DChartComponent
 * Form: Shareholding Pattern Donut Pie Chart with Elevated Strategic Slice
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DChartComponent({
  isHovered = false,
  className,
  size = 75,
}: Clay3DProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned isometric pose
      modelGroup.rotation.set(0.45, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. Base Donut Arc
      const baseArcGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.3, 32, 1, false, 0, Math.PI * 1.4);
      const baseArc = new THREE.Mesh(baseArcGeo, bodyMaterial);
      modelGroup.add(baseArc);

      // 2. Secondary Equity Segment
      const secArcGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.3, 16, 1, false, Math.PI * 1.4, Math.PI * 0.35);
      const secArc = new THREE.Mesh(secArcGeo, accentMaterial);
      modelGroup.add(secArc);

      // 3. Elevated / Detached Slice
      const sliceGeo = new THREE.CylinderGeometry(0.88, 0.88, 0.38, 16, 1, false, Math.PI * 1.75, Math.PI * 0.25);
      const sliceMesh = new THREE.Mesh(sliceGeo, ringMaterial);
      sliceMesh.position.set(0.18, 0.12, 0.18);
      modelGroup.add(sliceMesh);

      // 4. Center Hole Core Ring
      const centerCut = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.42, 24), accentMaterial);
      modelGroup.add(centerCut);

      // --- BLUE LINES ON HOVER ---
      const sliceArcPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 12; i++) {
        const angle = Math.PI * 1.75 + (i / 12) * (Math.PI * 0.25);
        sliceArcPoints.push(new THREE.Vector3(
          0.18 + Math.cos(angle) * 0.9,
          0.12 + 0.2,
          0.18 + Math.sin(angle) * 0.9
        ));
      }
      const sliceArcCurve = new THREE.CatmullRomCurve3(sliceArcPoints);
      const sliceArcGeo = new THREE.TubeGeometry(sliceArcCurve, 16, 0.016, 8, false);
      modelGroup.add(new THREE.Mesh(sliceArcGeo, blueLineMaterial));

      const baseBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.018, 12, 36), blueLineMaterial);
      baseBlueRing.position.set(0, 0.15, 0);
      baseBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(baseBlueRing);

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("chart-shareholding", buildScene, size);

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
