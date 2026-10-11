"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function AboutHero() {
  return (
    <PremiumHero 
      title="About Us"
      subtitle="Built with J-Pan."
      description="J-Pan believes precision engineering should feel effortless over time, delivering mission-critical tubular components shaped by metallurgical mastery, advanced automation, and an uncompromising standard of zero-defect quality."
      imageSrc="/images/about-hero-new.png"
      badgeText="OVER 25 YEARS OF EXCELLENCE"
    />
  );
}
