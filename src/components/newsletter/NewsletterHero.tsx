"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function NewsletterHero() {
  return (
    <PremiumHero 
      title="The Precision"
      subtitle="Edge"
      description="A chronological record of our industrial journey, technical breakthroughs, and corporate milestones."
      imageSrc="/images/about-hero.png"
      badgeText="Community Hub"
    />
  );
}
