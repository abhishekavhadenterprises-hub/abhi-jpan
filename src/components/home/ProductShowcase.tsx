"use client";

import React, { useState, useEffect } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % capabilities.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 md:py-16 bg-[#FAFAFA] dark:bg-[#030303] text-[#111] dark:text-white transition-colors duration-700 overflow-hidden border-b border-[#111]/10 dark:border-white/10">
      {/* Ambient Glows (Static CSS, zero GPU animation overhead) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,94,153,0.06)_0%,transparent_70%)] absolute -left-[10%] top-0" />
        <div className="w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.04)_0%,transparent_70%)] absolute right-0 bottom-0" />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 relative z-10 flex flex-col justify-center min-h-[70vh]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#111]/5 dark:border-white/5">
          <div className="max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-bold uppercase text-[#2E5E99] dark:text-cyan-400 mb-4 sm:mb-6"
            >
              Product Catalogue & Specifications
            </motion.h2>
            <ScrollWipeHeading as="h3" className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-light tracking-tighter text-[#111] dark:text-white leading-[1.08]">
              Precision alloy <br />
              <span className="text-[#666] dark:text-[#888]">manufacturing excellence.</span>
            </ScrollWipeHeading>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg lg:pb-4"
          >
            <p className="text-[#666] dark:text-[#999] text-xs sm:text-sm md:text-base leading-relaxed font-light">
              Engineered from certified electrolytic copper, forged brass alloys, and surgical-grade stainless steel to satisfy the world's most stringent OEM tolerance benchmarks.
            </p>
          </motion.div>
        </div>

        {/* Premium Tab Selector Bar with Fluid Wrapping */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-6 p-1.5 rounded-2xl sm:rounded-full bg-white dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] w-full sm:w-fit shadow-sm relative z-20 mx-auto lg:mx-0">
          {capabilities.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl sm:rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 z-10 ${isActive
                    ? "text-white dark:text-[#050505]"
                    : "text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute inset-0 bg-[#2E5E99] rounded-xl sm:rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className={`font-mono text-[8px] sm:text-[9px] ${isActive ? 'opacity-80' : 'opacity-50'}`}>{item.roman} //</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed Dossier */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch rounded-2xl sm:rounded-3xl lg:rounded-[3rem] bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden group"
            >
              {/* Left Column: Technical Dossier */}
              <div className="lg:col-span-6 flex flex-col justify-between p-5 sm:p-7 lg:p-8 z-10 relative">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#111] dark:text-white leading-[1.1] mb-3 sm:mb-4 tracking-tight">
                    {activeProduct.title}
                  </h3>

                  <p className="text-[#555] dark:text-[#AAA] text-xs sm:text-sm lg:text-base font-light leading-relaxed mb-4 sm:mb-6 max-w-xl">
                    {activeProduct.description}
                  </p>

                  {/* Key Spec Highlights */}
                  <div className="space-y-2.5 sm:space-y-3 pt-4 sm:pt-6 border-t border-[#111]/10 dark:border-white/10">
                    {activeProduct.specDetails.map((spec, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.6 }}
                        key={i}
                        className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono text-[#666] dark:text-[#999]"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#111]/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3 text-[#111] dark:text-white" />
                        </div>
                        <span className="tracking-wide text-[11px] sm:text-xs">{spec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric & Action */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#111]/10 dark:border-white/10">
                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#888] dark:text-[#777] mb-1 sm:mb-2 font-bold">
                      {activeProduct.metricLabel}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-light tracking-tighter text-3xl sm:text-4xl md:text-5xl text-[#111] dark:text-white">
                        {activeProduct.metricValue}
                      </span>
                      <span className="text-xs sm:text-sm text-[#888] font-medium tracking-widest uppercase">
                        {activeProduct.metricSub}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/products"
                    className="relative overflow-hidden group/btn px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#2E5E99] text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest transition-all duration-500 inline-flex items-center justify-center gap-3 shadow-md hover:shadow-[0_10px_20px_rgba(46,94,153,0.3)] hover:scale-105 z-20 w-full sm:w-auto text-center"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Premium Showcase Image (Perfect Fit & Smooth Hover Zoom) */}
              <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-[#111]/5 dark:border-white/5 bg-slate-100/50 dark:bg-black/30 group/image">
                <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-110 group-hover/image:scale-110"
                  />
                  {/* Subtle Specular & Ambient Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-40" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,94,153,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
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
