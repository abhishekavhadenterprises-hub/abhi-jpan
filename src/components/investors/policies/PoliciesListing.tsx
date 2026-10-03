"use client";

import React, { useRef, useState } from "react";
import { Download, Eye, ChevronRight, Lock, Globe, Clock } from "lucide-react";
import { PoliciesDetailModal } from "./PoliciesDetailModal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const policies = [
  {
    id: 1,
    title: "Anti-Corruption Policy",
    category: "Compliance",
    description: "Guidelines on preventing bribery and corruption in all business dealings and interactions.",
    lastUpdated: "March 2025",
    access: "Public"
  },
  {
    id: 2,
    title: "Data Privacy Policy",
    category: "Compliance",
    description: "Framework for the collection, processing, and protection of personal and sensitive data.",
    lastUpdated: "Jan 2025",
    access: "Public"
  },
  {
    id: 3,
    title: "Insider Trading Code",
    category: "Governance",
    description: "Provisions for the prevention of insider trading and ensuring transparency in security dealings.",
    lastUpdated: "Feb 2025",
    access: "Statutory"
  },
  {
    id: 4,
    title: "Health & Safety Policy",
    category: "HR Policies",
    description: "Comprehensive guidelines ensuring a safe and secure working environment for all employees.",
    lastUpdated: "Dec 2024",
    access: "Internal"
  },
  {
    id: 5,
    title: "CSR Policy",
    category: "Governance",
    description: "Our approach to Corporate Social Responsibility and sustainable community development.",
    lastUpdated: "Nov 2024",
    access: "Public"
  },
  {
    id: 6,
    title: "Environmental Policy",
    category: "Compliance",
    description: "Commitment to minimizing our ecological footprint and promoting sustainable manufacturing.",
    lastUpdated: "Oct 2024",
    access: "Public"
  }
];

export function PoliciesListing() {
  const [selectedPolicy, setSelectedPolicy] = useState<null | typeof policies[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleView = (policy: typeof policies[0]) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < policies.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <>
      <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight tracking-tight">
                Policy Archive <br />
                <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                  & Guidelines
                </span>
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="px-5 py-2.5 bg-[#F8FAFC] dark:bg-charcoal/60 border border-[#7BA4D0]/25 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 bg-[#2E5E99] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  {policies.length} Documents Active
                </span>
              </div>
            </motion.div>
          </div>

          {/* Policy Archive Cards */}
          <div className="flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {policies.map((policy, idx) => (
                <motion.div 
                  key={policy.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-8 rounded-3xl hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] dark:hover:bg-charcoal/60 transition-all duration-300 relative overflow-hidden flex flex-col w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  {/* Access Tag */}
                  <div className="flex items-center justify-end mb-6">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      {policy.access === 'Public' ? <Globe className="w-3.5 h-3.5 text-[#2E5E99]" /> : <Lock className="w-3.5 h-3.5 text-amber-600" />}
                      <span className="text-[10px] font-bold uppercase tracking-wider">{policy.access}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors mb-3 line-clamp-1">
                    {policy.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {policy.description}
                  </p>

                  <div className="pt-6 border-t border-[#7BA4D0]/20 mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium tracking-wide">Updated {policy.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleView(policy)}
                        className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-charcoal hover:bg-[#0D2440] hover:text-white border border-[#7BA4D0]/30 rounded-xl transition-all text-[#0D2440] dark:text-white group/btn"
                      >
                        <Eye className="w-4 h-4 text-[#2E5E99] group-hover/btn:text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">View</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 py-3 bg-[#0D2440] hover:bg-[#2E5E99] text-white rounded-xl transition-all">
                        <Download className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Download</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-10">
              {policies.map((_, i) => (
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
                  aria-label={`Go to policy card ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Load More Utility */}
          <div className="mt-12 text-center">
             <button className="inline-flex items-center gap-3 text-xs font-bold text-[#0D2440] dark:text-[#7BA4D0] uppercase tracking-widest hover:text-[#2E5E99] transition-colors group">
               Explore Historical Policy Archives
               <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
             </button>
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
