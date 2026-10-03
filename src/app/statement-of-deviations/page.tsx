"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { StatementOfDeviationsIntro } from "@/components/investors/statement-of-deviations/StatementOfDeviationsIntro";
import { StatementOfDeviationsNote } from "@/components/investors/statement-of-deviations/StatementOfDeviationsNote";
import { StatementOfDeviationsCTA } from "@/components/investors/statement-of-deviations/StatementOfDeviationsCTA";

const statements = [
  {
    id: 1,
    period: "Q3 FY 2024–25",
    title: "Statement of Deviations – Q3 2025",
    date: "Jan 18, 2025",
    status: "Latest",
    type: "Fund Disclosure"
  },
  {
    id: 2,
    period: "Q2 FY 2024–25",
    title: "Statement of Deviations – Q2 2025",
    date: "Oct 28, 2024",
    status: "Verified",
    type: "Fund Disclosure"
  },
  {
    id: 3,
    period: "Q1 FY 2024–25",
    title: "Statement of Deviations – Q1 2025",
    date: "July 24, 2024",
    status: "Verified",
    type: "Fund Disclosure"
  }
];

export default function StatementOfDeviationsPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GenericInvestorHero 
        title="Statement of Deviations" 
        subtitle="Periodic statutory disclosures submitted to Stock Exchanges under Regulation 32 of SEBI (LODR) Regulations, confirming NIL deviation or variation in the utilization of public issue proceeds."
        variant="centered"
        image="/images/industrial_cta_bg.png"
        chips={[
          { label: "Statutory Mandate", value: "SEBI LODR Reg. 32" },
          { label: "Deviation / Variation", value: "NIL Reported" },
          { label: "Proceeds Deployment", value: "100% Verified" },
          { label: "Review Status", value: "Audit Committee Cleared" },
        ]}
      />
      <StatementOfDeviationsIntro />
      <GenericInvestorFilter />
      <GenericInvestorListing 
        items={statements} 
        sectionTitle="Periodic Archive"
        category="Statement of Deviation"
      />
      <StatementOfDeviationsNote />
      <StatementOfDeviationsCTA />
    </main>
  );
}
