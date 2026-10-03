"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const categories = ["All News", "Announcements", "Products", "Financial", "Events"];
const years = ["2025", "2024", "2023", "2022"];

export function PressFilter() {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [activeYear, setActiveYear] = useState("2025");

  return (
    <section className="relative z-20 bg-white/50 dark:bg-charcoal/50 border-b border-border">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-deepblue text-white "
                    : "bg-silver/10 text-muted-foreground hover:bg-silver/20"
                } ${index === categories.length - 1 ? 'mr-8' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Year */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full bg-silver/10 border border-border rounded-sm py-2 px-10 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <div className="relative group">
              <button className="flex items-center gap-2 bg-silver/10 border border-border rounded-sm py-2 px-6 text-sm font-bold text-charcoal dark:text-white hover:border-gold transition-colors btn-slide-gold group">
                Year: {activeYear}
                <ChevronDown className="w-4 h-4 text-gold" />
              </button>
              {/* Dropdown would go here in a full implementation */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
