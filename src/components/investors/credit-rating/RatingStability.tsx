"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const stabilityMetrics = [
  {
    icon: ShieldCheck,
    title: "Capital Stability",
    description: "Robust capital structure with a focus on long-term debt sustainability and liquidity management."
  },
  {
    icon: TrendingUp,
    title: "Growth Performance",
    description: "Consistent revenue trajectories supported by precision tubing demand and operational excellence."
  },
  {
    icon: ShieldAlert,
    title: "Risk Mitigation",
    description: "Institutional framework for identifying and neutralizing fiscal and operational risks."
  }
];

export function RatingStability() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < stabilityMetrics.length && newIndex !== activeIndex) {
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
          className="max-w-3xl mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight mb-6">
            Strength Through <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-medium inline-block pr-1 pb-1">
              Strategic Discipline
            </span>
          </h2>
          <p className="text-[#0D2440]/70 dark:text-white/70 text-base sm:text-lg leading-relaxed font-normal">
            Our creditworthiness is underpinned by a rigid commitment to 
            financial discipline, ensuring that J Pan Tubular Components Limited remains a 
            resilient and growth-oriented entity in the industrial sector.
          </p>
        </motion.div>

        {/* Stability Cards */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {stabilityMetrics.map((metric, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 sm:p-9 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-1.5 transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center mb-6 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0">
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-3 group-hover:text-[#2E5E99] transition-colors">
                    {metric.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                    {metric.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-wider">
                    Verified Metric
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#7BA4D0]/40 group-hover:bg-[#2E5E99] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-5 z-10">
            {stabilityMetrics.map((_, i) => (
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
                aria-label={`Go to metric card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
