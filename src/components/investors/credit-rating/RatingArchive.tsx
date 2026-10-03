"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, BarChart3, Clock, ExternalLink } from "lucide-react";
import { RatingDetailModal } from "./RatingDetailModal";
import { cn } from "@/lib/utils";

const ratingHistory = [
  {
    rating: "A+ / Stable",
    agency: "ICRA Limited",
    date: "Jan 12, 2025",
    outlook: "Stable",
    ref: "JP_RT_2025_01"
  },
  {
    rating: "A / Positive",
    agency: "ICRA Limited",
    date: "Feb 15, 2024",
    outlook: "Positive",
    ref: "JP_RT_2024_02"
  },
  {
    rating: "A / Stable",
    agency: "CARE Ratings",
    date: "Oct 10, 2023",
    outlook: "Stable",
    ref: "JP_RT_2023_10"
  },
  {
    rating: "A- / Stable",
    agency: "CRISIL",
    date: "May 22, 2022",
    outlook: "Stable",
    ref: "JP_RT_2022_05"
  }
];

export function RatingArchive() {
  const [selectedRating, setSelectedRating] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < ratingHistory.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black border-b border-[#7BA4D0]/20 overflow-hidden relative">
      {/* Background Soft Glow */}

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight">
              Rating <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-medium inline-block pr-1 pb-1">
                Historical Repository
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Rating History Cards */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-6 md:space-y-5 md:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {ratingHistory.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] dark:hover:bg-charcoal/60 transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#2E5E99] group-hover:scale-105 text-[#2E5E99] group-hover:text-white">
                  <BarChart3 className="w-7 h-7 md:w-8 md:h-8" />
                </div>

                {/* Content */}
                <div className="flex-grow space-y-2 text-center md:text-left w-full md:w-auto">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2.5 sm:gap-3 text-xs font-bold uppercase tracking-wider text-[#0D2440]/60 dark:text-white/60">
                    <span>{row.ref}</span>
                    <span className="w-1.5 h-1.5 bg-[#7BA4D0]/40 rounded-full" />
                    <span>{row.date}</span>
                    <span className="w-1.5 h-1.5 bg-[#7BA4D0]/40 rounded-full" />
                    <span className="text-[#2E5E99] dark:text-[#7BA4D0]">{row.agency}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors">
                    {row.rating}
                  </h3>
                </div>

                {/* Meta Info & Actions */}
                <div className="flex items-center gap-6 sm:gap-8 shrink-0 flex-col sm:flex-row w-full sm:w-auto justify-between">
                  <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#0D2440]/70 dark:text-white/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2E5E99]" />
                      <span>Processed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${row.outlook === 'Positive' ? 'bg-emerald-500' : 'bg-[#2E5E99]'}`} />
                      <span className={row.outlook === 'Positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#2E5E99] dark:text-[#7BA4D0]'}>
                        {row.outlook}
                      </span>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-[#7BA4D0]/25 hidden lg:block" />

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a 
                      href="/sample-report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 border border-[#7BA4D0]/30 rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-[#EBF3FC] hover:border-[#2E5E99]/50 transition-all text-[#0D2440] dark:text-white"
                    >
                      <ExternalLink className="w-4 h-4 opacity-70 text-[#2E5E99]" /> View
                    </a>
                    <a 
                      href="/sample-report.pdf"
                      download
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#0D2440] hover:bg-[#2E5E99] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all group/btn"
                    >
                      <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                      PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-5 z-10">
            {ratingHistory.map((_, i) => (
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
                aria-label={`Go to rating card ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex items-center justify-center gap-12">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#2E5E99]/60" />
            <span className="text-xs font-bold text-[#0D2440]/50 dark:text-white/50 uppercase tracking-[0.25em]">
              Historical Archive 2018-2025
            </span>
          </div>
        </div>
      </div>

      <RatingDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        ratingData={selectedRating} 
      />
    </section>
  );
}
