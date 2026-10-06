"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function PublicationHero() {
  return (
    <PremiumHero 
      title="Newspaper"
      subtitle="Publication"
      description="A comprehensive archive of public notices, financial results, and statutory announcements published across leading national and regional periodicals."
      imageSrc="/images/newspaper-abstract.png"
      badgeText="Media Transparency"
    />
  );
}
