"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { Trophy, Award, Star, Medal, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const achievements = [
  {
    index: "01",
    title: "National Excellence Award",
    organization: "MSME India",
    year: "2022",
    description: "Recognized for outstanding contribution to the manufacturing sector and exceptional sustainable practices.",
    icon: Trophy,
  },
  {
    index: "02",
    title: "Best Supplier Award",
    organization: "Daikin Global",
    year: "2021",
    description: "Awarded for maintaining a 99.98% quality pass rate and consistent on-time delivery across all international shipments.",
    icon: Award,
  },
  {
    index: "03",
    title: "Zero Defect Partner",
    organization: "Johnson Controls",
    year: "2023",
    description: "Honored with the highest quality rating for precision copper and brass assemblies in commercial HVAC systems.",
    icon: Star,
  },
  {
    index: "04",
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

  // Section Transition Reveal
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 bg-white dark:bg-black overflow-hidden relative transition-colors"
    >
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
          <div className="mb-4 sm:mb-6 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              Our Institutional
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
              Honors & Achievements
            </div>
          </div>
          
          <motion.p 
            className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our relentless pursuit of quality has earned us recognition from industry leaders and global councils alike.
          </motion.p>
        </div>

        {/* Trophy Vault Monoliths: Straight Level 2x2 Bento Grid with Blur-to-Clear Reveal */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 px-1 md:px-0 gap-4 sm:gap-6 lg:gap-8 md:overflow-visible no-scrollbar w-full"
          >
            {achievements.map((item) => (
              <motion.div
                key={item.index}
                variants={itemVariants}
                whileHover={{ 
                  y: -6, 
                  transition: { duration: 0.25, ease: "easeOut" } 
                }}
                className="group relative bg-white/80 dark:bg-[#091A2E]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 transition-all duration-300 overflow-hidden flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/10 cursor-default"
              >
                {/* Background Gradient on Hover (#21 Background Tint Transition) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/10 via-[#7BA4D0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl" />

                <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-7 items-start mb-6">
                  {/* Icon Pod */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2 gap-1.5 sm:gap-3">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300 truncate">
                        {item.title}
                      </h3>
                      {/* Squircle Year Badge */}
                      <span className="text-xs sm:text-sm font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] bg-[#EBF3FC] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl w-max whitespace-nowrap shadow-xs shrink-0">
                        {item.year}
                      </span>
                    </div>
                    
                    <h4 className="text-[11px] sm:text-xs font-heading font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#2E5E99] dark:text-[#7BA4D0] mb-2 sm:mb-3 truncate">
                      {item.organization}
                    </h4>
                    
                    <p className="text-xs sm:text-sm md:text-base text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Marker */}
                <div className="pt-3.5 sm:pt-4 border-t border-[#7BA4D0]/20 dark:border-white/10 flex items-center justify-between text-xs font-semibold relative z-10 gap-2">
                  <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] truncate">
                    Verified Quality Distinction
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
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
                  "h-1.5 rounded-sm transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#0D2440] dark:bg-white" : "w-1.5 bg-[#7BA4D0]/40"
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
