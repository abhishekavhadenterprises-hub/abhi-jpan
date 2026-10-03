"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, BarChart3, Globe } from "lucide-react";

export function RatingAlpha() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/30 dark:via-[#0D2440]/20 dark:to-[#0D2440]/40 border border-[#7BA4D0]/35 overflow-hidden relative"
        >
          {/* Subtle Ambient Light Gradients */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Rating Alpha */}
            <div className="lg:col-span-5 p-8 sm:p-12 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#7BA4D0]/25">
              <div className="mb-8">
                <div className="text-7xl sm:text-8xl md:text-9xl font-heading font-black text-[#0D2440] dark:text-white leading-none tracking-tighter mb-4">
                  A<span className="text-[#2E5E99] dark:text-[#7BA4D0]">+</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-1.5 bg-[#0D2440] text-white text-xs font-bold uppercase tracking-wider rounded-xl">
                    Stable Outlook
                  </div>
                  <span className="text-[#0D2440]/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider">
                    Verified 2024-25
                  </span>
                </div>
              </div>

              <p className="text-[#0D2440]/75 dark:text-white/75 text-sm sm:text-base leading-relaxed mb-8 italic font-normal">
                &ldquo;This rating reflects J Pan Tubular Components Limited&apos;s strong market position, healthy capital structure, and robust liquidity profile maintained across fiscal cycles.&rdquo;
              </p>

              <div className="flex items-center gap-8 pt-8 border-t border-[#7BA4D0]/25">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest mb-1 font-bold">
                    Rating Agency
                  </span>
                  <span className="text-[#0D2440] dark:text-white font-bold text-sm tracking-wider uppercase">
                    ICRA Limited
                  </span>
                </div>
                <div className="w-px h-8 bg-[#7BA4D0]/30" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest mb-1 font-bold">
                    Effective Date
                  </span>
                  <span className="text-[#0D2440] dark:text-white font-bold text-sm tracking-wider uppercase">
                    Jan 12, 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Strength */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="p-6 rounded-2xl bg-white/80 dark:bg-charcoal/60 border border-[#7BA4D0]/25 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-sm uppercase tracking-wider">
                    Financial Resiliency
                  </h4>
                  <p className="text-[#0D2440]/70 dark:text-white/70 text-xs sm:text-sm leading-relaxed font-normal">
                    Demonstrated ability to maintain healthy interest 
                    coverage and cash-flow-to-debt ratios amidst 
                    fluctuating industrial demand.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/80 dark:bg-charcoal/60 border border-[#7BA4D0]/25 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-sm uppercase tracking-wider">
                    Operational Scale
                  </h4>
                  <p className="text-[#0D2440]/70 dark:text-white/70 text-xs sm:text-sm leading-relaxed font-normal">
                    High utilization of manufacturing capacity and a 
                    diversified client portfolio contributing to 
                    revenue stability.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#7BA4D0]/25">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1">
                        Institutional Report
                      </h5>
                      <p className="text-[#0D2440]/70 dark:text-white/70 text-xs">
                        Access the complete credit rationale and detailed evaluation report.
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href="/sample-report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-[0.18em] rounded-2xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-3 shrink-0 group whitespace-nowrap"
                  >
                    View Rationale
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
