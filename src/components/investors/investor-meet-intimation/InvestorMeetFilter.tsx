"use client";

import React, { useState } from "react";
import { Filter, Search, ChevronDown, Calendar, Hash } from "lucide-react";

const years = ["All Years", "2024", "2023", "2022"];
const categories = ["All Types", "Earnings Call", "Conference", "Analyst Meet"];

export function InvestorMeetFilter() {
  const [activeYear, setActiveYear] = useState("All Years");
  const [activeCategory, setActiveCategory] = useState("All Types");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Dual Category Selectors */}
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

            {/* Category Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <Hash className="w-4 h-4 text-gold shrink-0" />
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-deepblue text-white "
                      : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                  } ${index === categories.length - 1 ? 'mr-8' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Utility */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
              <input
                type="text"
                placeholder="Search interactions..."
                className="w-full bg-silver/5 border border-border rounded-sm py-2 px-10 text-xs focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <button className="flex items-center gap-3 bg-white dark:bg-charcoal border border-border rounded-sm py-2 px-6 text-[10px] font-bold text-charcoal dark:text-white hover:border-gold transition-all shrink-0 uppercase tracking-widest btn-slide-gold group">
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
