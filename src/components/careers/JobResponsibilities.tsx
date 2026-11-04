"use client";

import React from "react";
import { CheckCircle2, Target, Users, Zap } from "lucide-react";

interface JobResponsibilitiesProps {
  responsibilities: string[];
}

export function JobResponsibilities({ responsibilities }: JobResponsibilitiesProps) {
  return (
    <section className="py-6 sm:py-8 md:py-10 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="max-w-4xl animate-in fade-in slide-in-from-left duration-700">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="h-0.5 w-6 sm:w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Role Blueprint</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-charcoal dark:text-white leading-tight mb-4 sm:mb-6">
            Key <span className="text-muted-foreground">Responsibilities</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-2.5 sm:gap-y-3">
            {responsibilities.map((item, idx) => (
              <div 
                key={idx}
                className="group flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="mt-0.5 shrink-0">
                  <div className="w-5 h-5 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-transparent transition-all">
                    <CheckCircle2 className="w-3 h-3 text-gold group-hover:text-charcoal transition-colors" />
                  </div>
                </div>
                <p className="text-muted-foreground text-xs sm:text-[13px] leading-snug group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-silver/5 border border-border rounded-xl animate-in fade-in duration-700 delay-300">
             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                <span className="text-[9px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Operational KPI</span>
             </div>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left border-x border-border/60">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                <span className="text-[9px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Team Leadership</span>
             </div>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                <span className="text-[9px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Technical Agility</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
