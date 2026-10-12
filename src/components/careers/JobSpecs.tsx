"use client";

import React from "react";
import { Briefcase, MapPin, Clock, Wallet, ShieldCheck, TrendingUp } from "lucide-react";

interface JobSpecsProps {
  job: {
    type: string;
    location: string;
    experience: string;
    salary?: string;
  };
}

export function JobSpecs({ job }: JobSpecsProps) {
  const specs = [
    { icon: Briefcase, label: "Employment Type", value: job.type },
    { icon: MapPin, label: "Primary Location", value: job.location },
    { icon: Clock, label: "Experience Required", value: job.experience },
    { icon: Wallet, label: "Compensation Package", value: job.salary || "Competitive / Institutional" }
  ];

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-silver/5 dark:bg-black/10 border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-px bg-transparent sm:bg-border border-0 sm:border sm:border-border rounded-xl sm:rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
           {specs.map((spec, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-charcoal p-5 sm:p-7 md:p-8 lg:p-10 border sm:border-0 border-border rounded-xl sm:rounded-none group hover:bg-silver/5 transition-all duration-500"
              >
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-silver/5 flex items-center justify-center rounded-lg border border-border group-hover:bg-gold group-hover:border-transparent transition-all mb-5 sm:mb-8">
                    <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold group-hover:text-charcoal transition-colors" />
                 </div>
                 <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 sm:mb-2">
                    {spec.label}
                 </h4>
                 <p className="text-base sm:text-lg font-heading font-bold text-charcoal dark:text-white uppercase tracking-wider group-hover:text-gold transition-colors break-words">
                    {spec.value}
                 </p>
                 
                 <div className="mt-5 sm:mt-8 flex items-center gap-2 sm:gap-3">
                    <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">Verified Specification</span>
                 </div>
              </div>
           ))}
        </div>

        <div className="mt-10 sm:mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 text-center animate-in fade-in duration-1000 delay-500">
           <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground/60">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">J Pan Tubular Components Limited Meritocracy Policy</span>
           </div>
           <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground/60">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">Internal Growth Priority</span>
           </div>
        </div>
      </div>
    </section>
  );
}
