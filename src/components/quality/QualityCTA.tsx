"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, FileCheck, PhoneCall } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

export function QualityCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 bg-white dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-t border-[#7BA4D0]/20 dark:border-white/10"
    >
      <div className="container-custom relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative max-w-4xl mx-auto rounded-3xl p-0.5"
        >
          {/* Glowing Border Hover Aura */}
          <div className="absolute -inset-0.5 rounded-[1.75rem] bg-gradient-to-r from-[#2E5E99]/40 via-[#7BA4D0]/30 to-[#2E5E99]/40 opacity-50 group-hover:opacity-100 blur-lg transition duration-700 pointer-events-none" />

          <div className="relative rounded-3xl bg-white/90 dark:bg-[#0B1522]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 p-8 sm:p-14 text-center shadow-[0_10px_40px_rgba(46,94,153,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mx-auto mb-6 text-[#2E5E99] dark:text-[#7BA4D0]">
              <FileCheck className="w-8 h-8" />
            </div>

            <ScrollWipeHeading
              as="h2"
              className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-[#0D2440] dark:text-white block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              Ensure Zero-Defect Quality
            </ScrollWipeHeading>

            <div className="text-xl sm:text-2xl text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
              Across Every Mission-Critical Assembly
            </div>

            <p className="text-sm sm:text-base text-[#0D2440]/75 dark:text-white/75 font-normal leading-relaxed pt-2">
              Partner with an IATF 16949 certified manufacturer that prioritizes precision at every step. Download our quality manual or request an on-site technical audit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-6">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#2E5E99] hover:bg-[#0D2440] text-white font-semibold text-sm rounded-full transition-all duration-300 active:scale-95 w-full sm:w-auto shadow-sm"
              >
                <span>Request Quality Audit</span>
                <ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="tel:+911202560586"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-[#7BA4D0]/30 dark:border-white/20 text-[#0D2440] dark:text-white font-semibold text-sm rounded-full transition-all duration-300 w-full sm:w-auto"
              >
                <PhoneCall className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                <span>+91 120 2560586</span>
              </Link>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
