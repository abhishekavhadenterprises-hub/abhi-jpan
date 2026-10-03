"use client";

import React, { useState } from "react";
import { GalleryHero } from "@/components/media/gallery/GalleryHero";
import { GalleryFilter } from "@/components/media/gallery/GalleryFilter";
import { GalleryGrid } from "@/components/media/gallery/GalleryGrid";
import { GalleryVideo } from "@/components/media/gallery/GalleryVideo";
import { GalleryFeatured } from "@/components/media/gallery/GalleryFeatured";
import { GalleryProcessStory } from "@/components/media/gallery/GalleryProcessStory";
import { GalleryCTA } from "@/components/media/gallery/GalleryCTA";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GalleryHero />
      <GalleryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <GalleryGrid selectedCategory={activeCategory} />
      <GalleryVideo />
      <GalleryFeatured />
      <GalleryProcessStory />
      <GalleryCTA />
    </main>
  );
}
