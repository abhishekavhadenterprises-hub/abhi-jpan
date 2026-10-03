"use client";

import React from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

export function NewsletterSubscribe() {
  return (
    <section className="py-24 bg-deepblue relative overflow-hidden">
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/blueprint.png')] bg-repeat opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16 bg-white/5 border border-white/10 p-12 md:p-20 rounded-sm backdrop-blur-sm">
          <div className="lg:w-1/2">
            <div className="w-16 h-16 bg-gold flex items-center justify-center rounded-full mb-8">
              <Mail className="w-8 h-8 text-charcoal" />
            </div>
            <h2 className="text-4xl font-heading font-bold text-white mb-6 leading-tight">
              Get the Latest <span className="text-gold">Industrial Updates</span> Directly
            </h2>
            <p className="text-silver/60 text-lg mb-10 leading-relaxed">
              Stay ahead with our monthly digest of precision engineering news, 
              facility updates, and specialized technical breakthroughs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-silver/80">
                <CheckCircle className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold uppercase tracking-widest">Industry Insights</span>
              </div>
              <div className="flex items-center gap-3 text-silver/80">
                <CheckCircle className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold uppercase tracking-widest">Sustainability Reports</span>
              </div>
              <div className="flex items-center gap-3 text-silver/80">
                <CheckCircle className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold uppercase tracking-widest">Product Launches</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-silver/40 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-silver/40 uppercase tracking-[0.2em] ml-1">Professional Email</label>
                <input 
                  type="email" 
                  placeholder="john@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gold hover:bg-white/95 dark:hover:bg-[#0D2440] dark:hover:text-white text-charcoal font-bold py-5 rounded-sm flex items-center justify-center gap-3 transition-all"
              >
                Join "The Precision Edge" Hub
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-center text-[10px] text-silver/30 uppercase tracking-[0.2em]">
                Secure & Professional communication only.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
