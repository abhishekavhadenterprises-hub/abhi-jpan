"use client";

import React from "react";
import { MessageSquare, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function PublicationIntro() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
              Statutory Disclosure <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Beyond Digital Boundaries
              </span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              While our digital channels provide real-time updates, J Pan 
              Tubular remains committed to traditional media disclosures 
              as a pillar of regulatory compliance. These publications 
              ensure that critical corporate notices reach the widest 
              possible spectrum of stakeholders.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-2xl shrink-0 border border-[#7BA4D0]/30 mb-4 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                  <ShieldCheck className="w-6 h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Legal Validity
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Mandatory public notices as per SEBI (LODR) Regulations.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-2xl shrink-0 border border-[#7BA4D0]/30 mb-4 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                  <Globe className="w-6 h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Regional Outreach
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Bilingual disclosures in English and regional vernaculars.
                  </p>
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
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F8FAFC] to-[#EDF4FD] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-charcoal/80 flex items-center justify-center text-[#2E5E99] mb-8 border border-[#7BA4D0]/30">
                <MessageSquare className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-8 tracking-tight">
                Corporate Integrity
              </h3>
              
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20 flex gap-4 items-start">
                  <span className="text-[#2E5E99] font-bold text-lg shrink-0">/01</span>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "Our media strategy is built on the foundation of absolute 
                    transparency, ensuring that every significant corporate 
                    event is documented and shared with the public."
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20 flex gap-4 items-start">
                  <span className="text-[#2E5E99] font-bold text-lg shrink-0">/02</span>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "We prioritize publications in leading financial dailies 
                    to maintain high standards of investor awareness and 
                    market accessibility."
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
