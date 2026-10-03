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
    <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Institutional Perks</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight mb-8">
              Why Join <br />
              <span className="text-muted-foreground">The J Pan Tubular Components Limited Legacy?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We provide the infrastructure and inspiration required for 
              ambitious professionals to achieve their full potential.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {perks.map((perk, idx) => (
              <div 
                key={idx}
                className="group p-10 bg-silver/5 border border-border rounded-sm hover:border-gold transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                 <div className="w-14 h-14 bg-white dark:bg-charcoal flex items-center justify-center rounded-sm border border-border mb-8 group-hover:bg-gold group-hover:border-transparent transition-all">
                    <perk.icon className="w-6 h-6 text-gold group-hover:text-charcoal transition-colors" />
                 </div>
                 <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-4 group-hover:text-gold transition-colors">
                    {perk.title}
                 </h4>
                 <p className="text-[11px] text-muted-foreground leading-relaxed italic opacity-60 group-hover:opacity-100 transition-opacity">
                    "{perk.description}"
                 </p>
                 
                 <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                    <ShieldPlus className="w-4 h-4 text-gold/30" />
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Employee Benefit</span>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
