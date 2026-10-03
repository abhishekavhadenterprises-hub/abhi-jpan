"use client";

import React, { useRef, useState } from "react";
import { Headphones, ArrowRight, MessageSquare, ShieldCheck, Mail } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function ContactCTA({
  title = "Direct Reach Desk",
  subtitle = "Communication Support",
  description = "Ready to address your queries. Connect with our dedicated team for immediate institutional support."
}: ContactCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const titleWords = title.split(" ");
  const mainTitle = titleWords.length > 2 ? titleWords.slice(0, -2).join(" ") : titleWords.slice(0, 1).join(" ");
  const highlightedTitle = titleWords.length > 2 ? titleWords.slice(-2).join(" ") : titleWords.slice(1).join(" ");

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0a182a] dark:via-[#0d223c] dark:to-[#091524] border border-[#7BA4D0]/35 dark:border-white/10 p-8 sm:p-12 lg:p-16 group"
        >
          {/* Subtle Ambient Light Blue Glows */}
          <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Top subtle hairline */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#7BA4D0]/50 to-transparent pointer-events-none" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Content */}
            <div className="lg:col-span-6">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-[1.22] tracking-tight overflow-visible">
                <span className="inline-block">{mainTitle}</span> <br />
                <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#1B365D] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light">
                  {highlightedTitle}
                </span>
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-300 font-normal text-base md:text-lg mb-8 leading-relaxed max-w-xl">
                {description}
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => {
                    const formElement = document.getElementById("enquiry-form") || document.getElementById("digital-inquiry");
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = "/contact";
                    }
                  }}
                  className="px-8 py-4 bg-[#0D2440] hover:bg-[#1A365D] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0D2440] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] group/btn cursor-pointer"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-3 px-6 py-4 bg-white/80 dark:bg-white/[0.06] border border-[#7BA4D0]/30 dark:border-white/10 rounded-xl text-[#0D2440] dark:text-white backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-[#2E5E99]/10 dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                    <ShieldCheck className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#0D2440] dark:text-slate-200">Authorized Hub</span>
                </div>
              </motion.div>
            </div>

            {/* Right Cards */}
            <div className="lg:col-span-6 flex flex-col">
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 no-scrollbar pb-4 sm:pb-0"
              >
                {/* Email Desk Card */}
                <motion.a 
                  href="mailto:enquiry@jpantubular.com"
                  variants={itemVariants} 
                  className="p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.1] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/40 dark:hover:border-[#7BA4D0]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group/card relative overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7BA4D0]/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/15 border border-[#2E5E99]/15 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-110 transition-all duration-300 mb-5">
                    <Mail className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10">Email Desk</h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-xs relative z-10 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-white transition-colors break-all">enquiry@jpantubular.com</p>
                </motion.a>
                
                {/* Direct Support Card */}
                <motion.a 
                  href="tel:+911202560586"
                  variants={itemVariants} 
                  className="p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.1] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/40 dark:hover:border-[#7BA4D0]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group/card relative overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7BA4D0]/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/15 border border-[#2E5E99]/15 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-110 transition-all duration-300 mb-5">
                    <Headphones className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10">Direct Support</h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-xs relative z-10 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-white transition-colors">+91-120-2560586</p>
                </motion.a>
                
                {/* Official Disclosure Card */}
                <motion.div 
                  variants={itemVariants} 
                  className="sm:col-span-2 p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-white/[0.04] hover:bg-white/90 dark:hover:bg-white/[0.07] border border-[#7BA4D0]/20 dark:border-white/10 flex items-center gap-5 group hover:border-[#2E5E99]/30 transition-all duration-300 w-full shrink-0 snap-center sm:w-auto sm:shrink backdrop-blur-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/[0.08] border border-[#2E5E99]/15 dark:border-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 group-hover:scale-105 transition-all">
                    <MessageSquare className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1">Official Disclosure</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-normal text-xs leading-relaxed">Access our primary contact channels for official stakeholder engagement.</p>
                  </div>
                </motion.div>
              </div>

              {/* Dot Indicators for Mobile Scroll */}
              <div className="flex justify-center gap-2 mt-4 sm:hidden">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      activeIndex === index ? "bg-[#2E5E99] dark:bg-[#7BA4D0] w-6" : "bg-slate-300 dark:bg-white/20"
                    )}
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({
                          left: index * scrollContainerRef.current.clientWidth,
                          behavior: "smooth",
                        });
                      }
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
