"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, Variants } from "framer-motion";
import { Trophy, Award, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const awards = [
  {
    index: "01",
    title: "Best Exhibition Booth",
    event: "ACREX India 2023",
    icon: Trophy
  },
  {
    index: "02",
    title: "Excellence in Precision",
    event: "Automotive Expo 2022",
    icon: Award
  },
  {
    index: "03",
    title: "Innovation in Cooling",
    event: "Global HVAC Awards",
    icon: Star
  }
];

function EventAwardCard({ award, idx, cardFloat }: { award: typeof awards[0]; idx: number; cardFloat: any }) {
  const boundingRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const bgSpotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(46, 94, 153, 0.12), transparent 80%)`;
  const bgBorder = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(46, 94, 153, 0.45), transparent 80%)`;

  return (
    <motion.div
      ref={boundingRef}
      style={{ y: cardFloat }}
      onMouseMove={handleMouseMove}
      whileHover={{ 
        y: -7, 
        transition: { type: "spring", stiffness: 350, damping: 25 } 
      }}
      className="group relative flex flex-col justify-between p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#091524] border border-slate-200/80 dark:border-white/10 transition-colors duration-300 overflow-hidden w-full shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
    >
      {/* Dynamic Spotlight Background (From OurStory) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bgSpotlight }}
      />
      
      {/* Dynamic Border Glow (From OurStory) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: bgBorder,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-20 mb-4 sm:mb-6">
        {/* Icon & Event Tag */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shadow-xs">
            <award.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
          </div>

          <span className="text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/25 dark:border-white/15">
            {award.event}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug mb-1.5 sm:mb-2">
          {award.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-silver/70 font-normal">
          Conferred for exemplary technical showcase and component craftsmanship.
        </p>
      </div>

      {/* Footer Marker */}
      <div className="pt-4 border-t border-[#7BA4D0]/20 dark:border-white/10 flex items-center justify-between text-xs font-semibold relative z-20">
        <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0]">
          Verified Trade Distinction
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#E7F0FA] dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} />
        </div>
      </div>
    </motion.div>
  );
}

export function EventAwards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  // Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  const cardFloat0 = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const cardFloat1 = useTransform(smoothProgress, [0, 1], [0, 0]);
  const cardFloat2 = useTransform(smoothProgress, [0, 1], [16, -16]);
  const cardFloats = [cardFloat0, cardFloat1, cardFloat2];
  const watermarkY = useTransform(smoothProgress, [0, 1], [-20, 20]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.14, delayChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden transition-colors border-t border-[#7BA4D0]/15"
    >
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 flex flex-col items-center">
          <div className="mb-2 overflow-visible flex flex-col items-center w-full">
            <ScrollWipeHeading
              as="h2"
              className="text-2xl sm:text-3xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block mx-auto text-center"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              Exhibition Honors &
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 px-4 pr-6 overflow-visible inline-block bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-3xl md:text-5xl font-heading tracking-tight text-center">
              Trade Recognitions
            </div>
          </div>
        </div>

        {/* Award Cards: 3-Column Grid on Desktop */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 py-2 gap-4 sm:gap-6 lg:gap-8 w-full"
          >
            {awards.map((award, idx) => (
              <EventAwardCard key={idx} award={award} idx={idx} cardFloat={cardFloats[idx]} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
