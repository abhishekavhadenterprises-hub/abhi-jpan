"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileText, ScrollText } from "lucide-react";

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
    <section className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
              Regulatory Assurance
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white mb-6 leading-[1.12] tracking-tight">
              Verified <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Regulatory Integrity
              </span>
            </h2>

            <p className="text-[#0D2440]/70 dark:text-white/70 text-base sm:text-lg mb-8 leading-relaxed font-normal">
              Our disclosure policy is governed by strict adherence to the 
              SEBI (Listing Obligations and Disclosure Requirements) 
              Regulations, ensuring all shareholders receive equal, timely, 
              and authentic access to material corporate information.
            </p>

            <div className="p-5 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
              <div>
                <h4 className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-0.5">
                  100% LODR Aligned
                </h4>
                <p className="text-xs text-[#0D2440]/60 dark:text-white/60 font-medium">
                  Continuous audit trails verified by Secretarial Auditors.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4 Compliance Standards Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pt-2 pb-4 sm:py-0 px-1 sm:px-0 gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {complianceCards.map((card, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-7 rounded-3xl hover:-translate-y-1 transition-all duration-300 w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center shadow-sm hover:shadow-lg shadow-[#2E5E99]/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center mb-5 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shadow-xs">
                      <card.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-heading font-black text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                    <span className="text-[10px] font-heading font-black text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">
                      Mandatory Clause
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#7BA4D0]/40 group-hover:bg-[#2E5E99] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex sm:hidden items-center justify-center gap-2 mt-6 z-10">
              {complianceCards.map((_, i) => (
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
                  aria-label={`Go to compliance card ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
