"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Info } from "lucide-react";

export function MaterialCompliance() {
  return (
    <section className="py-14 md:py-20 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 p-8 sm:p-10 shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-center">
            
            {/* Regulatory Compliance */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Regulatory Compliance
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                All documents hosted in this repository are maintained in strict 
                compliance with Regulation 46(2)(r) of the SEBI (Listing 
                Obligations and Disclosure Requirements) Regulations, 2015.
              </p>
            </div>

            {/* Central Badge */}
            <div className="flex justify-center">
              <div className="px-7 py-4 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl flex items-center gap-4 shadow-xs">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-heading font-black text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">
                    Repository Status
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider">
                    Verified & Active
                  </span>
                </div>
              </div>
            </div>

            {/* Statutory Notice */}
            <div className="flex flex-col gap-2 lg:text-right">
              <div className="flex items-center gap-3 lg:justify-end">
                <div className="w-10 h-10 rounded-xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Statutory Notice
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                Certain sensitive proprietary details or intellectual property parameters 
                may be redacted in accordance with applicable statutory disclosure norms.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
