"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function RatingHero() {
  return (
    <PremiumHero 
      title="Credit Rating &"
      subtitle="Financial Strength."
      description="An objective evaluation of J Pan Tubular Components Limited's creditworthiness, capital discipline, and long-term solvency conducted by accredited independent rating agencies."
      imageSrc="/images/hvac_category_bg.png"
      badgeText="INDEPENDENT FINANCIAL VALIDATION"
    />
  );
}
