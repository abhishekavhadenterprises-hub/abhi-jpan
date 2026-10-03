"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const steps = [
  { step: "01", title: "Raw Material Inspection", image: "/images/industry-industrial.png" },
  { step: "02", title: "Precision Bending", image: "/images/industry-hvac.png" },
  { step: "03", title: "Automated Assembly", image: "/images/about-manufacturing.png" },
  { step: "04", title: "Final Quality Check", image: "/images/quality-hero.png" },
];

export function GalleryProcessStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 md:mb-16">
          <div className="lg:max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] overflow-visible">
              Behind the{" "}
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
                Process
              </span>
            </h2>
          </div>
          <p className="text-[#0D2440]/70 dark:text-silver/70 text-base md:text-lg lg:max-w-md leading-relaxed">
            Transparency in every step. See how our components evolve from 
            raw materials to finished precision engineering parts.
          </p>
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 no-scrollbar pb-4 sm:pb-0"
        >
          {steps.map((s, idx) => (
            <div key={idx} className="group relative w-full sm:w-auto shrink-0 sm:shrink snap-center">
              <div className="aspect-[4/5] relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#7BA4D0]/25 bg-[#F8FAFC] dark:bg-charcoal/40 transition-all duration-500 mb-4">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Step Number Capsule */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-charcoal/90 backdrop-blur-md border border-white/60 dark:border-white/10 text-xs font-bold text-[#0D2440] dark:text-white">
                    Step {s.step}
                  </span>
                </div>

                {/* Soft Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h4 className="text-base sm:text-lg font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors duration-300">
                {s.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Dot Indicators for Mobile Scroll */}
        {steps.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 sm:hidden">
            {steps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-[#0D2440] w-6" : "bg-[#7BA4D0]/40"
                )}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * scrollContainerRef.current.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

