"use client";

import React from "react";
import { GenericInvestorHero, GenericInvestorTable, GenericInvestorFilter } from "@/components/investors/shared/GenericInvestorComponents";

const data = [
  { id: 1, date: "2025-2026", particulars: "J Pan Tubular Components Limited - Annual Return", link: "/documents/annual-return-2025-26.pdf" },
  { id: 2, date: "2024-2025", particulars: "J Pan Tubular Components Limited - Annual Return", link: "/documents/annual-return-2024-25.pdf" },
  { id: 3, date: "2023-2024", particulars: "J Pan Tubular Components Limited - Annual Return", link: "/documents/annual-return-2023-24.pdf" },
];

export default function AnnualReturnPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-background">
      <GenericInvestorHero 
        title="Annual Return"
        subtitle="Detailed statutory returns and corporate governance filings for fiscal periods."
        image="/images/home_hero_3d.jpg"
        variant="left"
      />
      
      <GenericInvestorFilter />
      <GenericInvestorTable data={data} />
    </main>
  );
}
