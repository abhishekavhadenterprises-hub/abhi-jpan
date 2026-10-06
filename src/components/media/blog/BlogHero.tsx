"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function BlogHero() {
  return (
    <PremiumHero 
      title="Industry &"
      subtitle="Technical Insights."
      description="Exploring the latest innovations in precision metallurgical engineering, automated manufacturing, and the future of mission-critical tubular components."
      imageSrc="/images/custom_manufacturing_bg.png"
      badgeText="Knowledge Hub & Insights"
    />
  );
}
