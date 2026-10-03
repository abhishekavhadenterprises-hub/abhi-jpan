"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Scale } from "lucide-react";

export function RatingIntro() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black border-b border-[#7BA4D0]/20 overflow-hidden relative">
      {/* Background Soft Glows */}

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
              Institutional <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-medium inline-block pr-1 pb-1">
                Credit Validation
              </span>
            </h2>

            <p className="text-[#0D2440]/70 dark:text-white/70 text-base sm:text-lg mb-8 leading-relaxed font-normal max-w-xl">
              Credit ratings provide an independent and objective evaluation of 
              our company&apos;s ability to meet financial commitments. These 
              ratings are vital for investors and stakeholders, offering 
              transparency into J Pan Tubular Components Limited&apos;s fiscal stability and risk 
              management framework.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center rounded-xl mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <Scale className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2">
                  Objective Analysis
                </h4>
                <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                  Independent assessment based on rigorous financial methodology.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center rounded-xl mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2">
                  Stakeholder Trust
                </h4>
                <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                  Providing a verified measure of fiscal strength and reliability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Fiscal Benchmarking Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="p-8 sm:p-10 md:p-12 rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/30 dark:via-[#0D2440]/20 dark:to-[#0D2440]/40 border border-[#7BA4D0]/35 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 flex items-center justify-center mb-6 text-[#2E5E99] dark:text-[#7BA4D0]">
                <BarChart3 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#0D2440] dark:text-white mb-6">
                Fiscal Benchmarking
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/70 dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                  <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-lg font-mono">/01</span>
                  <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/80 leading-relaxed italic">
                    &ldquo;A strong credit rating is a testament to our disciplined 
                    capital management and strategic growth performance.&rdquo;
                  </p>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/70 dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                  <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-lg font-mono">/02</span>
                  <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/80 leading-relaxed italic">
                    &ldquo;We maintain an open dialogue with rating agencies to ensure 
                    accurate and timely reflection of our financial position.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
