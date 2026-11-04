"use client";

import React, { Suspense, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductsHero } from "@/components/products/shared/ProductsHero";
import { FilterBar } from "@/components/products/shared/FilterBar";
import { ProductsGrid } from "@/components/products/shared/ProductsGrid";
import { CategoryHighlights } from "@/components/products/shared/CategoryHighlights";
import { CustomManufacturing } from "@/components/products/shared/CustomManufacturing";
import { ProductIndustries } from "@/components/products/shared/ProductIndustries";
import { ProductCTA } from "@/components/products/shared/ProductCTA";

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

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

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
          HIGH-PERFORMANCE ARCHITECTURAL AMBIENT BACKGROUND
          Zero GPU overhead, silky smooth 60fps scrolling
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#FAFAFA] dark:bg-[#060D17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(46,94,153,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(46,94,153,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_100%_100%,rgba(123,164,208,0.06),transparent_65%)] dark:bg-[radial-gradient(circle_600px_at_100%_100%,rgba(123,164,208,0.1),transparent_65%)]" />
      </div>

      <div className="relative z-10 animate-in fade-in duration-700">
        <ProductsHero />
      </div>
      <div className="relative z-40 animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
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
      <div className="relative z-10 overflow-visible">
        <CategoryHighlights />
      </div>
      <div className="relative z-10 overflow-visible">
        <CustomManufacturing />
      </div>
      <div className="relative z-10 overflow-visible">
        <ProductIndustries />
      </div>
      <div className="relative z-10 overflow-visible">
        <ProductCTA />
      </div>
    </main>
  );
}
