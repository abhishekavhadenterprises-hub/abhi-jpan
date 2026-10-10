"use client";

import React, { useRef, useState } from "react";
import { Search, Cog, Gauge, ClipboardCheck, Truck } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const steps = [
  {
    step: "01",
    title: "Material Validation",
    desc: "Incoming copper, brass, and stainless steel materials undergo strict dimensional, chemical, and surface quality verification before production approval.",
    icon: Search
  },
  {
    step: "02",
    title: "Process Intelligence",
    desc: "Real-time monitoring and precision-controlled manufacturing processes ensure consistency throughout bending, machining, brazing, and forming operations.",
    icon: Cog
  },
  {
    step: "03",
    title: "Performance Testing",
    desc: "Advanced leak testing, pressure validation, and structural analysis ensure performance under demanding operating conditions.",
    icon: Gauge
  },
  {
    step: "04",
    title: "Precision Verification",
    desc: "Comprehensive dimensional inspection and visual validation conducted through calibrated quality systems and inspection protocols.",
    icon: ClipboardCheck
  },
  {
    step: "05",
    title: "Certified Dispatch",
    desc: "Every production batch is documented, validated, and dispatched with complete traceability and material compliance reporting.",
    icon: Truck
  }
];

export function QualityProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 55%"]
  });

  // Smooth spring for the timeline journey scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  const timelineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Differential vertical scroll floating offsets for each of the 5 cards
  const cardFloat0 = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const cardFloat1 = useTransform(smoothProgress, [0, 1], [10, -10]);
  const cardFloat2 = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const cardFloat3 = useTransform(smoothProgress, [0, 1], [12, -12]);
  const cardFloat4 = useTransform(smoothProgress, [0, 1], [-14, 14]);

  const cardFloats = [cardFloat0, cardFloat1, cardFloat2, cardFloat3, cardFloat4];

  // Dynamic node activation pulse as timeline progresses across thresholds
  const nodeScale0 = useTransform(smoothProgress, [0, 0.15, 0.3], [1, 1.15, 1]);
  const nodeScale1 = useTransform(smoothProgress, [0.15, 0.35, 0.5], [1, 1.15, 1]);
  const nodeScale2 = useTransform(smoothProgress, [0.35, 0.55, 0.7], [1, 1.15, 1]);
  const nodeScale3 = useTransform(smoothProgress, [0.55, 0.75, 0.9], [1, 1.15, 1]);
  const nodeScale4 = useTransform(smoothProgress, [0.75, 0.95, 1.0], [1, 1.15, 1]);

  const nodeScales = [nodeScale0, nodeScale1, nodeScale2, nodeScale3, nodeScale4];

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < steps.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

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
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 bg-[#F8FAFC]/60 dark:bg-black/60 overflow-hidden transition-colors border-y border-[#7BA4D0]/15"
    >
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="mb-6 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.14] tracking-tight block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              The Quality Control
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
              Lifecycle Pipeline
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Our multi-stage quality control process ensures that every component 
            undergoes rigorous scrutiny at every phase of manufacturing.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Timeline Connecting Track */}
          <div className="absolute top-[5rem] left-[10%] w-[80%] h-1 bg-[#EBF3FC] dark:bg-white/10 rounded-sm hidden lg:block" />
          
          {/* Desktop Timeline Journey Active Progress Line with Dynamic Scale Scrub */}
          <motion.div 
            style={{ scaleX: timelineScale }}
            className="absolute top-[5rem] left-[10%] w-[80%] h-1 bg-gradient-to-r from-[#2E5E99] via-[#7BA4D0] to-[#2E5E99] rounded-sm hidden lg:block origin-left"
          />

          {/* Process Stepper Cards with Scroll Parallax & Node Scrub */}
          <div className="flex flex-col justify-between w-full">
            <motion.div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-row md:grid md:grid-cols-3 lg:grid-cols-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-6 pb-6 px-2 md:px-0 gap-4 md:gap-x-5 lg:gap-x-5 no-scrollbar w-full relative z-10"
            >
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  style={{ y: cardFloats[idx] }}
                  whileHover={{ 
                    y: -6, 
                    transition: { type: "spring", stiffness: 350, damping: 25 } 
                  }}
                  className="group flex flex-col items-center text-center p-5 sm:p-6 bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center transition-colors duration-300 shadow-xs hover:shadow-xl hover:shadow-[#2E5E99]/8 cursor-default"
                >
                  {/* Journey Node with Scroll Threshold Activation */}
                  <div className="relative mb-4 sm:mb-5">
                    <motion.div 
                      style={{ scale: nodeScales[idx] }}
                      className="w-16 h-16 sm:w-16 sm:h-16 bg-[#EBF3FC] dark:bg-[#0D2440] border-2 border-[#7BA4D0]/40 group-hover:border-[#2E5E99] rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[#2E5E99] overflow-hidden relative z-10 shrink-0 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:text-white shadow-xs"
                    >
                      <step.icon className="w-7 h-7 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                    </motion.div>
                    
                    {/* Step Number Squircle Badge */}
                    <div className="absolute -top-2 -right-2 w-6.5 h-6.5 bg-[#0D2440] dark:bg-white text-white dark:text-[#0D2440] font-bold text-xs flex items-center justify-center rounded-lg border-2 border-white dark:border-black group-hover:bg-[#2E5E99] group-hover:text-white transition-colors duration-500 z-20 shadow-xs">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Step Titles & Descriptions */}
                  <div className="w-full">
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Pagination Indicator Dots - Squircle */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
              {steps.map((_, i) => (
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
                  aria-label={`Go to lifecycle step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
