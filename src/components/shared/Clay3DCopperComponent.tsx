"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DCopperComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DCopperComponent
 * Form: Precision Industrial Copper Manifold & Branch Fitting
 * - 100% Static & Straight: No wobbling, no floating, perfectly upright in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DCopperComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DCopperComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered upright pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. MAIN INFLOW TRUNK PIPE
      const trunkCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, -1.35, 0),
        new THREE.Vector3(0, -0.4, 0)
      );
      const trunkGeo = new THREE.TubeGeometry(trunkCurve, 20, 0.36, 32, false);
      const trunkMesh = new THREE.Mesh(trunkGeo, bodyMaterial);
      modelGroup.add(trunkMesh);

      // Inlet Flared Bell Lip
      const inletBellGeo = new THREE.TorusGeometry(0.38, 0.09, 20, 36);
      const inletBell = new THREE.Mesh(inletBellGeo, accentMaterial);
      inletBell.position.set(0, -1.35, 0);
      inletBell.rotation.x = Math.PI / 2;
      modelGroup.add(inletBell);

      // 2. HEX COMPRESSION FLARE NUT
      const hexNutGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.34, 6);
      const hexNut = new THREE.Mesh(hexNutGeo, accentMaterial);
      hexNut.position.set(0, -0.92, 0);
      modelGroup.add(hexNut);

      const hexBevelTop = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.045, 16, 24), accentMaterial);
      hexBevelTop.position.set(0, -0.75, 0);
      hexBevelTop.rotation.x = Math.PI / 2;
      modelGroup.add(hexBevelTop);

      const hexBevelBottom = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.045, 16, 24), accentMaterial);
      hexBevelBottom.position.set(0, -1.09, 0);
      hexBevelBottom.rotation.x = Math.PI / 2;
      modelGroup.add(hexBevelBottom);

      // 3. STEPPED EXPANSION MANIFOLD
      const socketGeo = new THREE.CylinderGeometry(0.52, 0.42, 0.44, 32);
      const socketMesh = new THREE.Mesh(socketGeo, bodyMaterial);
      socketMesh.position.set(0, -0.18, 0);
      modelGroup.add(socketMesh);

      const brazeRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.05, 16, 32), ringMaterial);
      brazeRing1.position.set(0, -0.4, 0);
      brazeRing1.rotation.x = Math.PI / 2;
      modelGroup.add(brazeRing1);

      const brazeRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.055, 16, 32), ringMaterial);
      brazeRing2.position.set(0, 0.04, 0);
      brazeRing2.rotation.x = Math.PI / 2;
      modelGroup.add(brazeRing2);

      const junctionSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.52, 32, 24),
        bodyMaterial
      );
      junctionSphere.position.set(0, 0.16, 0);
      junctionSphere.scale.set(1.08, 0.85, 0.95);
      modelGroup.add(junctionSphere);

      // 4. TWIN BRANCHING PIPES (S-Curves)
      const leftCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.15, 0.25, 0),
        new THREE.Vector3(-0.75, 0.45, 0.1),
        new THREE.Vector3(-0.95, 0.85, 0.05),
        new THREE.Vector3(-0.78, 1.25, 0)
      );
      const leftTube = new THREE.Mesh(
        new THREE.TubeGeometry(leftCurve, 36, 0.26, 28, false),
        bodyMaterial
      );
      modelGroup.add(leftTube);

      const leftCollar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.33, 0.33, 0.22, 24),
        accentMaterial
      );
      leftCollar.position.set(-0.78, 1.25, 0);
      modelGroup.add(leftCollar);

      const leftLip = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.065, 16, 28), ringMaterial);
      leftLip.position.set(-0.78, 1.36, 0);
      leftLip.rotation.x = Math.PI / 2;
      modelGroup.add(leftLip);

      const rightCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0.15, 0.25, 0),
        new THREE.Vector3(0.75, 0.48, -0.1),
        new THREE.Vector3(0.95, 0.9, -0.05),
        new THREE.Vector3(0.78, 1.25, 0)
      );
      const rightTube = new THREE.Mesh(
        new THREE.TubeGeometry(rightCurve, 36, 0.26, 28, false),
        bodyMaterial
      );
      modelGroup.add(rightTube);

      const rightCollar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.33, 0.33, 0.22, 24),
        accentMaterial
      );
      rightCollar.position.set(0.78, 1.25, 0);
      modelGroup.add(rightCollar);

      const rightLip = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.065, 16, 28), ringMaterial);
      rightLip.position.set(0.78, 1.36, 0);
      rightLip.rotation.x = Math.PI / 2;
      modelGroup.add(rightLip);

      // 5. AUXILIARY SENSOR PORT
      const portTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.45, 20),
        accentMaterial
      );
      portTube.position.set(0.12, 0.32, 0.4);
      portTube.rotation.x = Math.PI / 3;
      portTube.rotation.z = -Math.PI / 6;
      modelGroup.add(portTube);

      const portCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.19, 0.19, 0.16, 18),
        ringMaterial
      );
      portCap.position.set(0.24, 0.5, 0.58);
      portCap.rotation.x = Math.PI / 3;
      portCap.rotation.z = -Math.PI / 6;
      modelGroup.add(portCap);

      // --- 6. PRECISION BLUE LINES ON HOVER ---
      // Left Branch Blue Contour Line
      const leftTracerCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.15, 0.25, 0.27),
        new THREE.Vector3(-0.75, 0.45, 0.36),
        new THREE.Vector3(-0.95, 0.85, 0.32),
        new THREE.Vector3(-0.78, 1.36, 0.27)
      );
      const leftBlueLine = new THREE.Mesh(
        new THREE.TubeGeometry(leftTracerCurve, 32, 0.022, 12, false),
        blueLineMaterial
      );
      modelGroup.add(leftBlueLine);

      // Right Branch Blue Contour Line
      const rightTracerCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0.15, 0.25, 0.27),
        new THREE.Vector3(0.75, 0.48, 0.17),
        new THREE.Vector3(0.95, 0.9, 0.22),
        new THREE.Vector3(0.78, 1.36, 0.27)
      );
      const rightBlueLine = new THREE.Mesh(
        new THREE.TubeGeometry(rightTracerCurve, 32, 0.022, 12, false),
        blueLineMaterial
      );
      modelGroup.add(rightBlueLine);

      // Hex Nut Blue Seam Ring
      const hexBlueRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.57, 0.02, 12, 36),
        blueLineMaterial
      );
      hexBlueRing.position.set(0, -0.92, 0);
      hexBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(hexBlueRing);

      // Flared Bell Inlet Blue Ring
      const inletBlueRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.02, 12, 36),
        blueLineMaterial
      );
      inletBlueRing.position.set(0, -1.35, 0);
      inletBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(inletBlueRing);

      // Top Outlet Blue Rings
      const leftOutletRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.018, 12, 32),
        blueLineMaterial
      );
      leftOutletRing.position.set(-0.78, 1.36, 0);
      leftOutletRing.rotation.x = Math.PI / 2;
      modelGroup.add(leftOutletRing);

      const rightOutletRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.018, 12, 32),
        blueLineMaterial
      );
      rightOutletRing.position.set(0.78, 1.36, 0);
      rightOutletRing.rotation.x = Math.PI / 2;
      modelGroup.add(rightOutletRing);

      return {
        cameraPosition: [0, 0.15, 5.4],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("copper-manifold", buildScene, size);

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
