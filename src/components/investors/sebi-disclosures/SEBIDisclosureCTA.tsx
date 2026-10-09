"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, ShieldCheck, Scale } from "lucide-react";
import Link from "next/link";

export function SEBIDisclosureCTA() {
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
    <section className="py-20 md:py-28 bg-white dark:bg-[#071321] overflow-hidden relative transition-colors">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl sm:rounded-[40px] bg-gradient-to-br from-[#0D2440] via-[#102D50] to-[#163B66] text-white border border-[#7BA4D0]/30 p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl shadow-[#2E5E99]/15"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#2E5E99]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-[#7BA4D0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-heading font-black uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7BA4D0]" />
                Secretarial Assistance
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-[1.12] tracking-tight">
                Connect with our <br />
                <span className="text-[#7BA4D0]">
                  Compliance Desk
                </span>
              </h2>

              <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                For specific queries regarding our statutory filings, 
                regulatory compliance framework, or SEBI (LODR) 
                adherence, please contact our dedicated compliance team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-2">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-[#0D2440] hover:bg-[#E7F0FA] font-heading font-bold text-xs uppercase tracking-[0.18em] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5 group whitespace-nowrap shadow-lg"
                >
                  Submit Regulatory Query
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/15 rounded-2xl text-white">
                  <Scale className="w-5 h-5 text-[#7BA4D0] shrink-0" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider">Statutory Transparency</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tactile White Pods */}
            <div className="lg:col-span-6 flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row sm:grid sm:grid-cols-2 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 sm:py-0 px-1 sm:px-0 gap-4 sm:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                <div className="p-6 sm:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-3xl hover:-translate-y-1 transition-all duration-300 group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mb-5 text-[#2E5E99] group-hover/card:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1.5">
                    Compliance Email
                  </h4>
                  <a href="mailto:enquiry@jpantubular.com" className="text-[#2E5E99] text-sm font-heading font-bold hover:underline block break-all">
                    enquiry@jpantubular.com
                  </a>
                </div>

                <div className="p-6 sm:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-3xl hover:-translate-y-1 transition-all duration-300 group/card w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center mb-5 text-[#2E5E99] group-hover/card:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="text-[#0D2440] font-heading font-bold text-xs uppercase tracking-wider mb-1.5">
                    Secretariat Phone
                  </h4>
                  <p className="text-[#2E5E99] text-sm font-heading font-bold">
                    +91-120-2560586
                  </p>
                </div>

                <div className="sm:col-span-2 p-6 sm:p-7 bg-white/10 text-white border border-white/20 rounded-3xl flex items-center justify-between w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center backdrop-blur-sm">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#7BA4D0]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-1">
                        Verified Disclosures
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-normal">
                        All intimations are certified by our Company Secretary and Compliance Officer.
                      </p>
                    </div>
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
                      if (cardsRef.current) {
                        cardsRef.current.scrollTo({
                          left: i * cardsRef.current.clientWidth,
                          behavior: "smooth"
                        });
                      }
                    }}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      activeIndex === i ? "w-8 bg-white" : "w-2 bg-white/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
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
