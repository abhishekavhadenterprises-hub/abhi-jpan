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
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.4,
        delay: idx * 0.04,
        ease: [0.16, 1, 0.3, 1], // Apple fluid spring curve
      }}
      className={cn("group w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center overflow-visible", className)}
    >
      <Link
        href={`/products/${product.id}`}
        className="block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5E99] rounded-2xl sm:rounded-3xl"
      >
        {/* Apple & Stripe Grade Card Container */}
        <div className="relative h-full bg-white dark:bg-[#0B1728] border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:border-slate-300 dark:hover:border-[#7BA4D0]/40 flex flex-col group/card">

          {/* ========================================================
              TOP IMAGE VIEWPORT: 100% Pure Pristine White Canvas
             ======================================================== */}
          <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6 sm:p-8 select-none border-b border-slate-100 dark:border-white/10">
            {/* Ambient Subtle Studio Spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,248,252,0.9)_0%,#FFFFFF_80%)] pointer-events-none" />

            {/* Product Image with Fluid Apple-style Hover Lift */}
            <div className="relative w-full h-full transition-transform duration-700 ease-[0.16,1,0.3,1] scale-100 group-hover/card:scale-110">
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
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-30">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-[#0D2440]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
                <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#0D2440] dark:text-white">
                  {Array.isArray(product.category) ? product.category[0] : product.category}
                </span>
              </div>

              {/* Multi-Image Dots Pill (if multiple) */}
              {hasMultipleImages && (
                <div className="flex items-center gap-1 bg-black/65 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 pointer-events-auto">
                  {images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => handleSelectImage(e, dotIdx)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300 cursor-pointer",
                        dotIdx === activeImgIdx
                          ? "w-3.5 bg-white"
                          : "w-1 bg-white/40 hover:bg-white/80"
                      )}
                      aria-label={`View image ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Multi-Image Prev / Next Arrows */}
            {hasMultipleImages && (
              <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-auto">
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-[#0D2440] hover:bg-[#0D2440] hover:text-white border border-slate-200/80 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-[#0D2440] hover:bg-[#0D2440] hover:text-white border border-slate-200/80 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bottom Specs Micro Badge */}
            {product.specs && (
              <div className="absolute bottom-3 left-3.5 z-30 pointer-events-none">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-slate-700 border border-slate-200/90 backdrop-blur-xs text-[9px] font-heading font-medium tracking-wide">
                  <ShieldCheck className="w-3 h-3 text-[#2E5E99]" />
                  <span>{product.specs}</span>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================
              CARD BODY: Apple / Stripe Exhibition Typography
             ======================================================== */}
          <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white dark:bg-[#0B1728]">
            <div className="flex-grow space-y-2">
              {/* Product Title */}
              <h3 className="text-base sm:text-lg font-heading font-bold text-[#0D2440] dark:text-white leading-snug tracking-tight group-hover/card:text-[#2E5E99] dark:group-hover/card:text-[#7BA4D0] transition-colors duration-300 line-clamp-1">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-slate-500 dark:text-white/60 text-xs sm:text-[13px] leading-relaxed line-clamp-2 font-sans font-normal">
                {product.description}
              </p>
            </div>

            {/* Micro Feature Tags (Apple E-Commerce Hallmark) */}
            <div className="flex items-center gap-2 pt-3 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-heading font-medium text-slate-500 dark:text-white/50 bg-slate-50 dark:bg-white/[0.04] px-2 py-0.5 rounded-md border border-slate-100 dark:border-white/5">
                <CheckCircle2 className="w-2.5 h-2.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                Zero-Defect
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-heading font-medium text-slate-500 dark:text-white/50 bg-slate-50 dark:bg-white/[0.04] px-2 py-0.5 rounded-md border border-slate-100 dark:border-white/5">
                High Tolerance
              </span>
            </div>

            {/* Apple / Stripe Action Strip */}
            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#0D2440]/80 dark:text-white/80 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-[#7BA4D0] transition-colors duration-300">
                Explore Specs
              </span>

              {/* Circular Interactive Arrow Button */}
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/[0.08] text-[#0D2440] dark:text-white group-hover/card:bg-[#0D2440] group-hover/card:text-white dark:group-hover/card:bg-[#2E5E99] dark:group-hover/card:text-white transition-all duration-300 flex items-center justify-center group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/card:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
