"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Preloader } from "./Preloader";
import SpotlightCard from "@/components/ui/SpotlightCard";

export function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const heroRef = React.useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAerialRevealed, setIsAerialRevealed] = useState(false);
  const aerialTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const triggerAerialReveal = React.useCallback(() => {
    // If already running, allow the 3-second smooth cycle to complete without glitching
    if (aerialTimerRef.current) return;

    setIsAerialRevealed(true);
    aerialTimerRef.current = setTimeout(() => {
      setIsAerialRevealed(false);
      aerialTimerRef.current = null;
    }, 3000);
  }, []);

  React.useEffect(() => {
    return () => {
      if (aerialTimerRef.current) {
        clearTimeout(aerialTimerRef.current);
        aerialTimerRef.current = null;
      }
    };
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty("--hero-x", `${x}px`);
    heroRef.current.style.setProperty("--hero-y", `${y}px`);
    if (!isHovered) setIsHovered(true);
  };

  return (
    <>
      {/* Executive Preloader */}
      <Preloader onCurtainComplete={() => setIsRevealed(true)} />

      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          triggerAerialReveal();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        className={`relative w-full transition-all duration-[1200ms] ease-in-out max-h-[1080px] pt-20 sm:pt-24 lg:pt-24 pb-4 sm:pb-6 flex flex-col justify-between bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] dark:from-[#0D2440] dark:via-[#091A2E] dark:to-[#0D2440] overflow-hidden z-20 border-b border-slate-200/90 dark:border-white/10 ${
          isAerialRevealed ? "h-[100vh] min-h-[760px]" : "h-[70vh] min-h-[760px]"
        }`}
      >
        {/* Background Visual: 70% visible unhovered, 100% full aerial facility on hover, fluid 3s cycle */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: isRevealed ? 1.0 : 1.05, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        >
          {/* Base Layer: Cleanroom CNC Manufacturing Floor - Visible at 70% when unhovered */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out will-change-[opacity] transform-gpu ${
              isAerialRevealed ? "opacity-0" : "opacity-70 dark:opacity-60"
            }`}
          >
            <Image
              src="/images/hero-light.png"
              alt="J Pan Tubular Precision Manufacturing Facility"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[1.02] contrast-[1.04]"
            />
          </div>

          {/* User's Aerial Facility Imagery - 100% visible on hover, smoothly flows for 3s then returns */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out will-change-[opacity] transform-gpu ${
              isAerialRevealed ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/images/jpan-facility-aerial.jpg"
              alt="J Pan Tubular Greater Noida Plant Aerial View"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[1.02] contrast-[1.06]"
            />
          </div>

          {/* Minimal Architectural Readability Gradients - Light & non-intrusive */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out will-change-[opacity] ${
              isAerialRevealed ? "opacity-15" : "opacity-35"
            } bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/55 to-transparent dark:from-[#0D2440] dark:via-[#0D2440]/55 dark:to-transparent`}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out will-change-[opacity] ${
              isAerialRevealed ? "opacity-10" : "opacity-25"
            } bg-gradient-to-b from-transparent via-transparent to-[#F1F5F9]/80 dark:to-[#0D2440]/80`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,94,153,0.12),transparent_65%)]" />
        </motion.div>

        {/* Dynamic Interactive Hero Spotlight Glow - tracks cursor across the whole section */}
        <div
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle 520px at var(--hero-x, 50%) var(--hero-y, 50%), rgba(46, 94, 153, 0.20), transparent 75%)",
          }}
        />

        {/* Subtle Architectural Corner Registration Crosshairs */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
          <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1640px] mx-auto h-full relative">
            <span className="absolute top-24 left-2 text-[#2E5E99]/40 font-mono text-xs">+</span>
            <span className="absolute top-24 right-2 text-[#2E5E99]/40 font-mono text-xs">+</span>
            <span className="absolute bottom-6 left-2 text-[#2E5E99]/40 font-mono text-xs">+</span>
            <span className="absolute bottom-6 right-2 text-[#2E5E99]/40 font-mono text-xs">+</span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto py-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-between">
            {/* Left Column: Monumental Clean Headline & Narrative */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={isRevealed ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/10 border border-slate-200/90 dark:border-white/15 mb-3 sm:mb-4 backdrop-blur-md shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] shadow-[0_0_6px_#2E5E99]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#0D2440] dark:text-slate-200 font-bold">
                    PRECISION TUBULAR ENGINEERING
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem] 2xl:text-[5rem] font-heading font-black tracking-tight leading-[0.96] text-[#0D2440] dark:text-white uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Precision in <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D2440] via-[#1E3A8A] to-[#2E5E99] dark:from-white dark:via-slate-200 dark:to-slate-400">
                    every bend.
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={isRevealed ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                className="mt-4 sm:mt-5 max-w-2xl"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#2E5E99] dark:text-slate-600 dark:text-slate-300 tracking-wide mb-2 sm:mb-3">
                  Under extreme pressure.
                </h2>
                <p className="text-xs sm:text-sm md:text-[15px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                  A <strong className="text-[#0D2440] dark:text-white font-semibold">precision tubular engineering partner</strong>. Fabricating custom copper, brass, and steel assemblies for <strong className="text-[#0D2440] dark:text-white font-semibold">global HVAC, automotive, and industrial OEMs</strong> — delivering zero-defect reliability across every shipment.
                </p>
              </motion.div>

              {/* Minimalist Executive Buttons Suite */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={isRevealed ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
                className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3.5"
              >
                {/* Primary Pill: Executive Royal Navy */}
                <Link
                  href="/products"
                  className="group relative px-7 py-3.5 rounded-full bg-[#0D2440] hover:bg-[#2E5E99] text-white font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_12px_30px_rgba(13,36,64,0.22)] active:scale-95 inline-flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Explore Products</span>
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>

                {/* Secondary Pill: Crisp Frosted Architectural Capsule */}
                <Link
                  href="/about#infrastructure"
                  onMouseEnter={triggerAerialReveal}
                  className="group px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0D2440] border border-slate-300/80 hover:border-[#2E5E99] dark:bg-white/10 dark:text-white dark:border-white/20 backdrop-blur-xl font-heading font-semibold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <span>Our Capabilities</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] group-hover:scale-125 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Industrial Sector Dossier & Reference Watermark */}
            <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end self-stretch pt-2 lg:pt-0">
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={isRevealed ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="w-full lg:w-auto"
              >
                <SpotlightCard
                  className="w-full lg:w-auto p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_20px_50px_rgba(13,36,64,0.06)] dark:shadow-2xl group transition-all duration-300 hover:shadow-2xl hover:border-[#2E5E99]/50"
                  spotlightColor="rgba(46, 94, 153, 0.28)"
                  zoomOnHover
                >
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#2E5E99] font-bold mb-3 pb-2 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <span>INDUSTRIAL SECTORS</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:bg-[#2E5E99]/10 group-hover:text-[#2E5E99] transition-colors">
                      TIER-1 AUDITED
                    </span>
                  </div>
                  <div className="flex flex-col space-y-2.5 font-mono text-xs tracking-wider text-slate-600 dark:text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-between gap-8 p-1.5 rounded-lg hover:bg-slate-50/90 dark:hover:bg-white/5 transition-all duration-200 cursor-default group/item hover:translate-x-1.5">
                      <span className="text-slate-500 dark:text-slate-400 group-hover/item:text-[#2E5E99] font-bold transition-colors">01 //</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover/item:text-[#0D2440] dark:group-hover/item:text-white group-hover/item:scale-105 transition-all duration-200 origin-right inline-block">
                        HVAC Systems
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-8 p-1.5 rounded-lg hover:bg-slate-50/90 dark:hover:bg-white/5 transition-all duration-200 cursor-default group/item hover:translate-x-1.5">
                      <span className="text-slate-500 dark:text-slate-400 group-hover/item:text-[#2E5E99] font-bold transition-colors">02 //</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover/item:text-[#0D2440] dark:group-hover/item:text-white group-hover/item:scale-105 transition-all duration-200 origin-right inline-block">
                        Automotive OEM
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-8 p-1.5 rounded-lg hover:bg-slate-50/90 dark:hover:bg-white/5 transition-all duration-200 cursor-default group/item hover:translate-x-1.5">
                      <span className="text-slate-500 dark:text-slate-400 group-hover/item:text-[#2E5E99] font-bold transition-colors">03 //</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover/item:text-[#0D2440] dark:group-hover/item:text-white group-hover/item:scale-105 transition-all duration-200 origin-right inline-block">
                        Industrial Piping
                      </span>
                    </div>
                  </div>
                </SpotlightCard>

                {/* Interactive Facility Aerial Showcase Card */}
                <div
                  onMouseEnter={triggerAerialReveal}
                  onClick={triggerAerialReveal}
                  className="group/facility relative mt-3 w-full p-2 rounded-2xl bg-white/90 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden">
                    <Image
                      src="/images/jpan-facility-aerial.jpg"
                      alt="J Pan Greater Noida Manufacturing Plant"
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover/facility:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/85 via-[#0D2440]/25 to-transparent transition-opacity duration-300 group-hover/facility:opacity-70" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white font-mono text-[10px]">
                      <span className="font-bold flex items-center gap-1.5 drop-shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        PLANT VI // GREATER NOIDA
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-white/95 bg-white/20 group-hover/facility:bg-white/35 px-2 py-0.5 rounded-full backdrop-blur-md transition-colors">
                        Hover to inspect
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Reference Script Watermark: precision engineering */}
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={isRevealed ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
                className="font-serif italic text-2xl sm:text-3xl text-slate-600 dark:text-slate-300/70 dark:text-white/20 tracking-wide select-none pt-4 lg:pt-3 text-right"
              >
                precision engineering
              </motion.div>
            </div>
          </div>
        </div>


      </section>
    </>
  );
}

export default Hero;
