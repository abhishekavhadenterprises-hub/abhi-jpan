"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function GeneralMeetingHero() {
  return (
    <PremiumHero 
      title="General Meeting"
      subtitle="Notices"
      description="Official communications and statutory notices regarding J Pan Tubular Components Limited's Annual and Extraordinary General Meetings."
      imageSrc="/images/about-hero.png"
      badgeText="Shareholder Hub"
    />
  );
}
