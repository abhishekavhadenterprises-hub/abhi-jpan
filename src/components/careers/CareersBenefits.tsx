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
      className="py-12 sm:py-20 md:py-28 lg:py-32 bg-white dark:bg-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Precision Radial Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#7BA4D0 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-6 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Institutional
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                Support Ecosystem
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              We invest in our people by providing a comprehensive ecosystem 
              of benefits that support professional excellence and personal 
              well-being.
            </p>
          </motion.div>
        </div>

        {/* 4-Column Simple Clean Card Matrix (Homepage Style) with Alternate Reveal */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 no-scrollbar pb-6 sm:pb-0"
        >
          {benefits.map((benefit, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={benefit.index}
                initial={{ opacity: 0, x: isEven ? -25 : 25, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? -25 : 25, y: 20 }}
                transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full shrink-0 snap-center sm:w-auto sm:shrink flex"
              >
                <div className="group relative bg-gradient-to-br from-white via-white to-[#EBF3FC]/60 dark:from-[#0D2440] dark:via-[#091A2E] dark:to-[#071321] border border-[#7BA4D0]/30 dark:border-white/15 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#2E5E99]/5 overflow-hidden flex flex-col justify-between w-full cursor-default">
                  {/* Specular Radial Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/12 via-[#7BA4D0]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl" />

                  <div>
                    {/* Top Row: Clean Icon Pod & Number Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                        <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#2E5E99]/70 dark:text-[#7BA4D0]/70">
                        0{idx + 1}
                      </span>
                    </div>
                    
                    <h4 className="text-base sm:text-lg md:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors mb-2 sm:mb-2.5">
                      {benefit.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-5 mt-5 sm:mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider">
                      Employee Benefit
                    </span>
                    <ShieldPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7BA4D0]/60 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors" strokeWidth={1.75} />
                  </div>
                </div>
              </motion.div>
            );
          })}
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
