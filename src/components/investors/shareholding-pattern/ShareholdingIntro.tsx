"use client";

import React from "react";
import { ShieldCheck, Target, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function ShareholdingIntro() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Ownership <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                As a Standard of Trust
              </span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-10 leading-relaxed max-w-xl">
              Understanding the shareholding pattern is critical for 
              stakeholders to assess the company's stability and 
              leadership alignment. At J Pan Tubular Components Limited, we provide regular, 
              statutory disclosures of our ownership structure to ensure 
              absolute market transparency.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="p-4 sm:p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-xl sm:rounded-2xl shrink-0 border border-[#7BA4D0]/30 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1 sm:mb-1.5 group-hover:text-[#2E5E99] transition-colors">
                      Alignment
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Ensuring promoter commitment remains aligned with long-term shareholder value creation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-xl sm:rounded-2xl shrink-0 border border-[#7BA4D0]/30 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1 sm:mb-1.5 group-hover:text-[#2E5E99] transition-colors">
                      Public Disclosure
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Consistent quarterly reporting in compliance with SEBI and Exchange requirements.
                    </p>
                  </div>
                </div>
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
            <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F8FAFC] to-[#EDF4FD] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 relative overflow-hidden">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white dark:bg-charcoal/80 flex items-center justify-center text-[#2E5E99] mb-6 sm:mb-8 border border-[#7BA4D0]/30">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 sm:mb-8 tracking-tight">
                Institutional Integrity
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20 flex gap-3.5 sm:gap-4 items-start">
                  <span className="text-[#2E5E99] font-bold text-base sm:text-lg shrink-0">01.</span>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "Our shareholding structure reflects a balanced participation 
                    from promoters and public institutions, fostering a resilient 
                    corporate ecosystem."
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20 flex gap-3.5 sm:gap-4 items-start">
                  <span className="text-[#2E5E99] font-bold text-base sm:text-lg shrink-0">02.</span>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "We maintain strict adherence to minimum public shareholding 
                    norms, ensuring liquidity and market efficiency for all investors."
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
