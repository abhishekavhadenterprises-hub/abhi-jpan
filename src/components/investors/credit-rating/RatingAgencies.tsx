"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Globe, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section className="py-16 md:py-24 bg-white dark:bg-black border-b border-[#7BA4D0]/20 overflow-hidden relative">
      {/* Background Soft Glow */}

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight">
            Accredited <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-medium inline-block pr-1 pb-1">
              Rating Institutions
            </span>
          </h2>
        </motion.div>

        {/* Agency Cards */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {agencies.map((agency, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-7 sm:p-9 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-1.5 transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center rounded-2xl text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <Globe className="w-5 h-5 text-[#7BA4D0]/40 group-hover:text-[#2E5E99] transition-colors" />
                  </div>

                  <h4 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] transition-colors">
                    {agency.name}
                  </h4>
                  <p className="text-xs font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider mb-4">
                    {agency.type}
                  </p>
                  <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal mb-8">
                    &ldquo;{agency.description}&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-[#7BA4D0]/20">
                  <span className="flex items-center gap-2 text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider group/btn cursor-pointer">
                    Institutional Profile
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-[#2E5E99] dark:text-[#7BA4D0]" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-5 z-10">
            {agencies.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (cardsRef.current && cardsRef.current.children[i]) {
                    cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-7 bg-[#2E5E99]" : "w-2 bg-[#7BA4D0]/30"
                )}
                aria-label={`Go to agency card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
