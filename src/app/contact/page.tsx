import React from "react";
import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { ContactMap } from "@/components/shared/ContactMap";

export const metadata: Metadata = {
  title: "Contact Us | J Pan Tubular Components Limited",
  description: "Get in touch with J Pan Tubular Components Limited for precision engineering solutions, manufacturing inquiries, and business partnerships.",
};

export default function ContactPage() {
  return (
    <main className="bg-white dark:bg-charcoal min-h-screen selection:bg-gold/30 selection:text-white pt-20 sm:pt-24">
      <ContactForm 
        title="Digital Inquiry"
        subtitle="Formal Submission"
        description="Initiate a dialogue with our dedicated teams. Please provide specific project parameters or contextual details to ensure a prompt, accurate, and authoritative technical response."
      />
      
      <ContactCTA 
        title="Reach Out Desk"
        subtitle="Authorized Channels"
        description="Our designated representatives are available to assist with comprehensive technical specifications, institutional pricing structures, or strategic partnership opportunities."
      />

      {/* Interactive Global/Domestic Hubs Map Section */}
      <ContactMap />
    </main>
  );
}
