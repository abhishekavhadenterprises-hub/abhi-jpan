"use client";

import React from "react";
import { ShieldCheck, Scale, ScrollText } from "lucide-react";
import { motion } from "framer-motion";

export function PoliciesIntro() {
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
              Foundations of <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Trust & Accountability
              </span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              At J Pan Tubular Components Limited, our policies serve as the compass for our 
              business conduct. We are committed to maintaining the highest 
              standards of transparency, ensuring that every operation 
              aligns with our core values of integrity and ethical responsibility.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                <div className="w-10 h-10 bg-[#EBF3FC] dark:bg-[#0D2440]/40 rounded-xl flex items-center justify-center text-[#2E5E99]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-0.5">Integrity</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Core Principle</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                <div className="w-10 h-10 bg-[#EBF3FC] dark:bg-[#0D2440]/40 rounded-xl flex items-center justify-center text-[#2E5E99]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-0.5">Fairness</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ethical Standard</p>
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
            <div className="p-8 md:p-10 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center text-[#2E5E99] mb-6">
                <ScrollText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-6">
                Why Policies Matter
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3.5 items-start p-3.5 bg-white dark:bg-charcoal rounded-xl border border-[#7BA4D0]/20">
                  <div className="w-2 h-2 bg-[#2E5E99] rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ensuring consistency in decision-making across all global operations.
                  </p>
                </li>
                <li className="flex gap-3.5 items-start p-3.5 bg-white dark:bg-charcoal rounded-xl border border-[#7BA4D0]/20">
                  <div className="w-2 h-2 bg-[#2E5E99] rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Protecting the rights and interests of our shareholders, employees, and partners.
                  </p>
                </li>
                <li className="flex gap-3.5 items-start p-3.5 bg-white dark:bg-charcoal rounded-xl border border-[#7BA4D0]/20">
                  <div className="w-2 h-2 bg-[#2E5E99] rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Maintaining compliance with international statutory and regulatory requirements.
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
