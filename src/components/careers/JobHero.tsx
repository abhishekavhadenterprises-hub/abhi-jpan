"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function JobHero() {
  return (
    <PremiumHero 
      title="{job.title}"
      subtitle=""
      description=""
      imageSrc="/images/job-detail-hero.png"
      badgeText="{job.location}"
    />
  );
}
