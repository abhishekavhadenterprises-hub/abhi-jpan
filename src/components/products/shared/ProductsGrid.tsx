"use client";

import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layers } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/shared/ProductCard";

interface ProductsGridProps {
  selectedCategory: string;
  searchQuery?: string;
}

export function ProductsGrid({ selectedCategory, searchQuery = "" }: ProductsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((p) => {
    // 1. Category Filter
    const matchesCategory =
      selectedCategory === "All Products"
        ? true
        : Array.isArray(p.category)
        ? p.category.includes(selectedCategory)
        : p.category === selectedCategory;

    if (!matchesCategory) return false;

    // 2. Search Query Filter
    if (!normalizedQuery) return true;

    const nameMatch = p.name.toLowerCase().includes(normalizedQuery);
    const descMatch = p.description.toLowerCase().includes(normalizedQuery);
    const specsMatch = p.specs.toLowerCase().includes(normalizedQuery);
    const overviewMatch = p.overview ? p.overview.toLowerCase().includes(normalizedQuery) : false;
    const categoryMatch = Array.isArray(p.category)
      ? p.category.some((c) => c.toLowerCase().includes(normalizedQuery))
      : p.category.toLowerCase().includes(normalizedQuery);

    return nameMatch || descMatch || specsMatch || overviewMatch || categoryMatch;
  });

  return (
    <div className="container-custom py-8 overflow-visible">
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2">
            No Products Found
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            We couldn&apos;t find any components matching &quot;{searchQuery}&quot; in {selectedCategory}. Try broadening your search or resetting filters.
          </p>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="overflow-visible px-1 pt-2 pb-10 relative"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} idx={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
