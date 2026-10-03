"use client";

import React, { useState } from "react";
import { Search, Filter, Calendar, FileText, ChevronDown } from "lucide-react";

const fiscalYears = ["FY 2024-25", "FY 2023-24", "FY 2022-23", "FY 2021-22"];
const quarters = ["All Quarters", "Q1", "Q2", "Q3", "Q4"];
const callTypes = ["Earnings Call", "Investor Meet", "Analyst Day"];

export function TranscriptFilter() {
  const [selectedYear, setSelectedYear] = useState("FY 2024-25");
  const [selectedQuarter, setSelectedQuarter] = useState("All Quarters");
  const [selectedType, setSelectedType] = useState("All Types");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border animate-in fade-in zoom-in-95 duration-700">
      <div className="container-custom py-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
          
          {/* Discovery Controls */}
          <div className="flex flex-wrap items-center gap-8 w-full xl:w-auto">
            <div className="flex items-center gap-3 text-gold">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Filter Transcripts</span>
            </div>

            {/* Fiscal Year Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Fiscal:</span>
              <div className="relative group">
                <button className="flex items-center gap-3 px-5 py-2.5 bg-silver/5 border border-border rounded-sm text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-white hover:border-gold transition-all btn-slide-gold group">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {selectedYear}
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Quarter Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Quarter:</span>
              <div className="flex items-center gap-1">
                {quarters.map((q, index) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuarter(q)}
                    className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all border ${
                      selectedQuarter === q
                        ? "bg-charcoal dark:bg-white text-white dark:text-charcoal border-transparent  scale-105"
                        : "bg-silver/5 text-muted-foreground border-transparent hover:border-border"
                    } ${index === quarters.length - 1 ? 'mr-8' : ''}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Call Type Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Type:</span>
              <div className="relative group">
                <button className="flex items-center gap-3 px-5 py-2.5 bg-silver/5 border border-border rounded-sm text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-white hover:border-gold transition-all btn-slide-gold group">
                  <FileText className="w-3.5 h-3.5 text-gold" />
                  {selectedType === "All Types" ? "All Transcript Types" : selectedType}
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Engine */}
          <div className="relative w-full xl:w-96 group">
            <input
              type="text"
              placeholder="Search Full-Text Archive..."
              className="w-full bg-silver/5 border border-border rounded-sm py-4 px-12 text-xs focus:outline-none focus:border-gold transition-all group-hover:border-gold/50 placeholder:text-muted-foreground/30"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
               <span className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] hidden sm:block">Verbatim</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
