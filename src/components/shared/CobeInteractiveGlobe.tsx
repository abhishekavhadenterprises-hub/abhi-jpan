"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import {
  INDIA_BOUNDARY,
  STATE_BOUNDARIES,
  buildBoundaryArcs,
  getStateBoundaryKey,
} from "@/data/indiaStateBoundaries";

export interface PlantLocationMarker {
  id: string;
  name: string;
  city: string;
  state?: string;
  lat: number;
  lng: number;
  phi: number;
  theta: number;
  size?: number;
}

interface CobeInteractiveGlobeProps {
  markers: PlantLocationMarker[];
  activeIndex: number | null;
  onSelectMarker?: (index: number) => void;
  accentColor?: [number, number, number];
  isDark?: boolean;
  className?: string;
}

// 4 Official J Pan Website Brand Colors:
// #0D2440: Dark Industrial Navy / Charcoal
// #2E5E99: Primary Industrial Deep Blue
// #7BA4D0: Secondary Light Steel Accent Blue
// #E7F0FA: Metallic Ice Silver
const BRAND = {
  darkNavy: [13 / 255, 36 / 255, 64 / 255] as [number, number, number], // #0D2440
  primaryBlue: [46 / 255, 94 / 255, 153 / 255] as [number, number, number], // #2E5E99
  lightBlue: [123 / 255, 164 / 255, 208 / 255] as [number, number, number], // #7BA4D0
  iceSilver: [231 / 255, 240 / 255, 250 / 255] as [number, number, number], // #E7F0FA
  pureWhite: [1, 1, 1] as [number, number, number],
};

export function CobeInteractiveGlobe({
  markers,
  activeIndex,
  accentColor = BRAND.primaryBlue,
  isDark = false,
  className = "",
}: CobeInteractiveGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const defaultPhi = markers[0]?.phi ?? (-77.5014 * Math.PI) / 180 - Math.PI / 2;
  const defaultTheta = markers[0]?.theta ?? (28.5129 * Math.PI) / 180;
  const phiRef = useRef(defaultPhi);
  const thetaRef = useRef(defaultTheta);
  const targetPhiRef = useRef(defaultPhi);
  const targetThetaRef = useRef(defaultTheta);
  const isDragging = useRef(false);
  const dragStartPhi = useRef(defaultPhi);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  // Google Earth fly-to flight interpolator
  const flightRef = useRef<{
    isFlying: boolean;
    startPhi: number;
    startTheta: number;
    targetPhi: number;
    targetTheta: number;
    startTime: number;
    duration: number;
  }>({
    isFlying: false,
    startPhi: defaultPhi,
    startTheta: defaultTheta,
    targetPhi: defaultPhi,
    targetTheta: defaultTheta,
    startTime: 0,
    duration: 1800,
  });

  const buildMarkers = (currActiveIdx: number | null) => {
    // 1. Idle state: Clean pinpoint dots at exact plant locations in signature primary blue
    if (currActiveIdx === null) {
      return markers.map((m) => ({
        location: [m.lat, m.lng] as [number, number],
        size: 0.020,
        color: isDark ? BRAND.lightBlue : BRAND.primaryBlue,
      }));
    }

    // 2. Active state: Refined pin marker with light blue halo & crisp white core
    const active = markers[currActiveIdx];
    const otherHubs = markers
      .filter((_, idx) => idx !== currActiveIdx)
      .map((m) => ({
        location: [m.lat, m.lng] as [number, number],
        size: 0.014,
        color: isDark ? BRAND.primaryBlue : BRAND.lightBlue,
      }));

    if (!active) return otherHubs;

    const activeHalo = {
      location: [active.lat, active.lng] as [number, number],
      size: 0.026,
      color: isDark ? BRAND.iceSilver : BRAND.lightBlue, // #7BA4D0 in light mode
    };
    const activeCore = {
      location: [active.lat, active.lng] as [number, number],
      size: 0.013,
      color: BRAND.pureWhite,
    };

    return [...otherHubs, activeHalo, activeCore];
  };

  const buildArcs = (currActiveIdx: number | null) => {
    // Outer border (India National Boundary) - Dark brand blue (#0D2440 in light mode)
    const outerIndiaBorderColor: [number, number, number] = isDark
      ? BRAND.lightBlue
      : BRAND.darkNavy;

    // Inner border (State Boundary) - Light brand blue (#7BA4D0 in light mode)
    const innerStateBorderColor: [number, number, number] = isDark
      ? BRAND.iceSilver
      : BRAND.lightBlue;

    // Idle state: Draw outer India boundary in dark brand color
    if (currActiveIdx === null) {
      return buildBoundaryArcs(INDIA_BOUNDARY, outerIndiaBorderColor);
    }

    // Active state: Outer India border in dark blue, inner State border in light blue
    const active = markers[currActiveIdx];
    const stateKey = getStateBoundaryKey(active?.state);
    if (stateKey && STATE_BOUNDARIES[stateKey]) {
      const indiaArcs = buildBoundaryArcs(INDIA_BOUNDARY, outerIndiaBorderColor);
      const stateArcs = buildBoundaryArcs(STATE_BOUNDARIES[stateKey], innerStateBorderColor);
      return [...indiaArcs, ...stateArcs];
    }

    return buildBoundaryArcs(INDIA_BOUNDARY, outerIndiaBorderColor);
  };

  // Trigger Google Earth fly-to camera trajectory whenever activeIndex changes
  useEffect(() => {
    const targetPhi =
      activeIndex !== null && markers[activeIndex] ? markers[activeIndex].phi : defaultPhi;
    const targetTheta =
      activeIndex !== null && markers[activeIndex] ? markers[activeIndex].theta : defaultTheta;

    flightRef.current = {
      isFlying: true,
      startPhi: phiRef.current,
      startTheta: thetaRef.current,
      targetPhi,
      targetTheta,
      startTime: performance.now(),
      duration: 1800, // 1.8s cinematic fly-in
    };

    if (globeRef.current) {
      globeRef.current.update({
        markers: buildMarkers(activeIndex),
        arcs: buildArcs(activeIndex),
      });
    }
  }, [activeIndex, markers]);

  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const cobeMarkers = buildMarkers(activeIndex);
    const cobeArcs = buildArcs(activeIndex);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2, 2),
      width: (width || 800) * 2,
      height: (width || 800) * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.3 : 1.7,
      mapSamples: 16000,
      mapBrightness: isDark ? 6.5 : 1.6,
      baseColor: isDark ? BRAND.darkNavy : BRAND.iceSilver,
      markerColor: isDark ? BRAND.lightBlue : BRAND.primaryBlue,
      glowColor: isDark ? BRAND.primaryBlue : BRAND.iceSilver,
      markers: cobeMarkers,
      arcs: cobeArcs,
      arcColor: isDark ? BRAND.lightBlue : BRAND.darkNavy,
      arcWidth: 0.35, // Razor-thin, crisp boundary vector lines
      arcHeight: 0,
      markerElevation: 0.012,
    });

    globeRef.current = globe;
    let animationFrameId: number;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      const now = performance.now();

      // 1. Google Earth fly-to flight trajectory (quintic ease-in-out S-curve)
      if (flightRef.current.isFlying) {
        const { startTime, duration, startPhi, startTheta, targetPhi, targetTheta } =
          flightRef.current;
        const progress = Math.min(1, (now - startTime) / duration);

        // Quintic S-curve: gentle lift-off, high-speed cruise, smooth inertial deceleration
        const ease =
          progress < 0.5
            ? 16 * Math.pow(progress, 5)
            : 1 - Math.pow(-2 * progress + 2, 5) / 2;

        let dPhi = targetPhi - startPhi;
        dPhi = ((dPhi + Math.PI) % (2 * Math.PI)) - Math.PI; // Shortest spherical distance

        phiRef.current = startPhi + dPhi * ease;
        thetaRef.current = startTheta + (targetTheta - startTheta) * ease;

        if (progress >= 1) {
          flightRef.current.isFlying = false;
          targetPhiRef.current = targetPhi;
          targetThetaRef.current = targetTheta;
        }
      } else if (!isDragging.current && activeIndex === null) {
        // 2. Idle orbital drift around India
        const time = now / 1000;
        targetPhiRef.current = defaultPhi + Math.sin(time * 0.25) * 0.15;
        targetThetaRef.current = defaultTheta + Math.cos(time * 0.2) * 0.08;

        let diffPhi = targetPhiRef.current - phiRef.current;
        diffPhi = ((diffPhi + Math.PI) % (2 * Math.PI)) - Math.PI;
        phiRef.current += diffPhi * 0.04;
        thetaRef.current += (targetThetaRef.current - thetaRef.current) * 0.04;
      } else if (!isDragging.current && activeIndex !== null && markers[activeIndex]) {
        // 3. Steady lock onto active hub coordinates
        const hubPhi = markers[activeIndex].phi;
        const hubTheta = markers[activeIndex].theta;
        let diffPhi = hubPhi - phiRef.current;
        diffPhi = ((diffPhi + Math.PI) % (2 * Math.PI)) - Math.PI;
        phiRef.current += diffPhi * 0.06;
        thetaRef.current += (hubTheta - thetaRef.current) * 0.06;
      }

      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        width: (width || 800) * 2,
        height: (width || 800) * 2,
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Pause WebGL rendering entirely when offscreen to preserve 60-120fps scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (canvas) observer.observe(canvas);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      globeRef.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, [markers, accentColor, isDark]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={{
        perspective: "1200px",
      }}
    >
      {/* Zoom and Satellite Perspective Camera Container */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-all duration-[1600ms]"
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0, 0.2, 1)",
          transform:
            activeIndex !== null
              ? "scale(2.45) rotateX(10deg)"
              : "scale(1) rotateX(0deg)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            opacity: 1,
          }}
          onPointerDown={(e) => {
            isDragging.current = true;
            flightRef.current.isFlying = false;
            pointerInteracting.current = e.clientX;
            dragStartPhi.current = targetPhiRef.current;
            if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            isDragging.current = false;
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            if (activeIndex !== null && markers[activeIndex]) {
              targetPhiRef.current = markers[activeIndex].phi;
              targetThetaRef.current = markers[activeIndex].theta;
            }
          }}
          onPointerOut={() => {
            isDragging.current = false;
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            if (activeIndex !== null && markers[activeIndex]) {
              targetPhiRef.current = markers[activeIndex].phi;
              targetThetaRef.current = markers[activeIndex].theta;
            }
          }}
          onMouseMove={(e) => {
            if (isDragging.current && pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              targetPhiRef.current = dragStartPhi.current + delta * 0.003;
              phiRef.current = targetPhiRef.current;
            }
          }}
          onTouchMove={(e) => {
            if (isDragging.current && pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              targetPhiRef.current = dragStartPhi.current + delta * 0.003;
              phiRef.current = targetPhiRef.current;
            }
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />
      </div>

      {/* Atmospheric Space Halo (Styled strictly with brand colors: #2E5E99 & #7BA4D0) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none scale-[0.84] transition-all duration-700"
        style={{
          opacity: activeIndex !== null ? 0 : 1,
          border: isDark
            ? "2px solid rgba(231, 240, 250, 0.16)"
            : "2px solid rgba(46, 94, 153, 0.22)",
          boxShadow: isDark
            ? "0 0 140px rgba(123, 164, 208, 0.10)"
            : "0 0 140px rgba(46, 94, 153, 0.15)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none scale-[0.96] transition-all duration-700"
        style={{
          opacity: activeIndex !== null ? 0 : 0.25,
          border: isDark
            ? "1px dashed rgba(231, 240, 250, 0.16)"
            : "1px dashed rgba(123, 164, 208, 0.25)",
        }}
      />
    </div>
  );
}
