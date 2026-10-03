"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, FileDown, FileText, Search, ChevronDown, Calendar, Filter, ArrowRight, ExternalLink, Newspaper, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export function GenericInvestorHero({ 
  title, 
  subtitle = "Precision Disclosures & Corporate Transparency", 
  image = "/images/about-hero-new.png",
  parent = "Investor Relations",
  variant = "left",
  chips
}: { 
  title: string; 
  subtitle?: string; 
  image?: string; 
  parent?: string;
  variant?: "bottom" | "centered" | "left" | "ledger" | "editorial";
  chips?: Array<{ label: string; value: string }>;
}) {
  if (variant === "bottom") {
    return (
      <section className="relative h-[80vh] min-h-[540px] max-h-[820px] w-full flex flex-col justify-end overflow-hidden bg-[#071321]">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-100 contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 via-40% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="container-custom relative z-10 w-full pb-12 sm:pb-16 pt-32 sm:pt-36">
          <div className="max-w-2xl space-y-4">
            <div className="w-36 h-[2px] bg-white/30 relative overflow-hidden">
              <div className="w-12 h-full bg-[#7BA4D0]" />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight leading-[1.06]"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "centered") {
    return (
      <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center justify-center overflow-hidden bg-[#071321]">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-100 contrast-100"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 via-transparent to-black/25 pointer-events-none" />
        </div>
        <div className="container-custom relative z-10 text-white w-full">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-6xl lg:text-[4.5rem] font-heading font-black text-white leading-[1.05] tracking-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-xl text-white/90 max-w-2xl font-normal leading-relaxed"
            >
              {subtitle}
            </motion.p>
            {chips && chips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-3 pt-3"
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
          </div>
        </div>
      </section>
    );
  }

  if (variant === "ledger") {
    return (
      <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center overflow-hidden bg-[#071321]">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-100 contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 via-transparent to-black/20 pointer-events-none" />
        </div>
        <div className="container-custom relative z-10 text-white w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-[#7BA4D0] font-heading text-xs uppercase tracking-[0.2em] font-semibold block">
              SEBI LODR COMPLIANCE RECORD
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl font-heading font-black text-white leading-[1.08] tracking-tight"
            >
              {title}
            </motion.h1>
            {/* Sleek Hairline Divider */}
            <div className="w-full h-px bg-white/20 my-4" />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "editorial") {
    return (
      <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center overflow-hidden bg-[#071321]">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-100 contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 via-transparent to-black/20 pointer-events-none" />
        </div>
        <div className="container-custom relative z-10 text-white w-full">
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            <span className="text-[#7BA4D0] text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7BA4D0]" />
              Investor Archive & Records
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl font-heading font-black text-white leading-[1.08] tracking-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-white/90 font-light leading-relaxed max-w-2xl italic font-serif"
            >
              &ldquo;{subtitle}&rdquo;
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[80vh] min-h-[540px] max-h-[820px] pt-32 sm:pt-36 pb-12 sm:pb-16 flex items-center overflow-hidden bg-[#071321]">
      {/* Immersive Crystal-Clear Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image} 
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-100 contrast-100"
        />
        {/* Soft, crystal-clear gradient scrims ensuring flawless visibility and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 via-transparent to-black/20 pointer-events-none" />
      </div>

      <div className="container-custom relative z-10 text-white w-full">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          {/* Subtle Category Kicker */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="h-0.5 w-10 bg-[#7BA4D0]" />
            <span className="text-[#7BA4D0] font-bold uppercase tracking-[0.25em] text-xs">
              OFFICIAL CORPORATE DISCLOSURE
            </span>
          </motion.div>

          {/* Main H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[4.25rem] font-heading font-black text-white leading-[1.08] tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl font-normal border-l-2 border-[#7BA4D0]/50 pl-5"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

interface TableProps {
  data: {
    id: number;
    date: string;
    particulars: string;
    link: string;
  }[];
}

export function GenericInvestorTable(props: TableProps) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <GenericInvestorTableInner {...props} />
    </React.Suspense>
  );
}

function GenericInvestorTableInner({ data }: TableProps) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "desc";
  const query = (searchParams.get("q") || "").toLowerCase();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sortedData = React.useMemo(() => {
    let filtered = [...data];
    if (query) {
      filtered = filtered.filter(
        (item) => 
          item.particulars.toLowerCase().includes(query) || 
          (item.date && item.date.toLowerCase().includes(query))
      );
    }

    return filtered.sort((a, b) => {
      if (a.date && b.date) {
        if (sort === "asc") {
          return a.date.localeCompare(b.date);
        }
        return b.date.localeCompare(a.date);
      }
      return sort === "desc" ? -1 : 1;
    });
  }, [data, sort, query]);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < sortedData.length && newIndex !== activeIndex) {
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
            Showing {sortedData.length} Results for Recent Cycles
          </div>
        </div>

        {/* Table Cards: Single visible card at a time with horizontal scroll on mobile (< md), vertical stack on desktop (>= md) */}
        <div className="flex flex-col justify-between">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-4 md:space-y-5 md:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {sortedData.map((report, idx) => (
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
                    <span className="text-[#2E5E99]">Report Archive</span>
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
                      href={report.link && report.link !== "#" ? report.link : "/sample-report.pdf"}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl border border-[#7BA4D0]/35 bg-white hover:bg-white/80 dark:bg-charcoal text-xs font-semibold text-[#0D2440] dark:text-white transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#2E5E99]" /> View
                    </a>
                    <a 
                      href={report.link && report.link !== "#" ? report.link : "/sample-report.pdf"}
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
          {sortedData.length > 1 && (
            <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
              {sortedData.map((_, i) => (
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
                  aria-label={`Go to item ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function GenericInvestorFilter() {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <GenericInvestorFilterInner />
    </React.Suspense>
  );
}

function GenericInvestorFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "desc";
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

  return (
    <section className="relative z-20 bg-white dark:bg-[#071321] py-4 transition-colors">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          {/* Search & Sorting */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-72 w-full">
            <input
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EBF3FC]/60 dark:bg-[#0D2440]/80 border border-[#7BA4D0]/35 dark:border-white/15 rounded-xl py-2.5 pl-10 pr-10 text-sm text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/50 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] dark:focus:border-[#7BA4D0] transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#0D2440] dark:text-white/60 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button 
            onClick={toggleSort}
            className="flex items-center gap-2.5 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/35 dark:border-white/15 rounded-xl py-2.5 px-5 text-xs font-semibold text-[#0D2440] dark:text-white hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all shrink-0 whitespace-nowrap justify-between"
          >
            <Filter className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
            <span>{sort === "desc" ? "Latest First" : "Oldest First"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}

interface ListingItem {
  id: number | string;
  title: string;
  date?: string;
  period?: string;
  type?: string;
  status?: string;
  downloadUrl?: string;
  viewUrl?: string;
}

interface GenericInvestorListingProps {
  items: ListingItem[];
  sectionTitle?: string;
  category?: string;
  resultsCount?: number;
  resultsPeriod?: string;
}

export function GenericInvestorListing(props: GenericInvestorListingProps) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <GenericInvestorListingInner {...props} />
    </React.Suspense>
  );
}

function GenericInvestorListingInner({ 
  items, 
  sectionTitle = "Disclosure Archive", 
  category = "Document",
  resultsCount,
  resultsPeriod = "FY 2024-25"
}: GenericInvestorListingProps) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "desc";
  const query = (searchParams.get("q") || "").toLowerCase();

  const sortedItems = React.useMemo(() => {
    let filtered = [...items];
    if (query) {
      filtered = filtered.filter(
        (item) => 
          item.title.toLowerCase().includes(query) || 
          (item.period && item.period.toLowerCase().includes(query)) || 
          (item.date && item.date.toLowerCase().includes(query)) || 
          (item.type && item.type.toLowerCase().includes(query))
      );
    }

    return filtered.sort((a, b) => {
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

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < sortedItems.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };
  
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#071321] transition-colors">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-0.5 bg-[#2E5E99] dark:bg-[#7BA4D0]" />
            <h2 className="text-xs font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.25em]">{sectionTitle}</h2>
          </div>
          <div className="text-xs font-semibold text-[#0D2440]/60 dark:text-white/60">
            Showing {sortedItems.length} Results for {resultsPeriod}
          </div>
        </div>

        {/* Listing Cards */}
        <div className="flex flex-col justify-between">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-4 md:space-y-4 md:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {sortedItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.5 }}
                className="group bg-[#F8FAFC] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 hover:border-[#2E5E99]/60 dark:hover:border-[#7BA4D0]/40 hover:bg-[#F1F6FB] dark:hover:bg-[#0D2440] transition-all duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 dark:border-white/10 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105">
                  <FileText className="w-6 h-6 text-[#2E5E99] dark:text-[#7BA4D0]" />
                </div>

                {/* Content */}
                <div className="flex-grow space-y-2 text-center md:text-left w-full md:w-auto">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs font-semibold text-[#0D2440]/60 dark:text-white/60">
                    {item.period && <span>{item.period}</span>}
                    {item.date && (
                      <>
                        <span className="w-1 h-1 bg-[#7BA4D0] rounded-full" />
                        <span>{item.date}</span>
                      </>
                    )}
                    <span className="w-1 h-1 bg-[#7BA4D0] rounded-full" />
                    <span className="text-[#2E5E99] dark:text-[#7BA4D0]">{item.type || category}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-[#0D2440]/60 dark:text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      <span>Processed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                        {item.status || "Published"}
                      </span>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-[#7BA4D0]/25 dark:bg-white/10 hidden lg:block" />

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    <a 
                      href={item.viewUrl || item.downloadUrl || "/sample-report.pdf"}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl border border-[#7BA4D0]/35 dark:border-white/15 bg-white hover:bg-white/80 dark:bg-[#0D2440] dark:hover:bg-white/10 text-xs font-semibold text-[#0D2440] dark:text-white transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" /> View
                    </a>
                    <a 
                      href={item.downloadUrl || item.viewUrl || "/sample-report.pdf"}
                      download
                      className="px-5 py-2.5 rounded-xl bg-[#0D2440] dark:bg-[#2E5E99] hover:bg-[#2E5E99] dark:hover:bg-[#7BA4D0] text-white text-xs font-semibold flex items-center gap-2 transition-all group/btn"
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
          {sortedItems.length > 1 && (
            <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-10">
              {sortedItems.map((_, i) => (
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
                    activeIndex === i ? "w-6 bg-[#0D2440] dark:bg-[#7BA4D0]" : "w-1.5 bg-[#7BA4D0]/40 dark:bg-white/20"
                  )}
                  aria-label={`Go to item ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Load More Placeholder */}
        <div className="mt-16 text-center">
          <button className="text-[10px] font-bold text-[#0D2440]/70 dark:text-white/80 uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors group">
            Load Historical Archive 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
