"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function GalleryHero() {
  return (
    <PremiumHero 
      title="Gallery"
      subtitle="Visual Showcase"
      description="A visual journey across our automated manufacturing facilities, precision metallurgical engineering, and 28+ years of mission-critical tubular excellence."
      imageSrc="/images/about-manufacturing.png"
    />
  );
}
