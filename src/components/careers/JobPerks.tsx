"use client";

import React from "react";
import { Heart, Globe, GraduationCap, TrendingUp, ShieldPlus } from "lucide-react";

export function JobPerks() {
  const perks = [
    {
      icon: Heart,
      title: "Wellness Ecosystem",
      description: "Comprehensive medical coverage and wellness initiatives."
    },
    {
      icon: GraduationCap,
      title: "L&D Subsidies",
      description: "Financial support for advanced certifications and training."
    },
    {
      icon: TrendingUp,
      title: "Career Trajectory",
      description: "Structured internal promotion pathways and merit-based growth."
    },
    {
      icon: Globe,
      title: "Global Exposure",
      description: "Opportunities to collaborate with international industrial partners."
    }
  ];

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-8 gap-4 sm:gap-6">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="h-0.5 w-6 sm:w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Institutional Perks</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-charcoal dark:text-white leading-tight mb-2 sm:mb-3">
              Why Join <span className="text-gold dark:text-gold">J Pan Tubular</span>?
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
              We provide the infrastructure and inspiration required for ambitious professionals to achieve their full potential.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
           {perks.map((perk, idx) => (
              <div 
                key={idx}
                className="group p-4 sm:p-5 bg-silver/5 border border-border rounded-xl sm:rounded-2xl hover:border-gold transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                 <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-charcoal flex items-center justify-center rounded-lg sm:rounded-xl border border-border mb-3 sm:mb-4 group-hover:bg-gold group-hover:border-transparent transition-all">
                    <perk.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold group-hover:text-charcoal transition-colors" />
                 </div>
                 <h4 className="text-xs sm:text-sm font-bold text-charcoal dark:text-white uppercase tracking-wider mb-1.5 group-hover:text-gold transition-colors">
                    {perk.title}
                 </h4>
                 <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                    &ldquo;{perk.description}&rdquo;
                 </p>
                 
                 <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border flex items-center gap-2">
                    <ShieldPlus className="w-3.5 h-3.5 text-gold/50" />
                    <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Employee Benefit</span>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
