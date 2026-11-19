"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const fiscalYears = ["FY 2024-25", "FY 2023-24", "FY 2022-23", "FY 2021-22"];

export function FinancialFilter(props: any) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <FinancialFilterInner {...props} />
    </React.Suspense>
  );
}

function FinancialFilterInner() {
  const [activeYear, setActiveYear] = useState("FY 2024-25");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
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

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Fiscal Year Selector (Naturally wrapping multi-line on mobile, clean strip on desktop) */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <div className="flex items-center gap-2 mr-1 sm:mr-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-silver/10 flex items-center justify-center rounded-sm shrink-0">
                <Filter className="w-4 h-4 text-gold" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Fiscal Year:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {fiscalYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setActiveYear(year)}
                  className={`px-4 sm:px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    activeYear === year
                      ? "bg-deepblue text-white shadow-xs"
                      : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Period */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-72">
              <input
                type="text"
                placeholder="Search results, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-silver/5 border border-border rounded-sm py-2.5 px-10 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <button className="flex items-center gap-3 bg-white dark:bg-charcoal border border-border rounded-sm py-2.5 px-6 text-xs font-bold text-charcoal dark:text-white hover:border-gold transition-all btn-slide-gold group">
              All Periods
              <ChevronDown className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
