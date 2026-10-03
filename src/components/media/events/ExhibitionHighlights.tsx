"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Globe, Users, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const exhibitions = [
  {
    title: "Global HVAC Fairs",
    desc: "A consistent presence at ACREX, Chillventa, and AHR Expo, demonstrating our leadership in thermal component precision.",
    icon: Globe,
    image: "/images/industry-hvac.png"
  },
  {
    title: "Automotive Expos",
    desc: "Showcasing our IATF-certified fuel and hydraulic lines at major auto component fairs across Asia and Europe.",
    icon: Target,
    image: "/images/industry-auto.png"
  },
  {
    title: "Industry Networking",
    desc: "Engaging with global engineering communities to co-create the next generation of tubular solutions.",
    icon: Users,
    image: "/images/about-hero.png"
  }
];

export function ExhibitionHighlights() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < exhibitions.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 leading-[1.22] overflow-visible">
            Global Trade{" "}
            <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
              Show Presence
            </span>
          </h2>
        </div>

        {/* Exhibition Cards: Single visible card at a time with horizontal scroll on mobile (< md), 3-column grid on desktop (>= md) */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {exhibitions.map((ex, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all duration-500 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between"
              >
                <div className="aspect-[16/10] relative overflow-hidden shrink-0 bg-slate-100 dark:bg-[#0D2440]">
                  <Image
                    src={ex.image}
                    alt={ex.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-10 w-11 h-11 bg-white/95 dark:bg-charcoal/90 backdrop-blur-md rounded-xl border border-white/60 dark:border-white/10 flex items-center justify-center text-[#2E5E99]">
                    <ex.icon className="w-5 h-5" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] transition-colors">
                    {ex.title}
                  </h3>
                  <p className="text-[#0D2440]/75 dark:text-silver/80 leading-relaxed text-xs sm:text-sm font-normal">
                    {ex.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {exhibitions.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (cardsRef.current && cardsRef.current.children[i]) {
                    cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
                )}
                aria-label={`Go to exhibition card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
