"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking when scrolling through the hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-end overflow-hidden select-none"
    >
      {/* 
        ========================================================================
        FULL-BLEED REVEAL: Edge-to-Edge Image (Zero Outer Black Margins/Padding)
        The pill blossoms from the center until it covers 100% of the screen!
        ========================================================================
      */}
      <motion.div
        initial={{
          clipPath: "inset(49% 49% 49% 49% round 140px)",
          opacity: 0,
        }}
        animate={{
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          opacity: 1,
        }}
        transition={{
          duration: 2.0,
          delay: 0.15,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="absolute inset-0 w-full h-full overflow-hidden z-0"
      >
        {/* Crystal-Clear Image: Full Width & Full Height */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.0 }}
          transition={{
            duration: 3.2,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <Image
            src="/images/about-hero-new.png"
            alt="J-Pan Precision Metallurgy & Engineering"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-100 contrast-[1.03] saturate-[1.02]"
          />
        </motion.div>

        {/* Soft Bottom & Top Scrims Only - Ensuring 100% Visual Clarity with Readable Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-45% to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />
      </motion.div>

      {/* 
        ========================================================================
        HERO CONTENT: Full-Width Container Flush to Base
        ========================================================================
      */}
      <motion.div
        style={{ opacity: contentFade, y: contentY }}
        className="container-custom relative z-10 w-full pb-10 sm:pb-14 md:pb-16 pt-32 sm:pt-40"
      >
        {/* Main Hero Headline with Masked Line Rise */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-heading font-black text-white leading-[1.12] sm:leading-[1.08] lg:leading-[1.04] tracking-[-0.03em] text-balance">
            {/* Line 1: Masked rise */}
            <span className="block overflow-hidden pt-1 pb-3 -mb-3 pr-4">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.95, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block pb-1"
              >
                Precision Engineering.
              </motion.span>
            </span>

            {/* Line 2: Masked rise with generous padding so p, y, g descenders never cut off */}
            <span className="block overflow-hidden pt-1 pb-6 -mb-6 pr-6">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.95, delay: 1.68, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block font-serif italic font-normal text-[#7BA4D0] pb-3 pr-4"
              >
                Shaped by Heritage.
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Bottom Bar: Editorial Split (Description Left, Action Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pt-5 sm:pt-6 border-t border-white/20">
          {/* Description Paragraph (Verbatim Copy Preserved) */}
          <div className="lg:col-span-8 overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.82, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-200/95 font-sans text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl text-pretty drop-shadow-sm"
            >
              J-Pan believes precision engineering should feel effortless over time, delivering mission-critical tubular components shaped by metallurgical mastery, advanced automation, and an uncompromising standard of zero-defect quality.
            </motion.p>
          </div>

          {/* Right Action & Directional Anchor (Elastic Pop at 1.95s) */}
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-3.5">
            <motion.a
              href="#our-story"
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.95, ease: [0.34, 1.56, 0.64, 1] }}
              className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white text-[#040810] hover:bg-[#EBF3FC] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 cursor-pointer shadow-md"
            >
              <span>Explore Journey</span>
              <div className="w-6 h-6 rounded-lg bg-[#040810]/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-[#040810]" />
              </div>
            </motion.a>

            <motion.a
              href="#vision-mission"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.12] hover:bg-white/[0.22] border border-white/25 text-white hover:text-white transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-xl cursor-pointer shadow-sm"
              title="Vision & Mission"
            >
              <Compass className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
