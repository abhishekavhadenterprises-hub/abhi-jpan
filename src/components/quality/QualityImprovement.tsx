"use client";

import React, { useRef, useState } from "react";
import { GraduationCap, Lightbulb, TrendingUp, Cpu } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const initiatives = [
  {
    title: "Skilled Workforce",
    desc: "Continuous training programs for our engineering and quality teams to stay ahead of technical trends.",
    icon: GraduationCap
  },
  {
    title: "R&D Innovation",
    desc: "Investing in new alloy testing and product design to meet the evolving needs of the thermal industry.",
    icon: Lightbulb
  },
  {
    title: "Process Automation",
    desc: "Constant upgrades to our CNC and brazing lines for higher consistency and lower defect rates.",
    icon: Cpu
  },
  {
    title: "Performance Analytics",
    desc: "Data-driven approach to monitoring production quality and identifying areas for improvement.",
    icon: TrendingUp
  }
];

export function QualityImprovement() {
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
    if (newIndex >= 0 && newIndex < initiatives.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-white dark:bg-black overflow-hidden transition-colors"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 overflow-visible leading-tight"
          >
            The Path of <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Continuous Growth</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Quality is not a destination but a continuous journey of 
            improvement, innovation, and technical evolution.
          </motion.p>
        </div>

        {/* Initiative Cards */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {initiatives.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="group relative bg-[#F8FAFC] dark:bg-charcoal/40 p-7 sm:p-8 rounded-3xl border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 hover:-translate-y-2 transition-all duration-500 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-0 bg-[#2E5E99] group-hover:h-full transition-all duration-500 rounded-l-3xl" />
                
                <div>
                  <div className="w-14 h-14 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-[#0D2440] group-hover:text-white transition-all duration-500 shrink-0 text-[#2E5E99]">
                    <item.icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {initiatives.map((_, i) => (
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
                aria-label={`Go to initiative card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

