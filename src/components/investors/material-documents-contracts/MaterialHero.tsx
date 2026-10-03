"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function MaterialHero() {
  return (
    <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center overflow-hidden bg-[#071321]">
      {/* Immersive Crystal-Clear Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/custom-engineering.png" 
          alt="Material Documents & Contracts"
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
              STATUTORY DISCLOSURES & SEBI COMPLIANCE
            </span>
          </motion.div>

          {/* Main H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[4.25rem] font-heading font-black text-white leading-[1.08] tracking-tight"
          >
            Material Documents & <br />
            <span className="text-[#7BA4D0]">Corporate Contracts.</span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/85 font-normal leading-relaxed border-l-2 border-[#7BA4D0]/50 pl-5"
          >
            Authoritative disclosures of key corporate agreements, constitutional documents, and material contracts, maintained in strict accordance with SEBI (LODR) Regulations.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
