"use client";

import React from "react";
import { GenericInvestorHero } from "@/components/investors/shared/GenericInvestorComponents";
import { Shield, Lock, FileText, Database, Eye, Mail } from "lucide-react";
import { motion } from "framer-motion";

const privacySections = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: Shield,
    content: (
      <>
        <p>
          At J Pan Tubular Components Limited ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide while interacting with our digital platforms, corporate portal, and associated services.
        </p>
        <p>
          By accessing our services, you consent to the data practices described in this statement, which aligns with international data protection standards and local regulatory frameworks.
        </p>
      </>
    )
  },
  {
    id: "information-collection",
    title: "2. Information We Collect",
    icon: Database,
    content: (
      <>
        <p>
          We may collect personal data that can identify you directly or indirectly, including but not limited to:
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li><strong>Identity Data:</strong> Full name, title, corporate affiliation, and identification numbers required for statutory compliance.</li>
          <li><strong>Contact Data:</strong> Professional email addresses, phone numbers, and physical mailing addresses.</li>
          <li><strong>Technical Data:</strong> IP addresses, browser types, time zone settings, and operating systems utilized to access our portal.</li>
          <li><strong>Usage Data:</strong> Information on how you interact with our website, including pages visited and documents downloaded.</li>
        </ul>
      </>
    )
  },
  {
    id: "data-usage",
    title: "3. How We Use Your Data",
    icon: FileText,
    content: (
      <>
        <p>
          Your personal data is strictly utilized for legitimate corporate purposes, including:
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li>Facilitating investor communications and disseminating statutory reports.</li>
          <li>Processing claims, unpaid dividends, and corporate actions securely.</li>
          <li>Improving the functionality, security, and user experience of our digital portal.</li>
          <li>Complying with regulatory obligations mandated by the Securities and Exchange Board of India (SEBI) and other legal authorities.</li>
        </ul>
      </>
    )
  },
  {
    id: "security",
    title: "4. Data Security",
    icon: Lock,
    content: (
      <>
        <p>
          We have implemented institutional-grade security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Our digital infrastructure employs robust encryption protocols, secure server hosting, and stringent access controls limited to authorized personnel.
        </p>
        <p className="mt-4">
          While we strive to use commercially acceptable means to protect your personal data, we acknowledge that no method of transmission over the Internet is entirely infallible.
        </p>
      </>
    )
  },
  {
    id: "your-rights",
    title: "5. Your Privacy Rights",
    icon: Eye,
    content: (
      <>
        <p>
          Depending on your jurisdiction, you may have rights under data protection laws in relation to your personal data, including the right to:
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li>Request access to your personal data.</li>
          <li>Request correction of incomplete or inaccurate data we hold about you.</li>
          <li>Request erasure of your personal data where there is no good reason for us continuing to process it.</li>
          <li>Object to the processing of your personal data.</li>
        </ul>
      </>
    )
  },
  {
    id: "contact",
    title: "6. Contact Us",
    icon: Mail,
    content: (
      <>
        <p>
          If you have any questions about this Privacy Policy or our privacy practices, please contact our Grievance Redressal Officer at:
        </p>
        <div className="mt-6 p-6 bg-silver/5 dark:bg-white/5 border border-border rounded-sm">
          <p className="font-bold text-charcoal dark:text-white mb-2">J Pan Tubular Components Limited Corporate Compliance</p>
          <p className="text-sm text-charcoal/70 dark:text-silver/80 mb-1">Email: privacy@jpantubular.com</p>
          <p className="text-sm text-charcoal/70 dark:text-silver/80">Phone: +91 123 456 7890</p>
        </div>
      </>
    )
  }
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-background pb-32">
      <GenericInvestorHero 
        title="Privacy Policy"
        subtitle="Our institutional commitment to protecting your data and securing your privacy."
        image="/engineering_precision_facility_1778657209621.png"
      />
      
      <div className="container-custom mt-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Navigation */}
          <div className="lg:w-1/3 xl:w-1/4 hidden lg:block">
            <div className="sticky top-32 p-8 bg-silver/5 dark:bg-white/2 border border-border/50 rounded-sm">
              <h3 className="text-xs font-bold text-gold uppercase tracking-[0.3em] mb-8">Table of Contents</h3>
              <ul className="space-y-4">
                {privacySections.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`}
                      className="text-sm font-medium text-charcoal/70 dark:text-silver/70 hover:text-deepblue dark:hover:text-gold transition-colors block"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-gold prose-p:text-charcoal/80 dark:prose-p:text-silver/90 prose-li:text-charcoal/80 dark:prose-li:text-silver/90">
              
              <div className="mb-12">
                <p className="text-sm font-bold text-charcoal/50 dark:text-silver/50 uppercase tracking-widest mb-4">Last Updated: June 2026</p>
                <div className="h-px w-full bg-border" />
              </div>

              <div className="space-y-24">
                {privacySections.map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <motion.div 
                      key={section.id} 
                      id={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="scroll-mt-32"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-silver/10 dark:bg-white/5 border border-border rounded-full flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <h2 className="text-2xl md:text-3xl text-charcoal dark:text-white m-0">
                          {section.title}
                        </h2>
                      </div>
                      <div className="pl-16">
                        {section.content}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
