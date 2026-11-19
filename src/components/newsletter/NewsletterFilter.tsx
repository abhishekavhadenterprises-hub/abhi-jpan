"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const years = ["2025", "2024", "2023", "2022"];
const months = ["All Months", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function NewsletterFilter() {
  const [activeYear, setActiveYear] = useState("2025");
  const [activeMonth, setActiveMonth] = useState("All Months");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Year Selector Wrapper */}
          <div className="flex items-center gap-2 lg:gap-4 w-full lg:w-auto">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">Year:</span>
            <div className="flex flex-wrap items-center gap-2 w-full">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    activeYear === year
                      ? "bg-deepblue text-white "
                      : "bg-silver/10 text-muted-foreground hover:bg-silver/20"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Month */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
              <input
                type="text"
                placeholder="Search archive..."
                className="w-full bg-silver/10 border border-border rounded-sm py-2 px-10 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <div className="relative group">
              <button className="flex items-center gap-2 bg-silver/10 border border-border rounded-sm py-2 px-6 text-sm font-bold text-charcoal dark:text-white hover:border-gold transition-colors btn-slide-gold group">
                Month: {activeMonth}
                <ChevronDown className="w-4 h-4 text-gold" />
              </button>
              {/* Dropdown would go here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
