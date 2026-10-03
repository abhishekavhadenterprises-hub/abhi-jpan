import React from "react";
import { Metadata } from "next";
import { MaterialHero } from "@/components/investors/material-documents-contracts/MaterialHero";
import { MaterialIntro } from "@/components/investors/material-documents-contracts/MaterialIntro";
import { MaterialCompliance } from "@/components/investors/material-documents-contracts/MaterialCompliance";
import { MaterialHighlights } from "@/components/investors/material-documents-contracts/MaterialHighlights";
import { MaterialListing } from "@/components/investors/material-documents-contracts/MaterialListing";
import { MaterialCTA } from "@/components/investors/material-documents-contracts/MaterialCTA";

export const metadata: Metadata = {
  title: "Material Documents & Contracts | Statutory Disclosures | J Pan Tubular Components Limited",
  description: "Access J Pan Tubular Components Limited's authoritative repository of material documents, corporate agreements, and board-approved contracts. Maintained per SEBI LODR mandates.",
};

export default function MaterialDocumentsPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <MaterialHero />
      <MaterialIntro />
      <MaterialCompliance />
      <MaterialHighlights />
      <MaterialListing />
      <MaterialCTA />
    </main>
  );
}
