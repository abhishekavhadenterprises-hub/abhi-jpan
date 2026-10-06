"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/data/products";

export interface ProductCardProps {
  product: Product;
  idx?: number;
  className?: string;
}

export function ProductCard({ product, idx = 0, className }: ProductCardProps) {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIdx(index);
  };

  const currentImage = images[activeImgIdx] || product.image;

  return (
    <motion.div
      key={product.id}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{
        duration: 0.5,
        delay: idx * 0.04,
        ease: [0.16, 1, 0.3, 1], // Apple fluid spring curve
      }}
      className={cn("group w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center overflow-visible", className)}
    >
      <Link
        href={`/products/${product.id}`}
        className="block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5E99] rounded-2xl sm:rounded-3xl"
      >
        {/* Simple & Sober Premium Card Container */}
        <div className="relative h-full bg-white dark:bg-[#091524] border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1] hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col group/card">

          {/* ========================================================
              TOP IMAGE VIEWPORT: Clean & Minimalist
             ======================================================== */}
          <div className="relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center p-8 select-none border-b border-slate-100 dark:border-white/5 bg-[#F8FAFC] dark:bg-[#050C17]">
            
            {/* Product Image with Highly Subtle Scaling */}
            <div className="relative w-full h-full transition-transform duration-[1200ms] ease-[0.16,1,0.3,1] scale-100 group-hover/card:scale-105">
              <Image
                key={currentImage}
                src={currentImage}
                alt={product.name}
                fill
                className="object-contain select-none pointer-events-none transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Floating Top Header Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0] shadow-[0_0_8px_#2E5E99] dark:shadow-[0_0_8px_#7BA4D0]" />
                <span className="text-[9px] font-heading font-bold uppercase tracking-[0.15em] text-[#0D2440] dark:text-white">
                  {Array.isArray(product.category) ? product.category[0] : product.category}
                </span>
              </div>

              {/* Multi-Image Dots Pill (if multiple) */}
              {hasMultipleImages && (
                <div className="flex items-center gap-1 bg-white/80 dark:bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200/60 dark:border-white/10 shadow-sm pointer-events-auto">
                  {images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => handleSelectImage(e, dotIdx)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300 cursor-pointer",
                        dotIdx === activeImgIdx
                          ? "w-4 bg-[#2E5E99] dark:bg-white"
                          : "w-1.5 bg-slate-300 dark:bg-white/30 hover:bg-slate-400 dark:hover:bg-white/70"
                      )}
                      aria-label={`View image ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Multi-Image Prev / Next Arrows */}
            {hasMultipleImages && (
              <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-auto">
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md text-[#0D2440] dark:text-white hover:bg-[#2E5E99] dark:hover:bg-white hover:text-white dark:hover:text-black border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md text-[#0D2440] dark:text-white hover:bg-[#2E5E99] dark:hover:bg-white hover:text-white dark:hover:text-black border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bottom Specs Micro Badge */}
            {product.specs && (
              <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md text-[#0D2440] dark:text-white/90 border border-slate-200/60 dark:border-white/10 shadow-sm text-[9px] font-heading font-medium tracking-wide">
                  <ShieldCheck className="w-3 h-3 text-[#2E5E99] dark:text-[#7BA4D0]" />
                  <span>{product.specs}</span>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================
              CARD BODY: Minimalist Details
             ======================================================== */}
          <div className="p-6 sm:p-7 flex flex-col flex-grow bg-transparent relative">
            <div className="flex-grow space-y-2.5 relative z-10">
              {/* Product Title */}
              <h3 className="text-lg sm:text-xl font-heading font-light text-[#0D2440] dark:text-white leading-snug tracking-tight group-hover/card:text-[#2E5E99] dark:group-hover/card:text-[#7BA4D0] transition-colors duration-500 line-clamp-1">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-slate-500 dark:text-white/60 text-xs sm:text-sm leading-relaxed line-clamp-2 font-sans font-light">
                {product.description}
              </p>
            </div>

            {/* Micro Feature Tags */}
            <div className="flex items-center gap-2 pt-4 flex-wrap relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-heading font-medium text-slate-500 dark:text-white/50 bg-white/60 dark:bg-white/[0.04] px-2.5 py-1 rounded border border-slate-200/60 dark:border-white/5">
                <CheckCircle2 className="w-3 h-3 text-[#2E5E99] dark:text-[#7BA4D0]" />
                Zero-Defect
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-heading font-medium text-slate-500 dark:text-white/50 bg-white/60 dark:bg-white/[0.04] px-2.5 py-1 rounded border border-slate-200/60 dark:border-white/5">
                High Tolerance
              </span>
            </div>

            {/* Premium Action Strip */}
            <div className="pt-5 mt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between relative z-10">
              <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-[#0D2440]/70 dark:text-white/60 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-[#7BA4D0] transition-colors duration-500">
                Explore Specs
              </span>

              {/* Circular Interactive Arrow Button */}
              <div className="w-9 h-9 rounded-full bg-white dark:bg-white/5 text-[#0D2440] dark:text-white border border-slate-200/80 dark:border-white/10 shadow-sm group-hover/card:bg-[#2E5E99] group-hover/card:border-[#2E5E99] group-hover/card:text-white dark:group-hover/card:bg-white dark:group-hover/card:text-black transition-all duration-500 flex items-center justify-center group-hover/card:translate-x-1 group-hover/card:-translate-y-1">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover/card:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
