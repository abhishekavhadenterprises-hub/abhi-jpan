"use client";

import React from "react";
import Image from "next/image";

export function InvestorMeetHero() {
  return (
    <section className="relative h-[35vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blueprint.png" 
          alt="J Pan Tubular Components Limited Investor Relations"
          fill
          priority
          className="object-cover object-center opacity-[0.05] invert dark:invert-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-charcoal dark:via-charcoal/90 dark:to-transparent" />
      </div>

      {/* Decorative Light Leak */}

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Investor Relations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-charcoal dark:text-white">
            Investor Meet <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-deepblue to-gold dark:from-silver dark:to-gold">Intimation</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Official intimation of investor meetings, earning calls, and market 
            interactions. Facilitating transparent communication between 
            J Pan Tubular Components Limited and the global investment community.
          </p>
        </div>
      </div>
    </section>
  );
}
