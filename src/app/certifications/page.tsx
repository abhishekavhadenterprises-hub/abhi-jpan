"use client";

import React from "react";
import { CertificationsHero } from "@/components/certifications/CertificationsHero";
import { CertificationsGrid } from "@/components/certifications/CertificationsGrid";

// HMR recompile trigger
export default function CertificationsPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <CertificationsHero />
      <CertificationsGrid />
    </main>
  );
}
