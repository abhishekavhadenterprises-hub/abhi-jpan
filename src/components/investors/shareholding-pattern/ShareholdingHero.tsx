"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp, PieChart, ShieldCheck } from "lucide-react";

export function ShareholdingHero() {
  return (
    <section className="relative h-[45vh] min-h-[450px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/financial-abstract.png" 
          alt="J Pan Tubular Components Limited Shareholding Pattern"
          fill
          priority
          className="object-cover object-center opacity-30 grayscale brightness-75 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-transparent dark:from-black dark:via-black/95 dark:to-transparent" />
      </div>

      {/* Institutional Accents */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 right-0 w-[40%] h-full bg-white/2 skew-x-[-20deg] translate-x-1/3 border-l border-white/5" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
              <PieChart className="w-5 h-5 text-gold" />
            </div>
            <div className="h-px w-12 bg-gold/30" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">Investor Relations</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-heading font-bold mb-8 leading-[1.1] text-white animate-in fade-in slide-in-from-left duration-1000 delay-100">
            Shareholding <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver via-white to-gold">Pattern</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-12 animate-in fade-in slide-in-from-left duration-1000 delay-200">
            <p className="text-xl text-silver/40 leading-relaxed max-w-xl">
              An institutional overview of J Pan Tubular Components Limited's ownership 
              structure, reflecting our commitment to transparent 
              capital allocation and corporate governance.
            </p>
            
            <div className="flex items-center gap-6 border-l border-white/10 pl-12 hidden lg:flex">
              <div className="flex flex-col">
                <span className="text-gold font-bold text-3xl mb-1 tracking-tighter">100%</span>
                <span className="text-[9px] text-silver/30 uppercase tracking-widest font-bold">Transparency</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-3xl mb-1 tracking-tighter">NSE/BSE</span>
                <span className="text-[9px] text-silver/30 uppercase tracking-widest font-bold">Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Design Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <span className="text-[8px] font-bold text-gold uppercase tracking-[0.5em] rotate-90 origin-left translate-x-2 mb-10">Repository</span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>
    </section>
  );
}
