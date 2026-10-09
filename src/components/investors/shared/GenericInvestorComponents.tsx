"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  Eye, 
  ArrowUpRight, 
  Share2, 
  RotateCcw,
  FileSpreadsheet
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/* =========================================================================
   1. CINEMATIC HERO COMPONENT (PREMIUM HERO ANIMATIONS)
   ========================================================================= */

export interface GenericInvestorHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  parent?: string;
  variant?: "bottom" | "centered" | "left" | "ledger" | "editorial";
  chips?: Array<{ label: string; value: string }>;
  badgeText?: string;
}

export function GenericInvestorHero({
  title,
  subtitle = "Precision Disclosures & Corporate Transparency",
  image = "/images/about-hero-new.png",
  parent = "INVESTOR RELATIONS",
  badgeText,
  chips
}: GenericInvestorHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax Calculations
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Staggered 3D Character Animation Variants
  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 40, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const displayBadge = badgeText || parent || "OFFICIAL DISCLOSURES";

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] sm:min-h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 bg-[#071321]"
    >
      {/* Dynamic Cinematic Inset Frame */}
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.95, 
          borderRadius: "100px", 
          top: "2rem", 
          bottom: "2rem", 
          left: "2rem", 
          right: "2rem" 
        }}
        whileInView={{ 
          opacity: 1, 
          scale: 1, 
          borderRadius: "0px", 
          top: "0px", 
          bottom: "0px", 
          left: "0px", 
          right: "0px" 
        }}
        viewport={{ once: true }}
        transition={{ 
          opacity: { duration: 1 },
          scale: { duration: 1 },
          default: { duration: 3.5, delay: 1, ease: [0.16, 1, 0.3, 1] } 
        }}
        className="absolute z-0 overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50"
      >
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-90 dark:brightness-[0.4] saturate-[0.9] contrast-[1.1]"
          />
        </motion.div>

        {/* Gradient Scrims for Flawless Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-black/40 via-50% to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Subtle Glowing Perimeter Border */}
        <motion.div 
          initial={{ borderRadius: "100px" }}
          whileInView={{ borderRadius: "0px" }}
          viewport={{ once: true }}
          transition={{ duration: 3.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 border border-white/20 dark:border-white/10 pointer-events-none mix-blend-overlay" 
        />
      </motion.div>

      {/* Hero Content Lockup */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-custom relative z-10 w-full flex flex-col items-center text-center justify-center px-4"
      >
        {/* Floating Glassmorphic Category Kicker */}
        {displayBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-8 inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 shadow-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7BA4D0] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7BA4D0]" />
            </span>
            <span className="text-[10px] sm:text-xs font-heading font-black text-white uppercase tracking-[0.25em]">
              {displayBadge}
            </span>
          </motion.div>
        )}

        {/* Staggered 3D Typography Reveal */}
        <motion.div
          variants={sentence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 max-w-5xl mx-auto w-full"
          style={{ perspective: "1000px" }}
        >
          <motion.h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-heading font-black text-white tracking-tight leading-[1.08] text-balance text-center [word-break:keep-all] [overflow-wrap:normal]">
            {title.split(" ").map((word, wordIndex, wordsArr) => (
              <span key={word + "-" + wordIndex} className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIndex) => (
                  <motion.span key={char + "-" + charIndex} variants={letter} className="inline-block">
                    {char}
                  </motion.span>
                ))}
                {wordIndex < wordsArr.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/85 font-normal leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Optional Data Chips */}
        {chips && chips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-6"
          >
            {chips.map((chip, cIdx) => (
              <div
                key={cIdx}
                className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 text-xs"
              >
                <span className="text-[#7BA4D0] font-sans font-medium">{chip.label}:</span>
                <span className="font-heading font-bold text-white">{chip.value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 sm:bottom-12 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-heading font-bold text-white/50 uppercase tracking-[0.35em]">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-10 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-[#7BA4D0] absolute top-0 left-0"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* =========================================================================
   2. PRECISION FILTER & VIEW SWITCHER TOOLBAR
   ========================================================================= */

export function GenericInvestorFilter() {
  return (
    <React.Suspense fallback={<div className="py-6 text-center text-[#0D2440]/50 dark:text-white/50 font-heading font-medium">Loading controls...</div>}>
      <GenericInvestorFilterInner />
    </React.Suspense>
  );
}

function GenericInvestorFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "desc";
  const viewMode = searchParams.get("view") || "grid";
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pathname, router, searchParams]);

  const toggleSort = () => {
    const newSort = sort === "desc" ? "asc" : "desc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setView = (mode: "grid" | "ledger") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="relative z-30 bg-gradient-to-b from-white to-[#F8FAFC] dark:from-[#071321] dark:to-[#0A1A2E] border-y border-[#7BA4D0]/15 py-4 transition-colors">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Status Label */}
          <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Audited Statutory Disclosures</span>
          </div>

          {/* Action Cluster: Search + Sort + View */}
          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64 w-full">
              <input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#0D2440]/80 border border-[#7BA4D0]/30 dark:border-white/15 rounded-xl py-2 pl-9 pr-8 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/45 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] transition-all shadow-2xs"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#0D2440] dark:text-white/60 dark:hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Toggle */}
            <button
              onClick={toggleSort}
              title="Toggle Chronological Sorting"
              className="flex items-center gap-2 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 dark:border-white/15 rounded-xl py-2 px-3 text-xs font-heading font-bold text-[#0D2440] dark:text-white hover:border-[#2E5E99] transition-all shrink-0 shadow-2xs"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
              <span className="hidden sm:inline">{sort === "desc" ? "Newest" : "Oldest"}</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center p-0.5 bg-[#E7F0FA]/60 dark:bg-black/40 border border-[#7BA4D0]/25 rounded-xl shrink-0">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-1.5 rounded-lg text-xs font-medium transition-all",
                  viewMode === "grid"
                    ? "bg-white dark:bg-[#0D2440] text-[#2E5E99] dark:text-white shadow-2xs font-bold"
                    : "text-[#0D2440]/60 dark:text-white/60 hover:text-[#0D2440]"
                )}
                title="Bento Grid View"
                aria-label="Bento Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setView("ledger")}
                className={cn(
                  "p-1.5 rounded-lg text-xs font-medium transition-all",
                  viewMode === "ledger"
                    ? "bg-white dark:bg-[#0D2440] text-[#2E5E99] dark:text-white shadow-2xs font-bold"
                    : "text-[#0D2440]/60 dark:text-white/60 hover:text-[#0D2440]"
                )}
                title="Ledger Table View"
                aria-label="Ledger Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   3. SHARED DOCUMENT MODAL (FOR INSTANT PREVIEW)
   ========================================================================= */

interface ModalItem {
  id?: number | string;
  date?: string;
  period?: string;
  particulars?: string;
  title?: string;
  link?: string;
  downloadUrl?: string;
  type?: string;
}

function GenericDocumentModal({
  item,
  isOpen,
  onClose
}: {
  item: ModalItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !item) return null;

  const displayDate = item.period || item.date || "";
  const displayTitle = item.particulars || item.title || "Statutory Document";
  const downloadLink = item.downloadUrl || item.link || "/sample-report.pdf";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0D2440]/80 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl md:rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[85vh]">
        
        {/* Left Sidebar Metadata */}
        <div className="w-full md:w-80 p-6 md:p-8 bg-[#F8FAFC] dark:bg-black/30 border-b md:border-b-0 md:border-r border-[#7BA4D0]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-6 bg-[#2E5E99]" />
                <span className="text-[#2E5E99] font-heading font-black uppercase tracking-widest text-[10px]">
                  Investor Filing
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-[#7BA4D0]/10 rounded-full transition-colors text-[#0D2440] dark:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-3xl sm:text-4xl font-heading font-black text-[#0D2440] dark:text-white mb-2 block tracking-tight">
                {displayDate}
              </span>
              <h2 className="text-base font-heading font-semibold text-[#0D2440]/85 dark:text-white/85 leading-snug">
                {displayTitle}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <p className="text-[11px] font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Audited & Verified
                </p>
              </div>
              <p className="text-xs text-[#0D2440]/60 dark:text-white/60 leading-relaxed">
                Official statutory filing prepared in accordance with applicable regulatory disclosure standards.
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <a 
              href={downloadLink}
              download
              className="w-full bg-[#0D2440] hover:bg-[#2E5E99] text-white px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Official PDF
            </a>
            <button 
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-full bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5"
            >
              <Share2 className="w-4 h-4 text-[#2E5E99]" />
              Share Link
            </button>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="flex-grow bg-[#EBF3FC]/40 dark:bg-black/50 flex flex-col items-center justify-center p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-md">
            <div className="w-20 h-20 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md text-[#2E5E99] dark:text-[#7BA4D0]">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-3">
              Official Disclosure Document
            </h3>
            <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed mb-8">
              Full statutory accounts, governance disclosures, audit verifications, and notes to statements for {displayDate}.
            </p>
            <a 
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5E99] hover:bg-[#0D2440] text-white text-xs font-heading font-bold transition-all shadow-md"
            >
              Open in Full Viewer <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E5E99] via-[#7BA4D0] to-[#2E5E99]" />
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   4. GENERIC INVESTOR TABLE (USED IN ANNUAL RETURN, BOARD MEETINGS, ETC.)
   ========================================================================= */

export interface TableItem {
  id: number | string;
  date: string;
  particulars: string;
  link: string;
}

export interface GenericInvestorTableProps {
  data: TableItem[];
}

export function GenericInvestorTable({ data }: GenericInvestorTableProps) {
  return (
    <React.Suspense fallback={<div className="py-16 text-center text-[#0D2440]/50 dark:text-white/50 font-heading font-medium">Loading archives...</div>}>
      <GenericInvestorTableInner data={data} />
    </React.Suspense>
  );
}

function GenericInvestorTableInner({ data }: GenericInvestorTableProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = searchParams.get("sort") || "desc";
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const viewMode = searchParams.get("view") || "grid";

  const [activeModalItem, setActiveModalItem] = useState<TableItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item: TableItem) => {
    setActiveModalItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveModalItem(null);
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Filtered & Sorted data
  const sortedData = useMemo(() => {
    let list = [...data];

    if (query) {
      list = list.filter(
        (item) =>
          item.particulars.toLowerCase().includes(query) ||
          (item.date && item.date.toLowerCase().includes(query))
      );
    }

    return list.sort((a, b) => {
      if (a.date && b.date) {
        if (sort === "asc") {
          return a.date.localeCompare(b.date);
        }
        return b.date.localeCompare(a.date);
      }
      return sort === "desc" ? -1 : 1;
    });
  }, [data, sort, query]);

  const isDefaultView = !query && sort === "desc";
  const flagshipItem = isDefaultView && sortedData.length > 0 ? sortedData[0] : null;
  const gridItems = isDefaultView ? sortedData.slice(1) : sortedData;

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#071321] transition-colors relative">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-[#7BA4D0]/15 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.25em]">
                Disclosure Archive
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-[#0D2440] dark:text-white font-heading font-bold">
                {sortedData.length} {sortedData.length === 1 ? "Record" : "Records"}
              </span>
            </div>
            <p className="text-xs text-[#0D2440]/60 dark:text-white/60 font-medium mt-0.5">
              Official filings & statutory records for stakeholders
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold text-[#0D2440]/70 dark:text-white/70">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Audit Verified
            </span>
          </div>
        </div>

        {/* Empty State */}
        {sortedData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/20 max-w-xl mx-auto my-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto mb-5 text-[#2E5E99]">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
              No Disclosures Found
            </h3>
            <p className="text-xs text-[#0D2440]/60 dark:text-white/60 mb-6 leading-relaxed">
              No records match your query. Try resetting your search to browse all historical filings.
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
        {viewMode === "grid" && sortedData.length > 0 && (
          <div className="space-y-8">
            
            {/* FLAGSHIP SPOTLIGHT CARD (Light Blue Container with White Tactile Document) */}
            {flagshipItem && (
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
                        Cycle {flagshipItem.date}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-[#0D2440] dark:text-white leading-tight">
                        {flagshipItem.particulars}
                      </h3>
                      <p className="text-2xl sm:text-3xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-tight">
                        {flagshipItem.date}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#0D2440]/80 dark:text-white/80 max-w-xl leading-relaxed">
                      Official statutory archive filed under regulatory corporate governance guidelines for complete transparency and compliance.
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                        Format: <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-heading font-bold">Official PDF</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                        Status: <span className="text-emerald-700 dark:text-emerald-400 font-heading font-bold">Audited & Published</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <a
                        href={flagshipItem.link}
                        download
                        className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-lg group/btn hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Download className="w-4 h-4 text-white group-hover/btn:translate-y-0.5 transition-transform" />
                        Download Official PDF
                      </a>

                      <button
                        onClick={() => handleOpenModal(flagshipItem)}
                        className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F4F8FD] dark:bg-[#0D2440] dark:hover:bg-white/10 border border-[#7BA4D0]/40 dark:border-white/20 text-[#0D2440] dark:text-white text-xs sm:text-sm font-heading font-bold transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                        Document Preview
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Tactile Pure White Document Card */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div 
                      onClick={() => handleOpenModal(flagshipItem)}
                      className="cursor-pointer relative w-full max-w-sm aspect-[4/5] rounded-2xl bg-white text-[#0D2440] border border-[#7BA4D0]/35 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#2E5E99] group-hover:shadow-2xl"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-[#7BA4D0]/20">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-[#0D2440]/60 block">
                              STATUTORY DOCKET
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
                          {flagshipItem.date}
                        </p>
                        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#0D2440]/55">
                          Official Corporate Filing
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
              {gridItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/70 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-xs"
                >
                  <div className="absolute top-5 right-6 text-5xl sm:text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/25 transition-colors duration-500 select-none pointer-events-none">
                    0{String(item.id).padStart(1, '0')}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-xs font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                        {item.date}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                        {item.particulars}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#0D2440]/60 dark:text-white/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-heading font-medium">Audited Statutory Filing</span>
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
                      href={item.link}
                      download
                      className="px-4 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#0D2440] hover:bg-[#2E5E99] transition-all flex items-center gap-2 shadow-xs group/btn"
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
        {viewMode === "ledger" && sortedData.length > 0 && (
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
                    <th className="py-4 px-6">Fiscal Date</th>
                    <th className="py-4 px-6">Document Particulars</th>
                    <th className="py-4 px-6 hidden sm:table-cell">Classification</th>
                    <th className="py-4 px-6 hidden md:table-cell">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7BA4D0]/15 text-xs text-[#0D2440] dark:text-white">
                  {sortedData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F1F6FB] dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-4 px-6 font-heading font-black text-sm text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                        {item.date}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-heading font-semibold text-sm group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors block">
                              {item.particulars}
                            </span>
                            <span className="text-[11px] font-heading text-[#0D2440]/50 dark:text-white/50 sm:hidden">
                              Audited · Official PDF
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 hidden sm:table-cell font-heading font-semibold text-xs text-[#0D2440]/70 dark:text-white/70">
                        Statutory Filing
                      </td>

                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-heading text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 dot-3" />
                          Audited
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="p-2 rounded-lg bg-white dark:bg-white/10 border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white transition-all"
                            title="Preview Document"
                            aria-label={`Preview ${item.particulars}`}
                          >
                            <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                          </button>
                          <a
                            href={item.link}
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

      <GenericDocumentModal
        item={activeModalItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

/* =========================================================================
   5. GENERIC INVESTOR LISTING (USED IN FINANCIAL RESULTS, SHAREHOLDING, ETC.)
   ========================================================================= */

export interface ListingItem {
  id: number | string;
  title: string;
  date?: string;
  period?: string;
  type?: string;
  status?: string;
  downloadUrl?: string;
  viewUrl?: string;
  link?: string;
}

export interface GenericInvestorListingProps {
  items: ListingItem[];
  sectionTitle?: string;
  category?: string;
  resultsCount?: number;
  resultsPeriod?: string;
}

export function GenericInvestorListing(props: GenericInvestorListingProps) {
  return (
    <React.Suspense fallback={<div className="py-16 text-center text-[#0D2440]/50 dark:text-white/50 font-heading font-medium">Loading archives...</div>}>
      <GenericInvestorListingInner {...props} />
    </React.Suspense>
  );
}

function GenericInvestorListingInner({ 
  items, 
  sectionTitle = "Disclosure Archive", 
  category = "Document",
  resultsPeriod = "Recent Disclosures"
}: GenericInvestorListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = searchParams.get("sort") || "desc";
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const viewMode = searchParams.get("view") || "grid";

  const [activeModalItem, setActiveModalItem] = useState<ListingItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item: ListingItem) => {
    setActiveModalItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveModalItem(null);
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Filtered & Sorted items
  const sortedItems = useMemo(() => {
    let list = [...items];

    if (query) {
      list = list.filter(
        (item) => 
          item.title.toLowerCase().includes(query) || 
          (item.period && item.period.toLowerCase().includes(query)) || 
          (item.date && item.date.toLowerCase().includes(query)) || 
          (item.type && item.type.toLowerCase().includes(query))
      );
    }

    return list.sort((a, b) => {
      if (a.date && b.date) {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (!isNaN(dateA) && !isNaN(dateB)) {
          return sort === "desc" ? dateB - dateA : dateA - dateB;
        }
      }
      return sort === "desc" ? -1 : 1;
    });
  }, [items, sort, query]);

  const isDefaultView = !query && sort === "desc";
  const flagshipItem = isDefaultView && sortedItems.length > 0 ? sortedItems[0] : null;
  const gridItems = isDefaultView ? sortedItems.slice(1) : sortedItems;

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#071321] transition-colors relative">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-[#7BA4D0]/15 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.25em]">
                {sectionTitle}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-[#0D2440] dark:text-white font-heading font-bold">
                {sortedItems.length} {sortedItems.length === 1 ? "Record" : "Records"}
              </span>
            </div>
            <p className="text-xs text-[#0D2440]/60 dark:text-white/60 font-medium mt-0.5">
              Official filings & records for {resultsPeriod}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold text-[#0D2440]/70 dark:text-white/70">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Audit Verified
            </span>
          </div>
        </div>

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/20 max-w-xl mx-auto my-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center mx-auto mb-5 text-[#2E5E99]">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
              No Disclosures Found
            </h3>
            <p className="text-xs text-[#0D2440]/60 dark:text-white/60 mb-6 leading-relaxed">
              No records match your query. Try resetting your search to browse all available disclosures.
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
        {viewMode === "grid" && sortedItems.length > 0 && (
          <div className="space-y-8">
            
            {/* FLAGSHIP SPOTLIGHT CARD (Light Blue Container with White Tactile Document) */}
            {flagshipItem && (
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
                        {flagshipItem.period || flagshipItem.date || resultsPeriod}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-[#0D2440] dark:text-white leading-tight">
                        {flagshipItem.title}
                      </h3>
                      <p className="text-2xl sm:text-3xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-tight">
                        {flagshipItem.period || flagshipItem.date}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#0D2440]/80 dark:text-white/80 max-w-xl leading-relaxed">
                      Official corporate disclosure document filed under statutory capital market requirements for institutional and retail stakeholders.
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                        Classification: <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-heading font-bold">{flagshipItem.type || category}</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/30 dark:border-white/10 text-xs font-heading font-medium text-[#0D2440] dark:text-white/90 shadow-2xs">
                        Status: <span className="text-emerald-700 dark:text-emerald-400 font-heading font-bold">{flagshipItem.status || "Audited & Published"}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <a
                        href={flagshipItem.downloadUrl || flagshipItem.link || "/sample-report.pdf"}
                        download
                        className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-lg group/btn hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Download className="w-4 h-4 text-white group-hover/btn:translate-y-0.5 transition-transform" />
                        Download Official File
                      </a>

                      <button
                        onClick={() => handleOpenModal(flagshipItem)}
                        className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F4F8FD] dark:bg-[#0D2440] dark:hover:bg-white/10 border border-[#7BA4D0]/40 dark:border-white/20 text-[#0D2440] dark:text-white text-xs sm:text-sm font-heading font-bold transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                        Document Preview
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Tactile Pure White Document Card */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div 
                      onClick={() => handleOpenModal(flagshipItem)}
                      className="cursor-pointer relative w-full max-w-sm aspect-[4/5] rounded-2xl bg-white text-[#0D2440] border border-[#7BA4D0]/35 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#2E5E99] group-hover:shadow-2xl"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-[#7BA4D0]/20">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-[#0D2440]/60 block">
                              STATUTORY DOCKET
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
                          {flagshipItem.period || flagshipItem.date}
                        </p>
                        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#0D2440]/55">
                          {flagshipItem.type || category}
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
              {gridItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/70 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-xs"
                >
                  <div className="absolute top-5 right-6 text-5xl sm:text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/25 transition-colors duration-500 select-none pointer-events-none">
                    0{String(item.id).padStart(1, '0')}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-white/10 text-xs font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                        {item.period || item.date}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#0D2440]/60 dark:text-white/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-heading font-medium">{item.type || category}</span>
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
                      href={item.downloadUrl || item.link || "/sample-report.pdf"}
                      download
                      className="px-4 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#0D2440] hover:bg-[#2E5E99] transition-all flex items-center gap-2 shadow-xs group/btn"
                    >
                      <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW MODE 2: MINIMALIST CORPORATE LEDGER TABLE */}
        {viewMode === "ledger" && sortedItems.length > 0 && (
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
                    <th className="py-4 px-6">Period / Date</th>
                    <th className="py-4 px-6">Document Title</th>
                    <th className="py-4 px-6 hidden sm:table-cell">Classification</th>
                    <th className="py-4 px-6 hidden md:table-cell">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7BA4D0]/15 text-xs text-[#0D2440] dark:text-white">
                  {sortedItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F1F6FB] dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-4 px-6 font-heading font-black text-sm text-[#2E5E99] dark:text-[#7BA4D0] tracking-wide">
                        {item.period || item.date}
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
                              {item.type || category}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 hidden sm:table-cell font-heading font-semibold text-xs text-[#0D2440]/70 dark:text-white/70">
                        {item.type || category}
                      </td>

                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-heading text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status || "Published"}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="p-2 rounded-lg bg-white dark:bg-white/10 border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white transition-all"
                            title="Preview Document"
                            aria-label={`Preview ${item.title}`}
                          >
                            <Eye className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                          </button>
                          <a
                            href={item.downloadUrl || item.link || "/sample-report.pdf"}
                            download
                            className="px-3.5 py-2 rounded-lg bg-[#0D2440] hover:bg-[#2E5E99] text-white font-heading font-bold text-xs transition-all flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">File</span>
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

      <GenericDocumentModal
        item={activeModalItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
