"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export function EventsCTA() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black relative overflow-visible">
      <div className="container-custom relative z-10">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] border border-[#7BA4D0]/35 p-8 md:p-14 lg:p-16 overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Side: Content */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] overflow-visible">
                Connect With Our Experts <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
                  At Future Events
                </span>
              </h2>
              
              <p className="text-[#0D2440]/75 dark:text-silver/80 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Planning to visit an upcoming industry fair? Schedule an exclusive 
                consultation with our engineering team to explore bespoke solutions.
              </p>
            </div>

            {/* Right Side: Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <span>Schedule Session</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/gallery"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-white/90 dark:bg-charcoal text-[#0D2440] dark:text-white border border-[#7BA4D0]/35 text-sm font-semibold rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                View Facilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

