"use client";

import React, { useRef, useState } from "react";
import { GraduationCap, Lightbulb, TrendingUp, Cpu, ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const initiatives = [
  {
    index: "01",
    title: "Skilled Workforce",
    desc: "Continuous training programs for our engineering and quality teams to stay ahead of technical trends.",
    icon: GraduationCap
  },
  {
    index: "02",
    title: "R&D Innovation",
    desc: "Investing in new alloy testing and product design to meet the evolving needs of the thermal industry.",
    icon: Lightbulb
  },
  {
    index: "03",
    title: "Process Automation",
    desc: "Constant upgrades to our CNC and brazing lines for higher consistency and lower defect rates.",
    icon: Cpu
  },
  {
    index: "04",
    title: "Performance Analytics",
    desc: "Data-driven approach to monitoring production quality and identifying areas for improvement.",
    icon: TrendingUp
  }
];

export function QualityImprovement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll Momentum & Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const kaizenFloat0 = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const kaizenFloat1 = useTransform(smoothProgress, [0, 1], [14, -14]);
  const kaizenFloat2 = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const kaizenFloat3 = useTransform(smoothProgress, [0, 1], [16, -16]);

  const kaizenFloats = [kaizenFloat0, kaizenFloat1, kaizenFloat2, kaizenFloat3];
  const notchScaleX = useTransform(smoothProgress, [0, 0.75], [0.25, 1.0]);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < initiatives.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-[#F8FAFC]/50 dark:bg-black/50 overflow-hidden transition-colors border-y border-[#7BA4D0]/15"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="mb-6 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              The Path of
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
              Continuous Improvement
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Quality is not a destination but a continuous journey of 
            improvement, innovation, and technical evolution.
          </motion.p>
        </div>

        {/* Engineering Kaizen Deck with Horizontal Notch Scrub & Parallax Momentum */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 px-1 md:px-0 gap-5 lg:gap-6 no-scrollbar w-full"
          >
            {initiatives.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                style={{ y: kaizenFloats[idx] }}
                whileHover={{ 
                  y: -8, 
                  transition: { type: "spring", stiffness: 350, damping: 25 } 
                }}
                className="group relative bg-white dark:bg-[#0D2440]/30 p-7 sm:p-8 rounded-3xl border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-colors duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
              >
                {/* Top Notch Indicator Accent with Dynamic Scroll Expansion */}
                <motion.div 
                  style={{ scaleX: notchScaleX, transformOrigin: "left" }}
                  className="absolute top-0 left-0 right-0 h-1 bg-[#E7F0FA] dark:bg-white/10 group-hover:bg-[#2E5E99] dark:group-hover:bg-[#7BA4D0] transition-colors duration-500" 
                />
                
                <div>
                  <div className="w-14 h-14 bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs">
                    <item.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Action Micro-Interactive Arrow with Spring Physics */}
                <div className="mt-6 pt-4 border-t border-[#7BA4D0]/15 flex items-center justify-between">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#2E5E99] dark:text-[#7BA4D0]">
                    Kaizen Practice {item.index}
                  </span>
                  <motion.div 
                    whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                    className="w-7 h-7 rounded-xl bg-[#E7F0FA] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {initiatives.map((_, i) => (
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
                aria-label={`Go to initiative card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
