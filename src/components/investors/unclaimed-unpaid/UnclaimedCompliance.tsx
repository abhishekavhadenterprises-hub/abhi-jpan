"use client";

import React from "react";
import { ShieldAlert, Scale, ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function UnclaimedCompliance() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 md:p-16 rounded-3xl sm:rounded-[36px] bg-[#F8FAFC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 relative overflow-hidden shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
                Companies Act 2013
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white mb-6 leading-[1.12] tracking-tight">
                Regulatory Mandates <br />
                <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                  & IEPF Transfer
                </span>
              </h2>
              
              <p className="text-[#0D2440]/70 dark:text-white/65 text-sm sm:text-base mb-8 leading-relaxed font-normal">
                In accordance with the Companies Act, 2013, dividends remaining 
                unclaimed for a period of seven years are mandatorily 
                transferred to the Investor Education and Protection Fund (IEPF) 
                Authority.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#071321]/60 border border-[#7BA4D0]/30 shadow-xs">
                  <div className="w-11 h-11 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                      Legal Framework
                    </h4>
                    <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                      Compliance with Section 124 of the Companies Act regarding unpaid dividend accounts and fund transfers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#071321]/60 border border-[#7BA4D0]/30 shadow-xs">
                  <div className="w-11 h-11 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                      Investor Protection
                    </h4>
                    <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                      J Pan Tubular Components Limited strictly follows the IEPF Authority (Accounting, Audit, Transfer and Refund) Rules.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Statutory Emblem Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/40 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-black text-[#0D2440] dark:text-white">
                Statutory Custody
              </h3>
              <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal max-w-sm mx-auto">
                Shareholders retain legal title and may reclaim their shares and unpaid dividends directly from the IEPF Authority at any time.
              </p>
              <div className="pt-4 border-t border-[#7BA4D0]/20">
                <a 
                  href="https://www.iepf.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline uppercase tracking-wider"
                >
                  IEPF Portal Link <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
