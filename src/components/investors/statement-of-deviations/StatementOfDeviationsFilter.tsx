"use client";

import React, { useState } from "react";
import { Filter, Search, ChevronDown, Calendar, Database, Layers } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const years = ["All Years", "2024-25", "2023-24", "2022-23"];
const quarters = ["All Quarters", "Q1", "Q2", "Q3", "Q4"];

export function StatementOfDeviationsFilter(props: any) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <StatementOfDeviationsFilterInner {...props} />
    </React.Suspense>
  );
}

function StatementOfDeviationsFilterInner() {
  const [activeYear, setActiveYear] = useState("All Years");
  const [activeQuarter, setActiveQuarter] = useState("All Quarters");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "desc";
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

  const toggleSort = () => {
    const newSort = sort === "desc" ? "asc" : "desc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 animate-in fade-in zoom-in-95 duration-700">
          {/* Dual Discovery Selectors */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            {/* Year Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <Calendar className="w-4 h-4 text-gold shrink-0" />
              {years.map((year, index) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeYear === year
                      ? "bg-deepblue text-white "
                      : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                  } ${index === years.length - 1 ? 'mr-8' : ''}`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-6 bg-border" />

            {/* Quarter Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <Layers className="w-4 h-4 text-gold shrink-0" />
              {quarters.map((quarter, index) => (
                <button
                  key={quarter}
                  onClick={() => setActiveQuarter(quarter)}
                  className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeQuarter === quarter
                      ? "bg-deepblue text-white "
                      : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                  } ${index === quarters.length - 1 ? 'mr-8' : ''}`}
                >
                  {quarter}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Utility */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
              <input
                type="text"
                placeholder="Search statements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-silver/5 border border-border rounded-sm py-2 px-10 text-xs focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <button 
              onClick={toggleSort}
              className="flex items-center gap-3 bg-white dark:bg-charcoal border border-border rounded-sm py-2 px-6 text-[10px] font-bold text-charcoal dark:text-white hover:border-gold transition-all shrink-0 uppercase tracking-widest whitespace-nowrap min-w-[200px] justify-between btn-slide-gold group"
            >
              <Database className="w-4 h-4 text-gold shrink-0" />
              <span className="flex-grow text-center">{sort === "desc" ? "Latest First" : "Oldest First"}</span>
              <ChevronDown className="w-4 h-4 text-gold shrink-0" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
