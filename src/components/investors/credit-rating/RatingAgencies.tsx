"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Globe, ArrowUpRight, Award, ShieldCheck } from "lucide-react";

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
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < agencies.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
            Independent Accreditation
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
            Accredited <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
              Rating Institutions
            </span>
          </h2>
        </motion.div>

        {/* Agency Vault Cards */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-4 md:py-0 px-1 md:px-0 gap-6 md:gap-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {agencies.map((agency, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 sm:p-9 bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl hover:-translate-y-1.5 transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25 text-[#2E5E99] dark:text-[#7BA4D0] text-[10px] font-heading font-black uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      SEBI Registered
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                    {agency.name}
                  </h4>
                  <p className="text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider mb-4">
                    {agency.type}
                  </p>
                  <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal mb-8">
                    &ldquo;{agency.description}&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider group/btn cursor-pointer">
                    Institutional Profile
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-[#2E5E99] dark:text-[#7BA4D0]" />
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#7BA4D0]/40 group-hover:bg-[#2E5E99] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {agencies.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (cardsRef.current) {
                    cardsRef.current.scrollTo({
                      left: i * cardsRef.current.clientWidth,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeIndex === i ? "w-8 bg-[#2E5E99]" : "w-2 bg-[#7BA4D0]/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
