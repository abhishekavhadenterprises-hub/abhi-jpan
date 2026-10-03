"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Info } from "lucide-react";

export function MaterialCompliance() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-black border-y border-[#7BA4D0]/20 overflow-hidden relative">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-center">
            
            {/* Regulatory Compliance */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Regulatory Compliance
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                All documents hosted in this repository are maintained in strict 
                compliance with Regulation 46(2)(r) of the SEBI (Listing 
                Obligations and Disclosure Requirements) Regulations, 2015.
              </p>
            </div>

            {/* Central Badge */}
            <div className="flex justify-center">
              <div className="px-7 py-3.5 bg-white dark:bg-charcoal/60 border border-[#7BA4D0]/30 rounded-2xl flex items-center gap-4">
                <div className="w-2.5 h-2.5 bg-[#2E5E99] rounded-full animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">
                    Repository Status
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                    Verified & Active
                  </span>
                </div>
              </div>
            </div>

            {/* Statutory Notice */}
            <div className="flex flex-col gap-2 lg:text-right">
              <div className="flex items-center gap-3 lg:justify-end">
                <div className="w-8 h-8 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Statutory Notice
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                The availability of these documents is intended for the information 
                of stakeholders and does not constitute a legal offer or a 
                binding contractual commitment beyond the terms stated herein.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
