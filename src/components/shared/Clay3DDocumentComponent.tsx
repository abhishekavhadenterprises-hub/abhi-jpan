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
 * Clay3DDocumentComponent
 * Form: Statutory Filing Document Page with folded top-right corner & embossed line ribs
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DDocumentComponent({
  isHovered = false,
  className,
  size = 75,
}: Clay3DProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. Main Document Sheet
      const sheetGeo = new THREE.BoxGeometry(1.25, 1.65, 0.12);
      const sheet = new THREE.Mesh(sheetGeo, bodyMaterial);
      modelGroup.add(sheet);

      // 2. Folded Top-Right Corner
      const foldGeo = new THREE.BufferGeometry();
      const foldVertices = new Float32Array([
        0.35, 0.82, 0.08,
        0.62, 0.48, 0.08,
        0.35, 0.48, 0.16,
      ]);
      foldGeo.setAttribute("position", new THREE.BufferAttribute(foldVertices, 3));
      foldGeo.computeVertexNormals();
      const foldMesh = new THREE.Mesh(foldGeo, accentMaterial);
      modelGroup.add(foldMesh);

      // 3. Embossed Document Text Ribs
      const addRib = (y: number, width: number) => {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, 0.04), accentMaterial);
        rib.position.set(-0.15 + (1.0 - width) / 2, y, 0.08);
        modelGroup.add(rib);
      };
      addRib(0.35, 0.55);
      addRib(0.12, 0.85);
      addRib(-0.12, 0.85);
      addRib(-0.35, 0.7);

      // 4. Blue Accent Lines on Hover
      const leftMarginLine = new THREE.LineCurve3(new THREE.Vector3(-0.48, -0.65, 0.09), new THREE.Vector3(-0.48, 0.65, 0.09));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftMarginLine, 12, 0.016, 10, false), blueLineMaterial));

      const bottomLine = new THREE.LineCurve3(new THREE.Vector3(-0.48, -0.65, 0.09), new THREE.Vector3(0.48, -0.65, 0.09));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(bottomLine, 12, 0.016, 10, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("doc-filing", buildScene, size);

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
