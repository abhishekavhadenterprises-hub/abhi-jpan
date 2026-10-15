"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DAnnualReportsComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DAnnualReportsComponent
 * Form: Annual Report Ledger Book & Audited Corporate Seal
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DAnnualReportsComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DAnnualReportsComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial: pageMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, upright, front-facing pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. FRONT COVER PLATE
      const frontCoverGeo = new THREE.BoxGeometry(1.25, 1.6, 0.1);
      const frontCover = new THREE.Mesh(frontCoverGeo, bodyMaterial);
      frontCover.position.set(0.08, 0, 0.22);
      modelGroup.add(frontCover);

      // 2. BACK COVER PLATE
      const backCoverGeo = new THREE.BoxGeometry(1.25, 1.6, 0.1);
      const backCover = new THREE.Mesh(backCoverGeo, bodyMaterial);
      backCover.position.set(0.08, 0, -0.22);
      modelGroup.add(backCover);

      // 3. CURVED BOOK SPINE
      const spineGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.6, 24, 1, false, Math.PI / 2, Math.PI);
      const spineMesh = new THREE.Mesh(spineGeo, accentMaterial);
      spineMesh.position.set(-0.55, 0, 0);
      spineMesh.rotation.y = Math.PI;
      modelGroup.add(spineMesh);

      // 4. INNER PAPER PAGE BLOCK
      const pagesGeo = new THREE.BoxGeometry(1.15, 1.48, 0.35);
      const pagesMesh = new THREE.Mesh(pagesGeo, pageMaterial);
      pagesMesh.position.set(0.12, 0, 0);
      modelGroup.add(pagesMesh);

      // 5. EMBOSSED CORPORATE AUDIT SEAL
      const sealGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.06, 24);
      const sealMesh = new THREE.Mesh(sealGeo, accentMaterial);
      sealMesh.position.set(0.08, 0.15, 0.28);
      sealMesh.rotation.x = Math.PI / 2;
      modelGroup.add(sealMesh);

      const sealRing = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 16, 28), bodyMaterial);
      sealRing.position.set(0.08, 0.15, 0.31);
      modelGroup.add(sealRing);

      // 6. HANGING BOOKMARK RIBBON
      const ribbonGeo = new THREE.BoxGeometry(0.18, 0.45, 0.05);
      const ribbonMesh = new THREE.Mesh(ribbonGeo, accentMaterial);
      ribbonMesh.position.set(0.25, -0.85, 0.08);
      ribbonMesh.rotation.z = -0.15;
      modelGroup.add(ribbonMesh);

      // --- BLUE LINES ON HOVER ---
      const coverLineCurve = new THREE.LineCurve3(
        new THREE.Vector3(0.08, -0.72, 0.28),
        new THREE.Vector3(0.08, 0.72, 0.28)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(coverLineCurve, 16, 0.018, 12, false), blueLineMaterial));

      const spineLineCurve = new THREE.LineCurve3(
        new THREE.Vector3(-0.48, -0.78, 0.26),
        new THREE.Vector3(-0.48, 0.78, 0.26)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(spineLineCurve, 16, 0.018, 12, false), blueLineMaterial));

      const sealBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.018, 12, 32), blueLineMaterial);
      sealBlueRing.position.set(0.08, 0.15, 0.32);
      modelGroup.add(sealBlueRing);

      const ribbonLine = new THREE.LineCurve3(
        new THREE.Vector3(0.25, -0.65, 0.11),
        new THREE.Vector3(0.25, -1.05, 0.11)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(ribbonLine, 12, 0.018, 12, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("annual-reports", buildScene, size);

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
