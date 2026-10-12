"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, Heart, Zap, History, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const pillars = [
  {
    index: "01",
    title: "Reliable Products",
    desc: "Components that withstand extreme pressures and thermal cycles without failure.",
    icon: ShieldCheck,
  },
  {
    index: "02",
    title: "Enduring Performance",
    desc: "Engineered for longevity, drastically reducing maintenance costs and downtime.",
    icon: History,
  },
  {
    index: "03",
    title: "Absolute Precision",
    desc: "Meeting exact dimensional requirements for seamless system integration.",
    icon: Zap,
  },
  {
    index: "04",
    title: "Customer Trust",
    desc: "A reputation built over 28 years of delivering uncompromising quality on time.",
    icon: Heart,
  }
];

export function QualityTrust() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll Horizon Wave & Parallax Depth Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < pillars.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative transition-colors"
    >
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-12 md:mb-20 gap-6 sm:gap-8 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-4 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Why Our Standards
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                Impact Your Scale
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm"
          >
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Beyond certifications, our commitment to quality translates into 
              tangible industrial stability for your operations.
            </p>
          </motion.div>
        </div>

        {/* Monumental Institutional Trust Pillars: Level 4-Column Bento Grid with Scale-In Reveal */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 sm:pt-4 sm:pb-4 px-1 sm:px-0 gap-4 sm:gap-5 lg:gap-6 sm:overflow-visible no-scrollbar w-full"
          >
            {pillars.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -6, 
                  transition: { duration: 0.25, ease: "easeOut" } 
                }}
                className="group relative bg-white/80 dark:bg-[#091A2E]/80 backdrop-blur-xl hover:bg-white dark:hover:bg-[#0D2440]/90 border border-slate-200/80 dark:border-white/10 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300 overflow-hidden flex flex-col justify-between w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
              >
                {/* Icon Box */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white text-[#2E5E99] dark:text-[#7BA4D0] relative z-10 shrink-0 shadow-xs">
                  <p.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                </div>

                <div className="space-y-2 relative z-10 flex-grow mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>

                {/* Card Footer Marker */}
                <div className="pt-3.5 sm:pt-4 border-t border-[#7BA4D0]/20 dark:border-white/10 flex items-center justify-between text-xs font-semibold relative z-10 gap-2">
                  <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] truncate">
                    Institutional Trust
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-6 z-10">
            {pillars.map((_, i) => (
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
                aria-label={`Go to pillar card ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Technical Validation Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/35 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 shadow-sm">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 bg-white dark:bg-[#0D2440] rounded-xl sm:rounded-2xl flex items-center justify-center border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs"
              >
                <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={1.75} />
              </motion.div>
              <p className="text-xs sm:text-sm md:text-base font-normal text-[#0D2440] dark:text-white max-w-xl leading-relaxed">
                Our quality management systems are independently audited and certified to <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold">ISO 9001:2015</span> standards for global reliability.
              </p>
            </div>
            {/* Squircle Action Button with Spring Physics */}
            <motion.button 
              whileHover={{ 
                scale: 1.03, 
                y: -2, 
                transition: { type: "spring", stiffness: 400, damping: 25 } 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById('certifications');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="shrink-0 px-6 sm:px-8 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-heading font-bold uppercase tracking-[0.18em] rounded-xl sm:rounded-2xl transition-colors duration-300 whitespace-nowrap shadow-sm hover:shadow-lg hover:shadow-[#2E5E99]/20 cursor-pointer w-full md:w-auto text-center"
            >
              View Certifications
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
