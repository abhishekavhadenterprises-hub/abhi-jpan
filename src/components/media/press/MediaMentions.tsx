"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

const mentions = [
  {
    outlet: "Industrial Times",
    headline: "J Pan Tubular Components Limited Leading the Shift to Sustainable HVAC Components",
    logo: "/images/industry-industrial.png",
    date: "Sept 2025"
  },
  {
    outlet: "Global Engineering Review",
    headline: "Precision Bending: How J Pan Tubular Components Limited is Redefining Component Standards",
    logo: "/images/industry-auto.png",
    date: "Aug 2025"
  },
  {
    outlet: "Manufacturing Weekly",
    headline: "The Rise of Indian Engineering: A Case Study on J Pan Tubular Components Limited",
    logo: "/images/industry-hvac.png",
    date: "June 2025"
  }
];

export function MediaMentions() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-silver/5 dark:bg-black/20 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <div className="h-0.5 w-6 sm:w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">External Recognition</span>
            <div className="h-0.5 w-6 sm:w-8 bg-gold" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-4 sm:mb-6">
            In the <span className="text-deepblue dark:text-gold">News</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {mentions.map((mention, idx) => (
            <div key={idx} className="group relative bg-white dark:bg-charcoal p-5 sm:p-7 md:p-10 border border-border rounded-xl sm:rounded-2xl transition-all duration-500 flex flex-col">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="relative w-28 sm:w-32 h-10 sm:h-12 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100">
                  <Image
                    src={mention.logo}
                    alt={mention.outlet}
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-gold/30 group-hover:text-gold/60 transition-colors shrink-0" />
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-snug sm:leading-tight italic">
                &ldquo;{mention.headline}&rdquo;
              </h3>
              
              <div className="mt-auto pt-4 sm:pt-6 border-t border-border flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>{mention.outlet}</span>
                <span>{mention.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
