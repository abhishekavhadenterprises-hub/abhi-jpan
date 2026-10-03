"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function BlogHero() {
  return (
    <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center overflow-hidden bg-[#071321]">
      {/* Immersive Crystal-Clear Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/custom_manufacturing_bg.png" 
          alt="J Pan Tubular Components Limited Insights Hub"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-100 contrast-100"
        />
        {/* Soft, crystal-clear gradient scrims ensuring flawless visibility and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 via-transparent to-black/20 pointer-events-none" />
      </div>

      <div className="container-custom relative z-10 text-white w-full">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          {/* Subtle Category Kicker */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-0.5 bg-[#7BA4D0]" />
            <span className="text-[#7BA4D0] font-bold uppercase tracking-[0.25em] text-xs">
              Knowledge Hub & Insights
            </span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[4.25rem] font-heading font-black text-white leading-[1.08] tracking-tight"
          >
            Industry & <br />
            <span className="text-[#7BA4D0]">Technical Insights.</span>
          </motion.h1>

          <div className="w-24 h-px bg-white/20 my-4" />
          
          {/* Subtitle Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl font-normal"
          >
            Exploring the latest innovations in precision metallurgical engineering, automated manufacturing, and the future of mission-critical tubular components.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
