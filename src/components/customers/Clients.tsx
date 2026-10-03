"use client";

import React from "react";

const clientLogos = [
  "HYUNDAI", "TATA MOTORS", "MARUTI SUZUKI", "SAMSUNG", "LG ELECTRONICS", 
  "VOLTAS", "BLUE STAR", "DAIKIN", "CARRIER", "WHIRLPOOL"
];

export function Clients() {
  return (
    <section className="py-20 bg-white dark:bg-charcoal overflow-hidden border-b border-border">
      <div className="container-custom mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-black text-charcoal dark:text-white mb-4">
          <span className="text-deepblue dark:text-gold">120+</span> CLIENTS SERVED
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-silver mb-4 block">Trusted By Industry Leaders</span>
      </div>
      
      {/* Infinite Scroll Container */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-infinite-scroll whitespace-nowrap py-4">
          {[...clientLogos, ...clientLogos].map((logo, idx) => (
            <div 
              key={idx} 
              className="mx-12 text-3xl font-heading font-black text-silver/20 dark:text-white/10 hover:text-deepblue dark:hover:text-gold transition-colors cursor-default select-none tracking-tighter"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
