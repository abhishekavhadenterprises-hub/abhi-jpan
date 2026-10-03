"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, ShieldCheck, Scale, Quote } from "lucide-react";

export function UnclaimedIntro() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
              Facilitating Your <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Claim Recovery
              </span>
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              Unclaimed dividends and unpaid amounts represent your rightful 
              earnings as a shareholder. J Pan Tubular Components Limited is dedicated to maintaining 
              absolute transparency and assisting our investors in navigating 
              the recovery process efficiently.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-2xl shrink-0 border border-[#7BA4D0]/30 mb-4 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                  <Info className="w-6 h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Entitlement
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Regular verification of unpaid dividend history.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-2xl shrink-0 border border-[#7BA4D0]/30 mb-4 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                  <Scale className="w-6 h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Statutory Norms
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Full compliance with IEPF transfer regulations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Visual / Quote Card */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F8FAFC] to-[#EDF4FD] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-white dark:bg-charcoal/80 border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center text-[#2E5E99]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <Quote className="w-10 h-10 text-[#7BA4D0]/25" />
              </div>

              <h3 className="text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-8 tracking-tight">
                Our Commitment
              </h3>
              
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "We ensure that every eligible shareholder is informed 
                    regarding their unclaimed amounts, upholding the highest 
                    standards of corporate fiduciary responsibility."
                  </p>
                </div>
                
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "Our team provides end-to-end guidance for claims 
                    verification and fund recovery from the IEPF Authority."
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
