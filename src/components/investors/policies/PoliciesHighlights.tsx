"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Shield, UserCheck, Gavel, ArrowUpRight } from "lucide-react";
import { PoliciesDetailModal } from "./PoliciesDetailModal";
import { motion } from "framer-motion";

const keyPolicies = [
  {
    num: "01",
    title: "Code of Conduct",
    category: "Governance",
    desc: "The fundamental framework defining our ethical standards and business behavior expectations for all stakeholders.",
    icon: Gavel,
    description: "The fundamental framework defining our ethical standards and business behavior expectations for all stakeholders."
  },
  {
    num: "02",
    title: "Whistleblower Policy",
    category: "Compliance",
    desc: "A safe and confidential mechanism for reporting unethical practices, ensuring protection for those who speak up.",
    icon: Shield,
    description: "A safe and confidential mechanism for reporting unethical practices, ensuring protection for those who speak up."
  },
  {
    num: "03",
    title: "Equal Opportunity",
    category: "HR Policies",
    desc: "Our commitment to a diverse, inclusive, and equitable workplace free from discrimination and harassment.",
    icon: UserCheck,
    description: "Our commitment to a diverse, inclusive, and equitable workplace free from discrimination and harassment."
  }
];

export function PoliciesHighlights() {
  const [selectedPolicy, setSelectedPolicy] = useState<null | any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleExplore = (policy: any) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < keyPolicies.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <>
      <section className="py-12 sm:py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[10px] sm:text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-3 sm:mb-4 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
                Institutional Standards
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
                Key Strategic <br />
                <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                  Governance Pillars
                </span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#0D2440]/70 dark:text-white/65 text-xs sm:text-base leading-relaxed font-normal max-w-md"
            >
              Explore our core governance policies that define organizational conduct, 
              statutory compliance, and workplace equity.
            </motion.p>
          </div>

          {/* 3-Pillar Governance Cards Grid */}
          <div className="flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-4 md:py-0 px-1 md:px-0 gap-4 sm:gap-6 md:gap-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {keyPolicies.map((policy, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-white dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-1.5 transition-all duration-300 w-full min-w-full sm:min-w-[300px] md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
                >
                  {/* Giant Numeric Watermark */}
                  <div className="absolute top-3 sm:top-4 right-4 sm:right-6 text-4xl sm:text-6xl md:text-7xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/20 transition-colors duration-500 select-none pointer-events-none">
                    {policy.num}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5 sm:mb-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                        <policy.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] px-2.5 sm:px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25">
                        {policy.category}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl md:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-2 sm:mb-3 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                      {policy.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                      {policy.desc}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-6 sm:mt-10 pt-4 sm:pt-5 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                    <button 
                      onClick={() => handleExplore(policy)}
                      className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] uppercase tracking-wider transition-colors min-h-[36px]"
                    >
                      <span>Explore Policy</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                    </button>
                    <div className="w-7 h-7 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-5 sm:mt-6 z-10">
              {keyPolicies.map((_, i) => (
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
                  aria-label={`Go to policy ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <PoliciesDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        policy={selectedPolicy}
      />
    </>
  );
}
