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
    <section className="py-24 bg-silver/5 dark:bg-black/10 border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
           {specs.map((spec, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-charcoal p-10 group hover:bg-silver/5 transition-all duration-500"
              >
                 <div className="w-12 h-12 bg-silver/5 flex items-center justify-center rounded-sm border border-border group-hover:bg-gold group-hover:border-transparent transition-all mb-8">
                    <spec.icon className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors" />
                 </div>
                 <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    {spec.label}
                 </h4>
                 <p className="text-lg font-heading font-bold text-charcoal dark:text-white uppercase tracking-wider group-hover:text-gold transition-colors">
                    {spec.value}
                 </p>
                 
                 <div className="mt-8 flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">Verified Specification</span>
                 </div>
              </div>
           ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 text-center animate-in fade-in duration-1000 delay-500">
           <div className="flex items-center gap-4 text-muted-foreground/40">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">J Pan Tubular Components Limited Meritocracy Policy</span>
           </div>
           <div className="flex items-center gap-4 text-muted-foreground/40">
              <TrendingUp className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Internal Growth Priority</span>
           </div>
        </div>
      </div>
    </section>
  );
}
