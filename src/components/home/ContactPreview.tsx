"use client";

import React from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, Clock, MapPin } from "lucide-react";

interface ContactCard {
  id: string;
  status: string;
  displayValue: string;
  caption: string;
  href: string;
  isExternal?: boolean;
  icon: React.ElementType;
}

const contactCards: ContactCard[] = [
  {
    id: "phone",
    status: "DIRECT LINE",
    displayValue: "+91 120 2560586",
    caption: "HEADQUARTERS CALL DESK",
    href: "tel:+911202560586",
    icon: Phone,
  },
  {
    id: "email",
    status: "TECHNICAL DESK",
    displayValue: "enquiry@jpantubular.com",
    caption: "TECHNICAL RFQ & DRAWINGS",
    href: "mailto:enquiry@jpantubular.com",
    icon: Mail,
  },
  {
    id: "turnaround",
    status: "RAPID TURNAROUND",
    displayValue: "< 24 HOURS",
    caption: "FEASIBILITY & TOOLING SCHEDULE",
    href: "/contact",
    icon: Clock,
  },
  {
    id: "location",
    status: "HEADQUARTERS",
    displayValue: "Greater Noida, U.P.",
    caption: "SURAJPUR SITE B INDUSTRIAL AREA",
    href: "https://maps.google.com/?q=B-2/31,+32+%26+42,+Surajpur+Site+B+Industrial+Block+C+Road,+Greater+Noida,+UP+201306",
    isExternal: true,
    icon: MapPin,
  },
];

export function ContactPreview() {
  return (
    <section
      id="contact-preview"
      className="relative py-8 md:py-10 flex flex-col justify-center bg-transparent text-[#0D2440] dark:text-white overflow-hidden border-t border-[#E5E5E5] dark:border-[#222]"
    >
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Narrative & Engagement */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] animate-pulse shadow-[0_0_6px_#2E5E99]" />
                <span>09 // TECHNICAL DESK & GLOBAL SOURCING</span>
              </div>

              <ScrollWipeHeading as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase text-[#0D2440] dark:text-white leading-[1.02] mb-4">
                Engineering <br />
                <span className="font-heading italic font-light text-slate-600 dark:text-slate-300">
                  support desk.
                </span>
              </ScrollWipeHeading>

              <p className="text-slate-600 dark:text-slate-300/85 text-base font-light leading-relaxed mb-6">
                Our application engineers review complex 3D CAD step files, suggest alloy optimizations, and supply prototype samples with full CMM inspection reports.
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#2E5E99] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(46,94,153,0.3)] hover:scale-105 hover:shadow-[0_10px_40px_rgba(46,94,153,0.4)]"
                >
                  <span>Connect With Our Engineers</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 Architectural Contact Panels */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.id}
                  href={card.href}
                  target={card.isExternal ? "_blank" : undefined}
                  rel={card.isExternal ? "noopener noreferrer" : undefined}
                  className="group relative p-6 md:p-8 rounded-[2rem] bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/5 dark:border-white/5 hover:border-[#2E5E99]/30 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(46,94,153,0.15)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center justify-between gap-2 mb-6 relative z-10">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#2E5E99] font-bold">
                      {card.status}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center group-hover:bg-[#2E5E99] transition-colors duration-500">
                      <Icon className="w-4 h-4 text-[#111] dark:text-white group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>

                  <div className="font-heading font-black text-xl md:text-2xl text-[#111] dark:text-white group-hover:text-[#2E5E99] transition-colors duration-500 mb-4 truncate relative z-10">
                    {card.displayValue}
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between relative z-10">
                    <span className="font-mono text-[9px] text-[#666] dark:text-[#999] uppercase tracking-widest font-semibold">
                      {card.caption}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#999] group-hover:text-[#2E5E99] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPreview;
