"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DAllProductsComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DAllProductsComponent
 * Form: Integrated Industrial Precision Modular Assembly (Catalog Cluster)
 * - 100% Static & Straight: Upright, centered, perfectly aligned in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DAllProductsComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DAllProductsComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered upright pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(-0.08, -0.05, 0);
      scene.add(modelGroup);

      // 1. CENTRAL PRECISION VALVE BLOCK (Rounded Cuboid Manifold Base)
      const blockGeo = new THREE.BoxGeometry(0.95, 0.72, 0.85);
      const blockMesh = new THREE.Mesh(blockGeo, bodyMaterial);
      blockMesh.position.set(-0.15, -0.32, 0);
      modelGroup.add(blockMesh);

      // Lateral Bore Flange on the block
      const blockBoreGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.3, 24);
      const blockBore = new THREE.Mesh(blockBoreGeo, accentMaterial);
      blockBore.position.set(-0.7, -0.32, 0);
      blockBore.rotation.z = Math.PI / 2;
      modelGroup.add(blockBore);

      const blockLip = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.06, 16, 24), ringMaterial);
      blockLip.position.set(-0.85, -0.32, 0);
      blockLip.rotation.y = Math.PI / 2;
      modelGroup.add(blockLip);

      // 2. SWEEPING PRECISION ELBOW PIPE (Emerging from top of manifold block)
      const elbowCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.15, 0.04, 0),
        new THREE.Vector3(-0.15, 0.75, 0),
        new THREE.Vector3(0.4, 1.15, 0),
        new THREE.Vector3(1.05, 1.15, 0)
      );
      const elbowGeo = new THREE.TubeGeometry(elbowCurve, 32, 0.28, 28, false);
      const elbowMesh = new THREE.Mesh(elbowGeo, bodyMaterial);
      modelGroup.add(elbowMesh);

      // Pipe Outlet Flange Ring
      const pipeOutletGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.18, 24);
      const pipeOutlet = new THREE.Mesh(pipeOutletGeo, accentMaterial);
      pipeOutlet.position.set(1.12, 1.15, 0);
      pipeOutlet.rotation.z = Math.PI / 2;
      modelGroup.add(pipeOutlet);

      const pipeLip = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.065, 16, 24), ringMaterial);
      pipeLip.position.set(1.21, 1.15, 0);
      pipeLip.rotation.y = Math.PI / 2;
      modelGroup.add(pipeLip);

      // 3. INTERLOCKING HEXAGONAL COMPRESSION NUT
      const hexNutGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.38, 6);
      const hexNut = new THREE.Mesh(hexNutGeo, accentMaterial);
      hexNut.position.set(0.65, -0.22, 0.32);
      hexNut.rotation.x = Math.PI / 4.5;
      hexNut.rotation.y = Math.PI / 6;
      modelGroup.add(hexNut);

      const hexRingTop = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.045, 16, 24), ringMaterial);
      hexRingTop.position.set(0.65, -0.08, 0.44);
      hexRingTop.rotation.x = Math.PI / 4.5;
      hexRingTop.rotation.y = Math.PI / 6;
      modelGroup.add(hexRingTop);

      // 4. STEPPED FLANGE / BRAZING BUSH RING
      const flangeRingGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.16, 28);
      const flangeRing = new THREE.Mesh(flangeRingGeo, ringMaterial);
      flangeRing.position.set(0.35, -0.72, 0.45);
      flangeRing.rotation.x = Math.PI / 2.2;
      modelGroup.add(flangeRing);

      const flangeInnerGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 24);
      const flangeInner = new THREE.Mesh(flangeInnerGeo, accentMaterial);
      flangeInner.position.set(0.35, -0.72, 0.45);
      flangeInner.rotation.x = Math.PI / 2.2;
      modelGroup.add(flangeInner);

      // --- 5. CRISP BLUE LINES ON HOVER ---
      const pipeTracerCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.15, 0.04, 0.29),
        new THREE.Vector3(-0.15, 0.75, 0.29),
        new THREE.Vector3(0.4, 1.15, 0.29),
        new THREE.Vector3(1.21, 1.15, 0.29)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(pipeTracerCurve, 32, 0.02, 12, false), blueLineMaterial));

      const blockHorizonCurve = new THREE.LineCurve3(
        new THREE.Vector3(-0.62, -0.08, 0.43),
        new THREE.Vector3(0.32, -0.08, 0.43)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(blockHorizonCurve, 16, 0.02, 12, false), blueLineMaterial));

      const createBlueRing = (radius: number, x: number, y: number, z: number, rotX: number = Math.PI / 2, rotY: number = 0) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.02, 12, 32), blueLineMaterial);
        ring.position.set(x, y, z);
        ring.rotation.x = rotX;
        ring.rotation.y = rotY;
        modelGroup.add(ring);
        return ring;
      };

      createBlueRing(0.34, -0.85, -0.32, 0, 0, Math.PI / 2);
      createBlueRing(0.36, 1.21, 1.15, 0, 0, Math.PI / 2);
      createBlueRing(0.48, 0.65, -0.22, 0.32, Math.PI / 4.5, Math.PI / 6);
      createBlueRing(0.56, 0.35, -0.72, 0.45, Math.PI / 2.2, 0);

      return {
        cameraPosition: [0, 0.1, 5.5],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("all-products-cluster", buildScene, size);

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
