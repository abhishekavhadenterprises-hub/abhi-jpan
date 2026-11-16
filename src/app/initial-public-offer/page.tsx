"use client";

import React from "react";
import { GenericInvestorHero, GenericInvestorTable, GenericInvestorFilter } from "@/components/investors/shared/GenericInvestorComponents";

const data = [
  {
    id: 1,
    date: "2026",
    particulars: "Draft Red Herring Prospectus (DRHP) - Initial Public Offering",
    link: "/documents/draft-red-herring-prospectus.pdf",
    category: "SEBI / Exchange Filing",
    status: "Statutory Filing",
    fileSize: "7.2 MB"
  },
  {
    id: 2,
    date: "2026",
    particulars: "Draft Abridged Prospectus - Key Information Summary",
    link: "/documents/draft-abridged-prospectus.pdf",
    category: "Public Issue Document",
    status: "Official Disclosure",
    fileSize: "340 KB"
  },
  {
    id: 3,
    date: "2026",
    particulars: "Public Announcement & Newspaper Advertisement",
    link: "/documents/public-announcement-advertisement.pdf",
    category: "Statutory Advertisement",
    status: "Published",
    fileSize: "12.0 MB"
  },
  {
    id: 4,
    date: "2026",
    particulars: "DRHP Audio-Visual (English)",
    link: "/videos/drhp-audio-visual-english.mp4",
    category: "Audio-Visual Presentation",
    status: "Official Media",
    fileSize: "1.13 GB"
  },
  {
    id: 5,
    date: "2026",
    particulars: "DRHP Audio-Visual (Hindi)",
    link: "/videos/drhp-audio-visual-hindi.mp4",
    category: "Audio-Visual Presentation",
    status: "Official Media",
    fileSize: "1.68 GB"
  }
];

export default function InitialPublicOfferPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-background">
      <GenericInvestorHero 
        title="Initial Public Offer"
        subtitle="Official statutory offer documents, Draft Red Herring Prospectus (DRHP), abridged prospectus, public advertisements, and audio-visual presentations for J Pan's Initial Public Offering."
        image="/images/home_hero_3d.jpg"
        parent="INVESTOR RELATIONS"
        badgeText="Public Issue Filings"
        variant="left"
      />
      
      <GenericInvestorFilter />
      <GenericInvestorTable data={data} />
    </main>
  );
}
