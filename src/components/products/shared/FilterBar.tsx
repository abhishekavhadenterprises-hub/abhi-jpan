"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink the bar slightly when scrolling for a dynamic feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="catalog" className="sticky top-24 z-40 w-full flex justify-center px-4 sm:px-6 pointer-events-none pb-8 pt-4">
      {/* Premium Floating Glass Island */}
      <motion.div 
        layout
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 p-2 rounded-full transition-all duration-500",
          "bg-white/70 dark:bg-[#070b14]/60 backdrop-blur-2xl",
          "border border-white/50 dark:border-white/10",
          "shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          scrolled ? "py-1.5 px-2" : "py-2 px-2 sm:px-3"
        )}
      >
        {/* Categories (Smooth Rounded Capsule Pills) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar max-w-[60vw] sm:max-w-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-heading font-medium whitespace-nowrap transition-colors duration-300 flex-shrink-0 outline-none",
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-white/70 hover:text-[#0D2440] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#0D2440] dark:bg-[#2E5E99] rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-slate-200 dark:bg-white/10 hidden sm:block mx-1" />

        {/* Search & Filter Section */}
        <div className="flex items-center gap-2">
          {/* Expanding Search Bar */}
          <motion.div 
            layout
            className={cn(
              "relative flex items-center bg-white/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-full transition-all duration-300 focus-within:border-[#2E5E99] dark:focus-within:border-[#7BA4D0]",
              isSearchExpanded || searchQuery ? "w-48 sm:w-60" : "w-10 sm:w-12 bg-transparent border-transparent"
            )}
          >
            <button 
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className={cn(
                "absolute left-0 top-0 bottom-0 flex items-center justify-center rounded-full transition-colors z-10",
                isSearchExpanded || searchQuery ? "w-10 text-slate-400" : "w-full text-[#0D2440] dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              <Search className={cn("w-4 h-4", (isSearchExpanded || searchQuery) && "text-[#2E5E99] dark:text-[#7BA4D0]")} />
            </button>
            
            <AnimatePresence>
              {(isSearchExpanded || searchQuery) && (
                <motion.input
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent pl-10 pr-10 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none text-[#0D2440] dark:text-white placeholder:text-slate-400 font-sans"
                  autoFocus
                  onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                />
              )}
            </AnimatePresence>

            {searchQuery && (
              <button
                onClick={() => {
                  onSearchChange("");
                  setIsSearchExpanded(false);
                }}
                className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center text-slate-400 hover:text-[#0D2440] dark:hover:text-white z-10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
          
          {/* Industry Link (Icon only on mobile) */}
          <Link 
            href="/industries"
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-100 dark:bg-white/10 hover:bg-[#2E5E99] hover:text-white dark:hover:bg-[#7BA4D0] dark:hover:text-[#0D2440] text-[#0D2440] dark:text-white transition-all duration-300 rounded-full group shrink-0"
          >
            <Filter className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xs sm:text-sm font-heading font-semibold hidden sm:block">Industry</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
