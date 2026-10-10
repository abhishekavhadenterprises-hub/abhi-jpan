"use client";

import React, { useRef, useState } from "react";
import { Wallet, GraduationCap, Heart, Clock, ShieldPlus } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const benefits = [
  {
    index: "01",
    icon: Wallet,
    title: "Competitive Incentives",
    description: "Merit-based compensation packages with performance bonuses and corporate incentives."
  },
  {
    index: "02",
    icon: GraduationCap,
    title: "Professional Training",
    description: "Paid access to specialized industrial certifications and technical workshops."
  },
  {
    index: "03",
    icon: Heart,
    title: "Comprehensive Care",
    description: "Health insurance and wellness programs for employees and their families."
  },
  {
    index: "04",
    icon: Clock,
    title: "Flexible Frameworks",
    description: "Adaptive work schedules and work-life balance initiatives for sustained productivity."
  }
];

export function CareersBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-white dark:bg-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Precision Radial Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#7BA4D0 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-6 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Institutional
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-5xl lg:text-6xl font-heading tracking-tight">
                Support Ecosystem
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg leading-relaxed max-w-xl">
              We invest in our people by providing a comprehensive ecosystem 
              of benefits that support professional excellence and personal 
              well-being.
            </p>
          </motion.div>
        </div>

        {/* 4-Column Investor Relations Card Matrix (No Gradient on Hover) */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 no-scrollbar pb-6 sm:pb-0"
        >
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={benefit.index}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-full shrink-0 snap-center sm:w-auto sm:shrink flex"
            >
              <div className="group relative bg-white dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-7 sm:p-8 rounded-3xl hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden flex flex-col justify-between w-full cursor-default">
                {/* Giant Numeric Watermark */}
                <div className="absolute top-4 right-6 text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/20 dark:group-hover:text-[#7BA4D0]/20 transition-colors duration-500 select-none pointer-events-none">
                  {benefit.index}
                </div>

                <div className="relative z-10 mb-8">
                  {/* Top Row: Icon Pod + Benefit Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-13 h-13 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <benefit.icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider px-3 py-1 rounded-xl bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25">
                      Benefit {benefit.index}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors mb-3">
                    {benefit.title}
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>

                {/* Card Footer Marker */}
                <div className="pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between text-xs font-semibold relative z-10">
                  <span className="uppercase tracking-wider text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0]">
                    Institutional Benefit
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                    <ShieldPlus className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Linear Progress Tracker */}
        {benefits.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-8 sm:hidden">
            {benefits.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1 rounded-sm transition-all duration-300 cursor-pointer",
                  activeIndex === index 
                    ? "bg-[#2E5E99] dark:bg-[#7BA4D0] w-8" 
                    : "bg-slate-200 dark:bg-white/15 w-4"
                )}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * scrollContainerRef.current.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Go to benefit ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
