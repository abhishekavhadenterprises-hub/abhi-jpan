"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function ShareholdingHero() {
  return (
    <PremiumHero 
      title="Shareholding"
      subtitle="Pattern"
      description="An institutional overview of J Pan Tubular Components Limited's ownership structure, reflecting our commitment to transparent capital allocation and corporate governance."
      imageSrc="/images/financial-abstract.png"
      badgeText="Investor Relations"
    />
  );
}
