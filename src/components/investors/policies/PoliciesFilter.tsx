"use client";

import React, { useState } from "react";
import { Search, Filter, Bookmark, Briefcase, Gavel, SearchCheck } from "lucide-react";

const categories = [
  { id: "all", name: "All Policies", icon: Bookmark },
  { id: "governance", name: "Governance", icon: Gavel },
  { id: "hr", name: "HR Policies", icon: Briefcase },
  { id: "compliance", name: "Compliance", icon: SearchCheck },
];

export function PoliciesFilter() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <section className="relative z-20 bg-white dark:bg-black py-4">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Category Tabs Wrapper */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Fixed Label */}
            <div className="flex items-center gap-2 text-[#2E5E99] shrink-0">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Filter By</span>
            </div>
            
            {/* Scrollable Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                      activeCategory === cat.id
                        ? "bg-[#0D2440] text-white border-[#0D2440] "
                        : "bg-[#F8FAFC] dark:bg-charcoal/40 text-muted-foreground border-[#7BA4D0]/25 hover:border-[#2E5E99]/50"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${activeCategory === cat.id ? "text-white" : "text-[#2E5E99]"}`} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search Policy Repository..."
              className="w-full bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/30 rounded-2xl py-2.5 pl-11 pr-4 text-xs text-[#0D2440] dark:text-white placeholder:text-muted-foreground focus:outline-none focus:border-[#2E5E99] transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
