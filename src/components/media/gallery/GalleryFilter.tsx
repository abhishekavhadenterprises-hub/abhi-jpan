"use client";

import React from "react";
import { motion } from "framer-motion";
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
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#EBF3FC]/80 dark:bg-[#070b14] border border-[#7BA4D0]/30 dark:border-[#2E5E99]/30 backdrop-blur-md shadow-sm">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={cn(
                    "relative px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 select-none",
                    isActive
                      ? "text-white"
                      : "text-[#0D2440]/70 dark:text-silver/70 hover:text-[#0D2440] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="galleryTabHighlight"
                      className="absolute inset-0 bg-[#0D2440] dark:bg-[#2E5E99] rounded-xl shadow-md shadow-[#0D2440]/15 dark:shadow-none -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

