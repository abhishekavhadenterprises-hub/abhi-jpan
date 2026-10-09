"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, BarChart3, Globe, Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function RatingAlpha() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#071321] overflow-hidden relative transition-colors">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl sm:rounded-[36px] bg-[#0D2440] text-white border border-[#7BA4D0]/30 shadow-2xl shadow-[#2E5E99]/15 overflow-hidden relative"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2E5E99]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#7BA4D0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Rating Alpha Spotlight */}
            <div className="lg:col-span-5 p-8 sm:p-12 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#7BA4D0]/25 bg-radial from-[#153860] to-[#0D2440]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-heading font-black uppercase tracking-[0.2em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Primary Accreditation
                </div>

                <div className="mb-8">
                  <div className="text-7xl sm:text-8xl md:text-9xl font-heading font-black text-white leading-none tracking-tighter mb-4 pr-2">
                    A<span className="text-[#7BA4D0]">+</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-4 py-1.5 bg-[#2E5E99] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xl">
                      Stable Outlook
                    </div>
                    <span className="text-white/70 text-xs font-heading font-bold uppercase tracking-wider">
                      Verified 2024-25
                    </span>
                  </div>
                </div>

                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 italic font-normal">
                  &ldquo;This rating reflects J Pan Tubular Components Limited&apos;s strong market position, healthy capital structure, and robust liquidity profile maintained across fiscal cycles.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/15">
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1 font-heading font-bold">
                    Rating Agency
                  </span>
                  <span className="text-white font-heading font-black text-sm tracking-wider uppercase">
                    ICRA Limited
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1 font-heading font-bold">
                    Effective Date
                  </span>
                  <span className="text-white font-heading font-black text-sm tracking-wider uppercase">
                    Jan 12, 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Strength & Tactile White Cards */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-7 rounded-2xl bg-white text-[#0D2440] border border-[#7BA4D0]/30 shadow-lg space-y-4 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] font-heading font-black text-sm uppercase tracking-wider">
                    Financial Resiliency
                  </h4>
                  <p className="text-[#0D2440]/70 text-xs sm:text-sm leading-relaxed font-normal">
                    Demonstrated ability to maintain healthy interest 
                    coverage and cash-flow-to-debt ratios amidst 
                    fluctuating industrial demand.
                  </p>
                </div>

                <div className="p-7 rounded-2xl bg-white text-[#0D2440] border border-[#7BA4D0]/30 shadow-lg space-y-4 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] font-heading font-black text-sm uppercase tracking-wider">
                    Operational Scale
                  </h4>
                  <p className="text-[#0D2440]/70 text-xs sm:text-sm leading-relaxed font-normal">
                    High utilization of manufacturing capacity and a 
                    diversified client portfolio contributing to 
                    revenue stability.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/15">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-1">
                        Institutional Report
                      </h5>
                      <p className="text-white/70 text-xs font-normal">
                        Access the complete credit rationale and detailed evaluation report.
                      </p>
                    </div>
                  </div>
                  
                  <Link
                    href="#archive"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0D2440] hover:bg-[#E7F0FA] font-heading font-bold text-xs transition-colors shrink-0 shadow-md"
                  >
                    View Rationale <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
