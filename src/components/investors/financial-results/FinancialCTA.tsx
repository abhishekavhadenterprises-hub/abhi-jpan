"use client";

import React, { useRef, useState } from "react";
import { Mail, Phone, ArrowRight, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function FinancialCTA() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < 2 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        <div className="bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:bg-charcoal/50 border border-[#7BA4D0]/35 p-8 sm:p-12 md:p-16 rounded-3xl sm:rounded-[36px] max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight overflow-visible">
                Dedicated <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Investor Relations</span> Support
              </h2>
              <p className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg mb-8 leading-relaxed font-normal">
                For deeper technical clarification, analyst queries, or specific 
                compliance information, our dedicated investor relations desk 
                is available for professional consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-3 transition-all whitespace-nowrap group">
                  <span>Contact IR Desk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-xl">
                  <UserCheck className="w-5 h-5 text-[#2E5E99] shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0D2440] dark:text-white">Compliance Verified</span>
                </div>
              </div>
            </div>

            {/* Support Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row lg:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 lg:py-0 px-1 lg:px-0 gap-4 lg:space-y-4 lg:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                <div className="p-6 sm:p-7 bg-white dark:bg-charcoal border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl group hover:border-[#2E5E99]/50 transition-all w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-2xl shrink-0 text-[#2E5E99]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-[#0D2440] dark:text-white">Shareholder Services</h4>
                  </div>
                  <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs font-medium pl-1">enquiry@jpantubular.com</p>
                </div>

                <div className="p-6 sm:p-7 bg-white dark:bg-charcoal border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl group hover:border-[#2E5E99]/50 transition-all w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-2xl shrink-0 text-[#2E5E99]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-[#0D2440] dark:text-white">Global Hotline</h4>
                  </div>
                  <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs font-medium pl-1">+91-120-2560586</p>
                </div>
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex lg:hidden items-center justify-center gap-2 mt-4 z-10">
                {[0, 1].map((i) => (
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
                    aria-label={`Go to contact card ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

