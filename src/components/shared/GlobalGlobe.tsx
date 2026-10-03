"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

// India plant coordinates
const plantLocations: { id: string; name: string; coords: [number, number] }[] = [
  { id: "greater-noida", name: "Greater Noida 1", coords: [83.50000, 31.00000] },
  { id: "greater-noida-a2", name: "Greater Noida 2", coords: [87.00000, 33.50000] },
  { id: "neemrana", name: "Neemrana", coords: [77.00000, 30.50000] },
  { id: "sanand", name: "Sanand (Ahmedabad)", coords: [68.00000, 24.50000] },
  { id: "ranjangaon", name: "Ranjangaon (Pune)", coords: [72.00000, 17.50000] },
  { id: "jigani", name: "Jigani (Bengaluru)", coords: [80.00000, 10.00000] }
];



interface GlobalGlobeProps {
  activeIndex: number;
}

export function GlobalGlobe({ activeIndex }: GlobalGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [worldData, setWorldData] = useState<any>(null);
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Keep track of target coordinates for smooth centering
  const targetRotationRef = useRef<[number, number]>([-77, -22]); // Default focus on India
  const currentRotationRef = useRef<[number, number]>([-77, -22]);
  const isDraggingRef = useRef(false);
  const lastTimeRef = useRef(0);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const idleTimerRef = useRef<number | null>(null);

  // Fetch geography data
  useEffect(() => {
    let active = true;
    const loadGlobeData = async () => {
      try {
        const worldRes = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json");
        const world = await worldRes.json();
        
        // Optional country names fetch with silent fallback
        let names: any[] = [];
        try {
          const namesRes = await fetch("https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv");
          const namesText = await namesRes.text();
          names = d3.tsvParse(namesText);
          // Fix Palestine label typo if exists
          const palestine = names.find(c => parseInt(c.id, 10) === 275);
          if (palestine) palestine.name = "Palestine";
        } catch (e) {
          console.warn("Could not load country names, falling back to basic display.");
        }

        if (active) {
          setWorldData(world);
          setCountryNames(names);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading map data: ", err);
      }
    };

    loadGlobeData();
    return () => {
      active = false;
    };
  }, []);

  // Update target rotation when activeIndex changes
  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < plantLocations.length) {
      const activePlant = plantLocations[activeIndex];
      const [lng, lat] = activePlant.coords;
      // Invert coordinates for D3 orthographic projection center
      targetRotationRef.current = [-lng, -lat];
    }
  }, [activeIndex]);

  // Main Canvas Render and Animation Loop
  useEffect(() => {
    if (loading || !worldData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Decode TopoJSON features
    const land = topojson.feature(worldData, worldData.objects.land);
    const countries: any = topojson.feature(worldData, worldData.objects.countries);

    const projection = d3.geoOrthographic().precision(0.1);
    const path = d3.geoPath(projection).context(context);
    const graticule = d3.geoGraticule();

    // Cache pre-extracted Saudi Arabia geometry (ID 682)
    const saudiArabia = countries.features.find((c: any) => parseInt(c.id, 10) === 682);

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 550;
      
      // Handle high-DPI retina screens
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      context.scale(devicePixelRatio, devicePixelRatio);
      
      const size = Math.min(width, height);
      projection
        .scale(size * 0.48)
        .translate([width / 2, height / 2]);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation frames loop
    const tick = (time: number) => {
      const delta = time - (lastTimeRef.current || time);
      lastTimeRef.current = time;

      // Handle smooth transition rotation (interpolation)
      const current = currentRotationRef.current;
      const target = targetRotationRef.current;
      
      if (!isDraggingRef.current) {
        const rockX = Math.sin(time / 6000) * 8;
        const rockY = Math.cos(time / 6000) * 2;
        
        current[0] += (target[0] + rockX - current[0]) * 0.08;
        current[1] += (target[1] + rockY - current[1]) * 0.08;
      }

      // Constrain tilt to prevent upside down views
      current[1] = Math.max(-55, Math.min(55, current[1]));
      
      projection.rotate([current[0], current[1], 0]);

      // Rendering steps
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      context.clearRect(0, 0, width, height);

      // Outer Sphere Water fill
      const radius = projection.scale();
      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "#03050a";
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = "rgba(255, 255, 255, 0.10)";
      context.stroke();

      // Graticules grid lines
      context.beginPath();
      path(graticule());
      context.strokeStyle = "rgba(255, 255, 255, 0.03)";
      context.lineWidth = 0.5;
      context.stroke();

      // Land masses fill
      context.beginPath();
      path(land);
      context.fillStyle = "#0b101c";
      context.fill();
      context.strokeStyle = "rgba(255, 255, 255, 0.06)";
      context.lineWidth = 0.8;
      context.stroke();

      // Highlight Saudi Arabia (our core export partner highlighted in user feedback)
      if (saudiArabia) {
        context.beginPath();
        path(saudiArabia);
        context.fillStyle = "rgba(212, 175, 55, 0.25)";
        context.fill();
        context.strokeStyle = "rgba(212, 175, 55, 0.4)";
        context.lineWidth = 1;
        context.stroke();
      }

      const centerCoords: [number, number] = [-current[0], -current[1]];

      // Draw Manufacturing Plant pins (Pulse animation) and leader line labels
      const pulseRadius = 3 + Math.abs(Math.sin(time / 200)) * 6;
      plantLocations.forEach((plant, idx) => {
        const isVisible = d3.geoDistance(plant.coords, centerCoords) < Math.PI / 2;
        
        if (isVisible) {
          const pt = projection(plant.coords);
          if (pt) {
            const isActive = activeIndex === idx;

            // Pulsing aura ring
            context.beginPath();
            context.arc(pt[0], pt[1], isActive ? pulseRadius + 3 : pulseRadius, 0, Math.PI * 2);
            context.strokeStyle = isActive ? "rgba(212, 175, 55, 0.6)" : "rgba(255, 255, 255, 0.25)";
            context.lineWidth = 1;
            context.stroke();

            // Central pin dot
            context.beginPath();
            context.arc(pt[0], pt[1], isActive ? 5.5 : 3.5, 0, Math.PI * 2);
            context.fillStyle = isActive ? "#e2b714" : "#ffffff";
            context.fill();
            context.strokeStyle = "#070c14";
            context.lineWidth = 1.2;
            context.stroke();

            // Leader lines & Labels configuration to avoid overlaps
            let dxLabel = 20;
            let dyLabel = -15;
            if (plant.id === "neemrana") {
              dxLabel = -55;
              dyLabel = -20;
            } else if (plant.id === "sanand") {
              dxLabel = -65;
              dyLabel = -5;
            } else if (plant.id === "ranjangaon") {
              dxLabel = -70;
              dyLabel = 15;
            } else if (plant.id === "jigani") {
              dxLabel = 20;
              dyLabel = 20;
            } else if (plant.id === "greater-noida-a2") {
              dxLabel = 35;
              dyLabel = -30;
            }

            // Draw connecting leader line
            context.beginPath();
            context.moveTo(pt[0], pt[1]);
            context.lineTo(pt[0] + dxLabel * 0.5, pt[1] + dyLabel * 0.5);
            context.lineTo(pt[0] + dxLabel, pt[1] + dyLabel);
            context.strokeStyle = isActive ? "rgba(212, 175, 55, 0.6)" : "rgba(255, 255, 255, 0.15)";
            context.lineWidth = 0.8;
            context.stroke();

            // Draw label text
            context.fillStyle = isActive ? "#e2b714" : "rgba(255, 255, 255, 0.7)";
            context.font = isActive ? "bold 10px sans-serif" : "9px sans-serif";
            context.textAlign = dxLabel < 0 ? "right" : "left";
            context.fillText(
              plant.name,
              pt[0] + dxLabel + (dxLabel < 0 ? -4 : 4),
              pt[1] + dyLabel + 3
            );
            // Reset text alignment
            context.textAlign = "left";
          }
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [loading, worldData, activeIndex]);

  // Drag interaction events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !worldData) return;

    if (isDraggingRef.current) {
      // Rotation dragging
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.25;
      currentRotationRef.current[0] += dx * sensitivity;
      currentRotationRef.current[1] -= dy * sensitivity;
      targetRotationRef.current = [...currentRotationRef.current] as [number, number];
    } else {
      // Hover detection to fetch country name
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      const projection = d3.geoOrthographic()
        .precision(0.1)
        .scale(Math.min(width, height) * 0.42)
        .translate([width / 2, height / 2])
        .rotate([currentRotationRef.current[0], currentRotationRef.current[1], 0]);
      
      const pos = projection.invert ? projection.invert([x, y]) : null;

      if (pos) {
        const countries: any = topojson.feature(worldData, worldData.objects.countries);
        const hovered = countries.features.find((f: any) =>
          f.geometry.coordinates.find((c1: any) =>
            d3.polygonContains(c1, pos) || c1.some((c2: any) => d3.polygonContains(c2, pos))
          )
        );

        if (hovered) {
          const countryId = parseInt(hovered.id, 10);
          const cName = countryNames.find((c) => parseInt(c.id, 10) === countryId)?.name;
          setHoveredCountry(cName || hovered.properties?.name || `Country ID: ${countryId}`);
        } else {
          setHoveredCountry("");
        }
      }
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Resume slow auto rotation shortly after idle
      idleTimerRef.current = window.setTimeout(() => {
        // Keep current rotation target in sync
        targetRotationRef.current = [...currentRotationRef.current] as [number, number];
      }, 2500);
    }
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1 || !isDraggingRef.current) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    const sensitivity = 0.28;
    currentRotationRef.current[0] += dx * sensitivity;
    currentRotationRef.current[1] -= dy * sensitivity;
    targetRotationRef.current = [...currentRotationRef.current] as [number, number];
  };

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center min-h-[500px]">
      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-gold uppercase tracking-widest">Constructing Biosphere...</span>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            className="cursor-grab active:cursor-grabbing max-w-full max-h-full block z-10"
          />
          
          {/* Dynamic Floating HUD overlays */}
          <div className="absolute top-24 left-6 z-20 pointer-events-none flex flex-col gap-1.5 transition-all duration-300">
            <span className="text-[9px] font-extrabold text-gold/60 uppercase tracking-[0.2em]">Focused Territory</span>
            <div className="px-3.5 py-2 bg-charcoal/85 backdrop-blur-md rounded-xl border border-white/10 text-xs font-bold text-white min-w-[130px] text-center uppercase tracking-wider">
              {hoveredCountry || "Scanning..."}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
