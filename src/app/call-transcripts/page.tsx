"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { TranscriptIntro } from "@/components/investors/call-transcripts/TranscriptIntro";
import { TranscriptCTA } from "@/components/investors/call-transcripts/TranscriptCTA";

const transcripts = [
  {
    id: 1,
    title: "Earnings Call Transcript – Q3 FY25",
    date: "Jan 22, 2025",
    type: "Earnings Call",
    period: "Q3 FY 2024-25",
    status: "Verified"
  },
  {
    id: 2,
    title: "Investor Meet Transcript – Institutional Day",
    date: "Nov 15, 2024",
    type: "Investor Meet",
    period: "Q2 FY 2024-25",
    status: "Verified"
  },
  {
    id: 3,
    title: "Earnings Call Transcript – Q2 FY25",
    date: "Oct 28, 2024",
    type: "Earnings Call",
    period: "Q2 FY 2024-25",
    status: "Verified"
  },
  {
    id: 4,
    title: "Analyst Day Presentation Transcript",
    date: "Aug 10, 2024",
    type: "Analyst Day",
    period: "Q2 FY 2024-25",
    status: "Verified"
  },
  {
    id: 5,
    title: "Earnings Call Transcript – Q1 FY25",
    date: "Jul 25, 2024",
    type: "Earnings Call",
    period: "Q1 FY 2024-25",
    status: "Verified"
  },
  {
    id: 6,
    title: "Earnings Call Transcript – Q4 FY24",
    date: "May 15, 2024",
    type: "Earnings Call",
    period: "Q4 FY 2023-24",
    status: "Verified"
  }
];

export default function CallTranscriptsPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GenericInvestorHero 
        title="Call Transcripts" 
        subtitle="Verbatim transcripts of quarterly earnings conference calls with senior management."
        variant="editorial"
        image="/images/products_hero_bg.png"
      />
      <TranscriptIntro />
      <GenericInvestorFilter />
      <GenericInvestorListing 
        items={transcripts} 
        sectionTitle="Verbatim Archive"
        category="Transcript"
      />
      <TranscriptCTA />
    </main>
  );
}
