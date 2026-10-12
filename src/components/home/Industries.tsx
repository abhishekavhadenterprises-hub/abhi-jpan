"use client";

import React, { useState, useRef } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import { Fan, Car, Home, Factory, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const industries = [
  {
    id: "hvac",
    num: "01",
    title: "HVAC & Climate Control",
    icon: Fan,
    tag: "THERMAL TRANSFER",
    description: "Advanced copper, stainless steel and aluminum solutions designed for high-efficiency air conditioning and refrigeration applications.",
    color: "bg-white/60 dark:bg-[#111]/60",
    shadow: "shadow-[0_40px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_rgba(255,255,255,0.02)]",
    iconColor: "text-blue-500",
  },
  {
    id: "automotive",
    num: "02",
    title: "Automotive Engineering",
    icon: Car,
    tag: "BRAKE & FUEL LINES",
    description: "Precision-manufactured components supporting performance-driven automotive and mobility systems.",
    color: "bg-white/60 dark:bg-[#111]/60",
    shadow: "shadow-[0_40px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_rgba(255,255,255,0.02)]",
    iconColor: "text-orange-500",
  },
  {
    id: "appliances",
    num: "03",
    title: "Consumer Appliances",
    icon: Home,
    tag: "REFRIGERATION",
    description: "Reliable engineered solutions powering modern home and commercial appliance technologies.",
    color: "bg-white/60 dark:bg-[#111]/60",
    shadow: "shadow-[0_40px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_rgba(255,255,255,0.02)]",
    iconColor: "text-teal-500",
  },
  {
    id: "industrial",
    num: "04",
    title: "Industrial & Data Centers",
    icon: Factory,
    tag: "CRITICAL COOLING",
    description: "Heavy-duty precision components supporting industrial operations and mission-critical data center cooling environments.",
    color: "bg-white/60 dark:bg-[#111]/60",
    shadow: "shadow-[0_40px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_rgba(255,255,255,0.02)]",
    iconColor: "text-indigo-500",
  },
];

const Card = ({ ind, i, scrollYProgress }: { ind: typeof industries[0], i: number, scrollYProgress: any }) => {
  // Map scroll progress (0 to 1) to a local progress for this card (-3 to 3)
  const progress = useTransform(scrollYProgress, (v: number) => v * 3 - i);

  // Math mapping for the 3D flying effect
  const x = useTransform(progress, [-2, -1, 0, 1, 2, 3], ["0vw", "0vw", "0vw", "30vw", "32vw", "34vw"]);
  const y = useTransform(progress, [-2, -1, 0, 1, 2, 3], ["120vh", "75vh", "0vh", "-35vh", "-40vh", "-45vh"]);
  const scale = useTransform(progress, [-2, -1, 0, 1, 2, 3], [0.5, 0.7, 1, 0.5, 0.45, 0.4]);

  // To match the deck stacking, future cards (bottom) rotateZ differently than past cards (top right)
  const rotateZ = useTransform(progress, [-2, -1, 0, 1, 2, 3], [10, 5, 0, -10, -15, -20]);
  const rotateY = useTransform(progress, [-2, -1, 0, 1, 2, 3], [10, 5, 0, -30, -35, -40]);
  const rotateX = useTransform(progress, [-2, -1, 0, 1, 2, 3], [-10, -5, 0, 15, 20, 25]);
  const opacity = useTransform(progress, [-2, -1, 0, 1, 2, 3], [0, 1, 1, 1, 0.8, 0]);

  const Icon = ind.icon;

  return (
    <motion.div
      style={{ x, y, scale, rotateZ, rotateY, rotateX, opacity }}
      className={`absolute w-[min(90vw,350px)] sm:w-[400px] md:w-[500px] lg:w-[560px] xl:w-[600px] h-[220px] sm:h-[260px] md:h-[340px] lg:h-[390px] rounded-2xl sm:rounded-[2rem] ${ind.color} backdrop-blur-[40px] border border-black/5 dark:border-white/10 ${ind.shadow} flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 origin-center overflow-hidden group text-center`}
    >
      {/* Apple-style glossy sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full -translate-x-full transition-all duration-[1.5s] ease-in-out pointer-events-none z-10" />

      <div className="relative z-20 max-w-lg mx-auto px-2 sm:px-4">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-[#111] dark:text-white tracking-tight mb-2 sm:mb-4 uppercase">
          {ind.title}
        </h4>
        <div className="w-8 sm:w-12 h-[2px] bg-[#111] dark:bg-white mb-2 sm:mb-5 opacity-20 mx-auto"></div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#666] dark:text-[#999] leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
          {ind.description}
        </p>
      </div>
    </motion.div>
  );
};

export function Industries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 0 to 1 mapping to 0 to 3
    let index = Math.round(latest * 3);
    index = Math.max(0, Math.min(3, index));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#FAFAFA] dark:bg-[#050505] transition-colors duration-500">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center [perspective:1200px]">

        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#586854]/5 via-[#2E5E99]/5 to-transparent blur-[120px]" />
        </div>

        {/* Primary Sectors Navigation List - Positioned nicely to the left */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-8 lg:left-10 xl:left-14 z-20 pointer-events-auto flex flex-col max-w-[260px] sm:max-w-[290px] md:max-w-[320px] lg:max-w-[360px] select-none">
          {/* Header */}
          <div className="mb-5 sm:mb-6 md:mb-8">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 font-bold block mb-2 sm:mb-2.5">
              PRIMARY SECTORS
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.05] tracking-tight uppercase">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2E5E99] via-[#3B6FA8] to-slate-400 dark:from-[#7BA4D0] dark:via-white dark:to-slate-400">
                ENGINEERED FOR
              </span>
              <span className="block font-light italic text-slate-300 dark:text-slate-600 text-lg sm:text-xl md:text-2xl lg:text-[1.8rem]">
                GLOBAL INDUSTRIES.
              </span>
            </h3>
          </div>

          {/* List of Sectors */}
          <div className="flex flex-col space-y-3.5 sm:space-y-4 md:space-y-5">
            {industries.map((ind, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={ind.id}
                  className="flex items-baseline transition-all duration-500"
                >
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-mono font-bold mr-2.5 sm:mr-3.5 transition-colors duration-500 shrink-0",
                      isActive
                        ? "text-[#0D2440] dark:text-white"
                        : "text-slate-300/80 dark:text-white/20"
                    )}
                  >
                    {ind.num}
                  </span>
                  <span
                    className={cn(
                      "font-heading font-black tracking-tight uppercase transition-all duration-500",
                      "text-base sm:text-lg md:text-xl lg:text-[1.65rem] xl:text-[1.75rem] leading-tight",
                      isActive
                        ? "text-[#0D2440] dark:text-white drop-shadow-sm"
                        : "text-slate-300/70 dark:text-white/20"
                    )}
                  >
                    {ind.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* The 3D Flying Cards - Perfectly centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {industries.map((ind, i) => (
            <Card key={ind.id} ind={ind} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Dynamic Content: Right Side (Active Details) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 lg:right-24 z-20 max-w-[280px] pointer-events-auto flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-3 p-1.5 pl-5 rounded-full bg-transparent border border-[#E5E5E5] dark:border-[#333] hover:bg-[#111] hover:text-white transition-all duration-500 w-max"
              >
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#111] dark:text-white group-hover:text-white">Explore</span>
                <span className="w-6 h-6 rounded-full bg-[#111] dark:bg-white flex items-center justify-center text-white dark:text-[#111]">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

