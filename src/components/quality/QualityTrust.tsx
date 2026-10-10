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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const pillarFloat0 = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const pillarFloat1 = useTransform(smoothProgress, [0, 1], [14, -14]);
  const pillarFloat2 = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const pillarFloat3 = useTransform(smoothProgress, [0, 1], [14, -14]);

  const pillarFloats = [pillarFloat0, pillarFloat1, pillarFloat2, pillarFloat3];
  const watermarkY = useTransform(smoothProgress, [0, 1], [-22, 22]);
  const shieldFloatY = useTransform(smoothProgress, [0, 1], [-8, 8]);

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
      className="py-16 md:py-24 lg:py-32 bg-white dark:bg-black overflow-hidden relative transition-colors"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-20 gap-8 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-4 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Why Our Standards
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
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
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base leading-relaxed font-normal">
              Beyond certifications, our commitment to quality translates into 
              tangible industrial stability for your operations.
            </p>
          </motion.div>
        </div>

        {/* Monumental Institutional Trust Pillars with Horizon Parallax Scrub */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 sm:pt-4 sm:pb-4 px-1 sm:px-0 gap-5 lg:gap-6 sm:overflow-visible no-scrollbar w-full"
          >
            {pillars.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98, y: 25 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 25 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: pillarFloats[idx] }}
                className="group relative w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center"
              >
                <motion.div 
                  whileHover={{ 
                    y: -8, 
                    transition: { type: "spring", stiffness: 350, damping: 25 } 
                  }}
                  className="relative h-full bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl p-7 sm:p-8 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
                >
                  {/* Giant Numeric Watermark with Scroll Scrub */}
                  <motion.div 
                    style={{ y: watermarkY }}
                    className="absolute top-4 right-6 text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/20 dark:group-hover:text-[#7BA4D0]/20 transition-colors duration-500 select-none pointer-events-none"
                  >
                    {p.index}
                  </motion.div>

                  {/* Icon Box */}
                  <div className="w-14 h-14 mb-6 sm:mb-8 bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white text-[#2E5E99] dark:text-[#7BA4D0] relative z-10 shrink-0 shadow-xs">
                    <p.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  </div>

                  <div className="space-y-2.5 relative z-10 flex-grow mb-6">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>

                  {/* Card Footer Marker */}
                  <div className="pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between text-xs font-semibold relative z-10">
                    <span className="uppercase tracking-wider text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0]">
                      Institutional Trust
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                  </div>
                </motion.div>
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
          className="mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/35 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.div 
                style={{ y: shieldFloatY }}
                className="w-14 h-14 shrink-0 bg-white dark:bg-[#0D2440] rounded-2xl flex items-center justify-center border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs"
              >
                <ShieldCheck className="w-7 h-7" strokeWidth={1.75} />
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
              className="shrink-0 px-8 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-heading font-bold uppercase tracking-[0.18em] rounded-xl sm:rounded-2xl transition-colors duration-300 whitespace-nowrap shadow-sm hover:shadow-lg hover:shadow-[#2E5E99]/20 cursor-pointer"
            >
              View Certifications
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
