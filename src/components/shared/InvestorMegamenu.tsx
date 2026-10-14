"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ShieldCheck, ExternalLink, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Icon3DFinancialResults,
  Icon3DInvestorMeet,
  Icon3DPresentation,
  Icon3DPressRelease,
  Icon3DAudioRecordings,
  Icon3DCallTranscripts,
  Icon3DNewspaper,
  Icon3DShareholding,
  Icon3DUnclaimed,
  Icon3DDeviations,
  Icon3DAnnualReport,
  Icon3DAnnualReturn,
  Icon3DBoardMeeting,
  Icon3DGeneralMeeting,
  Icon3DSecretarial,
  Icon3DPolicies,
  Icon3DSEBI,
  Icon3DGrievance,
  Icon3DContactDesk,
  Icon3DMaterialContracts,
  Icon3DCreditRating,
} from "./Investor3DIcons";

interface SubOptionItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
  icon: (props: { isHovered?: boolean }) => React.JSX.Element;
}

interface PillarBox {
  id: string;
  title: string;
  subtitle: string;
  directHref?: string;
  badgeLabel: string;
  isExpandable: boolean;
  icon: (props: { isHovered?: boolean }) => React.JSX.Element;
  items?: SubOptionItem[];
}

const pillarBoxes: PillarBox[] = [
  {
    id: "annual-reports",
    title: "Annual Reports & Filings",
    subtitle: "Audited fiscal accounts, MGT-7 & AGM notices",
    badgeLabel: "5 Documents",
    isExpandable: true,
    icon: Icon3DAnnualReport,
    items: [
      {
        id: "ann-rep",
        title: "Annual Reports",
        subtitle: "Integrated Fiscal Reports & Auditor Statements",
        href: "/annual-reports",
        badge: "PDF Available",
        icon: Icon3DAnnualReport,
      },
      {
        id: "ann-ret",
        title: "Annual Return (MGT-7)",
        subtitle: "Form MGT-7 Filed with Registrar of Companies",
        href: "/annual-return",
        badge: "MCA Record",
        icon: Icon3DAnnualReturn,
      },
      {
        id: "board-notices",
        title: "Notice of Board Meeting",
        subtitle: "Prior Intimation under Regulation 29",
        href: "/board-meeting-notices",
        badge: "BSE/NSE",
        icon: Icon3DBoardMeeting,
      },
      {
        id: "general-meeting",
        title: "General Meeting Notices",
        subtitle: "AGM/EGM Scrutinizer Reports & E-Voting",
        href: "/general-meeting",
        badge: "Shareholder",
        icon: Icon3DGeneralMeeting,
      },
      {
        id: "secretarial",
        title: "Secretarial Compliance",
        subtitle: "Annual Secretarial Audit under Reg 24A",
        href: "/secretarial-compliance",
        badge: "Certified",
        icon: Icon3DSecretarial,
      },
    ],
  },
  {
    id: "financial-info",
    title: "Financial Information",
    subtitle: "Quarterly results, analyst calls & shareholding",
    badgeLabel: "10 Statements",
    isExpandable: true,
    icon: Icon3DFinancialResults,
    items: [
      {
        id: "fin-results",
        title: "Financial Results",
        subtitle: "Standalone & Consolidated Audited Financials",
        href: "/financial-results",
        badge: "FY 2024-25",
        icon: Icon3DFinancialResults,
      },
      {
        id: "inv-meet",
        title: "Investor Meet Intimation",
        subtitle: "Advance Institutional Meet Schedules",
        href: "/investor-meet-intimation",
        badge: "Statutory",
        icon: Icon3DInvestorMeet,
      },
      {
        id: "inv-pres",
        title: "Investor Presentation",
        subtitle: "Corporate Strategic Decks & Growth Metrics",
        href: "/investor-presentation",
        badge: "Deck Available",
        icon: Icon3DPresentation,
      },
      {
        id: "press-rel",
        title: "Press Releases",
        subtitle: "Formal Stock Exchange Disclosures",
        href: "/press-releases",
        badge: "Media Center",
        icon: Icon3DPressRelease,
      },
      {
        id: "call-audio",
        title: "Call Audio Recordings",
        subtitle: "Unedited Earnings Conference Feeds",
        href: "/call-audio-recordings",
        badge: "Audio Hub",
        icon: Icon3DAudioRecordings,
      },
      {
        id: "call-trans",
        title: "Call Transcripts",
        subtitle: "Verbatim Analyst Q&A Disclosures",
        href: "/call-transcripts",
        badge: "Verbatim",
        icon: Icon3DCallTranscripts,
      },
      {
        id: "news-pub",
        title: "Newspaper Publications",
        subtitle: "Financial Ads in Regional & English Dailies",
        href: "/newspaper-publication",
        badge: "Notices",
        icon: Icon3DNewspaper,
      },
      {
        id: "shareholding",
        title: "Shareholding Pattern",
        subtitle: "Promoter & Public Equity Distribution",
        href: "/shareholding-pattern",
        badge: "Quarterly",
        icon: Icon3DShareholding,
      },
      {
        id: "unclaimed",
        title: "Unclaimed & Unpaid",
        subtitle: "Dividend Database & IEPF Ledger",
        href: "/unclaimed-unpaid",
        badge: "Database",
        icon: Icon3DUnclaimed,
      },
      {
        id: "deviations",
        title: "Statement of Deviations",
        subtitle: "SEBI Reg 32 Capital Utilization Report",
        href: "/statement-of-deviations",
        badge: "Reg 32",
        icon: Icon3DDeviations,
      },
    ],
  },
  {
    id: "investor-grievance",
    title: "Investor Grievance",
    subtitle: "SCORES portal, Nodal Officer & redressal matrix",
    directHref: "/investor-grievance",
    badgeLabel: "Direct Redressal",
    isExpandable: false,
    icon: Icon3DGrievance,
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance",
    subtitle: "Statutory policies & SEBI LODR Regulation 46/62",
    badgeLabel: "2 Policies",
    isExpandable: true,
    icon: Icon3DSEBI,
    items: [
      {
        id: "policies",
        title: "Corporate Policies",
        subtitle: "Whistleblower, POSH, CSR & Code of Conduct",
        href: "/policies",
        badge: "Board Approved",
        icon: Icon3DPolicies,
      },
      {
        id: "sebi-discl",
        title: "SEBI LODR Disclosures",
        subtitle: "Mandatory Website Disclosures Reg 46 & 62",
        href: "/sebi-disclosures",
        badge: "Compliance",
        icon: Icon3DSEBI,
      },
    ],
  },
  {
    id: "other-information",
    title: "Other Information",
    subtitle: "CRISIL / ICRA ratings & key material contracts",
    badgeLabel: "2 Filings",
    isExpandable: true,
    icon: Icon3DMaterialContracts,
    items: [
      {
        id: "material-docs",
        title: "Material Contracts & Documents",
        subtitle: "Inspection of Key Commercial & Technical Deeds",
        href: "/material-documents-contracts",
        badge: "Repository",
        icon: Icon3DMaterialContracts,
      },
      {
        id: "credit-rating",
        title: "Credit Rating",
        subtitle: "CRISIL / ICRA Ratings on Borrowing Facilities",
        href: "/credit-rating",
        badge: "Investment Grade",
        icon: Icon3DCreditRating,
      },
    ],
  },
];

interface InvestorMegamenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function InvestorMegamenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: InvestorMegamenuProps) {
  // Phase 2: active category box expanded state
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(null);
  const [hoveredPillarId, setHoveredPillarId] = useState<string | null>(null);
  const [hoveredSubCardId, setHoveredSubCardId] = useState<string | null>(null);

  const activePillar = pillarBoxes.find((p) => p.id === expandedPillarId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => {
            onMouseLeave();
          }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-full max-w-6xl xl:max-w-7xl px-3 sm:px-4 z-[90] pointer-events-auto"
        >
          {/* Master Cinematic Container Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[28px] sm:rounded-[36px] bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_24px_70px_rgba(13,36,64,0.15)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-5 sm:p-7 md:p-8 overflow-hidden transform-gpu"
          >
            {/* Top Category Overline Header */}
            <div className="flex flex-wrap items-center justify-between pb-3.5 mb-5 border-b border-slate-200/70 dark:border-white/10 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E5E99] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#2E5E99] dark:text-[#7BA4D0]">
                  Investor Relations Ecosystem
                </span>
                <span className="text-slate-300 dark:text-white/20">|</span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                  SEBI (LODR) Regulations 2015 Compliant
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#2E5E99]" />
                <span>Hover a Box to Expand Modules</span>
              </div>
            </div>

            {/* PHASE 1: The 5 Primary Category Boxes (Horizontal Roveia-style Card Deck) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
              {pillarBoxes.map((box) => {
                const IconComponent = box.icon;
                const isHovered = hoveredPillarId === box.id;
                const isExpanded = expandedPillarId === box.id;

                const CardWrapper: React.ElementType = box.directHref ? Link : "div";
                const wrapperProps = box.directHref
                  ? { href: box.directHref, onClick: onClose }
                  : {};

                return (
                  <CardWrapper
                    key={box.id}
                    {...wrapperProps}
                    onMouseEnter={() => {
                      setHoveredPillarId(box.id);
                      if (box.isExpandable) {
                        setExpandedPillarId(box.id);
                      }
                    }}
                    className={cn(
                      "group/box relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none overflow-hidden",
                      isExpanded
                        ? "bg-gradient-to-b from-[#EBF3FC]/90 to-white dark:from-[#2E5E99]/25 dark:to-[#0D2440]/40 border-[#2E5E99] shadow-[0_0_25px_rgba(46,94,153,0.22)] -translate-y-1"
                        : isHovered
                        ? "bg-white dark:bg-[#0D2440]/60 border-[#7BA4D0]/60 shadow-[0_10px_25px_rgba(13,36,64,0.08)] -translate-y-0.5"
                        : "bg-[#F8FAFC]/90 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/5 hover:border-[#7BA4D0]/40"
                    )}
                  >
                    {/* Ambient Glow Aura */}
                    <div
                      className={cn(
                        "absolute -top-12 -left-12 w-28 h-28 rounded-full transition-opacity duration-500 pointer-events-none",
                        isHovered || isExpanded
                          ? "opacity-80 bg-radial from-[#60A5FA]/30 to-transparent blur-xl"
                          : "opacity-0"
                      )}
                    />

                    <div>
                      {/* 3D Component Icon Box */}
                      <div className="mb-3 flex items-center justify-between">
                        <IconComponent isHovered={isHovered || isExpanded} />
                        {box.isExpandable ? (
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                              isExpanded
                                ? "bg-[#2E5E99] text-white rotate-180"
                                : "bg-slate-200/70 dark:bg-white/10 text-slate-500 group-hover/box:bg-[#EBF3FC] group-hover/box:text-[#2E5E99]"
                            )}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3
                        className={cn(
                          "text-xs sm:text-sm font-bold tracking-tight mb-1 transition-colors leading-snug",
                          isExpanded || isHovered
                            ? "text-[#0D2440] dark:text-white"
                            : "text-slate-800 dark:text-slate-200"
                        )}
                      >
                        {box.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {box.subtitle}
                      </p>
                    </div>

                    {/* Bottom Micro Pill */}
                    <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-colors",
                          isExpanded
                            ? "bg-[#2E5E99] text-white"
                            : "bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-slate-400"
                        )}
                      >
                        {box.badgeLabel}
                      </span>
                      <span className="text-[10px] font-semibold text-[#2E5E99] dark:text-[#7BA4D0] opacity-0 group-hover/box:opacity-100 transition-opacity flex items-center gap-0.5">
                        {box.isExpandable ? "Expand" : "Open"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>

            {/* PHASE 2: Concentric Expansion Drawer (Sub-Options of Hovered Box) */}
            <AnimatePresence mode="wait">
              {activePillar && activePillar.items && (
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 pt-5 border-t border-slate-200/70 dark:border-white/10 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {activePillar.title} Modules
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#EBF3FC] dark:bg-white/10 text-[#2E5E99] dark:text-[#7BA4D0] text-[10px] font-bold">
                        {activePillar.items.length} Options
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpandedPillarId(null)}
                      className="text-[10px] text-slate-400 hover:text-[#0D2440] dark:hover:text-white uppercase font-bold tracking-wider cursor-pointer"
                    >
                      Collapse [-]
                    </button>
                  </div>

                  {/* Sub-Items Grid of 3D Cards */}
                  <div
                    className={cn(
                      "grid gap-3",
                      activePillar.items.length > 5
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                        : activePillar.items.length > 2
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-2"
                    )}
                  >
                    {activePillar.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubHovered = hoveredSubCardId === subItem.id;

                      return (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          onClick={onClose}
                          onMouseEnter={() => setHoveredSubCardId(subItem.id)}
                          onMouseLeave={() => setHoveredSubCardId(null)}
                          className={cn(
                            "group/subcard relative p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none overflow-hidden",
                            isSubHovered
                              ? "bg-white dark:bg-[#0D2440] border-[#2E5E99] shadow-[0_0_24px_rgba(46,94,153,0.22)] dark:shadow-[0_0_28px_rgba(123,164,208,0.2)] -translate-y-1"
                              : "bg-[#F8FAFC]/80 dark:bg-white/[0.03] border-slate-200/70 dark:border-white/5 hover:border-[#7BA4D0]/50"
                          )}
                        >
                          {/* Ambient Sub-Glow */}
                          <div
                            className={cn(
                              "absolute -top-8 -left-8 w-20 h-20 rounded-full transition-opacity duration-500 pointer-events-none",
                              isSubHovered
                                ? "opacity-75 bg-radial from-[#60A5FA]/35 to-transparent blur-lg"
                                : "opacity-0"
                            )}
                          />

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <SubIcon isHovered={isSubHovered} />
                              {subItem.badge && (
                                <span
                                  className={cn(
                                    "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 transition-colors",
                                    isSubHovered
                                      ? "bg-[#2E5E99] text-white"
                                      : "bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-slate-400"
                                  )}
                                >
                                  {subItem.badge}
                                </span>
                              )}
                            </div>

                            <h4
                              className={cn(
                                "text-xs font-bold tracking-tight mb-1 transition-colors leading-snug line-clamp-1",
                                isSubHovered
                                  ? "text-[#0D2440] dark:text-white"
                                  : "text-slate-800 dark:text-slate-100"
                              )}
                            >
                              {subItem.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {subItem.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[10px] font-semibold text-[#2E5E99] dark:text-[#7BA4D0]">
                            <span>Explore Module</span>
                            <ArrowRight
                              className={cn(
                                "w-3 h-3 transition-transform duration-200",
                                isSubHovered ? "translate-x-1" : "opacity-60"
                              )}
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Quick Action Footer Strip */}
                  <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-[#2E5E99]" />
                      <span>BSE & NSE Listed Entity · Regulation 46 & 62 Timely Compliance</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="/documents/j-pan-unclaimed-database.pdf"
                        download
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-[#0D2440] dark:text-white text-[11px] font-bold flex items-center gap-2 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#2E5E99]" />
                        <span>Annual Report PDF</span>
                      </a>
                      <Link
                        href="/contact"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>IR Desk Hotline</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
