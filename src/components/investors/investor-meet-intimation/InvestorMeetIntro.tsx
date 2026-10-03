"use client";

import React from "react";
import { MessageCircle, BarChart3, TrendingUp } from "lucide-react";

export function InvestorMeetIntro() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight overflow-visible">
              Transparency as a <br />
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Strategic Asset</span>
            </h2>
            <p className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg mb-8 leading-relaxed font-normal">
              At J Pan Tubular Components Limited, we view consistent investor dialogue as fundamental 
              to our corporate identity. Our meeting intimations provide the 
              market with timely, verified information regarding executive 
              engagements, ensuring all stakeholders have equitable access 
              to our strategic trajectory.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                <span className="block text-2xl font-heading font-bold text-[#0D2440] dark:text-white">Active</span>
                <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest">Dialogue</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                <span className="block text-2xl font-heading font-bold text-[#0D2440] dark:text-white">Global</span>
                <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest">Reach</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25">
                <span className="block text-2xl font-heading font-bold text-[#0D2440] dark:text-white">24h</span>
                <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest">Response</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="p-8 sm:p-10 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20 hover:border-[#2E5E99]/50 transition-all">
                  <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-xl shrink-0 text-[#2E5E99]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D2440] dark:text-white uppercase tracking-wider text-xs mb-1">Equitable Access</h4>
                    <p className="text-[#0D2440]/70 dark:text-silver/70 text-xs leading-relaxed">Simultaneous disclosure of all investor interactions to institutional and retail partners.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20 hover:border-[#2E5E99]/50 transition-all">
                  <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-xl shrink-0 text-[#2E5E99]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D2440] dark:text-white uppercase tracking-wider text-xs mb-1">Direct Interaction</h4>
                    <p className="text-[#0D2440]/70 dark:text-silver/70 text-xs leading-relaxed">Coordinating earnings calls and analyst meets with precision-timed intimations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/20 hover:border-[#2E5E99]/50 transition-all">
                  <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-white/10 flex items-center justify-center rounded-xl shrink-0 text-[#2E5E99]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D2440] dark:text-white uppercase tracking-wider text-xs mb-1">Strategic Updates</h4>
                    <p className="text-[#0D2440]/70 dark:text-silver/70 text-xs leading-relaxed">Providing a transparent record of all market-moving presentations and interactions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

