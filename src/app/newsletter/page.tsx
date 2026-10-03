"use client";

import React from "react";
import { NewsletterHero } from "@/components/newsletter/NewsletterHero";
import { NewsletterIntro } from "@/components/newsletter/NewsletterIntro";
import { NewsletterGrid } from "@/components/newsletter/NewsletterGrid";
import { NewsletterFilter } from "@/components/newsletter/NewsletterFilter";
import { NewsletterSubscribe } from "@/components/newsletter/NewsletterSubscribe";

import { NewsletterCTA } from "@/components/newsletter/NewsletterCTA";

export default function NewsletterPage() {
  return (
    <main className="overflow-hidden">
      <div className="animate-in fade-in duration-1000">
        <NewsletterHero />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
        <NewsletterIntro />
      </div>

      <NewsletterFilter />

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
        <NewsletterGrid />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both">
        <NewsletterSubscribe />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
        <NewsletterCTA />
      </div>
      
      {/* Phase 3 Detail View will be integrated here in future */}
    </main>
  );
}
