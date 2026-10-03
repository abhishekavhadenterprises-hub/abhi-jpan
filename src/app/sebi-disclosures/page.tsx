"use client";

import React from "react";
import { SEBIDisclosureHero } from "@/components/investors/sebi-disclosures/SEBIDisclosureHero";
import { SEBIDisclosureIntro } from "@/components/investors/sebi-disclosures/SEBIDisclosureIntro";
import { SEBIDisclosureListing } from "@/components/investors/sebi-disclosures/SEBIDisclosureListing";
import { SEBIDisclosureFilter } from "@/components/investors/sebi-disclosures/SEBIDisclosureFilter";
import { SEBIDisclosureComplianceStatement } from "@/components/investors/sebi-disclosures/SEBIDisclosureComplianceStatement";
import { SEBIDisclosureCTA } from "@/components/investors/sebi-disclosures/SEBIDisclosureCTA";

export default function SEBIDisclosuresPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <SEBIDisclosureHero />
      <SEBIDisclosureIntro />
      <SEBIDisclosureFilter />
      <SEBIDisclosureListing />
      <SEBIDisclosureComplianceStatement />
      <SEBIDisclosureCTA />
    </main>
  );
}
