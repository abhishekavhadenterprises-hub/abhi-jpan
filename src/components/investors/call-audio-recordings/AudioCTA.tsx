"use client";

import React from "react";
import { Mail, ArrowRight, MessageSquare, Headphones, Radio, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AudioCTA() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 p-5 sm:p-10 md:p-14 lg:p-20 overflow-hidden"
        >
          {/* Subtle Ambient Accents */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                Communication <br />
                <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                  Support
                </span>
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-10 leading-relaxed max-w-xl">
                Stay informed with our latest investor communications. For 
                clarifications regarding analyst meets, earnings calls, or 
                audio accessibility, connect with our dedicated IR desk.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a 
                  href="/contact"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 group whitespace-nowrap min-h-[44px]"
                >
                  <span>Contact Investor Desk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/30 rounded-xl text-[#0D2440] dark:text-white text-xs font-bold uppercase tracking-wider min-h-[44px]">
                  <ShieldCheck className="w-4 h-4 text-[#2E5E99] shrink-0" />
                  <span>Verified Hub</span>
                </div>
              </div>
            </div>

            {/* Support Cards (Stacked vertically on mobile, 2-column grid on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 w-full">
              <div className="p-5 sm:p-7 md:p-8 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all group/card w-full">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center mb-4 sm:mb-5 text-[#2E5E99]">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-1 sm:mb-1.5">
                  IR Inquiries
                </h4>
                <p className="text-muted-foreground text-xs font-medium break-all">enquiry@jpantubular.com</p>
              </div>

              <div className="p-5 sm:p-7 md:p-8 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all group/card w-full">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center mb-4 sm:mb-5 text-[#2E5E99]">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-1 sm:mb-1.5">
                  Call Support
                </h4>
                <p className="text-muted-foreground text-xs font-medium">+91-120-2560586</p>
              </div>

              <div className="sm:col-span-2 p-5 sm:p-6 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl flex items-center justify-between w-full">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center rounded-xl shrink-0 text-[#2E5E99]">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-0.5">
                      Market Disclosure
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Access our primary nodal officer for statutory audio disclosure queries.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[#7BA4D0]" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
