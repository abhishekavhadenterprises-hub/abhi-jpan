"use client";

import React, { useState } from "react";
import { Search, Filter, Calendar, BarChart4, ChevronDown } from "lucide-react";

const years = ["2024-25", "2023-24", "2022-23", "2021-22"];
const quarters = ["Q1", "Q2", "Q3", "Q4"];

export function ShareholdingFilter() {
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [selectedQuarter, setSelectedQuarter] = useState("Q3");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border animate-in fade-in zoom-in-95 duration-700">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Discovery Engine Controls */}
          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3 text-gold">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Refine Archive</span>
            </div>

            {/* Fiscal Year Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Year:</span>
              <div className="flex items-center gap-1">
                {years.map((year, index) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all border ${
                      selectedYear === year
                        ? "bg-charcoal dark:bg-white text-white dark:text-charcoal border-transparent "
                        : "bg-silver/5 text-muted-foreground border-transparent hover:border-border"
                    } ${index === years.length - 1 ? 'mr-8' : ''}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Quarter Filter */}
            <div className="flex items-center gap-2 ml-4">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Quarter:</span>
              <div className="flex items-center gap-1">
                {quarters.map((q, index) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuarter(q)}
                    className={`w-10 h-10 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all border ${
                      selectedQuarter === q
                        ? "bg-gold text-charcoal border-transparent "
                        : "bg-silver/5 text-muted-foreground border-transparent hover:border-border"
                    } ${index === quarters.length - 1 ? 'mr-8' : ''}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search & Utility */}
          <div className="relative w-full lg:w-80 group">
            <input
              type="text"
              placeholder="Search Disclosures..."
              className="w-full bg-silver/5 border border-border rounded-sm py-3 px-12 text-xs focus:outline-none focus:border-gold transition-all group-hover:border-gold/50"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <span className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] hidden sm:block">Find</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
