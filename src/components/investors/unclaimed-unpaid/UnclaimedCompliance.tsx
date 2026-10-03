"use client";

import React from "react";
import { ShieldAlert, Scale, ExternalLink, HelpCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function UnclaimedCompliance() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-7">
                 <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
                    Regulatory Mandates <br />
                    <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                      & IEPF Transfer
                    </span>
                 </h2>
                 
                 <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
                    In accordance with the Companies Act, 2013, dividends remaining 
                    unclaimed for a period of seven years are mandatorily 
                    transferred to the Investor Education and Protection Fund (IEPF) 
                    Authority.
                 </p>

                 <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20">
                       <div className="w-11 h-11 bg-[#EBF3FC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl text-[#2E5E99] shrink-0">
                          <Scale className="w-5 h-5" />
                       </div>
                       <div>
                          <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                            Legal Framework
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Compliance with Section 124 of the Companies Act regarding unpaid dividend accounts and fund transfers.
                          </p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20">
                       <div className="w-11 h-11 bg-[#EBF3FC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl text-[#2E5E99] shrink-0">
                          <ShieldAlert className="w-5 h-5" />
                       </div>
                       <div>
                          <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                            Investor Protection
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            J Pan Tubular Components Limited strictly follows the IEPF Authority (Accounting, Audit, Transfer and Refund) Rules.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-5">
                 <div className="p-8 rounded-2xl bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/40 dark:to-charcoal/50 border border-[#7BA4D0]/35">
                    <div className="w-11 h-11 bg-white dark:bg-charcoal rounded-xl flex items-center justify-center border border-[#7BA4D0]/30 text-[#2E5E99] mb-5">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-6">
                      Important <br /> Disclosure
                    </h3>
                    
                    <ul className="space-y-4 mb-8">
                       <li className="flex gap-3 items-start p-3 bg-white/70 dark:bg-charcoal/70 rounded-xl border border-[#7BA4D0]/20">
                          <CheckCircle2 className="w-4 h-4 text-[#2E5E99] shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Shareholders can still claim their transferred shares/dividends from the IEPF Authority.
                          </p>
                       </li>
                       <li className="flex gap-3 items-start p-3 bg-white/70 dark:bg-charcoal/70 rounded-xl border border-[#7BA4D0]/20">
                          <CheckCircle2 className="w-4 h-4 text-[#2E5E99] shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Detailed lists of shares due for transfer are published annually on our website.
                          </p>
                       </li>
                    </ul>
                    
                    <button className="w-full py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all">
                       Claim Instructions
                       <ExternalLink className="w-4 h-4" />
                    </button>
                 </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
