"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import { ArrowUpRight, Award, Factory, Globe2, Users2, Cpu, ShieldCheck, Flame } from "lucide-react";

interface CapabilityModule {
  id: string;
  name: string;
  sublabel: string;
  image: string;
  badge: string;
  specValue: string;
  specLabel: string;
  headline: string;
  icon: React.ElementType;
}

const capabilityModules: CapabilityModule[] = [
  {
    id: "01",
    name: "Multi-Axis CNC Cold Bending",
    sublabel: "CLOSED-LOOP AUTOMATION",
    image: "/manufacturing_floor.png",
    badge: "PLANT VI • CNC FORMING",
    specValue: "±0.01 mm",
    specLabel: "TOLERANCE",
    headline: "Closed-Loop Robotic 3D Cold Bending",
    icon: Cpu,
  },
  {
    id: "02",
    name: "Mass-Spectrometry Helium Leak Testing",
    sublabel: "VACUUM CHAMBER VERIFIED",
    image: "/quality_precision.png",
    badge: "LABORATORY • VACUUM QA",
    specValue: "< 10⁻⁸ mbar·l/s",
    specLabel: "LEAK RATE",
    headline: "Molecular Helium Seal Integrity",
    icon: ShieldCheck,
  },
  {
    id: "03",
    name: "Induction & Controlled Atmosphere Brazing",
    sublabel: "INERT NITROGEN SHIELDING",
    image: "/industrial_precision_tubing_1778827579055.png",
    badge: "PLANT IV • BRAZING LINE",
    specValue: "ZERO OXIDATION",
    specLabel: "PURITY",
    headline: "High-Frequency Induction Brazing",
    icon: Flame,
  },
  {
    id: "04",
    name: "IATF 16949 & ISO 9001:2015 Certified",
    sublabel: "GLOBAL TIER-1 AUDIT",
    image: "/engineering_precision_facility_1778657209621.png",
    badge: "GLOBAL OEM VERIFIED",
    specValue: "ZERO-DEFECT",
    specLabel: "POLICY",
    headline: "Institutional Zero-Tolerance QA",
    icon: Award,
  },
];

const stats = [
  {
    label: "Years of Engineering Excellence",
    value: "28+",
    sublabel: "ESTABLISHED 1998",
    description: "Decades of continuous manufacturing innovation and institutional engineering memory.",
    icon: Award,
  },
  {
    label: "Specialized Manufacturing Plants",
    value: "6",
    sublabel: "PAN-INDIA FOOTPRINT",
    description: "Strategically situated near key automotive and HVAC industrial clusters.",
    icon: Factory,
  },
  {
    label: "Annual Tubular Capacity",
    value: "65k MT",
    sublabel: "HIGH-THROUGHPUT VOLUME",
    description: "High-speed cold drawing, multi-axis automated CNC bending, and induction brazing.",
    icon: Globe2,
  },
  {
    label: "Tier-1 & Global OEM Partners",
    value: "120+",
    sublabel: "VERIFIED SUPPLIER",
    description: "Long-standing trust with multinational leaders across 12+ international markets.",
    icon: Users2,
  },
];

export function AboutSnapshot() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Auto-cycle modules every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModuleIndex((prev) => (prev + 1) % capabilityModules.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeModule = capabilityModules[activeModuleIndex];

  return (
    <section className="px-4 md:px-8 py-24 md:py-32 relative overflow-hidden bg-[#FAFAFA]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#586854]/10 to-transparent blur-[100px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[800px] h-[800px] bg-gradient-to-r from-[#2E5E99]/5 to-transparent blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="w-full">
        <div className="flex flex-col mb-24 max-w-[1400px] mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[10px] tracking-[0.3em] uppercase text-[#666] mb-8 font-semibold">
            Corporate Overview
          </motion.h2>

          {/* Scroll-scrub Heading (United Carriers Exact Left-to-Right Wipe) */}
          <ScrollWipeHeading
            as="h3"
            className="text-5xl md:text-6xl lg:text-[5.5rem] font-medium tracking-tighter leading-[1.05] max-w-5xl"
            revealedColor="#111111"
            wipingColor="#2E5E99"
            unrevealedColor="#CCCCCC"
          >
            PRECISION ENGINEERED <br />
            FOR GLOBAL INDUSTRY.
          </ScrollWipeHeading>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mt-12 text-[#666] max-w-xl text-base sm:text-lg leading-relaxed font-light">
            Founded in 1998, J Pan Tubular Components Limited is more than just a manufacturer. We're a network of engineering experts passionate about bringing absolute precision to the world's most exacting automotive, refrigeration, and HVAC leaders.
          </motion.p>
        </div>

        {/* Dynamic Capability Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-32">

          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 relative z-10">
            {capabilityModules.map((mod, idx) => {
              const isActive = activeModuleIndex === idx;
              const ModIcon = mod.icon;
              return (
                <motion.button
                  key={mod.id} onClick={() => setActiveModuleIndex(idx)}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group text-left p-6 rounded-[2rem] transition-all duration-700 ease-out flex items-center justify-between border ${isActive ? "border-white/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] scale-[1.02]" : "border-transparent bg-transparent hover:bg-white/60 hover:border-white/50"}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? "bg-[#111] text-white shadow-xl scale-110" : "bg-white/50 text-[#999] group-hover:bg-white"}`}>
                      <ModIcon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <span className={`block text-[10px] tracking-[0.15em] uppercase mb-1.5 transition-colors duration-500 ${isActive ? 'text-[#586854] font-medium' : 'text-[#999]'}`}>{mod.sublabel}</span>
                      <span className={`block text-lg tracking-tight transition-colors duration-500 ${isActive ? 'text-[#111] font-semibold' : 'text-[#666]'}`}>{mod.name}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:col-span-7 relative min-h-[500px] lg:min-h-[650px] bg-[#111] overflow-hidden group rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
            <AnimatePresence mode="wait">
              <motion.div key={activeModule.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="absolute inset-0">
                <Image src={activeModule.image} alt={activeModule.headline} fill className="object-cover transition-transform duration-[15s] group-hover:scale-110" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/90 via-black/20 to-transparent mix-blend-multiply" />

                <div className="absolute top-8 left-8 z-10">
                  <span className="text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> {activeModule.badge}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-10 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <span className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-3">{activeModule.specLabel}</span>
                    <ScrollWipeHeading as="h3" className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight max-w-md">{activeModule.headline}</ScrollWipeHeading>
                  </div>
                  <div className="text-left md:text-right p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                    <span className="block text-4xl md:text-5xl font-light text-white tracking-tighter mb-1">{activeModule.specValue}</span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/60">Verified Spec</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="relative overflow-hidden p-8 rounded-[2rem] bg-white border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2 group flex flex-col justify-between h-full min-h-[280px]"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F9F9F9] rounded-full group-hover:bg-[#586854]/5 transition-colors duration-700" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#F9F9F9] flex items-center justify-center mb-8 group-hover:bg-[#111] group-hover:text-white transition-colors duration-500 text-[#111]">
                    <StatIcon className="w-5 h-5" />
                  </div>
                  <div className="text-5xl md:text-6xl font-light tracking-tighter text-[#111] mb-2">{stat.value}</div>
                  <h4 className="text-sm font-semibold text-[#333] mb-4">{stat.label}</h4>
                  <p className="text-xs text-[#666] leading-relaxed">{stat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default AboutSnapshot;
