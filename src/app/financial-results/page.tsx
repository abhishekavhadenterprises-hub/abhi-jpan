"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { FinancialIntro } from "@/components/investors/financial-results/FinancialIntro";
import { FinancialHighlights } from "@/components/investors/financial-results/FinancialHighlights";
import { FinancialInvestorInfo } from "@/components/investors/financial-results/FinancialInvestorInfo";
import { FinancialCTA } from "@/components/investors/financial-results/FinancialCTA";

const results = [
  {
    id: 1,
    title: "Unaudited Financial Results - Quarter 3",
    period: "Q3 FY 2024-25",
    date: "Jan 14, 2026",
    type: "Quarterly Report",
    status: "Published"
  },
  {
    id: 2,
    title: "Unaudited Financial Results - Quarter 2",
    period: "Q2 FY 2024-25",
    date: "Oct 22, 2025",
    type: "Quarterly Report",
    status: "Published"
  },
  {
    id: 3,
    title: "Audited Financial Results - Annual",
    period: "Full Year 2023-24",
    date: "May 15, 2024",
    type: "Annual Report",
    status: "Audited"
  },
  {
    id: 4,
    title: "Unaudited Financial Results - Quarter 1",
    period: "Q1 FY 2024-25",
    date: "July 28, 2025",
    type: "Quarterly Report",
    status: "Published"
  },
  {
    id: 5,
    title: "Unaudited Financial Results - Quarter 4",
    period: "Q4 FY 2023-24",
    date: "April 10, 2024",
    type: "Quarterly Report",
    status: "Published"
  }
];

export default function FinancialResultsPage() {
  return (
    <main className="overflow-hidden">
      <GenericInvestorHero 
        title="Financial Results" 
        subtitle="Comprehensive quarterly and annual audited financial statements and performance metrics."
        variant="bottom"
        image="/images/industrial_category_bg.png"
      />
      
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
        <FinancialIntro />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
        <FinancialHighlights />
      </div>

      <GenericInvestorFilter />

      <GenericInvestorListing 
        items={results} 
        sectionTitle="Financial Disclosures"
        category="Financial Report"
      />

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
        <FinancialInvestorInfo />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both">
        <FinancialCTA />
      </div>
    </main>
  );
}
