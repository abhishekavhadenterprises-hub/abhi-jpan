"use client";

import React from "react";
import { GenericInvestorHero, GenericInvestorTable, GenericInvestorFilter } from "@/components/investors/shared/GenericInvestorComponents";

const data = [
  {
    id: 1,
    date: "July 2026",
    particulars: "CA Certificate on Outstanding Dues to Material Creditors & MSME Enterprises",
    link: "/documents/material-creditors-ca-certificate.pdf",
    category: "Statutory Certificate",
    status: "Chartered Accountant Verified",
    fileSize: "4.6 MB"
  }
];

export default function MaterialCreditorsPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-background">
      <GenericInvestorHero 
        title="Material Creditors"
        subtitle="Statutory disclosures and Chartered Accountant certificate regarding outstanding dues to material creditors and MSME enterprises."
        image="/images/home_hero_3d.jpg"
        parent="INVESTOR RELATIONS"
        badgeText="Statutory Disclosures"
        variant="left"
      />
      
      <GenericInvestorFilter />
      <GenericInvestorTable data={data} />
    </main>
  );
}
