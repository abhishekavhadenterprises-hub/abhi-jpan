"use client";

import React from "react";
import { GenericInvestorHero } from "@/components/investors/shared/GenericInvestorComponents";
import { Scale, FileSignature, AlertTriangle, Settings, Globe, Gavel, Mail } from "lucide-react";
import { motion } from "framer-motion";

const termsSections = [
  {
    id: "agreement",
    title: "1. Agreement to Terms",
    icon: FileSignature,
    content: (
      <>
        <p>
          These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and J Pan Tubular Components Limited ("we", "us", or "our"), concerning your access to and use of our corporate website and digital portals.
        </p>
        <p>
          By accessing the site, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, you are expressly prohibited from using the site and must discontinue use immediately.
        </p>
      </>
    )
  },
  {
    id: "intellectual-property",
    title: "2. Intellectual Property Rights",
    icon: Scale,
    content: (
      <>
        <p>
          Unless otherwise indicated, the site is our proprietary property. All source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us.
        </p>
        <p className="mt-4">
          The Content is provided on the site "AS IS" for your information and personal use only. Except as expressly provided, no part of the site or Content may be copied, reproduced, aggregated, republished, or distributed for any commercial enterprise without our express prior written permission.
        </p>
      </>
    )
  },
  {
    id: "prohibited",
    title: "3. Prohibited Activities",
    icon: AlertTriangle,
    content: (
      <>
        <p>
          You may not access or use the site for any purpose other than that for which we make the site available. The site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2">
          <li>Systematically retrieve data or other content from the site to create or compile a database or directory without written permission.</li>
          <li>Circumvent, disable, or otherwise interfere with security-related features of the site.</li>
          <li>Use the site in a manner inconsistent with any applicable laws or regulations.</li>
          <li>Upload or transmit viruses, Trojan horses, or other material that interferes with the uninterrupted use of the site.</li>
        </ul>
      </>
    )
  },
  {
    id: "modifications",
    title: "4. Modifications & Interruptions",
    icon: Settings,
    content: (
      <>
        <p>
          We reserve the right to change, modify, or remove the contents of the site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our site.
        </p>
        <p className="mt-4">
          We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the site. We cannot guarantee the site will be available at all times, as we may experience hardware, software, or other problems requiring maintenance.
        </p>
      </>
    )
  },
  {
    id: "governing-law",
    title: "5. Governing Law",
    icon: Gavel,
    content: (
      <>
        <p>
          These Terms shall be governed by and defined following the laws of India. J Pan Tubular Components Limited and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
        </p>
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
          In order to resolve a complaint regarding the site or to receive further information regarding use of the site, please contact us at:
        </p>
        <div className="mt-6 p-6 bg-silver/5 dark:bg-white/5 border border-border rounded-sm">
          <p className="font-bold text-charcoal dark:text-white mb-2">J Pan Tubular Components Limited Legal Department</p>
          <p className="text-sm text-charcoal/70 dark:text-silver/80 mb-1">Email: legal@jpantubular.com</p>
          <p className="text-sm text-charcoal/70 dark:text-silver/80">Phone: +91 123 456 7890</p>
        </div>
      </>
    )
  }
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-background pb-32">
      <GenericInvestorHero 
        title="Terms of Service"
        subtitle="The terms and conditions governing the use of our corporate services."
        image="/engineering_precision_facility_1778657209621.png"
      />
      
      <div className="container-custom mt-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Navigation */}
          <div className="lg:w-1/3 xl:w-1/4 hidden lg:block">
            <div className="sticky top-32 p-8 bg-silver/5 dark:bg-white/2 border border-border/50 rounded-sm">
              <h3 className="text-xs font-bold text-gold uppercase tracking-[0.3em] mb-8">Table of Contents</h3>
              <ul className="space-y-4">
                {termsSections.map((section) => (
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
                {termsSections.map((section, idx) => {
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
