"use client";

import React from "react";
import { Heart, Globe, GraduationCap, Zap, TrendingUp, ShieldPlus } from "lucide-react";

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
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="h-0.5 w-8 sm:w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Institutional Perks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight mb-4 sm:mb-8">
              Why Join <br />
              <span className="text-muted-foreground">The J Pan Tubular Components Limited Legacy?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              We provide the infrastructure and inspiration required for 
              ambitious professionals to achieve their full potential.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
           {perks.map((perk, idx) => (
              <div 
                key={idx}
                className="group p-5 sm:p-7 md:p-8 lg:p-10 bg-silver/5 border border-border rounded-xl sm:rounded-2xl hover:border-gold transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-charcoal flex items-center justify-center rounded-lg sm:rounded-xl border border-border mb-6 sm:mb-8 group-hover:bg-gold group-hover:border-transparent transition-all">
                    <perk.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold group-hover:text-charcoal transition-colors" />
                 </div>
                 <h4 className="text-xs sm:text-sm font-bold text-charcoal dark:text-white uppercase tracking-wider sm:tracking-widest mb-2 sm:mb-4 group-hover:text-gold transition-colors">
                    {perk.title}
                 </h4>
                 <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed italic opacity-70 group-hover:opacity-100 transition-opacity">
                    &ldquo;{perk.description}&rdquo;
                 </p>
                 
                 <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border flex items-center gap-2 sm:gap-3">
                    <ShieldPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold/40" />
                    <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Employee Benefit</span>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
