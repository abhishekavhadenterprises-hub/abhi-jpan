"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";

export function CustomersCTA() {
  return (
    <section className="py-24 bg-deepblue relative overflow-hidden">
      {/* Decorative Particle Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-sm text-center max-w-5xl mx-auto">
          <div className="w-20 h-20 bg-gold flex items-center justify-center rounded-full mx-auto mb-10">
            <UserPlus className="w-10 h-10 text-charcoal" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8">
            Become a <span className="text-gold">J Pan Tubular Components Limited Partner</span>
          </h2>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Join a growing network of global industry leaders who rely on 
            our precision components to drive their thermal and automotive innovations.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/contact"
              className="px-12 py-5 bg-gold text-charcoal font-bold rounded-sm flex items-center gap-3 transition-all hover:-translate-y-1 btn-slide-white group"
            >
              Start Your Collaboration
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="px-12 py-5 bg-transparent border border-white/20 text-white font-bold rounded-sm transition-all btn-slide-gold group"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
