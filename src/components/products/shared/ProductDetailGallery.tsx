"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailGalleryProps {
  name: string;
  specs: string;
  image: string;
  images?: string[];
}

export function ProductDetailGallery({
  name,
  specs,
  image,
  images = [],
}: ProductDetailGalleryProps) {
  const allImages = images && images.length > 0 ? images : [image];
  const [activeIndex, setActiveIndex] = useState(0);

  const hasMultiple = allImages.length > 1;
  const currentImage = allImages[activeIndex] || image;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-white dark:bg-[#0a0f18] border border-border/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-gold/40 transition-all duration-300 flex flex-col">
      {/* Top Left Logo Pin Badge */}
      <div className="absolute top-6 left-6 z-10 w-11 h-11 rounded-2xl bg-charcoal dark:bg-white text-gold dark:text-charcoal border border-gold/40 flex items-center justify-center font-black text-sm">
        J
      </div>

      {/* Specs Badge Top Right */}
      <div className="absolute top-6 right-6 z-10 px-4 py-1.5 bg-gold/10 backdrop-blur-md rounded-full border border-gold/30 text-[10px] font-extrabold uppercase tracking-wider text-gold flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" />
        {specs}
      </div>

      {/* Main Product Image Container with safe bounds ensuring no clipping */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] flex items-center justify-center p-4 my-2">
        <Image
          key={currentImage}
          src={currentImage}
          alt={name}
          fill
          className="object-contain p-2 select-none"
          priority
        />

        {/* Prev / Next Controls if multiple images */}
        {hasMultiple && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-auto z-20">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-charcoal/90 text-charcoal dark:text-white hover:bg-gold hover:text-black border border-border/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-charcoal/90 text-charcoal dark:text-white hover:bg-gold hover:text-black border border-border/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Switcher Bar if multiple images */}
      {hasMultiple && (
        <div className="flex items-center justify-center gap-3 pb-6 z-10">
          {allImages.map((imgSrc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-14 h-14 rounded-xl overflow-hidden border-2 p-1 transition-all duration-300 bg-silver/10 dark:bg-white/5 cursor-pointer",
                activeIndex === idx
                  ? "border-gold scale-105"
                  : "border-border/60 hover:border-gold/50 opacity-70 hover:opacity-100"
              )}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={imgSrc}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Quick Quality Specs Strip at Card Bottom */}
      <div className="pt-6 border-t border-border/40 grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-auto">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-gold" />
          <span>100% Leak Tested</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Zap className="w-4 h-4 text-gold" />
          <span>High Thermal Transfer</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Settings className="w-4 h-4 text-gold" />
          <span>CNC Formed</span>
        </div>
      </div>
    </div>
  );
}
