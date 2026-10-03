"use client";

import React, { useRef, useState } from "react";
import { Mail, Phone, ArrowRight, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function InvestorMeetCTA() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < 3 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black overflow-hidden transition-colors">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:bg-charcoal/50 border border-[#7BA4D0]/35 p-8 sm:p-12 md:p-16 rounded-3xl sm:rounded-[36px] relative group overflow-hidden max-w-6xl mx-auto">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight overflow-visible">
                Engage with our <br />
                <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">IR Technical Desk</span>
              </h2>
              <p className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg mb-8 leading-relaxed font-normal max-w-xl">
                For queries regarding scheduled analyst meets, earnings call 
                transcripts, or presentation disclosures, our investor 
                relations team is available for direct coordination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-3 group whitespace-nowrap">
                  <span>Contact Investor Relations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-xl">
                  <Users className="w-5 h-5 text-[#2E5E99] shrink-0" />
                  <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Global Desk</span>
                </div>
              </div>
            </div>

            {/* Support Cards: Single visible card at a time with horizontal scroll on mobile (< sm), 2-column grid on desktop (>= sm) */}
            <div className="flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 sm:py-0 px-1 sm:px-0 gap-4 sm:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                <div className="p-6 sm:p-7 bg-white dark:bg-charcoal border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 transition-all group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-2xl mb-4 text-[#2E5E99]">
                    <Mail className="w-6 h-6 group-hover/card:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-1 text-[#0D2440] dark:text-white">Institutional Email</h4>
                  <p className="text-[#0D2440]/70 dark:text-silver/70 text-xs">enquiry@jpantubular.com</p>
                </div>

                <div className="p-6 sm:p-7 bg-white dark:bg-charcoal border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl hover:border-[#2E5E99]/50 transition-all group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-2xl mb-4 text-[#2E5E99]">
                    <Phone className="w-6 h-6 group-hover/card:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-1 text-[#0D2440] dark:text-white">Direct Line</h4>
                  <p className="text-[#0D2440]/70 dark:text-silver/70 text-xs">+91-120-2560586</p>
                </div>

                <div className="sm:col-span-2 p-6 sm:p-7 bg-white dark:bg-charcoal rounded-2xl sm:rounded-3xl flex items-center justify-between group/live border border-[#7BA4D0]/25 w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-2xl shrink-0 text-[#2E5E99]">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1">Market Sentiment Analysis</h4>
                      <p className="text-[#0D2440]/70 dark:text-silver/70 text-xs leading-relaxed">Real-time coordination of post-earnings analyst interactions.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex sm:hidden items-center justify-center gap-2 mt-6 z-10">
                {[0, 1, 2].map((i) => (
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
                    aria-label={`Go to card ${i + 1}`}
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

