"use client";

import React, { useRef, useState } from "react";
import { UserCheck, Users, Landmark, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const shareholdingData = [
  {
    category: "Promoters & Promoter Group",
    percentage: "74.52%",
    description: "Core ownership providing strategic direction and stability.",
    icon: UserCheck,
    color: "#0D2440"
  },
  {
    category: "Public Institutions",
    percentage: "12.18%",
    description: "Diverse participation from mutual funds, banks, and FIs.",
    icon: Landmark,
    color: "#2E5E99"
  },
  {
    category: "General Public & Others",
    percentage: "13.30%",
    description: "Individual retail investors and non-institutional bodies.",
    icon: Users,
    color: "#7BA4D0"
  }
];

export function ShareholdingSummary() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < shareholdingData.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight tracking-tight">
              Distribution <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                & Ownership
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Shareholding Cards */}
        <div className="flex flex-col justify-between">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {shareholdingData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-8 rounded-3xl hover:border-[#2E5E99]/50 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  <div className="relative z-10">
                    <div className="w-13 h-13 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors">
                      <Icon className="w-6 h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                        {item.category}
                      </h3>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-4xl sm:text-5xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors tracking-tight">
                          {item.percentage}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-[#2E5E99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    <div className="pt-5 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest">Detailed Analysis</span>
                      <div className="h-px w-10 bg-[#7BA4D0]/40" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-10">
            {shareholdingData.map((_, i) => (
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
                  activeIndex === i ? "w-6 bg-[#2E5E99]" : "w-1.5 bg-[#7BA4D0]/40"
                )}
                aria-label={`Go to shareholding card ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-12 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em]">
           <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-[#0D2440] rounded-full" /> Promoters
           </div>
           <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-[#2E5E99] rounded-full" /> Institutions
           </div>
           <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-[#7BA4D0] rounded-full" /> Public
           </div>
        </div>
      </div>
    </section>
  );
}
