"use client";

import React, { useState } from "react";
import { Filter, Search, ChevronDown, Calendar, Database } from "lucide-react";

const years = ["All Years", "2024-25", "2023-24", "2022-23", "2021-22"];

export function SecretarialComplianceFilter() {
  const [activeYear, setActiveYear] = useState("All Years");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Chronological Discovery Selectors */}
          <div className="flex items-center gap-6 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Fiscal Era:</span>
            </div>
            {years.map((year, index) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeYear === year
                    ? "bg-deepblue text-white "
                    : "bg-silver/5 text-muted-foreground hover:bg-silver/10 border border-transparent hover:border-border"
                } ${index === years.length - 1 ? 'mr-8' : ''}`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Search & Utility */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-72">
              <input
                type="text"
                placeholder="Search audit records..."
                className="w-full bg-silver/5 border border-border rounded-sm py-2 px-10 text-xs focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <button className="flex items-center gap-3 bg-white dark:bg-charcoal border border-border rounded-sm py-2 px-6 text-[10px] font-bold text-charcoal dark:text-white hover:border-gold transition-all shrink-0 uppercase tracking-widest btn-slide-gold group">
              <Database className="w-4 h-4 text-gold" />
              Audit Trail
              <ChevronDown className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
