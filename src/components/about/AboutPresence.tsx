"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Building2, Factory, MapPin } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

interface FacilityData {
  id: string;
  num: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  address: string;
  pills: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const facilities: FacilityData[] = [
  {
    id: "gn1",
    num: "01",
    phase: "NORTHERN CORRIDOR",
    title: "GREATER NOIDA 1",
    subtitle: "Corporate Headquarters & Advanced Robotic Cells",
    description: "Our flagship 4,170 Sq. M industrial campus housing high-speed automated CNC bending cells and advanced computerized toolrooms.",
    address: "Surajpur Site B, Greater Noida",
    pills: ["HQ", "CNC Toolroom", "Robotics"],
    icon: Building2,
    accentColor: "#2E5E99",
  },
  {
    id: "gn2",
    num: "02",
    phase: "AUTOMOTIVE LOOP",
    title: "GREATER NOIDA 2",
    subtitle: "Automotive HVAC & Stainless Steel Precision Hub",
    description: "5,767 Sq. M continuous manufacturing center dedicated to high-volume automotive HVAC lines and stainless steel manifolds.",
    address: "Block A, Surajpur, Greater Noida",
    pills: ["Solar Powered", "HVAC", "Stainless Steel"],
    icon: Factory,
    accentColor: "#16A34A",
  },
  {
    id: "neemrana",
    num: "03",
    phase: "HVAC & VRV/VRF",
    title: "NEEMRANA",
    subtitle: "Commercial VRV & VRF Thermal Loop Lines",
    description: "4,024 Sq. M specialized facility focused on multi-circuit HVAC cooling assemblies and mass spectrometer helium leak verification.",
    address: "Plot E-16, Neemrana, RJ",
    pills: ["VRV/VRF", "Helium Tested", "Copper"],
    icon: Factory,
    accentColor: "#7C3AED",
  },
  {
    id: "sanand",
    num: "04",
    phase: "WESTERN CORRIDOR",
    title: "SANAND",
    subtitle: "High-Volume Western Automotive Assembly Cluster",
    description: "Massive 9,982 Sq. M production complex positioned at the heart of Gujarat's automotive hub, supplying precision copper loops.",
    address: "SANAND Industrial Estate, Gujarat",
    pills: ["Tier-1 OEM", "High-Volume", "Western Hub"],
    icon: Building2,
    accentColor: "#EA580C",
  },
  {
    id: "pune",
    num: "05",
    phase: "MOBILITY FLUIDS",
    title: "PUNE",
    subtitle: "Mobility & High-Pressure Industrial Fluid Loops",
    description: "5,500 Sq. M facility serving Maharashtra's automotive and heavy commercial corridor with multi-axis robotic cold bending.",
    address: "Ranjangaon MIDC, Pune",
    pills: ["Robotic Bending", "Hydro-Tested"],
    icon: Factory,
    accentColor: "#0891B2",
  },
  {
    id: "bengaluru",
    num: "06",
    phase: "SOUTHERN CORRIDOR",
    title: "BENGALURU",
    subtitle: "100% EOU Export & Hyperscale Data Center Cooling",
    description: "3,047 Sq. M high-precision facility producing liquid cooling manifolds and engineered busbars for global data center OEMs.",
    address: "Jigani Industrial Area, Bengaluru",
    pills: ["100% EOU", "Data Center", "Busbars"],
    icon: Building2,
    accentColor: "#2563EB",
  },
];

export function AboutPresence() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // --- Magnetic / Follow Cursor Logic ---
  const cursorX = useMotionValue(-1000); // Start off-screen
  const cursorY = useMotionValue(-1000);
  
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop where hover makes sense
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section
      id="about-presence"
      className="relative min-h-[90vh] h-screen max-h-screen flex flex-col justify-center py-12 md:py-16 bg-[#FAFAFA] dark:bg-[#071321] transition-colors duration-500 overflow-hidden border-b border-[#7BA4D0]/20 dark:border-white/10"
    >
      {/* Dynamic Background Tint based on hovered item */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out z-0"
        style={{
          background: activeIdx !== null 
            ? `radial-gradient(circle at 50% 50%, ${facilities[activeIdx].accentColor}1A 0%, transparent 60%)` 
            : "transparent"
        }}
      />

      <div className="container-custom relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-3xl">
            <ScrollWipeHeading as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white mb-3">
              Strategically situated near <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
                key OEM industrial corridors.
              </span>
            </ScrollWipeHeading>
          </div>
          <div className="max-w-md pb-2">
            <p className="text-base text-[#0D2440]/70 dark:text-white/60 font-light leading-relaxed">
              Spanning over 32,000 sq. meters across 6 specialized manufacturing campuses in Northern, Western, and Southern corridors, delivering high-volume supply continuity directly to OEM assembly lines.
            </p>
          </div>
        </div>

        {/* The Godly.design Interactive List */}
        <div className="relative border-t border-[#0F172A]/10 dark:border-white/10">
          {facilities.map((fac, idx) => (
            <div 
              key={fac.id}
              className="group relative border-b border-[#0F172A]/10 dark:border-white/10 cursor-pointer"
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => {
                // Mobile tap toggle logic
                if (window.matchMedia("(max-width: 768px)").matches) {
                  setActiveIdx(activeIdx === idx ? null : idx);
                }
              }}
            >
              <div className="py-4 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-500 hover:bg-[#0F172A]/[0.02] dark:hover:bg-white/[0.02] px-4 -mx-4 rounded-xl">
                
                {/* Left Side: Number & Huge Typography */}
                <div className="flex items-center gap-6 sm:gap-12 w-full md:w-auto">
                  <span className="font-mono text-xl sm:text-2xl text-[#0F172A]/40 dark:text-white/30 font-light w-8">
                    {fac.num}
                  </span>
                  
                  {/* Animated Typography Row */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight text-[#0F172A] dark:text-white transition-all duration-500 group-hover:translate-x-4 md:group-hover:translate-x-6 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0]">
                    {fac.title}
                  </h3>
                </div>

                {/* Right Side: Arrow (Desktop) / Mobile Toggle Icon */}
                <div className="hidden md:flex items-center justify-end w-20">
                  <div className="w-12 h-12 rounded-full border border-[#0F172A]/20 dark:border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:border-[#2E5E99] group-hover:text-white text-[#0F172A] dark:text-white">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
              </div>

              {/* Mobile Accordion Content (Hidden on Desktop) */}
              <AnimatePresence>
                {activeIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden overflow-hidden"
                  >
                    <div className="pb-8 px-4 flex flex-col gap-4">
                      <div className="text-[10px] font-mono font-bold tracking-widest text-[#2E5E99] dark:text-[#7BA4D0] uppercase">
                        {fac.phase}
                      </div>
                      <h4 className="text-lg font-bold text-[#0F172A] dark:text-white leading-snug">
                        {fac.subtitle}
                      </h4>
                      <p className="text-sm text-[#0F172A]/70 dark:text-white/60 leading-relaxed">
                        {fac.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {fac.pills.map((pill, pIdx) => (
                          <span key={pIdx} className="px-2.5 py-1 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-mono uppercase tracking-wider text-[#0F172A] dark:text-white">
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* --- Floating Cursor Reveal Card (Desktop Only) --- */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block mix-blend-normal">
        <motion.div
          style={{ 
            x: smoothX, 
            y: smoothY,
            translateX: "-50%", 
            translateY: "-50%" 
          }}
          className="absolute top-0 left-0"
        >
          <AnimatePresence mode="wait">
            {activeIdx !== null && (
              <motion.div
                key={activeIdx}
                initial={{ scale: 0.8, opacity: 0, rotate: -4 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-[380px] bg-white/95 dark:bg-[#0A1628]/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8 flex flex-col gap-6"
                style={{
                  boxShadow: `0 30px 60px -15px ${facilities[activeIdx].accentColor}33`
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-[#0F172A]/10 dark:border-white/10 pb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: facilities[activeIdx].accentColor }}
                  >
                    {React.createElement(facilities[activeIdx].icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#0F172A]/50 dark:text-white/50 uppercase mb-1">
                      {facilities[activeIdx].phase}
                    </div>
                    <div className="text-sm font-heading font-black text-[#0F172A] dark:text-white">
                      {facilities[activeIdx].title}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div>
                  <h4 className="text-[15px] font-bold text-[#0F172A] dark:text-white leading-tight mb-3">
                    {facilities[activeIdx].subtitle}
                  </h4>
                  <p className="text-[13px] text-[#0F172A]/70 dark:text-white/60 font-light leading-relaxed">
                    {facilities[activeIdx].description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {facilities[activeIdx].pills.map((pill, pIdx) => (
                    <span key={pIdx} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[9px] font-mono tracking-widest font-bold text-slate-600 dark:text-white/60 uppercase">
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}
