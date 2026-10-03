"use client";

import React, { useState } from "react";
import { Search, Filter, Calendar, Newspaper, Languages, ChevronDown } from "lucide-react";

const years = ["2024-25", "2023-24", "2022-23", "2021-22"];
const mediaSources = ["Financial Express", "Jansatta", "The Economic Times", "Others"];
const languages = ["English", "Hindi", "Regional"];

export function PublicationFilter() {
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedLang, setSelectedLang] = useState("All Languages");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border animate-in fade-in zoom-in-95 duration-700">
      <div className="container-custom py-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
          
          {/* Discovery Controls */}
          <div className="flex flex-wrap items-center gap-8 w-full xl:w-auto">
            <div className="flex items-center gap-3 text-gold">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Filter Press</span>
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-3">
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

            {/* Newspaper Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Source:</span>
              <div className="relative group">
                <button className="flex items-center gap-3 px-5 py-2 bg-silver/5 border border-border rounded-sm text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-white hover:border-gold transition-all btn-slide-gold group">
                  <Newspaper className="w-3.5 h-3.5 text-gold" />
                  {selectedSource}
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Language Filter */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Lang:</span>
              <div className="flex items-center gap-1">
                {languages.map((lang, index) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all border ${
                      selectedLang === lang
                        ? "bg-gold text-charcoal border-transparent "
                        : "bg-silver/5 text-muted-foreground border-transparent hover:border-border"
                    } ${index === languages.length - 1 ? 'mr-8' : ''}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Engine */}
          <div className="relative w-full xl:w-96 group">
            <input
              type="text"
              placeholder="Search Public Notices..."
              className="w-full bg-silver/5 border border-border rounded-sm py-3.5 px-12 text-xs focus:outline-none focus:border-gold transition-all group-hover:border-gold/50"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <span className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] hidden sm:block">Query</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
