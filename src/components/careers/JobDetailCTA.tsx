"use client";

import React from "react";
import { ArrowRight, MessageSquare, Headphones, ShieldCheck, Mail } from "lucide-react";

export function JobDetailCTA() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-charcoal overflow-hidden">
      <div className="container-custom">
        <div className="bg-charcoal dark:bg-black/40 border border-white/5 p-6 sm:p-10 md:p-16 lg:p-20 rounded-2xl sm:rounded-3xl relative group overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
          {/* Institutional Design Elements */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/blueprint.png')] bg-repeat" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700 delay-200">
              <div className="flex items-center gap-2 mb-4 sm:mb-8">
                <div className="h-0.5 w-8 sm:w-10 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Career Progression</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 sm:mb-10 leading-tight">
                Take The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold italic font-medium">Next Step</span>
              </h2>
              <p className="text-silver/60 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 leading-relaxed max-w-xl">
                Require further clarification on this role or the onboarding 
                roadmap? Connect with our specialized recruitment desk 
                for authoritative assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button 
                  onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gold text-charcoal font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 sm:gap-4 hover:bg-white dark:hover:bg-[#0D2440] dark:hover:text-white"
                >
                  Apply For This Role
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 animate-in fade-in slide-in-from-right duration-700 delay-400">
              <div className="p-5 sm:p-7 md:p-8 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl hover:border-gold/50 transition-all group/card">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-gold mb-4 sm:mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">Recruitment</h4>
                <p className="text-silver/50 text-xs sm:text-[11px] break-all">enquiry@jpantubular.com</p>
              </div>
              <div className="p-5 sm:p-7 md:p-8 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl hover:border-gold/50 transition-all group/card">
                <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-gold mb-4 sm:mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">Hiring Desk</h4>
                <p className="text-silver/50 text-xs sm:text-[11px]">+91-120-2560586</p>
              </div>
              <div className="sm:col-span-2 p-5 sm:p-7 md:p-8 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 flex items-center justify-center rounded-xl shrink-0">
                    <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[11px] sm:text-xs uppercase tracking-widest mb-1">Verified Posting</h4>
                    <p className="text-silver/40 text-[9px] sm:text-[10px] leading-relaxed">This role is currently active and open for institutional applications.</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-gold/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
