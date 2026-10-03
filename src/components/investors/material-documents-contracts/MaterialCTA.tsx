"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Headphones, ArrowRight, MessageSquare, ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MaterialCTA() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < 3 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/30 dark:via-[#0D2440]/20 dark:to-[#0D2440]/40 border border-[#7BA4D0]/35 p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden"
        >
          {/* Subtle Ambient Light Gradients */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
                Document <br />
                <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-medium inline-block pr-1 pb-1">
                  Support Desk
                </span>
              </h2>

              <p className="text-[#0D2440]/75 dark:text-white/75 text-base sm:text-lg mb-8 leading-relaxed max-w-xl font-normal">
                Require further clarification on material disclosures? 
                Connect with our legal and compliance desk for 
                authoritative assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-[0.18em] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5 group whitespace-nowrap"
                >
                  Contact Desk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white/80 dark:bg-charcoal/60 border border-[#7BA4D0]/30 rounded-2xl text-[#0D2440] dark:text-white">
                  <ShieldCheck className="w-5 h-5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Verified Disclosures</span>
                </div>
              </div>
            </div>

            {/* Right Column: Cards */}
            <div className="flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 sm:py-0 px-1 sm:px-0 gap-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                <div className="p-6 sm:p-7 bg-white/90 dark:bg-charcoal/60 border border-[#7BA4D0]/30 rounded-3xl hover:border-[#2E5E99]/50 transition-all duration-300 group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center mb-5 text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5">
                    Legal Email
                  </h4>
                  <p className="text-[#2E5E99] dark:text-[#7BA4D0] text-sm font-semibold hover:underline">
                    enquiry@jpantubular.com
                  </p>
                </div>

                <div className="p-6 sm:p-7 bg-white/90 dark:bg-charcoal/60 border border-[#7BA4D0]/30 rounded-3xl hover:border-[#2E5E99]/50 transition-all duration-300 group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center mb-5 text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-110 transition-transform">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5">
                    Direct Support
                  </h4>
                  <p className="text-[#2E5E99] dark:text-[#7BA4D0] text-sm font-semibold">
                    +91-120-2560586
                  </p>
                </div>

                <div className="sm:col-span-2 p-6 sm:p-7 bg-white/90 dark:bg-charcoal/60 border border-[#7BA4D0]/30 rounded-3xl flex items-center justify-between w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center hover:border-[#2E5E99]/50 transition-all duration-300">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440]/50 border border-[#7BA4D0]/20 flex items-center justify-center shrink-0 text-[#2E5E99] dark:text-[#7BA4D0]">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1">
                        Primary Disclosure
                      </h4>
                      <p className="text-[#0D2440]/70 dark:text-white/70 text-xs sm:text-sm leading-relaxed font-normal">
                        Access our primary compliance officer for official document clarification.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#2E5E99]/50" />
                  </div>
                </div>
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex sm:hidden items-center justify-center gap-2 mt-5 z-10">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      if (cardsRef.current && cardsRef.current.children[i]) {
                        cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }
                    }}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeIndex === i ? "w-7 bg-[#2E5E99]" : "w-2 bg-[#7BA4D0]/30"
                    )}
                    aria-label={`Go to card ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
