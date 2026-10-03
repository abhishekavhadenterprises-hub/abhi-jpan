"use client";

import React from "react";
import { cn } from "@/lib/utils";

const categories = ["All", "Manufacturing", "Machinery", "Products", "Facilities"];

interface GalleryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function GalleryFilter({ activeCategory, onCategoryChange }: GalleryFilterProps) {
  return (
    <div id="gallery-feed" className="relative z-20 bg-white dark:bg-black pt-4 pb-8 transition-colors">
      <div className="container-custom overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-center min-w-max">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#EBF3FC]/90 dark:bg-charcoal/80 border border-[#7BA4D0]/30 backdrop-blur-md">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={cn(
                    "px-5 sm:px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 select-none",
                    isActive
                      ? "bg-[#0D2440] text-white"
                      : "text-[#0D2440]/70 dark:text-silver/70 hover:text-[#0D2440] dark:hover:text-white hover:bg-white/70"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

