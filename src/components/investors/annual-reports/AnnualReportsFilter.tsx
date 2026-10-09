"use client";

import React, { useState } from "react";
import { Search, ArrowUpDown, LayoutGrid, List, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const YEARS = [
  { label: "All Filings", value: "all" },
  { label: "2025–26", value: "2025-2026" },
  { label: "2024–25", value: "2024-2025" },
  { label: "2023–24", value: "2023-2024" },
  { label: "2022–23", value: "2022-2023" },
  { label: "2021–22", value: "2021-2022" },
  { label: "2020–21", value: "2020-2021" }
];

export function AnnualReportsFilter(props: any) {
  return (
    <React.Suspense fallback={<div className="py-8 text-center text-charcoal/50">Loading archive controls...</div>}>
      <AnnualReportsFilterInner {...props} />
    </React.Suspense>
  );
}

function AnnualReportsFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "desc";
  const selectedYear = searchParams.get("year") || "all";
  const viewMode = searchParams.get("view") || "grid";
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

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

  const setYearFilter = (yearValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (yearValue === "all") {
      params.delete("year");
    } else {
      params.set("year", yearValue);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
    <section className="relative z-30 bg-gradient-to-b from-white to-[#F8FAFC] dark:from-[#071321] dark:to-[#0A1A2E] border-y border-[#7BA4D0]/15 py-5 transition-colors">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Year Quick-Jump Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none no-scrollbar">
            {YEARS.map((y) => {
              const isActive = selectedYear === y.value || (y.value === "all" && !selectedYear);
              return (
                <button
                  key={y.value}
                  onClick={() => setYearFilter(y.value)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition-all shrink-0",
                    isActive
                      ? "bg-[#0D2440] text-white shadow-sm dark:bg-[#7BA4D0] dark:text-[#0D2440]"
                      : "bg-white/80 dark:bg-white/5 text-[#0D2440]/70 dark:text-white/70 hover:bg-[#E7F0FA] dark:hover:bg-white/10 hover:text-[#0D2440] dark:hover:text-white border border-[#7BA4D0]/20"
                  )}
                >
                  {y.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Cluster: Search + Sort + View Mode */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64 w-full">
              <input
                type="text"
                placeholder="Search filings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#0D2440]/80 border border-[#7BA4D0]/30 dark:border-white/15 rounded-xl py-2 pl-9 pr-8 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/45 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] focus:ring-1 focus:ring-[#2E5E99]/30 transition-all shadow-xs"
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
              className="flex items-center gap-2 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 dark:border-white/15 rounded-xl py-2 px-3 text-xs font-semibold text-[#0D2440] dark:text-white hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all shrink-0 shadow-xs"
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
                    ? "bg-white dark:bg-[#0D2440] text-[#2E5E99] dark:text-white shadow-xs font-bold"
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
                    ? "bg-white dark:bg-[#0D2440] text-[#2E5E99] dark:text-white shadow-xs font-bold"
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
