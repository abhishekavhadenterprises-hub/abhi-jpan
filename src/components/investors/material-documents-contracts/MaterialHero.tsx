"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function MaterialHero() {
  return (
    <PremiumHero 
      title="Material Documents &"
      subtitle="Corporate Contracts."
      description="Authoritative disclosures of key corporate agreements, constitutional documents, and material contracts, maintained in strict accordance with SEBI (LODR) Regulations."
      imageSrc="/images/custom-engineering.png"
      badgeText="STATUTORY DISCLOSURES & SEBI COMPLIANCE"
    />
  );
}
