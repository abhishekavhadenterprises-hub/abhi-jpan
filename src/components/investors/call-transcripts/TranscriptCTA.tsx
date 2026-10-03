"use client";

import React from "react";
import { Mail, ArrowRight, MessageSquare, BookOpen, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function TranscriptCTA() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden"
        >
          {/* Subtle Ambient Accents */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
                Documentary <br />
                <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                  Assistance
                </span>
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed max-w-xl">
                Require historical transcripts or assistance with verbatim 
                records? Connect with our secretarial desk for comprehensive 
                investor communication support.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="/contact"
                  className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 group whitespace-nowrap"
                >
                  Contact IR Desk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/30 rounded-xl text-[#0D2440] dark:text-white text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#2E5E99] shrink-0" />
                  <span>Authorized Hub</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-7 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all group/card">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center mb-5 text-[#2E5E99]">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-1.5">
                  Document Requests
                </h4>
                <p className="text-muted-foreground text-xs font-medium">enquiry@jpantubular.com</p>
              </div>

              <div className="p-7 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all group/card">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center mb-5 text-[#2E5E99]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-1.5">
                  Archive Support
                </h4>
                <p className="text-muted-foreground text-xs font-medium">+91-120-2560586</p>
              </div>

              <div className="sm:col-span-2 p-6 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center rounded-xl text-[#2E5E99] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-0.5">
                      Direct Disclosure
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Access our primary nodal officer for official transcript clarification.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#7BA4D0]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
