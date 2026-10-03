import React from "react";
import { Metadata } from "next";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { ContactSupportInfo } from "@/components/contact/ContactSupportInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/shared/ContactMap";
import { ContactCTA } from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us | J Pan Tubular Components Limited",
  description: "Get in touch with J Pan Tubular Components Limited for precision engineering solutions, manufacturing inquiries, and business partnerships.",
};

export default function ContactPage() {
  return (
    <main className="bg-white dark:bg-charcoal min-h-screen selection:bg-gold/30 selection:text-white">
      <ContactIntro 
        title="Direct Engagement"
        subtitle="Corporate Communication"
        description="We prioritize open and transparent dialogue with our stakeholders. Our specialized technical and corporate teams are positioned to address your inquiries regarding engineering solutions, institutional partnerships, and operational capabilities with uncompromising professional rigor."
      />
      
      <ContactSupportInfo />
      
      <ContactForm 
        title="Digital Inquiry"
        subtitle="Formal Submission"
        description="Initiate a dialogue with our dedicated teams. Please provide specific project parameters or contextual details to ensure a prompt, accurate, and authoritative technical response."
      />
      
      <ContactMap />
      
      <ContactCTA 
        title="Reach Out Desk"
        subtitle="Authorized Channels"
        description="Our designated representatives are available to assist with comprehensive technical specifications, institutional pricing structures, or strategic partnership opportunities."
      />
    </main>
  );
}
