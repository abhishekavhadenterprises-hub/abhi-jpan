"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileCheck } from "lucide-react";

export function QualityCTA() {
  return (
    <section className="py-12 md:py-24 bg-white dark:bg-charcoal relative overflow-hidden">
      {/* Subtle Texture Overlay for White BG */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000')]" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-full mx-auto mb-6 md:mb-10">
            <FileCheck className="w-10 h-10 text-gold" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-charcoal dark:text-white mb-6 md:mb-8 leading-tight">
            Ensure <span className="text-gold">Quality</span> with <br />
            Every Product You Choose
          </h2>
          
          <p className="text-muted-foreground text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Partner with a manufacturer that prioritizes precision and compliance 
            at every step. Download our quality manual or request a technical audit.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/contact"
              className="px-12 py-5 bg-gold text-charcoal font-bold rounded-sm flex items-center gap-3 transition-all hover:-translate-y-1 btn-slide-white group"
            >
              Get a Quality Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="px-12 py-5 bg-transparent border border-border text-charcoal dark:text-white font-bold rounded-sm transition-all btn-slide-gold group"
            >
              Learn About Our Facility
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
