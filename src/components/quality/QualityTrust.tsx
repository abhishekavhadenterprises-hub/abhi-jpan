"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Heart, Zap, History } from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Reliable Products",
    desc: "Components that withstand extreme pressures and thermal cycles without failure.",
    icon: ShieldCheck,
  },
  {
    title: "Enduring Performance",
    desc: "Engineered for longevity, drastically reducing maintenance costs and downtime.",
    icon: History,
  },
  {
    title: "Absolute Precision",
    desc: "Meeting exact dimensional requirements for seamless system integration.",
    icon: Zap,
  },
  {
    title: "Customer Trust",
    desc: "A reputation built over 28 years of delivering uncompromising quality on time.",
    icon: Heart,
  }
];

export function QualityTrust() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < pillars.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 lg:py-32 bg-white dark:bg-black overflow-hidden relative transition-colors"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-20 gap-8 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.1] overflow-visible">
              Why Our Standards <br />
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Impact Your Scale</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm"
          >
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base leading-relaxed font-normal">
              Beyond certifications, our commitment to quality translates into 
              tangible industrial stability for your operations.
            </p>
          </motion.div>
        </div>

        {/* Pillars Cards */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 sm:pt-4 sm:pb-4 px-1 sm:px-0 gap-5 lg:gap-6 sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {pillars.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center"
              >
                <div className="relative h-full bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl p-7 sm:p-8 transition-all duration-500 hover:border-[#2E5E99]/50 hover:-translate-y-2 overflow-hidden flex flex-col justify-between">
                  
                  {/* Index Number */}
                  <div className="absolute top-6 right-6 text-4xl font-black text-[#7BA4D0]/20 dark:text-white/5 group-hover:text-[#2E5E99]/30 transition-colors duration-500 italic font-heading">
                    0{idx + 1}
                  </div>

                  {/* Icon Box */}
                  <div className="w-14 h-14 mb-6 sm:mb-8 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#0D2440] group-hover:text-white text-[#2E5E99] relative z-10 shrink-0">
                    <p.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                  </div>

                  <div className="space-y-2.5 relative z-10 flex-grow">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight group-hover:text-[#2E5E99] transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#2E5E99] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-6 z-10">
            {pillars.map((_, i) => (
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
                aria-label={`Go to pillar card ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Technical Validation Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:bg-charcoal/50 border border-[#7BA4D0]/35 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 shrink-0 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center border border-[#7BA4D0]/30 text-[#2E5E99]">
                <ShieldCheck className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <p className="text-xs sm:text-sm md:text-base font-normal text-[#0D2440] dark:text-white max-w-xl leading-relaxed">
                Our quality management systems are independently audited and certified to <span className="text-[#2E5E99] font-bold">ISO 9001:2015</span> standards for global reliability.
              </p>
            </div>
            <button 
              onClick={() => {
                const el = document.getElementById('certifications');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="shrink-0 px-8 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all duration-300 whitespace-nowrap"
            >
              View Certifications
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

