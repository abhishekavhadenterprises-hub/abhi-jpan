"use client";

import React from "react";
import { CheckCircle2, Target, Users, Zap } from "lucide-react";

interface JobResponsibilitiesProps {
  responsibilities: string[];
}

export function JobResponsibilities({ responsibilities }: JobResponsibilitiesProps) {
  return (
    <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="max-w-4xl animate-in fade-in slide-in-from-left duration-700">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-10 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Role Blueprint</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight mb-16">
            Key <br />
            <span className="text-muted-foreground">Responsibilities</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
            {responsibilities.map((item, idx) => (
              <div 
                key={idx}
                className="group flex gap-6 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mt-1.5 shrink-0">
                  <div className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-transparent transition-all">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold group-hover:text-charcoal transition-colors" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 p-12 bg-silver/5 border border-border rounded-sm animate-in fade-in duration-1000 delay-500">
             <div className="flex flex-col items-center text-center">
                <Target className="w-8 h-8 text-gold/30 mb-4" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Operational KPI</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <Users className="w-8 h-8 text-gold/30 mb-4" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Team Leadership</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <Zap className="w-8 h-8 text-gold/30 mb-4" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Technical Agility</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
