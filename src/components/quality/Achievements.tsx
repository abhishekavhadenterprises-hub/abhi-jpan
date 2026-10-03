"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Trophy, Award, Star, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

const achievements = [
  {
    title: "National Excellence Award",
    organization: "MSME India",
    year: "2022",
    description: "Recognized for outstanding contribution to the manufacturing sector and exceptional sustainable practices.",
    icon: Trophy,
  },
  {
    title: "Best Supplier Award",
    organization: "Daikin Global",
    year: "2021",
    description: "Awarded for maintaining a 99.98% quality pass rate and consistent on-time delivery across all international shipments.",
    icon: Award,
  },
  {
    title: "Zero Defect Partner",
    organization: "Johnson Controls",
    year: "2023",
    description: "Honored with the highest quality rating for precision copper and brass assemblies in commercial HVAC systems.",
    icon: Star,
  },
  {
    title: "Export Excellence",
    organization: "Engineering Export Council",
    year: "2024",
    description: "Commended for scaling global outreach to 20+ countries and elevating Indian engineering on the world stage.",
    icon: Medal,
  }
];

export function Achievements() {
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
    if (newIndex >= 0 && newIndex < achievements.length && newIndex !== activeIndex) {
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
      className="py-16 md:py-24 bg-white dark:bg-black overflow-hidden relative transition-colors"
    >
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.1] mb-6 overflow-visible"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Achievements</span>
          </motion.h2>
          
          <motion.p 
            className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our relentless pursuit of quality has earned us recognition from industry leaders and global councils alike.
          </motion.p>
        </div>

        {/* Achievement Cards */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-5 lg:gap-8 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl p-7 sm:p-9 hover:border-[#2E5E99]/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row gap-6 md:gap-7 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center justify-between"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] group-hover:bg-[#0D2440] group-hover:text-white transition-all duration-500">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                  </div>
                </div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2.5 gap-2 sm:gap-3">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-[#2E5E99] bg-[#EBF3FC] dark:bg-white/5 border border-[#7BA4D0]/30 px-3 py-1 rounded-full w-max whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>
                  
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E5E99] mb-3">
                    {item.organization}
                  </h4>
                  
                  <p className="text-xs sm:text-sm md:text-base text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {achievements.map((_, i) => (
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
                aria-label={`Go to achievement card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

