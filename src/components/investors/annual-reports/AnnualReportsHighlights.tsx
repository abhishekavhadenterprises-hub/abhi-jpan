"use client";

import React from "react";
import { TrendingUp, Globe, Target, Zap } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Domestic Growth",
    value: "+18%",
    desc: "Market expansion in primary industrial corridors.",
    icon: TrendingUp
  },
  {
    id: 2,
    label: "Export Revenue",
    value: "$142M",
    desc: "Strategic penetration into EU and NA cooling markets.",
    icon: Globe
  },
  {
    id: 3,
    label: "Precision Output",
    value: "2.4M Units",
    desc: "High-tolerance copper assembly production volume.",
    icon: Target
  },
  {
    id: 4,
    label: "Energy Efficiency",
    value: "-22%",
    desc: "Reduction in manufacturing energy consumption.",
    icon: Zap
  }
];

export function AnnualReportsHighlights() {
  return (
    <section className="py-24 bg-charcoal text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/blueprint.png')] bg-repeat" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-20">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Featured Performance</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Fiscal Year 2024-25 <br />
              <span className="text-silver/40">Technical Milestone Snapshot</span>
            </h2>
          </div>
          
          <div className="flex-grow flex flex-col items-center lg:items-end text-center lg:text-right">
            <p className="text-silver/60 text-lg max-w-md leading-relaxed mb-8">
              A summary of our technical and operational resilience during the 
              most recent reporting cycle. Detailed data is available in the full publication.
            </p>
            <button className="px-10 py-4 bg-white text-charcoal font-bold text-[10px] uppercase tracking-[0.3em] rounded-sm transition-all btn-slide-gold group">
              Download Latest Summary
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="bg-white/5 border border-white/10 p-10 rounded-sm hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-sm mb-8">
                <stat.icon className="w-6 h-6 text-gold" />
              </div>
              <div className="mb-4">
                <p className="text-[10px] font-bold text-silver/40 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-4xl font-heading font-bold text-white mb-2">{stat.value}</h3>
              </div>
              <p className="text-xs text-silver/60 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
