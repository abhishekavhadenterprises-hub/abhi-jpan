"use client";

import React, { useRef, useState } from "react";
import { GraduationCap, Lightbulb, TrendingUp, Cpu, ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, Variants } from "framer-motion";
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

function ImprovementCard({ item, idx }: { item: typeof initiatives[0]; idx: number }) {
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
      initial={{ opacity: 0, x: 25, y: 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      whileHover={{ 
        y: -6, 
        transition: { duration: 0.25, ease: "easeOut" } 
      }}
      className="group relative bg-white dark:bg-[#091524] border border-slate-200/80 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default h-full"
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

      <div className="relative z-10 mb-5 sm:mb-6">
        {/* Icon Pod with Icon Shift & Scale-In */}
        <div className="w-11 h-11 sm:w-13 sm:h-13 bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:bg-[#2E5E99] group-hover:text-white group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 shrink-0 text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs">
          <item.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
        </div>
        
        <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2 sm:mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
          {item.desc}
        </p>
      </div>

      {/* Footer Action Arrow with Arrow Nudge */}
      <div className="pt-3.5 sm:pt-4 border-t border-[#7BA4D0]/20 dark:border-white/10 flex items-center justify-between relative z-10 gap-2">
        <span className="text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider text-[#2E5E99] dark:text-[#7BA4D0] truncate">
          Kaizen Practice
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#E7F0FA] dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}

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
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  // Slide-In Right (#8)
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 bg-[#F8FAFC]/50 dark:bg-black/50 overflow-hidden transition-colors border-y border-[#7BA4D0]/15"
    >
      <div className="container-custom px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
          <div className="mb-4 sm:mb-6 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              The Path of
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
              Continuous Improvement
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Quality is not a destination but a continuous journey of 
            improvement, innovation, and technical evolution.
          </motion.p>
        </div>

        {/* Engineering Kaizen Deck: Level 4-Column Bento Grid with Slide-In Right Reveal */}
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
              <ImprovementCard key={idx} item={item} idx={idx} />
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
