"use client";

import React from "react";
import Image from "next/image";
import { Mic2, Radio, Activity } from "lucide-react";

export function AudioHero() {
  return (
    <section className="relative h-[45vh] min-h-[450px] flex items-center overflow-hidden bg-charcoal">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/audio-abstract.png" 
          alt="J Pan Tubular Components Limited Call Audio Recordings"
          fill
          priority
          className="object-cover object-center opacity-30 grayscale brightness-75 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent dark:from-black dark:via-black/95 dark:to-transparent" />
      </div>

      {/* Dynamic Soundwave Overlay (Static SVG for aesthetics) */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-10 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60C120 40 240 80 360 60C480 40 600 80 720 60C840 40 960 80 1080 60C1200 40 1320 80 1440 60V120H0V60Z" fill="url(#wave_grad)" />
            <defs>
               <linearGradient id="wave_grad" x1="720" y1="60" x2="720" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
               </linearGradient>
            </defs>
         </svg>
      </div>

      {/* Institutional Accents */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold/30 via-transparent to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[45%] bg-white/2 skew-x-[-15deg] translate-x-1/4 border-l border-white/5" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
              <Mic2 className="w-5 h-5 text-gold" />
            </div>
            <div className="h-px w-12 bg-gold/30" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">Investor Communications</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-heading font-bold mb-8 leading-[1.1] text-white animate-in fade-in slide-in-from-left duration-1000 delay-100">
            Call Audio <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver via-white to-gold">Recordings</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-12 animate-in fade-in slide-in-from-left duration-1000 delay-200">
            <p className="text-xl text-silver/40 leading-relaxed max-w-xl">
              Access an authoritative repository of earnings calls, 
              analyst meets, and investor dialogues, preserving the 
              acoustic integrity of our corporate narrative.
            </p>
            
            <div className="flex items-center gap-8 border-l border-white/10 pl-12 hidden lg:flex">
               <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                     <Activity className="w-4 h-4 text-gold" />
                     <span className="text-white font-bold text-2xl tracking-tighter">HD</span>
                  </div>
                  <span className="text-[9px] text-silver/30 uppercase tracking-widest font-bold">Studio Quality</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-white font-bold text-3xl mb-1 tracking-tighter">Live</span>
                  <span className="text-[9px] text-silver/30 uppercase tracking-widest font-bold">Updated Q3</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Design Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <span className="text-[8px] font-bold text-gold uppercase tracking-[0.5em] rotate-90 origin-left translate-x-2 mb-10">Soundscape</span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>
    </section>
  );
}
