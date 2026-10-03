"use client";

import React from "react";
import Image from "next/image";

export function CustomersHero() {
  return (
    <section className="relative h-[45vh] min-h-[400px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-hero.png" 
          alt="Client Collaboration and Trust"
          fill
          priority
          className="object-cover object-center grayscale brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-deepblue/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      </div>

      <div className="container-custom relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm">Global Partnerships</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Trusted by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold">Industry Leaders</span>
          </h1>
          <p className="text-xl text-silver/80 leading-relaxed max-w-2xl">
            Building long-term technical value for the world's most 
            demanding HVAC, Automotive, and Industrial brands.
          </p>
        </div>
      </div>
    </section>
  );
}
