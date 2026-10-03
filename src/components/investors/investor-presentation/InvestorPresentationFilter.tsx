"use client";

import React, { useState } from "react";
import { Filter, Search, ChevronDown, Calendar, Layers } from "lucide-react";

const years = ["All Years", "2024", "2023", "2022"];
const quarters = ["All Quarters", "Q4", "Q3", "Q2", "Q1"];

export function InvestorPresentationFilter() {
  const [activeYear, setActiveYear] = useState("All Years");
  const [activeQuarter, setActiveQuarter] = useState("All Quarters");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Dual Discovery Selectors */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            {/* Year Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-4 sm:pb-0 min-w-0 custom-scrollbar">
              <Calendar className="w-4 h-4 text-gold shrink-0" />
              {years.map((year, index) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`shrink-0 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
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
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-4 sm:pb-0 min-w-0 custom-scrollbar">
              <Layers className="w-4 h-4 text-gold shrink-0" />
              {quarters.map((q, index) => (
                <button
                  key={q}
                  onClick={() => setActiveQuarter(q)}
                  className={`shrink-0 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeQuarter === q
                      ? "bg-deepblue text-white "
                      : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                  } ${index === quarters.length - 1 ? 'mr-8' : ''}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Utility */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
              <input
                type="text"
                placeholder="Search presentations..."
                className="w-full bg-silver/5 border border-border rounded-sm py-2 px-10 text-xs focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <button className="flex items-center gap-3 bg-white dark:bg-charcoal border border-border rounded-sm py-2 px-6 text-[10px] font-bold text-charcoal dark:text-white hover:border-gold transition-all shrink-0 uppercase tracking-widest btn-slide-gold group">
              <Filter className="w-4 h-4 text-gold" />
              Recent First
              <ChevronDown className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
