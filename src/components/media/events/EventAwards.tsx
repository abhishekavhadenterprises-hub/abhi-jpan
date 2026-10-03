"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Trophy, Award, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const awards = [
  {
    title: "Best Exhibition Booth",
    event: "ACREX India 2023",
    icon: Trophy
  },
  {
    title: "Excellence in Precision",
    event: "Automotive Expo 2022",
    icon: Award
  },
  {
    title: "Innovation in Cooling",
    event: "Global HVAC Awards",
    icon: Star
  }
];

export function EventAwards() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < awards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] overflow-visible">
            Our{" "}
            <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
              Achievements
            </span>
          </h2>
        </div>

        {/* Award Cards: Single visible card at a time with horizontal scroll on mobile (< md), 3-column grid on desktop (>= md) */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {awards.map((award, idx) => (
              <motion.div 
                variants={itemVariants}
                key={idx} 
                className="group relative bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all duration-500 flex flex-col items-center text-center justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                {/* Header Badge */}
                <div className="w-full flex items-center justify-end mb-6 sm:mb-8">
                  <ShieldCheck className="w-4 h-4 text-[#2E5E99]" />
                </div>

                {/* Glowing Icon Box */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center text-[#2E5E99] mb-6 sm:mb-8 group-hover:scale-105 transition-all duration-300 shrink-0">
                  <award.icon className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                
                {/* Text Content */}
                <div className="space-y-2 sm:space-y-3 mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors duration-300">
                    {award.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#2E5E99] uppercase tracking-wider">
                    {award.event}
                  </p>
                </div>

                {/* Bottom Border Accent */}
                <div className="w-full pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#0D2440]/50 dark:text-silver/50 uppercase tracking-widest">
                    Recognized Quality
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {awards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (cardsRef.current && cardsRef.current.children[i]) {
                    cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
                )}
                aria-label={`Go to award card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
