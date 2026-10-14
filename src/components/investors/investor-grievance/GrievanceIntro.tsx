"use client";

import React from "react";
import { Scale, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const perspectiveEntranceLeft: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 12,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const perspectiveEntranceRight: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 12,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function GrievanceIntro() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={perspectiveEntranceLeft}
            className="lg:col-span-7"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white mb-4 sm:mb-6 leading-[1.12] tracking-tight">
              Responsive <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Redressal Hub
              </span>
            </h2>

            <p className="text-[#0D2440]/75 dark:text-white/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-10 leading-relaxed font-normal max-w-2xl">
              At J Pan Tubular Components Limited, we prioritize the voice of our stakeholders. 
              Our investor grievance system is engineered to provide a 
              structured, transparent, and legally-compliant framework for 
              resolving concerns related to dividends, share transfers, 
              and statutory disclosures.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="p-4 sm:p-6 bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] hover:bg-white dark:hover:bg-[#0D2440]/70 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg shadow-xs">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl sm:rounded-2xl mb-3 sm:mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                    Fair Evaluation
                  </h4>
                  <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                    Impartial review of every submission by our compliance desk.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] hover:bg-white dark:hover:bg-[#0D2440]/70 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg shadow-xs">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl sm:rounded-2xl mb-3 sm:mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                    Timed Resolution
                  </h4>
                  <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                    Systematic tracking ensuring resolution within 7–15 working days.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={perspectiveEntranceRight}
            className="lg:col-span-5"
          >
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/40 dark:border-[#7BA4D0]/30 shadow-xl shadow-[#2E5E99]/5 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-4 sm:mb-6">
                  Statutory Redressal
                </h3>

                <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/80 leading-relaxed font-medium mb-5 sm:mb-6">
                  All grievances submitted are cataloged with official audit trails and reviewed under the supervision of the Stakeholders Relationship Committee.
                </p>

                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#071321]/60 border border-[#7BA4D0]/30 shadow-xs">
                  <span className="text-[10px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-widest block mb-1">
                    Zero Escalation Mandate
                  </span>
                  <p className="text-xs text-[#0D2440]/75 dark:text-white/70 leading-relaxed font-normal">
                    Direct personal attention from the Company Secretary and designated Compliance Officer.
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
