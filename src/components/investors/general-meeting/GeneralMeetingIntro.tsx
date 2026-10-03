"use client";

import React from "react";
import { Users, ShieldCheck, MessageSquare } from "lucide-react";

export function GeneralMeetingIntro() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Shareholder Relations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Empowering the <br />
              <span className="text-deepblue dark:text-gold">Shareholder Voice</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At J Pan Tubular Components Limited, we believe in the absolute transparency of our 
              corporate decision-making processes. Our general meetings serve 
              as a vital platform for shareholders to engage directly with 
              leadership, review performance, and participate in strategic 
              voting mandates.
            </p>
            
            <div className="flex flex-col gap-6 mt-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-silver/10 flex items-center justify-center rounded-sm shrink-0">
                  <ShieldCheck className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-1">Democratic Oversight</h4>
                  <p className="text-muted-foreground text-[10px] leading-relaxed">Full statutory adherence to shareholder meeting protocols and voting rights.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-silver/10 flex items-center justify-center rounded-sm shrink-0">
                  <MessageSquare className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-xs mb-1">Direct Engagement</h4>
                  <p className="text-muted-foreground text-[10px] leading-relaxed">Providing clear, timely notices to ensure maximum participation and discourse.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-silver/5 dark:bg-white/2 border border-border rounded-sm flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10">
                <Users className="w-20 h-20 text-gold/30 mx-auto mb-8" />
                <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-4">Meeting Repository</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                  Access the complete archive of AGM and EGM notices, 
                  explanatory statements, and participation guidelines below.
                </p>
              </div>
            </div>
            {/* Design Accents */}
          </div>
        </div>
      </div>
    </section>
  );
}
