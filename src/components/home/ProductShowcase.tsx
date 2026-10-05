"use client";

import React, { useState, MouseEvent } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, Cog, Box, ArrowUpRight } from "lucide-react";

interface ProductCapability {
  id: string;
  roman: string;
  name: string;
  eyebrowCategory: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  metricLabel: string;
  metricValue: string;
  metricSub: string;
  specDetails: string[];
}

const capabilities: ProductCapability[] = [
  {
    id: "copper",
    roman: "I",
    name: "COPPER COMPONENTS",
    eyebrowCategory: "HVAC & REFRIGERATION",
    title: "High-efficiency thermal transfer & precision CNC bending.",
    description:
      "Custom-bent, end-formed, and brazed copper tubular assemblies engineered for zero-leak thermal loops, HVAC circuits, and refrigeration systems.",
    image: "/product_copper.png",
    icon: ShieldCheck,
    metricLabel: "HELIUM LEAK TESTED",
    metricValue: "< 10⁻⁸",
    metricSub: "mbar·l/s",
    specDetails: ["C12200 Deoxidized High Residual Phosphorus", "Zero Wall Thinning 3D Mandrel Bending", "Nitrogen Inert Controlled Atmosphere Braze"],
  },
  {
    id: "brass",
    roman: "II",
    name: "BRASS PRECISION PARTS",
    eyebrowCategory: "FLUID & PRESSURE CONTROL",
    title: "Micron-tolerance connectors, flare nuts & manifolds.",
    description:
      "High-precision CNC-machined brass connectors, flare nuts, and sockets engineered for leak-free, high-durability fittings across extreme fluid pressures.",
    image: "/product_brass.png",
    icon: Cog,
    metricLabel: "CNC YIELD",
    metricValue: "99.98%",
    metricSub: "tolerance",
    specDetails: ["CW617N / CZ122 High-Tensile Forged Brass", "Single-Setup Multi-Axis CNC Turning", "High-Pressure Seal Verification > 250 Bar"],
  },
  {
    id: "steel",
    roman: "III",
    name: "STAINLESS STEEL TUBING",
    eyebrowCategory: "AUTOMOTIVE & INDUSTRIAL",
    title: "Extreme pressure endurance & high-corrosion resilience.",
    description:
      "Durable stainless-steel tubular assemblies engineered for automotive fuel lines, critical hydraulic circuits, and severe industrial operating environments.",
    image: "/product_steel.png",
    icon: Box,
    metricLabel: "ANNUAL CAPACITY",
    metricValue: "65,000",
    metricSub: "MT",
    specDetails: ["AISI 304 / 316L Surgical Stainless Steel", "Laser-Guided Robotic TIG/Orbital Welding", "100% Eddy Current Crack Detection Tested"],
  },
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = capabilities[activeTab];
  const Icon = activeProduct.icon;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <section className="relative py-28 md:py-36 bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111] dark:text-white transition-colors duration-500 overflow-hidden border-b border-[#E5E5E5] dark:border-[#222]">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-[#2E5E99]/10 to-transparent blur-[150px] absolute -left-[20%] top-0"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-[#586854]/10 to-transparent blur-[150px] absolute right-0 bottom-0"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 pb-8 border-b border-[#E5E5E5] dark:border-[#222]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-6">Product Catalogue & Specifications</h2>
            <ScrollWipeHeading as="h3" className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">
              Precision alloy manufacturing excellence.
            </ScrollWipeHeading>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="max-w-md lg:pb-4">
            <p className="text-[#666] dark:text-[#999] text-sm md:text-base leading-relaxed font-light">
              Engineered from certified electrolytic copper, forged brass alloys, and surgical-grade stainless steel to satisfy the world's most stringent OEM tolerance benchmarks.
            </p>
          </motion.div>
        </div>

        {/* Premium Tab Selector Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-16 p-2 rounded-[2rem] bg-white/50 dark:bg-black/50 backdrop-blur-2xl border border-[#E5E5E5] dark:border-[#222] w-fit shadow-sm relative z-20">
          {capabilities.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-500 flex items-center gap-3 ${
                  isActive
                    ? "bg-[#111] dark:bg-white text-white dark:text-[#111] shadow-lg scale-105"
                    : "text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-white hover:bg-white dark:hover:bg-[#222]"
                }`}
              >
                <span className={`font-mono text-[9px] ${isActive ? 'opacity-80' : 'opacity-50'}`}>{item.roman} //</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed Dossier with React Bits Spotlight Effect */}
        <div className="relative group/spotlight">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0 items-stretch rounded-[3rem] bg-white dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-2xl overflow-hidden group"
              onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
                const { left, top } = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - left);
                mouseY.set(e.clientY - top);
              }}
            >
              {/* React Bits Spotlight Overlay */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 z-50"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      650px circle at ${mouseX}px ${mouseY}px,
                      rgba(46, 94, 153, 0.1),
                      transparent 80%
                    )
                  `,
                }}
              />

              {/* Left Column: Technical Dossier */}
              <div className="lg:col-span-6 flex flex-col justify-between p-10 lg:p-16 z-10 relative bg-white dark:bg-[#111]">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FAFAFA] dark:bg-[#000] border border-[#E5E5E5] dark:border-[#222] mb-8 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] tracking-widest text-[#666] dark:text-[#999] uppercase font-medium">
                      {activeProduct.eyebrowCategory}
                    </span>
                  </div>

                  <ScrollWipeHeading as="h3" className="text-4xl md:text-5xl font-light text-[#111] dark:text-white leading-[1.15] mb-6 tracking-tight">
                    {activeProduct.title}
                  </ScrollWipeHeading>

                  <p className="text-[#666] dark:text-[#999] text-base font-light leading-relaxed mb-10 max-w-lg">
                    {activeProduct.description}
                  </p>

                  {/* Key Spec Highlights */}
                  <div className="space-y-4 pt-8 border-t border-[#E5E5E5] dark:border-[#222]">
                    {activeProduct.specDetails.map((spec, i) => (
                      <div key={i} className="flex items-center gap-4 text-xs font-mono text-[#666] dark:text-[#999]">
                        <Icon className="w-4 h-4 text-[#111] dark:text-white" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric & Action */}
                <div className="flex flex-wrap items-end justify-between gap-8 pt-12 mt-12 border-t border-[#E5E5E5] dark:border-[#222]">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#999] dark:text-[#666] mb-2 font-medium">
                      {activeProduct.metricLabel}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-light tracking-tighter text-5xl md:text-6xl text-[#111] dark:text-white">
                        {activeProduct.metricValue}
                      </span>
                      <span className="text-xs text-[#999] font-medium tracking-widest uppercase">
                        {activeProduct.metricSub}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/products"
                    className="relative overflow-hidden group/btn px-8 py-4 rounded-full bg-[#FAFAFA] dark:bg-[#000] border border-[#E5E5E5] dark:border-[#222] hover:bg-[#111] dark:hover:bg-white text-[#111] dark:text-white hover:text-white dark:hover:text-[#111] font-semibold text-xs uppercase tracking-widest transition-all duration-500 inline-flex items-center gap-3 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-20"
                  >
                    {/* Magnetic / Swipe Effect on Hover from React Bits */}
                    <span className="absolute inset-0 bg-[#2E5E99] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out -z-10" />
                    <span className="group-hover/btn:text-white transition-colors duration-500">View Specifications</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-white transition-all duration-500" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Premium Showcase Image */}
              <div className="lg:col-span-6 relative min-h-[400px] lg:min-h-full bg-[#F5F5F5] dark:bg-[#050505] flex items-center justify-center p-12 overflow-hidden border-l border-[#E5E5E5] dark:border-[#222]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2E5E99]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                
                <div className="relative w-full h-full min-h-[400px]">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    className="object-contain object-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-rotate-1 transition-all duration-[1.5s] ease-out"
                  />
                </div>

                {/* Floating Engineering Badge */}
                <div className="absolute bottom-8 right-8 flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-[#E5E5E5] dark:border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-20 hover:-translate-y-1 transition-transform duration-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-[#111] dark:text-white font-semibold">CMM VERIFIED</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
