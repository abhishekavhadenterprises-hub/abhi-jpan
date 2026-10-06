"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function BoardMeetingHero() {
  return (
    <PremiumHero 
      title="Board Meeting"
      subtitle="Notices"
      description="Official proclamations regarding J Pan Tubular Components Limited's executive board sessions, strategic agendas, and corporate oversight mandates."
      imageSrc="/images/about-hero.png"
      badgeText="Governance Hub"
    />
  );
}
