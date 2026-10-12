"use client";

import React, { useRef, useState } from "react";
import { ShieldAlert, Leaf, CheckCircle, Scale, Sun } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const standards = [
  {
    title: "Safety Compliance",
    desc: "Adherence to OHSAS standards, ensuring a zero-incident manufacturing environment across all plants.",
    icon: ShieldAlert
  },
  {
    title: "Environmental Responsibility",
    desc: "Strict monitoring of carbon footprint and sustainable waste management as per global norms.",
    pointer: "Solar power plant installed in A2 manufacturing facility for clean, green energy operations.",
    icon: Leaf
  },
  {
    title: "Regulatory Adherence",
    desc: "Full compliance with local and international manufacturing, environmental, and export laws.",
    icon: Scale
  },
  {
    title: "Ethical Sourcing",
    desc: "Partnering only with raw material suppliers who meet our rigid quality and ethics criteria.",
    icon: CheckCircle
  }
];

export function QualityCompliance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sticky Counter-Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // Statistics Fade-Up Animation
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < standards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-12 sm:py-20 md:py-28 bg-white dark:bg-black overflow-hidden transition-colors"
    >
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-20 items-start">
          
          {/* Header Side (Sticky Architectural Anchor) */}
          <motion.div 
            className="w-full lg:w-1/3 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 sm:mb-6 md:mb-8 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Compliance &
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                ESG Standards
              </div>
            </div>
            
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              We operate at the intersection of technical excellence and 
              regulatory responsibility, ensuring that our products and 
              processes respect global safety and environmental protocols.
            </p>
          </motion.div>

          {/* Compliance Cards: Level 2x2 Bento Matrix with Fade-Down Reveal */}
          <div className="w-full lg:w-2/3 flex flex-col justify-between">
            <motion.div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 sm:pt-4 sm:pb-4 px-1 sm:px-0 gap-4 sm:gap-5 lg:gap-6 sm:overflow-visible no-scrollbar w-full"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {standards.map((s, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  whileHover={{ 
                    y: -6, 
                    transition: { duration: 0.25, ease: "easeOut" } 
                  }}
                  className={cn(
                    "group relative p-5 sm:p-6 md:p-8 bg-white/80 dark:bg-[#091A2E]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-[#2E5E99]/5 cursor-default",
                    s.pointer && "border-[#2E5E99]/40 bg-gradient-to-b from-white/90 via-[#F8FAFC] to-[#EBF3FC]/80 dark:from-[#091A2E]/90 dark:to-[#0D2440]/80"
                  )}
                >
                  <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                          <s.icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#2E5E99]/60 dark:text-[#7BA4D0]/60">
                          0{idx + 1}
                        </span>
                      </div>
                      
                      <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                        {s.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal flex-grow mb-3">
                        {s.desc}
                      </p>

                      {s.pointer && (
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#7BA4D0]/20 flex items-start gap-2 text-[11px] sm:text-xs font-semibold text-[#2E5E99] dark:text-[#7BA4D0] bg-[#E7F0FA]/80 dark:bg-[#0D2440]/80 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-[#7BA4D0]/25 shadow-xs">
                          <Sun className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5 animate-pulse" />
                          <span className="leading-snug">{s.pointer}</span>
                        </div>
                      )}
                    </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Pagination Indicator Dots - Squircle */}
            <div className="flex sm:hidden items-center justify-center gap-2 mt-6 z-10">
              {standards.map((_, i) => (
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
                  aria-label={`Go to compliance card ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
