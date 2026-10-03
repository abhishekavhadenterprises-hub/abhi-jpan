import React from "react";
import { Metadata } from "next";
import { GrievanceHero } from "@/components/investors/investor-grievance/GrievanceHero";
import { GrievanceIntro } from "@/components/investors/investor-grievance/GrievanceIntro";
import { GrievanceSupport } from "@/components/investors/investor-grievance/GrievanceSupport";
import { GrievanceForm } from "@/components/investors/investor-grievance/GrievanceForm";
import { GrievanceRoadmap } from "@/components/investors/investor-grievance/GrievanceRoadmap";
import { GrievanceTracking } from "@/components/investors/investor-grievance/GrievanceTracking";
import { GrievanceCTA } from "@/components/investors/investor-grievance/GrievanceCTA";

export const metadata: Metadata = {
  title: "Investor Grievance | Support Hub | J Pan Tubular Components Limited",
  description: "Access J Pan Tubular Components Limited's institutional grievance redressal mechanism. Submit and track investor concerns with absolute transparency and commitment to fair resolution.",
};

export default function InvestorGrievancePage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GrievanceHero />
      <GrievanceIntro />
      <GrievanceSupport />
      <GrievanceForm />
      <GrievanceRoadmap />
      <GrievanceTracking />
      <GrievanceCTA />
    </main>
  );
}


