"use client";

import React from "react";
import { Vote, UserCheck, Smartphone, Info, ArrowRight } from "lucide-react";

const guidelines = [
  {
    id: 1,
    title: "E-Voting Protocol",
    desc: "Shareholders can cast their votes electronically through the designated NSDL/CDSL portal during the specified period.",
    icon: Vote
  },
  {
    id: 2,
    title: "Proxy Submission",
    desc: "If unable to attend, proxies must be submitted to our registered office at least 48 hours before the meeting commencement.",
    icon: UserCheck
  },
  {
    id: 3,
    title: "Virtual Participation",
    desc: "Links for virtual meeting attendance will be dispatched to registered email IDs 72 hours prior to the session.",
    icon: Smartphone
  },
  {
    id: 4,
    title: "Quorum & Entry",
    desc: "Physical entry is permitted only upon presentation of valid ID and attendance slip provided with the official notice.",
    icon: Info
  }
];

export function GeneralMeetingInstructions() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Shareholder Guidance</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
              Important <span className="text-deepblue dark:text-gold">Participation</span> Guidelines
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To ensure a seamless and transparent meeting experience, please 
              adhere to the following institutional protocols regarding 
              voting, attendance, and technical participation.
            </p>
          </div>
          <button className="px-10 py-5 bg-silver/10 text-charcoal dark:text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-4 group shrink-0 btn-slide-gold group">
            Download Voting Guide
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guidelines.map((item) => (
            <div 
              key={item.id}
              className="p-8 bg-silver/5 dark:bg-white/2 border border-border rounded-sm hover:border-gold transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white dark:bg-charcoal border border-border flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold/10 transition-colors">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <h4 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest mb-4">
                {item.title}
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Help Card */}
        <div className="mt-12 bg-deepblue p-8 md:p-12 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-heading font-bold mb-3">Encountering Technical Difficulties?</h3>
            <p className="text-silver/50 text-xs leading-relaxed">
              Our investor relations technical desk is available to assist with 
              e-voting authentication and virtual meeting access issues.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-gold text-charcoal font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap btn-slide-white group">
            Support Desk
          </button>
        </div>
      </div>
    </section>
  );
}
