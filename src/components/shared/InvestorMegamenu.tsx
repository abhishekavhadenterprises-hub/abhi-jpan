"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Icon3DAnnualReport,
  Icon3DFinancialResults,
  Icon3DGrievance,
  Icon3DGovernance,
  Icon3DOtherInfo,
  Icon3DDocument,
  Icon3DAudio,
  Icon3DPresentation,
  Icon3DChart,
  Icon3DScales,
  Icon3DCalendar,
  Icon3DAssembly,
  Icon3DWaxSeal,
  Icon3DNewspaper,
  Icon3DCreditScore,
} from "./Premium3DIcons";

interface SubCardItem {
  id: string;
  title: string;
  href: string;
  icon: (props: { isHovered?: boolean }) => React.JSX.Element;
}

interface PillarBox {
  id: string;
  title: string;
  directHref?: string;
  isExpandable: boolean;
  icon: (props: { isHovered?: boolean }) => React.JSX.Element;
  items?: SubCardItem[];
}

const pillarBoxes: PillarBox[] = [
  {
    id: "annual-reports",
    title: "Annual Reports",
    isExpandable: true,
    icon: Icon3DAnnualReport,
    items: [
      { id: "ann-rep", title: "Annual Reports", href: "/annual-reports", icon: Icon3DAnnualReport },
      { id: "ann-ret", title: "Annual Return", href: "/annual-return", icon: Icon3DDocument },
      { id: "board-notices", title: "Notice of Board Meeting", href: "/board-meeting-notices", icon: Icon3DCalendar },
      { id: "general-meeting", title: "General Meeting Notices", href: "/general-meeting", icon: Icon3DAssembly },
      { id: "secretarial", title: "Secretarial Compliance", href: "/secretarial-compliance", icon: Icon3DWaxSeal },
    ],
  },
  {
    id: "financial-info",
    title: "Financial Information",
    isExpandable: true,
    icon: Icon3DFinancialResults,
    items: [
      { id: "fin-results", title: "Financial Results", href: "/financial-results", icon: Icon3DFinancialResults },
      { id: "inv-meet", title: "Investor Meet Intimation", href: "/investor-meet-intimation", icon: Icon3DPresentation },
      { id: "inv-pres", title: "Investor Presentation", href: "/investor-presentation", icon: Icon3DPresentation },
      { id: "press-rel", title: "Press Releases", href: "/press-releases", icon: Icon3DDocument },
      { id: "call-audio", title: "Call Audio Recordings", href: "/call-audio-recordings", icon: Icon3DAudio },
      { id: "call-trans", title: "Call Transcripts", href: "/call-transcripts", icon: Icon3DDocument },
      { id: "news-pub", title: "Newspaper Publications", href: "/newspaper-publication", icon: Icon3DNewspaper },
      { id: "shareholding", title: "Shareholding Pattern", href: "/shareholding-pattern", icon: Icon3DChart },
      { id: "unclaimed", title: "Unclaimed & Unpaid", href: "/unclaimed-unpaid", icon: Icon3DOtherInfo },
      { id: "deviations", title: "Statement of Deviations", href: "/statement-of-deviations", icon: Icon3DScales },
    ],
  },
  {
    id: "investor-grievance",
    title: "Investor Grievance",
    directHref: "/investor-grievance",
    isExpandable: false,
    icon: Icon3DGrievance,
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance",
    isExpandable: true,
    icon: Icon3DGovernance,
    items: [
      { id: "policies", title: "Corporate Policies", href: "/policies", icon: Icon3DGovernance },
      { id: "sebi-discl", title: "SEBI LODR Disclosures", href: "/sebi-disclosures", icon: Icon3DDocument },
    ],
  },
  {
    id: "other-information",
    title: "Other Information",
    isExpandable: true,
    icon: Icon3DOtherInfo,
    items: [
      { id: "material-docs", title: "Material Contracts", href: "/material-documents-contracts", icon: Icon3DOtherInfo },
      { id: "credit-rating", title: "Credit Rating", href: "/credit-rating", icon: Icon3DCreditScore },
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
  // Always start collapsed with NO sub-grid open by default
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(null);
  const [hoveredPillarId, setHoveredPillarId] = useState<string | null>(null);
  const [hoveredSubCardId, setHoveredSubCardId] = useState<string | null>(null);

  // Critical Fix: Automatically reset expansion state whenever menu closes
  useEffect(() => {
    if (!isOpen) {
      setExpandedPillarId(null);
      setHoveredPillarId(null);
      setHoveredSubCardId(null);
    }
  }, [isOpen]);

  const activePillar = pillarBoxes.find((p) => p.id === expandedPillarId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-full max-w-5xl xl:max-w-6xl px-4 z-[90] pointer-events-auto"
        >
          {/* Master Clean Floating Box Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[28px] sm:rounded-[32px] bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_20px_60px_rgba(13,36,64,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-7 overflow-hidden transform-gpu"
          >
            {/* The 5 Primary Category Boxes (Pure, Clean, Premium 3D Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
              {pillarBoxes.map((box) => {
                const IconComponent = box.icon;
                const isHovered = hoveredPillarId === box.id;
                const isExpanded = expandedPillarId === box.id;

                const CardWrapper: React.ElementType = box.directHref ? Link : "div";
                const wrapperProps = box.directHref
                  ? { href: box.directHref, onClick: onClose }
                  : {
                    onClick: () => {
                      if (box.isExpandable) {
                        setExpandedPillarId((prev) => (prev === box.id ? null : box.id));
                      }
                    },
                  };

                return (
                  <CardWrapper
                    key={box.id}
                    {...wrapperProps}
                    onMouseEnter={() => {
                      setHoveredPillarId(box.id);
                      if (box.isExpandable) {
                        setExpandedPillarId(box.id);
                      } else {
                        setExpandedPillarId(null);
                      }
                    }}
                    className={cn(
                      "group/box relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer select-none min-h-[140px]",
                      isExpanded
                        ? "bg-white dark:bg-[#0D2440] border-[#2E5E99] shadow-[0_12px_32px_rgba(46,94,153,0.22)] -translate-y-1"
                        : isHovered
                          ? "bg-white dark:bg-[#0D2440]/60 border-[#7BA4D0]/60 shadow-[0_8px_20px_rgba(13,36,64,0.08)] -translate-y-0.5"
                          : "bg-[#F8FAFC]/90 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/5 hover:border-[#7BA4D0]/40"
                    )}
                  >
                    {/* Ambient Glow Aura on Hover */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none",
                        isHovered || isExpanded
                          ? "opacity-60 bg-radial from-[#60A5FA]/25 via-transparent to-transparent blur-md"
                          : "opacity-0"
                      )}
                    />

                    {/* 3D Component Icon */}
                    <div className="mb-3 flex items-center justify-center">
                      <IconComponent isHovered={isHovered || isExpanded} />
                    </div>

                    {/* Clean Bold Title */}
                    <h3
                      className={cn(
                        "text-xs sm:text-[13px] font-bold tracking-tight transition-colors text-center leading-snug",
                        isExpanded || isHovered
                          ? "text-[#0D2440] dark:text-white"
                          : "text-slate-700 dark:text-slate-200"
                      )}
                    >
                      {box.title}
                    </h3>
                  </CardWrapper>
                );
              })}
            </div>

            {/* Sub-Options Grid of Clean 3D Cards (Expands ONLY when intentional box is hovered) */}
            <AnimatePresence mode="wait">
              {activePillar && activePillar.items && (
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 pt-5 border-t border-slate-200/60 dark:border-white/10 overflow-hidden"
                >
                  <div
                    className={cn(
                      "grid gap-3",
                      activePillar.items.length > 5
                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                        : activePillar.items.length > 2
                          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                          : "grid-cols-2"
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
                            "group/subcard relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer select-none overflow-hidden min-h-[110px]",
                            isSubHovered
                              ? "bg-white dark:bg-[#0D2440] border-[#2E5E99] shadow-[0_8px_24px_rgba(46,94,153,0.22)] -translate-y-1"
                              : "bg-[#F8FAFC]/80 dark:bg-white/[0.03] border-slate-200/70 dark:border-white/5 hover:border-[#7BA4D0]/50"
                          )}
                        >
                          {/* Ambient Sub-Glow */}
                          <div
                            className={cn(
                              "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none",
                              isSubHovered
                                ? "opacity-60 bg-radial from-[#60A5FA]/25 to-transparent blur-md"
                                : "opacity-0"
                            )}
                          />

                          <div className="mb-2 flex items-center justify-center">
                            <SubIcon isHovered={isSubHovered} />
                          </div>

                          <h4
                            className={cn(
                              "text-xs font-bold tracking-tight transition-colors text-center leading-snug line-clamp-2",
                              isSubHovered
                                ? "text-[#0D2440] dark:text-white"
                                : "text-slate-800 dark:text-slate-200"
                            )}
                          >
                            {subItem.title}
                          </h4>
                        </Link>
                      );
                    })}
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
