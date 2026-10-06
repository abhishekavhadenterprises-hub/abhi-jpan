"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductsHero } from "@/components/products/shared/ProductsHero";
import { FilterBar } from "@/components/products/shared/FilterBar";
import { ProductsGrid } from "@/components/products/shared/ProductsGrid";
import { CategoryHighlights } from "@/components/products/shared/CategoryHighlights";
import { CustomManufacturing } from "@/components/products/shared/CustomManufacturing";
import { ProductIndustries } from "@/components/products/shared/ProductIndustries";
import { ProductCTA } from "@/components/products/shared/ProductCTA";
import { Scanner } from "@/components/ui/Scanner";

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="overflow-hidden min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="text-center text-charcoal/50 dark:text-white/50 py-24">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <span className="font-bold tracking-widest uppercase text-sm">Loading Catalog...</span>
        </div>
      </main>
    }>
      <ProductsPageInner />
    </Suspense>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects for the background orbs
  const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const rotate = useTransform(scrollY, [0, 2000], [0, 120]);

  const activeCategory = searchParams.get("category") || "All Products";
  const searchQuery = searchParams.get("search") || "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All Products") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!query) {
      params.delete("search");
    } else {
      params.set("search", query);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main ref={containerRef} className="relative overflow-hidden min-h-screen bg-slate-50/50 dark:bg-[#050C17]">
      
      {/* =========================================
          ULTRA-PREMIUM OGL SCANNER BACKGROUND
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#FAFAFA] dark:bg-[#060D17]">
        <div className="absolute inset-0 opacity-20 dark:opacity-40">
          <Scanner
            color1="#0D2440"
            color2="#2E5E99"
            color3="#7BA4D0"
            speed={0.5}
            sweepSpeed={0.25}
            sweepWidth={1.6}
            sweepFalloff={6}
            scale={1.5}
            frequency={2}
            ripple={0.22}
            bandDensity={11}
            lineSharpness={5.5}
            glow={0.22}
            scanDirection="vertical"
            colorSpread={0.7}
            brightness={1.0}
            contrast={1.15}
            softness={1.4}
            vignette={0.45}
            scanline={true}
            grain={true}
            grainIntensity={0.05}
            opacity={1.0}
            mouseInteraction={true}
            mouseRadius={0.5}
            mouseStrength={0.5}
          />
        </div>
        
        {/* Soft Vignette Mask (Fades edges to pure solid color for readability) */}
        <div className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#060D17] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,black_100%)] opacity-90" />
      </div>

      <div className="relative z-10 animate-in fade-in duration-1000">
        <ProductsHero />
      </div>
      <div className="relative z-40 sticky top-20 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
        <FilterBar 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className="relative z-10">
        <ProductsGrid selectedCategory={activeCategory} searchQuery={searchQuery} />
      </div>
      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both overflow-visible">
        <CategoryHighlights />
      </div>
      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both overflow-visible">
        <CustomManufacturing />
      </div>
      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both overflow-visible">
        <ProductIndustries />
      </div>
      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both overflow-visible">
        <ProductCTA />
      </div>
    </main>
  );
}
