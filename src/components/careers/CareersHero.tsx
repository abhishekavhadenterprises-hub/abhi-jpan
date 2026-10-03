"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CareersHero() {
  return (
    <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center overflow-hidden bg-[#071321]">
      {/* Immersive Crystal-Clear Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/job-detail-hero.png" 
          alt="J Pan Tubular Components Careers"
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
        <div className="max-w-3xl space-y-6">
          {/* Accent Category Tag */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="h-0.5 w-10 bg-[#7BA4D0]" />
            <span className="text-[#7BA4D0] font-bold uppercase tracking-[0.25em] text-xs">
              CAREERS AT J PAN
            </span>
          </motion.div>

          {/* Main H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[4.25rem] font-heading font-black text-white leading-[1.08] tracking-tight"
          >
            Forge Your Legacy <br />
            <span className="text-[#7BA4D0]">In Precision Engineering.</span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/85 font-normal leading-relaxed border-l-2 border-[#7BA4D0]/50 pl-5"
          >
            Shape the future of thermal and HVAC tubing with a team dedicated to engineering excellence, continuous innovation, and sustainable industrial growth.
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="pt-2"
          >
            <a 
              href="#openings" 
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#2E5E99] hover:bg-[#7BA4D0] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300"
            >
              <span>Explore Current Openings</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
