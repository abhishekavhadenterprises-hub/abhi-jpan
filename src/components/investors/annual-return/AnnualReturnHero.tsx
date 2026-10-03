"use client";

import React from "react";
import Image from "next/image";

export function AnnualReturnHero() {
  return (
    <section className="relative h-[35vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blueprint.png" 
          alt="J Pan Tubular Components Limited Annual Statutory Returns"
          fill
          priority
          className="object-cover object-center brightness-[0.15] opacity-40"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" />
      </div>

      <div className="container-custom relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Statutory Filing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Annual <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold">Return</span>
          </h1>
          <p className="text-lg text-silver/70 leading-relaxed max-w-xl">
            Official statutory filings and annual return documents as per 
            regulatory mandates and corporate governance standards.
          </p>
        </div>
      </div>
    </section>
  );
}
