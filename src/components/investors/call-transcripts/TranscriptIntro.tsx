"use client";

import React from "react";
import { BookOpen, ShieldCheck, CheckCircle2, FileSearch } from "lucide-react";
import { motion } from "framer-motion";

export function TranscriptIntro() {
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
              A Dialogue <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Preserved in Print
              </span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-10 leading-relaxed max-w-xl">
              Our call transcripts serve as the formal, authorized record 
              of institutional engagement. These documents capture the 
              substance of every Q&A session, ensuring that board-level 
              commitments and strategic projections are accessible for 
              long-term investor scrutiny.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              <div className="p-4 sm:p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-xl sm:rounded-2xl shrink-0 border border-[#7BA4D0]/30 mb-3 sm:mb-4 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1.5 sm:mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Authenticated
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Verified by corporate secretarial teams for factual accuracy.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-xl sm:rounded-2xl shrink-0 border border-[#7BA4D0]/30 mb-3 sm:mb-4 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                  <FileSearch className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1.5 sm:mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Searchable Data
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Digital transcripts optimized for keyword and insight discovery.
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
            <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F8FAFC] to-[#EDF4FD] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 relative overflow-hidden">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white dark:bg-charcoal/80 flex items-center justify-center text-[#2E5E99] mb-6 sm:mb-8 border border-[#7BA4D0]/30">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 sm:mb-8 tracking-tight">
                Documentation Standards
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20 flex gap-3.5 sm:gap-4 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5E99] shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "We provide verbatim transcripts of every analyst meet and 
                    earnings call within 5 working days of the event."
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/20 flex gap-3.5 sm:gap-4 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5E99] shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "Every document is cross-verified against the original audio 
                    to maintain absolute institutional integrity."
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
