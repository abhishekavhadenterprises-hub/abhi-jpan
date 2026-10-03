"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { InvestorMeetIntro } from "@/components/investors/investor-meet-intimation/InvestorMeetIntro";
import { InvestorMeetCommunicationNotes } from "@/components/investors/investor-meet-intimation/InvestorMeetCommunicationNotes";
import { InvestorMeetCTA } from "@/components/investors/investor-meet-intimation/InvestorMeetCTA";

const interactions = [
  {
    id: 1,
    type: "Earnings Call",
    title: "Q3 FY 2024-25 Earnings Conference Call",
    period: "Q3 FY 2024-25",
    date: "Jan 18, 2025",
    status: "Verified"
  },
  {
    id: 2,
    type: "Conference",
    title: "Global Industrial Leaders Summit 2024",
    period: "FY 2024-25",
    date: "Nov 12, 2024",
    status: "Verified"
  },
  {
    id: 3,
    type: "Analyst Meet",
    title: "Annual Institutional Analyst Meet 2024",
    period: "FY 2024-25",
    date: "Sept 25, 2024",
    status: "Verified"
  },
  {
    id: 4,
    type: "Earnings Call",
    title: "Q2 FY 2024-25 Earnings Conference Call",
    period: "Q2 FY 2024-25",
    date: "Oct 28, 2024",
    status: "Verified"
  }
];

export default function InvestorMeetIntimationPage() {
  return (
    <main className="overflow-hidden">
      <GenericInvestorHero 
        title="Investor Meet Intimation" 
        subtitle="Schedules and disclosures for institutional investor meetings and analyst conferences."
        variant="editorial"
        image="/images/appliances_industry_bg.png"
      />

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
        <InvestorMeetIntro />
      </div>

      <GenericInvestorFilter />

      <GenericInvestorListing 
        items={interactions}
        sectionTitle="Interaction Records"
        category="Intimation"
      />

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
        <InvestorMeetCommunicationNotes />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both">
        <InvestorMeetCTA />
      </div>
    </main>
  );
}
