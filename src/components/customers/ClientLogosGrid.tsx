"use client";

import React from "react";

const clientSectors = [
  { name: "HVAC & Refrigeration", count: 12 },
  { name: "Automotive OEM", count: 8 },
  { name: "Home Appliances", count: 15 },
  { name: "Industrial Systems", count: 10 }
];

// Placeholder for 20+ client logos
const clientNames = [
  "BlueStar", "Voltas", "Daikin", "Carrier", "Samsung", "LG", "Whirlpool", "Godrej",
  "Tata Motors", "Mahindra", "Maruti Suzuki", "Honda", "Denso", "Subros", "Behr",
  "Panasonic", "Haier", "Hitachi", "Toshiba", "Mitsubishi Electric", "Emerson", "Danfoss"
];

export function ClientLogosGrid() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Our Portfolio</span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-4xl font-heading font-bold text-charcoal dark:text-white mb-6">
            Supporting <span className="text-deepblue dark:text-gold">Global Brands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We are proud to be the preferred component partner for leading 
            multinationals and domestic giants across diverse sectors.
          </p>
        </div>

        {/* Sector Summary Tabs (Visual only for Phase 1) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {clientSectors.map((sector, idx) => (
            <div key={idx} className="px-6 py-3 bg-silver/10 dark:bg-white/5 border border-border rounded-full text-xs font-bold uppercase tracking-widest text-charcoal dark:text-silver/80">
              {sector.name} <span className="ml-2 text-gold">({sector.count})</span>
            </div>
          ))}
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border border border-border overflow-hidden rounded-sm">
          {clientNames.map((name, idx) => (
            <div 
              key={idx} 
              className="group aspect-video bg-white dark:bg-charcoal flex items-center justify-center p-8 hover:bg-silver/5 dark:hover:bg-white/5 transition-all duration-300 relative"
            >
              {/* Grayscale Text Placeholder that looks like a Logo */}
              <span className="text-charcoal/30 dark:text-white/20 font-heading font-bold text-lg uppercase tracking-tighter group-hover:text-deepblue dark:group-hover:text-gold transition-colors duration-500">
                {name}
              </span>
              
              {/* Corner Accent on Hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-transparent group-hover:border-gold transition-all" />
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-center text-xs text-muted-foreground italic">
          * Logos shown are for representative purposes only. All trademarks belong to their respective owners.
        </p>
      </div>
    </section>
  );
}
