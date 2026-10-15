"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DFinancialInfoComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DFinancialInfoComponent
 * Form: Ascending Financial Performance Podium & Bull Market Vector Arrow
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DFinancialInfoComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DFinancialInfoComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered upright pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. BEVELED FOUNDATION BASE PLATFORM
      const baseGeo = new THREE.BoxGeometry(2.1, 0.22, 1.3);
      const baseMesh = new THREE.Mesh(baseGeo, accentMaterial);
      baseMesh.position.set(0, -0.85, 0);
      modelGroup.add(baseMesh);

      // 2. THREE ASCENDING STEPPED PILLARS
      // Pillar 1 (Left)
      const p1Geo = new THREE.BoxGeometry(0.48, 0.65, 0.48);
      const p1Mesh = new THREE.Mesh(p1Geo, bodyMaterial);
      p1Mesh.position.set(-0.65, -0.42, 0);
      modelGroup.add(p1Mesh);

      const p1Cap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.52), ringMaterial);
      p1Cap.position.set(-0.65, -0.06, 0);
      modelGroup.add(p1Cap);

      // Pillar 2 (Center)
      const p2Geo = new THREE.BoxGeometry(0.48, 1.05, 0.48);
      const p2Mesh = new THREE.Mesh(p2Geo, bodyMaterial);
      p2Mesh.position.set(0, -0.22, 0);
      modelGroup.add(p2Mesh);

      const p2Cap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.52), ringMaterial);
      p2Cap.position.set(0, 0.34, 0);
      modelGroup.add(p2Cap);

      // Pillar 3 (Right)
      const p3Geo = new THREE.BoxGeometry(0.48, 1.48, 0.48);
      const p3Mesh = new THREE.Mesh(p3Geo, bodyMaterial);
      p3Mesh.position.set(0.65, -0.01, 0);
      modelGroup.add(p3Mesh);

      const p3Cap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.52), ringMaterial);
      p3Cap.position.set(0.65, 0.77, 0);
      modelGroup.add(p3Cap);

      // 3. 3D UPWARD TRAJECTORY ARROW SHAFT & HEAD
      const arrowCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.9, -0.35, 0.35),
        new THREE.Vector3(-0.3, 0.1, 0.42),
        new THREE.Vector3(0.3, 0.5, 0.45),
        new THREE.Vector3(0.95, 1.05, 0.4)
      );
      const arrowShaft = new THREE.Mesh(
        new THREE.TubeGeometry(arrowCurve, 24, 0.065, 16, false),
        accentMaterial
      );
      modelGroup.add(arrowShaft);

      const arrowHeadGeo = new THREE.ConeGeometry(0.18, 0.42, 16);
      const arrowHead = new THREE.Mesh(arrowHeadGeo, ringMaterial);
      arrowHead.position.set(0.98, 1.1, 0.38);
      arrowHead.rotation.z = -Math.PI / 4;
      modelGroup.add(arrowHead);

      // --- BLUE LINES ON HOVER ---
      const arrowLine = new THREE.Mesh(
        new THREE.TubeGeometry(arrowCurve, 24, 0.02, 12, false),
        blueLineMaterial
      );
      arrowLine.position.z += 0.03;
      modelGroup.add(arrowLine);

      const p1Line = new THREE.LineCurve3(
        new THREE.Vector3(-0.65, -0.74, 0.26),
        new THREE.Vector3(-0.65, -0.06, 0.26)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(p1Line, 12, 0.018, 12, false), blueLineMaterial));

      const p2Line = new THREE.LineCurve3(
        new THREE.Vector3(0, -0.74, 0.26),
        new THREE.Vector3(0, 0.34, 0.26)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(p2Line, 12, 0.018, 12, false), blueLineMaterial));

      const p3Line = new THREE.LineCurve3(
        new THREE.Vector3(0.65, -0.74, 0.26),
        new THREE.Vector3(0.65, 0.77, 0.26)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(p3Line, 12, 0.018, 12, false), blueLineMaterial));

      const baseLine = new THREE.LineCurve3(
        new THREE.Vector3(-1.0, -0.74, 0.66),
        new THREE.Vector3(1.0, -0.74, 0.66)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(baseLine, 16, 0.018, 12, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("financial-podium", buildScene, size);

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
