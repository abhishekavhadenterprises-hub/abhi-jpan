"use client";

import React from "react";
import { ShieldAlert, Scale, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function PublicationCompliance() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-8 sm:p-12 md:p-16 rounded-3xl relative overflow-hidden"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
                  Public Awareness <br />
                  <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                    & Legal Mandates
                  </span>
                </h3>
                
                <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
                  As per Regulation 47 of SEBI (LODR) Regulations, 2015, listed companies 
                  are required to publish financial results and notices of corporate 
                  actions in at least one English national daily and one regional 
                  daily. J Pan Tubular Components Limited strictly adheres to these mandates to ensure 
                  maximum market transparency.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20">
                    <CheckCircle2 className="w-5 h-5 text-[#2E5E99] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                        Market Outreach
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Ensuring notice accessibility for investors who rely on traditional media.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20">
                    <CheckCircle2 className="w-5 h-5 text-[#2E5E99] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                        Audit Compliance
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Full documentation for statutory audit and secretarial verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/40 dark:to-charcoal/50 border border-[#7BA4D0]/35">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-11 h-11 bg-white dark:bg-charcoal rounded-xl flex items-center justify-center border border-[#7BA4D0]/30">
                      <Scale className="w-6 h-6 text-[#2E5E99]" />
                    </div>
                    <h4 className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-widest">
                      Legal Precision
                    </h4>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex gap-3.5 items-start p-3 rounded-xl bg-white/70 dark:bg-charcoal/70 border border-[#7BA4D0]/20">
                      <span className="text-[#2E5E99] font-bold text-xs mt-0.5 shrink-0">/01</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Financial Results (Quarterly/Annual) are published within 48 hours of board approval.
                      </p>
                    </li>
                    <li className="flex gap-3.5 items-start p-3 rounded-xl bg-white/70 dark:bg-charcoal/70 border border-[#7BA4D0]/20">
                      <span className="text-[#2E5E99] font-bold text-xs mt-0.5 shrink-0">/02</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        AGM/EGM notices are published in both English and Regional vernacular dailies.
                      </p>
                    </li>
                    <li className="flex gap-3.5 items-start p-3 rounded-xl bg-white/70 dark:bg-charcoal/70 border border-[#7BA4D0]/20">
                      <span className="text-[#2E5E99] font-bold text-xs mt-0.5 shrink-0">/03</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Newspaper clippings are archived for historical reference and investor discovery.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
