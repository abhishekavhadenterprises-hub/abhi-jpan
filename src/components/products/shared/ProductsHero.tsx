"use client";

import React from "react";
import Image from "next/image";

export function ProductsHero() {
  return (
    <section className="relative h-[78vh] min-h-[530px] max-h-[800px] w-full flex flex-col justify-end bg-[#071321] overflow-hidden">
      {/* Background Image: Full-Bleed Craftsmanship Showroom & Manufacturing Perspective */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/products-hero-craftsmanship.jpg"
          alt="J Pan Precision Products & Engineering"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-100 contrast-100"
        />
        {/* Subtle cinematic gradient overlays ensuring flawless visibility and legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Bottom Content Shelf */}
      <div className="container-custom relative z-10 w-full pb-10 sm:pb-12 md:pb-14 pt-28 sm:pt-32">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          
          {/* Underlined Kicker matching reference */}
          <div className="inline-block border-b-2 border-white pb-0.5">
            <span className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white tracking-tight">
              J-Pan Precision
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-normal text-white tracking-tight leading-[1.06]">
            World-Class Tubular Solutions.
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/85 font-normal leading-relaxed max-w-xl">
            Zero-defect brass, copper, and steel components engineered with sub-micron precision for automotive, HVAC, and industrial leaders worldwide.
          </p>

        </div>
      </div>
    </section>
  );
}
