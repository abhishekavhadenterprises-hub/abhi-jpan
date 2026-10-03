"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useSpring, useMotionValue } from "framer-motion";

export interface Relay3DWaveSpineProps {
  className?: string;
  speed?: number;
  fixed?: boolean;
}

export function Relay3DWaveSpine({
  className = "",
  speed = 0.8,
  fixed = false,
}: Relay3DWaveSpineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef({ current: 0, target: 0, velocity: 0 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Interactive Cursor Ring matching user screenshot
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 250 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!cursorVisible) setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, cursorVisible]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

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

    renderer.setClearColor(0x060709, 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // 2. High-Fidelity Volumetric Ethereal Green Silk Shader
    // Matches the exact glowing luminous green wave from the Relay template
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform float uScroll;
      uniform float uVelocity;
      uniform vec2 uMouse;

      // Exact Relay Template Palette: Obsidian Dark + Luminous Aurora Lime
      const vec3 cBackground = vec3(0.024, 0.027, 0.035); // #060709 Deep Obsidian
      const vec3 cDarkGreen  = vec3(0.040, 0.160, 0.080); // #0a2914 Deep Emerald Velvet
      const vec3 cOliveGreen = vec3(0.180, 0.380, 0.100); // Muted organic olive undertone
      const vec3 cAppleGreen = vec3(0.480, 0.780, 0.160); // #7ac729 Vibrant Lime Green
      const vec3 cNeonLime   = vec3(0.769, 0.949, 0.263); // #c4f243 Signature Relay Lime
      const vec3 cWhiteCrest = vec3(0.960, 1.000, 0.880); // Luminous white-hot spine crest

      // Pseudo-random dither to prevent 8-bit color banding
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      // Smooth serpentine river spine flowing vertically through the entire page
      float getWaveSpine(float y, float scroll, float time, float vel) {
        float travel = scroll * 1.8 + vel * 0.4;
        float phase = (1.0 - y) * 2.8 + travel;

        // Serpentine curve: sweeps from top-left toward center-right and back
        float s1 = sin(phase * 0.85) * 0.42 - 0.08;
        float s2 = cos(phase * 0.45 + 0.6) * 0.24;
        float microSway = sin(phase * 1.8 + time * 0.4) * 0.04;

        return s1 + s2 + microSway;
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = (uv - 0.5);
        p.x *= aspect;

        // Subtle mouse parallax
        p.x += uMouse.x * 0.04;
        p.y += uMouse.y * 0.03;

        float yNorm = uv.y; // 0.0 (bottom) to 1.0 (top)

        // Primary Wave Spine
        float spineX = getWaveSpine(yNorm, uScroll, uTime, uVelocity) * aspect;

        // Filament ripples (gives that organic silk / fibrous auroral texture)
        float filament1 = sin(yNorm * 22.0 - uScroll * 3.5 + uTime * 0.7) * 0.045;
        float filament2 = cos(yNorm * 38.0 + uScroll * 2.0 - uTime * 0.5) * 0.025;
        float filament3 = sin(yNorm * 65.0 - uTime * 1.2) * 0.012;
        float totalRipple = filament1 + filament2 + filament3;

        float dist = abs(p.x - spineX + totalRipple);

        // --- LAYER 1: Wide Ethereal Aurora Glow Canopy ---
        float canopyWidth = 1.65;
        float canopyGlow = exp(-pow(dist / canopyWidth, 2.0) * 1.15);

        // --- LAYER 2: Vibrant Mid-Body Luminous Silk Veil ---
        float bodyWidth = 0.95;
        float bodyGlow = exp(-pow(dist / bodyWidth, 2.0) * 1.85);

        // --- LAYER 3: Dense Core Beam ---
        float coreWidth = 0.38;
        float coreGlow = exp(-pow(dist / coreWidth, 2.0) * 2.60);

        // --- LAYER 4: Multi-strand Silk Folds ---
        float fold1 = exp(-pow(abs(p.x - spineX + sin(yNorm * 5.0 + uScroll * 1.8) * 0.25) / 0.38, 2.0) * 2.0);
        float fold2 = exp(-pow(abs(p.x - spineX - cos(yNorm * 4.2 - uScroll * 1.4) * 0.28) / 0.42, 2.0) * 2.0);
        float silkFolds = (fold1 * 0.55 + fold2 * 0.45) * (0.85 + 0.25 * sin(yNorm * 6.0 - uScroll * 2.2));

        // --- LAYER 5: Secondary Companion Stream ---
        float compX = getWaveSpine(yNorm, uScroll + 0.18, uTime * 0.8, uVelocity) * aspect * 0.92;
        float compDist = abs(p.x - compX + filament2);
        float compGlow = exp(-pow(compDist / 1.15, 2.0) * 1.70);

        // Total Multi-dimensional Luminosity
        float totalAlpha = clamp(
          canopyGlow * 0.38 + 
          bodyGlow * 0.72 + 
          coreGlow * 0.85 + 
          silkFolds * 0.45 + 
          compGlow * 0.32, 
          0.0, 
          0.98
        );

        // Color Stratification matching reference image:
        // Base dark velvet green
        vec3 ribbon = cDarkGreen;

        // Olive and Apple Green Body
        ribbon = mix(ribbon, cOliveGreen, canopyGlow * 0.85);
        ribbon = mix(ribbon, cAppleGreen, bodyGlow * 0.88);

        // Intense Neon Lime Highlight on silk folds and core
        ribbon = mix(ribbon, cNeonLime, silkFolds * 0.75 + coreGlow * 0.85);

        // Brilliant White-Lime Specular Crest at the brightest center
        ribbon = mix(ribbon, cWhiteCrest, pow(coreGlow, 2.5) * 0.92);

        // Companion veil color
        ribbon = mix(ribbon, cAppleGreen, compGlow * 0.40);

        // Blend boldly over deep obsidian backdrop
        vec3 finalCol = mix(cBackground, ribbon, totalAlpha);

        // Anti-banding dither
        float dither = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * (1.0 / 255.0) * 1.8;
        finalCol += dither;

        gl_FragColor = vec4(finalCol, 1.0);
      }
    `;

    const uniforms = {
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // 3. Floating Ambient Glowing Lime Dust Motes
    const MOTE_COUNT = 60;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(MOTE_COUNT * 3);
    const moteSeeds = new Float32Array(MOTE_COUNT * 3);

    for (let i = 0; i < MOTE_COUNT; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 2;
      motePos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      motePos[i * 3 + 2] = 0;

      moteSeeds[i * 3] = 0.04 + Math.random() * 0.08;
      moteSeeds[i * 3 + 1] = Math.random() * 100;
      moteSeeds[i * 3 + 2] = 0.5 + Math.random() * 1.5;
    }
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));

    const moteMat = new THREE.PointsMaterial({
      color: 0xc4f243, // #c4f243 Neon Lime
      size: 2.4,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // 4. Scroll Tracking
    const getScrollY = () => {
      if (typeof window === "undefined") return 0;
      return window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    };

    const updateScrollTarget = () => {
      const vh = window.innerHeight || 1;
      const scrollY = getScrollY();
      scrollRef.current.target = scrollY / vh;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("wheel", updateScrollTarget, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    updateScrollTarget();

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let previousScroll = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      updateScrollTarget();
      const elapsed = clock.getElapsedTime() * speed;

      // Scroll lerp
      const currentScroll = scrollRef.current.current;
      const targetScroll = scrollRef.current.target;
      scrollRef.current.current += (targetScroll - currentScroll) * 0.08;

      const scrollVelocity = (scrollRef.current.current - previousScroll) * 15;
      previousScroll = scrollRef.current.current;

      // Mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update Uniforms
      uniforms.uTime.value = elapsed;
      uniforms.uScroll.value = scrollRef.current.current;
      uniforms.uVelocity.value = scrollVelocity;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Animate motes
      const mPos = moteGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < MOTE_COUNT; i++) {
        const spd = moteSeeds[i * 3];
        const seed = moteSeeds[i * 3 + 1];

        mPos[i * 3 + 1] -= spd * 0.012 + scrollVelocity * 0.02;
        mPos[i * 3] += Math.sin(elapsed * 0.35 + seed) * 0.0018;

        if (mPos[i * 3 + 1] < -1.1) {
          mPos[i * 3 + 1] = 1.1;
          mPos[i * 3] = (Math.random() - 0.5) * 2;
        } else if (mPos[i * 3 + 1] > 1.1) {
          mPos[i * 3 + 1] = -1.1;
        }
      }
      moteGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      uniforms.uResolution.value.set(w, h);
      renderer.setSize(w, h);
      updateScrollTarget();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("wheel", updateScrollTarget);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      moteGeo.dispose();
      moteMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [speed]);

  return (
    <>
      {/* Real-time 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        className={`${fixed ? "fixed" : "absolute"} inset-0 w-full h-full pointer-events-none select-none overflow-hidden bg-[#060709] ${className}`}
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Subtle Coordinate Crosshair Micro-Grid */}
      <div
        className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none opacity-20`}
        style={{
          zIndex: 1,
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(196, 242, 67, 0.30) 1px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px, 144px 144px, 144px 144px",
        }}
        aria-hidden="true"
      />

      {/* Interactive Lime Cursor Follower Ring (○) from reference image */}
      {cursorVisible && (
        <motion.div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-[#c4f243] shadow-[0_0_15px_rgba(196,242,67,0.6)] flex items-center justify-center transition-opacity duration-200"
          style={{
            left: springX,
            top: springY,
          }}
        >
          <div className="w-1 h-1 rounded-full bg-[#c4f243]" />
        </motion.div>
      )}
    </>
  );
}

export default Relay3DWaveSpine;
