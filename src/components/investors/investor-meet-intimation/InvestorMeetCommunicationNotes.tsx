"use client";

import React, { useRef, useState } from "react";
import { ShieldCheck, Globe, Zap, ArrowRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const communicationPolicies = [
  {
    id: 1,
    title: "Equitable Disclosure",
    desc: "Ensuring simultaneous release of price-sensitive information to all market participants.",
    icon: Globe
  },
  {
    id: 2,
    title: "Verification Standard",
    desc: "Every interaction record is verified by our corporate secretarial and IR technical desks.",
    icon: ShieldCheck
  },
  {
    id: 3,
    title: "Real-time Intimation",
    desc: "Statutory intimations are dispatched within the regulatory window of scheduled meetings.",
    icon: Zap
  }
];

export function InvestorMeetCommunicationNotes() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < 4 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          
          {/* Header Side */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 md:mb-6 leading-tight overflow-visible">
              Investor <br />
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Communication Ethics</span>
            </h2>
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-sm leading-relaxed mb-6 md:mb-8 font-normal">
              J Pan Tubular Components Limited maintains a rigid framework for all investor 
              communications, adhering to global best practices and regional 
              regulatory mandates to ensure absolute market integrity.
            </p>
            <button className="flex items-center gap-2 text-[#2E5E99] font-bold text-xs uppercase tracking-wider group">
              <span>Read Communication Charter</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Cards Side: Single visible card at a time with horizontal scroll on mobile (< md), 3-column grid on desktop (>= md) */}
          <div className="lg:col-span-2 flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-4 md:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {communicationPolicies.map((policy) => (
                <div 
                  key={policy.id}
                  className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-6 sm:p-7 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-2xl mb-5 text-[#2E5E99] group-hover:bg-[#0D2440] group-hover:text-white transition-all duration-500">
                      <policy.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                    <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#2E5E99] transition-colors">
                      {policy.title}
                    </h4>
                    <p className="text-xs text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                      {policy.desc}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Quick Share Card - 4th card */}
              <div className="w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center md:col-span-3 bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:bg-charcoal/50 p-6 sm:p-8 rounded-3xl text-[#0D2440] dark:text-white flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border border-[#7BA4D0]/35">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-14 h-14 bg-white dark:bg-white/10 flex items-center justify-center rounded-2xl text-[#2E5E99] shrink-0">
                    <Share2 className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E5E99] mb-1">Market Engagement</h4>
                    <p className="text-lg sm:text-xl font-heading font-bold">Synchronized Market Disclosure</p>
                  </div>
                </div>
                <button className="px-6 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap rounded-xl">
                  Download Disclosure Policy
                </button>
              </div>
            </div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
              {[0, 1, 2, 3].map((i) => (
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
                  aria-label={`Go to policy card ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
