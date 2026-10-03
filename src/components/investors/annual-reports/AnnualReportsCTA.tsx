"use client";

import React from "react";
import { ArrowRight, PieChart, TrendingUp, UserPlus } from "lucide-react";


export function AnnualReportsCTA() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal">
      <div className="container-custom">
        <div className="bg-silver/5 dark:bg-white/2 border border-border p-12 md:p-20 rounded-sm relative overflow-hidden group">
          {/* Decorative Elements */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Technical Growth</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-8 leading-tight">
                Explore Our <span className="text-deepblue dark:text-gold">Performance</span> & Growth Journey
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl">
                Gain deeper insights into our operational strategies and long-term 
                value creation. Connect with our investor relations team for a 
                detailed technical consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-deepblue text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
                  Contact Investor Relations
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 bg-white dark:bg-charcoal border border-border hover:border-gold text-charcoal dark:text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
                  <UserPlus className="w-4 h-4 text-gold" />
                  Technical Inquiry
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group/card">
                <PieChart className="w-8 h-8 text-gold mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Market Share</h4>
                <p className="text-muted-foreground text-[10px]">Technical analysis of our global cooling sector dominance.</p>
              </div>
              <div className="p-8 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group/card">
                <TrendingUp className="w-8 h-8 text-gold mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Fiscal Health</h4>
                <p className="text-muted-foreground text-[10px]">Long-term sustainability and capital allocation strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
