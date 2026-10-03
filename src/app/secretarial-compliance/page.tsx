"use client";

import React from "react";
import { GenericInvestorHero, GenericInvestorTable, GenericInvestorFilter } from "@/components/investors/shared/GenericInvestorComponents";

const data = [
  { id: 1, date: "2025-2026", particulars: "J Pan Tubular Components Limited - Secretarial Compliance Report", link: "/sample-report.pdf" },
];

export default function SecretarialCompliancePage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#050505]">
      <GenericInvestorHero 
        title="Secretarial Compliance Report"
        subtitle="Annual reports affirming adherence to secretarial standards and statutory regulations."
        image="/images/automotive_category_bg.png"
        variant="left"
      />
      
      <GenericInvestorFilter />
      <GenericInvestorTable data={data} />
    </main>
  );
}
