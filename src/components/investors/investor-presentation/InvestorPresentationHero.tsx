"use client";

import React from "react";
import Image from "next/image";

export function InvestorPresentationHero() {
  return (
    <section className="relative h-[35vh] min-h-[350px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blueprint.png" 
          alt="J Pan Tubular Components Limited Strategic Growth"
          fill
          priority
          className="object-cover object-center opacity-[0.05] grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent" />
      </div>

      {/* High-Tech Glow Accents */}

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Strategic Growth</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight text-white">
            Investor <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver via-white to-gold">Presentation</span>
          </h1>
          <p className="text-lg text-silver/50 leading-relaxed max-w-xl">
            Explore the roadmap of J Pan Tubular Components Limited's operational excellence. 
            Detailed insights into our business performance, market strategy, 
            and long-term value creation for stakeholders.
          </p>
        </div>
      </div>

      {/* Decorative Grid Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-20" />
    </section>
  );
}
