"use client";

import React from "react";
import { Scale, ShieldCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function StatementOfDeviationsIntro() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
               Integrity in <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Capital Allocation
              </span>
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              The Statement of Deviations is a critical statutory disclosure 
              confirming whether funds raised through various corporate 
              actions have been utilized for their intended purposes. It 
              ensures J Pan Tubular Components Limited's unwavering commitment to shareholder 
              trust and fiscal discipline.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                <div className="w-9 h-9 bg-white dark:bg-charcoal flex items-center justify-center rounded-xl text-[#2E5E99] border border-[#7BA4D0]/25">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Fiscal Parity</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                <div className="w-9 h-9 bg-white dark:bg-charcoal flex items-center justify-center rounded-xl text-[#2E5E99] border border-[#7BA4D0]/25">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Fund Utilization</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="p-8 md:p-10 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl relative overflow-hidden space-y-6">
              <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center text-[#2E5E99] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D2440] dark:text-white uppercase tracking-wider text-xs mb-1">
                    Statutory Verification
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Strict adherence to SEBI requirements for the periodic reporting of fund utilization and deviations.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center text-[#2E5E99] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D2440] dark:text-white uppercase tracking-wider text-xs mb-1">
                    Transparency Loop
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Providing clear visibility into any variances between planned and actual capital expenditure.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center text-[#2E5E99] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D2440] dark:text-white uppercase tracking-wider text-xs mb-1">
                    Audit Compliance
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Ensuring all financial disclosures are vetted through internal and external statutory audit channels.
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
