import React from "react";
import { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { ContactSupportInfo } from "@/components/contact/ContactSupportInfo";
import { ContactBlocks } from "@/components/contact/ContactBlocks";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/shared/ContactMap";
import { ContactCTA } from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Investor Contact | Shareholder Support | J Pan Tubular Components Limited",
  description: "Get in touch with J Pan Tubular Components Limited's Investor Relations team. Access direct communication channels for shareholding, dividends, and statutory disclosure queries.",
};

export default function InvestorContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactIntro />
      <ContactSupportInfo />
      <ContactBlocks />
      <ContactForm />
      <ContactMap />
      <ContactCTA />
    </main>
  );
}


