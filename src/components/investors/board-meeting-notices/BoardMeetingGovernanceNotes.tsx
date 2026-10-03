"use client";

import React from "react";
import { Gavel, Users, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const governancePoints = [
  {
    id: 1,
    title: "Board Composition",
    desc: "A diverse assembly of executive and non-executive directors ensuring independent oversight.",
    icon: Users
  },
  {
    id: 2,
    title: "Statutory Compliance",
    desc: "Full adherence to Section 173 of the Companies Act, 2013 regarding meeting frequency and protocols.",
    icon: Gavel
  },
  {
    id: 3,
    title: "Resolution Tracking",
    desc: "Systematic recording and verification of board resolutions through digital and physical registers.",
    icon: ShieldCheck
  }
];

export function BoardMeetingGovernanceNotes() {
  return (
    <section className="py-24 bg-silver/5 dark:bg-black/10 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Governance Insights</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Institutional <br />
              <span className="text-deepblue dark:text-gold">Compliance Standards</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              J Pan Tubular Components Limited's board operates under a rigid framework of transparency 
              and ethical conduct, ensuring that every strategic session is 
              documented and verified according to international standards.
            </p>
            <button className="flex items-center gap-3 text-gold font-bold text-[10px] uppercase tracking-[0.2em] group">
              View Governance Policy
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            {governancePoints.map((point) => (
              <div 
                key={point.id}
                className="bg-white dark:bg-charcoal border border-border p-8 rounded-sm hover:border-gold transition-all duration-300"
              >
                <div className="w-10 h-10 bg-silver/10 flex items-center justify-center rounded-sm mb-6">
                  <point.icon className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-3">
                  {point.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
            
            {/* Technical Snapshot Card */}
            <div className="md:col-span-3 bg-charcoal p-8 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 flex items-center justify-center rounded-sm">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">Filing Status</h4>
                  <p className="text-xl font-heading font-bold">Compliant With All ROC Mandates</p>
                </div>
              </div>
              <button className="relative z-10 px-8 py-4 bg-white text-charcoal font-bold text-[10px] uppercase tracking-widest transition-all btn-slide-gold group">
                Download Governance Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
