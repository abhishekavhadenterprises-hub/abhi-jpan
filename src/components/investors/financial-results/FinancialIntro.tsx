"use client";

import React from "react";
import { ShieldCheck, BarChart3, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function FinancialIntro() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 sm:mb-6 md:mb-8 leading-[1.15] overflow-visible">
              Transparency as a <br />
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Cornerstone of Growth</span>
            </h2>
            
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed font-normal max-w-lg">
              At J Pan Tubular Components Limited, we believe that sustainable industrial leadership is built 
              on a foundation of financial integrity. Our periodic results provide 
              stakeholders with a clear view of our operational efficiency, market 
              resilience, and technical expansion.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
              <div className="group cursor-pointer p-4 sm:p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-1 transition-all duration-500">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl sm:rounded-2xl mb-3 sm:mb-4 transition-all duration-500 group-hover:bg-[#0D2440] group-hover:text-white text-[#2E5E99]">
                  <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={1.75} />
                </div>
                <h4 className="font-bold text-[11px] sm:text-xs text-[#0D2440] dark:text-white uppercase tracking-widest mb-1.5 sm:mb-2 group-hover:text-[#2E5E99] transition-colors">Governance</h4>
                <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">Adhering to the highest standards of regulatory compliance.</p>
              </div>
              <div className="group cursor-pointer p-4 sm:p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-1 transition-all duration-500">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl sm:rounded-2xl mb-3 sm:mb-4 transition-all duration-500 group-hover:bg-[#0D2440] group-hover:text-white text-[#2E5E99]">
                  <BarChart3 className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={1.75} />
                </div>
                <h4 className="font-bold text-[11px] sm:text-xs text-[#0D2440] dark:text-white uppercase tracking-widest mb-1.5 sm:mb-2 group-hover:text-[#2E5E99] transition-colors">Insight</h4>
                <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">Data-driven reporting for professional investor review.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - 100% Crisp Visual, No Murky Blend */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/4] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#7BA4D0]/30 dark:border-white/15 group bg-white dark:bg-[#0D2440]"
          >
            <Image 
              src="/images/annual_reports_hero.png"
              alt="Financial Data"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Soft Gradient Overlay for readable glass panel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/80 via-transparent to-transparent z-10" />

            {/* Glassmorphic Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-10 z-20">
              <div className="bg-white/95 dark:bg-[#0D2440]/90 backdrop-blur-md border border-[#7BA4D0]/35 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transform group-hover:-translate-y-1.5 transition-transform duration-500">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center text-[#2E5E99] mb-3 sm:mb-4">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-1.5 sm:mb-2">Official Disclosures</h3>
                <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-normal">
                  Access our full repository of quarterly results, annual reports, 
                  and mandatory regulatory filings.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2E5E99] uppercase tracking-wider">
                  <span>Scroll to Archive</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

