"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function TranscriptHero() {
  return (
    <PremiumHero 
      title="Call"
      subtitle="Transcripts"
      description="The definitive written record of our investor dialogues, preserving every strategic insight and board-level response with absolute documentary precision."
      imageSrc="/images/transcript-abstract.png"
      badgeText="Written Disclosures"
    />
  );
}
