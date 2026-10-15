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
 * Clay3DNewspaperComponent
 * Form: Folded Financial Broadsheet Newspaper with Columns & Headline Banner
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DNewspaperComponent({
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

      // 1. Folded Newspaper Leaves
      const frontHalfGeo = new THREE.BoxGeometry(1.4, 0.85, 0.12);
      const frontHalf = new THREE.Mesh(frontHalfGeo, bodyMaterial);
      frontHalf.position.set(0, -0.32, 0.08);
      modelGroup.add(frontHalf);

      const backHalfGeo = new THREE.BoxGeometry(1.4, 0.85, 0.12);
      const backHalf = new THREE.Mesh(backHalfGeo, accentMaterial);
      backHalf.position.set(0, 0.45, -0.05);
      modelGroup.add(backHalf);

      // Center Fold Ridge
      const foldRidge = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.42, 16), ringMaterial);
      foldRidge.position.set(0, 0.08, 0.04);
      foldRidge.rotation.z = Math.PI / 2;
      modelGroup.add(foldRidge);

      // 2. Headline Banner
      const headlineGeo = new THREE.BoxGeometry(1.15, 0.18, 0.04);
      const headline = new THREE.Mesh(headlineGeo, accentMaterial);
      headline.position.set(0, 0.65, 0.03);
      modelGroup.add(headline);

      // 3. Two-Column News Ribs
      const addCol = (x: number) => {
        for (let i = 0; i < 3; i++) {
          const line = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.03), ringMaterial);
          line.position.set(x, -0.15 - i * 0.14, 0.15);
          modelGroup.add(line);
        }
      };
      addCol(-0.35); // Left Column
      addCol(0.35);  // Right Column

      // --- BLUE LINES ON HOVER ---
      const foldLine = new THREE.LineCurve3(new THREE.Vector3(-0.68, 0.08, 0.12), new THREE.Vector3(0.68, 0.08, 0.12));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(foldLine, 14, 0.016, 10, false), blueLineMaterial));

      const headlineLine = new THREE.LineCurve3(new THREE.Vector3(-0.55, 0.74, 0.06), new THREE.Vector3(0.55, 0.74, 0.06));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(headlineLine, 14, 0.016, 10, false), blueLineMaterial));

      const gutterLine = new THREE.LineCurve3(new THREE.Vector3(0, -0.05, 0.16), new THREE.Vector3(0, -0.65, 0.16));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(gutterLine, 10, 0.016, 10, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("newspaper-pub", buildScene, size);

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
