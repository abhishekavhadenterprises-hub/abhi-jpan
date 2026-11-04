import React from "react";
import { Metadata } from "next";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersOpenings } from "@/components/careers/CareersOpenings";
import { CareersCTA } from "@/components/careers/CareersCTA";

export const metadata: Metadata = {
  title: "Careers | Join J Pan Tubular Components Limited | Shape the Industrial Future",
  description: "Explore career opportunities at J Pan Tubular Components Limited. Build your professional legacy with a leader in precision manufacturing, innovation, and sustainable growth.",
};

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <CareersOpenings />
      <CareersCTA />
    </main>
  );
}
