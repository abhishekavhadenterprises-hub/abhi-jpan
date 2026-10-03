"use client";

import React from "react";
import { 
  GenericInvestorHero, 
  GenericInvestorFilter 
} from "@/components/investors/shared/GenericInvestorComponents";
import { UnclaimedIntro } from "@/components/investors/unclaimed-unpaid/UnclaimedIntro";
import { UnclaimedTable } from "@/components/investors/unclaimed-unpaid/UnclaimedTable";
import { UnclaimedRecovery } from "@/components/investors/unclaimed-unpaid/UnclaimedRecovery";
import { UnclaimedCompliance } from "@/components/investors/unclaimed-unpaid/UnclaimedCompliance";
import { UnclaimedCTA } from "@/components/investors/unclaimed-unpaid/UnclaimedCTA";

export default function UnclaimedUnpaidPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <GenericInvestorHero 
        title="Unclaimed & Unpaid Amounts" 
        variant="ledger"
        image="/images/industry-appliances.png"
      />
      <UnclaimedIntro />
      <GenericInvestorFilter />
      <UnclaimedTable />
      <UnclaimedRecovery />
      <UnclaimedCompliance />
      <UnclaimedCTA />
    </main>
  );
}
