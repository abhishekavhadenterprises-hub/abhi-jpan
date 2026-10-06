"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function GalleryHero() {
  return (
    <PremiumHero 
      title="Gallery"
      subtitle=""
      description="{/* Precision Sparkles on Top */} {/* Walking Figure Silhouette */} {/* Line 2: untold */} untold {/* Line 3: ( [Fanned Photo Stack] ) stories */} ( {/* Fanned Stack of Physical Photographs */} {/* Photo 1: Left Tilted */} {/* Photo 2: Right Tilted */} {/* Photo 3: Center Front */} ) stories {/* Bottom Row: Call to Action + Editorial Narrative Shelf */} {/* Center-Left Action Button */} Explore Gallery {/* Right Annotation Note matching reference */} (*) A visual journey across 6 automated plants, zero-defect metallurgical engineering, and 28+ years of mission-critical tubular excellence."
      imageSrc="/images/about-manufacturing.png"
      badgeText="SCROLL TO DISCOVER"
    />
  );
}
