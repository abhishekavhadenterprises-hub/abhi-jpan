"use client";

import React from "react";
import Image from "next/image";

export function NewsletterHero() {
  return (
    <section className="relative h-[40vh] min-h-[350px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-hero.png" 
          alt="J Pan Tubular Components Limited Communication Hub"
          fill
          priority
          className="object-cover object-center brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-deepblue/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
      </div>

      <div className="container-custom relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Community Hub</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            The Precision <span className="text-silver/60">Edge</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold">Newsletter Archive</span>
          </h1>
          <p className="text-lg text-silver/70 leading-relaxed max-w-2xl">
            A chronological record of our industrial journey, 
            technical breakthroughs, and corporate milestones.
          </p>
        </div>
      </div>
    </section>
  );
}
