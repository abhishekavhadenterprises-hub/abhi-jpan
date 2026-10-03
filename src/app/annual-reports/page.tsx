"use client";

import React from "react";
import { AnnualReportsHero } from "@/components/investors/annual-reports/AnnualReportsHero";
import { AnnualReportsGrid } from "@/components/investors/annual-reports/AnnualReportsGrid";
import { AnnualReportsFilter } from "@/components/investors/annual-reports/AnnualReportsFilter";

export default function AnnualReportsPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-background">
      <AnnualReportsHero />
      
      {/* Search & Filter - Wrapped in Suspense for Next.js build compatibility with useSearchParams */}
      <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading filter...</div>}>
        <AnnualReportsFilter />
      </React.Suspense>

      <AnnualReportsGrid />
    </main>
  );
}
