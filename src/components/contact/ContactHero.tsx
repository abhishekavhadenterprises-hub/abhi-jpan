"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function ContactHero() {
  return (
    <PremiumHero 
      title="{firstWord}"
      subtitle="{remainingTitle}"
      description="Direct and dedicated communication channels for J Pan Tubular Components Limited stakeholders, ensuring absolute transparency and responsive engagement."
      imageSrc="/images/default-hero.jpg"
      badgeText="{subtitle}"
    />
  );
}
