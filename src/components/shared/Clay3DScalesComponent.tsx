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
 * Clay3DScalesComponent
 * Form: Precision Balance Scales of Deviations & Compliance Justice
 * - 100% Static & Straight: Centered, upright, in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DScalesComponent({
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

      // 1. Central Vertical Pillar Fulcrum & Base
      const pillarGeo = new THREE.CylinderGeometry(0.09, 0.12, 1.5, 20);
      const pillar = new THREE.Mesh(pillarGeo, bodyMaterial);
      pillar.position.set(0, 0, 0);
      modelGroup.add(pillar);

      const baseGeo = new THREE.CylinderGeometry(0.5, 0.58, 0.14, 24);
      const base = new THREE.Mesh(baseGeo, ringMaterial);
      base.position.set(0, -0.75, 0);
      modelGroup.add(base);

      const topFinial = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 14), accentMaterial);
      topFinial.position.set(0, 0.8, 0);
      modelGroup.add(topFinial);

      // 2. Horizontal Balance Beam
      const beamGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.7, 16);
      const beam = new THREE.Mesh(beamGeo, accentMaterial);
      beam.position.set(0, 0.65, 0);
      beam.rotation.z = Math.PI / 2;
      modelGroup.add(beam);

      // 3. Left & Right Suspended Pans
      const addPan = (x: number) => {
        const panGroup = new THREE.Group();
        const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.65, 8), ringMaterial);
        s1.position.set(-0.15, -0.3, 0);
        s1.rotation.z = -0.15;
        panGroup.add(s1);

        const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.65, 8), ringMaterial);
        s2.position.set(0.15, -0.3, 0);
        s2.rotation.z = 0.15;
        panGroup.add(s2);

        const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.15, 0.1, 24), bodyMaterial);
        dish.position.set(0, -0.6, 0);
        panGroup.add(dish);

        const dishRim = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.025, 12, 24), ringMaterial);
        dishRim.position.set(0, -0.55, 0);
        dishRim.rotation.x = Math.PI / 2;
        panGroup.add(dishRim);

        panGroup.position.set(x, 0.65, 0);
        modelGroup.add(panGroup);
      };

      addPan(-0.75);
      addPan(0.75);

      // --- BLUE LINES ON HOVER ---
      const beamLine = new THREE.LineCurve3(new THREE.Vector3(-0.85, 0.65, 0.08), new THREE.Vector3(0.85, 0.65, 0.08));
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(beamLine, 16, 0.016, 10, false), blueLineMaterial));

      const leftPanRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.016, 12, 28), blueLineMaterial);
      leftPanRing.position.set(-0.75, 0.1, 0);
      leftPanRing.rotation.x = Math.PI / 2;
      modelGroup.add(leftPanRing);

      const rightPanRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.016, 12, 28), blueLineMaterial);
      rightPanRing.position.set(0.75, 0.1, 0);
      rightPanRing.rotation.x = Math.PI / 2;
      modelGroup.add(rightPanRing);

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("scales-deviations", buildScene, size);

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
