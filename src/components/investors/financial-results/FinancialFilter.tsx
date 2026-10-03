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
          {/* Fiscal Year Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="w-10 h-10 bg-silver/10 flex items-center justify-center rounded-sm mr-2 shrink-0">
              <Filter className="w-4 h-4 text-gold" />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-4 whitespace-nowrap">Fiscal Year:</span>
            {fiscalYears.map((year, index) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`shrink-0 px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeYear === year
                    ? "bg-deepblue text-white "
                    : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                } ${index === fiscalYears.length - 1 ? 'mr-8' : ''}`}
              >
                {year}
              </button>
            ))}
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
