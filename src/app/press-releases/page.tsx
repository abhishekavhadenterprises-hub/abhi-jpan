"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter, 
  GenericInvestorListing 
} from "@/components/investors/shared/GenericInvestorComponents";
import { Newspaper, Building2, Globe, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const pressReleases = [
  {
    id: 1,
    title: "J Pan Tubular Components Limited Announces Major Facility Expansion in Haryana",
    type: "Corporate Expansion",
    date: "Jan 15, 2025",
    status: "Verified Release",
    period: "Q3 FY25"
  },
  {
    id: 2,
    title: "J Pan Tubular Components Limited Leading the Shift to Sustainable HVAC Components",
    type: "Sustainability",
    date: "Dec 10, 2024",
    status: "Verified Release",
    period: "Q3 FY25"
  },
  {
    id: 3,
    title: "Precision Bending: How J Pan Tubular Redefining Component Standards",
    type: "Technical Innovation",
    date: "Oct 28, 2024",
    status: "Verified Release",
    period: "Q2 FY25"
  },
  {
    id: 4,
    title: "The Rise of Indian Engineering: A Case Study on J Pan Tubular",
    type: "Global Trade",
    date: "Aug 14, 2024",
    status: "Verified Release",
    period: "Q2 FY25"
  },
  {
    id: 5,
    title: "J Pan Tubular Receives Strategic OEM Excellence Award for Zero-Defect Delivery",
    type: "Quality Honor",
    date: "Jun 02, 2024",
    status: "Verified Release",
    period: "Q1 FY25"
  }
];

export default function PressReleasesPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GenericInvestorHero 
        title="Press Releases" 
        subtitle="Official Media Statements & Disclosures" 
        variant="left"
        image="/images/industrial_industry_bg.png"
      />
      
      {/* Featured Press Release Card */}
      <section className="py-12 md:py-16 bg-white dark:bg-black">
        <div className="container-custom">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-0.5 bg-[#2E5E99]" />
            <span className="text-[#2E5E99] font-bold uppercase tracking-[0.25em] text-xs">
              Featured Editorial Release
            </span>
          </div>

          <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] border border-[#7BA4D0]/35 p-8 md:p-12 lg:p-14 overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] overflow-visible">
                  J Pan Tubular Components Limited Announces Major Facility Expansion in Haryana
                </h2>
                <p className="text-[#0D2440]/75 dark:text-silver/80 text-base md:text-lg leading-relaxed">
                  We are excited to announce a 50,000 sq. ft. expansion of our main manufacturing facility, aimed at increasing production capacity for HVAC-R components by 40%. This strategic move aligns with our Industry 4.0 roadmap and green manufacturing commitments.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#0D2440]/60 dark:text-silver/60">
                  <span>Published: Jan 15, 2025</span>
                  <span>•</span>
                  <span>Category: Corporate Expansion</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  href="/contact"
                  className="px-7 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-semibold text-sm rounded-xl inline-flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 group/btn"
                >
                  <span>Media Inquiry</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <React.Suspense fallback={<div className="py-8 text-center text-xs text-[#0D2440]/60">Loading filter...</div>}>
        <GenericInvestorFilter />
      </React.Suspense>

      <GenericInvestorListing 
        items={pressReleases} 
        sectionTitle="Official Releases Archive"
        category="Press Releases"
      />
    </main>
  );
}
