"use client";

import React from "react";
import { Briefcase, ShieldCheck, Scale } from "lucide-react";

export function BoardMeetingIntro() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Institutional Accountability</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Cornerstones of <br />
              <span className="text-deepblue dark:text-gold">Executive Transparency</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              J Pan Tubular Components Limited's board meeting notices represent our commitment to 
              unwavering corporate governance. These official records detail the 
              strategic oversight and high-level decision-making processes that 
              guide our global industrial leadership and fiscal resilience.
            </p>
            
            <div className="flex items-center gap-10 mt-10">
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold text-charcoal dark:text-white">Q4</span>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Active Cycle</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold text-charcoal dark:text-white">100%</span>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Compliance</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-silver/5 dark:bg-white/2 border border-border rounded-sm group hover:border-gold transition-colors">
              <ShieldCheck className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-3">Statutory Adherence</h4>
              <p className="text-muted-foreground text-[10px] leading-relaxed">Rigid alignment with regional and international corporate governance mandates.</p>
            </div>
            <div className="p-8 bg-silver/5 dark:bg-white/2 border border-border rounded-sm group hover:border-gold transition-colors">
              <Scale className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-3">Fiduciary Duty</h4>
              <p className="text-muted-foreground text-[10px] leading-relaxed">Ensuring board decisions prioritize long-term value creation for stakeholders.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
