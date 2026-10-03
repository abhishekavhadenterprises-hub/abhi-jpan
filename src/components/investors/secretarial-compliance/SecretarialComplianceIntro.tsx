"use client";

import React from "react";
import { Gavel, ShieldAlert, CheckCircle2 } from "lucide-react";

export function SecretarialComplianceIntro() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Governance Standards</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
               bedrock of <br />
              <span className="text-deepblue dark:text-gold">Regulatory Health</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              The Annual Secretarial Compliance Report is an independent 
              verification of J Pan Tubular Components Limited's adherence to all applicable 
              corporate laws and regulations. It serves as a definitive 
              testament to our commitment to ethical governance and 
              statutory precision.
            </p>
            
            <div className="flex flex-wrap gap-8 mt-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
                  <Gavel className="w-5 h-5 text-gold" />
                </div>
                <span className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Secretarial Audit</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
                  <ShieldAlert className="w-5 h-5 text-gold" />
                </div>
                <span className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">LODR Adherence</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="p-12 bg-silver/5 dark:bg-white/2 border border-border rounded-sm relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/blueprint.png')] bg-repeat" />
              <div className="relative z-10 space-y-10">
                <div className="flex gap-6">
                  <CheckCircle2 className="w-8 h-8 text-gold shrink-0" />
                  <div>
                    <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-2">Independent Verification</h4>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">Conducted by practicing Company Secretaries to ensure unbiased and high-fidelity regulatory reporting.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <CheckCircle2 className="w-8 h-8 text-gold shrink-0" />
                  <div>
                    <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-2">Statutory Precision</h4>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">Comprehensive review of Board meetings, shareholder interactions, and SEBI filing accuracy.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <CheckCircle2 className="w-8 h-8 text-gold shrink-0" />
                  <div>
                    <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-2">Governance Maturity</h4>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">Providing stakeholders with certified assurance of J Pan Tubular Components Limited's mature compliance framework.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Design accents */}
          </div>
        </div>
      </div>
    </section>
  );
}
