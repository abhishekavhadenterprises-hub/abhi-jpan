"use client";

import React from "react";
import { Mail, Phone, ArrowRight, MessageSquare, Users } from "lucide-react";

export function GeneralMeetingCTA() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal overflow-hidden">
      <div className="container-custom">
        <div className="bg-silver/5 dark:bg-white/2 border border-border p-12 md:p-20 rounded-sm relative group">
          {/* Decorative Elements */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Meeting Support</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-8 leading-tight">
                Shareholder <span className="text-deepblue dark:text-gold">Assistance</span> Desk
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl">
                Have specific queries regarding an upcoming meeting notice, 
                voting procedure, or participation guidelines? Our investor 
                relations team is ready to provide technical support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-5 bg-deepblue text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
                  Contact Investor Relations
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4 px-6 py-5 bg-white dark:bg-charcoal border border-border rounded-sm">
                  <Users className="w-5 h-5 text-gold" />
                  <span className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Global Support</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group/card">
                <Mail className="w-8 h-8 text-gold mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Email Queries</h4>
                <p className="text-muted-foreground text-[10px]">enquiry@jpantubular.com</p>
              </div>
              <div className="p-8 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all group/card">
                <Phone className="w-8 h-8 text-gold mb-6 group-hover/card:scale-110 transition-transform" />
                <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Direct Line</h4>
                <p className="text-muted-foreground text-[10px]">+91 (123) 456-7890</p>
              </div>
              <div className="sm:col-span-2 p-8 bg-charcoal dark:bg-black/40 rounded-sm flex items-center justify-between group/live border border-white/5">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-sm">
                    <MessageSquare className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Live Meeting Chat</h4>
                    <p className="text-silver/50 text-[10px]">Available during active AGM/EGM sessions.</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-silver/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
