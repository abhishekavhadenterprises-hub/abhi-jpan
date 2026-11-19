"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, ArrowUpRight, ShieldCheck } from "lucide-react";

const agencies = [
  {
    name: "ICRA Limited",
    type: "Primary Agency",
    description: "An independent and professional investment information and credit rating agency, a subsidiary of Moody's Investors Service."
  },
  {
    name: "CRISIL",
    type: "Secondary Agency",
    description: "An agile and innovative, global analytical company providing ratings, data, and research."
  },
  {
    name: "CARE Ratings",
    type: "Institutional Partner",
    description: "One of the leading credit rating agencies in India, providing credit rating and advisory services."
  }
];

export function RatingAgencies() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight">
            Accredited <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
              Rating Institutions
            </span>
          </h2>
        </motion.div>

        {/* Agency Vault Cards (Stacked vertically on mobile, 3 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 w-full">
          {agencies.map((agency, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 sm:p-8 md:p-9 bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl hover:-translate-y-1.5 transition-all duration-300 w-full flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                    <Building2 className="w-6 sm:w-7 h-6 sm:h-7" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25 text-[#2E5E99] dark:text-[#7BA4D0] text-[10px] font-heading font-black uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    SEBI Registered
                  </div>
                </div>

                <h4 className="text-lg sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-1.5 sm:mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                  {agency.name}
                </h4>
                <p className="text-[11px] sm:text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider mb-3 sm:mb-4">
                  {agency.type}
                </p>
                <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal mb-6 sm:mb-8">
                  &ldquo;{agency.description}&rdquo;
                </p>
              </div>

              <div className="pt-4 sm:pt-5 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider group/btn cursor-pointer">
                  Institutional Profile
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-[#2E5E99] dark:text-[#7BA4D0]" />
                </span>
                <div className="w-2 h-2 rounded-full bg-[#7BA4D0]/40 group-hover:bg-[#2E5E99] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
