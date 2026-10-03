"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Scale, BookmarkCheck } from "lucide-react";

export function MaterialIntro() {
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
              Authoritative <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-medium inline-block pr-1 pb-1">
                Record Repository
              </span>
            </h2>

            <p className="text-[#0D2440]/70 dark:text-white/70 text-base sm:text-lg mb-8 leading-relaxed font-normal max-w-xl">
              In accordance with SEBI (LODR) Regulations, J Pan Tubular Components Limited provides 
              stakeholders with direct access to material documents and 
              contracts that influence corporate governance and strategic 
              direction. Our repository ensures that every key agreement is 
              documented and accessible.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center rounded-xl mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <BookmarkCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2">
                  Verified Content
                </h4>
                <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                  Authenticated versions of all material agreements and board-approved contracts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center rounded-xl mb-4 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2">
                  Digital Accessibility
                </h4>
                <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                  High-fidelity digital copies for investor scrutiny and historical reference.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Legal Framework Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="p-8 sm:p-10 md:p-12 rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/30 dark:via-[#0D2440]/20 dark:to-[#0D2440]/40 border border-[#7BA4D0]/35 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 flex items-center justify-center mb-6 text-[#2E5E99] dark:text-[#7BA4D0]">
                <Scale className="w-7 h-7" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#0D2440] dark:text-white mb-6">
                Legal Framework
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/70 dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                  <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-lg font-mono">/01</span>
                  <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/80 leading-relaxed italic">
                    &ldquo;Absolute transparency in material disclosures is the 
                    foundation of institutional shareholder trust.&rdquo;
                  </p>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/70 dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                  <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-lg font-mono">/02</span>
                  <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/80 leading-relaxed italic">
                    &ldquo;We adhere to the highest standards of regulatory compliance 
                    in the maintenance and disclosure of corporate agreements.&rdquo;
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
