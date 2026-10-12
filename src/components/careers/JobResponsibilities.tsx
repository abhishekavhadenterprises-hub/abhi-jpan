"use client";

import React from "react";
import { CheckCircle2, Target, Users, Zap } from "lucide-react";

interface JobResponsibilitiesProps {
  responsibilities: string[];
}

export function JobResponsibilities({ responsibilities }: JobResponsibilitiesProps) {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="max-w-4xl animate-in fade-in slide-in-from-left duration-700">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="h-0.5 w-8 sm:w-10 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Role Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight mb-8 sm:mb-14 md:mb-16">
            Key <br />
            <span className="text-muted-foreground">Responsibilities</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 xl:gap-x-20 gap-y-6 sm:gap-y-10">
            {responsibilities.map((item, idx) => (
              <div 
                key={idx}
                className="group flex gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mt-1 shrink-0">
                  <div className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-transparent transition-all">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold group-hover:text-charcoal transition-colors" />
                  </div>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 p-6 sm:p-8 md:p-12 bg-silver/5 border border-border rounded-xl sm:rounded-2xl animate-in fade-in duration-1000 delay-500">
             <div className="flex flex-col items-center text-center">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-gold/40 mb-3 sm:mb-4" />
                <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Operational KPI</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gold/40 mb-3 sm:mb-4" />
                <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Team Leadership</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-gold/40 mb-3 sm:mb-4" />
                <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Technical Agility</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
