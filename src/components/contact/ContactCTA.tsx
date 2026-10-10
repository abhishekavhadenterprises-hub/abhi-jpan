"use client";

import React, { useRef, useState } from "react";
import { Headphones, ArrowRight, MessageSquare, ShieldCheck, Mail } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

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
          className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440] dark:via-[#091829] dark:to-[#071321] border border-[#7BA4D0]/35 dark:border-[#2E5E99]/30 p-8 sm:p-12 lg:p-16 group shadow-xl shadow-[#0D2440]/5 dark:shadow-none"
        >
          {/* Subtle Ambient Light Orbs */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#7BA4D0]/20 dark:bg-[#2E5E99]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#2E5E99]/15 dark:bg-[#7BA4D0]/10 blur-3xl pointer-events-none" />

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
              <div className="mb-6 overflow-visible">
                <ScrollWipeHeading
                  as="h2"
                  className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] tracking-tight block"
                  revealedColor="currentColor"
                  wipingColor="#2E5E99"
                  unrevealedColor="rgba(148, 163, 184, 0.4)"
                >
                  <span className="inline-block">{mainTitle}</span> <br />
                  <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0]">
                    {highlightedTitle}
                  </span>
                </ScrollWipeHeading>
              </div>
              
              <motion.p variants={itemVariants} className="text-slate-600 dark:text-silver/80 font-normal text-base md:text-lg mb-8 leading-relaxed max-w-xl">
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
                  className="px-8 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] dark:bg-[#2E5E99] dark:hover:bg-[#1A365D] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 hover:-translate-y-0.5 shadow-md shadow-[#0D2440]/15 group/btn cursor-pointer"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-3 px-5 py-3 bg-white/80 dark:bg-white/[0.06] border border-[#7BA4D0]/30 dark:border-white/10 rounded-xl text-[#0D2440] dark:text-white backdrop-blur-md shadow-sm">
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
                  className="p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#070b14]/80 hover:bg-white dark:hover:bg-[#0a1120] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/50 dark:hover:border-[#7BA4D0]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group/card relative overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink block shadow-sm hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7BA4D0]/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/20 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-105 group-hover/card:bg-[#0D2440] group-hover/card:text-white dark:group-hover/card:bg-[#2E5E99] dark:group-hover/card:text-white transition-all duration-300 mb-5 shadow-sm">
                    <Mail className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10">Email Desk</h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-xs relative z-10 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-white transition-colors break-all">enquiry@jpantubular.com</p>
                </motion.a>
                
                {/* Direct Support Card */}
                <motion.a 
                  href="tel:+911202560586"
                  variants={itemVariants} 
                  className="p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#070b14]/80 hover:bg-white dark:hover:bg-[#0a1120] border border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#2E5E99]/50 dark:hover:border-[#7BA4D0]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group/card relative overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink block shadow-sm hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7BA4D0]/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/20 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-105 group-hover/card:bg-[#0D2440] group-hover/card:text-white dark:group-hover/card:bg-[#2E5E99] dark:group-hover/card:text-white transition-all duration-300 mb-5 shadow-sm">
                    <Headphones className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10">Direct Support</h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-xs relative z-10 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-white transition-colors">+91-120-2560586</p>
                </motion.a>
                
                {/* Official Disclosure Card */}
                <motion.div 
                  variants={itemVariants} 
                  className="sm:col-span-2 p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-[#070b14]/60 hover:bg-white/90 dark:hover:bg-[#0a1120] border border-[#7BA4D0]/20 dark:border-white/10 flex items-center gap-5 group hover:border-[#2E5E99]/40 transition-all duration-300 w-full shrink-0 snap-center sm:w-auto sm:shrink backdrop-blur-xl shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/20 dark:border-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 group-hover:scale-105 transition-all shadow-sm">
                    <MessageSquare className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1">Official Disclosure</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-normal text-xs leading-relaxed">Access our primary contact channels for official stakeholder engagement.</p>
                  </div>
                </motion.div>
              </div>

              {/* Dot Indicators for Mobile Scroll */}
              <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-1.5 rounded-sm transition-all duration-300",
                      activeIndex === index ? "bg-[#2E5E99] dark:bg-[#7BA4D0] w-6" : "bg-slate-300 dark:bg-white/20 w-2"
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
