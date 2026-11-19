"use client";

import React from "react";
import { Mail, Phone, ArrowRight, ShieldCheck, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function StatementOfDeviationsCTA() {

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-[#071321] overflow-hidden relative transition-colors">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-[40px] bg-gradient-to-br from-[#0D2440] via-[#102D50] to-[#163B66] text-white border border-[#7BA4D0]/30 p-5 sm:p-10 md:p-14 lg:p-20 overflow-hidden shadow-2xl shadow-[#2E5E99]/15"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#2E5E99]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-[#7BA4D0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-[1.12] tracking-tight">
                Connect with our <br />
                <span className="text-[#7BA4D0]">
                  Financial Desk
                </span>
              </h2>

              <p className="text-white/75 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed max-w-xl font-normal">
                For specific queries regarding our fund utilization, 
                quarterly statements of deviations, or fiscal 
                transparency standards, please contact our dedicated 
                investor relations team.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#0D2440] hover:bg-[#E7F0FA] font-heading font-bold text-xs uppercase tracking-[0.18em] rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5 group whitespace-nowrap shadow-lg min-h-[44px]"
                >
                  <span>Submit Fiscal Query</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                <div className="flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 border border-white/15 rounded-xl sm:rounded-2xl text-white min-h-[44px]">
                  <ShieldCheck className="w-5 h-5 text-[#7BA4D0] shrink-0" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider">Audit Cleared</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tactile White Pods */}
            <div className="lg:col-span-6 flex flex-col justify-between w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 w-full">
                <div className="p-4 sm:p-6 md:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl hover:-translate-y-1 transition-all duration-300 group/card w-full shadow-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mb-3 sm:mb-5 text-[#2E5E99] group-hover/card:scale-105 transition-transform">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1">
                    Shareholder Inquiries
                  </h4>
                  <a href="mailto:enquiry@jpantubular.com" className="text-[#2E5E99] text-xs sm:text-sm font-heading font-bold hover:underline block break-all">
                    enquiry@jpantubular.com
                  </a>
                </div>

                <div className="p-4 sm:p-6 md:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl hover:-translate-y-1 transition-all duration-300 group/card w-full shadow-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mb-3 sm:mb-5 text-[#2E5E99] group-hover/card:scale-105 transition-transform">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1">
                    Global Desk
                  </h4>
                  <p className="text-[#2E5E99] text-xs sm:text-sm font-heading font-bold">
                    +91-120-2560586
                  </p>
                </div>

                <div className="sm:col-span-2 p-4 sm:p-6 md:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl flex items-center justify-between w-full shadow-lg">
                  <div className="flex items-center gap-3 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center shrink-0 text-[#2E5E99]">
                      <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1">
                        Exchange Disclosures
                      </h4>
                      <p className="text-[#0D2440]/70 text-xs sm:text-sm leading-relaxed font-normal">
                        Certified submissions uploaded directly to National Stock Exchange and BSE portals.
                      </p>
                    </div>
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
