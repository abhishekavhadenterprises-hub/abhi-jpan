"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function UnclaimedHero() {
  return (
    <PremiumHero 
      title="Unclaimed &"
      subtitle="Unpaid Amounts"
      description="Ensuring the protection of your financial interests through transparent disclosure of outstanding dividends and unclaimed shares."
      imageSrc="/images/finance-secure.png"
      badgeText="Investor Entitlement"
    />
  );
}
