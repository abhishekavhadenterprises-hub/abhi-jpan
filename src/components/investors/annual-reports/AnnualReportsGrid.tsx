"use client";

import React, { useRef, useState } from "react";
import { Download, FileDown, FileText, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const reports = [
  {
    id: 1,
    date: "2025-2026",
    particulars: "J Pan- Annual Report",
    link: "/sample-report.pdf"
  },
  {
    id: 2,
    date: "2024-2025",
    particulars: "J Pan- Annual Report",
    link: "/sample-report.pdf"
  },
  {
    id: 3,
    date: "2023-2024",
    particulars: "J Pan- Annual Report",
    link: "/sample-report.pdf"
  },
  {
    id: 4,
    date: "2022-2023",
    particulars: "J Pan- Annual Report",
    link: "/sample-report.pdf"
  },
  {
    id: 5,
    date: "2021-2022",
    particulars: "J Pan- Annual Report",
    link: "/sample-report.pdf"
  },
  {
    id: 6,
    date: "2020-2021",
    particulars: "J Pan- Annual Report",
    link: "/sample-report.pdf"
  }
];

export function AnnualReportsGrid(props: any) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <AnnualReportsGridInner {...props} />
    </React.Suspense>
  );
}

function AnnualReportsGridInner() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "desc";
  const query = (searchParams.get("q") || "").toLowerCase();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sortedReports = React.useMemo(() => {
    let filtered = [...reports];
    if (query) {
      filtered = filtered.filter(
        (r) => 
          r.particulars.toLowerCase().includes(query) || 
          r.date.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      if (sort === "asc") {
        return a.date.localeCompare(b.date);
      }
      return b.date.localeCompare(a.date);
    });
  }, [sort, query]);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < sortedReports.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-0.5 bg-[#2E5E99]" />
            <h2 className="text-xs font-bold text-[#2E5E99] uppercase tracking-[0.25em]">Disclosure Archive</h2>
          </div>
          <div className="text-xs font-semibold text-[#0D2440]/60 dark:text-silver/70">
            Showing {sortedReports.length} Results for FY 2024-25
          </div>
        </div>

        {/* Reports Cards: Single visible card at a time with horizontal scroll on mobile (< md), vertical stack on desktop (>= md) */}
        <div className="flex flex-col justify-between">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-4 md:space-y-5 md:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {sortedReports.map((report, idx) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] dark:hover:bg-charcoal/60 transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 text-[#2E5E99]">
                  <FileText className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-grow space-y-2 text-center md:text-left w-full md:w-auto">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs font-semibold text-[#0D2440]/60 dark:text-silver/60">
                    <span>{report.date}</span>
                    <span className="w-1 h-1 bg-[#7BA4D0] rounded-full" />
                    <span className="text-[#2E5E99]">Annual Report</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors leading-snug">
                    {report.particulars}
                  </h3>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-[#0D2440]/60 dark:text-silver/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2E5E99]" />
                      <span>Processed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                        Published
                      </span>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-[#7BA4D0]/25 hidden lg:block" />

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    <a 
                      href={report.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl border border-[#7BA4D0]/35 bg-white hover:bg-white/80 dark:bg-charcoal text-xs font-semibold text-[#0D2440] dark:text-white transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#2E5E99]" /> View
                    </a>
                    <a 
                      href={report.link}
                      download
                      className="px-5 py-2.5 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-semibold flex items-center gap-2 transition-all group/btn"
                    >
                      <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          {sortedReports.length > 1 && (
            <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
              {sortedReports.map((_, i) => (
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
                    activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
                  )}
                  aria-label={`Go to annual report ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
