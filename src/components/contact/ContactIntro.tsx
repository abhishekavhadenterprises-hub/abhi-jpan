"use client";

import React, { useRef } from "react";
import { ShieldCheck, Users, Globe, Clock, Building2, Phone, ArrowRight } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

interface ContactIntroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function ContactIntro({
  title = "Direct Engagement",
  subtitle = "Corporate Communication",
  description = "We prioritize open and transparent dialogue with our stakeholders. Our specialized technical and corporate teams are positioned to address your inquiries regarding engineering solutions, institutional partnerships, and operational capabilities with uncompromising professional rigor."
}: ContactIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const words = (title || "").trim().split(/\s+/);
  const firstLine = words.length > 1 ? words.slice(0, -1).join(" ") : words[0];
  const secondLine = words.length > 1 ? words.slice(-1).join(" ") : "";

  return (
    <section ref={containerRef} className="pt-32 pb-16 md:pt-44 md:pb-28 bg-slate-50/60 dark:bg-[#070b14] relative overflow-hidden transition-colors duration-500 border-b border-slate-200/80 dark:border-white/5">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column (7 Cols) */}
          <motion.div 
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7 space-y-6"
          >
            {/* Section Subtitle Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EBF3FC] dark:bg-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0] text-xs font-semibold uppercase tracking-wider">
              {subtitle}
            </div>

            <div className="overflow-visible">
              <ScrollWipeHeading
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                <span>{firstLine}</span> <br />
                <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0]">
                  {secondLine}
                </span>
              </ScrollWipeHeading>
            </div>
            
            <p className="text-slate-600 dark:text-silver/80 font-sans text-base md:text-lg leading-relaxed max-w-xl font-normal">
              {description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
               <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200/90 dark:border-white/10 hover:border-[#2E5E99]/40 transition-all duration-300 group flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-[#EBF3FC] dark:bg-[#2E5E99]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 group-hover:scale-105 group-hover:bg-[#0D2440] group-hover:text-white dark:group-hover:bg-[#2E5E99] dark:group-hover:text-white transition-all duration-300 shadow-sm">
                    <Users className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">Stakeholder Voice</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed font-normal">Prioritizing every shareholder and OEM inquiry with professional rigor.</p>
                  </div>
               </div>

               <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200/90 dark:border-white/10 hover:border-[#2E5E99]/40 transition-all duration-300 group flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-[#EBF3FC] dark:bg-[#2E5E99]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 group-hover:scale-105 group-hover:bg-[#0D2440] group-hover:text-white dark:group-hover:bg-[#2E5E99] dark:group-hover:text-white transition-all duration-300 shadow-sm">
                    <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">Verified Compliance</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed font-normal">Authorized governance and compliance information channels.</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Card Column (5 Cols) - Executive Operations & Connectivity Console */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl sm:rounded-[32px] bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440] dark:via-[#091829] dark:to-[#071321] border border-[#7BA4D0]/35 dark:border-[#2E5E99]/30 p-7 sm:p-8 md:p-9 text-[#0D2440] dark:text-white shadow-xl shadow-[#0D2440]/5 dark:shadow-none overflow-hidden group">
              {/* Ambient Radiant Glows */}
              <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#7BA4D0]/20 dark:bg-[#2E5E99]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 blur-3xl pointer-events-none" />
              
              {/* Top Hairline Accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#7BA4D0]/60 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-2 leading-tight">
                  Corporate <br />
                  <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0]">
                    Connectivity Hub
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal mb-6">
                  Direct bridge between institutional stakeholders, global OEMs, and our executive engineering leadership.
                </p>

                {/* 2x2 Architectural Metric Grid - Simplified & Reduced for Quick Understanding */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-white/[0.06] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/40 backdrop-blur-md transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-1 text-[#2E5E99] dark:text-[#7BA4D0]">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="text-base sm:text-lg font-heading font-black text-[#0D2440] dark:text-white leading-tight">&lt; 24h</span>
                    </div>
                    <p className="text-xs text-[#0D2440]/70 dark:text-silver/70 font-normal">Response Time</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-white/[0.06] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/40 backdrop-blur-md transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-1 text-[#2E5E99] dark:text-[#7BA4D0]">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span className="text-base sm:text-lg font-heading font-black text-[#0D2440] dark:text-white leading-tight">6 Plants</span>
                    </div>
                    <p className="text-xs text-[#0D2440]/70 dark:text-silver/70 font-normal">Pan-India Grid</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-white/[0.06] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/40 backdrop-blur-md transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-1 text-[#2E5E99] dark:text-[#7BA4D0]">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span className="text-base sm:text-lg font-heading font-black text-[#0D2440] dark:text-white leading-tight">IATF 16949</span>
                    </div>
                    <p className="text-xs text-[#0D2440]/70 dark:text-silver/70 font-normal">Certified Quality</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-white/[0.06] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/40 backdrop-blur-md transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-1 text-[#2E5E99] dark:text-[#7BA4D0]">
                      <Globe className="w-4 h-4 shrink-0" />
                      <span className="text-base sm:text-lg font-heading font-black text-[#0D2440] dark:text-white leading-tight">Direct Desk</span>
                    </div>
                    <p className="text-xs text-[#0D2440]/70 dark:text-silver/70 font-normal">Official Channels</p>
                  </div>
                </div>

                {/* Quick Direct Actions */}
                <div className="pt-3 border-t border-[#7BA4D0]/25 dark:border-white/10 flex flex-col sm:flex-row gap-3">
                  <a 
                    href="#enquiry-form"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#2E5E99] hover:bg-[#1A365D] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-[#2E5E99]/20 cursor-pointer"
                  >
                    <span>Initiate Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="tel:+911202560586"
                    className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 dark:bg-white/10 text-[#0D2440] dark:text-white border border-[#7BA4D0]/35 dark:border-white/15 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                    <span>Call Board</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
