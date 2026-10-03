"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All Products", "Chiller", "Copper Components", "Brass Components", "Steel Components"];

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({ 
  activeCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}: FilterBarProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <div id="catalog" className="sticky top-16 sm:top-20 z-20 bg-white/90 dark:bg-[#070b14]/90 border-y border-slate-200/80 dark:border-white/10 backdrop-blur-md transition-colors duration-300">
      <div className="container-custom py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Categories Navigation (Smooth Rounded Capsule Pills) */}
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={cn(
                      "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer",
                      isActive
                        ? "bg-[#0D2440] dark:bg-[#2E5E99] text-white scale-[1.02]"
                        : "bg-slate-100/70 dark:bg-white/[0.04] text-slate-600 dark:text-white/70 hover:text-[#0D2440] dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.08]"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {/* Scroll fade hint on mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#070b14] pointer-events-none md:hidden" />
          </div>

          {/* Desktop Search & Industry Filter (Rounded Capsule Design) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Rounded Search Input Pill */}
            <div className="relative group">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search components..."
                className="bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 pr-10 text-xs sm:text-sm focus:outline-none focus:border-[#2E5E99] dark:focus:border-[#7BA4D0] transition-all w-60 rounded-full text-[#0D2440] dark:text-white placeholder:text-slate-400 font-sans"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D2440] dark:text-white/60 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-[#2E5E99] dark:group-focus-within:text-[#7BA4D0] pointer-events-none" />
              )}
            </div>
            
            {/* Rounded Industry Link Button */}
            <Link 
              href="/industries"
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] hover:bg-slate-50 dark:hover:bg-white/10 text-xs sm:text-sm font-heading font-semibold text-[#0D2440] dark:text-white transition-all duration-300 rounded-full group"
            >
              <Filter className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-110 transition-transform duration-300" />
              <span>Industry</span>
            </Link>
          </div>

          {/* Mobile Search Toggle */}
          <button 
            className="lg:hidden text-[#0D2440] dark:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Toggle search"
          >
            {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Search Bar Expansion (Rounded) */}
        {isMobileSearchOpen && (
          <div className="lg:hidden mt-3 animate-in slide-in-from-top-2">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search components..."
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-[#2E5E99] rounded-full text-[#0D2440] dark:text-white"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D2440] dark:text-white/60 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
