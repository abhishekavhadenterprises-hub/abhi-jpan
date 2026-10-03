"use client";

import React from "react";
import Image from "next/image";

export function BoardMeetingHero() {
  return (
    <section className="relative h-[35vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-hero.png" 
          alt="J Pan Tubular Components Limited Board Room Governance"
          fill
          priority
          className="object-cover object-center brightness-[0.2]"
        />
        <div className="absolute inset-0 bg-charcoal/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent" />
      </div>

      <div className="container-custom relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Governance Hub</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Board Meeting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold">Notices</span>
          </h1>
          <p className="text-lg text-silver/70 leading-relaxed max-w-xl">
            Official proclamations regarding J Pan Tubular Components Limited's executive board 
            sessions, strategic agendas, and corporate oversight mandates.
          </p>
        </div>
      </div>
    </section>
  );
}
