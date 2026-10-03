"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, Box, RefreshCcw, FileCheck, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

const features = [
  {
    title: "Design Co-Engineering",
    desc: "Collaborative CAD & DFM optimization to streamline tubular geometry.",
    icon: PenTool,
  },
  {
    title: "High-Volume OEM Scaling",
    desc: "Automated CNC bending & robotic brazing for zero-defect tier-1 batches.",
    icon: Box,
  },
  {
    title: "Rapid 5-Day Prototyping",
    desc: "Accelerated tooling turnaround for functional bench test samples.",
    icon: RefreshCcw,
  },
  {
    title: "100% Material Traceability",
    desc: "Certified metallurgy mill test certificates and full heat-lot tracking.",
    icon: FileCheck,
  },
];

export function CustomManufacturing() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#070b14] relative overflow-visible transition-colors duration-500">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Side (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E5E99]/10 dark:bg-white/5 border border-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0] text-xs font-heading font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Bespoke Engineering Capabilities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight">
              Need a Custom Engineered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5E99] via-[#4585d4] to-[#7BA4D0]">
                Tubular Solution?
              </span>
            </h2>

            <p className="text-slate-600 dark:text-white/65 text-sm sm:text-base leading-relaxed max-w-xl font-sans font-normal">
              Beyond our standard catalog, we specialize in co-engineering mission-critical fluid, refrigerant, and thermal assemblies. Our engineering team works directly with your blueprints to ensure exact fit and zero-leakage reliability.
            </p>

            {/* 2x2 Feature Matrix Cards - with hover lift & shadow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 hover:border-[#2E5E99]/50 hover:bg-slate-100/60 dark:hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] mb-3 group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-white/55 leading-relaxed font-sans font-normal">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0D2440] dark:bg-[#2E5E99] text-white dark:text-white hover:bg-[#2E5E99] dark:hover:bg-[#7BA4D0] dark:hover:text-[#0D2440] font-heading font-semibold text-sm transition-all duration-300 cursor-pointer group"
              >
                <span>Request Custom Engineering Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Image & CAD Blueprint Showcase (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative py-6 px-2 sm:px-4 lg:p-2"
          >
            {/* Main Showcase Card */}
            <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 group bg-slate-100 dark:bg-[#0A1626]">
              <Image
                src="/images/custom-engineering.png"
                alt="Custom Engineering and Blueprints"
                fill
                className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Dynamic Laser Scanning Beam Animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7BA4D0]/20 to-transparent h-20 w-full animate-pulse pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D18]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Spec Badge 1 (Top Right) - Safe positioning */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 right-2 sm:-top-4 sm:-right-2 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#0D2440]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 flex items-center gap-3 z-20"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2E5E99] text-white flex items-center justify-center font-heading font-black text-xs">
                ±0.02
              </div>
              <div>
                <div className="text-xs sm:text-sm font-heading font-bold text-[#0D2440] dark:text-white">
                  CNC Precision Tolerance
                </div>
                <div className="text-[10px] text-slate-500 dark:text-white/60 font-sans">
                  Automated Cold-Draw & Bend
                </div>
              </div>
            </motion.div>

            {/* Floating Spec Badge 2 (Bottom Left) - Safe positioning */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 left-2 sm:-bottom-4 sm:-left-2 p-3 sm:p-3.5 rounded-2xl bg-white/95 dark:bg-[#0D2440]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 flex items-center gap-2.5 z-20"
            >
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E5E99] dark:text-[#7BA4D0]" />
              <div>
                <div className="text-xs sm:text-sm font-heading font-bold text-[#0D2440] dark:text-white">
                  Zero-Defect Standard
                </div>
                <div className="text-[10px] text-slate-500 dark:text-white/60 font-sans">
                  100% Helium Leak Tested
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
