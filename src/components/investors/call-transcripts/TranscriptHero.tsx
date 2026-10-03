"use client";

import React from "react";
import Image from "next/image";
import { FileText, Archive, AlignLeft } from "lucide-react";

export function TranscriptHero() {
  return (
    <section className="relative h-[40vh] min-h-[400px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/transcript-abstract.png" 
          alt="J Pan Tubular Components Limited Call Transcripts"
          fill
          priority
          className="object-cover object-center opacity-20 grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-transparent dark:from-black dark:via-black/95 dark:to-transparent" />
      </div>

      {/* Institutional Accents */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold/30 via-transparent to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[40%] bg-white/2 skew-x-[-20deg] translate-x-1/3 border-l border-white/5" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="w-8 h-8 bg-gold/10 flex items-center justify-center rounded-sm">
              <FileText className="w-4 h-4 text-gold" />
            </div>
            <div className="h-px w-10 bg-gold/30" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">Written Disclosures</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight text-white animate-in fade-in slide-in-from-left duration-700 delay-100">
            Call <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold italic font-medium">Transcripts</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-12 animate-in fade-in slide-in-from-left duration-700 delay-200">
            <p className="text-xl text-silver/40 leading-relaxed max-w-xl">
              The definitive written record of our investor dialogues, 
              preserving every strategic insight and board-level response 
              with absolute documentary precision.
            </p>
            
            <div className="flex items-center gap-8 border-l border-white/10 pl-12 hidden lg:flex">
               <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                     <AlignLeft className="w-4 h-4 text-gold" />
                     <span className="text-white font-bold text-2xl tracking-tighter">Full</span>
                  </div>
                  <span className="text-[9px] text-silver/30 uppercase tracking-widest font-bold">Verbatim Text</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-gold font-bold text-3xl mb-1 tracking-tighter">PDF</span>
                  <span className="text-[9px] text-silver/30 uppercase tracking-widest font-bold">Authenticated</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Design Element */}
      <div className="absolute bottom-10 left-12 flex flex-col items-start gap-4 opacity-20">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
        <span className="text-[8px] font-bold text-gold uppercase tracking-[0.5em] rotate-90 origin-left translate-y-4">Written Archive</span>
      </div>
    </section>
  );
}
