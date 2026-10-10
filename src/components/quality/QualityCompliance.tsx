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

  const bentoY0 = useTransform(smoothProgress, [0, 1], [-14, 14]);
  const bentoY1 = useTransform(smoothProgress, [0, 1], [14, -14]);
  const bentoY2 = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const bentoY3 = useTransform(smoothProgress, [0, 1], [16, -16]);

  const bentoOffsets = [bentoY0, bentoY1, bentoY2, bentoY3];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
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
      className="relative py-16 md:py-24 lg:py-32 bg-white dark:bg-black overflow-hidden transition-colors"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Header Side (Sticky Architectural Anchor) */}
          <motion.div 
            className="w-full lg:w-1/3 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 md:mb-8 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Compliance &
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                ESG Standards
              </div>
            </div>
            
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg leading-relaxed font-normal">
              We operate at the intersection of technical excellence and 
              regulatory responsibility, ensuring that our products and 
              processes respect global safety and environmental protocols.
            </p>
          </motion.div>

          {/* Compliance Cards: 2x2 Bento Matrix with Counter-Parallax Scrub */}
          <div className="w-full lg:w-2/3 flex flex-col justify-between">
            <motion.div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 sm:pt-4 sm:pb-4 px-1 sm:px-0 gap-5 lg:gap-6 sm:overflow-visible no-scrollbar w-full"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {standards.map((s, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  style={{ y: bentoOffsets[idx] }}
                  whileHover={{ 
                    y: -6, 
                    transition: { type: "spring", stiffness: 350, damping: 25 } 
                  }}
                  className={cn(
                    "group relative p-7 sm:p-8 bg-[#F8FAFC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl transition-colors duration-300 overflow-hidden w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-[#2E5E99]/5 cursor-default",
                    s.pointer && "border-[#2E5E99]/40 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#EBF3FC]/60 dark:from-[#0D2440]/30 dark:to-[#0D2440]/60"
                  )}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center mb-6 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <s.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                      {s.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal flex-grow mb-3">
                      {s.desc}
                    </p>

                    {s.pointer && (
                      <div className="mt-4 pt-3.5 border-t border-[#7BA4D0]/20 flex items-start gap-2.5 text-xs font-semibold text-[#2E5E99] dark:text-[#7BA4D0] bg-[#E7F0FA]/60 dark:bg-[#0D2440]/80 p-3 rounded-2xl border border-[#7BA4D0]/25 shadow-xs">
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
