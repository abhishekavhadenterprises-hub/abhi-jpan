"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

const categories = ["All Insights", "Technical", "Technology", "Company", "Engineering", "Innovation", "Quality"];

interface BlogFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BlogFilter({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: BlogFilterProps) {
  return (
    <section className="relative z-20 bg-white dark:bg-[#070b14] transition-colors">
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Categories Segmented Bar */}
          <div className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-[#0c1527] border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-[#0D2440] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="blogTabHighlight"
                      className="absolute inset-0 bg-[#0D2440] dark:bg-[#2E5E99] rounded-xl shadow-md shadow-[#0D2440]/15 dark:shadow-none -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-slate-50 dark:bg-[#0c1527] border border-slate-200/90 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-[#0D2440] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2E5E99] focus:ring-4 focus:ring-[#2E5E99]/10 transition-all shadow-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D2440] dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
