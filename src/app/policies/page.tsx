import React from "react";
import { Metadata } from "next";
import { PoliciesHero } from "@/components/investors/policies/PoliciesHero";
import { PoliciesIntro } from "@/components/investors/policies/PoliciesIntro";
import { PoliciesFilter } from "@/components/investors/policies/PoliciesFilter";
import { PoliciesListing } from "@/components/investors/policies/PoliciesListing";
import { PoliciesHighlights } from "@/components/investors/policies/PoliciesHighlights";
import { PoliciesCTA } from "@/components/investors/policies/PoliciesCTA";

export const metadata: Metadata = {
  title: "Corporate Policies | Governance & Ethics | J Pan Tubular Components Limited",
  description: "Explore J Pan Tubular Components Limited's comprehensive corporate policies, governance framework, and ethical standards. Access our statutory and internal guidelines.",
};

export default function PoliciesPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <PoliciesHero />
      <PoliciesIntro />
      <PoliciesFilter />
      <PoliciesHighlights />
      <PoliciesListing />
      <PoliciesCTA />
    </main>
  );
}


