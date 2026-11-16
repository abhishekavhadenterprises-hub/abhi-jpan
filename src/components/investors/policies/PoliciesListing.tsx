"use client";

import React, { useState, useMemo } from "react";
import { Download, Eye, ShieldCheck, ArrowUpRight, RotateCcw, FileText } from "lucide-react";
import { PoliciesDetailModal } from "./PoliciesDetailModal";
import { motion } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export interface PolicyItem {
  id: number;
  title: string;
  category: "Governance" | "Compliance" | "HR Policies";
  description: string;
  lastUpdated: string;
  access: "Statutory" | "Public" | "Internal";
  link: string;
}

export const policies: PolicyItem[] = [
  {
    id: 1,
    title: "Code of Conduct for Board of Directors and Senior Management",
    category: "Governance",
    description: "Guidelines on professional integrity, ethical standards, fiduciary obligations, and compliance duties for Board members and Senior Executives.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/code-of-conduct-for-the-board-of-directors-and-senior-management.pdf"
  },
  {
    id: 2,
    title: "Code of Practices and Procedures for Fair Disclosure of UPSI",
    category: "Compliance",
    description: "Policy and procedures ensuring prompt, uniform, and universal disclosure of Unpublished Price Sensitive Information (UPSI) and handling leak inquiries.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/code-of-practices-and-procedures-for-fair-disclosure-and-inquiry-in-case-of-leak-or-suspected-leak-of-unpublished-price-sensitive-information-upsi.pdf"
  },
  {
    id: 3,
    title: "Corporate Social Responsibility (CSR) Policy",
    category: "Governance",
    description: "Strategic policy governing corporate social responsibility commitments, sustainable community initiatives, and CSR Committee responsibilities.",
    lastUpdated: "May 2026",
    access: "Public",
    link: "/documents/corporate-social-responsibility-policy.pdf"
  },
  {
    id: 4,
    title: "Dividend Distribution Policy",
    category: "Governance",
    description: "Framework laying down financial criteria, internal and external factors, retained earnings targets, and parameters for dividend distribution.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/dividend-distribution-policy.pdf"
  },
  {
    id: 5,
    title: "Nomination and Remuneration Policy",
    category: "Governance",
    description: "Criteria for appointment, evaluation, performance assessment, and remuneration of Directors, Key Managerial Personnel (KMP), and Senior Management.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/nomination-and-remuneration-policy.pdf"
  },
  {
    id: 6,
    title: "Policy for Determination of Materiality of Events or Information",
    category: "Compliance",
    description: "Criteria and thresholds for determining materiality of corporate events and regulatory reporting protocols to stock exchanges.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/policy-for-determination-of-materiality-of-events-or-information.pdf"
  },
  {
    id: 7,
    title: "Policy for Determining Material Subsidiaries",
    category: "Governance",
    description: "Governance guidelines and investment/turnover thresholds for identifying, managing, and overseeing material subsidiary entities.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/policy-for-determining-material-subsidiaries.pdf"
  },
  {
    id: 8,
    title: "Policy for Evaluation of Performance of Board of Directors",
    category: "Governance",
    description: "Structured evaluation process assessing performance of the Board as a whole, its committees, individual Directors, and the Chairperson.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/policy-for-evaluation-of-the-performance-of-the-board-of-directors.pdf"
  },
  {
    id: 9,
    title: "Policy on Diversity of Board of Directors",
    category: "Governance",
    description: "Commitment to broad diversity in skills, professional expertise, regional experience, industry perspectives, and gender representation across the Board.",
    lastUpdated: "May 2026",
    access: "Public",
    link: "/documents/policy-on-diversity-of-the-board-of-directors.pdf"
  },
  {
    id: 10,
    title: "Policy on Familiarisation Programme for Independent Directors",
    category: "Governance",
    description: "Structured orientation, factory visits, regulatory updates, and strategic briefings to keep Independent Directors fully abreast of operations.",
    lastUpdated: "May 2026",
    access: "Public",
    link: "/documents/policy-on-familiarization-programme-for-independent-directors.pdf"
  },
  {
    id: 11,
    title: "Policy on Identification of Group Companies, Material Creditors & Litigations",
    category: "Compliance",
    description: "Standards and quantitative benchmarks for identifying group companies, material outstanding creditors, and reportable material litigations.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/policy-on-identification-of-group-companies-material-creditors-and-material-litigations.pdf"
  },
  {
    id: 12,
    title: "Policy on Preservation and Archival of Documents",
    category: "Compliance",
    description: "Statutory schedules and procedures for preservation, retention periods, and archival of electronic and physical corporate records.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/policy-on-preservation-of-documents-and-archival-of-documents.pdf"
  },
  {
    id: 13,
    title: "Policy on Prevention of Sexual Harassment of Women at Workplace (POSH)",
    category: "HR Policies",
    description: "Zero-tolerance framework, redressal mechanisms, and Internal Complaints Committee (ICC) procedures ensuring a safe, respectful working environment.",
    lastUpdated: "May 2026",
    access: "Public",
    link: "/documents/policy-on-prevention-of-sexual-harassment-of-women-at-workplace.pdf"
  },
  {
    id: 14,
    title: "Policy on Related Party Transactions",
    category: "Compliance",
    description: "Procedures for identification, prior approval, omnibus limits, and disclosure of transactions with related parties on an arm's length basis.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/policy-on-related-party-transactions.pdf"
  },
  {
    id: 15,
    title: "Risk Management Policy",
    category: "Governance",
    description: "Enterprise framework for identifying, assessing, mitigating, and monitoring operational, strategic, financial, and environmental risks.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/risk-management-policy.pdf"
  },
  {
    id: 16,
    title: "Succession Planning Policy for Board and Senior Management",
    category: "Governance",
    description: "Strategic plan for timely identification, development, and seamless succession of leadership talent for the Board and Senior Management.",
    lastUpdated: "May 2026",
    access: "Internal",
    link: "/documents/succession-planning-policy-for-the-board-of-directors-and-senior-management.pdf"
  },
  {
    id: 17,
    title: "Terms and Conditions of Appointment of Independent Directors",
    category: "Governance",
    description: "Formal letter terms, fiduciary roles, statutory responsibilities, code of conduct compliance, and remuneration details for Independent Directors.",
    lastUpdated: "May 2026",
    access: "Public",
    link: "/documents/terms-and-conditions-of-appointment-of-independent-directors.pdf"
  },
  {
    id: 18,
    title: "Vigil Mechanism / Whistle Blower Policy",
    category: "Compliance",
    description: "Confidential whistleblowing mechanism allowing employees and stakeholders to report genuine concerns or unethical conduct with complete protection.",
    lastUpdated: "May 2026",
    access: "Statutory",
    link: "/documents/vigil-mechanism-whistle-blower-policy.pdf"
  }
];

export function PoliciesListing() {
  return (
    <React.Suspense fallback={<div className="py-16 text-center text-[#0D2440]/50 dark:text-white/50 font-heading font-medium">Loading policies...</div>}>
      <PoliciesListingInner />
    </React.Suspense>
  );
}

function PoliciesListingInner() {
  const [selectedPolicy, setSelectedPolicy] = useState<null | PolicyItem>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = searchParams.get("sort") || "asc";
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const categoryParam = (searchParams.get("category") || searchParams.get("cat") || "all").toLowerCase().trim();
  const viewMode = searchParams.get("view") || "grid";

  const handleView = (policy: PolicyItem) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const sortedPolicies = useMemo(() => {
    let list = [...policies];
    if (categoryParam && categoryParam !== "all") {
      list = list.filter((p) => {
        if (categoryParam === "governance") return p.category.toLowerCase() === "governance";
        if (categoryParam === "hr") return p.category.toLowerCase().includes("hr");
        if (categoryParam === "compliance") return p.category.toLowerCase() === "compliance";
        return p.category.toLowerCase().includes(categoryParam);
      });
    }
    if (query) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }
    return list.sort((a, b) => {
      if (sort === "asc") {
        return a.id - b.id;
      }
      return b.id - a.id;
    });
  }, [sort, query, categoryParam]);

  const isDefaultView = !query && categoryParam === "all";
  const flagshipPolicy = isDefaultView && sortedPolicies.length > 0 ? sortedPolicies[0] : null;
  const gridPolicies = sortedPolicies;

  return (
    <>
      <section className="py-8 sm:py-16 md:py-20 bg-white dark:bg-[#071321] transition-colors relative">
        <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

        <div className="container-custom relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 sm:pb-8 border-b border-[#7BA4D0]/15 mb-6 sm:mb-10 gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.25em]">
                  Governance Framework
                </span>
                <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-[#0D2440] dark:text-white font-heading font-bold">
                  {sortedPolicies.length} Policies
                </span>
              </div>
              <p className="text-xs text-[#0D2440]/60 dark:text-white/60 font-medium mt-0.5">
                Official codes, statutory directives, and governance charters for J Pan
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-[#0D2440]/70 dark:text-white/70">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-heading font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Statutory Verified
              </span>
            </div>
          </div>

          {/* Empty State */}
          {sortedPolicies.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 sm:py-20 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/20 max-w-xl mx-auto my-8"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto mb-4 sm:mb-5 text-[#2E5E99]">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
                No Policies Found
              </h3>
              <p className="text-xs text-[#0D2440]/60 dark:text-white/60 mb-6 leading-relaxed">
                No governance directives match your search query. Reset filters to view all corporate policies.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-heading font-bold transition-all shadow-md min-h-[40px] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Search
              </button>
            </motion.div>
          )}

          {/* VIEW MODE 1: EDITORIAL BENTO GRID */}
          {viewMode === "grid" && sortedPolicies.length > 0 && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* FLAGSHIP SPOTLIGHT CARD (Light Blue Container with White Tactile Document) */}
              {flagshipPolicy && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#E7F0FA] dark:bg-[#0D2440] text-[#0D2440] dark:text-white border border-[#7BA4D0]/40 dark:border-[#7BA4D0]/30 shadow-xl shadow-[#2E5E99]/8 p-5 sm:p-8 md:p-12 group transition-all"
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#7BA4D0]/20 dark:bg-[#2E5E99]/25 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#2E5E99]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column Information */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-heading font-bold text-[#0D2440]/65 dark:text-white/65 tracking-wider">
                          Updated {flagshipPolicy.lastUpdated} · {flagshipPolicy.category}
                        </span>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-[#0D2440] dark:text-white leading-tight">
                          {flagshipPolicy.title}
                        </h3>
                        <p className="text-lg sm:text-xl md:text-2xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-tight">
                          {flagshipPolicy.category} Charter
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm md:text-base text-[#0D2440]/80 dark:text-white/80 max-w-xl leading-relaxed">
                        {flagshipPolicy.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-2">
                        <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                          Classification: <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-heading font-bold">{flagshipPolicy.category}</span>
                        </div>
                        <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                          Access: <span className="text-emerald-700 dark:text-emerald-400 font-heading font-bold">{flagshipPolicy.access}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                        <a
                          href={flagshipPolicy.link}
                          download
                          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg group/btn hover:scale-[1.02] active:scale-[0.98] min-h-[44px] cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-white group-hover/btn:translate-y-0.5 transition-transform shrink-0" />
                          <span>Download Policy PDF</span>
                        </a>

                        <button
                          onClick={() => handleView(flagshipPolicy)}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-[#F4F8FD] dark:bg-[#0D2440] dark:hover:bg-white/10 border border-[#7BA4D0]/40 dark:border-white/20 text-[#0D2440] dark:text-white text-xs sm:text-sm font-heading font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] min-h-[44px] cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                          <span>Document Preview</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Tactile Pure White Document Card */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                      <div 
                        onClick={() => handleView(flagshipPolicy)}
                        className="cursor-pointer relative w-full max-w-sm aspect-[4/5] rounded-2xl bg-white text-[#0D2440] border border-[#7BA4D0]/35 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#2E5E99] group-hover:shadow-2xl"
                      >
                        <div className="flex items-center justify-between pb-4 border-b border-[#7BA4D0]/20">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-[#0D2440]/60 block">
                                STATUTORY DIRECTIVE
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
                            {flagshipPolicy.category}
                          </p>
                          <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#0D2440]/55">
                            Updated {flagshipPolicy.lastUpdated}
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

              {/* Archival Bento Grid with all 18 Policies */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPolicies.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 6) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/70 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-xs"
                  >
                    <div className="absolute top-5 right-6 text-5xl sm:text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/25 transition-colors duration-500 select-none pointer-events-none">
                      {String(item.id).padStart(2, "0")}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-xs font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                          {item.lastUpdated}
                        </span>
                      </div>

                      <div className="space-y-2 mb-6">
                        <h4 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#0D2440]/60 dark:text-white/60 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-[#7BA4D0]/15 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleView(item)}
                        className="px-3.5 py-2 rounded-xl text-xs font-heading font-bold text-[#0D2440] dark:text-white bg-white dark:bg-white/5 hover:bg-[#E7F0FA] dark:hover:bg-white/15 border border-[#7BA4D0]/30 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                        Preview
                      </button>

                      <a
                        href={item.link}
                        download
                        className="px-4 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#0D2440] hover:bg-[#2E5E99] transition-all flex items-center gap-2 shadow-xs group/btn cursor-pointer"
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
          {viewMode === "ledger" && sortedPolicies.length > 0 && (
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
                      <th className="py-4 px-6">Directive Name</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6 hidden sm:table-cell">Last Updated</th>
                      <th className="py-4 px-6 hidden md:table-cell">Access Level</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7BA4D0]/15 text-xs text-[#0D2440] dark:text-white">
                    {sortedPolicies.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#F1F6FB] dark:hover:bg-white/5 transition-colors group"
                      >
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
                                {item.lastUpdated} · {item.access}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-heading font-black text-sm text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                          {item.category}
                        </td>

                        <td className="py-4 px-6 hidden sm:table-cell font-heading font-semibold text-xs text-[#0D2440]/70 dark:text-white/70">
                          {item.lastUpdated}
                        </td>

                        <td className="py-4 px-6 hidden md:table-cell">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-heading text-[10px] font-bold uppercase tracking-wider">
                            {item.access}
                          </div>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleView(item)}
                              className="p-2 rounded-lg bg-white dark:bg-white/10 border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white transition-all cursor-pointer"
                              title="Preview Policy"
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

      <PoliciesDetailModal
        policy={selectedPolicy}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
