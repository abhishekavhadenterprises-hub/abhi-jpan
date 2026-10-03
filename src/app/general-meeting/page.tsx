"use client";

import React from "react";
import { GenericInvestorHero, GenericInvestorTable, GenericInvestorFilter } from "@/components/investors/shared/GenericInvestorComponents";

const data = [
  { id: 1, date: "2024-2025", particulars: "General Meeting Notices", link: "/sample-report.pdf" },
  { id: 2, date: "2023-2024", particulars: "General Meeting Notices", link: "/sample-report.pdf" },
  { id: 3, date: "2022-2023", particulars: "General Meeting Notices", link: "/sample-report.pdf" },
  { id: 4, date: "2021-2022", particulars: "General Meeting Notices", link: "/sample-report.pdf" },
  { id: 5, date: "2020-2021", particulars: "General Meeting Notices", link: "/sample-report.pdf" },
  { id: 6, date: "2019-2020", particulars: "General Meeting Notices", link: "/sample-report.pdf" },
];

export default function GeneralMeetingPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#050505]">
      <GenericInvestorHero 
        title="General Meeting Notices"
        subtitle="Access notices, agendas, and resolutions for Annual and Extraordinary General Meetings."
        image="/images/about-snapshot.png"
        variant="left"
      />
      
      <GenericInvestorFilter />
      <GenericInvestorTable data={data} />
    </main>
  );
}
