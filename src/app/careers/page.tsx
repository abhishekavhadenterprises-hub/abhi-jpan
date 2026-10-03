import React from "react";
import { Metadata } from "next";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersIntro } from "@/components/careers/CareersIntro";
import { CareersValues } from "@/components/careers/CareersValues";
import { CareersCulture } from "@/components/careers/CareersCulture";
import { CareersBenefits } from "@/components/careers/CareersBenefits";
import { CareersRoadmap } from "@/components/careers/CareersRoadmap";
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
      <CareersIntro />
      <CareersValues />
      <CareersCulture />
      <CareersBenefits />
      <CareersRoadmap />
      <CareersOpenings />
      <CareersCTA />
    </main>
  );
}


