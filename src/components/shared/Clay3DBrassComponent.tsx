"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useClayModel, createClayMaterials, StaticClayView, BuildSceneFn } from "./clay3d-engine";

interface Clay3DBrassComponentProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

/**
 * Clay3DBrassComponent
 * Form: Precision Heavy-Duty Brass Hex Flare Distributor & 4-Way Cross Manifold Fitting
 * - 100% Static & Straight: Upright, centered, perfectly aligned in that position only.
 * - On Hover: In that exact position, precision Blue Lines illuminate directly on the 3D model.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function Clay3DBrassComponent({
  isHovered = false,
  className,
  size = 115,
}: Clay3DBrassComponentProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered upright pose
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);
      scene.add(modelGroup);

      // 1. CENTRAL HEAVY-DUTY HEXAGONAL MANIFOLD BODY
      const hexBodyGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.95, 6);
      const hexBody = new THREE.Mesh(hexBodyGeo, bodyMaterial);
      hexBody.position.set(0, 0, 0);
      modelGroup.add(hexBody);

      // Hex Top & Bottom Chamfer Rings
      const hexTopChamfer = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.06, 16, 24), accentMaterial);
      hexTopChamfer.position.set(0, 0.47, 0);
      hexTopChamfer.rotation.x = Math.PI / 2;
      modelGroup.add(hexTopChamfer);

      const hexBottomChamfer = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.06, 16, 24), accentMaterial);
      hexBottomChamfer.position.set(0, -0.47, 0);
      hexBottomChamfer.rotation.x = Math.PI / 2;
      modelGroup.add(hexBottomChamfer);

      // 2. TOP VALVE BONNET & SPINDLE NUT
      const bonnetGeo = new THREE.CylinderGeometry(0.48, 0.58, 0.42, 24);
      const bonnet = new THREE.Mesh(bonnetGeo, accentMaterial);
      bonnet.position.set(0, 0.68, 0);
      modelGroup.add(bonnet);

      const spindleCapGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.35, 6);
      const spindleCap = new THREE.Mesh(spindleCapGeo, bodyMaterial);
      spindleCap.position.set(0, 0.98, 0);
      modelGroup.add(spindleCap);

      const topDomeGeo = new THREE.SphereGeometry(0.32, 24, 16);
      const topDome = new THREE.Mesh(topDomeGeo, ringMaterial);
      topDome.position.set(0, 1.15, 0);
      topDome.scale.set(1, 0.45, 1);
      modelGroup.add(topDome);

      // 3. LOWER INLET ADAPTER PIPE & COLLAR
      const lowerStemGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.55, 32);
      const lowerStem = new THREE.Mesh(lowerStemGeo, accentMaterial);
      lowerStem.position.set(0, -0.74, 0);
      modelGroup.add(lowerStem);

      const lowerFlangeGeo = new THREE.TorusGeometry(0.44, 0.08, 16, 32);
      const lowerFlange = new THREE.Mesh(lowerFlangeGeo, ringMaterial);
      lowerFlange.position.set(0, -1.02, 0);
      lowerFlange.rotation.x = Math.PI / 2;
      modelGroup.add(lowerFlange);

      // 4. LATERAL MACHINED NOZZLES (Left & Right Flare Ports)
      const leftPortGeo = new THREE.CylinderGeometry(0.34, 0.38, 0.62, 24);
      const leftPort = new THREE.Mesh(leftPortGeo, bodyMaterial);
      leftPort.position.set(-0.82, 0, 0);
      leftPort.rotation.z = Math.PI / 2;
      modelGroup.add(leftPort);

      const leftFlareLip = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.07, 16, 28), accentMaterial);
      leftFlareLip.position.set(-1.13, 0, 0);
      leftFlareLip.rotation.y = Math.PI / 2;
      modelGroup.add(leftFlareLip);

      const rightPortGeo = new THREE.CylinderGeometry(0.34, 0.38, 0.62, 24);
      const rightPort = new THREE.Mesh(rightPortGeo, bodyMaterial);
      rightPort.position.set(0.82, 0, 0);
      rightPort.rotation.z = -Math.PI / 2;
      modelGroup.add(rightPort);

      const rightFlareLip = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.07, 16, 28), accentMaterial);
      rightFlareLip.position.set(1.13, 0, 0);
      rightFlareLip.rotation.y = Math.PI / 2;
      modelGroup.add(rightFlareLip);

      // Forward Auxiliary Sensor Well Port
      const forwardPortGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.45, 20);
      const forwardPort = new THREE.Mesh(forwardPortGeo, accentMaterial);
      forwardPort.position.set(0, 0.12, 0.72);
      forwardPort.rotation.x = Math.PI / 2;
      modelGroup.add(forwardPort);

      const forwardCapGeo = new THREE.SphereGeometry(0.25, 20, 14);
      const forwardCap = new THREE.Mesh(forwardCapGeo, ringMaterial);
      forwardCap.position.set(0, 0.12, 0.95);
      forwardCap.scale.set(1, 1, 0.5);
      modelGroup.add(forwardCap);

      // --- 5. CRISP BLUE LINES ON HOVER ---
      const leftLineCurve = new THREE.LineCurve3(
        new THREE.Vector3(-0.35, 0, 0.38),
        new THREE.Vector3(-1.13, 0, 0.35)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(leftLineCurve, 16, 0.02, 12, false), blueLineMaterial));

      const rightLineCurve = new THREE.LineCurve3(
        new THREE.Vector3(0.35, 0, 0.38),
        new THREE.Vector3(1.13, 0, 0.35)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rightLineCurve, 16, 0.02, 12, false), blueLineMaterial));

      const verticalLineCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, -1.02, 0.45),
        new THREE.Vector3(0, 1.15, 0.34)
      );
      modelGroup.add(new THREE.Mesh(new THREE.TubeGeometry(verticalLineCurve, 24, 0.02, 12, false), blueLineMaterial));

      const createBlueRing = (radius: number, y: number, x: number = 0, z: number = 0, rotX: number = Math.PI / 2, rotY: number = 0) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.02, 12, 32), blueLineMaterial);
        ring.position.set(x, y, z);
        ring.rotation.x = rotX;
        ring.rotation.y = rotY;
        modelGroup.add(ring);
        return ring;
      };

      createBlueRing(0.72, 0);             // Hex Waist Line
      createBlueRing(0.48, 0.68);          // Bonnet Seam Line
      createBlueRing(0.44, -1.02);         // Lower Flange Lip Line
      createBlueRing(0.36, 0, -1.13, 0, 0, Math.PI / 2); // Left Port Rim Line
      createBlueRing(0.36, 0, 1.13, 0, 0, Math.PI / 2);  // Right Port Rim Line

      return {
        cameraPosition: [0, 0.1, 5.4],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("brass-manifold", buildScene, size);

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
