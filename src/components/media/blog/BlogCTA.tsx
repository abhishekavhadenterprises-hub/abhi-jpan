"use client";

import React from "react";
import { BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function BlogCTA() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-black relative overflow-visible">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl md:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440] dark:via-[#091829] dark:to-[#071321] border border-[#7BA4D0]/35 dark:border-[#2E5E99]/30 p-6 sm:p-10 md:p-14 lg:p-16 text-center max-w-5xl mx-auto overflow-hidden shadow-xl shadow-[#0D2440]/5 dark:shadow-none"
        >
          {/* Subtle Ambient Light Orbs */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#7BA4D0]/20 dark:bg-[#2E5E99]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#2E5E99]/15 dark:bg-[#7BA4D0]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top Icon Squircle Badge */}
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white dark:bg-[#070b14] border border-[#7BA4D0]/30 dark:border-[#2E5E99]/35 mb-4 sm:mb-6 mx-auto shadow-sm">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E5E99] dark:text-[#7BA4D0]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white tracking-tight mb-3 sm:mb-5 leading-[1.25] overflow-visible">
              Knowledge is{" "}
              <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0] inline-block pt-1 pb-2.5 pr-2">
                Power
              </span>
            </h2>

            <p className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-9 leading-relaxed font-normal">
              Stay ahead of industrial trends. Subscribe to our monthly technical
              digest for expert insights on precision engineering and manufacturing innovation.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 w-full"
            >
              <input
                type="email"
                placeholder="Your professional email"
                className="w-full sm:flex-grow bg-white dark:bg-[#070b14] border border-[#7BA4D0]/40 dark:border-[#2E5E99]/40 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] dark:focus:border-[#7BA4D0] text-xs sm:text-sm shadow-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-[#0D2440] dark:bg-[#2E5E99] hover:bg-[#2E5E99] dark:hover:bg-[#1A365D] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shadow-md shadow-[#0D2440]/15 group cursor-pointer"
              >
                <span>Join the Digest</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-5 sm:mt-7 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-[#0D2440]/60 dark:text-silver/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
              <span>Curated monthly updates. No spam. Unsubscribe at any time.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

