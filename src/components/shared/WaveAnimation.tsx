"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface WaveAnimationProps {
  className?: string;
}

export function WaveAnimation({ className = "" }: WaveAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Mouse tracking for organic response
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Create luminous flowing wave ribbons
    const lineCount = 28;
    const segments = 120;
    const lines: THREE.Line[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    // Colors matching brand palette: #2E5E99, #7BA4D0, and deep accents
    const palette = [
      new THREE.Color("#2E5E99"),
      new THREE.Color("#7BA4D0"),
      new THREE.Color("#1B457D"),
      new THREE.Color("#4A82C4"),
      new THREE.Color("#3A6EA5"),
    ];

    for (let i = 0; i < lineCount; i++) {
      const positions = new Float32Array((segments + 1) * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometries.push(geometry);

      const colorIndex = i % palette.length;
      const baseColor = palette[colorIndex];
      const opacity = 0.25 + 0.6 * Math.sin((i / lineCount) * Math.PI);

      const material = new THREE.LineBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: opacity,
        linewidth: 1, // WebGL default
        blending: THREE.NormalBlending,
      });

      const line = new THREE.Line(geometry, material);
      lines.push(line);
      scene.add(line);
    }

    // Handle viewport visibility to preserve performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime() * 0.75;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update positions of each wave ribbon
      for (let i = 0; i < lineCount; i++) {
        const line = lines[i];
        const positions = line.geometry.attributes.position.array as Float32Array;
        const lineOffset = (i / lineCount) * 2.5;
        const strandSpeed = elapsedTime + lineOffset * 0.4;

        for (let j = 0; j <= segments; j++) {
          const u = j / segments; // 0 to 1 along width
          
          // X spreads across -75 to +75
          const x = (u - 0.5) * 150;

          // Multi-harmonic sine waves creating organic flowing diagonal ribbons
          const wave1 = Math.sin(u * 3.8 + strandSpeed) * 8.5;
          const wave2 = Math.cos(u * 2.2 - strandSpeed * 0.6 + lineOffset) * 6.0;
          const wave3 = Math.sin(u * 6.0 + elapsedTime * 1.2) * 2.5;

          // Diagonal diagonal slant characteristic of modern Awwwards waves
          const diagonalBias = (u - 0.5) * 16;

          // Mouse influence
          const mouseInfluence = Math.exp(-Math.pow((u - 0.5) * 3, 2)) * mouse.y * 8;

          // Y position
          const y = diagonalBias + wave1 + wave2 + wave3 + (i - lineCount / 2) * 0.55 + mouseInfluence;

          // Depth / Z undulation
          const z =
            Math.sin(u * 2.5 + strandSpeed * 0.8 + lineOffset) * 12 +
            (i - lineCount / 2) * 1.2 +
            mouse.x * 5;

          const idx = j * 3;
          positions[idx] = x;
          positions[idx + 1] = y;
          positions[idx + 2] = z;
        }

        line.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();

      geometries.forEach((g) => g.dispose());
      lines.forEach((l) => {
        if (l.material instanceof THREE.Material) {
          l.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
