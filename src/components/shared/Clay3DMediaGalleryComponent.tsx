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
 * Clay3DMediaGalleryComponent
 * Form: Industrial Photographic Optics & Media Lens Chassis
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DMediaGalleryComponent({
  isHovered = false,
  className,
  size = 100,
}: Clay3DProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned pose
      modelGroup.rotation.set(0.1, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. Camera Chassis Body
      const chassisGeo = new THREE.BoxGeometry(2.1, 1.4, 0.65);
      const chassisMesh = new THREE.Mesh(chassisGeo, bodyMaterial);
      chassisMesh.position.set(0, 0, -0.35);
      modelGroup.add(chassisMesh);

      // 2. Top Grip Dial & Shutter Button
      const shutterGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 24);
      const shutterMesh = new THREE.Mesh(shutterGeo, accentMaterial);
      shutterMesh.position.set(-0.65, 0.78, -0.35);
      modelGroup.add(shutterMesh);

      const dialGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 24);
      const dialMesh = new THREE.Mesh(dialGeo, ringMaterial);
      dialMesh.position.set(0.65, 0.76, -0.35);
      modelGroup.add(dialMesh);

      // 3. Multi-tier Industrial Lens Barrel
      const outerBarrelGeo = new THREE.CylinderGeometry(0.85, 0.88, 0.45, 32);
      const outerBarrelMesh = new THREE.Mesh(outerBarrelGeo, accentMaterial);
      outerBarrelMesh.rotation.x = Math.PI / 2;
      outerBarrelMesh.position.set(0, 0, 0.1);
      modelGroup.add(outerBarrelMesh);

      const focusCollarGeo = new THREE.CylinderGeometry(0.72, 0.76, 0.35, 32);
      const focusCollarMesh = new THREE.Mesh(focusCollarGeo, ringMaterial);
      focusCollarMesh.rotation.x = Math.PI / 2;
      focusCollarMesh.position.set(0, 0, 0.45);
      modelGroup.add(focusCollarMesh);

      const frontBezelGeo = new THREE.TorusGeometry(0.68, 0.08, 16, 36);
      const frontBezelMesh = new THREE.Mesh(frontBezelGeo, bodyMaterial);
      frontBezelMesh.position.set(0, 0, 0.62);
      modelGroup.add(frontBezelMesh);

      const glassGeo = new THREE.SphereGeometry(0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#475569"),
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 0.9,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.rotation.x = Math.PI / 2;
      glassMesh.position.set(0, 0, 0.52);
      glassMesh.scale.set(1, 0.3, 1);
      modelGroup.add(glassMesh);

      // --- BLUE LINES ON HOVER ---
      const outerRimLineGeo = new THREE.TorusGeometry(0.88, 0.018, 12, 36);
      const outerRimLineMesh = new THREE.Mesh(outerRimLineGeo, blueLineMaterial);
      outerRimLineMesh.position.set(0, 0, 0.28);
      modelGroup.add(outerRimLineMesh);

      const innerRimLineGeo = new THREE.TorusGeometry(0.68, 0.018, 12, 36);
      const innerRimLineMesh = new THREE.Mesh(innerRimLineGeo, blueLineMaterial);
      innerRimLineMesh.position.set(0, 0, 0.64);
      modelGroup.add(innerRimLineMesh);

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("media-gallery", buildScene, size);

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
