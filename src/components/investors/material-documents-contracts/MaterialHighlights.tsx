"use client";

import React, { useRef, useState } from "react";
import { FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const highlightedDocs = [
  {
    title: "Shareholders Agreement (SHA)",
    type: "Agreement",
    date: "Aug 15, 2024",
    description: "Primary governance framework defining the relationship, board representation, and voting rights between key institutional stakeholders."
  },
  {
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
    <section className="py-16 md:py-20 bg-white dark:bg-black border-b border-[#7BA4D0]/20 relative overflow-hidden">
      {/* Background Soft Glows */}

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight">
              Key Material{" "}
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-medium inline-block pr-1 pb-1">
                Contracts
              </span>
            </h2>
          </motion.div>

          <div className="text-xs font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">
            SEBI LODR Regulation 30 Mandate
          </div>
        </div>

        {/* 2 Cards */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {highlightedDocs.map((doc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 sm:p-9 rounded-3xl overflow-hidden hover:border-[#2E5E99]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white leading-snug group-hover:text-[#2E5E99] transition-colors">
                    {doc.title}
                  </h3>
                  
                  <p className="text-[#0D2440]/70 dark:text-white/70 text-sm sm:text-base leading-relaxed font-normal">
                    {doc.description}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 mt-6 border-t border-[#7BA4D0]/20 text-xs font-bold text-[#0D2440]/60 dark:text-white/60">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Dated: {doc.date}</span>
                  </div>
                  <a 
                    href="/sample-report.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors group/btn"
                  >
                    <span>Inspect Document</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-[#2E5E99] dark:text-[#7BA4D0]" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-5 z-10">
            {highlightedDocs.map((_, i) => (
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
                aria-label={`Go to contract card ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
