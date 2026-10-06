"use client";

import React, { useState } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Factory, ShieldCheck, Cpu, Flame, Layers } from "lucide-react";

import GridMotion from "../ui/GridMotion";

const pillars = [
  {
    id: "cnc",
    num: "01",
    title: "Multi-Axis CNC Cold Bending",
    badge: "±0.01 MM TOLERANCE",
    desc: "Over 60 high-speed automated CNC bending lines with closed-loop laser feedback, delivering zero tube wall thinning across complex 3D routing.",
    image: "/images/infrastructure.png",
    facility: "PLANT VI // AUTOMATED BENDING LINE 04",
    stat: "60+ Automated CNC Units",
    icon: Cpu,
  },
  {
    id: "brazing",
    num: "02",
    title: "Robotic Induction Brazing",
    badge: "CONTROLLED INERT PURGE",
    desc: "Multi-station continuous induction cells providing uniform thermal penetration and zero internal oxidation for high-pressure refrigeration circuits.",
    image: "/manufacturing_floor.png",
    facility: "PLANT II // ROBOTIC BRAZING CELL",
    stat: "100% Joint Penetration",
    icon: Flame,
  },
  {
    id: "helium",
    num: "03",
    title: "Helium Mass Spectrometry",
    badge: "< 10⁻⁸ MBAR·L/S INTEGRITY",
    desc: "100% production vacuum chamber testing. Molecular helium mass spectrometry certifies hermetic seal integrity exceeding international OEM standards.",
    image: "/engineering_precision_facility_1778657209621.png",
    facility: "PLANT IV // MASS SPECTROMETRY CHAMBER",
    stat: "Zero-Leak Guaranteed",
    icon: ShieldCheck,
  },
  {
    id: "plants",
    num: "04",
    title: "Pan-India Tier-1 Footprint",
    badge: "50,000+ M² CAPACITY",
    desc: "6 integrated manufacturing plants across Greater Noida, Pune, Sanand, Neemrana, and Bengaluru, supporting JIT deliveries along primary industrial corridors.",
    image: "/quality_precision.png",
    facility: "PAN-INDIA CLUSTER // 6 FACILITIES",
    stat: "65,000 MT Annual Output",
    icon: Factory,
  },
];

const highlights = [
  { value: "65,000", unit: "MT", label: "Annual Output", sub: "Copper, brass & stainless steel volume" },
  { value: "±0.01", unit: "mm", label: "CNC Tolerance", sub: "Laser-guided closed-loop bending" },
  { value: "< 10⁻⁸", unit: "mbar·l/s", label: "Leak Integrity", sub: "100% helium mass-spec verification" },
  { value: "6", unit: "Plants", label: "Integrated Hubs", sub: "Pan-India strategic corridor presence" },
];

export function Infrastructure() {
  const [activeTab, setActiveTab] = useState(0);
  const activePillar = pillars[activeTab];

  // Dummy items for the background GridMotion
  const gridItems = [
    'CNC', 'BRAZING', 'TOLERANCE', 'HELIUM', 'TESTING', 'CAPACITY', 'VACUUM',
    'OEM', 'TIER-1', 'BENDING', 'ROBOTIC', 'LASER', 'PRECISION', 'TUBULAR'
  ];

  return (
    <section className="relative py-28 md:py-36 bg-[#FAFAFA] dark:bg-[#050505] text-[#111] dark:text-white transition-colors duration-500 overflow-hidden border-b border-[#E5E5E5] dark:border-[#222]">
      {/* Dynamic GridMotion Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0 overflow-hidden">
        <GridMotion items={gridItems} gradientColor="transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 pb-8 border-b border-[#E5E5E5] dark:border-[#222]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-6">Manufacturing Infrastructure</h2>
            <ScrollWipeHeading as="h3" className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">
              Industrial scale, <br />
              <span className="text-[#666]">aerospace precision.</span>
            </ScrollWipeHeading>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="max-w-md lg:pb-4">
            <p className="text-[#666] dark:text-[#999] text-sm md:text-base leading-relaxed font-light">
              Engineered across 6 automated facilities with robotic induction brazing, closed-loop CNC bending, and 100% vacuum chamber helium leak testing.
            </p>
          </motion.div>
        </div>

        {/* Floating Facility Tab Selector */}
        <div className="flex flex-wrap gap-3 mb-12 p-2 rounded-[2rem] bg-white/50 dark:bg-black/50 backdrop-blur-2xl border border-[#E5E5E5] dark:border-[#222] w-fit shadow-sm relative z-20">
          {pillars.map((pillar, idx) => {
            const isActive = activeTab === idx;
            const Icon = pillar.icon;

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-8 py-4 rounded-full transition-all duration-500 flex items-center gap-4 ${isActive
                    ? "bg-[#111] dark:bg-white text-white dark:text-[#111] shadow-lg scale-105"
                    : "bg-transparent text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-white hover:bg-white dark:hover:bg-[#222]"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white dark:text-[#111]" : "text-[#999]"}`} />
                <div className="text-left">
                  <h3 className={`text-xs font-semibold uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-80"}`}>
                    {pillar.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Facility Cinematic Window */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1.0, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[500px] lg:min-h-[600px] rounded-[3rem] overflow-hidden border border-[#E5E5E5] dark:border-[#222] bg-[#0A0A0A] shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-2xl flex flex-col justify-end p-10 lg:p-16 mb-20 group"
          >
            <Image
              src={activePillar.image}
              alt={activePillar.title}
              fill
              className="object-cover object-center brightness-[0.7] contrast-[1.1] opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[2s] ease-out"
            />
            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-transparent to-transparent" />

            {/* Top Facility Location Tag */}
            <div className="absolute top-10 left-10 z-10 flex items-center gap-3 px-6 py-3 rounded-full bg-black/50 backdrop-blur-2xl border border-white/10 font-mono text-xs text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
              <span className="tracking-widest font-semibold">{activePillar.facility}</span>
            </div>

            {/* Bottom Content Dossier */}
            <div className="relative z-10 max-w-3xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] tracking-[0.2em] text-white uppercase mb-6 font-medium backdrop-blur-md">
                {activePillar.badge}
              </div>
              <ScrollWipeHeading as="h3" className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-700">
                {activePillar.title}
              </ScrollWipeHeading>
              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-10 max-w-2xl group-hover:translate-x-2 transition-transform duration-700 delay-75">
                {activePillar.desc}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/about#infrastructure"
                  className="group/btn px-8 py-4 rounded-full bg-white text-[#111] hover:bg-transparent hover:text-white border border-transparent hover:border-white font-semibold text-xs uppercase tracking-widest transition-all duration-500 inline-flex items-center gap-3 shadow-xl hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                >
                  <span>Explore Facility</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
                <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                  {activePillar.stat}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Technical Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-12 border-t border-[#E5E5E5] dark:border-[#222]">
          {highlights.map((item, idx) => (
            <div key={idx} className="border-l border-[#E5E5E5] dark:border-[#333] pl-6 group">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-light tracking-tighter text-4xl sm:text-5xl text-[#111] dark:text-white group-hover:scale-105 transition-transform duration-500 origin-left">
                  {item.value}
                </span>
                <span className="text-[10px] text-[#999] uppercase tracking-widest font-semibold">
                  {item.unit}
                </span>
              </div>
              <span className="block text-sm text-[#111] dark:text-[#DDD] mb-1 font-medium group-hover:text-[#2E5E99] transition-colors duration-500">
                {item.label}
              </span>
              <span className="block text-xs text-[#999] dark:text-[#666] font-light">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Infrastructure;
