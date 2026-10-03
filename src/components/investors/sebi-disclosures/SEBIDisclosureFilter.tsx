"use client";

import React, { useState } from "react";
import { Filter, Search, ChevronDown, ChevronUp, Calendar, Bookmark } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const years = ["All Years", "2024", "2023", "2022"];
const regulations = ["All Regulations", "Reg 30", "Reg 33", "Reg 44", "Reg 46"];

export function SEBIDisclosureFilter() {
  return (
    <React.Suspense fallback={<div className="py-8 text-center text-muted-foreground text-xs">Loading filters...</div>}>
      <SEBIDisclosureFilterInner />
    </React.Suspense>
  );
}

function SEBIDisclosureFilterInner() {
  const [activeYear, setActiveYear] = useState("All Years");
  const [activeReg, setActiveReg] = useState("All Regulations");

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
    <section className="relative z-20 bg-white dark:bg-black py-4">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Dual Discovery Selectors */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Year Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              <Calendar className="w-4 h-4 text-[#2E5E99] shrink-0" />
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                    activeYear === year
                      ? "bg-[#0D2440] text-white border-[#0D2440] "
                      : "bg-[#F8FAFC] dark:bg-charcoal/40 text-muted-foreground border-[#7BA4D0]/25 hover:border-[#2E5E99]/50"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#7BA4D0]/30" />

            {/* Regulation Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              <Bookmark className="w-4 h-4 text-[#2E5E99] shrink-0" />
              {regulations.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setActiveReg(reg)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                    activeReg === reg
                      ? "bg-[#0D2440] text-white border-[#0D2440] "
                      : "bg-[#F8FAFC] dark:bg-charcoal/40 text-muted-foreground border-[#7BA4D0]/25 hover:border-[#2E5E99]/50"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Utility */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
              <input
                type="text"
                placeholder="Search filings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/30 rounded-2xl py-2 pl-9 pr-3 text-xs text-[#0D2440] dark:text-white placeholder:text-muted-foreground focus:outline-none focus:border-[#2E5E99] transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            </div>

            <button 
              onClick={toggleSort}
              className="flex items-center justify-between min-w-[140px] gap-2 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/30 rounded-2xl py-2 px-4 text-xs font-bold text-[#0D2440] dark:text-white hover:border-[#2E5E99] transition-all shrink-0 uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#2E5E99] shrink-0" />
                <span>{sort === "desc" ? "Latest First" : "Oldest First"}</span>
              </div>
              {sort === "desc" ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
