"use client";

import React from "react";
import { BookOpen, ArrowRight, ShieldCheck } from "lucide-react";

export function BlogCTA() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#071321] relative overflow-visible">
      <div className="container-custom relative z-10">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440] dark:via-[#09182b] dark:to-[#0D2440] border border-[#7BA4D0]/35 dark:border-white/10 p-8 md:p-14 lg:p-16 text-center max-w-5xl mx-auto overflow-hidden">
          <div className="relative z-10">
            {/* Top Icon Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 dark:border-white/15 mb-6 mx-auto">
              <BookOpen className="w-6 h-6 text-[#2E5E99] dark:text-[#7BA4D0]" />
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white tracking-tight mb-5 leading-[1.25] overflow-visible">
              Knowledge is{" "}
              <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0] inline-block pt-1 pb-2.5 pr-2">
                Power
              </span>
            </h2>

            <p className="text-[#0D2440]/75 dark:text-white/75 text-base md:text-lg max-w-2xl mx-auto mb-9 leading-relaxed">
              Stay ahead of industrial trends. Subscribe to our monthly technical
              digest for expert insights on precision engineering and manufacturing innovation.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Your professional email"
                className="flex-grow bg-white/95 dark:bg-[#071321]/80 border border-[#7BA4D0]/40 dark:border-white/15 rounded-xl px-5 py-3.5 text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] dark:focus:border-[#7BA4D0] text-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#0D2440] dark:bg-[#2E5E99] hover:bg-[#2E5E99] dark:hover:bg-[#7BA4D0] text-white dark:text-white dark:hover:text-[#0D2440] text-sm font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap group"
              >
                <span>Join the Digest</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#0D2440]/60 dark:text-silver/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E5E99]" />
              <span>Curated monthly updates. No spam. Unsubscribe at any time.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

