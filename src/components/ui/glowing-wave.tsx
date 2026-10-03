"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface GlowingWaveProps {
  speed?: number; // Animation speed multiplier (default: 0.20)
  color1?: string; // Primary wave color (default: #7BA4D0)
  color2?: string; // Secondary wave color (default: #2E5E99)
  frequency?: number; // Wave spatial frequency (default: 0.8)
  intensity?: number; // Wave sharpness/contrast (default: 2.0)
  complexity?: number; // Wave detail complexity (default: 0.5)
  opacity?: number; // Overall opacity factor (default: 0.45)
  transparent?: boolean; // Enable transparent alpha blending (default: true)
  backgroundColor?: string; // Fallback background color (default: #000000)
  className?: string;
  children?: React.ReactNode;
}

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uBackgroundColor;
uniform float uTransparent;
uniform float uFrequency;
uniform float uIntensity;
uniform float uComplexity;
uniform float uOpacity;

// Subtle pseudo-random hash for anti-banding film dither
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  
  // Animation time
  float t = iTime * 0.7;
  
  // Compound harmonic wave formula matching the exact smooth crest in the reference image
  float x = uv.x * (uFrequency * 2.8);
  
  float w1 = sin(x * 1.85 + t * 0.65) * 0.17;
  float w2 = cos(x * 3.4 - t * 0.45 + 1.2) * (0.06 * max(uComplexity, 0.2));
  float w3 = sin(x * 0.95 + t * 0.3 + 2.8) * 0.08;
  float w4 = sin(x * 5.5 + t * 0.8) * (0.02 * max(uComplexity, 0.1));
  
  // Base wave height centered around 48% of the section height
  float waveHeight = 0.48 + w1 + w2 + w3 + w4;
  
  // Vertical signed distance to wave surface
  float dist = uv.y - waveHeight;
  
  // 1. Sharp Glowing Core line (the luminous white/cyan crest edge)
  float coreThickness = 0.009 / max(uIntensity, 0.4);
  float core = exp(-abs(dist) / coreThickness);
  
  // 2. Soft luminous crest halo (diffusing immediately above and below the crest)
  float halo = exp(-abs(dist) * (20.0 / max(uIntensity, 0.4)));
  
  // 3. Wide ethereal bloom hugging the wave ridge
  float ridgeBloom = exp(-abs(dist) * 7.0) * 0.4;
  
  // 4. Smooth diffuse body fill underneath the wave (flowing downward into the section)
  float underFill = 0.0;
  if (dist <= 0.0) {
    float depth = -dist;
    // Exponential falloff extending downward into the body
    underFill = exp(-depth * 2.6) * 0.72;
    // Ambient soft fill lower down
    underFill += smoothstep(0.65, 0.0, depth) * 0.28;
  }
  
  // Total luminous intensity
  float totalLight = core * 1.35 + halo * 0.9 + ridgeBloom * 0.5 + underFill * 0.95;
  
  // Colors:
  // - Crest core: brilliant white light tinted with uColor1
  // - Upper crest & halo: uColor1 (#7BA4D0)
  // - Wave body below: smooth blend into uColor2 (#2E5E99)
  vec3 crestColor = mix(uColor1, vec3(1.0, 1.0, 1.0), 0.82);
  vec3 haloColor = mix(uColor2, uColor1, clamp(1.0 - abs(dist) * 6.0, 0.0, 1.0));
  vec3 bodyColor = mix(uColor2 * 0.85, uColor1, clamp(1.0 - (-dist) * 3.2, 0.0, 1.0));
  
  // Composite color across layers
  vec3 finalRgb = mix(bodyColor, haloColor, clamp(halo + ridgeBloom, 0.0, 1.0));
  finalRgb = mix(finalRgb, crestColor, clamp(core, 0.0, 1.0));
  
  // Film grain dither to eliminate 8-bit banding on dark backgrounds
  float dither = (hash(gl_FragCoord.xy + fract(iTime)) - 0.5) * (1.0 / 255.0) * 2.0;
  finalRgb += dither;
  
  // Final alpha calculation
  float alpha = clamp(totalLight * uOpacity, 0.0, 1.0);
  
  if (uTransparent > 0.5) {
    if (alpha < 0.005) {
      gl_FragColor = vec4(0.0);
      return;
    }
    // Premultiplied alpha output
    gl_FragColor = vec4(finalRgb * alpha, alpha);
  } else {
    vec3 comp = mix(uBackgroundColor, finalRgb, alpha);
    gl_FragColor = vec4(comp, 1.0);
  }
}
`;

function hexToRgb(hex: string) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? {
        r: parseInt(match[1], 16) / 255,
        g: parseInt(match[2], 16) / 255,
        b: parseInt(match[3], 16) / 255,
      }
    : { r: 0.48, g: 0.64, b: 0.82 };
}

export function GlowingWave({
  speed = 0.20,
  color1 = "#7BA4D0",
  color2 = "#2E5E99",
  frequency = 0.8,
  intensity = 2.0,
  complexity = 0.5,
  opacity = 0.45,
  transparent = true,
  backgroundColor = "#000000",
  className,
  children,
}: GlowingWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const bg = hexToRgb(backgroundColor);

    const rect = container.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 380;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(width * dpr, height * dpr, 1) },
      uColor1: { value: new THREE.Color(c1.r, c1.g, c1.b) },
      uColor2: { value: new THREE.Color(c2.r, c2.g, c2.b) },
      uBackgroundColor: { value: new THREE.Color(bg.r, bg.g, bg.b) },
      uTransparent: { value: transparent ? 1.0 : 0.0 },
      uFrequency: { value: frequency },
      uIntensity: { value: intensity },
      uComplexity: { value: complexity },
      uOpacity: { value: opacity },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      premultipliedAlpha: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    startTimeRef.current = performance.now();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      uniforms.iTime.value = elapsed * speed;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const b = container.getBoundingClientRect();
      const w = b.width || 300;
      const h = b.height || 380;
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(w * dpr, h * dpr, 1);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    speed,
    color1,
    color2,
    frequency,
    intensity,
    complexity,
    opacity,
    transparent,
    backgroundColor,
  ]);

  return (
    <div
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}

export default GlowingWave;
