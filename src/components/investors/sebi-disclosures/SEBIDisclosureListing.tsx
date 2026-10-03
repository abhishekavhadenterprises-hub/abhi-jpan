"use client";

import React, { useRef, useState } from "react";
import { Download, Eye, Calendar, ArrowRight, Bookmark } from "lucide-react";
import { SEBIDisclosureDetailModal } from "./SEBIDisclosureDetailModal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const disclosures = [
  {
    id: 1,
    reg: "Regulation 30",
    title: "Disclosure of Material Event - New Production Line Commissioning",
    date: "Jan 24, 2025",
    desc: "Intimation regarding the successful commissioning of a high-precision automotive tubing facility.",
    status: "Verified"
  },
  {
    id: 2,
    reg: "Regulation 33",
    title: "Quarterly Audited Financial Results - Q3 FY 2024-25",
    date: "Jan 18, 2025",
    desc: "Statement of standalone and consolidated financial results for the quarter ended Dec 31, 2024.",
    status: "Official"
  },
  {
    id: 3,
    reg: "Regulation 46",
    title: "Website Disclosures - Updated Investor Information Portfolio",
    date: "Jan 10, 2025",
    desc: "Verification of all mandatory disclosures on the functional website as per SEBI (LODR) requirements.",
    status: "Verified"
  },
  {
    id: 4,
    reg: "Regulation 30",
    title: "Outcome of Board Meeting - Strategic Expansion Approval",
    date: "Oct 28, 2024",
    desc: "Intimation regarding board approval for strategic manufacturing expansion into Southeast Asian markets.",
    status: "Verified"
  },
  {
    id: 5,
    reg: "Regulation 44",
    title: "Voting Results - Annual General Meeting 2024",
    date: "Sept 12, 2024",
    desc: "Disclosure of voting results and Scrutinizer's report for the resolutions passed at the 2024 AGM.",
    status: "Verified"
  }
];

export function SEBIDisclosureListing() {
  const [selectedDisclosure, setSelectedDisclosure] = useState<null | typeof disclosures[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleView = (disclosure: typeof disclosures[0]) => {
    setSelectedDisclosure(disclosure);
    setIsModalOpen(true);
  };

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < disclosures.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <>
      <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-12 lg:mb-16 gap-6 lg:gap-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl flex flex-col items-center lg:items-start"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight tracking-tight">
                Disclosure <br className="hidden md:block" />
                <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                  & Regulatory Records
                </span>
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider px-5 py-2 bg-[#F8FAFC] dark:bg-charcoal/60 rounded-2xl border border-[#7BA4D0]/25">
                {disclosures.length} Active Filings
              </span>
            </motion.div>
          </div>

          {/* Filing Cards */}
          <div className="flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row lg:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 lg:py-0 px-1 lg:px-0 gap-4 lg:space-y-5 lg:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {disclosures.map((disclosure, idx) => (
                <motion.div 
                  key={disclosure.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-6 sm:p-8 rounded-3xl hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] dark:hover:bg-charcoal/60 transition-all duration-300 w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center flex flex-col justify-between"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3">
                        <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-wider flex items-center gap-1.5 bg-[#EBF3FC] dark:bg-[#0D2440]/30 px-3 py-1 rounded-full border border-[#7BA4D0]/25">
                          <Bookmark className="w-3 h-3" />
                          {disclosure.reg}
                        </span>
                        <div className="w-1 h-1 bg-[#7BA4D0]/40 rounded-full" />
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#2E5E99]" />
                          {disclosure.date}
                        </span>
                        <div className="w-1 h-1 bg-[#7BA4D0]/40 rounded-full" />
                        <span className="text-[10px] font-bold text-[#0D2440] dark:text-[#7BA4D0] uppercase tracking-wider px-2.5 py-0.5 bg-white dark:bg-charcoal rounded-full border border-[#7BA4D0]/25">
                          {disclosure.status}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors mb-2">
                        {disclosure.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl mb-4 lg:mb-0">
                        {disclosure.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 mt-auto lg:mt-0">
                      <button 
                        onClick={() => handleView(disclosure)}
                        className="flex-1 lg:flex-none py-3 px-5 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 hover:bg-[#0D2440] hover:text-white text-[#0D2440] dark:text-white rounded-xl transition-all group/btn flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                      >
                        <Eye className="w-4 h-4 text-[#2E5E99] group-hover/btn:text-white" />
                        <span>View</span>
                      </button>
                      <button className="flex-1 lg:flex-none py-3 px-5 bg-[#0D2440] hover:bg-[#2E5E99] text-white rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex lg:hidden items-center justify-center gap-2 mt-4 z-10">
              {disclosures.map((_, i) => (
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
                  aria-label={`Go to filing ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="text-xs font-bold text-[#0D2440] dark:text-[#7BA4D0] uppercase tracking-widest inline-flex items-center gap-2.5 mx-auto hover:text-[#2E5E99] transition-colors py-3 group">
              Load Historical Regulatory Records
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <SEBIDisclosureDetailModal 
        disclosure={selectedDisclosure}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
