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
 * Clay3DWaxSealComponent
 * Form: Secretarial Compliance Scroll with Embossed Wax Stamp & Ribbon
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DWaxSealComponent({
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

      // 1. Rolled Scroll Sheet
      const scrollGeo = new THREE.BoxGeometry(1.3, 1.5, 0.1);
      const scroll = new THREE.Mesh(scrollGeo, bodyMaterial);
      modelGroup.add(scroll);

      // Top Roll Curl
      const topCurl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.35, 20), accentMaterial);
      topCurl.position.set(0, 0.75, 0.05);
      topCurl.rotation.z = Math.PI / 2;
      modelGroup.add(topCurl);

      // 2. Official Circular Wax Stamp Seal
      const sealGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.12, 28);
      const seal = new THREE.Mesh(sealGeo, accentMaterial);
      seal.position.set(0, -0.15, 0.14);
      seal.rotation.x = Math.PI / 2;
      modelGroup.add(seal);

      const sealInnerRing = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.035, 14, 28), ringMaterial);
      sealInnerRing.position.set(0, -0.15, 0.21);
      modelGroup.add(sealInnerRing);

      // 3. Hanging Ribbon Tails
      const leftRibbonGeo = new THREE.BoxGeometry(0.16, 0.55, 0.04);
      const leftRibbon = new THREE.Mesh(leftRibbonGeo, ringMaterial);
      leftRibbon.position.set(-0.16, -0.52, 0.12);
      leftRibbon.rotation.z = 0.25;
      modelGroup.add(leftRibbon);

      const rightRibbonGeo = new THREE.BoxGeometry(0.16, 0.55, 0.04);
      const rightRibbon = new THREE.Mesh(rightRibbonGeo, ringMaterial);
      rightRibbon.position.set(0.16, -0.52, 0.12);
      rightRibbon.rotation.z = -0.25;
      modelGroup.add(rightRibbon);

      // --- BLUE LINES ON HOVER ---
      const sealBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.018, 12, 32), blueLineMaterial);
      sealBlueRing.position.set(0, -0.15, 0.22);
      modelGroup.add(sealBlueRing);

      const leftRibLine = new THREE.LineCurve3(new THREE.Vector3(-0.16, -0.25, 0.15), new THREE.Vector3(-0.24, -0.72, 0.15));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftRibLine, 12, 0.016, 10, false), blueLineMaterial));

      const rightRibLine = new THREE.LineCurve3(new THREE.Vector3(0.16, -0.25, 0.15), new THREE.Vector3(0.24, -0.72, 0.15));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rightRibLine, 12, 0.016, 10, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("wax-seal", buildScene, size);

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
