"use client";

import React from "react";
import { Mail, ArrowRight } from "lucide-react";

export function NewsletterIntro() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Our Commitment to Transparency</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Exploring Our <span className="text-deepblue dark:text-gold">Monthly Insights</span> & Progress
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Every edition of "The Precision Edge" is curated to bring our partners 
              and stakeholders into the heart of J Pan Tubular Components Limited. From deep-dives into 
              automated brazing techniques to quarterly sustainability reports, 
              we ensure our journey is shared with precision and transparency.
            </p>
            <div className="flex flex-wrap gap-12">
              <div>
                <span className="block text-3xl font-bold text-charcoal dark:text-white mb-1">24+</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Editions Released</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-charcoal dark:text-white mb-1">5k+</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Active Readers</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-charcoal dark:text-white mb-1">100%</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Transparency</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 w-full">
            <div className="bg-silver/5 dark:bg-white/2 border border-border p-10 rounded-sm">
              <div className="w-12 h-12 bg-gold flex items-center justify-center rounded-full mb-6">
                <Mail className="w-6 h-6 text-charcoal" />
              </div>
              <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-4">Join the Hub</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Receive future editions of "The Precision Edge" directly in your professional inbox.
              </p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Professional Email"
                  className="w-full bg-white dark:bg-charcoal border border-border rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold transition-colors"
                />
                <button className="w-full bg-deepblue hover:bg-gold text-white hover:text-charcoal font-bold py-3 rounded-sm flex items-center justify-center gap-2 transition-all">
                  Subscribe Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
