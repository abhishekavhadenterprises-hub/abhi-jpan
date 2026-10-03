"use client";

import React from "react";
import { Thermometer, Car, Home, Factory } from "lucide-react";

const sectors = [
  {
    title: "HVAC & R",
    desc: "Supplying critical heat exchange and oil cooling parts for commercial and residential units.",
    icon: Thermometer,
    count: "40% of Volume"
  },
  {
    title: "Automotive",
    desc: "Precision fuel and hydraulic lines for leading OEMs and Tier-1 automotive suppliers.",
    icon: Car,
    count: "25% of Volume"
  },
  {
    title: "Home Appliances",
    desc: "Copper and steel components for white goods, including refrigerators and ACs.",
    icon: Home,
    count: "20% of Volume"
  },
  {
    title: "Industrial",
    desc: "Heavy-duty assemblies and bespoke parts for specialized plant machinery.",
    icon: Factory,
    count: "15% of Volume"
  }
];

export function CustomerIndustries() {
  return (
    <section className="py-24 bg-silver/10 dark:bg-black/20">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Sector Distribution</span>
            </div>
            <h2 className="text-4xl font-heading font-bold text-charcoal dark:text-white mb-6">
              Diversified <span className="text-deepblue dark:text-gold">Market Presence</span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our engineering expertise spans across multiple critical industries, 
              allowing us to maintain a balanced and resilient portfolio of 
              global clients and application requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((s, idx) => (
            <div key={idx} className="bg-white dark:bg-charcoal p-10 border border-border rounded-sm hover:border-gold transition-all duration-300">
              <div className="w-14 h-14 bg-silver/10 dark:bg-white/5 flex items-center justify-center rounded-sm mb-8">
                <s.icon className="w-7 h-7 text-deepblue dark:text-gold" />
              </div>
              <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-2">{s.title}</h3>
              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-4">{s.count}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
