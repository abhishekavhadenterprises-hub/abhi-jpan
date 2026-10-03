"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { ShareholdingIntro } from "@/components/investors/shareholding-pattern/ShareholdingIntro";
import { ShareholdingSummary } from "@/components/investors/shareholding-pattern/ShareholdingSummary";
import { ShareholdingNote } from "@/components/investors/shareholding-pattern/ShareholdingNote";
import { ShareholdingCTA } from "@/components/investors/shareholding-pattern/ShareholdingCTA";

const reports = [
  {
    id: 1,
    title: "Shareholding Pattern – Q3 2025",
    period: "Q3 FY 2024-25",
    date: "Jan 15, 2025",
    status: "Latest",
    type: "Quarterly Filing"
  },
  {
    id: 2,
    title: "Shareholding Pattern – Q2 2025",
    period: "Q2 FY 2024-25",
    date: "Oct 18, 2024",
    status: "Audited",
    type: "Quarterly Filing"
  },
  {
    id: 3,
    title: "Shareholding Pattern – Q1 2025",
    period: "Q1 FY 2024-25",
    date: "Jul 21, 2024",
    status: "Audited",
    type: "Quarterly Filing"
  },
  {
    id: 4,
    title: "Shareholding Pattern – Q4 2024",
    period: "Q4 FY 2023-24",
    date: "Apr 25, 2024",
    status: "Annual",
    type: "Annual Filing"
  },
  {
    id: 5,
    title: "Shareholding Pattern – Q3 2024",
    period: "Q3 FY 2023-24",
    date: "Jan 20, 2024",
    status: "Audited",
    type: "Quarterly Filing"
  },
  {
    id: 6,
    title: "Shareholding Pattern – Q2 2024",
    period: "Q2 FY 2023-24",
    date: "Oct 22, 2023",
    status: "Audited",
    type: "Quarterly Filing"
  }
];

export default function ShareholdingPatternPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GenericInvestorHero 
        title="Shareholding Pattern" 
        subtitle="Quarterly capital ownership disclosures and promoter holding distributions."
        variant="left"
        image="/images/hero-bg.png"
      />
      <ShareholdingIntro />
      <ShareholdingSummary />
      <GenericInvestorFilter />
      <GenericInvestorListing 
        items={reports} 
        sectionTitle="Filing Archive"
        category="Shareholding Pattern"
      />
      <ShareholdingNote />
      <ShareholdingCTA />
    </main>
  );
}
