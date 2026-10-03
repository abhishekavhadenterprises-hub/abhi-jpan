"use client";

import React, { useState } from "react";
import { Fan, Car, Home, Factory, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  {
    id: "hvac",
    num: "01",
    title: "HVAC & Climate Control",
    icon: Fan,
    tag: "THERMAL TRANSFER",
    description: "Advanced copper, stainless steel and aluminum solutions designed for high-efficiency air conditioning and refrigeration applications.",
    colSpan: "lg:col-span-8",
    color: "from-cyan-500/20 to-[#2E5E99]/20",
  },
  {
    id: "automotive",
    num: "02",
    title: "Automotive Engineering",
    icon: Car,
    tag: "BRAKE & FUEL LINES",
    description: "Precision-manufactured components supporting performance-driven automotive and mobility systems.",
    colSpan: "lg:col-span-4",
    color: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: "appliances",
    num: "03",
    title: "Consumer Appliances",
    icon: Home,
    tag: "REFRIGERATION",
    description: "Reliable engineered solutions powering modern home and commercial appliance technologies.",
    colSpan: "lg:col-span-4",
    color: "from-emerald-500/20 to-teal-700/20",
  },
  {
    id: "industrial",
    num: "04",
    title: "Industrial & Data Centers",
    icon: Factory,
    tag: "CRITICAL COOLING",
    description: "Heavy-duty precision components supporting industrial operations and mission-critical data center cooling environments.",
    colSpan: "lg:col-span-8",
    color: "from-purple-500/20 to-indigo-700/20",
  },
];

export function Industries() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-28 md:py-36 bg-[#FAFAFA] dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1200px] h-[1200px] rounded-full bg-gradient-to-tr from-[#586854]/10 via-[#2E5E99]/5 to-transparent blur-[150px]"
        />
      </div>

      <div className="container-custom relative z-10 w-full">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24 pb-8 border-b border-[#E5E5E5] dark:border-[#222]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-6">Sectors & Applications</h2>
            <h3 className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">
              Engineered for <br />
              <span className="text-[#666]">critical sectors.</span>
            </h3>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="max-w-sm lg:pb-4">
            <p className="text-[#666] dark:text-[#999] text-sm md:text-base leading-relaxed font-light">
              Supplying global OEMs across thermal management, mobility systems, consumer cooling, and heavy industrial operations with zero-defect tubular solutions.
            </p>
          </motion.div>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative min-h-[400px] md:min-h-[480px] rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#222] flex flex-col justify-between p-8 md:p-12 transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_40px_80px_rgba(255,255,255,0.02)] hover:-translate-y-2 ${ind.colSpan}`}
              >
                {/* Massive Animated Background Number */}
                <div className="absolute -top-10 -right-4 text-[15rem] font-bold tracking-tighter text-[#F5F5F5] dark:text-[#111] leading-none transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4 pointer-events-none select-none z-0">
                  {ind.num}
                </div>

                {/* Dynamic Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${ind.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen`}
                />

                {/* Top Section */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] text-[#111] dark:text-white transition-all duration-700 group-hover:bg-[#111] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#111] group-hover:scale-110 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/80 dark:bg-black/80 border border-[#E5E5E5] dark:border-[#333] backdrop-blur-md shadow-sm">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] dark:text-[#999] font-medium">
                      {ind.tag}
                    </span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 mt-12 flex flex-col justify-end">
                  <h3 className="text-3xl md:text-4xl font-light text-[#111] dark:text-white tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-700">
                    {ind.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#666] dark:text-[#888] font-light leading-relaxed max-w-sm mb-10 opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700 delay-75">
                    {ind.description}
                  </p>
                  
                  {/* Action Link (Glassmorphic) */}
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-between gap-4 p-2 pl-6 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] group-hover:bg-white dark:group-hover:bg-[#222] group-hover:border-transparent group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 w-max"
                  >
                    <span className="text-xs uppercase tracking-widest text-[#111] dark:text-white font-medium">Explore</span>
                    <span className="w-10 h-10 rounded-full bg-[#111] dark:bg-white flex items-center justify-center text-white dark:text-[#111] transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

