"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function AudioHero() {
  return (
    <PremiumHero 
      title="Call Audio"
      subtitle="Recordings"
      description="{/* Institutional Accents */} Investor Communications Call Audio Recordings Access an authoritative repository of earnings calls, analyst meets, and investor dialogues, preserving the acoustic integrity of our corporate narrative."
      imageSrc="/images/audio-abstract.png"
      badgeText="Investor Communications"
    />
  );
}
