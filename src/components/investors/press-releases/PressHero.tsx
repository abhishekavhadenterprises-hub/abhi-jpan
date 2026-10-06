"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function PressHero() {
  return (
    <PremiumHero 
      title="Press"
      subtitle="&"
      description="Official news, corporate updates, and media highlights from J Pan Tubular Components Limited. Ensuring transparency and communication excellence."
      imageSrc="/images/about-hero.png"
      badgeText="Media Center"
    />
  );
}
