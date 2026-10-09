"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, DollarSign, Activity, PieChart } from "lucide-react";

const highlights = [
  {
    id: 1,
    num: "01",
    label: "Annual Revenue",
    value: "$428M",
    growth: "+14.2%",
    icon: DollarSign,
    desc: "Steady expansion in industrial cooling sectors."
  },
  {
    id: 2,
    num: "02",
    label: "Net Profit Margin",
    value: "18.5%",
    growth: "+2.1%",
    icon: Activity,
    desc: "Operational efficiency through automation."
  },
  {
    id: 3,
    num: "03",
    label: "Market Share",
    value: "32%",
    growth: "+5.4%",
    icon: PieChart,
    desc: "Tier-1 automotive component dominance."
  },
  {
    id: 4,
    num: "04",
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
    <section className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
              Audited Performance
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
              Fiscal <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Key Highlights
              </span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#0D2440]/70 dark:text-white/65 text-sm sm:text-base leading-relaxed font-normal max-w-md"
          >
            Core performance metrics demonstrating sustained revenue growth, 
            margin expansion, and targeted capital deployment across core markets.
          </motion.p>
        </div>

        {/* 4-Card Asymmetric Bento Metric Grid */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-4 md:py-0 px-1 md:px-0 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {highlights.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-7 sm:p-8 rounded-3xl hover:-translate-y-1.5 transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
              >
                {/* Giant Numeric Watermark */}
                <div className="absolute top-4 right-6 text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/20 transition-colors duration-500 select-none pointer-events-none">
                  {item.num}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-13 h-13 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {item.growth}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-[11px] font-heading font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest mb-1.5">
                      {item.label}
                    </p>
                    <h3 className="text-4xl sm:text-5xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight">
                      {item.value}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                  <span className="text-[10px] font-heading font-black text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">
                    Audited P&L
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#7BA4D0]/40 group-hover:bg-[#2E5E99] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {highlights.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (cardsRef.current) {
                    cardsRef.current.scrollTo({
                      left: i * cardsRef.current.clientWidth,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeIndex === i ? "w-8 bg-[#2E5E99]" : "w-2 bg-[#7BA4D0]/40"
                }`}
                aria-label={`Go to metric ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
