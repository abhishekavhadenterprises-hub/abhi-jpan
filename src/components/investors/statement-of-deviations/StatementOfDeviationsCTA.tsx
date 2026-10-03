"use client";

import React, { useRef, useState } from "react";
import { Mail, Phone, ArrowRight, ShieldCheck, FileCheck, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatementOfDeviationsCTA() {
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
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden"
        >
          {/* Subtle Ambient Accents */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
                Connect with our <br />
                <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                  Financial Desk
                </span>
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed max-w-xl">
                For specific queries regarding our fund utilization, 
                quarterly statements of deviations, or fiscal 
                transparency standards, please contact our dedicated 
                investor relations team.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="/contact"
                  className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 group whitespace-nowrap"
                >
                  Submit Fiscal Query
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white/80 dark:bg-charcoal/80 border border-[#7BA4D0]/30 rounded-xl text-[#0D2440] dark:text-white text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#2E5E99] shrink-0" />
                  <span>Verified Fiscal Channel</span>
                </div>
              </div>
            </div>

            {/* Support Cards */}
            <div className="flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 sm:py-0 px-1 sm:px-0 gap-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                <div className="p-6 sm:p-8 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center mb-5 text-[#2E5E99]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-1.5">
                    IR Email
                  </h4>
                  <p className="text-muted-foreground text-xs font-medium">enquiry@jpantubular.com</p>
                </div>

                <div className="p-6 sm:p-8 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl hover:border-[#2E5E99]/40 transition-all group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center mb-5 text-[#2E5E99]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-1.5">
                    Finance Desk
                  </h4>
                  <p className="text-muted-foreground text-xs font-medium">+91-120-2560586</p>
                </div>

                <div className="sm:col-span-2 p-6 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-[#7BA4D0]/25 rounded-2xl flex items-center justify-between w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center rounded-xl shrink-0 text-[#2E5E99]">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-widest mb-0.5">
                        Capital Accountability
                      </h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Providing verified evidence of fund utilization and statutory adherence.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-[#7BA4D0]" />
                  </div>
                </div>
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex sm:hidden items-center justify-center gap-2 mt-4 z-10">
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
                      "h-1.5 rounded-full transition-all duration-300",
                      activeIndex === i ? "w-6 bg-[#2E5E99]" : "w-1.5 bg-[#7BA4D0]/40"
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
