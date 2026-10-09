"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, BarChart3, Clock, Eye, ArrowUpRight, ShieldCheck, FileSpreadsheet, RotateCcw } from "lucide-react";
import { RatingDetailModal } from "./RatingDetailModal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const ratingHistory = [
  {
    rating: "A+ / Stable",
    agency: "ICRA Limited",
    date: "Jan 12, 2025",
    outlook: "Stable",
    ref: "JP_RT_2025_01"
  },
  {
    rating: "A / Positive",
    agency: "ICRA Limited",
    date: "Feb 15, 2024",
    outlook: "Positive",
    ref: "JP_RT_2024_02"
  },
  {
    rating: "A / Stable",
    agency: "CARE Ratings",
    date: "Oct 10, 2023",
    outlook: "Stable",
    ref: "JP_RT_2023_10"
  },
  {
    rating: "A- / Stable",
    agency: "CRISIL",
    date: "May 22, 2022",
    outlook: "Stable",
    ref: "JP_RT_2022_05"
  }
];

export function RatingArchive() {
  return (
    <React.Suspense fallback={<div className="py-16 text-center text-[#0D2440]/50 dark:text-white/50 font-heading font-medium">Loading archives...</div>}>
      <RatingArchiveInner />
    </React.Suspense>
  );
}

function RatingArchiveInner() {
  const [selectedRating, setSelectedRating] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = searchParams.get("sort") || "desc";
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const viewMode = searchParams.get("view") || "grid";

  const handleOpenModal = (row: (typeof ratingHistory)[0]) => {
    setSelectedRating(row);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const sortedRatings = useMemo(() => {
    let list = [...ratingHistory];
    if (query) {
      list = list.filter(
        (r) =>
          r.rating.toLowerCase().includes(query) ||
          r.agency.toLowerCase().includes(query) ||
          r.ref.toLowerCase().includes(query) ||
          r.date.toLowerCase().includes(query)
      );
    }
    return list.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return sort === "desc" ? dateB - dateA : dateA - dateB;
      }
      return sort === "desc" ? -1 : 1;
    });
  }, [sort, query]);

  const isDefaultView = !query && sort === "desc";
  const flagshipRating = isDefaultView && sortedRatings.length > 0 ? sortedRatings[0] : null;
  const gridRatings = isDefaultView ? sortedRatings.slice(1) : sortedRatings;

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/20 transition-colors relative">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-[#7BA4D0]/15 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.25em]">
                Credit Evaluation Repository
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-[#0D2440] dark:text-white font-heading font-bold">
                {sortedRatings.length} Records
              </span>
            </div>
            <p className="text-xs text-[#0D2440]/60 dark:text-white/60 font-medium mt-0.5">
              Independent evaluations by accredited financial rating institutions
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold text-[#0D2440]/70 dark:text-white/70">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Agency Validated
            </span>
          </div>
        </div>

        {/* Empty State */}
        {sortedRatings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/20 max-w-xl mx-auto my-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto mb-5 text-[#2E5E99]">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
              No Rating Records Found
            </h3>
            <p className="text-xs text-[#0D2440]/60 dark:text-white/60 mb-6 leading-relaxed">
              No rating evaluations match your search query. Reset filters to view all historical agency evaluations.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-heading font-bold transition-all shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Search
            </button>
          </motion.div>
        )}

        {/* VIEW MODE 1: EDITORIAL BENTO GRID */}
        {viewMode === "grid" && sortedRatings.length > 0 && (
          <div className="space-y-8">
            
            {/* FLAGSHIP SPOTLIGHT CARD (Light Blue Container with White Tactile Document) */}
            {flagshipRating && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl bg-[#E7F0FA] dark:bg-[#0D2440] text-[#0D2440] dark:text-white border border-[#7BA4D0]/40 dark:border-[#7BA4D0]/30 shadow-xl shadow-[#2E5E99]/8 p-8 sm:p-12 group transition-all"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#7BA4D0]/20 dark:bg-[#2E5E99]/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#2E5E99]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column Information */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-heading font-bold text-[#0D2440]/65 dark:text-white/65 tracking-wider">
                        {flagshipRating.date} · {flagshipRating.agency}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-[#0D2440] dark:text-white leading-tight">
                        Rating: {flagshipRating.rating}
                      </h3>
                      <p className="text-xl sm:text-2xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-tight">
                        Outlook: {flagshipRating.outlook}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#0D2440]/80 dark:text-white/80 max-w-xl leading-relaxed">
                      Independent corporate rating evaluation reflecting strong solvency profile, operational resilience, and disciplined balance-sheet management.
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                        Agency: <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-heading font-bold">{flagshipRating.agency}</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                        Ref Docket: <span className="text-emerald-700 dark:text-emerald-400 font-heading font-bold">{flagshipRating.ref}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <a
                        href="/sample-report.pdf"
                        download
                        className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-lg group/btn hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Download className="w-4 h-4 text-white group-hover/btn:translate-y-0.5 transition-transform" />
                        Download Rating Letter
                      </a>

                      <button
                        onClick={() => handleOpenModal(flagshipRating)}
                        className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F4F8FD] dark:bg-[#0D2440] dark:hover:bg-white/10 border border-[#7BA4D0]/40 dark:border-white/20 text-[#0D2440] dark:text-white text-xs sm:text-sm font-heading font-bold transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                        Rating Certificate
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Tactile Pure White Document Card */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div 
                      onClick={() => handleOpenModal(flagshipRating)}
                      className="cursor-pointer relative w-full max-w-sm aspect-[4/5] rounded-2xl bg-white text-[#0D2440] border border-[#7BA4D0]/35 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#2E5E99] group-hover:shadow-2xl"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-[#7BA4D0]/20">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                            <BarChart3 className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-[#0D2440]/60 block">
                              CREDIT CERTIFICATE
                            </span>
                            <span className="text-xs font-heading font-bold text-[#0D2440] tracking-wide">
                              {flagshipRating.agency}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="my-auto text-center space-y-2 py-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto text-[#2E5E99] shadow-xs">
                          <ShieldCheck className="w-8 h-8" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] tracking-tight pt-2">
                          {flagshipRating.rating}
                        </p>
                        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#0D2440]/55">
                          Outlook: {flagshipRating.outlook}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between text-xs text-[#0D2440]/80">
                        <span className="font-heading font-bold text-xs">Click to Inspect</span>
                        <div className="w-7 h-7 rounded-full bg-[#E7F0FA] flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Archival Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridRatings.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/70 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-xs"
                >
                  <div className="absolute top-5 right-6 text-5xl sm:text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/25 transition-colors duration-500 select-none pointer-events-none">
                    0{idx + 2}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-xs font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                        {item.date}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                        {item.rating}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#0D2440]/60 dark:text-white/60">
                        <Clock className="w-3.5 h-3.5 text-[#2E5E99]" />
                        <span className="font-heading font-medium">{item.agency} · Outlook: {item.outlook}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#7BA4D0]/15 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="px-3.5 py-2 rounded-xl text-xs font-heading font-bold text-[#0D2440] dark:text-white bg-white dark:bg-white/5 hover:bg-[#E7F0FA] dark:hover:bg-white/15 border border-[#7BA4D0]/30 transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      Preview
                    </button>

                    <a
                      href="/sample-report.pdf"
                      download
                      className="px-4 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#0D2440] hover:bg-[#2E5E99] transition-all flex items-center gap-2 shadow-xs group/btn"
                    >
                      <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      PDF
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW MODE 2: MINIMALIST CORPORATE LEDGER TABLE */}
        {viewMode === "ledger" && sortedRatings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl sm:rounded-3xl border border-[#7BA4D0]/25 bg-white dark:bg-[#0D2440]/40 overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#7BA4D0]/20 bg-[#F8FAFC] dark:bg-[#0D2440]/80 text-[11px] font-heading font-bold text-[#0D2440]/70 dark:text-white/70 uppercase tracking-wider">
                    <th className="py-4 px-6">Evaluation Date</th>
                    <th className="py-4 px-6">Rating Assigned</th>
                    <th className="py-4 px-6 hidden sm:table-cell">Agency</th>
                    <th className="py-4 px-6 hidden md:table-cell">Outlook</th>
                    <th className="py-4 px-6 text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7BA4D0]/15 text-xs text-[#0D2440] dark:text-white">
                  {sortedRatings.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#F1F6FB] dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-4 px-6 font-heading font-black text-sm text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                        {row.date}
                      </td>

                      <td className="py-4 px-6 font-heading font-bold text-sm text-[#0D2440] dark:text-white">
                        {row.rating}
                      </td>

                      <td className="py-4 px-6 hidden sm:table-cell font-heading font-semibold text-xs text-[#0D2440]/70 dark:text-white/70">
                        {row.agency}
                      </td>

                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-heading text-[10px] font-bold uppercase tracking-wider">
                          {row.outlook}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(row)}
                            className="p-2 rounded-lg bg-white dark:bg-white/10 border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white transition-all"
                            title="Preview Rating Certificate"
                            aria-label={`Preview rating certificate for ${row.agency}`}
                          >
                            <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                          </button>
                          <a
                            href="/sample-report.pdf"
                            download
                            className="px-3.5 py-2 rounded-lg bg-[#0D2440] hover:bg-[#2E5E99] text-white font-heading font-bold text-xs transition-all flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">PDF</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>

      <RatingDetailModal 
        ratingData={selectedRating}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
