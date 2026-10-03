"use client";

import React from "react";
import { AboutPresence } from "@/components/about/AboutPresence";

export default function PresencePage() {
  return (
    <main className="pt-24 bg-white dark:bg-background overflow-hidden min-h-screen">
      <AboutPresence />
    </main>
  );
}
