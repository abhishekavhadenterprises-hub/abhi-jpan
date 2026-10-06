"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function AnnualReturnHero() {
  return (
    <PremiumHero 
      title="Annual"
      subtitle="Return"
      description="Official statutory filings and annual return documents as per regulatory mandates and corporate governance standards."
      imageSrc="/images/blueprint.png"
      badgeText="Statutory Filing"
    />
  );
}
