"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function PoliciesHero() {
  return (
    <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center overflow-hidden bg-[#071321]">
      {/* Immersive Crystal-Clear Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/industry-hvac.png" 
          alt="J Pan Corporate Policies and Governance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-100 contrast-100"
        />
        {/* Soft, crystal-clear gradient scrims ensuring flawless visibility and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 via-transparent to-black/20 pointer-events-none" />
      </div>

      <div className="container-custom relative z-10 text-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="h-0.5 w-10 bg-[#7BA4D0]" />
              <span className="text-[#7BA4D0] font-bold uppercase tracking-[0.25em] text-xs">
                GOVERNANCE & COMPLIANCE FRAMEWORK
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-[4.25rem] font-heading font-black text-white leading-[1.08] tracking-tight"
            >
              Corporate Policies & <br />
              <span className="text-[#7BA4D0]">Statutory Directives.</span>
            </motion.h1>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/20 lg:pl-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-base sm:text-lg text-white/85 font-normal leading-relaxed"
            >
              Defining our standards of integrity, ethics, and operational excellence. Explore our comprehensive repository of statutory rules and internal corporate guidelines aligned with SEBI and the Companies Act.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
