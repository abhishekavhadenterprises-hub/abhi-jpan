"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DOtherInfoComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DOtherInfoComponent
 * Form: Executive Archive Portfolio Case & Security Clasp
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DOtherInfoComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DOtherInfoComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered upright pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. MAIN PORTFOLIO CASE BODY
      const caseGeo = new THREE.BoxGeometry(1.8, 1.25, 0.42);
      const caseMesh = new THREE.Mesh(caseGeo, bodyMaterial);
      caseMesh.position.set(0, -0.1, 0);
      modelGroup.add(caseMesh);

      // 2. ENVELOPE TRIANGULAR FLAP
      const flapShape = new THREE.Shape();
      flapShape.moveTo(-0.9, 0.52);
      flapShape.lineTo(0, -0.15);
      flapShape.lineTo(0.9, 0.52);
      flapShape.closePath();

      const flapGeo = new THREE.ExtrudeGeometry(flapShape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04,
      });
      flapGeo.center();
      const flapMesh = new THREE.Mesh(flapGeo, accentMaterial);
      flapMesh.position.set(0, 0.25, 0.24);
      modelGroup.add(flapMesh);

      // 3. CENTER LOCKING CLASP BADGE
      const claspGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.1, 24);
      const claspMesh = new THREE.Mesh(claspGeo, ringMaterial);
      claspMesh.position.set(0, -0.05, 0.28);
      claspMesh.rotation.x = Math.PI / 2;
      modelGroup.add(claspMesh);

      const claspKeyhole = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.04), accentMaterial);
      claspKeyhole.position.set(0, -0.05, 0.34);
      modelGroup.add(claspKeyhole);

      // 4. TOP CARRYING HANDLE
      const handleCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.4, 0.52, 0),
        new THREE.Vector3(-0.35, 0.88, 0),
        new THREE.Vector3(0.35, 0.88, 0),
        new THREE.Vector3(0.4, 0.52, 0)
      );
      const handleMesh = new THREE.Mesh(
        new THREE.TubeGeometry(handleCurve, 20, 0.06, 16, false),
        accentMaterial
      );
      modelGroup.add(handleMesh);

      // --- BLUE LINES ON HOVER ---
      const leftFlapLine = new THREE.LineCurve3(
        new THREE.Vector3(-0.85, 0.5, 0.29),
        new THREE.Vector3(0, -0.05, 0.29)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftFlapLine, 16, 0.018, 12, false), blueLineMaterial));

      const rightFlapLine = new THREE.LineCurve3(
        new THREE.Vector3(0, -0.05, 0.29),
        new THREE.Vector3(0.85, 0.5, 0.29)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rightFlapLine, 16, 0.018, 12, false), blueLineMaterial));

      const claspBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.018, 12, 28), blueLineMaterial);
      claspBlueRing.position.set(0, -0.05, 0.32);
      modelGroup.add(claspBlueRing);

      const caseHorizonLine = new THREE.LineCurve3(
        new THREE.Vector3(-0.88, -0.68, 0.22),
        new THREE.Vector3(0.88, -0.68, 0.22)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(caseHorizonLine, 16, 0.018, 12, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("other-information", buildScene, size);

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
