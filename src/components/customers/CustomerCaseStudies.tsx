"use client";

import React from "react";
import { ArrowRight, Activity, Zap, ShieldCheck } from "lucide-react";

const caseStudies = [
  {
    title: "Reducing Leakage in HVAC Manifolds",
    industry: "HVAC & R",
    problem: "High failure rate in field assemblies due to inconsistent brazing tolerances.",
    solution: "Implementation of precision CNC bending and automated brazing verification.",
    result: "99.9% Leak-Free reliability achieved across 500k+ units annually.",
    icon: Zap
  },
  {
    title: "Optimizing Fuel Line Durability",
    industry: "Automotive",
    problem: "Premature corrosion and vibration fatigue in commercial vehicle fuel systems.",
    solution: "Transition to high-grade steel with multi-layer surface treatment and precision flares.",
    result: "30% Increase in component lifecycle and 15% reduction in warranty claims.",
    icon: Activity
  },
  {
    title: "Standardizing Cooling Assemblies",
    industry: "Industrial Systems",
    problem: "Complex supply chain involving 5+ vendors for a single cooling sub-assembly.",
    solution: "Co-engineering a consolidated single-source assembly solution for global plants.",
    result: "25% Lead-time reduction and standardized quality reporting across 3 continents.",
    icon: ShieldCheck
  }
];

export function CustomerCaseStudies() {
  return (
    <section className="py-24 bg-silver/10 dark:bg-black/20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Technical Proof</span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-6">
            Engineering <span className="text-deepblue dark:text-gold">Outcomes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-world examples of how our precision components and technical 
            collaborations drive performance and efficiency for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="group bg-white dark:bg-charcoal border border-border rounded-sm overflow-hidden flex flex-col transition-all duration-500">
              {/* Header */}
              <div className="p-8 border-b border-border bg-silver/5 dark:bg-white/2">
                <div className="w-12 h-12 bg-deepblue/10 dark:bg-gold/10 flex items-center justify-center rounded-sm mb-6">
                  <cs.icon className="w-6 h-6 text-deepblue dark:text-gold" />
                </div>
                <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-2">{cs.title}</h3>
                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">{cs.industry}</span>
              </div>

              {/* Body */}
              <div className="p-8 flex-grow space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-charcoal/40 dark:text-white/20 uppercase tracking-widest block mb-2">The Problem</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.problem}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-charcoal/40 dark:text-white/20 uppercase tracking-widest block mb-2">The Solution</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
                </div>
              </div>

              {/* Result Footer */}
              <div className="p-8 bg-deepblue text-white group-hover:bg-gold group-hover:text-charcoal transition-colors duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-60">Impact Result</span>
                <p className="text-lg font-heading font-bold mb-4">{cs.result}</p>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  View Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
