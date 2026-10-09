"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Info, ShieldCheck, Scale, ArrowUpRight } from "lucide-react";

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

export function UnclaimedIntro() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={perspectiveEntranceLeft}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
              Shareholder Entitlement
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white mb-6 leading-[1.12] tracking-tight">
              Facilitating Your <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Claim Recovery
              </span>
            </h2>
            
            <p className="text-[#0D2440]/75 dark:text-white/70 text-base sm:text-lg mb-10 leading-relaxed font-normal max-w-2xl">
              Unclaimed dividends and unpaid amounts represent your rightful 
              earnings as a shareholder. J Pan Tubular Components Limited is dedicated to maintaining 
              absolute transparency and assisting our investors in navigating 
              the recovery process efficiently.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] hover:bg-white dark:hover:bg-[#0D2440]/70 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg shadow-xs">
                <div className="w-12 h-12 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                    Entitlement
                  </h4>
                  <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                    Regular verification of unpaid dividend history and share warrant status.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] hover:bg-white dark:hover:bg-[#0D2440]/70 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg shadow-xs">
                <div className="w-12 h-12 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                    Statutory Norms
                  </h4>
                  <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                    Full compliance with Ministry of Corporate Affairs IEPF transfer regulations.
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
            <div className="p-8 sm:p-10 rounded-3xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/40 dark:border-[#7BA4D0]/30 shadow-xl shadow-[#2E5E99]/5 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] bg-white/80 dark:bg-black/30 px-3 py-1 rounded-full border border-[#7BA4D0]/20">
                    Nodal Office Verified
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-6">
                  Nodal Assistance
                </h3>

                <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/80 leading-relaxed font-medium mb-6">
                  Our dedicated Nodal Officer facilitates claimant document checks, ensuring swift verification before transmission to the MCA authority.
                </p>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#071321]/60 border border-[#7BA4D0]/30 shadow-xs">
                  <span className="text-[10px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-widest block mb-1">
                    Direct Claim Support
                  </span>
                  <p className="text-xs text-[#0D2440]/75 dark:text-white/70 leading-relaxed font-normal">
                    Submit your folio number or Client ID to obtain prompt status confirmation.
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
