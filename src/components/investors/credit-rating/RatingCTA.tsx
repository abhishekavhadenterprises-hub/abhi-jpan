"use client";

import React from "react";
import { motion } from "framer-motion";
import { Headphones, ArrowRight, ShieldCheck, Mail, BarChart3 } from "lucide-react";
import Link from "next/link";

export function RatingCTA() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-[#071321] overflow-hidden relative transition-colors">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl sm:rounded-[40px] bg-gradient-to-br from-[#0D2440] via-[#102D50] to-[#163B66] text-white border border-[#7BA4D0]/30 p-5 sm:p-10 md:p-14 lg:p-20 relative overflow-hidden shadow-2xl shadow-[#2E5E99]/15"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#2E5E99]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-[#7BA4D0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-[1.12] tracking-tight">
                Stakeholder <br />
                <span className="text-[#7BA4D0]">
                  Financial Desk
                </span>
              </h2>

              <p className="text-white/75 text-sm sm:text-lg leading-relaxed max-w-xl font-normal">
                Require further clarification on our credit ratings or financial 
                stability? Connect with our investor relations desk for 
                authoritative assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center pt-2">
                <Link
                  href="/contact"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#0D2440] hover:bg-[#E7F0FA] font-heading font-bold text-xs uppercase tracking-[0.18em] rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5 group whitespace-nowrap shadow-lg min-h-[44px]"
                >
                  Contact IR Desk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 border border-white/15 rounded-xl sm:rounded-2xl text-white min-h-[44px]">
                  <BarChart3 className="w-5 h-5 text-[#7BA4D0] shrink-0" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider">Fiscal Transparency</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tactile White Pods (Stacked vertically on mobile, 2 columns on tablet/desktop) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
              <div className="p-5 sm:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl hover:-translate-y-1 transition-all duration-300 group/card w-full shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mb-5 text-[#2E5E99] group-hover/card:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1.5">
                  Investor Email
                </h4>
                <a href="mailto:enquiry@jpantubular.com" className="text-[#2E5E99] text-sm font-heading font-bold hover:underline block break-all">
                  enquiry@jpantubular.com
                </a>
              </div>

              <div className="p-5 sm:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl hover:-translate-y-1 transition-all duration-300 group/card w-full shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mb-5 text-[#2E5E99] group-hover/card:scale-105 transition-transform">
                  <Headphones className="w-6 h-6" />
                </div>
                <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1.5">
                  Direct Support
                </h4>
                <p className="text-[#2E5E99] text-sm font-heading font-bold">
                  +91-120-2560586
                </p>
              </div>

              <div className="sm:col-span-2 p-5 sm:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl flex items-center justify-between w-full shadow-lg">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center shrink-0 text-[#2E5E99]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1">
                      Verified Data
                    </h4>
                    <p className="text-[#1F4E79]/80 text-xs sm:text-sm leading-relaxed font-normal">
                      All credit rating data is independently verified by authorized agencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


