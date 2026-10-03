"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { CopperPipeFitting3D } from "@/components/brand-new-day/models/CopperPipeFitting3D";
import { FullPageScrollTracker } from "@/components/brand-new-day/engine/FullPageScrollTracker";
import { clamp01 } from "@/components/brand-new-day/engine/types";

export interface RelayWaveBackgroundProps {
  className?: string;
  speed?: number;
}

/**
 * Renders the True Solid 3D Precision Copper Fitting with Blue Collar Ring
 * Travelling continuously down the entire webpage as the user scrolls
 * Strictly bounded between <Hero /> and <ContactMap /> (Globe section)
 */
export function RelayWaveBackground({
  className = "",
}: RelayWaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0); // Transparent so website cards and design shine through
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // 2. High-Grade Studio Lighting for PBR Metallic Copper & Cobalt Blue
    // Ambient light: Soft navy blue shadow tone
    const ambientLight = new THREE.AmbientLight(0x0d2440, 0.95);
    scene.add(ambientLight);

    // Key Light: Warm bright industrial studio light creating sharp specular reflections on copper
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.8);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    // Fill Light: Soft neutral light
    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 1.2);
    fillLight.position.set(-6, -3, 5);
    scene.add(fillLight);

    // Rim Light: Vibrant JPAN cobalt blue back-light highlighting the silhouette of the pipe
    const rimLight = new THREE.DirectionalLight(0x2b4fd0, 2.4);
    rimLight.position.set(0, -6, -4);
    scene.add(rimLight);

    // 3. The True Solid 3D Copper Pipe Fitting with Blue Collar
    const fitting = new CopperPipeFitting3D();
    scene.add(fitting.group);

    // 4. Subtle Industrial Blueprint Metrology Grid Rings (Floating in background)
    const ringsGroup = new THREE.Group();
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x2b4fd0,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < 4; i++) {
      const ringGeom = new THREE.RingGeometry(3.5 + i * 2.2, 3.52 + i * 2.2, 64);
      const ringMesh = new THREE.Line(ringGeom, ringMat);
      ringMesh.position.set(0, 0, -2.0 - i * 1.5);
      ringMesh.rotation.x = Math.PI * 0.25;
      ringsGroup.add(ringMesh);
    }
    scene.add(ringsGroup);

    // 5. Scroll Travel Engine
    const tracker = new FullPageScrollTracker();
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Scroll calculation relative to middle stage
    let currentP = 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      if (docHeight <= 0) return;

      // Start right after Hero (~800px) and end before Globe section
      // Map scroll into normalized 0 -> 1 progress
      const heroOffset = winHeight * 0.75;
      const globeOffset = docHeight - winHeight * 0.95;
      const effectiveDist = globeOffset - heroOffset;

      if (effectiveDist > 0) {
        currentP = clamp01((scrollY - heroOffset) / effectiveDist);
      } else {
        currentP = clamp01(scrollY / docHeight);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 6. 60 FPS Deterministic RAF Loop
    let animId: number;
    const renderLoop = () => {
      // Evaluate exact 3D travel position and rotation on scroll p
      const frame = tracker.evaluate(currentP, mouseX, mouseY, reducedMotion);

      fitting.group.position.copy(frame.position);
      fitting.group.rotation.copy(frame.rotation);
      fitting.group.scale.setScalar(frame.scale);
      fitting.group.visible = frame.opacity > 0.01;

      // Rotate blueprint rings subtly on scroll
      ringsGroup.rotation.z = currentP * Math.PI * 1.5;
      ringsGroup.position.y = frame.position.y * 0.4;
      ringsGroup.visible = frame.opacity > 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      fitting.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none ${className}`}
    />
  );
}

export default RelayWaveBackground;
