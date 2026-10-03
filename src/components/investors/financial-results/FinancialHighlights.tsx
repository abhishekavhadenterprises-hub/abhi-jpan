"use client";

import React, { useRef, useState } from "react";
import { TrendingUp, ArrowUpRight, DollarSign, Activity, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  {
    id: 1,
    label: "Annual Revenue",
    value: "$428M",
    growth: "+14.2%",
    icon: DollarSign,
    desc: "Steady expansion in industrial cooling sectors."
  },
  {
    id: 2,
    label: "Net Profit Margin",
    value: "18.5%",
    growth: "+2.1%",
    icon: Activity,
    desc: "Operational efficiency through automation."
  },
  {
    id: 3,
    label: "Market Share",
    value: "32%",
    growth: "+5.4%",
    icon: PieChart,
    desc: "Tier-1 automotive component dominance."
  },
  {
    id: 4,
    label: "R&D Investment",
    value: "$24M",
    growth: "+22.8%",
    icon: TrendingUp,
    desc: "Accelerated development of EV cooling lines."
  }
];

export function FinancialHighlights() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < highlights.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        {/* Highlights Grid: Single visible card at a time with horizontal scroll on mobile (< md), 4-column grid on desktop (>= md) */}
        <div className="flex flex-col justify-between">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {highlights.map((item) => (
              <div 
                key={item.id}
                className="group bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 sm:p-8 rounded-3xl hover:border-[#2E5E99]/50 hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl text-[#2E5E99] group-hover:bg-[#0D2440] group-hover:text-white transition-all duration-500">
                      <item.icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#2E5E99] bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {item.growth}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-[11px] font-bold text-[#0D2440]/60 dark:text-silver/60 uppercase tracking-widest mb-1.5">{item.label}</p>
                    <h3 className="text-3xl sm:text-4xl font-heading font-bold text-[#0D2440] dark:text-white">
                      {item.value}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {highlights.map((_, i) => (
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
                aria-label={`Go to highlight ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-12 p-6 bg-[#EBF3FC]/60 dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl text-center">
          <p className="text-xs font-semibold text-[#0D2440]/75 dark:text-silver/80 tracking-wide">
            *Data reflective of FY 2024-25 audit report. 
            <span className="text-[#2E5E99] font-bold ml-2 cursor-pointer hover:underline">Download full reconciliation report.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
