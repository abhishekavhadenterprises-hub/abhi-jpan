"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Download, Eye, ChevronRight, Calendar, Bookmark } from "lucide-react";
import { MaterialDetailModal } from "./MaterialDetailModal";
import { cn } from "@/lib/utils";

const materialDocs = [
  {
    id: 1,
    title: "Joint Venture Agreement – Precision Parts Div.",
    type: "Agreement",
    date: "Jan 10, 2025",
    ref: "JP_JV_2025_01",
    fiscal: "FY 2024-25"
  },
  {
    id: 2,
    title: "Raw Material Supply Contract – European Partners",
    type: "Contract",
    date: "Dec 15, 2024",
    ref: "JP_CON_2024_12",
    fiscal: "FY 2024-25"
  },
  {
    id: 3,
    title: "Lease Agreement – Unit 4 Expansion Site",
    type: "Agreement",
    date: "Oct 22, 2024",
    ref: "JP_LSE_2024_10",
    fiscal: "FY 2024-25"
  },
  {
    id: 4,
    title: "Technical Collaboration Agreement",
    type: "Agreement",
    date: "Aug 05, 2024",
    ref: "JP_TEC_2024_08",
    fiscal: "FY 2024-25"
  },
  {
    id: 5,
    title: "Material Loan Contract – Institutional Credit",
    type: "Contract",
    date: "May 12, 2024",
    ref: "JP_CRD_2024_05",
    fiscal: "FY 2024-25"
  },
  {
    id: 6,
    title: "Share Purchase Agreement – Q4 Transaction",
    type: "Agreement",
    date: "Feb 28, 2024",
    ref: "JP_SPA_2024_02",
    fiscal: "FY 2023-24"
  }
];

export function MaterialListing() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < filteredDocs.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const filteredDocs = React.useMemo(() => {
    return materialDocs.filter(doc => {
      let matchesFilter = true;
      if (activeFilter !== "All") {
        if (activeFilter === "Contracts") matchesFilter = doc.type === "Contract";
        else if (activeFilter === "Agreements") matchesFilter = doc.type === "Agreement";
        else if (activeFilter === "Others") matchesFilter = doc.type !== "Contract" && doc.type !== "Agreement";
      }
      
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.ref.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Soft Glow */}

      <div className="container-custom relative z-10">
        {/* Filter & Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mb-12 md:mb-16"
        >
          <div className="bg-[#F8FAFC] dark:bg-charcoal/50 border border-[#7BA4D0]/25 p-4 rounded-3xl flex flex-col lg:flex-row items-center gap-6">
            <div className="flex overflow-x-auto no-scrollbar items-center gap-2 flex-grow w-full min-w-0 pb-2 lg:pb-0">
              {["All", "Contracts", "Agreements", "Others"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 shrink-0 whitespace-nowrap",
                    activeFilter === filter 
                      ? "bg-[#0D2440] text-white  " 
                      : "bg-white dark:bg-charcoal/60 text-[#0D2440]/70 dark:text-white/70 border border-[#7BA4D0]/20 hover:border-[#2E5E99]/40 hover:text-[#2E5E99]"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-[#7BA4D0]/25 hidden lg:block" />

            <div className="relative w-full lg:w-80 group shrink-0">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search material archive..."
                className="w-full bg-white dark:bg-charcoal/60 border border-[#7BA4D0]/25 rounded-2xl py-3 px-10 text-xs text-[#0D2440] dark:text-white placeholder-[#0D2440]/40 dark:placeholder-white/40 focus:outline-none focus:border-[#2E5E99] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] group-focus-within:text-[#0D2440] dark:group-focus-within:text-white" />
            </div>
          </div>
        </motion.div>

        {/* Document Cards */}
        {filteredDocs.length > 0 ? (
          <div className="flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {filteredDocs.map((doc, idx) => (
                <motion.div 
                  key={doc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 sm:p-8 rounded-3xl hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] dark:hover:bg-charcoal/60 transition-all duration-300 flex flex-col w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center rounded-xl text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">
                        Ref: {doc.ref}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] bg-[#EBF3FC] dark:bg-[#0D2440]/50">
                      {doc.fiscal}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors mb-4 line-clamp-2 min-h-[56px]">
                    {doc.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-5 mb-8 text-[#0D2440]/60 dark:text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">{doc.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">{doc.type}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-[#7BA4D0]/20 space-y-3">
                    <button 
                      onClick={() => {
                        setSelectedDoc(doc);
                        setIsModalOpen(true);
                      }}
                      className="w-full flex items-center justify-between py-3.5 px-6 bg-[#0D2440] hover:bg-[#2E5E99] text-white rounded-2xl transition-all duration-300 group/read"
                    >
                      <div className="flex items-center gap-3">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Read Document</span>
                      </div>
                      <ChevronRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform" />
                    </button>
                    
                    <a 
                      href="/sample-report.pdf"
                      download
                      className="w-full flex items-center justify-center gap-2.5 py-3 bg-white dark:bg-charcoal/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99]/50 rounded-2xl text-xs font-bold uppercase tracking-wider text-[#0D2440] dark:text-white hover:text-[#2E5E99] transition-all duration-300"
                    >
                      <Download className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      Download PDF Disclosure
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            {filteredDocs.length > 1 && (
              <div className="flex md:hidden items-center justify-center gap-2 mt-5 z-10">
                {filteredDocs.map((_, i) => (
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
                    aria-label={`Go to contract card ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[#7BA4D0]/30 rounded-3xl bg-[#F8FAFC] dark:bg-charcoal/40">
            <p className="text-sm text-[#0D2440]/70 dark:text-white/70">No documents found matching your criteria.</p>
            <button 
              onClick={() => { setActiveFilter("All"); setSearchQuery(""); }} 
              className="mt-6 px-6 py-2.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Multi-Year Access */}
        <div className="mt-16 md:mt-20 text-center">
          <button className="inline-flex items-center gap-3 text-xs font-bold text-[#0D2440]/70 dark:text-white/70 uppercase tracking-[0.25em] hover:text-[#2E5E99] transition-colors group">
            Access Historical Material Archive (2018-2023)
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#2E5E99]" />
          </button>
        </div>
      </div>

      <MaterialDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        documentData={selectedDoc} 
      />
    </section>
  );
}
