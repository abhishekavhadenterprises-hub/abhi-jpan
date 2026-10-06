"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function AnnualReportsHero() {
  return (
    <PremiumHero 
      title="Annual Reports &"
      subtitle="Financial Filings."
      description="Comprehensive financial statements, independent audit reports, operational milestones, and strategic governance disclosures for valued stakeholders."
      imageSrc="/images/annual_reports_hero.png"
      badgeText="OFFICIAL FINANCIAL AUDITS & DISCLOSURES"
    />
  );
}
