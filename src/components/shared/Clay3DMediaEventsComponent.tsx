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
 * Clay3DMediaEventsComponent
 * Form: Ultra-Premium Architectural Global Trade Expo Pavilion & Showcase Stage
 * - Sweeping aerodynamic expo portal canopy truss
 * - Dual directional stage spotlights focused on center stage
 * - Panoramic curved expo video backdrop wall
 * - Stepped multi-tier exhibition deck with center product showcase plinth
 * - On Hover: Precision J-Pan Blue (#2563EB) illuminates canopy arch, spotlights, and stage rim
 * - 100% Static & Straight composition, zero lag, 100% visible always.
 */
export function Clay3DMediaEventsComponent({
  isHovered = false,
  className,
  size = 100,
}: Clay3DProps) {
  const buildScene: BuildSceneFn = useMemo(() => {
    return (scene, blueLineMaterial) => {
      const { bodyMaterial, accentMaterial, ringMaterial } = createClayMaterials();

      // Custom pristine stage white clay
      const stageWhiteMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#CBD5E1"),
        roughness: 0.58,
        metalness: 0.05,
        clearcoat: 0.25,
        sheen: 0.35,
        sheenColor: new THREE.Color("#F1F5F9"),
      });

      const modelGroup = new THREE.Group();
      // Straight, aligned, centered pose
      modelGroup.rotation.set(0.12, 0, 0);
      modelGroup.position.set(0, -0.05, 0);
      scene.add(modelGroup);

      // =========================================================================
      // 1. STEPPED MULTI-TIER EXPO STAGE DECK
      // =========================================================================
      // Lower foundation tier
      const lowerDeckGeo = new THREE.CylinderGeometry(1.35, 1.4, 0.16, 36);
      const lowerDeck = new THREE.Mesh(lowerDeckGeo, accentMaterial);
      lowerDeck.position.set(0, -0.75, 0);
      modelGroup.add(lowerDeck);

      // Upper pristine stage floor
      const upperDeckGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.12, 36);
      const upperDeck = new THREE.Mesh(upperDeckGeo, stageWhiteMaterial);
      upperDeck.position.set(0, -0.62, 0);
      modelGroup.add(upperDeck);

      // Deck front chamfer lip
      const deckRimGeo = new THREE.TorusGeometry(1.22, 0.04, 16, 36);
      const deckRim = new THREE.Mesh(deckRimGeo, ringMaterial);
      deckRim.position.set(0, -0.62, 0);
      deckRim.rotation.x = Math.PI / 2;
      modelGroup.add(deckRim);

      // =========================================================================
      // 2. PANORAMIC CURVED EXPO BACKDROP SCREEN
      // =========================================================================
      const wallGeo = new THREE.CylinderGeometry(
        1.08,
        1.08,
        0.95,
        32,
        1,
        true,
        Math.PI * 0.16,
        Math.PI * 0.68
      );
      const wallMesh = new THREE.Mesh(wallGeo, bodyMaterial);
      wallMesh.position.set(0, -0.15, -0.15);
      modelGroup.add(wallMesh);

      // Top Eave Arch Header Trim
      const wallTopGeo = new THREE.TorusGeometry(1.08, 0.045, 14, 32, Math.PI * 0.68);
      const wallTop = new THREE.Mesh(wallTopGeo, ringMaterial);
      wallTop.position.set(0, 0.32, -0.15);
      wallTop.rotation.x = Math.PI / 2;
      wallTop.rotation.z = Math.PI * 0.16;
      modelGroup.add(wallTop);

      // Backdrop Screen Horizontal LED Display Grooves
      for (let i = 0; i < 2; i++) {
        const grooveGeo = new THREE.TorusGeometry(1.07, 0.02, 10, 32, Math.PI * 0.64);
        const groove = new THREE.Mesh(grooveGeo, accentMaterial);
        groove.position.set(0, 0.12 - i * 0.22, -0.15);
        groove.rotation.x = Math.PI / 2;
        groove.rotation.z = Math.PI * 0.18;
        modelGroup.add(groove);
      }

      // =========================================================================
      // 3. ARCHITECTURAL EXPO PORTAL CANOPY TRUSS
      // =========================================================================
      // Left Support Pylon
      const leftPylonGeo = new THREE.BoxGeometry(0.18, 1.25, 0.24);
      const leftPylon = new THREE.Mesh(leftPylonGeo, bodyMaterial);
      leftPylon.position.set(-0.85, -0.05, 0.05);
      modelGroup.add(leftPylon);

      const leftPylonFoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.3), ringMaterial);
      leftPylonFoot.position.set(-0.85, -0.58, 0.05);
      modelGroup.add(leftPylonFoot);

      // Right Support Pylon
      const rightPylonGeo = new THREE.BoxGeometry(0.18, 1.25, 0.24);
      const rightPylon = new THREE.Mesh(rightPylonGeo, bodyMaterial);
      rightPylon.position.set(0.85, -0.05, 0.05);
      modelGroup.add(rightPylon);

      const rightPylonFoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.3), ringMaterial);
      rightPylonFoot.position.set(0.85, -0.58, 0.05);
      modelGroup.add(rightPylonFoot);

      // Sweeping Aerodynamic Overhead Canopy Arch Lintel
      const canopyCurvePoints = [
        new THREE.Vector3(-0.95, 0.48, 0.05),
        new THREE.Vector3(-0.55, 0.78, 0.12),
        new THREE.Vector3(0, 0.92, 0.16),
        new THREE.Vector3(0.55, 0.78, 0.12),
        new THREE.Vector3(0.95, 0.48, 0.05),
      ];
      const canopyCurve = new THREE.CatmullRomCurve3(canopyCurvePoints);
      const canopyGeo = new THREE.TubeGeometry(canopyCurve, 32, 0.09, 16, false);
      const canopyMesh = new THREE.Mesh(canopyGeo, stageWhiteMaterial);
      modelGroup.add(canopyMesh);

      // =========================================================================
      // 4. DUAL STAGE DIRECTIONAL SPOTLIGHTS
      // =========================================================================
      const createSpotlight = (x: number, y: number, z: number, rotZ: number) => {
        const spotGroup = new THREE.Group();
        spotGroup.position.set(x, y, z);
        spotGroup.rotation.z = rotZ;
        spotGroup.rotation.x = 0.35;

        // Swivel Yoke Bracket
        const yokeGeo = new THREE.TorusGeometry(0.14, 0.02, 10, 18, Math.PI);
        const yoke = new THREE.Mesh(yokeGeo, accentMaterial);
        yoke.rotation.x = Math.PI / 2;
        spotGroup.add(yoke);

        // Spotlight Housing Canister
        const canGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.24, 20);
        const can = new THREE.Mesh(canGeo, accentMaterial);
        can.position.set(0, -0.1, 0);
        spotGroup.add(can);

        // Front Lens Bezel Ring
        const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 12, 24), ringMaterial);
        bezel.position.set(0, 0.02, 0);
        bezel.rotation.x = Math.PI / 2;
        spotGroup.add(bezel);

        // Center Lens Glass Dome
        const lens = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), stageWhiteMaterial);
        lens.position.set(0, 0.02, 0);
        lens.scale.set(1, 0.35, 1);
        spotGroup.add(lens);

        modelGroup.add(spotGroup);
        return { spotGroup, bezel };
      };

      const leftSpot = createSpotlight(-0.45, 0.72, 0.15, -0.38);
      const rightSpot = createSpotlight(0.45, 0.72, 0.15, 0.38);

      // =========================================================================
      // 5. CENTER PRODUCT SHOWCASE PLINTH & DOME
      // =========================================================================
      const plinthGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.45, 24);
      const plinth = new THREE.Mesh(plinthGeo, ringMaterial);
      plinth.position.set(0, -0.38, 0.25);
      modelGroup.add(plinth);

      const plinthCapGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.08, 24);
      const plinthCap = new THREE.Mesh(plinthCapGeo, accentMaterial);
      plinthCap.position.set(0, -0.14, 0.25);
      modelGroup.add(plinthCap);

      // Center Showcase Orb / Award Centerpiece
      const centerpieceGeo = new THREE.SphereGeometry(0.18, 24, 18);
      const centerpiece = new THREE.Mesh(centerpieceGeo, stageWhiteMaterial);
      centerpiece.position.set(0, 0.06, 0.25);
      modelGroup.add(centerpiece);

      const centerpieceRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.022, 12, 28), ringMaterial);
      centerpieceRing.position.set(0, 0.06, 0.25);
      centerpieceRing.rotation.x = Math.PI / 2.5;
      modelGroup.add(centerpieceRing);

      // =========================================================================
      // 6. PRECISION BLUE LINES ON HOVER
      // =========================================================================
      // A. Sweeping Canopy Arch Contour Blue Line
      const canopyLineCurve = new THREE.TubeGeometry(canopyCurve, 32, 0.02, 12, false);
      const canopyBlueMesh = new THREE.Mesh(canopyLineCurve, blueLineMaterial);
      canopyBlueMesh.position.z += 0.02;
      modelGroup.add(canopyBlueMesh);

      // B. Left Spotlight Aperture Blue Ring
      const leftSpotBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.018, 12, 28), blueLineMaterial);
      leftSpotBlueRing.position.set(0, 0.025, 0);
      leftSpotBlueRing.rotation.x = Math.PI / 2;
      leftSpot.spotGroup.add(leftSpotBlueRing);

      // C. Right Spotlight Aperture Blue Ring
      const rightSpotBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.018, 12, 28), blueLineMaterial);
      rightSpotBlueRing.position.set(0, 0.025, 0);
      rightSpotBlueRing.rotation.x = Math.PI / 2;
      rightSpot.spotGroup.add(rightSpotBlueRing);

      // D. Panoramic Wall Header Blue Arc Line
      const wallArcPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 24; i++) {
        const angle = Math.PI * 0.16 + (i / 24) * (Math.PI * 0.68);
        wallArcPoints.push(new THREE.Vector3(
          Math.cos(angle) * 1.09,
          0.33,
          -0.15 + Math.sin(angle) * 1.09
        ));
      }
      const wallArcCurve = new THREE.CatmullRomCurve3(wallArcPoints);
      const wallArcGeo = new THREE.TubeGeometry(wallArcCurve, 24, 0.018, 8, false);
      modelGroup.add(new THREE.Mesh(wallArcGeo, blueLineMaterial));

      // E. Center Plinth Showcase Blue Ring
      const plinthBlueRing = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.018, 12, 32), blueLineMaterial);
      plinthBlueRing.position.set(0, -0.14, 0.25);
      plinthBlueRing.rotation.x = Math.PI / 2;
      modelGroup.add(plinthBlueRing);

      // F. Stage Deck Perimeter Arc Blue Line
      const deckArcPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 28; i++) {
        const angle = (i / 28) * Math.PI;
        deckArcPoints.push(new THREE.Vector3(
          Math.cos(angle) * 1.23,
          -0.62 + Math.sin(angle) * 0.38,
          0.35
        ));
      }
      const deckArcCurve = new THREE.CatmullRomCurve3(deckArcPoints);
      const deckArcGeo = new THREE.TubeGeometry(deckArcCurve, 28, 0.018, 8, false);
      modelGroup.add(new THREE.Mesh(deckArcGeo, blueLineMaterial));

      return {
        cameraPosition: [0, 0, 5.2],
        cameraLookAt: [0, 0, 0],
      };
    };
  }, []);

  const { base, hover } = useClayModel("media-events-pavilion-v2", buildScene, size);

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
