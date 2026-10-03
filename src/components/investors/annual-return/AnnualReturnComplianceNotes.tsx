"use client";

import React from "react";
import { Gavel, ClipboardCheck, Info, ArrowRight } from "lucide-react";

const notes = [
  {
    id: 1,
    title: "MCA Filing Protocol",
    desc: "Annual returns are filed under Section 92 of the Companies Act, 2013 with the Registrar of Companies.",
    icon: Gavel
  },
  {
    id: 2,
    title: "Verification Standard",
    desc: "Every filing is certified by a practicing Company Secretary to ensure factual and technical compliance.",
    icon: ClipboardCheck
  },
  {
    id: 3,
    title: "Public Inspection",
    desc: "Stakeholders can inspect original filings through the MCA portal or by physical request at our registered office.",
    icon: Info
  }
];

export function AnnualReturnComplianceNotes() {
  return (
    <section className="py-24 bg-silver/5 dark:bg-black/10 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Authority Notes</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Regulatory <br />
              <span className="text-deepblue dark:text-gold">Framework</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              J Pan Tubular Components Limited adheres to the highest standards of statutory reporting. 
              Our annual returns are a transparent record of our corporate 
              structure and regulatory standing.
            </p>
            <button className="flex items-center gap-3 text-gold font-bold text-[10px] uppercase tracking-[0.2em] group">
              Compliance Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {notes.map((note) => (
              <div 
                key={note.id}
                className="bg-white dark:bg-charcoal border border-border p-8 rounded-sm hover:border-gold transition-all duration-300"
              >
                <div className="w-10 h-10 bg-silver/10 flex items-center justify-center rounded-sm mb-6">
                  <note.icon className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-3">
                  {note.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {note.desc}
                </p>
              </div>
            ))}
            
            {/* Action Card */}
            <div className="bg-charcoal p-8 rounded-sm text-white flex flex-col justify-between border border-white/5">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-2">Legal Support</h4>
                <h3 className="text-xl font-heading font-bold mb-4">Need Compliance Clarification?</h3>
                <p className="text-silver/50 text-xs leading-relaxed mb-8">
                  Connect with our statutory department for technical queries regarding our historical filings.
                </p>
              </div>
              <button className="w-full bg-white text-charcoal font-bold py-3 text-[10px] uppercase tracking-widest hover:bg-gold transition-all">
                Contact Compliance
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
