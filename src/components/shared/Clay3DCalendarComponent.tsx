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
 * Clay3DCalendarComponent
 * Form: Board Meeting Calendar Pad with spiral binding rings & highlighted date circle
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DCalendarComponent({
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

      // 1. Calendar Main Base Pad
      const padGeo = new THREE.BoxGeometry(1.4, 1.4, 0.18);
      const pad = new THREE.Mesh(padGeo, bodyMaterial);
      modelGroup.add(pad);

      // 2. Top Header Binding Bar
      const headerGeo = new THREE.BoxGeometry(1.4, 0.35, 0.2);
      const header = new THREE.Mesh(headerGeo, accentMaterial);
      header.position.set(0, 0.55, 0.01);
      modelGroup.add(header);

      // 3. Top Spiral Binder Rings
      const addSpiral = (x: number) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 12, 24), ringMaterial);
        ring.position.set(x, 0.72, 0.04);
        ring.rotation.x = Math.PI / 2;
        modelGroup.add(ring);
      };
      addSpiral(-0.45);
      addSpiral(0);
      addSpiral(0.45);

      // 4. Highlighted Meeting Date Ring
      const eventMarker = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 14, 28), ringMaterial);
      eventMarker.position.set(0.12, -0.15, 0.12);
      modelGroup.add(eventMarker);

      // Date Grid Dots
      const addDot = (x: number, y: number) => {
        const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 12), accentMaterial);
        dot.position.set(x, y, 0.1);
        dot.rotation.x = Math.PI / 2;
        modelGroup.add(dot);
      };
      addDot(-0.4, 0.15); addDot(-0.12, 0.15); addDot(0.15, 0.15); addDot(0.42, 0.15);
      addDot(-0.4, -0.15); addDot(-0.15, -0.15); addDot(0.42, -0.15);
      addDot(-0.4, -0.45); addDot(-0.12, -0.45); addDot(0.15, -0.45); addDot(0.42, -0.45);

      // --- BLUE LINES ON HOVER ---
      const eventBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.018, 12, 32), blueLineMaterial);
      eventBlueRing.position.set(0.12, -0.15, 0.13);
      modelGroup.add(eventBlueRing);

      const headerLine = new THREE.LineCurve3(new THREE.Vector3(-0.65, 0.38, 0.12), new THREE.Vector3(0.65, 0.38, 0.12));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(headerLine, 14, 0.016, 10, false), blueLineMaterial));

      const leftBorder = new THREE.LineCurve3(new THREE.Vector3(-0.65, -0.65, 0.12), new THREE.Vector3(-0.65, 0.38, 0.12));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftBorder, 14, 0.016, 10, false), blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("cal-meeting", buildScene, size);

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
