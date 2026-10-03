import React from "react";
import { Metadata } from "next";
import { RatingHero } from "@/components/investors/credit-rating/RatingHero";
import { RatingIntro } from "@/components/investors/credit-rating/RatingIntro";
import { RatingStability } from "@/components/investors/credit-rating/RatingStability";
import { RatingAlpha } from "@/components/investors/credit-rating/RatingAlpha";
import { RatingArchive } from "@/components/investors/credit-rating/RatingArchive";
import { RatingAgencies } from "@/components/investors/credit-rating/RatingAgencies";
import { RatingCTA } from "@/components/investors/credit-rating/RatingCTA";
import { GenericInvestorFilter } from "@/components/investors/shared/GenericInvestorComponents";

export const metadata: Metadata = {
  title: "Credit Rating | Financial Strength | J Pan Tubular Components Limited",
  description: "Explore J Pan Tubular Components Limited's creditworthiness and financial stability. Access independent credit rating evaluations and historical performance data.",
};

export default function CreditRatingPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <RatingHero />
      <RatingIntro />
      <RatingStability />
      <RatingAlpha />
      <GenericInvestorFilter />
      <RatingArchive />
      <RatingAgencies />
      <RatingCTA />
    </main>
  );
}
