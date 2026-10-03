"use client";

import React, { useRef } from "react";
import { MessageSquare, ShieldCheck, Users, Globe } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

interface ContactIntroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function ContactIntro({
  title = "Institutional Support Hub",
  subtitle = "Direct Engagement",
  description = "We believe in open and transparent dialogue with our investors. Our dedicated Investor Relations team and Registrar are available to address your queries regarding shareholding, dividends, and statutory disclosures."
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

  return (
    <section ref={containerRef} className="pt-32 pb-16 md:pt-44 md:pb-28 bg-slate-50/60 dark:bg-[#070b14] relative overflow-hidden transition-colors duration-500 border-b border-slate-200/80 dark:border-white/5">
      {/* Background Ambient Lighting */}
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column (7 Cols) */}
          <motion.div 
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight">
              {title.split(' ').slice(0, -2).join(' ')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5E99] via-[#437ec4] to-[#7BA4D0]">
                {title.split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            
            <p className="text-slate-600 dark:text-white/70 font-sans text-base leading-relaxed max-w-xl">
              {description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
               <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0B1728] border border-slate-200/90 dark:border-white/10 hover:border-[#2E5E99]/40 transition-all duration-300 group flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#2E5E99]/10 dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                    <Users className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">Stakeholder Voice</h4>
                    <p className="text-xs text-slate-500 dark:text-white/60 font-sans leading-relaxed">Prioritizing every shareholder inquiry with professional rigor.</p>
                  </div>
               </div>

               <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0B1728] border border-slate-200/90 dark:border-white/10 hover:border-[#2E5E99]/40 transition-all duration-300 group flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#2E5E99]/10 dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                    <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">Verified Compliance</h4>
                    <p className="text-xs text-slate-500 dark:text-white/60 font-sans leading-relaxed">Information provided through official and authorized channels.</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Card Column (5 Cols) - Luxury Corporate Showcase */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 relative"
          >
            <div className="p-8 sm:p-10 md:p-12 bg-gradient-to-br from-[#0D2440] via-[#0F2A4C] to-[#081729] border border-white/15 rounded-3xl relative overflow-hidden group text-white">
               {/* Ambient Glow */}
               <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
               
               <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#7BA4D0] mb-8 group-hover:scale-105 transition-transform duration-500">
                    <Globe className="w-7 h-7" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-8 leading-tight">
                    Corporate <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E7F0FA] to-[#7BA4D0]">
                      Connectivity
                    </span>
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/15 flex items-start gap-4 transition-all duration-300 hover:bg-white/15 group/quote">
                       <span className="text-[#7BA4D0] font-heading font-bold text-xs uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 shrink-0 mt-0.5">/01</span>
                       <p className="text-xs text-white/80 leading-relaxed font-sans italic">
                         &ldquo;Seamless communication is the bedrock of institutional 
                         trust and long-term shareholder value.&rdquo;
                       </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/15 flex items-start gap-4 transition-all duration-300 hover:bg-white/15 group/quote">
                       <span className="text-[#7BA4D0] font-heading font-bold text-xs uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 shrink-0 mt-0.5">/02</span>
                       <p className="text-xs text-white/80 leading-relaxed font-sans italic">
                         &ldquo;Our Investor Relations desk ensures that every query 
                         finds a timely and authoritative response.&rdquo;
                       </p>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
