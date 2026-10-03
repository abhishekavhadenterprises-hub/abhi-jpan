"use client";

import React from "react";
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
      className="relative py-28 md:py-36 bg-transparent text-[#0D2440] dark:text-white overflow-hidden"
    >
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Narrative & Engagement */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-cyan-400 animate-pulse shadow-[0_0_6px_#2E5E99] dark:shadow-[0_0_6px_#38bdf8]" />
                <span>09 // TECHNICAL DESK & GLOBAL SOURCING</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase text-[#0D2440] dark:text-white leading-[1.02] mb-4">
                Engineering <br />
                <span className="font-serif italic font-light text-slate-600 dark:text-slate-300">
                  support desk.
                </span>
              </h2>

              <p className="text-slate-600 dark:text-slate-300/85 text-base font-light leading-relaxed mb-6">
                Our application engineers review complex 3D CAD step files, suggest alloy optimizations, and supply prototype samples with full CMM inspection reports.
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
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
                  className="group relative p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-slate-200 dark:border-white/[0.08] hover:border-white/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#2E5E99] dark:text-cyan-400 font-medium">
                      {card.status}
                    </span>
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors" />
                  </div>

                  <div className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-slate-100 transition-colors mb-2 truncate">
                    {card.displayValue}
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {card.caption}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
