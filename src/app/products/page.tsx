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
    <main className="overflow-hidden">
      <div className="animate-in fade-in duration-1000">
        <ProductsHero />
      </div>
      <div className="sticky top-20 z-40 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
        <FilterBar 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both overflow-visible">
        <ProductsGrid selectedCategory={activeCategory} searchQuery={searchQuery} />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both overflow-visible">
        <CategoryHighlights />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both overflow-visible">
        <CustomManufacturing />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both overflow-visible">
        <ProductIndustries />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both overflow-visible">
        <ProductCTA />
      </div>
    </main>
  );
}
