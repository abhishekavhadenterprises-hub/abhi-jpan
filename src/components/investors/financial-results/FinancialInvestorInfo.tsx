"use client";

import React, { useRef, useState } from "react";
import { Shield, Lock, Info, ScrollText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const infoCards = [
  {
    id: 1,
    title: "Dividend Policy",
    desc: "Our framework for sustainable capital allocation and shareholder returns.",
    icon: Shield,
    link: "View Policy"
  },
  {
    id: 2,
    title: "Insider Trading Code",
    desc: "Rigorous standards for the prevention of insider trading and price manipulation.",
    icon: Lock,
    link: "Read Guidelines"
  },
  {
    id: 3,
    title: "Familiarization Programs",
    desc: "Official orientation and training initiatives for independent directors.",
    icon: Info,
    link: "Explore Details"
  },
  {
    id: 4,
    title: "Terms of Appointment",
    desc: "Formal documentation outlining the roles and duties of independent directors.",
    icon: ScrollText,
    link: "Download Terms"
  }
];

export function FinancialInvestorInfo() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < infoCards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <div className="max-w-4xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 md:mb-6 leading-tight overflow-visible">
            Policies & <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Regulatory Disclosures</span>
          </h2>
          <p className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg leading-relaxed font-normal">
            Maintaining institutional trust through rigorous compliance and clear 
            operational policies. Explore our foundational governance documents below.
          </p>
        </div>

        {/* Info Cards: Single visible card at a time with horizontal scroll on mobile (< md), 4-column grid on desktop (>= md) */}
        <div className="flex flex-col justify-between">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {infoCards.map((card) => (
              <div 
                key={card.id}
                className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-1.5 transition-all duration-500 group flex flex-col justify-between h-full w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                <div>
                  <div className="w-14 h-14 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-5 transition-all duration-500 group-hover:bg-[#0D2440] group-hover:text-white text-[#2E5E99]">
                    <card.icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal mb-6">
                    {card.desc}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-[#2E5E99] uppercase tracking-wider group-hover:gap-3 transition-all pt-2">
                  <span>{card.link}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {infoCards.map((_, i) => (
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

        {/* Technical Note */}
        <div className="mt-12 md:mt-16 p-6 sm:p-8 bg-[#EBF3FC]/70 dark:bg-charcoal/40 border-l-4 border-[#2E5E99] border-y border-r border-[#7BA4D0]/20 rounded-r-2xl">
          <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
            <span className="font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mr-2">Technical Note:</span>
            All disclosures are filed in compliance with SEBI and other relevant industrial 
            regulatory bodies. For technical clarification on specific filings, please 
            connect with our Compliance Officer via the Investor Relations desk.
          </p>
        </div>
      </div>
    </section>
  );
}
