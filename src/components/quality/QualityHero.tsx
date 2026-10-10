"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const qualitySlides = [
  {
    id: "metrology",
    title: "METROLOGY",
    subtitle: "Sub-Micron Calibration",
    headline: ["PRECISION", "BEYOND", "LIMITS"],
    description:
      "IATF 16949 & ISO 9001:2015 accredited zero-defect metallurgical manufacturing for global automotive, HVAC, and industrial leaders.",
    image: "/images/quality-hero-cinematic.jpg",
    targetId: "testing-facilities",
  },
  {
    id: "inspection",
    title: "INSPECTION",
    subtitle: "Zero-Defect Stream",
    headline: ["ZERO DEFECT", "OPTICAL", "INSPECTION"],
    description:
      "Comprehensive spectrometry, high-pressure hydro-testing rigs, and micron-level optical inspection for zero leakage across every batch.",
    image: "/images/about-manufacturing.png",
    targetId: "process",
  },
  {
    id: "standards",
    title: "STANDARDS",
    subtitle: "Global Accreditations",
    headline: ["WORLD-CLASS", "QUALITY", "STANDARDS"],
    description:
      "Certified benchmark excellence spanning IATF 16949, ISO 9001:2015, ISO 14001, and MSME ZED Gold sustainable metallurgical manufacturing.",
    image: "/images/infrastructure.png",
    targetId: "certifications",
  },
];

export function QualityHero() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatic slide rotation: changes background image every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % qualitySlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = qualitySlides[activeSlideIndex];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16"
    >
      {/* 
        ========================================================================
        CRYSTAL-CLEAR MAIN BACKGROUND IMAGE (Cross-fades to the active card's image)
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full origin-center"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority
              quality={95}
              className="object-cover object-center brightness-95 contrast-[1.05]"
            />
            {/* Subtle gentle vignette on left to ensure glass text legibility without muddying the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 
        ========================================================================
        HERO CONTENT CONTAINER
        ========================================================================
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-end lg:justify-center my-auto pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          
          {/* 
            ====================================================================
            1. MAIN GLASSMORPHISM CARD (Left Side - Slide + Blur Card Reveal)
            Inspired directly by the provided image system
            ====================================================================
          */}
          <motion.div
            initial={{ x: -80, opacity: 0, scale: 0.94, filter: "blur(14px)" }}
            animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 xl:col-span-5 rounded-[32px] sm:rounded-[38px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/50 dark:border-white/25 p-8 sm:p-10 md:p-12 shadow-2xl shadow-black/25 flex flex-col justify-between gap-6 sm:gap-7 relative overflow-hidden group/maincard"
          >
            {/* Ambient Refraction Glow */}
            <div className="absolute -top-24 -left-24 w-56 h-56 bg-white/20 rounded-full blur-2xl pointer-events-none" />

            {/* Headline with Smooth Crossfade Transition */}
            <div className="space-y-1 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white leading-[0.98] tracking-tight uppercase drop-shadow-md"
                >
                  {activeSlide.headline[0]} <br />
                  {activeSlide.headline[1]} <br />
                  {activeSlide.headline[2]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description Text */}
            <div className="min-h-[60px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/90 text-sm sm:text-base leading-relaxed font-normal drop-shadow-sm max-w-md"
                >
                  {activeSlide.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Outlined Pill Action Button: Matching "GET STARTED" */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => scrollToSection(activeSlide.targetId)}
                className="group px-8 py-3.5 rounded-full border border-white/70 bg-white/10 hover:bg-white text-white hover:text-[#0D2440] text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-lg flex items-center gap-2.5 cursor-pointer hover:shadow-2xl hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden xl:block xl:col-span-1" />

          {/* 
            ====================================================================
            2. BOTTOM-RIGHT GLASSMORPHIC PREVIEW CARDS
            - Generous column width so the first card is never cut off
            - Clicking any card projects its crystal-clear image to the main Hero
            - Active card has a glowing border and subtle lift
            ====================================================================
          */}
          <div
            className="lg:col-span-6 xl:col-span-6 flex items-center justify-start lg:justify-end gap-3.5 sm:gap-4 overflow-visible w-full py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {qualitySlides.map((card, idx) => {
              const isActive = idx === activeSlideIndex;

              return (
                <motion.div
                  key={card.id}
                  initial={{ y: 75, opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.45 + idx * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  }}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`group relative w-[130px] sm:w-[150px] md:w-[165px] h-[180px] sm:h-[210px] md:h-[235px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden p-3 sm:p-4 flex flex-col justify-between shadow-xl cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "ring-2 ring-white border-2 border-white/90 scale-[1.04] shadow-2xl shadow-black/40 bg-white/30 dark:bg-black/40 backdrop-blur-xl"
                      : "border border-white/40 dark:border-white/20 bg-white/20 dark:bg-black/30 backdrop-blur-lg opacity-85 hover:opacity-100 shadow-black/20"
                  }`}
                >
                  {/* Background Card Preview Image */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 150px, 175px"
                    className={`object-cover object-center transition-transform duration-700 ease-out ${
                      isActive ? "scale-108 brightness-95" : "brightness-[0.78] group-hover:scale-108"
                    }`}
                  />

                  {/* Frosted Bottom Vignette for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Corner Action Indicator */}
                  <div className="relative z-10 flex items-center justify-end w-full">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-white text-[#0D2440] shadow-md"
                          : "bg-white/20 backdrop-blur-md border border-white/40 text-white opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Card Title & Spec */}
                  <div className="relative z-10 pt-2">
                    <h3 className="text-xs sm:text-sm font-heading font-black text-white uppercase tracking-wider leading-tight drop-shadow-md">
                      {card.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-white/80 font-sans line-clamp-1 mt-0.5 font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
