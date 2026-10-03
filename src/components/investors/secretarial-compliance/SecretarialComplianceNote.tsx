"use client";

import React from "react";
import { ShieldCheck, Scale, FileText, CheckCircle2, History, ScrollText } from "lucide-react";

export function SecretarialComplianceNote() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal border-t border-border overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Technical Disclosure</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-8 leading-tight">
              Institutional <br />
              <span className="text-deepblue dark:text-gold">Audit Practices</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              J Pan Tubular Components Limited's secretarial compliance framework is built on a 
              foundation of rigorous self-regulation and periodic 
              independent audits. We ensure that every statutory obligation 
              under the Companies Act and SEBI (LODR) is documented and 
              verified with absolute precision.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-silver/5 border border-border rounded-sm group hover:border-gold transition-colors">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Certified Governance Cycle</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-silver/5 border border-border rounded-sm group hover:border-gold transition-colors">
                <History className="w-5 h-5 text-gold" />
                <span className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Comprehensive Statutory Audit Loop</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            {/* Technical Grid Accent */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-10 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group">
                <Scale className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-4">Statutory Adherence</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Strict alignment with the Companies Act, 2013, ensuring all secretarial standards are met with zero deviations.
                </p>
              </div>
              <div className="p-10 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group translate-y-8">
                <ScrollText className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-4">LODR Framework</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Full compliance with SEBI (Listing Obligations and Disclosure Requirements) to maintain market integrity.
                </p>
              </div>
              <div className="p-10 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group">
                <FileText className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-4">Independent Audit</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Regular independent secretarial audits conducted by practicing professionals to ensure high-fidelity reporting.
                </p>
              </div>
              <div className="p-10 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group translate-y-8">
                <ShieldCheck className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-4">Stakeholder Assurance</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Providing verified evidence of governance maturity to institutional investors and regulatory bodies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
