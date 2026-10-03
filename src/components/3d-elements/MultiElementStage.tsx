"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  CopperPipeFitting3D,
  BrassDistributor3D,
  VrvHeader3D,
  ChillerSuction3D,
  SsStrainer3D,
  RefnetJoint3D,
} from "./models";
import { GpuParticleMorph } from "./engine/GpuParticleMorph";
import { samplePointsAndNormalsFromGroup, SampledPointsData } from "./utils/pointSampler";

export interface MultiElementStageProps {
  className?: string;
  speed?: number;
}

interface ProductElementConfig {
  name: string;
  category: string;
  alloy: string;
  tolerance: string;
  featureA: string;
  featureB: string;
  corner: "top-right" | "bottom-left" | "mid-right" | "mid-left" | "lower-right" | "floating-right";
  position: THREE.Vector3;
  color: THREE.Color;
  highlightColor: THREE.Color;
}

// Atmospheric nano-particle dust field
function createAmbientDustField(count: number = 1400) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    positions[idx] = (Math.random() - 0.5) * 36;
    positions[idx + 1] = (Math.random() - 0.5) * 22;
    positions[idx + 2] = (Math.random() - 0.5) * 16 - 1;

    phases[i] = Math.random() * Math.PI * 2;
    scales[i] = 0.4 + Math.random() * 0.9;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1.0 },
      uColor: { value: new THREE.Color("#d4af37") },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute float aPhase;
      attribute float aScale;
      varying float vAlpha;

      void main() {
        vec3 pos = position;
        pos.y += sin(uTime * 0.35 + aPhase) * 0.4;
        pos.x += cos(uTime * 0.25 + aPhase) * 0.3;
        pos.z += sin(uTime * 0.18 + aPhase) * 0.2;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float shimmer = sin(uTime * 1.6 + aPhase) * 0.5 + 0.5;
        vAlpha = shimmer * 0.35 + 0.12;

        gl_PointSize = (11.0 * aScale * uPixelRatio) / (-mvPosition.z);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;
        float soft = 1.0 - smoothstep(0.08, 0.5, dist);
        gl_FragColor = vec4(uColor, soft * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  return {
    points,
    material,
    update: (time: number, dpr: number) => {
      material.uniforms.uTime.value = time;
      material.uniforms.uPixelRatio.value = dpr;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}

export function MultiElementStage({ className = "" }: MultiElementStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProductName, setActiveProductName] = useState<string>("Precision Copper Return Bend & Sensor Tube");
  const [activeCategory, setActiveCategory] = useState<string>("HVAC & Cold Bending");
  const [activeAlloy, setActiveAlloy] = useState<string>("C12200 Deoxidized Copper (99.9% Cu)");
  const [activeTolerance, setActiveTolerance] = useState<string>("ISO 9001 • ±0.02 mm");
  const [featureA, setFeatureA] = useState<string>("180° Bending R=28.5mm");
  const [featureB, setFeatureB] = useState<string>("Silver Braze Socket");
  const [displayMode, setDisplayMode] = useState<0 | 1 | 2>(0);
  const [telemetryXYZ, setTelemetryXYZ] = useState<{ x: string; y: string; z: string }>({ x: "+14.20", y: "-08.40", z: "+02.15" });

  const displayModeRef = useRef<0 | 1 | 2>(0);
  displayModeRef.current = displayMode;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
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
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.30;

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // 2. High-Fidelity Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0d2440, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.5);
    keyLight.position.set(7, 9, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 1.6);
    fillLight.position.set(-7, -4, 6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x2563eb, 2.8);
    rimLight.position.set(0, -6, -5);
    scene.add(rimLight);

    // 3. Instantiate the 6 Crystal-Clear 3D Models
    const models = [
      new CopperPipeFitting3D(),  // 0: AboutSnapshot
      new BrassDistributor3D(),    // 1: Industries
      new VrvHeader3D(),           // 2: ProductShowcase
      new ChillerSuction3D(),      // 3: WhyChooseUs
      new SsStrainer3D(),          // 4: Infrastructure
      new RefnetJoint3D(),         // 5: Certifications
    ];

    models.forEach((model) => {
      model.group.scale.multiplyScalar(0.95);
    });

    // 4. Sample Ultra-Dense 120,000 Point Cloud WITH Real Physical Surface Normals
    const POINT_COUNT = 120000;
    const sampledData: SampledPointsData[] = models.map((model) =>
      samplePointsAndNormalsFromGroup(model.group, POINT_COUNT)
    );

    // 5. GPU Particle Morph System
    const particleMorph = new GpuParticleMorph(POINT_COUNT);
    scene.add(particleMorph.points);
    particleMorph.setVisible(true);

    // Atmospheric Nano-Particle Dust Field
    const ambientDust = createAmbientDustField(1400);
    scene.add(ambientDust.points);

    // 6. Viewport Corner Position Mapping
    const getCornerPositions = (cam: THREE.PerspectiveCamera) => {
      const isMob = window.innerWidth <= 768;
      const isTab = window.innerWidth > 768 && window.innerWidth <= 1024;

      const vFovRad = THREE.MathUtils.degToRad(cam.fov);
      const halfHeight = cam.position.z * Math.tan(vFovRad / 2);
      const halfWidth = halfHeight * cam.aspect;

      let cornerX: number;
      let topY: number;
      let bottomY: number;

      if (isMob) {
        cornerX = Math.min(halfWidth - 0.85, 1.4);
        topY = halfHeight - 1.8;
        bottomY = -(halfHeight - 1.8);
      } else if (isTab) {
        cornerX = Math.max(halfWidth - 2.2, 3.2);
        topY = halfHeight - 2.2;
        bottomY = -(halfHeight - 2.2);
      } else {
        cornerX = Math.max(halfWidth - 2.8, 5.6);
        topY = Math.min(halfHeight - 2.2, 3.1);
        bottomY = -Math.min(halfHeight - 2.2, 3.1);
      }

      return {
        topRight: new THREE.Vector3(cornerX, topY, 0),
        bottomLeft: new THREE.Vector3(-cornerX, bottomY, 0),
        midRight: new THREE.Vector3(cornerX, 0.4, 0),
        topLeft: new THREE.Vector3(-cornerX, topY, 0),
        bottomRight: new THREE.Vector3(cornerX, bottomY, 0),
        floatingCorner: new THREE.Vector3(-cornerX * 0.95, bottomY * 0.85, 0),
      };
    };

    const initialCorners = getCornerPositions(camera);

    const configs: ProductElementConfig[] = [
      {
        name: "Precision Copper Return Bend & Sensor Tube",
        category: "HVAC & Cold Bending",
        alloy: "C12200 Deoxidized Copper (99.9% Cu)",
        tolerance: "ISO 9001 • ±0.02 mm",
        featureA: "180° Bending R=28.5mm",
        featureB: "Silver Braze Socket",
        corner: "top-right",
        position: initialCorners.topRight.clone(),
        color: new THREE.Color("#c85a28"),
        highlightColor: new THREE.Color("#fed7aa"),
      },
      {
        name: "Brass Multi-Port Distributor Manifold",
        category: "Precision CNC Machining",
        alloy: "CW617N / CZ122 Forged Brass",
        tolerance: "CNC Turned • Ra 0.4 µm",
        featureA: "8-Way CNC Manifold",
        featureB: "C36000 Hex Fitting",
        corner: "bottom-left",
        position: initialCorners.bottomLeft.clone(),
        color: new THREE.Color("#d4af37"),
        highlightColor: new THREE.Color("#fef08a"),
      },
      {
        name: "VRV High-Pressure Header Assembly",
        category: "Commercial VRF Systems",
        alloy: "Cu-DHP Heavy Gauge • Silver Braze",
        tolerance: "Hydrostatic Tested > 12.5 MPa",
        featureA: "Multi-Branch Distribution",
        featureB: "Silver-Braze Joints",
        corner: "mid-right",
        position: initialCorners.midRight.clone(),
        color: new THREE.Color("#d96b30"),
        highlightColor: new THREE.Color("#ffedd5"),
      },
      {
        name: "Heavy-Duty Chiller Suction Assembly",
        category: "Industrial Chiller Lines",
        alloy: "Cryogenic Copper & Galvanized Flange",
        tolerance: "Hermetic Seal • -40°C to +150°C",
        featureA: "Heavy Structural Flange",
        featureB: "Vibration Isolator Line",
        corner: "mid-left",
        position: initialCorners.topLeft.clone(),
        color: new THREE.Color("#5696b8"),
        highlightColor: new THREE.Color("#e0f2fe"),
      },
      {
        name: "Industrial SS Strainer & Filter Unit",
        category: "Fluid Filtration Systems",
        alloy: "AISI 304 Surgical Stainless Steel",
        tolerance: "50µm Mesh • Zero Cavitation",
        featureA: "50µm Dual Wire Mesh",
        featureB: "Zero Cavitation Chamber",
        corner: "lower-right",
        position: initialCorners.bottomRight.clone(),
        color: new THREE.Color("#b0c0d0"),
        highlightColor: new THREE.Color("#ffffff"),
      },
      {
        name: "Engineered Refnet Y-Joint Connector",
        category: "Aerodynamic Branch Splitters",
        alloy: "Hydroformed Aerodynamic Seamless Copper",
        tolerance: "Laminar Efficiency 99.4%",
        featureA: "Equalized Fluid Splitter",
        featureB: "Seamless Hydroform",
        corner: "floating-right",
        position: initialCorners.floatingCorner.clone(),
        color: new THREE.Color("#d96222"),
        highlightColor: new THREE.Color("#fef3c7"),
      },
    ];

    particleMorph.setColors(
      configs[0].color,
      configs[1].color,
      configs[0].highlightColor,
      configs[1].highlightColor
    );

    // 7. Interactive Mouse & Drag to Inspect
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const mouseWorld = new THREE.Vector3(999, 999, 0);

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let userRotationX = 0;
    let userRotationY = 0;
    let targetUserRotX = 0;
    let targetUserRotY = 0;

    const onMouseDown = (e: MouseEvent) => {
      // Only drag if left click in non-interactive areas
      if (e.button === 0) {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;

        targetUserRotY += dx * 0.008;
        targetUserRotX += dy * 0.008;
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 8. Scroll Tracking Across the 6 Homepage Sections
    let currentScrollSpan = 0;
    let targetScrollSpan = 0;
    let lastActiveIndex = 0;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      if (docHeight <= 0) return;

      const heroOffset = winHeight * 0.65;
      const globeOffset = docHeight - winHeight * 0.95;
      const effectiveDist = Math.max(globeOffset - heroOffset, 1);

      const normalizedProgress = THREE.MathUtils.clamp((scrollY - heroOffset) / effectiveDist, 0, 1);
      targetScrollSpan = normalizedProgress * (configs.length - 1);
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

      const corners = getCornerPositions(camera);
      configs[0].position.copy(corners.topRight);
      configs[1].position.copy(corners.bottomLeft);
      configs[2].position.copy(corners.midRight);
      configs[3].position.copy(corners.topLeft);
      configs[4].position.copy(corners.bottomRight);
      configs[5].position.copy(corners.floatingCorner);

      if (currentSourceIdx >= 0 && currentTargetIdx >= 0) {
        particleMorph.setSourceAndTarget(
          sampledData[currentSourceIdx].positions,
          sampledData[currentTargetIdx].positions,
          sampledData[currentSourceIdx].normals,
          sampledData[currentTargetIdx].normals,
          configs[currentSourceIdx].position,
          configs[currentTargetIdx].position,
          configs[currentSourceIdx].color,
          configs[currentTargetIdx].color,
          configs[currentSourceIdx].highlightColor,
          configs[currentTargetIdx].highlightColor
        );
      }
    };
    window.addEventListener("resize", onResize);

    // 9. Animation Loop (60 FPS)
    let animId: number;
    const startTime = performance.now();
    let currentSourceIdx = -1;
    let currentTargetIdx = -1;
    const modelRotation = new THREE.Vector3();
    let lastTelemetryUpdate = 0;

    const renderLoop = () => {
      const time = (performance.now() - startTime) * 0.001;

      // Mouse smoothing
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Inertial user inspection drag smoothing
      userRotationX += (targetUserRotX - userRotationX) * 0.08;
      userRotationY += (targetUserRotY - userRotationY) * 0.08;
      if (!isDragging) {
        targetUserRotX *= 0.96;
        targetUserRotY *= 0.96;
      }

      // Project mouse into 3D world plane at z=0
      const vFovRad = THREE.MathUtils.degToRad(camera.fov);
      const halfHeight = camera.position.z * Math.tan(vFovRad / 2);
      const halfWidth = halfHeight * camera.aspect;
      mouseWorld.set(mouseX * halfWidth, mouseY * halfHeight, 0);

      // Smooth scroll lerp
      currentScrollSpan += (targetScrollSpan - currentScrollSpan) * 0.12;

      const baseIdx = Math.min(Math.floor(currentScrollSpan), configs.length - 2);
      const nextIdx = baseIdx + 1;
      const spanFraction = currentScrollSpan - baseIdx;

      // Update active metadata in UI HUD
      const activeIdx = spanFraction > 0.5 ? nextIdx : baseIdx;
      if (activeIdx !== lastActiveIndex) {
        lastActiveIndex = activeIdx;
        setActiveProductName(configs[activeIdx].name);
        setActiveCategory(configs[activeIdx].category);
        setActiveAlloy(configs[activeIdx].alloy);
        setActiveTolerance(configs[activeIdx].tolerance);
        setFeatureA(configs[activeIdx].featureA);
        setFeatureB(configs[activeIdx].featureB);
      }

      // Update telemetry readout (throttled ~10 times per second for authentic metrology feel)
      if (time - lastTelemetryUpdate > 0.1) {
        lastTelemetryUpdate = time;
        const curPos = configs[activeIdx].position;
        setTelemetryXYZ({
          x: (curPos.x * 24.5 + Math.sin(time) * 0.4).toFixed(2),
          y: (curPos.y * 18.2 + Math.cos(time) * 0.3).toFixed(2),
          z: (userRotationY * 15.0).toFixed(2),
        });
      }

      // Configure GPU particle morph pair if section span changed
      if (currentSourceIdx !== baseIdx || currentTargetIdx !== nextIdx) {
        currentSourceIdx = baseIdx;
        currentTargetIdx = nextIdx;

        particleMorph.setSourceAndTarget(
          sampledData[baseIdx].positions,
          sampledData[nextIdx].positions,
          sampledData[baseIdx].normals,
          sampledData[nextIdx].normals,
          configs[baseIdx].position,
          configs[nextIdx].position,
          configs[baseIdx].color,
          configs[nextIdx].color,
          configs[baseIdx].highlightColor,
          configs[nextIdx].highlightColor
        );
      }

      // Strict Plateau Locking at section rest
      let morphProgress = 0.0;
      if (spanFraction <= 0.18) {
        morphProgress = 0.0;
      } else if (spanFraction >= 0.82) {
        morphProgress = 1.0;
      } else {
        const t = (spanFraction - 0.18) / 0.64;
        morphProgress = t * t * (3.0 - 2.0 * t);
      }

      // 3D rotation: Idle spin + interactive drag rotation + mouse tilt parallax
      modelRotation.set(
        userRotationX - mouseY * 0.28 + Math.sin(time * 0.45) * 0.04,
        userRotationY + mouseX * 0.38 + time * 0.22,
        Math.cos(time * 0.35) * 0.03
      );

      // Sync display mode
      particleMorph.setDisplayMode(displayModeRef.current);

      // Update particle morphing shader
      particleMorph.update(
        morphProgress,
        time,
        dpr,
        modelRotation,
        mouseWorld,
        0.90
      );

      // Update atmospheric nano-dust
      ambientDust.update(time, dpr);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      models.forEach((m) => m.dispose());
      particleMorph.dispose();
      ambientDust.dispose();
      renderer.dispose();
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
    >
      {/* 3D CAD Feature Callout Badges (Floating alongside the active component) */}
      <div className="absolute top-28 right-8 z-20 hidden lg:flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-950/75 backdrop-blur-md border border-white/10 shadow-lg text-left animate-fadeIn">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-wider text-cyan-400">FEATURE SPEC</span>
            <span className="text-xs font-medium text-slate-200">{featureA}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-950/75 backdrop-blur-md border border-white/10 shadow-lg text-left animate-fadeIn">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-300">INSPECTION CHECK</span>
            <span className="text-xs font-medium text-slate-200">{featureB}</span>
          </div>
        </div>
      </div>

      {/* Luxury Metrology Glass HUD & Mode Selector */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex flex-col gap-2.5 items-end pointer-events-auto">
        {/* Mode Selector Pill */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <button
            type="button"
            onClick={() => setDisplayMode(0)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${
              displayMode === 0
                ? "bg-white text-slate-950 font-bold shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            PBR Alloy
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode(1)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${
              displayMode === 1
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            CMM Laser
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode(2)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${
              displayMode === 2
                ? "bg-slate-700/60 text-slate-100 border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Ferrofluid
          </button>
        </div>

        {/* CAD Metrology Telemetry Badge */}
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="absolute w-3.5 h-3.5 rounded-full bg-white/40 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-medium">
                3D CAD • {activeCategory}
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 font-mono text-slate-300">
                120K PTS
              </span>
            </div>
            <span className="text-xs font-semibold tracking-tight text-white/95 mt-0.5">
              {activeProductName}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-400 font-mono">
                {activeAlloy}
              </span>
              <span className="text-[9px] text-slate-500 font-mono">
                [{activeTolerance}]
              </span>
            </div>
          </div>

          {/* Real-time CMM Coordinate Readout */}
          <div className="hidden xl:flex flex-col items-end pl-3 border-l border-white/10 text-[9px] font-mono text-slate-400 leading-tight">
            <span className="text-cyan-400/80">X: {telemetryXYZ.x} mm</span>
            <span className="text-slate-300">Y: {telemetryXYZ.y} mm</span>
            <span className="text-slate-400">ROT: {telemetryXYZ.z}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiElementStage;
