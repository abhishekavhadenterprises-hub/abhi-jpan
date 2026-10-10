"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const careerSlides = [
  {
    num: "01",
    titleLine1: "Thermal",
    titleLine2: "Systems",
    specs: [
      { label: "Core Discipline", value: "Refrigerant Dynamics & Metallurgy" },
      { label: "Key Technologies", value: "Multi-Hole CNC Distributors & Refnets" },
      { label: "Precision Standard", value: "Sub-Micron Tolerance (±0.005mm)" },
      { label: "Global Application", value: "Tier-1 Automotive EV & HVAC Heat Pumps" },
      { label: "Open Positions", value: "Thermal R&D Engineer • Flow Specialist" },
      { label: "Work Facility", value: "Advanced Engineering Hub • Plant 1" },
    ],
    image: "/images/job-detail-hero.png",
    alt: "Thermal Systems Engineering",
  },
  {
    num: "02",
    titleLine1: "Robotic",
    titleLine2: "Bending",
    specs: [
      { label: "Core Discipline", value: "3D CNC Forming & Automated Brazing" },
      { label: "Key Technologies", value: "Multi-Axis Electric Benders & TIG Rings" },
      { label: "Production Scale", value: "100,000+ Assemblies Every Month" },
      { label: "Zero-Defect Bar", value: "100% Helium Tested (<5 PPM Leak Bar)" },
      { label: "Open Positions", value: "CNC Programming Lead • Robotics Tech" },
      { label: "Work Facility", value: "Automated Manufacturing Division" },
    ],
    image: "/images/about-manufacturing.png",
    alt: "Robotic Bending & Manufacturing",
  },
  {
    num: "03",
    titleLine1: "Quality",
    titleLine2: "Metrology",
    specs: [
      { label: "Core Discipline", value: "Metallurgical Lab & Optical Inspection" },
      { label: "Key Technologies", value: "Digital Profile Projectors & Spectrometers" },
      { label: "Accreditations", value: "IATF 16949 • ISO 9001:2015 • MSME ZED" },
      { label: "Material Purity", value: "C12200 Deoxidized Cu • CW617N Brass" },
      { label: "Open Positions", value: "Quality Auditor • Metrology Specialist" },
      { label: "Work Facility", value: "In-House Precision Metrology Division" },
    ],
    image: "/images/quality-hero-cinematic.jpg",
    alt: "Quality & Metrology Lab",
  },
  {
    num: "04",
    titleLine1: "Global",
    titleLine2: "Operations",
    specs: [
      { label: "Core Discipline", value: "Lean Supply Chain & Tier-1 OEM Logistics" },
      { label: "Key Technologies", value: "Kanban Pipelines & Automated Traceability" },
      { label: "Client Network", value: "Leading Automotive & HVAC OEMs Worldwide" },
      { label: "On-Time Metric", value: "99.8% Perfect Dispatch Record" },
      { label: "Open Positions", value: "Global SCM Executive • Logistics Planner" },
      { label: "Work Facility", value: "Corporate HQ & International Operations" },
    ],
    image: "/images/infrastructure.png",
    alt: "Global Infrastructure & Operations",
  },
];

export function CareersHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = careerSlides.length;

  // Continuous automatic 3-second image and discipline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const current = careerSlides[currentIndex];

  const scrollToOpenings = () => {
    const el = document.getElementById("openings");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-10 sm:pb-14 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-[#E2EFFC] via-[#EDF4FB] to-[#F8FAFC] text-[#0D2440] select-none transition-colors duration-700"
    >
      {/* 
        ========================================================================
        ARCHITECTURAL AMBIENT LIGHTING (Light Blue & Crisp Depth)
        ========================================================================
      */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7BA4D0]/25 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[450px] bg-[#2E5E99]/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.06] pointer-events-none" />

      {/* 
        ========================================================================
        MAIN INSPIRATION CANVAS: Open, Breathable & Clean (No Cards)
        ========================================================================
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[520px]">
          
          {/* 
            ====================================================================
            LEFT COLUMN: Watermark Number & Monumental Stacked Title
            ====================================================================
          */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            {/* Massive Faint Background Watermark Number (e.g. 01, 02, 03, 04) */}
            <AnimatePresence mode="wait">
              <motion.span
                key={current.num}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[140px] sm:text-[200px] md:text-[240px] font-heading font-black leading-none text-[#0D2440]/25 dark:text-white/20 select-none absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 pointer-events-none tracking-tighter"
              >
                {current.num}
              </motion.span>
            </AnimatePresence>

            {/* Giant Bold Stacked Title (Matching inspiration typography) */}
            <div className="relative z-10 space-y-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.titleLine1}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black leading-[0.92] tracking-tight">
                    <span className="text-[#0D2440]">{current.titleLine1}</span> <br />
                    <span className="text-[#2E5E99]">{current.titleLine2}</span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 
            ====================================================================
            MIDDLE COLUMN: Specifications & Key Data Points List
            (Direct adaptation of the inspiration middle spec column)
            ====================================================================
          */}
          <div className="lg:col-span-3 relative z-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 text-xs sm:text-[13px] font-sans pr-2"
              >
                {current.specs.map((item, i) => (
                  <div key={i} className="leading-tight">
                    <span className="text-[#2E5E99] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-0.5">
                      {item.label}:
                    </span>
                    <span className="text-[#0D2440] font-semibold leading-snug block">
                      {item.value}
                    </span>
                  </div>
                ))}

                {/* Direct Action Trigger */}
                <div className="pt-3">
                  <button
                    onClick={scrollToOpenings}
                    className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#2E5E99] hover:text-[#0D2440] transition-colors cursor-pointer"
                  >
                    <span>View Open Positions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 
            ====================================================================
            RIGHT COLUMN: Large Crystal-Clear Visual Showcase
            (Direct adaptation of the large subject image on the right)
            ====================================================================
          */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[360px] sm:min-h-[460px] md:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-[340px] sm:h-[440px] md:h-[500px] flex items-center justify-center"
              >
                {/* Visual Backdrop Frame with Soft Natural Blend & Light Blue Glow */}
                <div className="relative w-full h-full rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl shadow-[#2E5E99]/20 border border-[#7BA4D0]/35 group bg-white">
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    quality={95}
                    priority
                    className="object-cover object-center brightness-100 contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Soft Vignette for Seamless Canvas Integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 
        ========================================================================
        BOTTOM RIGHT PROGRESS BAR & SLIDE COUNTER (Light Blue Theme)
        Inspiration format: "— 02 ————————— 12"
        ========================================================================
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-[#7BA4D0]/30">
        {/* Left Subtitle Readout */}
        <div className="text-xs font-mono text-[#0D2440]/55 tracking-widest uppercase font-semibold">
          J-Pan Precision Engineering • Career Pathways
        </div>

        {/* Right Slider Counter & Progress Bar */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#0D2440]/70">
          <span className="text-[#0D2440]/40">—</span>
          <span className="text-[#0D2440] font-black">{current.num}</span>

          {/* Interactive Progress Line */}
          <div className="w-24 sm:w-32 h-[2.5px] bg-[#7BA4D0]/30 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-[#2E5E99] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          <span className="text-[#0D2440]/40">0{totalSlides}</span>
        </div>
      </div>
    </section>
  );
}
