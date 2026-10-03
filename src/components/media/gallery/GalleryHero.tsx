"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function GalleryHero() {
  return (
    <section className="relative min-h-[82vh] lg:min-h-[86vh] pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-16 sm:pb-20 md:pb-24 flex flex-col items-center justify-center overflow-hidden bg-[#E8F1FA] dark:bg-[#071321] transition-colors duration-300">
      {/* Subtle Horizontal Paper Ruling Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-10" 
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 96px, rgba(46,94,153,0.08) 96px, rgba(46,94,153,0.08) 97px)",
          backgroundSize: "100% 97px"
        }} 
      />

      <div className="container-custom relative z-10 w-full my-auto">
        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Main Editorial Display Typography */}
          <div className="select-none tracking-tight font-heading font-black text-[#0D2440] dark:text-white leading-[0.92] text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.5rem]">
            
            {/* Line 1: we [image *] forge [doorway illustration] */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-1 sm:mb-3">
              <span className="font-light tracking-normal lowercase">we</span>
              
              {/* Floating Landscape Image Card with Asterisk Badge */}
              <div className="relative inline-block w-36 sm:w-52 md:w-64 lg:w-72 h-20 sm:h-28 md:h-36 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-white dark:border-white/10 group -translate-y-1 sm:-translate-y-2">
                <Image
                  src="/images/about-manufacturing.png"
                  alt="J Pan Advanced Manufacturing Facility"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Asterisk Badge */}
                <div className="absolute top-2 left-2.5 sm:top-3 sm:left-3 z-10 text-white font-serif text-2xl sm:text-3xl font-black leading-none">
                  <span className="text-[#7BA4D0]">*</span>
                </div>
              </div>

              <span className="font-medium tracking-tight">tell</span>

              {/* Minimalist Factory Portal / Doorway Line Art Illustration */}
              <div className="hidden sm:inline-flex items-center ml-1 md:ml-3 align-top translate-y-1 text-[#2E5E99] dark:text-[#7BA4D0]">
                <svg className="w-10 h-14 md:w-12 md:h-18" viewBox="0 0 48 72" fill="none" stroke="currentColor">
                  {/* Outer Door Frame */}
                  <rect x="4" y="6" width="40" height="62" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Angled Open Door */}
                  <path d="M4 6 L32 18 L32 68 L4 68 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="2.5" strokeLinejoin="round" />
                  {/* Precision Sparkles on Top */}
                  <circle cx="36" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="42" cy="12" r="1" fill="currentColor" />
                  {/* Walking Figure Silhouette */}
                  <path d="M18 42 L24 38 L24 54 M20 54 L20 64 M26 54 L28 64 M24 34 A2 2 0 1 0 24 30 A2 2 0 1 0 24 34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Line 2: untold */}
            <div className="my-1 sm:my-2">
              <span className="block font-medium tracking-tighter">untold</span>
            </div>

            {/* Line 3: ( [Fanned Photo Stack] ) stories */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-1 sm:mt-2">
              <span className="font-light text-black/40 dark:text-white/40 tracking-widest">(</span>
              
              {/* Fanned Stack of Physical Photographs */}
              <div className="relative inline-flex items-center justify-center w-28 sm:w-40 md:w-48 h-20 sm:h-28 md:h-36 mx-1 sm:mx-3">
                {/* Photo 1: Left Tilted */}
                <div className="absolute w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 -rotate-12 -translate-x-3 sm:-translate-x-5 rounded-lg sm:rounded-xl overflow-hidden border-2 sm:border-3 border-white dark:border-white/20 bg-slate-200 dark:bg-[#0D2440]">
                  <Image
                    src="/images/product-1.png"
                    alt="Precision Engineered Component"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Photo 2: Right Tilted */}
                <div className="absolute w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 rotate-12 translate-x-3 sm:translate-x-5 rounded-lg sm:rounded-xl overflow-hidden border-2 sm:border-3 border-white dark:border-white/20 bg-slate-200 dark:bg-[#0D2440]">
                  <Image
                    src="/images/about-snapshot.png"
                    alt="Advanced Robotics Manufacturing"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Photo 3: Center Front */}
                <div className="relative w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 -rotate-2 rounded-lg sm:rounded-xl overflow-hidden border-2 sm:border-3 border-white dark:border-white/30 z-10 bg-slate-200 dark:bg-[#0D2440]">
                  <Image
                    src="/images/quality-hero-cinematic.jpg"
                    alt="Sub-micron Metrology & Inspection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <span className="font-light text-black/40 dark:text-white/40 tracking-widest">)</span>
              <span className="font-light tracking-tight lowercase">stories</span>
            </div>

          </div>

          {/* Bottom Row: Call to Action + Editorial Narrative Shelf */}
          <div className="w-full mt-10 sm:mt-14 lg:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 pt-4">
            
            {/* Center-Left Action Button */}
            <div className="flex-1 flex justify-center md:justify-start">
              <Link
                href="#gallery-feed"
                className="group inline-flex items-center gap-3.5 px-9 sm:px-11 py-4 sm:py-5 bg-[#2E5E99] hover:bg-[#0D2440] text-white font-bold text-xs sm:text-sm uppercase tracking-[0.22em] rounded-full transition-all duration-300 hover:scale-105"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#7BA4D0] group-hover:scale-125 transition-transform" />
                <span>Explore Gallery</span>
              </Link>
            </div>

            {/* Right Annotation Note matching reference */}
            <div className="flex-1 max-w-md text-center md:text-left">
              <p className="text-xs sm:text-[14px] md:text-[15px] text-[#0D2440]/80 dark:text-silver/90 leading-relaxed font-normal">
                <span className="font-bold text-[#2E5E99] dark:text-[#7BA4D0] mr-1.5 text-sm sm:text-base">(*)</span>
                A visual journey across 6 automated plants, zero-defect metallurgical engineering, and 28+ years of mission-critical tubular excellence.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Far Right Vertical Scroll Indicator matching reference */}
      <div className="hidden lg:flex fixed right-8 bottom-12 flex-col items-center gap-3 z-30 pointer-events-none select-none">
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#0D2440]/50 dark:text-white/50 uppercase [writing-mode:vertical-lr]">
          SCROLL TO DISCOVER
        </span>
        <div className="w-8 h-8 rounded-full border border-[#0D2440]/20 dark:border-white/20 flex items-center justify-center text-[#0D2440]/60 dark:text-white/60">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
