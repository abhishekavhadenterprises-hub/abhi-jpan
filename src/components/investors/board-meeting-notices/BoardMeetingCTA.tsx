"use client";

import React from "react";
import { Mail, Phone, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export function BoardMeetingCTA() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal overflow-hidden">
      <div className="container-custom">
        <div className="bg-charcoal dark:bg-black/40 border border-white/5 p-12 md:p-20 rounded-sm relative group overflow-hidden">
          {/* Institutional Gradients */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/blueprint.png')] bg-repeat" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Governance Support</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                Connect with our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold">Governance Desk</span>
              </h2>
              <p className="text-silver/50 text-lg mb-10 leading-relaxed max-w-xl">
                For detailed inquiries regarding board resolutions, institutional 
                compliance records, or regulatory filings, please contact our 
                corporate governance team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-5 bg-gold text-charcoal font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-white group">
                  Contact Governance Team
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4 px-6 py-5 bg-white/5 border border-white/10 rounded-sm text-white">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Verified Channel</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-gold/50 transition-all group/card">
                <Mail className="w-8 h-8 text-gold mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Institutional Email</h4>
                <p className="text-silver/40 text-[10px]">enquiry@jpantubular.com</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-gold/50 transition-all group/card">
                <Phone className="w-8 h-8 text-gold mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Corporate Line</h4>
                <p className="text-silver/40 text-[10px]">+91 (22) 6789-0123</p>
              </div>
              <div className="sm:col-span-2 p-8 bg-white/2 border border-white/5 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-sm">
                    <Globe className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Global Compliance Network</h4>
                    <p className="text-silver/30 text-[10px]">Coordinating governance across international manufacturing verticals.</p>
                  </div>
                </div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
