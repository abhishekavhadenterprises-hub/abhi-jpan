"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function CertificationsHero() {
  return (
    <PremiumHero 
      title="Statutory Standards &"
      subtitle="Certifications."
      description="Official ISO and national statutory accreditations validating our precision tubular engineering, environmental management, occupational safety, and zero-defect manufacturing across all 5 operational facilities."
      imageSrc="/images/quality-hero-cinematic.jpg"
      badgeText="Statutory Accreditations"
    />
  );
}
