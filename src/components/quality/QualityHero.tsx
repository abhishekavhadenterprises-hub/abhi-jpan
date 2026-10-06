"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function QualityHero() {
  return (
    <PremiumHero 
      title="Better precision"
      subtitle="Built with J-Pan."
      description="IATF 16949 & ISO 9001:2015 accredited zero-defect metallurgical manufacturing for global automotive, HVAC, and industrial leaders."
      imageSrc="/images/quality-hero-cinematic.jpg"
      badgeText="Official Accreditation"
    />
  );
}
