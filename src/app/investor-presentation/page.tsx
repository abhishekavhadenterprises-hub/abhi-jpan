"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { InvestorPresentationIntro } from "@/components/investors/investor-presentation/InvestorPresentationIntro";
import { InvestorPresentationHighlights } from "@/components/investors/investor-presentation/InvestorPresentationHighlights";
import { InvestorPresentationCTA } from "@/components/investors/investor-presentation/InvestorPresentationCTA";

const presentations = [
  {
    id: 1,
    title: "Quarterly Earnings Presentation - Q3 FY 2024-25",
    period: "Q3 FY 2024-25",
    date: "Jan 18, 2025",
    type: "Quarterly Results",
    status: "Published"
  },
  {
    id: 2,
    title: "Capital Markets Day Strategic Narrative",
    period: "FY 2024-25",
    date: "Nov 05, 2024",
    type: "Corporate Strategy",
    status: "Published"
  },
  {
    id: 3,
    title: "Investor Presentation - Q2 FY 2024-25",
    period: "Q2 FY 2024-25",
    date: "Oct 28, 2024",
    type: "Quarterly Results",
    status: "Published"
  },
  {
    id: 4,
    title: "Sustainability & ESG Performance Review",
    period: "FY 2023-24",
    date: "Sept 12, 2024",
    type: "ESG Report",
    status: "Published"
  }
];

export default function InvestorPresentationPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GenericInvestorHero 
        title="Investor Presentation" 
        subtitle="Strategic roadmaps, market growth drivers, and corporate capacity disclosures."
        variant="bottom"
        image="/images/hvac_industry_bg.png"
      />
      <InvestorPresentationIntro />
      <GenericInvestorFilter />
      <GenericInvestorListing 
        items={presentations}
        sectionTitle="Strategic Narrative"
        category="Presentation"
      />
      <InvestorPresentationHighlights />
      <InvestorPresentationCTA />
    </main>
  );
}
