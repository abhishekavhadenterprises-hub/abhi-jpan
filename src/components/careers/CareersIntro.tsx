"use client";

import React, { useRef } from "react";
import { Award, Briefcase, Zap, Sparkles } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

export function CareersIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 dark:from-[#070b14] dark:via-[#0c1424] dark:to-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Side */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-6"
          >
            <motion.h2 
              variants={textVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-[1.18] tracking-tight overflow-visible"
            >
              <span className="inline-block">A Preferred</span> <br />
              <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light">
                Professional Habitat
              </span>
            </motion.h2>
            
            <motion.p 
              variants={textVariants}
              className="text-slate-600 dark:text-slate-300 font-normal text-base md:text-lg mb-10 leading-relaxed max-w-xl"
            >
              At J Pan Tubular Components Limited, we believe our people are the precision behind 
              our products. We foster an environment of continuous learning, 
              where engineers, innovators, and operations experts collaborate 
              to redefine industrial excellence.
            </motion.p>
            
            <motion.div variants={textVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-md hover:border-[#2E5E99]/40 transition-all duration-300 group flex items-start gap-4 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 flex items-center justify-center shrink-0 border border-[#2E5E99]/20 dark:border-[#7BA4D0]/20 text-[#2E5E99] dark:text-[#7BA4D0] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white">
                    <Award className="w-5 h-5 transition-transform duration-300" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1.5 group-hover:text-[#2E5E99] transition-colors duration-300">Meritocracy</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">Performance-driven culture where excellence is always recognized.</p>
                  </div>
               </div>

               <div className="p-5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-md hover:border-[#2E5E99]/40 transition-all duration-300 group flex items-start gap-4 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 flex items-center justify-center shrink-0 border border-[#2E5E99]/20 dark:border-[#7BA4D0]/20 text-[#2E5E99] dark:text-[#7BA4D0] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white">
                    <Zap className="w-5 h-5 transition-transform duration-300" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1.5 group-hover:text-[#2E5E99] transition-colors duration-300">Innovation Lab</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">Direct exposure to cutting-edge manufacturing technologies.</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>

          {/* Right Floating Card Side: Light Luxury Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0a182a] dark:via-[#0d223c] dark:to-[#091524] border border-[#7BA4D0]/35 dark:border-white/10 backdrop-blur-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/10 border border-[#2E5E99]/20 dark:border-white/15 flex items-center justify-center mb-8 text-[#2E5E99] dark:text-[#7BA4D0]">
                    <Briefcase className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#0D2440] dark:text-white mb-8 tracking-tight">
                    Growth Pathways
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.05] border border-[#7BA4D0]/20 dark:border-white/10 flex gap-5 items-start transition-all duration-300">
                       <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-lg font-heading mt-0.5 shrink-0">/01</span>
                       <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed italic border-l-2 border-[#2E5E99]/30 pl-4">
                         "Joining J Pan Tubular Components Limited was the catalyst for my technical growth. 
                         The mentorship here is truly institutional."
                       </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.05] border border-[#7BA4D0]/20 dark:border-white/10 flex gap-5 items-start transition-all duration-300">
                       <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold text-lg font-heading mt-0.5 shrink-0">/02</span>
                       <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed italic border-l-2 border-[#2E5E99]/30 pl-4">
                         "We don't just build pipes; we build careers that 
                         stand the test of time and market cycles."
                       </p>
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
