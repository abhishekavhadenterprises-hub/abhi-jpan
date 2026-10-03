"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Shield, UserCheck, Gavel } from "lucide-react";
import { PoliciesDetailModal } from "./PoliciesDetailModal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const keyPolicies = [
  {
    title: "Code of Conduct",
    category: "Governance",
    desc: "The fundamental framework defining our ethical standards and business behavior expectations for all stakeholders.",
    icon: Gavel,
    description: "The fundamental framework defining our ethical standards and business behavior expectations for all stakeholders."
  },
  {
    title: "Whistleblower Policy",
    category: "Compliance",
    desc: "A safe and confidential mechanism for reporting unethical practices, ensuring protection for those who speak up.",
    icon: Shield,
    description: "A safe and confidential mechanism for reporting unethical practices, ensuring protection for those who speak up."
  },
  {
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
      <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight tracking-tight">
              Key Governance <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Highlights
              </span>
            </h2>
          </motion.div>

          {/* Policy Cards */}
          <div className="flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {keyPolicies.map((policy, idx) => {
                const Icon = policy.icon;
                return (
                  <motion.div 
                    key={policy.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group p-8 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/50 transition-all duration-300 hover:-translate-y-1.5 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-13 h-13 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 text-[#2E5E99] group-hover:bg-[#0D2440] group-hover:text-white group-hover:border-[#0D2440] transition-colors shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-wider bg-[#EBF3FC] dark:bg-[#0D2440]/30 px-3 py-1 rounded-full border border-[#7BA4D0]/25 mb-4 inline-block">
                        {policy.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-3 group-hover:text-[#2E5E99] transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-8">
                        {policy.desc}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleExplore(policy)}
                      className="flex items-center gap-2 text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider group/btn pt-4 border-t border-[#7BA4D0]/20 hover:text-[#2E5E99] transition-colors"
                    >
                      Explore Policy
                      <ArrowRight className="w-4 h-4 text-[#2E5E99] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-10">
              {keyPolicies.map((_, i) => (
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
                  aria-label={`Go to policy highlight card ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <PoliciesDetailModal 
        policy={selectedPolicy}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
