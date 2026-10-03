"use client";

import React, { useRef, useState } from "react";
import { TrendingUp, GraduationCap, Users, ShieldCheck, Heart, Zap, CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const valueProps = [
  {
    index: "01",
    icon: TrendingUp,
    title: "Career Growth",
    description: "Structured pathways for vertical and horizontal mobility across departments with clear meritocratic promotion milestones."
  },
  {
    index: "02",
    icon: GraduationCap,
    title: "Continuous L&D",
    description: "Access to institutional training, specialized metallurgy certifications, and sponsored executive education."
  },
  {
    index: "03",
    icon: Users,
    title: "Inclusive Culture",
    description: "A collaborative habitat where diverse technical perspectives drive continuous engineering innovation."
  },
  {
    index: "04",
    icon: ShieldCheck,
    title: "Institutional Stability",
    description: "Build your long-term career legacy within a financially strong, zero-debt, resilient manufacturing leader."
  },
  {
    index: "05",
    icon: Heart,
    title: "Work-Life Integration",
    description: "Empowering frameworks that prioritize comprehensive health, safety, and employee well-being."
  },
  {
    index: "06",
    icon: Zap,
    title: "Agile Innovation",
    description: "Work with cutting-edge Industry 4.0 automation, CNC bending, and advanced ERP systems."
  }
];

export function CareersValues() {
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

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-32 bg-white dark:bg-[#070b14] relative overflow-hidden transition-colors duration-500 border-b border-slate-200/70 dark:border-white/5"
    >
      {/* Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#2E5E99 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
      />

      <div className="container-custom relative z-10">
        
        {/* Full-Width Centered Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight mb-6 overflow-visible">
            <span className="inline-block">Why Build Your</span> <br />
            <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light">
              Legacy With Us?
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We provide the institutional infrastructure, mentorship, and empowerment required for ambitious engineering and business professionals to excel.
          </p>
        </motion.div>

        {/* 3-Column Premium Grid */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 no-scrollbar pb-6 md:pb-0"
        >
          {valueProps.map((value, idx) => (
            <motion.div 
              key={value.index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-[#0c1527] border border-slate-200/80 dark:border-white/10 rounded-3xl p-8 md:p-9 transition-all duration-300 hover:border-[#2E5E99]/50 flex flex-col justify-between overflow-hidden w-full shrink-0 snap-center md:w-auto md:shrink"
            >
              {/* Top hairline gradient on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E5E99] to-[#7BA4D0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#7BA4D0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Top Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/10 text-[#2E5E99] dark:text-[#7BA4D0] border border-[#2E5E99]/20 dark:border-white/15 flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                    <value.icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-heading font-black bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                    {value.index}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                  {value.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                  {value.description}
                </p>
              </div>

              {/* Card Footer Marker */}
              <div className="pt-6 mt-8 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300 relative z-10">
                <span className="uppercase tracking-wider text-[10px]">Institutional Pillar</span>
                <CheckCircle2 className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot Indicators for Mobile Scroll */}
        {valueProps.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {valueProps.map((_, index) => (
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
