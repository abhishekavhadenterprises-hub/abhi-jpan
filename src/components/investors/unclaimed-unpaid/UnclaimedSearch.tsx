"use client";

import React, { useState } from "react";
import { Search, Filter, Database, CheckCircle2, AlertCircle } from "lucide-react";

const fiscalYears = ["2023-24", "2022-23", "2021-22", "2020-21", "2019-20"];

export function UnclaimedSearch() {
  const [selectedYear, setSelectedYear] = useState("2023-24");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border animate-in fade-in zoom-in-95 duration-700">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3 text-charcoal dark:text-gold">
              <Database className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Repository Search</span>
            </div>

            {/* Fiscal Year Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-charcoal dark:text-silver uppercase tracking-widest shrink-0">Fiscal Year:</span>
              <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {fiscalYears.map((year, index) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`shrink-0 px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all border whitespace-nowrap ${
                      selectedYear === year
                        ? "bg-charcoal dark:bg-white text-white dark:text-charcoal border-transparent "
                        : "bg-silver/5 text-charcoal/80 dark:text-silver border-transparent hover:border-border hover:bg-silver/10"
                    } ${index === fiscalYears.length - 1 ? 'mr-4' : ''}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Engine */}
          <div className="relative w-full lg:w-96 group">
            <input
              type="text"
              placeholder="Enter Shareholder Name / Folio Number..."
              className="w-full bg-silver/5 border border-border rounded-sm py-3.5 px-12 text-xs text-charcoal dark:text-white placeholder:text-charcoal/60 dark:placeholder:text-silver/60 focus:outline-none focus:border-gold transition-all group-hover:border-gold/50"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/60 dark:text-silver/60 group-focus-within:text-gold transition-colors" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gold text-charcoal text-[9px] font-bold uppercase tracking-widest rounded-sm transition-all btn-slide-white group">
               Query
            </button>
          </div>
        </div>

        {/* Quick Insights Accent */}
        <div className="flex items-center gap-6 mt-4">
           <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-charcoal/80 dark:text-silver">Database Verified</span>
           </div>
           <div className="flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-gold" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-charcoal/80 dark:text-silver">Live IEFP Sync</span>
           </div>
        </div>
      </div>
    </section>
  );
}
