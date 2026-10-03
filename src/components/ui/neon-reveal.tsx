"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface NeonRevealProps {
  revealDelay?: number; // Delay in ms before reveal starts (default: 0)
  revealDuration?: number; // Duration of reveal in ms (default: 2000)
  verticalOffset?: number; // Bar position 0..1 (default: 0.7)
  direction?: "horizontal" | "vertical"; // default: "horizontal"
  color?: number; // HSL hue 0..360 (default: 210 for light blue)
  barWidth?: number; // Normalized width factor (default: 1.0)
  barHeight?: number; // Bar thickness (default: 0.02)
  mirrored?: boolean; // Mirror bar on opposite side (default: false)
  expandFrom?: "center" | "left" | "right"; // Expansion origin (default: "center")
  animateOnScroll?: boolean; // Trigger only when scrolled into view (default: false)
  scrollThreshold?: number; // Intersection threshold 0..1 (default: 0.3)
  intensity?: number; // Glow brightness multiplier (default: 1.2)
  glowSpread?: number; // Spread of the diffuse light (default: 1.0)
  glowReach?: number; // Maximum distance downward the glow illuminates (default: 0.35)
  followCursor?: boolean; // React to mouse hover (default: false)
  loop?: boolean; // Replay reveal loop periodically (default: false)
  loopDelay?: number; // Delay between loops in ms (default: 4000)
  onStart?: () => void;
  onComplete?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 iResolution;
uniform float iTime;
uniform float uProgress;
uniform float uVerticalOffset;
uniform float uDirection;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uBarWidth;
uniform float uBarHeight;
uniform float uMirrored;
uniform float uExpandFrom;
uniform float uIntensity;
uniform float uGlowSpread;
uniform float uGlowReach;
uniform vec2 uMousePos;
uniform float uMouseAlpha;

#define N_DIRECTION 16
#define fN_DIRECTION 16.0

#define PI 3.1415926535
#define TAU 6.2831853
#define INF 2.0

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float disSeg(vec2 o, vec2 d, vec2 a, vec2 b){
    vec2 e = a - b;
    vec2 f = a - o;
    if(f.y * e.x < f.x * e.y) return INF;
    float det = d.x * e.y - d.y * e.x;
    if(det == 0.0) return INF;
    float s = (f.x * e.y - f.y * e.x) / det;
    float t = (d.x * f.y - d.y * f.x) / det;
    if(t >= 0.0 && t <= 1.0 && s > 0.0) return s;
    return INF;
}

vec3 sampling(vec2 o, vec2 d){
    vec3 col = vec3(0.0);
    float t;

    float barPos = uVerticalOffset;
    float mirrorPos = 1.0 - uVerticalOffset;
    float center = 0.5;

    if(uDirection < 0.5){
        float leftEdge, rightEdge;

        if(uExpandFrom < 0.5){
            leftEdge = center - (uProgress * uBarWidth * 0.5);
            rightEdge = center + (uProgress * uBarWidth * 0.5);
        } else if(uExpandFrom < 1.5){
            leftEdge = 0.0;
            rightEdge = uProgress * uBarWidth;
        } else {
            leftEdge = 1.0 - (uProgress * uBarWidth);
            rightEdge = 1.0;
        }

        // Curved reach matching the user's marked area (dipping in center, rising towards sides)
        float curvedReach = uGlowReach - 0.08 * pow(2.0 * (o.x - 0.5), 2.0);
        float reachMask = 1.0;
        if(o.y < barPos){
            float dy = barPos - o.y;
            reachMask = smoothstep(curvedReach, curvedReach - 0.12, dy);
        }

        if(reachMask > 0.001){
            float cursorDist = 1.0;
            if(uMouseAlpha > 0.01){
                float distToMouse = distance(o, uMousePos);
                cursorDist = 1.0 + (1.0 - smoothstep(0.0, 0.5, distToMouse)) * 0.5 * uMouseAlpha;
            }

            float spread = uGlowSpread * 3.0;

            if((t = disSeg(o, d, vec2(leftEdge, barPos), vec2(rightEdge, barPos))) < INF){
                col = (uColor1 * exp(-spread * t) + uColor2 * 1.5 * exp(-1.2 * t)) * 1.25 * uIntensity * cursorDist * reachMask;
            } else if((t = disSeg(o, d, vec2(rightEdge, barPos), vec2(leftEdge, barPos))) < INF){
                col = (uColor3 * 2.7 * exp(-spread * t) + uColor2 * 1.0 * exp(-1.2 * t)) * uIntensity * cursorDist * reachMask;
            }
        }

        if(uMirrored > 0.5 && o.y >= mirrorPos){
            float cursorDist = 1.0;
            if(uMouseAlpha > 0.01){
                float distToMouse = distance(o, uMousePos);
                cursorDist = 1.0 + (1.0 - smoothstep(0.0, 0.5, distToMouse)) * 0.5 * uMouseAlpha;
            }

            float spread = uGlowSpread * 3.0;

            if((t = disSeg(o, d, vec2(leftEdge, mirrorPos), vec2(rightEdge, mirrorPos))) < INF){
                col += (uColor1 * exp(-spread * t) + uColor2 * 1.3 * exp(-0.01 * t)) * 1.1 * uIntensity * cursorDist;
            } else if((t = disSeg(o, d, vec2(rightEdge, mirrorPos), vec2(leftEdge, mirrorPos))) < INF){
                col += uColor3 * 2.7 * exp(-spread * t) * uIntensity * cursorDist;
            }
        }
    } else {
        float topEdge, bottomEdge;

        topEdge = center + (uProgress * uBarWidth * 0.5);
        bottomEdge = center - (uProgress * uBarWidth * 0.5);

        if(o.x >= barPos){
            float cursorDist = 1.0;
            if(uMouseAlpha > 0.01){
                float distToMouse = distance(o, uMousePos);
                cursorDist = 1.0 + (1.0 - smoothstep(0.0, 0.5, distToMouse)) * 0.5 * uMouseAlpha;
            }

            float spread = uGlowSpread * 3.0;

            if((t = disSeg(o, d, vec2(barPos, bottomEdge), vec2(barPos, topEdge))) < INF){
                col = (uColor1 * exp(-spread * t) + uColor2 * 1.3 * exp(-0.01 * t)) * 1.1 * uIntensity * cursorDist;
            } else if((t = disSeg(o, d, vec2(barPos, topEdge), vec2(barPos, bottomEdge))) < INF){
                col = uColor3 * 2.7 * exp(-spread * t) * uIntensity * cursorDist;
            }
        }

        if(uMirrored > 0.5 && o.x <= mirrorPos){
            float cursorDist = 1.0;
            if(uMouseAlpha > 0.01){
                float distToMouse = distance(o, uMousePos);
                cursorDist = 1.0 + (1.0 - smoothstep(0.0, 0.5, distToMouse)) * 0.5 * uMouseAlpha;
            }

            float spread = uGlowSpread * 3.0;

            if((t = disSeg(o, d, vec2(mirrorPos, bottomEdge), vec2(mirrorPos, topEdge))) < INF){
                col += (uColor1 * exp(-spread * t) + uColor2 * 1.3 * exp(-0.01 * t)) * 1.1 * uIntensity * cursorDist;
            } else if((t = disSeg(o, d, vec2(mirrorPos, topEdge), vec2(mirrorPos, bottomEdge))) < INF){
                col += uColor3 * 2.7 * exp(-spread * t) * uIntensity * cursorDist;
            }
        }
    }

    return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec3 s = vec3(0.0);
    vec2 uv = fragCoord / iResolution.xy;

    float n = rand(uv + iTime) * 3.0;
    for(int i = 0; i < N_DIRECTION; ++i){
        s += sampling(uv, vec2(sin(n + float(i) * TAU / fN_DIRECTION),
                               cos(n + float(i) * TAU / fN_DIRECTION)));
    }
    s = s / fN_DIRECTION;
    fragColor = vec4(s, 1.0);
}

void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    float alpha = length(color.rgb);
    gl_FragColor = vec4(color.rgb, alpha);
}
`;

function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r, g, b };
}

export function NeonReveal({
  revealDelay = 0,
  revealDuration = 2500,
  verticalOffset = 0.7,
  direction = "horizontal",
  color = 210, // Light blue HSL hue (#7BA4D0)
  barWidth = 1.0,
  barHeight = 0.02,
  mirrored = false,
  expandFrom = "center",
  animateOnScroll = false,
  scrollThreshold = 0.3,
  intensity = 1.3,
  glowSpread = 1.0,
  glowReach = 0.35,
  followCursor = false,
  loop = false,
  loopDelay = 4000,
  onStart,
  onComplete,
  className = "",
  children,
}: NeonRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isStartedRef = useRef(false);
  const isCompletedRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const mouseAlphaRef = useRef(0);
  const [isIntersecting, setIsIntersecting] = useState(!animateOnScroll);

  useEffect(() => {
    let animFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Three.js WebGLRenderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const c1 = hslToRgb(color, 80, 60);
    const c2 = hslToRgb((color + 30) % 360, 70, 50);
    const c3 = hslToRgb((color + 15) % 360, 75, 65);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      uProgress: { value: 0 },
      uVerticalOffset: { value: verticalOffset },
      uDirection: { value: direction === "horizontal" ? 0.0 : 1.0 },
      uColor1: { value: new THREE.Color(c1.r, c1.g, c1.b) },
      uColor2: { value: new THREE.Color(c2.r, c2.g, c2.b) },
      uColor3: { value: new THREE.Color(c3.r, c3.g, c3.b) },
      uBarWidth: { value: barWidth },
      uBarHeight: { value: barHeight },
      uMirrored: { value: mirrored ? 1.0 : 0.0 },
      uExpandFrom: {
        value: expandFrom === "center" ? 0.0 : expandFrom === "left" ? 1.0 : 2.0,
      },
      uIntensity: { value: intensity },
      uGlowSpread: { value: glowSpread },
      uGlowReach: { value: glowReach },
      uMousePos: { value: new THREE.Vector2(0, 0) },
      uMouseAlpha: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let startTime = performance.now();
    let lastTime = 0;
    const durationSeconds = revealDuration / 1000;

    const animate = (currentTime: number) => {
      animFrameId = requestAnimationFrame(animate);

      const delta = currentTime - lastTime;
      if (delta < 16.666666666666668) return;
      lastTime = currentTime - (delta % 16.666666666666668);

      if (followCursor) {
        const mouse = uniforms.uMousePos.value;
        const target = mousePosRef.current;
        const curAlpha = uniforms.uMouseAlpha.value;
        const targetAlpha = mouseAlphaRef.current;

        mouse.x += (target.x - mouse.x) * 0.1;
        mouse.y += (target.y - mouse.y) * 0.1;
        uniforms.uMouseAlpha.value += (targetAlpha - curAlpha) * 0.08;
      }

      uniforms.iTime.value = (currentTime - startTime) / 1000;

      if (isIntersecting) {
        const elapsed = currentTime - startTime;

        if (loop) {
          const totalCycle = revealDelay + revealDuration + loopDelay;
          const cycleTime = elapsed % totalCycle;

          if (cycleTime < revealDelay) {
            uniforms.uProgress.value = 0;
          } else if (cycleTime < revealDelay + revealDuration) {
            const t = Math.min((cycleTime - revealDelay) / revealDuration, 1);
            const progress = 1 - Math.pow(1 - t, 3);
            uniforms.uProgress.value = progress;
          } else {
            uniforms.uProgress.value = 1.0;
          }
        } else {
          if (elapsed < revealDelay) {
            uniforms.uProgress.value = 0;
            if (!isStartedRef.current) {
              isStartedRef.current = true;
              onStart?.();
            }
          } else {
            const t = Math.min((elapsed - revealDelay) / 1000 / durationSeconds, 1);
            const progress = 1 - Math.pow(1 - t, 3);
            uniforms.uProgress.value = progress;

            if (t >= 1 && !isCompletedRef.current) {
              isCompletedRef.current = true;
              onComplete?.();
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!followCursor || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
      mouseAlphaRef.current = 1;
    };

    const handleMouseLeave = () => {
      if (followCursor) {
        mouseAlphaRef.current = 0;
      }
    };

    if (followCursor) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      if (followCursor && canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    revealDelay,
    revealDuration,
    verticalOffset,
    direction,
    color,
    barWidth,
    barHeight,
    mirrored,
    expandFrom,
    isIntersecting,
    intensity,
    glowSpread,
    glowReach,
    followCursor,
    loop,
    loopDelay,
    onStart,
    onComplete,
  ]);

  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
          }
        });
      },
      { threshold: scrollThreshold }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOnScroll, scrollThreshold]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          willChange: "transform",
        }}
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}

export default NeonReveal;
