"use client";

import React, { useRef, useState } from "react";
import { Search, Cog, Gauge, ClipboardCheck, Truck } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Material Validation",
    desc: "Incoming copper, brass, and stainless steel materials undergo strict dimensional, chemical, and surface quality verification before production approval.",
    icon: Search
  },
  {
    title: "Process Intelligence",
    desc: "Real-time monitoring and precision-controlled manufacturing processes ensure consistency throughout bending, machining, brazing, and forming operations.",
    icon: Cog
  },
  {
    title: "Performance Testing",
    desc: "Advanced leak testing, pressure validation, and structural analysis ensure performance under demanding operating conditions.",
    icon: Gauge
  },
  {
    title: "Precision Verification",
    desc: "Comprehensive dimensional inspection and visual validation conducted through calibrated quality systems and inspection protocols.",
    icon: ClipboardCheck
  },
  {
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
    offset: ["start 70%", "end 60%"]
  });

  // Smooth spring for the timeline journey scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  const timelineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

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
      className="relative py-16 md:py-24 lg:py-32 bg-white dark:bg-black overflow-hidden transition-colors"
    >
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight overflow-visible"
          >
            The Quality Control <br/>
            <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Lifecycle</span>
          </motion.h2>
          
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

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Timeline Connecting Track */}
          <div className="absolute top-[4.25rem] left-[8%] w-[84%] h-1.5 bg-[#EBF3FC] dark:bg-white/10 rounded-full hidden lg:block" />
          
          {/* Desktop Timeline Journey Active Progress Line */}
          <motion.div 
            style={{ scaleX: timelineScale }}
            className="absolute top-[4.25rem] left-[8%] w-[84%] h-1.5 bg-gradient-to-r from-[#2E5E99] via-[#7BA4D0] to-[#2E5E99] rounded-full hidden lg:block origin-left"
          />

          {/* Process Cards */}
          <div className="flex flex-col justify-between w-full">
            <motion.div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-row md:grid md:grid-cols-3 lg:grid-cols-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-6 pb-6 md:pt-6 md:pb-6 px-2 md:px-0 gap-4 md:gap-x-6 md:gap-y-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full relative z-10"
            >
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="group flex flex-col items-center text-center p-6 sm:p-7 bg-[#F8FAFC] dark:bg-charcoal/50 md:bg-white/90 md:dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 rounded-3xl w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center hover:-translate-y-1.5 transition-all duration-500"
                >
                  {/* Interactive Journey Node */}
                  <div className="relative mb-6">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 bg-white dark:bg-charcoal border-2 border-[#7BA4D0]/40 group-hover:border-[#2E5E99] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#0D2440] overflow-hidden relative z-10 shrink-0 text-[#2E5E99] group-hover:text-white">
                      <step.icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-[#0D2440] dark:bg-white text-white dark:text-[#0D2440] font-bold text-xs flex items-center justify-center rounded-full border-2 border-white dark:border-black group-hover:bg-[#2E5E99] group-hover:text-white transition-colors duration-500 z-20">
                      0{idx + 1}
                    </div>
                  </div>
                  
                  {/* Step Titles & Descriptions */}
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Pagination Indicator Dots */}
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
                    "h-1.5 rounded-full transition-all duration-300",
                    activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
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

