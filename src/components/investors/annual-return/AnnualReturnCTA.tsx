"use client";

import React from "react";
import { Scale, Mail, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export function AnnualReturnCTA() {
  return (
    <section className="py-24 bg-deepblue relative overflow-hidden text-white">
      {/* Decorative Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/blueprint.png')] bg-repeat" />
      </div>

      <div className="container-custom relative z-10">
        <div className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-sm backdrop-blur-sm max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Statutory Support</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                Dedicated <span className="text-gold">Compliance</span> Support
              </h2>
              <p className="text-silver/70 text-lg mb-10 leading-relaxed">
                For detailed technical clarification on statutory filings, 
                regulatory protocols, or certified true copy requests, our 
                compliance department is available for consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gold text-charcoal font-bold rounded-sm flex items-center justify-center gap-3 transition-all whitespace-nowrap btn-slide-white group">
                  Contact Compliance Desk
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-sm">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span className="text-xs font-bold uppercase tracking-widest">MCA Verified</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-sm group hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gold/20 flex items-center justify-center rounded-full">
                    <Scale className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Statutory Inquiries</h4>
                </div>
                <p className="text-silver/50 text-xs">enquiry@jpantubular.com</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-sm group hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gold/20 flex items-center justify-center rounded-full">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Direct Hotline</h4>
                </div>
                <p className="text-silver/50 text-xs">+91 (123) 456-7890 (Ext: 102)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
