"use client";

import React from "react";
import { GenericInvestorHero, GenericInvestorTable, GenericInvestorFilter } from "@/components/investors/shared/GenericInvestorComponents";

const data = [
  {
    id: 1,
    date: "July 03, 2026",
    particulars: "Industry Report on Tubing and Fitting Components",
    link: "/documents/industry-report-tubing-fitting-components.pdf",
    category: "Market Research",
    status: "Verified",
    fileSize: "1.1 MB"
  }
];

export default function IndustryReportPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-background">
      <GenericInvestorHero 
        title="Industry Report"
        subtitle="Comprehensive industry research report on the precision tubing and fitting components market."
        image="/images/home_hero_3d.jpg"
        parent="INVESTOR RELATIONS"
        badgeText="Statutory Disclosures"
        variant="left"
      />
      
      <GenericInvestorFilter />
      <GenericInvestorTable data={data} />
    </main>
  );
}
