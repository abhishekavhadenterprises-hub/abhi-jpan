"use client";

import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Shared WebGL Renderer Singleton across the entire application
// Solves browser WebGL context limits (MAX 16) and eliminates all GPU lag
let sharedRenderer: THREE.WebGLRenderer | null = null;

function getSharedRenderer(): THREE.WebGLRenderer | null {
  if (typeof window === "undefined") return null;
  if (!sharedRenderer) {
    try {
      const canvas = document.createElement("canvas");
      sharedRenderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
      sharedRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      sharedRenderer.toneMappingExposure = 1.25;
    } catch (e) {
      console.warn("WebGL initialization fallback:", e);
      return null;
    }
  }
  return sharedRenderer;
}

// Global in-memory cache for rendered 3D snapshot data URLs
const renderCache = new Map<string, { base: string; hover: string }>();

export type BuildSceneFn = (
  scene: THREE.Scene,
  blueLineMaterial: THREE.MeshBasicMaterial
) => { cameraPosition?: [number, number, number]; cameraLookAt?: [number, number, number] } | void;

/**
 * Procedurally renders the 3D model using Three.js in 2 states:
 * 1. Base: Totally static, straight matte architectural grey clay
 * 2. Hover: Exact same straight model with precision Blue Lines illuminated
 */
export function renderClayPair(
  key: string,
  buildScene: BuildSceneFn,
  size = 115
): { base: string; hover: string } {
  const cacheKey = `${key}_${size}`;
  const cached = renderCache.get(cacheKey);
  if (cached) return cached;

  const renderer = getSharedRenderer();
  if (!renderer) return { base: "", hover: "" };

  const renderSize = Math.max(size * 2, 240); // 2x retina sharpness
  renderer.setSize(renderSize, renderSize);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 5.5);

  // Studio Lighting (Neutral Pure Studio Lights)
  const ambLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.2);
  fillLight.position.set(-4, -2, 3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
  rimLight.position.set(0, 5, -4.5);
  scene.add(rimLight);

  // Soft Contact Drop Shadow
  const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, "rgba(30, 41, 59, 0.32)");
    grad.addColorStop(0.5, "rgba(30, 41, 59, 0.12)");
    grad.addColorStop(1, "rgba(30, 41, 59, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.65 });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -1.45;
  scene.add(shadowMesh);

  // Precision Blue Lines Material
  const blueLineMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#2563EB"),
    transparent: true,
    opacity: 0,
  });

  // Build the user model
  const config = buildScene(scene, blueLineMaterial) || {};
  if (config.cameraPosition) {
    camera.position.set(...config.cameraPosition);
  }
  if (config.cameraLookAt) {
    camera.lookAt(...config.cameraLookAt);
  }

  // 1. Render Base (Grey Clay, Straight, No Blue Lines)
  blueLineMaterial.opacity = 0;
  renderer.render(scene, camera);
  const base = renderer.domElement.toDataURL("image/png");

  // 2. Render Hover (Exact same straight position with precision Blue Lines)
  blueLineMaterial.opacity = 1;
  renderer.render(scene, camera);
  const hover = renderer.domElement.toDataURL("image/png");

  const result = { base, hover };
  renderCache.set(cacheKey, result);

  // Dispose scene resources to keep memory clean
  scene.clear();
  shadowGeo.dispose();
  shadowMat.dispose();
  shadowTex.dispose();

  return result;
}

/**
 * React hook to retrieve pre-rendered base and hover 3D snapshots
 */
export function useClayModel(key: string, buildScene: BuildSceneFn, size = 115) {
  const [data, setData] = useState<{ base: string; hover: string }>(() => {
    const cacheKey = `${key}_${size}`;
    return renderCache.get(cacheKey) || { base: "", hover: "" };
  });

  useEffect(() => {
    if (!data.base) {
      const res = renderClayPair(key, buildScene, size);
      setData(res);
    }
  }, [key, buildScene, size, data.base]);

  return data;
}

/**
 * Standard Materials for Grey Clay Procedural Geometry
 */
export function createClayMaterials() {
  const greyBody = new THREE.Color("#8E9CAE");
  const greyAccent = new THREE.Color("#475569");
  const greyRing = new THREE.Color("#64748B");

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: greyBody,
    roughness: 0.62,
    metalness: 0.06,
    clearcoat: 0.2,
    sheen: 0.35,
    sheenColor: new THREE.Color("#E2E8F0"),
  });

  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: greyAccent,
    roughness: 0.55,
    metalness: 0.1,
    clearcoat: 0.25,
    sheen: 0.3,
  });

  const ringMaterial = new THREE.MeshPhysicalMaterial({
    color: greyRing,
    roughness: 0.5,
    metalness: 0.12,
    clearcoat: 0.3,
  });

  return { bodyMaterial, accentMaterial, ringMaterial };
}

interface StaticClayViewProps {
  base: string;
  hover: string;
  isHovered?: boolean;
  size?: number;
  className?: string;
}

/**
 * 100% Static & Straight 3D View Component
 * - Sits in that straight position only (zero wobbling, zero tilting, zero floating).
 * - On hover: In that position ONLY, the crisp blue lines smoothly illuminate.
 * - Zero WebGL context overload, zero lag, 100% visible always.
 */
export function StaticClayView({
  base,
  hover,
  isHovered = false,
  size = 100,
  className,
}: StaticClayViewProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center select-none cursor-pointer", className)}
      style={{ width: size, height: size }}
    >
      {/* Base 3D Model: Straight, Static Matte Grey Clay */}
      {base && (
        <img
          src={base}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />
      )}

      {/* Hover 3D Model: Exact same straight position with precision Blue Lines */}
      {hover && (
        <img
          src={hover}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
