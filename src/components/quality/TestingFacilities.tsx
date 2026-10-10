"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Microscope, Zap, FileText, CheckCircle2 } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const facilities = [
  {
    name: "Spectrometry Lab",
    desc: "Chemical analysis for raw material grade verification and alloy consistency.",
    icon: Microscope
  },
  {
    name: "Hydro-Testing Rig",
    desc: "Simulating extreme pressure environments to ensure zero leakage in assemblies.",
    icon: Zap
  },
  {
    name: "Metrology Division",
    desc: "Micron-level dimensional inspection using digital profile projectors.",
    icon: FileText
  }
];

export function TestingFacilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Dual-Opposing Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  // Photo glides downward while facility cards counter-float upward
  const imageParallaxY = useTransform(smoothProgress, [0, 1], [-35, 35]);
  const cardFloat0 = useTransform(smoothProgress, [0, 1], [22, -22]);
  const cardFloat1 = useTransform(smoothProgress, [0, 1], [6, -6]);
  const cardFloat2 = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const telemetryFloatY = useTransform(smoothProgress, [0, 1], [10, -10]);

  const facilityFloats = [cardFloat0, cardFloat1, cardFloat2];

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < facilities.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-white dark:bg-black transition-colors"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Side: Interactive Facility Bento with Counter-Parallax */}
          <div className="order-2 lg:order-1">
            <div className="mb-6 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                In-House
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
                Testing Infrastructure
              </div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg mb-8 leading-relaxed font-normal"
            >
              Our advanced laboratory is equipped with state-of-the-art instruments 
              to perform a wide array of destructive and non-destructive tests, 
              ensuring 100% compliance with client specifications.
            </motion.p>

            <div className="relative">
              <motion.div 
                ref={scrollRef}
                onScroll={handleMobileScroll}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-row md:flex-col overflow-x-auto snap-x snap-mandatory gap-4 md:gap-5 pb-4 md:pb-0 no-scrollbar w-full"
              >
                {facilities.map((f, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    style={{ y: facilityFloats[idx] }}
                    whileHover={{ 
                      x: 10, 
                      transition: { type: "spring", stiffness: 350, damping: 25 } 
                    }}
                    className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 bg-[#F8FAFC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] hover:bg-[#F1F6FB] dark:hover:bg-[#0D2440]/60 transition-colors duration-300 w-full min-w-full md:min-w-0 shrink-0 snap-center shadow-xs hover:shadow-xl hover:shadow-[#2E5E99]/6 cursor-default rounded-3xl"
                  >
                    <div className="w-14 h-14 bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl shrink-0 group-hover:bg-[#2E5E99] group-hover:text-white text-[#2E5E99] dark:text-[#7BA4D0] transition-all duration-300 shadow-xs">
                      <f.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-1.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                        {f.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Pagination Indicator Dots - Squircle */}
              <div className="flex md:hidden items-center justify-center gap-2 mt-4">
                {facilities.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      if (scrollRef.current && scrollRef.current.children[i]) {
                        scrollRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }
                    }}
                    className={cn(
                      "h-1.5 rounded-sm transition-all duration-300",
                      activeIndex === i ? "w-6 bg-[#0D2440] dark:bg-white" : "w-1.5 bg-[#7BA4D0]/40"
                    )}
                    aria-label={`Go to facility ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Image Side with Continuous Vertical Parallax & Floating Telemetry Plaque */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative group"
          >
            <motion.div 
              style={{ y: imageParallaxY }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#7BA4D0]/30 dark:border-white/15 bg-white dark:bg-[#0D2440] shadow-xl shadow-[#2E5E99]/5"
            >
              <Image
                src="/images/about-manufacturing.png" 
                alt="Industrial Quality Testing Lab"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Luxury Floating Telemetry Plaque with Parallax Drift */}
              <motion.div 
                style={{ y: telemetryFloatY }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-[#0D2440]/95 backdrop-blur-md border border-[#7BA4D0]/30 flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Metrology Lab</div>
                    <div className="text-[11px] text-[#0D2440]/70 dark:text-silver/70">100% Calibrated Instruments</div>
                  </div>
                </div>
                <span className="text-[10px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider bg-[#EBF3FC] dark:bg-[#0D2440]/60 px-3 py-1.5 rounded-xl border border-[#7BA4D0]/30">
                  Active
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
