"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function FinancialCTA() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < 2 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-[#0D2440] via-[#102D50] to-[#163B66] text-white border border-[#7BA4D0]/30 p-8 sm:p-12 md:p-16 lg:p-20 rounded-3xl sm:rounded-[40px] max-w-6xl mx-auto relative overflow-hidden shadow-2xl shadow-[#2E5E99]/15"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#2E5E99]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-[#7BA4D0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-heading font-black uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7BA4D0]" />
                Institutional Advisory
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-[1.12] tracking-tight">
                Dedicated <br />
                <span className="text-[#7BA4D0]">Investor Relations</span> Support
              </h2>

              <p className="text-white/75 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                For deeper technical clarification, analyst queries, or specific 
                compliance information, our dedicated investor relations desk 
                is available for professional consultation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2 items-stretch sm:items-center">
                <Link 
                  href="/contact"
                  className="px-8 py-4 bg-white text-[#0D2440] hover:bg-[#E7F0FA] font-heading font-bold text-xs uppercase tracking-[0.18em] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5 group whitespace-nowrap shadow-lg"
                >
                  <span>Contact IR Desk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/15 rounded-2xl text-white">
                  <UserCheck className="w-5 h-5 text-[#7BA4D0] shrink-0" />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider">Compliance Verified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tactile White Support Pods */}
            <div className="lg:col-span-5 flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row lg:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 lg:py-0 px-1 lg:px-0 gap-4 lg:space-y-4 lg:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                <div className="p-6 sm:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-3xl group hover:-translate-y-1 transition-all duration-300 w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center shadow-lg">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl shrink-0 text-[#2E5E99] group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0D2440]">
                      Shareholder Services
                    </h4>
                  </div>
                  <a href="mailto:enquiry@jpantubular.com" className="text-[#2E5E99] text-sm font-heading font-bold hover:underline block break-all pl-1">
                    enquiry@jpantubular.com
                  </a>
                </div>

                <div className="p-6 sm:p-7 bg-white text-[#0D2440] border border-[#7BA4D0]/30 rounded-3xl group hover:-translate-y-1 transition-all duration-300 w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center shadow-lg">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-[#E7F0FA] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl shrink-0 text-[#2E5E99] group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0D2440]">
                      Global Hotline
                    </h4>
                  </div>
                  <p className="text-[#2E5E99] text-sm font-heading font-bold pl-1">
                    +91-120-2560586
                  </p>
                </div>
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex lg:hidden items-center justify-center gap-2 mt-4 z-10">
                {[0, 1].map((i) => (
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
                    aria-label={`Go to contact card ${i + 1}`}
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
