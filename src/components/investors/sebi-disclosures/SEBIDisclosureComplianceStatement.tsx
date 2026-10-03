"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileText, CheckCircle2, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

const complianceCards = [
  {
    icon: Scale,
    title: "Disclosure Standard",
    description: "Adhering to Regulation 30 for the intimation of material events and information with zero latency.",
  },
  {
    icon: ScrollText,
    title: "Financial Transparency",
    description: "Full alignment with Regulation 33 for the publication of quarterly and annual audited results.",
  },
  {
    icon: FileText,
    title: "Website Obligations",
    description: "Maintaining a functional, up-to-date investor relations portal as mandated by Regulation 46.",
  },
  {
    icon: ShieldCheck,
    title: "Ethical Conduct",
    description: "Upholding the Code of Fair Disclosure for Prevention of Insider Trading as per SEBI norms.",
  },
];

export function SEBIDisclosureComplianceStatement() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < complianceCards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black border-t border-[#7BA4D0]/20 overflow-hidden relative">
      {/* Soft Background Accents */}

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Header Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
              Verified <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] inline-block pr-1 pb-1">
                Regulatory Integrity
              </span>
            </h2>

            <p className="text-[#0D2440]/70 dark:text-white/70 text-base sm:text-lg mb-8 leading-relaxed font-normal">
              Our disclosure policy is governed by strict adherence to the 
              SEBI (Listing Obligations and Disclosure Requirements) 
              Regulations, 2015. We maintain a systematic framework for 
              materiality assessment and timely statutory reporting.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4.5 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                </div>
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Certified Materiality Policy
                </span>
              </div>
              <div className="flex items-center gap-4 p-4.5 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                </div>
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Internal Statutory Audit Loop
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cards Side */}
          <div className="lg:col-span-7 relative w-full">
            <div className="flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-8 md:pt-4 md:pb-8 px-1 md:px-0 gap-5 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                {complianceCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "p-7 sm:p-8 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl transition-all duration-300 group w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center",
                        "hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB]",
                        idx % 2 === 1 ? "md:translate-y-6" : ""
                      )}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center mb-6 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h4 className="text-sm font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-3">
                        {card.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
                {complianceCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      if (cardsRef.current && cardsRef.current.children[i]) {
                        cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }
                    }}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeIndex === i ? "w-7 bg-[#2E5E99]" : "w-2 bg-[#7BA4D0]/30"
                    )}
                    aria-label={`Go to compliance card ${i + 1}`}
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
