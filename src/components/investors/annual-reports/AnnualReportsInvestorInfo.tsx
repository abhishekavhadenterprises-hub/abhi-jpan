"use client";

import React from "react";
import { Info, ShieldAlert, Scale, ExternalLink, ArrowRight } from "lucide-react";

const disclosures = [
  {
    id: 1,
    title: "Audit Methodology",
    desc: "Details on our independent auditing partners and the standards followed for annual verification.",
    icon: Scale
  },
  {
    id: 2,
    title: "Reporting Standards",
    desc: "Compliance with IFRS and local regulatory requirements for industrial financial reporting.",
    icon: ShieldAlert
  },
  {
    id: 3,
    title: "Forward-Looking Notes",
    desc: "Essential legal disclosures regarding future projections and strategic market expectations.",
    icon: Info
  }
];

export function AnnualReportsInvestorInfo() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Technical Notes</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Procedural <br />
              <span className="text-deepblue dark:text-gold">Disclosures</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Every annual report published by J Pan Tubular Components Limited undergoes rigorous 
              internal and external audits to ensure absolute data accuracy and 
              regulatory compliance.
            </p>
            <button className="flex items-center gap-3 text-gold font-bold text-[10px] uppercase tracking-[0.2em] group">
              View Compliance Framework
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {disclosures.map((item) => (
              <div 
                key={item.id}
                className="bg-silver/5 dark:bg-white/2 border border-border p-8 rounded-sm hover:bg-white dark:hover:bg-charcoal hover:border-gold transition-all duration-300"
              >
                <div className="w-10 h-10 bg-silver/10 flex items-center justify-center rounded-sm mb-6">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-3">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {item.desc}
                </p>
                <button className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground hover:text-gold transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  Technical Document
                </button>
              </div>
            ))}
            
            {/* Contact Card */}
            <div className="bg-deepblue p-8 rounded-sm text-white flex flex-col justify-between">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Inquiry Center</h4>
              <p className="text-silver/60 text-xs leading-relaxed mb-8">
                For detailed queries regarding historical performance or specific audit notes, 
                connect with our Compliance Officer.
              </p>
              <button className="w-full bg-gold text-charcoal font-bold py-3 text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
