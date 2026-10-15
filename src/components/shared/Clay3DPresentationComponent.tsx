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
 * Clay3DPresentationComponent
 * Form: Widescreen Presentation Display Screen on Architectural Stand
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DPresentationComponent({
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

      // 1. Widescreen Presentation Display Panel
      const screenGeo = new THREE.BoxGeometry(1.65, 1.15, 0.14);
      const screen = new THREE.Mesh(screenGeo, bodyMaterial);
      screen.position.set(0, 0.25, 0);
      modelGroup.add(screen);

      // Inner Bezel Recessed Display Face
      const displayFace = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.95, 0.04), accentMaterial);
      displayFace.position.set(0, 0.25, 0.08);
      modelGroup.add(displayFace);

      // Embossed Presentation Chart Bars on Display
      const addBar = (x: number, h: number) => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.18, h, 0.04), ringMaterial);
        bar.position.set(x, 0.25 - (0.6 - h) / 2, 0.11);
        modelGroup.add(bar);
      };
      addBar(-0.4, 0.35);
      addBar(-0.13, 0.55);
      addBar(0.14, 0.42);
      addBar(0.41, 0.68);

      // 2. Stand Neck Stem
      const stemGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.45, 20);
      const stem = new THREE.Mesh(stemGeo, accentMaterial);
      stem.position.set(0, -0.45, 0);
      modelGroup.add(stem);

      // 3. Stand Pedestal Base
      const baseGeo = new THREE.BoxGeometry(0.95, 0.12, 0.65);
      const baseMesh = new THREE.Mesh(baseGeo, ringMaterial);
      baseMesh.position.set(0, -0.7, 0);
      modelGroup.add(baseMesh);

      // --- BLUE LINES ON HOVER ---
      const topBorder = new THREE.LineCurve3(new THREE.Vector3(-0.72, 0.72, 0.1), new THREE.Vector3(0.72, 0.72, 0.1));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(topBorder, 16, 0.016, 10, false), blueLineMaterial));

      const bottomBorder = new THREE.LineCurve3(new THREE.Vector3(-0.72, -0.22, 0.1), new THREE.Vector3(0.72, -0.22, 0.1));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(bottomBorder, 16, 0.016, 10, false), blueLineMaterial));

      const standLine = new THREE.LineCurve3(new THREE.Vector3(-0.42, -0.65, 0.32), new THREE.Vector3(0.42, -0.65, 0.32));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(standLine, 12, 0.016, 10, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("presentation-screen", buildScene, size);

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
