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
    <section className="py-12 sm:py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 overflow-hidden transition-colors">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight">
            In the <span className="text-[#2E5E99] dark:text-[#7BA4D0]">News</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {mentions.map((mention, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 p-6 sm:p-8 md:p-10 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="relative w-28 sm:w-36 h-10 sm:h-12 flex items-center">
                    <Image
                      src={mention.logo}
                      alt={mention.outlet}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                    <Quote className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-snug sm:leading-tight italic">
                  &ldquo;{mention.headline}&rdquo;
                </h3>
              </div>
              
              <div className="pt-4 sm:pt-6 border-t border-[#7BA4D0]/20 flex items-center justify-between text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider">
                <span>{mention.outlet}</span>
                <span className="text-[#0D2440]/60 dark:text-white/60">{mention.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
