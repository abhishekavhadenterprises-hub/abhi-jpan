"use client";

import React from "react";
import { Mail, Phone, ArrowRight, ShieldCheck, Scale, FileCheck, BookmarkCheck } from "lucide-react";

export function SecretarialComplianceCTA() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal overflow-hidden">
      <div className="container-custom">
        <div className="bg-charcoal dark:bg-black/40 border border-white/5 p-12 md:p-24 rounded-sm relative group overflow-hidden">
          {/* Governance Gradients */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/blueprint.png')] bg-repeat" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="h-0.5 w-10 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Governance Engagement</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-10 leading-tight">
                Connect with our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold">Governance Desk</span>
              </h2>
              <p className="text-silver/50 text-xl mb-12 leading-relaxed max-w-xl">
                For specific queries regarding our secretarial compliance 
                framework, annual audit results, or governance 
                transparency standards, please contact our dedicated 
                secretarial team.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-12 py-6 bg-gold text-charcoal font-bold text-[10px] uppercase tracking-[0.3em] rounded-sm transition-all flex items-center justify-center gap-4 btn-slide-white group">
                  Submit Governance Query
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-5 px-8 py-6 bg-white/5 border border-white/10 rounded-sm text-white">
                  <ShieldCheck className="w-6 h-6 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified Governance Channel</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-10 bg-white/5 border border-white/10 rounded-sm hover:border-gold/50 transition-all group/card">
                <Mail className="w-10 h-10 text-gold mb-8 group-hover/card:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Governance Email</h4>
                <p className="text-silver/40 text-[11px]">enquiry@jpantubular.com</p>
              </div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-sm hover:border-gold/50 transition-all group/card">
                <Phone className="w-10 h-10 text-gold mb-8 group-hover/card:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Governance Desk</h4>
                <p className="text-silver/40 text-[11px]">+91 (22) 8765-4321</p>
              </div>
              <div className="sm:col-span-2 p-10 bg-white/2 border border-white/5 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-gold/10 flex items-center justify-center rounded-sm">
                    <BookmarkCheck className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1.5">Compliance Integrity</h4>
                    <p className="text-silver/30 text-[10px]">Strict adherence to Secretarial Standards and Companies Act disclosure norms.</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-gold/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
