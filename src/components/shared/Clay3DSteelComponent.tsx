"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DSteelComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DSteelComponent
 * Form: Precision Stainless Steel In-line Muffler & Industrial Strainer Vessel
 * - 100% Static & Straight: Upright, centered, perfectly aligned in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DSteelComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DSteelComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered upright pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. MAIN EXPANSION RESERVOIR CANISTER (Center Body)
      const canisterGeo = new THREE.CylinderGeometry(0.72, 0.72, 1.2, 32);
      const canister = new THREE.Mesh(canisterGeo, bodyMaterial);
      canister.position.set(0, 0, 0);
      modelGroup.add(canister);

      // Upper Hemispherical Cap
      const topCapGeo = new THREE.SphereGeometry(0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const topCap = new THREE.Mesh(topCapGeo, bodyMaterial);
      topCap.position.set(0, 0.6, 0);
      modelGroup.add(topCap);

      // Lower Hemispherical Cap
      const bottomCapGeo = new THREE.SphereGeometry(0.72, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
      const bottomCap = new THREE.Mesh(bottomCapGeo, bodyMaterial);
      bottomCap.position.set(0, -0.6, 0);
      modelGroup.add(bottomCap);

      // 2. REINFORCEMENT GIRDLE BANDS & TIG WELD BEADS
      const centerGirdleGeo = new THREE.CylinderGeometry(0.76, 0.76, 0.25, 32);
      const centerGirdle = new THREE.Mesh(centerGirdleGeo, accentMaterial);
      centerGirdle.position.set(0, 0, 0);
      modelGroup.add(centerGirdle);

      const weldRingTop = new THREE.Mesh(new THREE.TorusGeometry(0.73, 0.05, 16, 36), ringMaterial);
      weldRingTop.position.set(0, 0.58, 0);
      weldRingTop.rotation.x = Math.PI / 2;
      modelGroup.add(weldRingTop);

      const weldRingBottom = new THREE.Mesh(new THREE.TorusGeometry(0.73, 0.05, 16, 36), ringMaterial);
      weldRingBottom.position.set(0, -0.58, 0);
      weldRingBottom.rotation.x = Math.PI / 2;
      modelGroup.add(weldRingBottom);

      // 3. TOP HIGH-PRESSURE NOZZLE & FLANGE
      const topNeckGeo = new THREE.CylinderGeometry(0.36, 0.44, 0.55, 24);
      const topNeck = new THREE.Mesh(topNeckGeo, accentMaterial);
      topNeck.position.set(0, 1.15, 0);
      modelGroup.add(topNeck);

      const topFlangeGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.16, 24);
      const topFlange = new THREE.Mesh(topFlangeGeo, ringMaterial);
      topFlange.position.set(0, 1.42, 0);
      modelGroup.add(topFlange);

      const topLipGeo = new THREE.TorusGeometry(0.46, 0.065, 16, 28);
      const topLip = new THREE.Mesh(topLipGeo, accentMaterial);
      topLip.position.set(0, 1.5, 0);
      topLip.rotation.x = Math.PI / 2;
      modelGroup.add(topLip);

      // 4. LOWER HIGH-PRESSURE NOZZLE & FLANGE
      const bottomNeckGeo = new THREE.CylinderGeometry(0.44, 0.36, 0.55, 24);
      const bottomNeck = new THREE.Mesh(bottomNeckGeo, accentMaterial);
      bottomNeck.position.set(0, -1.15, 0);
      modelGroup.add(bottomNeck);

      const bottomFlangeGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.16, 24);
      const bottomFlange = new THREE.Mesh(bottomFlangeGeo, ringMaterial);
      bottomFlange.position.set(0, -1.42, 0);
      modelGroup.add(bottomFlange);

      const bottomLipGeo = new THREE.TorusGeometry(0.46, 0.065, 16, 28);
      const bottomLip = new THREE.Mesh(bottomLipGeo, accentMaterial);
      bottomLip.position.set(0, -1.5, 0);
      bottomLip.rotation.x = Math.PI / 2;
      modelGroup.add(bottomLip);

      // --- 5. CRISP BLUE LINES ON HOVER ---
      const leftTracerCurve = new THREE.LineCurve3(
        new THREE.Vector3(-0.48, -1.1, 0.55),
        new THREE.Vector3(-0.48, 1.1, 0.55)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftTracerCurve, 24, 0.02, 12, false), blueLineMaterial));

      const rightTracerCurve = new THREE.LineCurve3(
        new THREE.Vector3(0.48, -1.1, 0.55),
        new THREE.Vector3(0.48, 1.1, 0.55)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rightTracerCurve, 24, 0.02, 12, false), blueLineMaterial));

      const centerTracerCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, -1.45, 0.5),
        new THREE.Vector3(0, 1.45, 0.5)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(centerTracerCurve, 32, 0.02, 12, false), blueLineMaterial));

      const createBlueRing = (radius: number, y: number) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.02, 12, 36), blueLineMaterial);
        ring.position.set(0, y, 0);
        ring.rotation.x = Math.PI / 2;
        modelGroup.add(ring);
        return ring;
      };

      createBlueRing(0.77, 0);     // Center Girdle Seam
      createBlueRing(0.73, 0.58);  // Top Dome Weld Seam
      createBlueRing(0.73, -0.58); // Bottom Dome Weld Seam
      createBlueRing(0.48, 1.5);   // Top Flange Rim Line
      createBlueRing(0.48, -1.5);  // Bottom Flange Rim Line

      return {
        cameraPosition: [0, 0, 5.5],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("steel-strainer", buildScene, size);

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
