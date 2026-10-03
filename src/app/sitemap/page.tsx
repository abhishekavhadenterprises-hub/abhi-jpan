"use client";

import React from "react";
import Link from "next/link";
import { GenericInvestorHero } from "@/components/investors/shared/GenericInvestorComponents";
import { ChevronRight } from "lucide-react";

export default function SitemapPage() {
  const sections = [
    {
      title: "Corporate",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Products", href: "/products" },
        { name: "Quality Assurance", href: "/quality" },
        { name: "Industrial Solutions", href: "/industries" },
        { name: "Global Presence", href: "/presence" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Investor Relations",
      links: [
        { name: "Annual Reports", href: "/annual-reports" },
        { name: "Financial Results", href: "/financial-results" },
        { name: "Shareholding Pattern", href: "/shareholding-pattern" },
        { name: "Policies & Governance", href: "/policies" },
        { name: "Investor Contact", href: "/investor-contact" },
        { name: "Material Documents", href: "/material-documents-contracts" },
      ]
    },
    {
      title: "Media & Resources",
      links: [
        { name: "Press Releases", href: "/press-releases" },
        { name: "Events & Exhibitions", href: "/events" },
        { name: "Industrial Blog", href: "/blog" },
        { name: "Media Gallery", href: "/gallery" },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <GenericInvestorHero 
        title="Sitemap"
        subtitle="Complete directory of the J Pan Tubular Components Limited portal."
      />
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-xl font-bold text-charcoal dark:text-white uppercase tracking-widest border-b border-border pb-4">{section.title}</h2>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.href} className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors group">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
