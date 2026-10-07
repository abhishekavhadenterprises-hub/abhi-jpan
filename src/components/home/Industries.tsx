"use client";

import React, { useState, useRef } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import { Fan, Car, Home, Factory, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

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
      className={`absolute w-[340px] h-[240px] md:w-[600px] md:h-[400px] lg:w-[700px] lg:h-[460px] rounded-[2rem] ${ind.color} backdrop-blur-[40px] border border-black/5 dark:border-white/10 ${ind.shadow} flex flex-col items-center justify-center p-8 origin-center overflow-hidden group text-center`}
    >
      {/* Apple-style glossy sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full -translate-x-full transition-all duration-[1.5s] ease-in-out pointer-events-none z-10" />

      <div className="relative z-20 max-w-xl mx-auto px-4">
        <h4 className="text-3xl md:text-5xl font-heading font-medium text-[#111] dark:text-white tracking-tight mb-6 uppercase">
          {ind.title}
        </h4>
        <div className="w-12 h-[2px] bg-[#111] dark:bg-white mb-6 opacity-20 mx-auto"></div>
        <p className="text-sm md:text-lg text-[#666] dark:text-[#999] leading-relaxed font-light">
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

        {/* Global Layout: Top Left Header (Hidden on desktop to match Huyml, but kept for context on mobile) */}
        <div className="absolute top-12 left-6 md:top-12 md:left-12 lg:left-24 z-20 max-w-sm pointer-events-auto md:hidden">
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#666] mb-4">Sectors</h2>
        </div>

        {/* Dynamic Content: Middle Left Details (Role, Launch equivalent) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-24 z-20 pointer-events-auto hidden md:flex flex-col gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col gap-12"
            >
              <div className="flex gap-16 items-start overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-[#999] font-medium w-16">Sector</span>
                <motion.span
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    exit: { y: "-100%", opacity: 0, transition: { duration: 0.4 } }
                  }}
                  className="text-[11px] font-bold text-[#111] dark:text-white uppercase tracking-wider block"
                >
                  {industries[activeIndex].tag}
                </motion.span>
              </div>
              <div className="flex gap-16 items-start overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-[#999] font-medium w-16">Focus</span>
                <motion.span
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    exit: { y: "-100%", opacity: 0, transition: { duration: 0.4 } }
                  }}
                  className="text-[11px] font-bold text-[#111] dark:text-white uppercase tracking-wider leading-loose block"
                >
                  Precision<br />Engineering<br />Zero-Defect
                </motion.span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The 3D Flying Cards */}
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

        {/* Dynamic Content: Bottom Left (Massive Apple-Style Indicator) */}
        <div className="absolute bottom-0 left-6 md:bottom-0 md:left-12 lg:left-24 z-20 pointer-events-none flex flex-col items-start overflow-hidden">
          <div className="relative pb-6">
            <span className="absolute -top-12 left-2 text-[10px] uppercase tracking-widest text-[#999] font-medium">Selected Sector</span>
            <div className="text-[14rem] md:text-[20rem] lg:text-[24rem] font-bold leading-[0.75] tracking-tighter text-[#111] dark:text-white font-heading z-20 relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {industries[activeIndex].num}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="absolute top-12 -right-8 md:top-24 md:-right-12 text-sm md:text-xl font-bold text-[#111] dark:text-white z-20">/04</span>
          </div>
        </div>

      </div>
    </section>
  );
}

