"use client";

import React from "react";
import { Handshake, Repeat, Globe, Clock } from "lucide-react";

const stats = [
  { label: "Years of Collaboration", value: "28+", icon: Clock },
  { label: "Repeat Client Rate", value: "95%", icon: Repeat },
  { label: "Global Locations Served", value: "15+", icon: Globe },
  { label: "Successful Projects", value: "2000+", icon: Handshake },
];

export function CustomerPartnershipStats() {
  return (
    <section className="py-24 bg-charcoal text-white overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 flex items-center justify-center rounded-sm mb-8 group-hover:bg-gold transition-all duration-500">
                <stat.icon className="w-8 h-8 text-gold group-hover:text-charcoal transition-colors" />
              </div>
              <div className="text-5xl font-heading font-bold mb-4 tracking-tight group-hover:text-gold transition-colors">
                {stat.value}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-silver/40 group-hover:text-silver/80 transition-colors">
                {stat.label}
              </p>
              
              {/* Subtle Progress Underline */}
              <div className="mt-8 w-12 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gold animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Statement */}
        <div className="mt-24 text-center">
          <p className="text-silver/50 italic text-lg max-w-2xl mx-auto">
            "Trust is built on consistency. Our decades-long relationships 
            with industry leaders are the true measure of our engineering success."
          </p>
        </div>
      </div>
    </section>
  );
}
