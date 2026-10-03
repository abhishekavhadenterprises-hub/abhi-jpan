"use client";

import React, { useRef, useState } from "react";
import { Wallet, GraduationCap, Heart, Clock, ShieldPlus } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Wallet,
    title: "Competitive Incentives",
    description: "Merit-based compensation packages with performance bonuses and corporate incentives."
  },
  {
    icon: GraduationCap,
    title: "Professional Training",
    description: "Paid access to specialized industrial certifications and technical workshops."
  },
  {
    icon: Heart,
    title: "Comprehensive Care",
    description: "Health insurance and wellness programs for employees and their families."
  },
  {
    icon: Clock,
    title: "Flexible Frameworks",
    description: "Adaptive work schedules and work-life balance initiatives for sustained productivity."
  }
];

export function CareersBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-28 bg-gradient-to-b from-white via-slate-50/60 to-white dark:from-[#070b14] dark:via-[#0c1424] dark:to-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.025] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.12] mb-6 tracking-tight overflow-visible">
              <span className="inline-block">Institutional</span> <br />
              <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light">
                Support Ecosystem
              </span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg leading-relaxed max-w-xl">
              We invest in our people by providing a comprehensive ecosystem 
              of benefits that support professional excellence and personal 
              well-being.
            </p>
          </motion.div>
        </div>

        <motion.div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 no-scrollbar pb-6 sm:pb-0"
        >
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-[#0c1527] border border-slate-200/80 dark:border-white/10 p-7 lg:p-8 rounded-3xl transition-all duration-300 hover:border-[#2E5E99]/50 overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink flex flex-col justify-between"
            >
              {/* Top hairline accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E5E99] to-[#7BA4D0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#7BA4D0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-13 h-13 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/10 border border-[#2E5E99]/20 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] mb-6 transition-all duration-300 group-hover:bg-[#2E5E99] group-hover:text-white">
                  <benefit.icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                
                <h4 className="text-lg font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                  {benefit.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed flex-grow">
                  {benefit.description}
                </p>
                
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center gap-2.5 text-xs font-semibold text-[#2E5E99] dark:text-[#7BA4D0]">
                   <ShieldPlus className="w-4 h-4" strokeWidth={1.75} />
                   <span className="text-[10px] uppercase tracking-wider">Verified Benefit</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dot Indicators for Mobile Scroll */}
        {benefits.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 sm:hidden">
            {benefits.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-[#2E5E99] dark:bg-[#7BA4D0] w-6" : "bg-slate-300 dark:bg-white/20"
                )}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * scrollContainerRef.current.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
