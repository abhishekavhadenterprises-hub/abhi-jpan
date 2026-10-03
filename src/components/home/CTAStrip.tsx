"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, FileCheck, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export function CTAStrip() {
  return (
    <section className="relative py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#091A2E] text-[#0D2440] dark:text-white transition-colors duration-500 overflow-hidden border-b border-slate-200 dark:border-white/[0.08]">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#2E5E99]/10 to-transparent dark:from-[#2E5E99]/15 blur-3xl absolute top-[-20%] left-[-10%]"
        />
      </div>

      <div className="container-custom relative z-10 w-full">
        {/* Pure Architectural Glass Box Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.5rem] bg-white dark:bg-slate-950/60 p-8 sm:p-14 md:p-16 overflow-hidden border border-slate-200 dark:border-white/[0.12] shadow-xl hover:shadow-2xl transition-shadow duration-500 backdrop-blur-2xl"
        >
          {/* Specular Glass Top Sheen */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#2E5E99]/20 dark:via-white/40 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,94,153,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

          {/* Grid Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Authoritative Editorial Heading & Subtext */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-[#2E5E99] dark:text-cyan-400 uppercase mb-5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-cyan-400 animate-pulse shadow-[0_0_6px_#2E5E99] dark:shadow-[0_0_6px_#38bdf8]" />
                <span className="font-bold">08 // COLLABORATION & TOOLING FEASIBILITY</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-heading font-black tracking-tighter leading-[0.95] text-[#0D2440] dark:text-white uppercase mb-6"
              >
                Ready to scale <br />
                <span className="font-serif italic font-light text-slate-500 dark:text-slate-400 tracking-tight">
                  precision manufacturing?
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-xl pl-6 border-l-2 border-[#2E5E99]/20 dark:border-white/10"
              >
                Connect directly with our manufacturing engineering team for CAD reviews, tooling feasibility,
                alloy specifications, and high-throughput production delivery schedules.
              </motion.p>
            </div>

            {/* Right Column: Pill Actions Suite */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-stretch gap-5 justify-center"
            >
              {/* Primary Action Button */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-between gap-4 px-8 py-5 bg-[#0D2440] dark:bg-white hover:bg-[#2E5E99] dark:hover:bg-slate-100 text-white dark:text-slate-950 font-heading font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 active:scale-95 shadow-[0_8px_30px_rgba(13,36,64,0.15)] dark:shadow-[0_0_24px_rgba(255,255,255,0.25)] overflow-hidden"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <FileCheck className="w-5 h-5 text-white dark:text-slate-950" />
                  <span>Submit Engineering RFQ</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-slate-950/10 flex items-center justify-center relative z-10 transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-4 h-4 text-white dark:text-slate-950" />
                </div>
              </Link>

              {/* Secondary Direct Phone Call Button */}
              <Link
                href="tel:+911202560586"
                className="group inline-flex items-center justify-between gap-4 px-8 py-5 bg-slate-50 dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/15 text-[#0D2440] dark:text-white font-heading font-bold dark:font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-[#2E5E99] dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>+91 120 2560586</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0D2440] dark:group-hover:text-white transition-all group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTAStrip;
