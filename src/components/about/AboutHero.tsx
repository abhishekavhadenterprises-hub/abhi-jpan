"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="relative h-[78vh] min-h-[530px] max-h-[800px] w-full flex flex-col justify-end bg-[#071321] overflow-hidden">
      {/* Background Image: Full-Bleed Precision Facility */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-hero-new.png"
          alt="J Pan Tubular Components Advanced Precision Manufacturing"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-100 contrast-100"
        />
        {/* Subtle cinematic gradient focused at the bottom for pristine legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 via-35% to-transparent pointer-events-none" />
      </div>

      {/* Bottom Content Shelf */}
      <div className="container-custom relative z-10 w-full pb-10 sm:pb-12 pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          {/* Left: Progress Track + Editorial Narrative */}
          <div className="max-w-xl space-y-4 sm:space-y-5">
            {/* Minimalist Progress Line Track */}
            <div className="w-48 sm:w-60 h-[2px] bg-white/25 relative overflow-hidden">
              <div className="w-16 sm:w-20 h-full bg-white dark:bg-[#7BA4D0]" />
            </div>

            {/* Editorial Statement */}
            <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-normal">
              J-Pan believes precision engineering should feel effortless over time,
              delivering mission-critical tubular components shaped by metallurgical
              mastery, advanced automation, and an uncompromising standard of
              zero-defect quality.
            </p>
          </div>

          {/* Right/Adjacent: Crisp Button with Circular Dot Icon */}
          <div className="shrink-0">
            <Link
              href="#our-story"
              className="group inline-flex items-center justify-between gap-6 px-7 py-3.5 sm:py-4 bg-white hover:bg-white/90 dark:bg-[#7BA4D0] dark:hover:bg-[#2E5E99] text-black dark:text-white transition-all duration-300 font-medium text-sm sm:text-base tracking-tight"
            >
              <span className="font-medium text-[#0D2440] dark:text-[#0D2440] dark:group-hover:text-white">Explore Our Story</span>
              <svg
                className="w-5 h-5 text-black group-hover:rotate-90 transition-transform duration-500 ease-out"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="3" r="1.5" opacity="1" />
                <circle cx="18.36" cy="5.64" r="1.5" opacity="0.9" />
                <circle cx="21" cy="12" r="1.5" opacity="0.8" />
                <circle cx="18.36" cy="18.36" r="1.5" opacity="0.7" />
                <circle cx="12" cy="21" r="1.5" opacity="0.6" />
                <circle cx="5.64" cy="18.36" r="1.5" opacity="0.5" />
                <circle cx="3" cy="12" r="1.5" opacity="0.4" />
                <circle cx="5.64" cy="5.64" r="1.5" opacity="0.3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
