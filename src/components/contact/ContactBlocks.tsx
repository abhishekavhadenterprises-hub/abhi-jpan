"use client";

import React from "react";
import { User, Mail, Phone, MapPin, Briefcase, Building2, ShieldCheck, ArrowRight } from "lucide-react";

export function ContactBlocks() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-charcoal overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12">
          
          {/* Investor Relations Officer Block */}
          <div className="group bg-charcoal dark:bg-black/40 border border-white/5 p-6 sm:p-10 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl relative overflow-hidden animate-in fade-in slide-in-from-left duration-700">
             {/* Decorative Background */}
             <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/blueprint.png')] bg-repeat pointer-events-none" />

             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold/10 flex items-center justify-center rounded-xl border border-gold/20">
                      <User className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
                   </div>
                   <div className="px-3 sm:px-4 py-1.5 bg-gold text-charcoal text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-lg">
                      Nodal Officer
                   </div>
                </div>

                <p className="text-gold font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-3 sm:mb-4">Investor Relations Desk</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-2 leading-tight">Sunil Mehra</h3>
                <p className="text-silver/50 text-xs sm:text-sm mb-8 sm:mb-12 flex items-center gap-2 sm:gap-3">
                   <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold/60 shrink-0" />
                   Chief Financial Officer & Compliance Head
                </p>

                <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-16">
                   <div className="flex items-center gap-4 sm:gap-6 group/item">
                      <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-lg border border-white/10 group-hover/item:border-gold transition-colors shrink-0">
                         <Mail className="w-4 h-4 text-gold" />
                      </div>
                      <div className="min-w-0">
                         <p className="text-[9px] text-silver/40 uppercase tracking-widest mb-0.5 sm:mb-1">Official Email</p>
                         <p className="text-xs sm:text-sm font-bold text-white tracking-tight break-all">enquiry@jpantubular.com</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 sm:gap-6 group/item">
                      <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-lg border border-white/10 group-hover/item:border-gold transition-colors shrink-0">
                         <Phone className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                         <p className="text-[9px] text-silver/40 uppercase tracking-widest mb-0.5 sm:mb-1">Direct Helpline</p>
                         <p className="text-xs sm:text-sm font-bold text-white tracking-tight">+91-120-2560586</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 sm:gap-6 group/item">
                      <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-lg border border-white/10 group-hover/item:border-gold transition-colors shrink-0">
                         <MapPin className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                         <p className="text-[9px] text-silver/40 uppercase tracking-widest mb-0.5 sm:mb-1">Office Location</p>
                         <p className="text-xs text-silver/60 leading-relaxed max-w-sm">
                            B-2/31, 32 & 42, Surajpur Site B Industrial Block C Road, <br />
                            Greater Noida, UP 201306
                         </p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 sm:pt-10 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2 sm:gap-3">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gold/40 shrink-0" />
                      <span className="text-[8px] sm:text-[9px] text-silver/40 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">Authorized Institutional Desk</span>
                   </div>
                </div>
             </div>
          </div>

          {/* RTA Details Block */}
          <div className="group bg-silver/5 dark:bg-black/10 border border-border p-6 sm:p-10 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl relative overflow-hidden animate-in fade-in slide-in-from-right duration-700">
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-silver/5 dark:bg-white/5 flex items-center justify-center rounded-xl border border-border group-hover:border-gold transition-all">
                      <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
                   </div>
                   <div className="px-3 sm:px-4 py-1.5 bg-charcoal text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-lg dark:bg-white dark:text-charcoal">
                      RTA Desk
                   </div>
                </div>

                <p className="text-gold font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-3 sm:mb-4">Registrar & Transfer Agent</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-2 leading-tight">Link Intime India Pvt. Ltd.</h3>
                <p className="text-muted-foreground/70 text-xs sm:text-sm mb-8 sm:mb-12">Authorized share registry and transfer operations.</p>

                <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-16">
                   <div className="flex items-center gap-4 sm:gap-6 group/item">
                      <div className="w-10 h-10 bg-white dark:bg-charcoal flex items-center justify-center rounded-lg border border-border group-hover/item:border-gold transition-colors shrink-0">
                         <Mail className="w-4 h-4 text-gold" />
                      </div>
                      <div className="min-w-0">
                         <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5 sm:mb-1">RTA Email</p>
                         <p className="text-xs sm:text-sm font-bold text-charcoal dark:text-white tracking-tight break-all">enquiry@jpantubular.com</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 sm:gap-6 group/item">
                      <div className="w-10 h-10 bg-white dark:bg-charcoal flex items-center justify-center rounded-lg border border-border group-hover/item:border-gold transition-colors shrink-0">
                         <Phone className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                         <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5 sm:mb-1">RTA Support</p>
                         <p className="text-xs sm:text-sm font-bold text-charcoal dark:text-white tracking-tight">+91-120-2560586</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 sm:gap-6 group/item">
                      <div className="w-10 h-10 bg-white dark:bg-charcoal flex items-center justify-center rounded-lg border border-border group-hover/item:border-gold transition-colors shrink-0">
                         <MapPin className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                         <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5 sm:mb-1">Corporate Office</p>
                         <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                            C-101, 247 Park, L.B.S. Marg, <br />
                            Vikhroli (West), Mumbai - 400083
                         </p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 sm:pt-10 border-t border-border flex items-center justify-between">
                   <button className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold text-charcoal dark:text-white uppercase tracking-[0.15em] sm:tracking-[0.2em] group/btn">
                      Visit RTA Portal
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
