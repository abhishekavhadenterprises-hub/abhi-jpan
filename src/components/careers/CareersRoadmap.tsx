"use client";

import React, { useRef } from "react";
import { Users, CheckCircle, Search, ArrowRight, UserPlus, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, useInView, Variants } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Discovery & Apply",
    description: "Explore our open segments and submit your digital portfolio for evaluation."
  },
  {
    icon: Users,
    title: "Institutional Interview",
    description: "Engage with our technical and operations teams for core-competency assessment."
  },
  {
    icon: CheckCircle,
    title: "Final Selection",
    description: "Authoritative verification of credentials and professional onboarding alignment."
  }
];

export function CareersRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Journey Timeline scroll-responsive animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 40%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-32 bg-white dark:bg-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.12] mb-6 tracking-tight overflow-visible">
            <span className="inline-block">Your Journey to</span> <br />
            <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light">
              Professional Legacy
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg leading-relaxed max-w-2xl">
            Our high-precision hiring process ensures that we identify and 
            onboard individuals who resonate with J Pan Tubular's core 
            competencies and institutional values.
          </p>
        </motion.div>

        {/* Roadmap Timeline with Scroll-Responsive Journey Path */}
        <div className="relative mb-20 md:mb-28">
          {/* Connecting Line (Desktop Horizontal) */}
          <div className="absolute top-12 left-12 right-12 h-[3px] bg-slate-200/80 dark:bg-white/10 hidden lg:block rounded-full" />
          <motion.div 
            className="absolute top-12 left-12 h-[3px] bg-gradient-to-r from-[#2E5E99] via-[#4F86C6] to-[#7BA4D0] hidden lg:block rounded-full origin-left" 
            style={{ width: lineWidth, maxWidth: "calc(100% - 96px)" }}
          />
          
          {/* Connecting Line (Mobile Vertical) */}
          <div className="absolute top-8 bottom-8 left-12 w-[3px] bg-slate-200/80 dark:bg-white/10 lg:hidden rounded-full -translate-x-1/2" />
          <motion.div 
            className="absolute top-8 left-12 w-[3px] bg-gradient-to-b from-[#2E5E99] via-[#4F86C6] to-[#7BA4D0] lg:hidden rounded-full origin-top -translate-x-1/2" 
            style={{ height: lineHeight }}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={stepVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                className="relative flex flex-row lg:flex-col items-center lg:items-center gap-6 lg:gap-0 lg:text-center group"
              >
                {/* Step Circle Node */}
                <div className="w-24 h-24 shrink-0 bg-white dark:bg-[#0c1527] border-2 border-slate-200/90 dark:border-white/15 rounded-full flex items-center justify-center relative mb-0 lg:mb-8 transition-all duration-300 z-10 group-hover:-translate-y-1.5 group-hover:border-[#2E5E99] cursor-default">
                   {/* Badge Index */}
                   <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#0D2440] dark:bg-white text-white dark:text-[#0D2440] flex items-center justify-center rounded-full font-heading font-bold text-xs group-hover:bg-[#2E5E99] group-hover:text-white transition-colors duration-300">
                      0{idx + 1}
                   </div>
                   <step.icon className="w-8 h-8 text-[#2E5E99] dark:text-[#7BA4D0] transition-all duration-300 group-hover:scale-110" strokeWidth={1.75} />
                </div>

                <div className="flex-1 lg:flex-initial">
                  <h4 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                     {step.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed lg:max-w-[300px] lg:mx-auto">
                     {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner (Redesigned from bg-charcoal to Light Luxury Card) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0a182a] dark:via-[#0d223c] dark:to-[#091524] border border-[#7BA4D0]/35 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden group"
        >
           <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/10 border border-[#2E5E99]/20 dark:border-white/15 flex items-center justify-center shrink-0 text-[#2E5E99] dark:text-[#7BA4D0]">
                 <UserPlus className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <div>
                 <h5 className="text-sm font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">Onboarding Support</h5>
                 <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">Dedicated assistance for international candidates.</p>
              </div>
           </div>
           
           <button 
             onClick={() => {
               const elem = document.getElementById("openings");
               if (elem) {
                 elem.scrollIntoView({ behavior: 'smooth' });
               } else {
                 window.location.href = "/careers#openings";
               }
             }}
             className="relative z-10 px-7 py-3.5 bg-[#0D2440] hover:bg-[#1A365D] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0D2440] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 shrink-0 cursor-pointer group/btn"
           >
             <span>Career FAQs</span>
             <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2} />
           </button>
        </motion.div>
      </div>
    </section>
  );
}
