"use client";

import React from "react";
import { Users, ArrowRight, MessageSquare } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-silver/5 dark:bg-white/5 p-12 md:p-20 rounded-sm border border-border overflow-hidden relative">
          {/* Decorative Gradient */}
          
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Stay Connected</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Beyond the <span className="text-deepblue dark:text-gold">Archive</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our newsletters are just one way we share our industrial progress. 
              Connect with our technical team for deeper insights into how 
              J Pan Tubular Components Limited can optimize your supply chain and engineering projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-deepblue text-white px-8 py-4 font-bold text-sm uppercase tracking-widest rounded-sm flex items-center gap-3 transition-all btn-slide-gold group">
                Contact Technical Sales
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white dark:bg-charcoal border border-border hover:border-gold px-8 py-4 font-bold text-sm uppercase tracking-widest rounded-sm flex items-center gap-3 transition-all btn-slide-gold group">
                <MessageSquare className="w-4 h-4" />
                Inquiry Center
              </button>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <div className="bg-white dark:bg-charcoal p-8 rounded-sm border border-border transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold/20 flex items-center justify-center rounded-full">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal dark:text-white uppercase tracking-widest">Global Network</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">15+ Industrial Sectors</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "J Pan Tubular Components Limited's transparency through their technical updates has made them a trusted partner in our automotive assembly lines."
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="w-6 h-0.5 bg-gold" />
                <span className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Director, Tier-1 Automotive Group</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
