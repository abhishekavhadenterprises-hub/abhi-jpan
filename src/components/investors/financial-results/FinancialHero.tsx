"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function FinancialHero() {
  return (
    <PremiumHero 
      title="Financial"
      subtitle="Results"
      description="A comprehensive record of J Pan Tubular Components Limited's economic performance, technical disclosures, and strategic growth milestones."
      imageSrc="/images/hero-bg.png"
      badgeText="Investor Relations"
    />
  );
}
