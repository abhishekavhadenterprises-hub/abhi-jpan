"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DGovernanceComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DGovernanceComponent
 * Form: Classical Architectural Temple Facade (Governance, Ethics & Rule of Law)
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DGovernanceComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DGovernanceComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered upright pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. TRIANGULAR PEDIMENT ROOF
      const roofShape = new THREE.Shape();
      roofShape.moveTo(-1.0, 0);
      roofShape.lineTo(0, 0.65);
      roofShape.lineTo(1.0, 0);
      roofShape.closePath();

      const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
        depth: 0.55,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: 0.06,
        bevelThickness: 0.06,
      });
      roofGeo.center();
      const roofMesh = new THREE.Mesh(roofGeo, accentMaterial);
      roofMesh.position.set(0, 0.85, 0);
      modelGroup.add(roofMesh);

      // Architrave Lintel Beam
      const lintelGeo = new THREE.BoxGeometry(1.9, 0.16, 0.65);
      const lintel = new THREE.Mesh(lintelGeo, bodyMaterial);
      lintel.position.set(0, 0.45, 0);
      modelGroup.add(lintel);

      // 2. THREE ARCHITECTURAL COLUMNS
      const createColumn = (x: number) => {
        const colGroup = new THREE.Group();

        // Shaft
        const shaftGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.95, 24);
        const shaft = new THREE.Mesh(shaftGeo, bodyMaterial);
        colGroup.add(shaft);

        // Capital Ring (Top)
        const capRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 12, 24), ringMaterial);
        capRing.position.set(0, 0.45, 0);
        capRing.rotation.x = Math.PI / 2;
        colGroup.add(capRing);

        // Base Ring (Bottom)
        const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 12, 24), ringMaterial);
        baseRing.position.set(0, -0.45, 0);
        baseRing.rotation.x = Math.PI / 2;
        colGroup.add(baseRing);

        colGroup.position.set(x, -0.12, 0);
        modelGroup.add(colGroup);
      };

      createColumn(-0.62); // Left Column
      createColumn(0);     // Center Column
      createColumn(0.62);  // Right Column

      // 3. STEPPED FOUNDATION PLINTH (Base)
      const upperPlinthGeo = new THREE.BoxGeometry(1.85, 0.16, 0.7);
      const upperPlinth = new THREE.Mesh(upperPlinthGeo, accentMaterial);
      upperPlinth.position.set(0, -0.68, 0);
      modelGroup.add(upperPlinth);

      const lowerPlinthGeo = new THREE.BoxGeometry(2.05, 0.2, 0.85);
      const lowerPlinth = new THREE.Mesh(lowerPlinthGeo, ringMaterial);
      lowerPlinth.position.set(0, -0.84, 0);
      modelGroup.add(lowerPlinth);

      // --- BLUE LINES ON HOVER ---
      const leftEave = new THREE.LineCurve3(
        new THREE.Vector3(-1.0, 0.58, 0.32),
        new THREE.Vector3(0, 1.18, 0.32)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftEave, 16, 0.018, 12, false), blueLineMaterial));

      const rightEave = new THREE.LineCurve3(
        new THREE.Vector3(0, 1.18, 0.32),
        new THREE.Vector3(1.0, 0.58, 0.32)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rightEave, 16, 0.018, 12, false), blueLineMaterial));

      const lintelLine = new THREE.LineCurve3(
        new THREE.Vector3(-0.92, 0.45, 0.35),
        new THREE.Vector3(0.92, 0.45, 0.35)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(lintelLine, 16, 0.018, 12, false), blueLineMaterial));

      const addColLine = (x: number) => {
        const line = new THREE.LineCurve3(
          new THREE.Vector3(x, -0.55, 0.18),
          new THREE.Vector3(x, 0.35, 0.18)
        );
        modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(line, 12, 0.016, 12, false), blueLineMaterial));
      };
      addColLine(-0.62);
      addColLine(0);
      addColLine(0.62);

      const plinthLine = new THREE.LineCurve3(
        new THREE.Vector3(-1.0, -0.74, 0.44),
        new THREE.Vector3(1.0, -0.74, 0.44)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(plinthLine, 16, 0.018, 12, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("corporate-governance", buildScene, size);

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
