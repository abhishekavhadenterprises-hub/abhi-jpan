"use client";

import React, { useRef, useState } from "react";
import { ShieldAlert, Leaf, CheckCircle, Scale, Sun } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const standards = [
  {
    title: "Safety Compliance",
    desc: "Adherence to OHSAS standards, ensuring a zero-incident manufacturing environment across all plants.",
    icon: ShieldAlert
  },
  {
    title: "Environmental Responsibility",
    desc: "Strict monitoring of carbon footprint and sustainable waste management as per global norms.",
    pointer: "Solar power plant installed in A2 manufacturing facility for clean, green energy operations.",
    icon: Leaf
  },
  {
    title: "Regulatory Adherence",
    desc: "Full compliance with local and international manufacturing, environmental, and export laws.",
    icon: Scale
  },
  {
    title: "Ethical Sourcing",
    desc: "Partnering only with raw material suppliers who meet our rigid quality and ethics criteria.",
    icon: CheckCircle
  }
];

export function QualityCompliance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < standards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 bg-white dark:bg-black overflow-hidden transition-colors"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Header Side (Sticky) */}
          <motion.div 
            className="w-full lg:w-1/3 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 md:mb-8 leading-[1.1] overflow-visible">
              Compliance & <br/>
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Industry Standards</span>
            </h2>
            
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg leading-relaxed font-normal">
              We operate at the intersection of technical excellence and 
              regulatory responsibility, ensuring that our products and 
              processes respect global safety and environmental protocols.
            </p>
          </motion.div>

          {/* Compliance Cards */}
          <div className="w-full lg:w-2/3 flex flex-col justify-between">
            <motion.div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 sm:pt-4 sm:pb-4 px-1 sm:px-0 gap-5 lg:gap-6 sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {standards.map((s, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="group relative p-7 sm:p-8 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 rounded-3xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center flex flex-col justify-between"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center mb-6 text-[#2E5E99] group-hover:bg-[#0D2440] group-hover:text-white transition-all duration-500 shrink-0">
                      <s.icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] transition-colors duration-300">
                      {s.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal flex-grow mb-3">
                      {s.desc}
                    </p>

                    {s.pointer && (
                      <div className="mt-4 pt-3.5 border-t border-[#7BA4D0]/20 flex items-start gap-2.5 text-xs font-semibold text-[#2E5E99]">
                        <Sun className="w-4 h-4 text-[#2E5E99] shrink-0 mt-0.5 animate-pulse" />
                        <span className="leading-snug">{s.pointer}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex sm:hidden items-center justify-center gap-2 mt-6 z-10">
              {standards.map((_, i) => (
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
                  aria-label={`Go to compliance card ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

