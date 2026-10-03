"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { PublicationIntro } from "@/components/investors/newspaper-publication/PublicationIntro";
import { PublicationCompliance } from "@/components/investors/newspaper-publication/PublicationCompliance";
import { PublicationCTA } from "@/components/investors/newspaper-publication/PublicationCTA";

const publications = [
  {
    id: 1,
    title: "Financial Results Notice – Q3 FY25",
    type: "Financial Express",
    date: "Jan 22, 2025",
    status: "English",
    period: "Q3 FY25"
  },
  {
    id: 2,
    title: "Financial Results Notice – Q3 FY25",
    type: "Jansatta",
    date: "Jan 22, 2025",
    status: "Hindi",
    period: "Q3 FY25"
  },
  {
    id: 3,
    title: "AGM Public Notice – 2024",
    type: "Economic Times",
    date: "Aug 15, 2024",
    status: "English",
    period: "FY 2024-25"
  },
  {
    id: 4,
    title: "AGM Public Notice – 2024",
    type: "Navbharat Times",
    date: "Aug 15, 2024",
    status: "Hindi",
    period: "FY 2024-25"
  },
  {
    id: 5,
    title: "Unclaimed Dividend Notice – 2024",
    type: "Financial Express",
    date: "Oct 10, 2024",
    status: "English",
    period: "FY 2024-25"
  },
  {
    id: 6,
    title: "Postal Ballot Notice – 2024",
    type: "Jansatta",
    date: "Jun 05, 2024",
    status: "Hindi",
    period: "FY 2024-25"
  }
];

export default function NewspaperPublicationPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GenericInvestorHero 
        title="Newspaper Publication" 
        subtitle="Statutory print media publications and financial notices in leading national dailies."
        variant="editorial"
        image="/images/industry-industrial.png"
      />
      <PublicationIntro />
      <GenericInvestorFilter />
      <GenericInvestorListing 
        items={publications} 
        sectionTitle="Public Notices"
        category="Publication"
      />
      <PublicationCompliance />
      <PublicationCTA />
    </main>
  );
}
