"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, FileCheck, PhoneCall } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

export function ProductCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={containerRef}
      className="relative py-10 sm:py-16 md:py-20 bg-white dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-t border-[#7BA4D0]/20 dark:border-white/10 overflow-visible"
    >
      <div className="container-custom relative z-10 w-full px-4 sm:px-6">
        {/* Short, Crisp & Summarised Elevated Card (Expanded Horizontal Width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-[#0D2440] border border-[#7BA4D0]/30 dark:border-white/15 p-6 sm:p-10 md:py-12 md:px-14 text-center max-w-5xl mx-auto transition-all duration-300 shadow-xl shadow-[#2E5E99]/5 dark:shadow-black/30"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Crisp & Punchy Headline */}
            <ScrollWipeHeading 
              as="h2" 
              className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0D2440] dark:text-white leading-[1.15] sm:leading-tight"
            >
              Ready to engineer precision <br className="hidden sm:inline" />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-serif italic">
                for your critical assemblies?
              </span>
            </ScrollWipeHeading>

            {/* Short 1-Line Subtext */}
            <p className="text-xs sm:text-sm md:text-base text-[#0D2440]/75 dark:text-white/75 font-light leading-relaxed max-w-xl mx-auto">
              Connect with our technical team for tooling feasibility reviews, prototype iteration, and direct RFQs.
            </p>

            {/* Compact Action Suite */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 pt-4 w-full">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 bg-[#2E5E99] hover:bg-[#0D2440] text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-300 active:scale-95 w-full sm:w-auto cursor-pointer shadow-md shadow-[#2E5E99]/20"
              >
                <FileCheck className="w-4 h-4 text-[#7BA4D0] shrink-0" />
                <span className="truncate">Submit Engineering RFQ</span>
                <ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </Link>

              <Link
                href="tel:+911202560586"
                className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-[#7BA4D0]/30 dark:border-white/20 text-[#0D2440] dark:text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                <span className="truncate">+91 120 2560586</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
