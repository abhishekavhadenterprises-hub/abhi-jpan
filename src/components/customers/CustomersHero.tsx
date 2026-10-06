"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function CustomersHero() {
  return (
    <PremiumHero 
      title="Trusted by"
      subtitle="Industry Leaders"
      description="Building long-term technical value for the world's most demanding HVAC, Automotive, and Industrial brands."
      imageSrc="/images/about-hero.png"
      badgeText="Global Partnerships"
    />
  );
}
