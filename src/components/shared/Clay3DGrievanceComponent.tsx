"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DGrievanceComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DGrievanceComponent
 * Form: Puffy Claymorphic Security Shield & Resolution Checkmark
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DGrievanceComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DGrievanceComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, upright, front-facing pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. PUFFY SHIELD PROFILE
      const shieldShape = new THREE.Shape();
      shieldShape.moveTo(0, 1.1);
      shieldShape.quadraticCurveTo(0.9, 1.05, 0.95, 0.4);
      shieldShape.quadraticCurveTo(0.95, -0.4, 0, -1.2);
      shieldShape.quadraticCurveTo(-0.95, -0.4, -0.95, 0.4);
      shieldShape.quadraticCurveTo(-0.9, 1.05, 0, 1.1);

      const extrudeSettings = {
        depth: 0.22,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 1,
        bevelSize: 0.08,
        bevelThickness: 0.08,
      };

      const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
      shieldGeo.center();
      const shieldMesh = new THREE.Mesh(shieldGeo, bodyMaterial);
      modelGroup.add(shieldMesh);

      // 2. EMBOSSED CENTRAL SHIELD BADGE
      const innerPlateGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 32);
      const innerPlate = new THREE.Mesh(innerPlateGeo, accentMaterial);
      innerPlate.position.set(0, 0.05, 0.16);
      innerPlate.rotation.x = Math.PI / 2;
      modelGroup.add(innerPlate);

      const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.04, 16, 32), ringMaterial);
      innerRing.position.set(0, 0.05, 0.22);
      modelGroup.add(innerRing);

      // 3. 3D EMBOSSED CHECKMARK
      const checkStem1Curve = new THREE.LineCurve3(
        new THREE.Vector3(-0.28, 0.08, 0.26),
        new THREE.Vector3(-0.06, -0.16, 0.26)
      );
      const checkStem1 = new THREE.Mesh(
        new THREE.TubeGeometry(checkStem1Curve, 8, 0.06, 16, false),
        ringMaterial
      );
      modelGroup.add(checkStem1);

      const checkStem2Curve = new THREE.LineCurve3(
        new THREE.Vector3(-0.06, -0.16, 0.26),
        new THREE.Vector3(0.32, 0.28, 0.26)
      );
      const checkStem2 = new THREE.Mesh(
        new THREE.TubeGeometry(checkStem2Curve, 12, 0.06, 16, false),
        ringMaterial
      );
      modelGroup.add(checkStem2);

      // --- BLUE LINES ON HOVER ---
      const checkLine1 = new THREE.Mesh(
        new THREE.TubeGeometry(checkStem1Curve, 8, 0.02, 12, false),
        blueLineMaterial
      );
      checkLine1.position.z += 0.03;
      modelGroup.add(checkLine1);

      const checkLine2 = new THREE.Mesh(
        new THREE.TubeGeometry(checkStem2Curve, 12, 0.02, 12, false),
        blueLineMaterial
      );
      checkLine2.position.z += 0.03;
      modelGroup.add(checkLine2);

      const badgeBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.018, 12, 36), blueLineMaterial);
      badgeBlueRing.position.set(0, 0.05, 0.24);
      modelGroup.add(badgeBlueRing);

      const shieldPoints = shieldShape.getPoints(36);
      const shieldPoints3D = shieldPoints.map((p) => new THREE.Vector3(p.x * 0.98, p.y * 0.98, 0.24));
      const shieldSpline = new THREE.CatmullRomCurve3(shieldPoints3D, true);
      const shieldPerimeterGeo = new THREE.TubeGeometry(shieldSpline, 36, 0.016, 8, true);
      modelGroup.add(new THREE.Mesh(shieldPerimeterGeo, blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("investor-grievance", buildScene, size);

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
