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
    <section className="relative py-24 md:py-32 bg-[#FAFAFA] dark:bg-[#030303] text-[#111] dark:text-white transition-colors duration-700 overflow-hidden border-b border-[#111]/10 dark:border-white/10">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full bg-gradient-to-tr from-[#2E5E99]/5 dark:from-[#2E5E99]/10 to-transparent blur-[120px] absolute -left-[10%] top-0 mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-bl from-purple-500/5 dark:from-purple-900/10 to-transparent blur-[150px] absolute right-0 bottom-0 mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10 flex flex-col justify-center min-h-[85vh]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 pb-12 border-b border-[#111]/5 dark:border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h2 className="text-xs tracking-[0.4em] font-bold uppercase text-[#2E5E99] dark:text-cyan-400 mb-6">
              Product Catalogue & Specifications
            </h2>
            <ScrollWipeHeading as="h3" className="text-5xl md:text-6xl lg:text-[5.5rem] font-light tracking-tighter text-[#111] dark:text-white leading-[1.05]">
              Precision alloy <br />
              <span className="text-[#666] dark:text-[#888]">manufacturing excellence.</span>
            </ScrollWipeHeading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg lg:pb-4"
          >
            <p className="text-[#666] dark:text-[#999] text-base leading-relaxed font-light">
              Engineered from certified electrolytic copper, forged brass alloys, and surgical-grade stainless steel to satisfy the world's most stringent OEM tolerance benchmarks.
            </p>
          </motion.div>
        </div>

        {/* Premium Tab Selector Bar with Layout Animation */}
        <div className="flex flex-wrap items-center gap-2 mb-16 p-2 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 w-fit shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative z-20 mx-auto lg:mx-0">
          {capabilities.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors duration-500 flex items-center gap-3 z-10 ${isActive
                    ? "text-white dark:text-[#050505]"
                    : "text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute inset-0 bg-[#111] dark:bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`font-mono text-[9px] ${isActive ? 'opacity-80' : 'opacity-50'}`}>{item.roman} //</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed Dossier */}
        <div className="relative group/spotlight w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.98, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch rounded-[3rem] bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-3xl border border-white/50 dark:border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.07)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden group"
              onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
                const { left, top } = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - left);
                mouseY.set(e.clientY - top);
              }}
            >
              {/* React Bits Spotlight Overlay */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100 z-50 mix-blend-overlay"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      800px circle at ${mouseX}px ${mouseY}px,
                      rgba(255, 255, 255, 0.15),
                      transparent 80%
                    )
                  `,
                }}
              />

              {/* Left Column: Technical Dossier */}
              <div className="lg:col-span-6 flex flex-col justify-between p-10 lg:p-16 z-10 relative">
                <div>
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/50 dark:bg-black/50 border border-[#111]/5 dark:border-white/5 mb-10 shadow-sm backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] tracking-widest text-[#555] dark:text-[#AAA] uppercase font-bold">
                      {activeProduct.eyebrowCategory}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#111] dark:text-white leading-[1.1] mb-8 tracking-tight">
                    {activeProduct.title}
                  </h3>

                  <p className="text-[#555] dark:text-[#AAA] text-base lg:text-lg font-light leading-relaxed mb-12 max-w-xl">
                    {activeProduct.description}
                  </p>

                  {/* Key Spec Highlights */}
                  <div className="space-y-5 pt-10 border-t border-[#111]/10 dark:border-white/10">
                    {activeProduct.specDetails.map((spec, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.6 }}
                        key={i}
                        className="flex items-center gap-5 text-sm font-mono text-[#666] dark:text-[#999]"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#111]/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#111] dark:text-white" />
                        </div>
                        <span className="tracking-wide">{spec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric & Action */}
                <div className="flex flex-wrap items-end justify-between gap-8 pt-12 mt-12 border-t border-[#111]/10 dark:border-white/10">
                  <div>
                    <span className="block text-xs uppercase tracking-[0.25em] text-[#888] dark:text-[#777] mb-3 font-bold">
                      {activeProduct.metricLabel}
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-light tracking-tighter text-6xl md:text-7xl text-[#111] dark:text-white">
                        {activeProduct.metricValue}
                      </span>
                      <span className="text-sm text-[#888] font-medium tracking-widest uppercase">
                        {activeProduct.metricSub}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/products"
                    className="relative overflow-hidden group/btn px-10 py-5 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#050505] font-bold text-xs uppercase tracking-widest transition-all duration-500 inline-flex items-center gap-4 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:scale-105 z-20"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Premium Showcase Image */}
              <div className="lg:col-span-6 relative min-h-[500px] lg:min-h-full bg-gradient-to-br from-[#F5F5F5] to-[#EAEAEA] dark:from-[#080808] dark:to-[#020202] flex items-center justify-center p-12 overflow-hidden border-l border-[#111]/5 dark:border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,94,153,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(46,94,153,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                <motion.div
                  className="relative w-full h-full min-h-[400px] flex items-center justify-center"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    className="object-contain object-center drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:rotate-2 transition-all duration-[2s] ease-out"
                  />
                </motion.div>

                {/* Floating Engineering Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-10 right-10 flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.1)] z-20 hover:-translate-y-2 transition-transform duration-500"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="font-mono text-[10px] tracking-widest text-[#111] dark:text-white font-bold">CMM VERIFIED</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
