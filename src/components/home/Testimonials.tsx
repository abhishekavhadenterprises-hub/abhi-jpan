"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, animate, type Variants } from "framer-motion";
import { Award, Compass, Factory, ShieldCheck, Quote } from "lucide-react";

import { YoutubeBackground } from "@/components/shared/YoutubeBackground";

function AnimatedCounter({ to }: { to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    const node = nodeRef.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });
    return () => controls.stop();
  }, [isInView, to]);

  return <span ref={nodeRef} suppressHydrationWarning>0</span>;
}

const pillarContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const pillarItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-transparent text-[#0D2440] dark:text-white overflow-hidden border-b border-slate-200 dark:border-white/[0.08]"
    >
      <YoutubeBackground videoId="MPW60Fci930" />
      
      <div className="container-custom relative z-10 w-full">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase mb-8 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-cyan-400 animate-pulse shadow-[0_0_6px_#2E5E99] dark:shadow-[0_0_6px_#38bdf8]" />
          <span>07 // EXECUTIVE PERSPECTIVE & INTEGRITY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Editorial Portrait */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.12] group bg-slate-950 shadow-2xl"
            >
              <motion.div
                className="absolute w-full h-[112%] -top-[6%] left-0"
                style={{ y: imageY }}
              >
                <Image
                  src="/images/jignesh-panchal.png"
                  alt="Jignesh Panchal - Founder & Managing Director"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.06]"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/90 via-[#080c14]/20 to-transparent" />

              {/* Bottom Credential Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white flex items-center justify-between shadow-xl">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#2E5E99] dark:text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-cyan-400 animate-pulse shadow-[0_0_6px_#2E5E99] dark:shadow-[0_0_6px_#38bdf8]" />
                    ACADEMIC PEDIGREE
                  </div>
                  <div className="text-xs sm:text-sm font-heading font-bold text-white mt-0.5">
                    M.Tech Industrial Engineering
                  </div>
                </div>
                <div className="text-right border-l border-white/15 pl-4">
                  <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase">ALUMNI</div>
                  <div className="text-xs font-mono font-bold text-white">SOUTH KOREA</div>
                </div>
              </div>
            </motion.div>

            {/* Experience Ticker with Animated Counter */}
            <div className="mt-6 flex items-center gap-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-200 dark:border-white/[0.08] backdrop-blur-md">
              <div className="text-4xl font-heading font-black text-white tabular-nums flex items-center">
                <AnimatedCounter to={28} />
                <span className="text-[#2E5E99] dark:text-cyan-400">+</span>
              </div>
              <div className="border-l border-white/15 pl-4">
                <div className="text-xs font-heading font-bold text-white tracking-wider uppercase">
                  YEARS OF ENGINEERING TENURE
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-light">
                  Pioneering tubular manufacturing systems since 1998.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Pull-Quote & Pillars */}
          <div className="lg:col-span-7 pt-4 lg:pt-0 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#2E5E99] dark:text-cyan-400 font-mono text-xs uppercase tracking-widest">
                <Quote className="w-4 h-4 text-[#2E5E99] dark:text-cyan-400" />
                <span>EXECUTIVE DIRECTIVE</span>
              </div>
              <h2
                suppressHydrationWarning
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#111] dark:text-white tracking-tight leading-tight uppercase"
              >
                &ldquo;Every manufacturing process must begin and end with the customer&apos;s exacting standard.&rdquo;
              </h2>
            </div>

            {/* Narrative Quote */}
            <div className="pl-6 border-l-2 border-[#E5E5E5] dark:border-white/40 space-y-4">
              <p className="text-[#444] dark:text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                The evolution of global precision requirements has redefined what industrial partners demand. At J Pan, customer satisfaction is not a downstream checkpoint—it is the foundational constraint that governs our metallurgy, toolmaking, robotic bending, and zero-defect mass spectrometry testing.
              </p>
              <p className="text-[#666] dark:text-slate-300/80 text-sm sm:text-base leading-relaxed font-light">
                From our beginnings as a precision startup to a pan-India network of 6 advanced facilities, our growth has been driven by a relentless focus on engineering integrity and exceeding OEM tolerances.
              </p>
            </div>

            {/* Three Executive Pillars */}
            <motion.div
              variants={pillarContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-white/[0.08]"
            >
              <motion.div
                variants={pillarItem}
                className="p-4 rounded-xl bg-slate-950/40 border border-white/[0.06] hover:border-white/20 transition-all cursor-default group"
              >
                <ShieldCheck className="w-5 h-5 text-white mb-2 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-xs font-heading font-bold text-white uppercase tracking-wider mb-1">
                  Hitachi & LG Pedigree
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300/80 font-light leading-relaxed">
                  Multinational corporate discipline in lean process controls and automation.
                </p>
              </motion.div>

              <motion.div
                variants={pillarItem}
                className="p-4 rounded-xl bg-slate-950/40 border border-white/[0.06] hover:border-white/20 transition-all cursor-default group"
              >
                <Compass className="w-5 h-5 text-[#2E5E99] dark:text-cyan-400 mb-2 transition-transform duration-300 group-hover:rotate-45" />
                <div className="text-xs font-heading font-bold text-white uppercase tracking-wider mb-1">
                  South Korea M.Tech
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300/80 font-light leading-relaxed">
                  Postgraduate industrial engineering background driving global perspective.
                </p>
              </motion.div>

              <motion.div
                variants={pillarItem}
                className="p-4 rounded-xl bg-slate-950/40 border border-white/[0.06] hover:border-white/20 transition-all cursor-default group"
              >
                <Factory className="w-5 h-5 text-slate-600 dark:text-slate-300 mb-2 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-xs font-heading font-bold text-white uppercase tracking-wider mb-1">
                  6 Scale Facilities
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300/80 font-light leading-relaxed">
                  65k MT capacity deployed across strategic OEM production hubs.
                </p>
              </motion.div>
            </motion.div>

            {/* Signature Row */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xl font-heading font-black text-white">
                  Jignesh Panchal
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 tracking-wider">
                  Founder & Managing Director • J Pan Tubular Components Limited
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-200 bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-white/20">
                <Award className="w-4 h-4 text-[#2E5E99] dark:text-cyan-400" />
                <span>ISO 9001 & IATF 16949 LEADERSHIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
