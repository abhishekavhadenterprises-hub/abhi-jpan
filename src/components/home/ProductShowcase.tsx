"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll tracking across the section height
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Switch tabs smoothly on natural scroll (disabled during programmatic tab click scroll)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isProgrammaticScroll.current) return;
    let index = 0;
    if (latest >= 0.6) {
      index = 2;
    } else if (latest >= 0.28) {
      index = 1;
    }
    setActiveTab((prev) => (prev !== index ? index : prev));
  });

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    if (!sectionRef.current) return;

    isProgrammaticScroll.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const progressTargets = [0.05, 0.45, 0.85];
    const targetScroll = scrollTop + scrollHeight * progressTargets[idx];

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll);
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 650);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-[#FAFAFA] dark:bg-[#030303] text-[#111] dark:text-white transition-colors duration-700 border-b border-[#111]/10 dark:border-white/10"
    >
      {/* Sticky container that remains pinned while scrolling through all products */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,94,153,0.06)_0%,transparent_70%)] absolute -left-[10%] top-0" />
          <div className="w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.04)_0%,transparent_70%)] absolute right-0 bottom-0" />
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 relative z-10 flex flex-col justify-center">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 mb-3.5 sm:mb-4 pb-2.5 sm:pb-3 border-b border-[#111]/5 dark:border-white/5">
            <div className="max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[10px] sm:text-xs tracking-[0.25em] font-bold uppercase text-[#2E5E99] dark:text-cyan-400 mb-1.5 sm:mb-2"
              >
                Product Catalogue & Specifications
              </motion.h2>
              <ScrollWipeHeading as="h3" className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light tracking-tighter text-[#111] dark:text-white leading-[1.1]">
                Precision alloy <br />
                <span className="text-[#666] dark:text-[#888]">manufacturing excellence.</span>
              </ScrollWipeHeading>
            </div>
            <div className="max-w-lg lg:pb-1">
              <p className="text-[#666] dark:text-[#999] text-xs sm:text-sm leading-relaxed font-light">
                Engineered from certified electrolytic copper, forged brass alloys, and surgical-grade stainless steel to satisfy the world&apos;s most stringent OEM tolerance benchmarks.
              </p>
            </div>
          </div>

          {/* Premium Tab Selector Bar with Scroll Sync */}
          <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] w-fit shadow-sm relative z-20">
              {capabilities.map((item, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(idx)}
                    className={`relative px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl sm:rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 z-10 cursor-pointer ${
                      isActive
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
          </div>

          {/* Active Product Detailed Dossier (Stacked CSS Grid: Zero layout shifts, instant silky crossfades) */}
          <div className="relative w-full grid grid-cols-1 grid-rows-1">
            {capabilities.map((product, idx) => {
              const isActive = activeTab === idx;
              const Icon = product.icon;

              return (
                <div
                  key={product.id}
                  className={`col-start-1 row-start-1 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden group min-h-[380px] lg:h-[430px] xl:h-[450px] transition-all duration-300 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto z-10"
                      : "opacity-0 translate-y-2 pointer-events-none z-0"
                  }`}
                >
                  {/* Left Column: Technical Dossier */}
                  <div className="lg:col-span-6 flex flex-col justify-between p-4 sm:p-6 lg:p-7 z-10 relative">
                    <div>
                      <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-[#2E5E99] dark:text-cyan-400 font-bold mb-1">
                        {product.eyebrowCategory}
                      </span>
                      <h3 className="text-lg sm:text-2xl lg:text-[1.65rem] font-light text-[#111] dark:text-white leading-[1.15] mb-2 sm:mb-2.5 tracking-tight">
                        {product.title}
                      </h3>

                      <p className="text-[#555] dark:text-[#AAA] text-xs sm:text-[13px] font-light leading-relaxed mb-3 max-w-xl">
                        {product.description}
                      </p>

                      {/* Key Spec Highlights */}
                      <div className="space-y-1.5 sm:space-y-2 pt-2.5 sm:pt-3 border-t border-[#111]/10 dark:border-white/10">
                        {product.specDetails.map((spec, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono text-[#666] dark:text-[#999]"
                          >
                            <div className="w-4 h-4 rounded-full bg-[#111]/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                              <Icon className="w-2.5 h-2.5 text-[#111] dark:text-white" />
                            </div>
                            <span className="tracking-wide text-[10px] sm:text-xs">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-2.5 sm:pt-3 mt-3 border-t border-[#111]/10 dark:border-white/10 flex justify-end">
                      <Link
                        href="/products"
                        className="relative overflow-hidden group/btn px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#2E5E99] hover:bg-[#1E3A8A] text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-[0_10px_20px_rgba(46,94,153,0.3)] hover:scale-105 z-20 text-center"
                      >
                        <span>View Specifications</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Premium Showcase Image */}
                  <div className="lg:col-span-6 relative min-h-[200px] sm:min-h-[240px] lg:min-h-full w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-[#111]/5 dark:border-white/5 bg-slate-100/50 dark:bg-black/30 group/image">
                    <div className="relative w-full h-full min-h-[200px] sm:min-h-[240px] lg:min-h-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-105"
                      />
                      {/* Subtle Specular & Ambient Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-40" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,94,153,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
