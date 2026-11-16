"use client";

import React, { useState, useMemo } from "react";
import { Download, Eye, ShieldCheck, ArrowUpRight, Bookmark, RotateCcw, FileText } from "lucide-react";
import { SEBIDisclosureDetailModal, DisclosureItem } from "./SEBIDisclosureDetailModal";
import { motion } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const disclosures: DisclosureItem[] = [
  {
    id: 2,
    reg: "Regulation 46(2)",
    title: "Memorandum of Association and Articles of Association",
    date: "July 2026",
    desc: "Constitutional charter, foundational objectives, legal framework, and internal governance regulations of J Pan Tubular Components Limited.",
    status: "Verified",
    link: "/documents/memorandum-of-association-and-articles-of-association.pdf"
  },
  {
    id: 3,
    reg: "Regulation 46(2)",
    title: "Brief profile of board of directors including directorship and full-time positions in body corporates",
    date: "July 2026",
    desc: "Professional background, directorships, committee memberships, and full-time executive positions held by the Board of Directors.",
    status: "Verified",
    link: "/documents/brief-profile-of-board-of-directors-including-directorship-and-full-time-positions-in-body-corporates.pdf"
  },
  {
    id: 4,
    reg: "Regulation 46(2)",
    title: "Terms and conditions of appointment of independent directors",
    date: "June 2026",
    desc: "Statutory terms, tenure expectations, fiduciary duties, code of conduct compliance, and remuneration framework for Independent Directors.",
    status: "Verified",
    link: "/documents/terms-and-conditions-of-appointment-of-independent-directors.pdf"
  },
  {
    id: 5,
    reg: "Regulation 46(2)",
    title: "Composition of various committees of board of directors",
    date: "July 2026",
    desc: "Detailed charter, statutory membership composition, and committee leadership for Audit, NRC, Stakeholders, and CSR Committees.",
    status: "Verified",
    link: "/documents/composition-of-various-committees-of-board-of-directors.pdf"
  },
  {
    id: 6,
    reg: "Regulation 46(2)",
    title: "Code of conduct of board of directors and senior management personnel",
    date: "June 2026",
    desc: "Mandatory corporate governance charter defining ethical leadership, professional integrity, and compliance standards for Directors and Senior Management.",
    status: "Verified",
    link: "/documents/code-of-conduct-of-board-of-directors-and-senior-management-personnel.pdf"
  },
  {
    id: 7,
    reg: "Regulation 46(2)",
    title: "Details of establishment of vigil mechanism/ Whistle Blower policy",
    date: "June 2026",
    desc: "Confidential reporting framework enabling employees and stakeholders to report genuine concerns or unethical conduct with complete whistleblower protection.",
    status: "Verified",
    link: "/documents/details-of-establishment-of-vigil-mechanism-whistle-blower-policy.pdf"
  },
  {
    id: 8,
    reg: "Regulation 46(2)",
    title: "Criteria of making payments to non-executive directors",
    date: "June 2026",
    desc: "Structured criteria, sitting fees, and statutory compensation parameters for Non-Executive and Independent Directors.",
    status: "Verified",
    link: "/documents/criteria-of-making-payments-to-non-executive-directors.pdf"
  },
  {
    id: 9,
    reg: "Regulation 46(2)",
    title: "Policy on dealing with related party transactions",
    date: "June 2026",
    desc: "Protocols for identification, arm's length evaluation, omnibus committee approvals, and statutory reporting of related party transactions.",
    status: "Verified",
    link: "/documents/policy-on-dealing-with-related-party-transactions.pdf"
  },
  {
    id: 10,
    reg: "Regulation 46(2)",
    title: "Policy for determining 'material' subsidiaries",
    date: "June 2026",
    desc: "Threshold criteria and governance guidelines for identifying and monitoring material subsidiary entities under SEBI (LODR) Regulations.",
    status: "Verified",
    link: "/documents/policy-for-determining-material-subsidiaries.pdf"
  },
  {
    id: 11,
    reg: "Regulation 46(2)",
    title: "Details of familiarization programmes imparted to independent directors",
    date: "June 2026",
    desc: "Structured orientation, factory visits, regulatory updates, and strategic briefings conducted for Independent Directors.",
    status: "Verified",
    link: "/documents/details-of-familiarization-programmes-imparted-to-independent-directors.pdf"
  },
  {
    id: 12,
    reg: "Regulation 46(2)",
    title: "Email address for grievance redressal and other relevant details",
    date: "July 2026",
    desc: "Official contact details and designated email channel for investor grievance redressal and shareholder communications.",
    status: "Verified",
    link: "/documents/email-address-for-grievance-redressal-and-other-relevant-details.pdf"
  },
  {
    id: 24,
    reg: "Regulation 30(4)",
    title: "Materiality Policy as per Regulation 30(4)",
    date: "June 2026",
    desc: "Quantitative and qualitative criteria for determining the materiality of events or information for prompt disclosure to stock exchanges.",
    status: "Verified",
    link: "/documents/materiality-policy-as-per-regulation-30-4.pdf"
  },
  {
    id: 28,
    reg: "Regulation 43A(1)",
    title: "Dividend distribution policy as per Regulation 43A(1)",
    date: "June 2026",
    desc: "Financial parameters, capital allocation guidelines, retained earnings criteria, and internal/external factors governing dividend distribution.",
    status: "Verified",
    link: "/documents/dividend-distribution-policy-as-per-regulation-43a-1.pdf"
  }
];

export function SEBIDisclosureListing() {
  return (
    <React.Suspense fallback={<div className="py-16 text-center text-[#0D2440]/50 dark:text-white/50 font-heading font-medium">Loading disclosures...</div>}>
      <SEBIDisclosureListingInner />
    </React.Suspense>
  );
}

function SEBIDisclosureListingInner() {
  const [selectedDisclosure, setSelectedDisclosure] = useState<null | DisclosureItem>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = searchParams.get("sort") || "asc";
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const viewMode = searchParams.get("view") || "grid";

  const handleView = (disclosure: DisclosureItem) => {
    setSelectedDisclosure(disclosure);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const sortedDisclosures = useMemo(() => {
    let list = [...disclosures];
    if (query) {
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.reg.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query)
      );
    }
    return list.sort((a, b) => {
      if (sort === "desc") {
        return b.id - a.id;
      }
      return a.id - b.id;
    });
  }, [sort, query]);

  const isDefaultView = !query && sort === "asc";
  const flagshipDisclosure = isDefaultView && sortedDisclosures.length > 0 ? sortedDisclosures[0] : null;
  const gridDisclosures = sortedDisclosures;

  return (
    <>
      <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-[#071321] transition-colors relative">
        <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

        <div className="container-custom relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 sm:pb-8 border-b border-[#7BA4D0]/15 mb-8 sm:mb-10 gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.25em]">
                  SEBI Regulatory Filings
                </span>
                <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-[#0D2440] dark:text-white font-heading font-bold">
                  {sortedDisclosures.length} Filings
                </span>
              </div>
              <p className="text-xs text-[#0D2440]/60 dark:text-white/60 font-medium mt-0.5">
                Statutory compliances under SEBI (LODR) Regulations 2015
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-[#0D2440]/70 dark:text-white/70">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-heading font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Compliance Verified
              </span>
            </div>
          </div>

          {/* Empty State */}
          {sortedDisclosures.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 sm:py-20 px-5 sm:px-6 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/20 max-w-xl mx-auto my-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto mb-5 text-[#2E5E99]">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
                No SEBI Filings Found
              </h3>
              <p className="text-xs text-[#0D2440]/60 dark:text-white/60 mb-6 leading-relaxed">
                No disclosures match your search criteria. Reset filters to view all regulatory records.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-heading font-bold transition-all shadow-md min-h-[42px] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Search
              </button>
            </motion.div>
          )}

          {/* VIEW MODE 1: EDITORIAL BENTO GRID */}
          {viewMode === "grid" && sortedDisclosures.length > 0 && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* FLAGSHIP SPOTLIGHT CARD (Light Blue Container with White Tactile Document) */}
              {flagshipDisclosure && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#E7F0FA] dark:bg-[#0D2440] text-[#0D2440] dark:text-white border border-[#7BA4D0]/40 dark:border-[#7BA4D0]/30 shadow-xl shadow-[#2E5E99]/8 p-5 sm:p-10 md:p-12 group transition-all"
                >
                  <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#7BA4D0]/20 dark:bg-[#2E5E99]/25 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-60 sm:w-80 h-60 sm:h-80 bg-[#2E5E99]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column Information */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-heading font-bold text-[#0D2440]/65 dark:text-white/65 tracking-wider">
                          Item #{String(flagshipDisclosure.id).padStart(2, "0")} · {flagshipDisclosure.reg}
                        </span>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-[#0D2440] dark:text-white leading-tight">
                          {flagshipDisclosure.title}
                        </h3>
                        <p className="text-lg sm:text-2xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-tight">
                          {flagshipDisclosure.reg} Disclosure
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm md:text-base text-[#0D2440]/80 dark:text-white/80 max-w-xl leading-relaxed">
                        {flagshipDisclosure.desc}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                          Regulation: <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-heading font-bold">{flagshipDisclosure.reg}</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                          Status: <span className="text-emerald-700 dark:text-emerald-400 font-heading font-bold">{flagshipDisclosure.status}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
                        <a
                          href={flagshipDisclosure.link}
                          download
                          className="px-6 sm:px-8 py-3.5 min-h-[44px] rounded-2xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg group/btn hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-white group-hover/btn:translate-y-0.5 transition-transform" />
                          Download Official Filing
                        </a>

                        <button
                          onClick={() => handleView(flagshipDisclosure)}
                          className="px-6 py-3.5 min-h-[44px] rounded-2xl bg-white hover:bg-[#F4F8FD] dark:bg-[#0D2440] dark:hover:bg-white/10 border border-[#7BA4D0]/40 dark:border-white/20 text-[#0D2440] dark:text-white text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                          Document Preview
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Tactile Pure White Document Card */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                      <div 
                        onClick={() => handleView(flagshipDisclosure)}
                        className="cursor-pointer relative w-full max-w-sm aspect-[4/5] rounded-2xl bg-white text-[#0D2440] border border-[#7BA4D0]/35 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#2E5E99] group-hover:shadow-2xl"
                      >
                        <div className="flex items-center justify-between pb-4 border-b border-[#7BA4D0]/20">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                              <Bookmark className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-[#0D2440]/60 block">
                                STATUTORY FILING
                              </span>
                              <span className="text-xs font-heading font-bold text-[#0D2440] tracking-wide">
                                J PAN TUBULAR
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="my-auto text-center space-y-2 py-6">
                          <div className="w-16 h-16 rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto text-[#2E5E99] shadow-xs">
                            <ShieldCheck className="w-8 h-8" />
                          </div>
                          <p className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] tracking-tight pt-2">
                            Item #{String(flagshipDisclosure.id).padStart(2, "0")}
                          </p>
                          <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#0D2440]/55">
                            {flagshipDisclosure.reg}
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

              {/* Archival Bento Grid with all 13 official Disclosures */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridDisclosures.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 6) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/70 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-xs"
                  >
                    <div className="absolute top-5 right-6 text-4xl sm:text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/25 transition-colors duration-500 select-none pointer-events-none">
                      {String(item.id).padStart(2, "0")}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-[11px] sm:text-xs font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                          {item.reg}
                        </span>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
                        <h4 className="text-base sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#0D2440]/60 dark:text-white/60 line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 sm:pt-5 border-t border-[#7BA4D0]/15 flex items-center justify-between gap-2.5 sm:gap-3">
                      <button
                        onClick={() => handleView(item)}
                        className="flex-1 sm:flex-initial px-3.5 py-2.5 min-h-[40px] rounded-xl text-xs font-heading font-bold text-[#0D2440] dark:text-white bg-white dark:bg-white/5 hover:bg-[#E7F0FA] dark:hover:bg-white/15 border border-[#7BA4D0]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                        Preview
                      </button>

                      <a
                        href={item.link}
                        download
                        className="flex-1 sm:flex-initial px-4 py-2.5 min-h-[40px] rounded-xl text-xs font-heading font-bold text-white bg-[#0D2440] hover:bg-[#2E5E99] transition-all flex items-center justify-center gap-2 shadow-xs group/btn cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                        Download PDF
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          )}

          {/* VIEW MODE 2: MINIMALIST CORPORATE LEDGER TABLE */}
          {viewMode === "ledger" && sortedDisclosures.length > 0 && (
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
                      <th className="py-4 px-6">#</th>
                      <th className="py-4 px-6">Regulation</th>
                      <th className="py-4 px-6">Filing Description</th>
                      <th className="py-4 px-6 hidden sm:table-cell">Date</th>
                      <th className="py-4 px-6 hidden md:table-cell">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7BA4D0]/15 text-xs text-[#0D2440] dark:text-white">
                    {sortedDisclosures.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#F1F6FB] dark:hover:bg-white/5 transition-colors group"
                      >
                        <td className="py-4 px-6 font-heading font-black text-xs text-[#2E5E99] dark:text-[#7BA4D0]">
                          {String(item.id).padStart(2, "0")}
                        </td>

                        <td className="py-4 px-6 font-heading font-black text-sm text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide whitespace-nowrap">
                          {item.reg}
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-heading font-semibold text-sm group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors block">
                                {item.title}
                              </span>
                              <span className="text-[11px] font-heading text-[#0D2440]/50 dark:text-white/50 sm:hidden">
                                {item.date} · {item.status}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 hidden sm:table-cell font-heading font-semibold text-xs text-[#0D2440]/70 dark:text-white/70 whitespace-nowrap">
                          {item.date}
                        </td>

                        <td className="py-4 px-6 hidden md:table-cell">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-heading text-[10px] font-bold uppercase tracking-wider">
                            {item.status}
                          </div>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleView(item)}
                              className="p-2 rounded-lg bg-white dark:bg-white/10 border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white transition-all cursor-pointer"
                              title="Preview Document"
                              aria-label={`Preview ${item.title}`}
                            >
                              <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                            </button>
                            <a
                              href={item.link}
                              download
                              className="px-3.5 py-2 rounded-lg bg-[#0D2440] hover:bg-[#2E5E99] text-white font-heading font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
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
      </section>

      <SEBIDisclosureDetailModal
        disclosure={selectedDisclosure}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
