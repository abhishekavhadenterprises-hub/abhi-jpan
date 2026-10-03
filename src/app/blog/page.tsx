"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BlogHero } from "@/components/media/blog/BlogHero";
import { BlogFeatured } from "@/components/media/blog/BlogFeatured";
import { BlogGrid } from "@/components/media/blog/BlogGrid";
import { BlogFilter } from "@/components/media/blog/BlogFilter";
import { RelatedArticles } from "@/components/media/blog/RelatedArticles";
import { BlogDetailModal } from "@/components/media/blog/BlogDetailModal";
import { BlogCTA } from "@/components/media/blog/BlogCTA";

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  return (
    <Suspense fallback={
      <main className="overflow-hidden min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="text-center text-charcoal/50 dark:text-white/50 py-24">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <span className="font-bold tracking-widest uppercase text-sm">Loading Insights...</span>
        </div>
      </main>
    }>
      <BlogPageInner selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} />
    </Suspense>
  );
}

function BlogPageInner({ selectedArticle, setSelectedArticle }: { selectedArticle: any; setSelectedArticle: (article: any) => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category") || "All Insights";
  const searchQuery = searchParams.get("search") || "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All Insights") {
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
    <main className="overflow-hidden bg-white dark:bg-black">
      <BlogHero />
      <BlogFeatured onReadMore={setSelectedArticle} />
      <BlogFilter 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <BlogGrid 
        selectedCategory={activeCategory}
        searchQuery={searchQuery}
        onReadMore={setSelectedArticle} 
      />
      <RelatedArticles onReadMore={setSelectedArticle} />
      <BlogCTA />
      
      <BlogDetailModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </main>
  );
}
