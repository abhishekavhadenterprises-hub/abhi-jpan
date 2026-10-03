"use client";

import React from "react";
import { BookOpen, Award, FileCheck } from "lucide-react";

export function AnnualReportsIntro() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Governance & Vision</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              A Legacy of <br />
              <span className="text-deepblue dark:text-gold">Measurable Success</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our annual reports represent more than just financial data; they are a 
              testament to J Pan Tubular Components Limited's evolution in the precision engineering 
              landscape. Each volume captures our commitment to innovation, 
              sustainability, and absolute transparency with our stakeholders.
            </p>
            
            <div className="flex flex-col gap-6 mt-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-silver/10 flex items-center justify-center rounded-sm shrink-0">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-sm mb-1">Strategic Milestones</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">Tracking our expansion into global automotive and HVAC sectors.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-silver/10 flex items-center justify-center rounded-sm shrink-0">
                  <FileCheck className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-sm mb-1">Audited Disclosures</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">Rigorous financial verification by leading global institutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-square bg-silver/5 dark:bg-white/2 border border-border rounded-sm flex items-center justify-center p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 text-center">
                <BookOpen className="w-20 h-20 text-gold/30 mx-auto mb-8" />
                <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-4">Investor Repository</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-8">
                  Browse through our chronological list of performance summaries 
                  to understand J Pan Tubular Components Limited's growth trajectory and industrial leadership.
                </p>
                <div className="inline-flex items-center gap-4 px-6 py-3 border border-gold/30 rounded-full text-[10px] font-bold text-gold uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Now Showing: FY 2024-25
                </div>
              </div>
            </div>
            {/* Decorative Corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/20" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
