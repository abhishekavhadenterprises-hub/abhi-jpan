"use client";

import React, { useRef, useState } from "react";
import { FileText, ArrowRight, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const highlightedDocs = [
  {
    num: "01",
    title: "Shareholders Agreement (SHA)",
    type: "Agreement",
    date: "Aug 15, 2024",
    description: "Primary governance framework defining the relationship, board representation, and voting rights between key institutional stakeholders."
  },
  {
    num: "02",
    title: "Technology Transfer Contract",
    type: "Contract",
    date: "Nov 02, 2024",
    description: "Strategic material contract regarding precision tubing manufacturing IP, CNC automation systems, and technical collaboration."
  }
];

export function MaterialHighlights() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < highlightedDocs.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight">
              Key Material <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Contracts
              </span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#0D2440]/70 dark:text-white/65 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-md"
          >
            Significant agreements and governance contracts defining shareholder alignment, 
            technology transfer, and long-term operating commitments.
          </motion.p>
        </div>

        {/* 2-Card Asymmetric Bento Grid */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-4 md:py-0 px-1 md:px-0 gap-5 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {highlightedDocs.map((doc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl hover:-translate-y-1.5 transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
              >
                {/* Giant Numeric Watermark */}
                <div className="absolute top-4 right-6 text-5xl sm:text-7xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/20 transition-colors duration-500 select-none pointer-events-none">
                  {doc.num}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <FileText className="w-6 sm:w-7 h-6 sm:h-7" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] px-2.5 sm:px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25">
                        {doc.type}
                      </span>
                      <span className="text-xs font-heading font-bold text-[#0D2440]/60 dark:text-white/60">
                        {doc.date}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-2.5 sm:mb-3 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                    {doc.description}
                  </p>
                </div>
                
                <div className="relative z-10 mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-heading font-black text-[#0D2440]/65 dark:text-white/60 uppercase tracking-widest">
                    Board Approved Contract
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-1.5 mt-5 z-10">
            {highlightedDocs.map((_, i) => (
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
                className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center focus:outline-none"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`h-1.5 transition-all duration-300 rounded-full block ${
                    activeIndex === i ? "w-8 bg-[#2E5E99]" : "w-2 bg-[#7BA4D0]/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
