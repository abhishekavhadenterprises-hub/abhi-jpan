"use client";

import React, { useState } from "react";
import { Filter, Search, ChevronDown, Calendar, PieChart } from "lucide-react";

const years = ["All Years", "2024-25", "2023-24", "2022-23"];
const quarters = ["All Quarters", "Q1", "Q2", "Q3", "Q4"];

export function BoardMeetingFilter() {
  const [activeYear, setActiveYear] = useState("All Years");
  const [activeQuarter, setActiveQuarter] = useState("All Quarters");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Dual Category Selectors (Starting from left side) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto text-left">
            {/* Year Selector */}
            <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 w-full sm:w-auto text-left">
              <Calendar className="w-4 h-4 text-gold shrink-0" />
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer text-left ${
                    activeYear === year
                      ? "bg-deepblue text-white "
                      : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-6 bg-border" />

            {/* Quarter Selector */}
            <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 w-full sm:w-auto text-left">
              <PieChart className="w-4 h-4 text-gold shrink-0" />
              {quarters.map((q) => (
                <button
                  key={q}
                  onClick={() => setActiveQuarter(q)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer text-left ${
                    activeQuarter === q
                      ? "bg-deepblue text-white "
                      : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
              <input
                type="text"
                placeholder="Search proclamations..."
                className="w-full bg-silver/5 border border-border rounded-sm py-2.5 px-10 text-xs focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <button className="flex items-center gap-3 bg-white dark:bg-charcoal border border-border rounded-sm py-2.5 px-6 text-[10px] font-bold text-charcoal dark:text-white hover:border-gold transition-all shrink-0 uppercase tracking-widest btn-slide-gold group">
              <Filter className="w-4 h-4 text-gold" />
              Latest
              <ChevronDown className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
