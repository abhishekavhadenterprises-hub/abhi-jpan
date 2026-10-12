"use client";

import React, { useRef, useState } from "react";
import { Award, Briefcase, Zap } from "lucide-react";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import { cn } from "@/lib/utils";

export function CareersIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [activeQuote, setActiveQuote] = useState<number | null>(0);

  // Parallax subtle vertical float on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rightCardParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Scroll-Triggered Fade-Up Variants
  const leftColumnVariants: Variants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.12 }
    }
  };

  const rightColumnVariants: Variants = {
    hidden: { opacity: 0, y: 44, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 dark:from-[#070b14] dark:via-[#0c1424] dark:to-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Precision Industrial Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Content Column - Lateral Slide From Left */}
          <motion.div 
            variants={leftColumnVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-6"
          >
            {/* Header with ScrollWipeHeading */}
            <div className="mb-6 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.15] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                A Preferred
              </ScrollWipeHeading>
              <div className="pt-1.5 pb-2.5 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                Professional Habitat
              </div>
            </div>
            
            <motion.p 
              variants={textVariants}
              className="text-slate-600 dark:text-slate-300 font-normal text-sm sm:text-base md:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl"
            >
              At J Pan Tubular Components Limited, we believe our people are the precision behind 
              our products. We foster an environment of continuous learning, 
              where engineers, innovators, and operations experts collaborate 
              to redefine industrial excellence.
            </motion.p>
            
            {/* Distinct Cards with Perimeter Border Beam */}
            <motion.div variants={textVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Meritocracy Card */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 backdrop-blur-md group overflow-hidden shadow-sm hover:shadow-lg hover:border-[#2E5E99]/50 transition-all"
              >
                {/* Perimeter Glow Accent on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2E5E99] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7BA4D0]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 flex items-center justify-center shrink-0 border border-[#2E5E99]/20 dark:border-[#7BA4D0]/20 text-[#2E5E99] dark:text-[#7BA4D0] transition-colors duration-300 group-hover:bg-[#2E5E99] group-hover:text-white"
                  >
                    <Award className="w-5 h-5" strokeWidth={1.75} />
                  </motion.div>
                </div>
                
                <h4 className="text-xs sm:text-sm font-bold font-heading text-[#0D2440] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                  Meritocracy
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                  Performance-driven culture where excellence is always recognized.
                </p>
              </motion.div>

              {/* Innovation Lab Card */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0c1424] border border-slate-200/80 dark:border-white/10 backdrop-blur-md group overflow-hidden shadow-sm hover:shadow-lg hover:border-[#2E5E99]/50 transition-all"
              >
                {/* Perimeter Glow Accent on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2E5E99] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7BA4D0]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 flex items-center justify-center shrink-0 border border-[#2E5E99]/20 dark:border-[#7BA4D0]/20 text-[#2E5E99] dark:text-[#7BA4D0] transition-colors duration-300 group-hover:bg-[#2E5E99] group-hover:text-white"
                  >
                    <Zap className="w-5 h-5" strokeWidth={1.75} />
                  </motion.div>
                </div>
                
                <h4 className="text-xs sm:text-sm font-bold font-heading text-[#0D2440] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                  Innovation Lab
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                  Direct exposure to cutting-edge manufacturing technologies.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Floating Card Side: Lateral Slide from Right + Continuous Scroll Parallax */}
          <motion.div 
            variants={rightColumnVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: rightCardParallax }}
            className="lg:col-span-6 relative"
          >
            <div className="p-6 sm:p-10 md:p-12 lg:p-14 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0a182a] dark:via-[#0d223c] dark:to-[#091524] border border-[#7BA4D0]/40 dark:border-white/10 backdrop-blur-2xl relative overflow-hidden shadow-xl">
              {/* Subtle ambient light pool */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#7BA4D0]/20 to-transparent blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/10 border border-[#2E5E99]/20 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-inner">
                    <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 sm:mb-8 tracking-tight">
                  Growth Pathways
                </h3>
                
                <div className="space-y-5">
                  {/* Interactive Quote 01 */}
                  <div 
                    onMouseEnter={() => setActiveQuote(0)}
                    className={cn(
                      "p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-white/[0.05] border transition-all duration-300 cursor-default relative overflow-hidden group",
                      activeQuote === 0 
                        ? "border-[#2E5E99] shadow-md dark:border-[#7BA4D0]/60 bg-white dark:bg-white/[0.08]" 
                        : "border-[#7BA4D0]/20 dark:border-white/10 hover:border-[#2E5E99]/40"
                    )}
                  >
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2E5E99] to-[#7BA4D0] transition-opacity duration-300",
                      activeQuote === 0 ? "opacity-100" : "opacity-0"
                    )} />
                    <div className="flex gap-3 sm:gap-4 items-start pl-1">
                      <span className="font-heading text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-xs sm:text-sm mt-0.5 shrink-0">
                        01
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-normal leading-relaxed italic">
                        "Joining J Pan Tubular Components Limited was the catalyst for my technical growth. 
                        The mentorship here is truly institutional."
                      </p>
                    </div>
                  </div>

                  {/* Interactive Quote 02 */}
                  <div 
                    onMouseEnter={() => setActiveQuote(1)}
                    className={cn(
                      "p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-white/[0.05] border transition-all duration-300 cursor-default relative overflow-hidden group",
                      activeQuote === 1 
                        ? "border-[#2E5E99] shadow-md dark:border-[#7BA4D0]/60 bg-white dark:bg-white/[0.08]" 
                        : "border-[#7BA4D0]/20 dark:border-white/10 hover:border-[#2E5E99]/40"
                    )}
                  >
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2E5E99] to-[#7BA4D0] transition-opacity duration-300",
                      activeQuote === 1 ? "opacity-100" : "opacity-0"
                    )} />
                    <div className="flex gap-3 sm:gap-4 items-start pl-1">
                      <span className="font-heading text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-xs sm:text-sm mt-0.5 shrink-0">
                        02
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-normal leading-relaxed italic">
                        "We don't just build pipes; we build careers that 
                        stand the test of time and market cycles."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
