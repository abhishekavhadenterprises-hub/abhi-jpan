"use client";

import React from "react";
import { Scale, ShieldCheck, FileText } from "lucide-react";

export function AnnualReturnIntro() {
  return (
    <section className="py-20 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Legal Compliance</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Statutory Transparency & <br />
              <span className="text-deepblue dark:text-gold">Regulatory Accountability</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              The Annual Return is a fundamental statutory document that provides 
              a comprehensive overview of J Pan Tubular Components Limited's capital structure, 
              indebtedness, and management during the fiscal year. These filings 
              ensure our compliance with all applicable corporate laws and 
              regulatory frameworks.
            </p>
            
            <div className="flex items-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-charcoal dark:text-white">100%</div>
                <div className="text-[10px] font-bold text-gold uppercase tracking-widest">Compliance</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-charcoal dark:text-white">SEBI</div>
                <div className="text-[10px] font-bold text-gold uppercase tracking-widest">Regulated</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-charcoal dark:text-white">MCA</div>
                <div className="text-[10px] font-bold text-gold uppercase tracking-widest">Certified</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 bg-silver/5 dark:bg-white/2 border border-border rounded-sm flex items-start gap-5 group hover:border-gold transition-colors">
              <div className="w-12 h-12 bg-white dark:bg-charcoal border border-border flex items-center justify-center rounded-sm shrink-0 group-hover:bg-gold/10 transition-colors">
                <Scale className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-1">Corporate Mandate</h4>
                <p className="text-muted-foreground text-[10px] leading-relaxed">Mandatory filings as per the Companies Act and regional regulatory bodies.</p>
              </div>
            </div>
            <div className="p-6 bg-silver/5 dark:bg-white/2 border border-border rounded-sm flex items-start gap-5 group hover:border-gold transition-colors">
              <div className="w-12 h-12 bg-white dark:bg-charcoal border border-border flex items-center justify-center rounded-sm shrink-0 group-hover:bg-gold/10 transition-colors">
                <ShieldCheck className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-1">Verified Accuracy</h4>
                <p className="text-muted-foreground text-[10px] leading-relaxed">Full technical verification of capital and management data points.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
