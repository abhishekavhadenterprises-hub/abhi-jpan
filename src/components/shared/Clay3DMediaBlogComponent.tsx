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
 * Helper to build a rounded rectangle shape
 */
function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

/**
 * Clay3DMediaBlogComponent
 * Exact 3D claymorphic sculpture matching user reference:
 * - Stack of 3 rounded paper document sheets with folded top-right corner
 * - Embossed drafting lines and cursive signature
 * - Ergonomic writing pen with clip and grip collar pointing at signature
 * - On Hover: Precision J-Pan Blue (#2563EB) illuminates on the text lines, signature, and pen collar
 * - 100% Static, straight composition, zero WebGL context overload, zero lag.
 */
export function Clay3DMediaBlogComponent({
  isHovered = false,
  className,
  size = 100,
}: Clay3DProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      // Custom bright clay paper material
      const paperWhiteMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#CBD5E1"),
        roughness: 0.65,
        metalness: 0.04,
        clearcoat: 0.2,
        sheen: 0.4,
        sheenColor: new THREE.Color("#F8FAFC"),
      });

      // Medium grey back paper material
      const paperBackMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#94A3B8"),
        roughness: 0.68,
        metalness: 0.05,
        clearcoat: 0.15,
        sheen: 0.3,
        sheenColor: new THREE.Color("#E2E8F0"),
      });

      const modelGroup = new THREE.Group();
      // Straight, centered isometric orientation
      modelGroup.rotation.set(0.12, 0, 0);
      modelGroup.position.set(-0.06, 0.02, 0);
      scene.add(modelGroup);

      // =========================================================================
      // 1. STACK OF 3 PAPER SHEETS
      // =========================================================================
      const sheetShape = createRoundedRectShape(1.5, 2.05, 0.14);
      const extrudeSettings = {
        depth: 0.06,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      };

      const sheetGeo = new THREE.ExtrudeGeometry(sheetShape, extrudeSettings);
      sheetGeo.center();

      // Sheet 1 (Furthest Back - tilted most left)
      const sheet1 = new THREE.Mesh(sheetGeo, paperBackMaterial);
      sheet1.position.set(-0.16, -0.06, -0.16);
      sheet1.rotation.z = -0.16;
      modelGroup.add(sheet1);

      // Sheet 2 (Middle - tilted moderately left)
      const sheet2 = new THREE.Mesh(sheetGeo, bodyMaterial);
      sheet2.position.set(-0.08, -0.03, -0.08);
      sheet2.rotation.z = -0.09;
      modelGroup.add(sheet2);

      // Sheet 3 (Front Main Sheet)
      const frontSheetGroup = new THREE.Group();
      frontSheetGroup.position.set(0, 0, 0);
      frontSheetGroup.rotation.z = -0.03;
      modelGroup.add(frontSheetGroup);

      const sheet3 = new THREE.Mesh(sheetGeo, paperWhiteMaterial);
      frontSheetGroup.add(sheet3);

      // Folded Top-Right Corner of Front Sheet
      const foldFlapShape = new THREE.Shape();
      foldFlapShape.moveTo(0.35, 1.05);
      foldFlapShape.lineTo(0.78, 0.62);
      foldFlapShape.quadraticCurveTo(0.68, 0.72, 0.42, 0.88);
      foldFlapShape.closePath();

      const foldFlapGeo = new THREE.ExtrudeGeometry(foldFlapShape, {
        depth: 0.05,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      });
      const foldFlapMesh = new THREE.Mesh(foldFlapGeo, accentMaterial);
      foldFlapMesh.position.set(0, 0, 0.06);
      frontSheetGroup.add(foldFlapMesh);

      // Fold shadow underneath flap
      const foldShadowGeo = new THREE.PlaneGeometry(0.35, 0.35);
      const foldShadowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#475569"),
        transparent: true,
        opacity: 0.35,
      });
      const foldShadow = new THREE.Mesh(foldShadowGeo, foldShadowMat);
      foldShadow.position.set(0.52, 0.82, 0.055);
      foldShadow.rotation.z = Math.PI / 4;
      frontSheetGroup.add(foldShadow);

      // =========================================================================
      // 2. EMBOSSED TEXT CONTENT LINES & SIGNATURE
      // =========================================================================
      // In base state: grey clay accent (#475569).
      // On hover: illuminates in crisp J-Pan Blue (#2563EB).
      const addLineBar = (x: number, y: number, length: number) => {
        // Base clay bar
        const barGeo = new THREE.CapsuleGeometry(0.032, Math.max(0.01, length - 0.064), 8, 16);
        const baseBar = new THREE.Mesh(barGeo, ringMaterial);
        baseBar.position.set(x, y, 0.065);
        baseBar.rotation.z = Math.PI / 2;
        frontSheetGroup.add(baseBar);

        // Blue line overlay on hover
        const blueBar = new THREE.Mesh(barGeo, blueLineMaterial);
        blueBar.position.set(x, y, 0.075);
        blueBar.rotation.z = Math.PI / 2;
        frontSheetGroup.add(blueBar);
      };

      // Header Bar (Thicker, centered top)
      addLineBar(-0.18, 0.62, 0.52);

      // Line 1: 2 segments
      addLineBar(-0.35, 0.42, 0.42);
      addLineBar(0.05, 0.42, 0.28);

      // Line 2: 2 segments
      addLineBar(-0.32, 0.25, 0.36);
      addLineBar(0.06, 0.25, 0.32);

      // Line 3: 2 segments
      addLineBar(-0.34, 0.08, 0.45);
      addLineBar(0.08, 0.08, 0.26);

      // Line 4: 1 segment
      addLineBar(-0.25, -0.09, 0.58);

      // Cursive Signature Squiggle (Bottom Left)
      const sigPoints = [
        new THREE.Vector3(-0.52, -0.38, 0.065),
        new THREE.Vector3(-0.46, -0.32, 0.065),
        new THREE.Vector3(-0.42, -0.42, 0.065),
        new THREE.Vector3(-0.38, -0.34, 0.065),
        new THREE.Vector3(-0.32, -0.4, 0.065),
        new THREE.Vector3(-0.26, -0.35, 0.065),
        new THREE.Vector3(-0.2, -0.42, 0.065),
      ];
      const sigCurve = new THREE.CatmullRomCurve3(sigPoints);
      const sigGeo = new THREE.TubeGeometry(sigCurve, 24, 0.022, 8, false);

      // Base signature
      const baseSig = new THREE.Mesh(sigGeo, ringMaterial);
      frontSheetGroup.add(baseSig);

      // Blue signature on hover
      const blueSig = new THREE.Mesh(sigGeo, blueLineMaterial);
      blueSig.position.z += 0.01;
      frontSheetGroup.add(blueSig);

      // Signature Underline Line
      addLineBar(-0.36, -0.48, 0.38);

      // Pen Contact Active Touch Line (Where pen tip meets page)
      addLineBar(0.18, -0.42, 0.24);

      // =========================================================================
      // 3. ERGONOMIC WRITING PEN (FLOATING & POINTING AT PAGE)
      // =========================================================================
      const penGroup = new THREE.Group();
      // Angled pointing downward-left directly at the signature underline
      penGroup.position.set(0.38, 0.05, 0.32);
      penGroup.rotation.z = -0.68; // ~-39 degrees
      penGroup.rotation.x = 0.28;
      penGroup.rotation.y = -0.15;
      modelGroup.add(penGroup);

      // Pen Tip Cone (Pointed down)
      const tipGeo = new THREE.ConeGeometry(0.075, 0.32, 24);
      const tipMesh = new THREE.Mesh(tipGeo, ringMaterial);
      tipMesh.position.set(0, -0.82, 0);
      tipMesh.rotation.x = Math.PI;
      penGroup.add(tipMesh);

      // Pen Grip Collar Ring
      const gripRingGeo = new THREE.TorusGeometry(0.082, 0.016, 12, 28);
      const gripRingMesh = new THREE.Mesh(gripRingGeo, accentMaterial);
      gripRingMesh.position.set(0, -0.66, 0);
      gripRingMesh.rotation.x = Math.PI / 2;
      penGroup.add(gripRingMesh);

      // Blue Pen Grip Collar on Hover
      const blueGripRing = new THREE.Mesh(gripRingGeo, blueLineMaterial);
      blueGripRing.position.set(0, -0.66, 0);
      blueGripRing.rotation.x = Math.PI / 2;
      penGroup.add(blueGripRing);

      // Lower Pen Barrel
      const lowerBarrelGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.65, 24);
      const lowerBarrel = new THREE.Mesh(lowerBarrelGeo, paperWhiteMaterial);
      lowerBarrel.position.set(0, -0.32, 0);
      penGroup.add(lowerBarrel);

      // Center Barrel Joint Band
      const jointRingGeo = new THREE.TorusGeometry(0.094, 0.014, 12, 28);
      const jointRingMesh = new THREE.Mesh(jointRingGeo, accentMaterial);
      jointRingMesh.position.set(0, 0.02, 0);
      jointRingMesh.rotation.x = Math.PI / 2;
      penGroup.add(jointRingMesh);

      // Upper Pen Barrel
      const upperBarrelGeo = new THREE.CylinderGeometry(0.085, 0.09, 0.75, 24);
      const upperBarrel = new THREE.Mesh(upperBarrelGeo, paperWhiteMaterial);
      upperBarrel.position.set(0, 0.42, 0);
      penGroup.add(upperBarrel);

      // Top Dome Cap
      const topCapGeo = new THREE.SphereGeometry(0.085, 20, 16);
      const topCap = new THREE.Mesh(topCapGeo, accentMaterial);
      topCap.position.set(0, 0.8, 0);
      topCap.scale.set(1, 0.7, 1);
      penGroup.add(topCap);

      // Top Clicker Button
      const buttonGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.16, 18);
      const buttonMesh = new THREE.Mesh(buttonGeo, ringMaterial);
      buttonMesh.position.set(0, 0.92, 0);
      penGroup.add(buttonMesh);

      // Pen Pocket Clip
      const clipGeo = new THREE.BoxGeometry(0.038, 0.58, 0.055);
      const clipMesh = new THREE.Mesh(clipGeo, accentMaterial);
      clipMesh.position.set(0.11, 0.45, 0);
      penGroup.add(clipMesh);

      const clipNubGeo = new THREE.SphereGeometry(0.032, 12, 12);
      const clipNub = new THREE.Mesh(clipNubGeo, ringMaterial);
      clipNub.position.set(0.11, 0.18, 0.02);
      penGroup.add(clipNub);

      // Pen contact shadow on paper
      const penShadowGeo = new THREE.PlaneGeometry(0.35, 1.2);
      const penShadowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#1E293B"),
        transparent: true,
        opacity: 0.22,
      });
      const penShadow = new THREE.Mesh(penShadowGeo, penShadowMat);
      penShadow.position.set(0.3, -0.05, 0.055);
      penShadow.rotation.z = -0.68;
      frontSheetGroup.add(penShadow);

      return {
        cameraPosition: [0, 0, 5.1],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("media-blog-document-pen", buildScene, size);

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
