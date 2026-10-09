"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Info, ScrollText, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const infoCards = [
  {
    id: 1,
    title: "Dividend Policy",
    desc: "Our framework for sustainable capital allocation and shareholder returns.",
    icon: Shield,
    link: "View Policy",
    href: "/policies"
  },
  {
    id: 2,
    title: "Insider Trading Code",
    desc: "Rigorous standards for the prevention of insider trading and price manipulation.",
    icon: Lock,
    link: "Read Guidelines",
    href: "/policies"
  },
  {
    id: 3,
    title: "Familiarization Programs",
    desc: "Official orientation and training initiatives for independent directors.",
    icon: Info,
    link: "Explore Details",
    href: "/policies"
  },
  {
    id: 4,
    title: "Terms of Appointment",
    desc: "Formal documentation outlining the roles and duties of independent directors.",
    icon: ScrollText,
    link: "Download Terms",
    href: "/policies"
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
    <section className="py-20 md:py-28 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
            Regulatory Compliance
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight mb-4">
            Policies & <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
              Regulatory Disclosures
            </span>
          </h2>
          <p className="text-[#0D2440]/70 dark:text-white/65 text-sm sm:text-base leading-relaxed font-normal">
            Maintaining institutional trust through rigorous compliance and clear 
            operational policies. Explore our foundational governance documents below.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-4 md:py-0 px-1 md:px-0 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {infoCards.map((card, idx) => (
              <motion.div 
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-7 sm:p-8 rounded-3xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
              >
                <div>
                  <div className="w-13 h-13 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shadow-xs">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-black text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal mb-8">
                    {card.desc}
                  </p>
                </div>
                
                <Link 
                  href={card.href}
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider group-hover:gap-3 transition-all pt-4 border-t border-[#7BA4D0]/20"
                >
                  <span>{card.link}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {infoCards.map((_, i) => (
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
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
