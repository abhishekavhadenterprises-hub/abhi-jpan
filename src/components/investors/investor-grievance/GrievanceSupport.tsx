"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, User, ShieldCheck, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function GrievanceSupport() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < 4 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
      <div className="container-custom relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight tracking-tight">
              Direct <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Investor Support
              </span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
             <div className="px-6 py-3.5 bg-[#F8FAFC] dark:bg-charcoal/60 border border-[#7BA4D0]/25 rounded-2xl flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center border border-[#7BA4D0]/30 shrink-0 text-[#2E5E99]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Nodal Officer Verified</span>
             </div>
          </motion.div>
        </div>

        {/* Support Cards */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {/* Nodal Officer - Hero Card */}
            <motion.div variants={cardVariants} className="bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 p-7 rounded-3xl group hover:border-[#2E5E99]/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center">
              <div>
                <div className="w-13 h-13 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] text-[#2E5E99] group-hover:text-white">
                   <User className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest mb-1.5">Nodal Officer</h4>
                <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2">Sunil Mehra</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">Chief Financial Officer & Nodal Officer for Grievances</p>
              </div>
              
              <div>
                <div className="h-px w-full bg-[#7BA4D0]/25 mb-5" />
                <button className="flex items-center gap-2 text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider group/btn hover:text-[#2E5E99] transition-colors">
                   View Certificate
                   <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Email Support */}
            <motion.div variants={cardVariants} className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 rounded-3xl group hover:border-[#2E5E99]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center">
              <div>
                <div className="w-13 h-13 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] text-[#2E5E99] group-hover:text-white">
                   <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest mb-1.5">Email Channel</h4>
                <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2">Grievance Desk</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">Dedicated digital channel for concern submission</p>
              </div>
              <div>
                <div className="h-px w-full bg-[#7BA4D0]/20 mb-5" />
                <p className="text-xs font-bold text-[#0D2440] dark:text-white tracking-wide">enquiry@jpantubular.com</p>
              </div>
            </motion.div>

            {/* Phone Support */}
            <motion.div variants={cardVariants} className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 rounded-3xl group hover:border-[#2E5E99]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center">
              <div>
                <div className="w-13 h-13 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] text-[#2E5E99] group-hover:text-white">
                   <Phone className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest mb-1.5">Voice Channel</h4>
                <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2">Support Helpline</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">Monday to Friday (10:00 AM – 6:00 PM IST)</p>
              </div>
              <div>
                <div className="h-px w-full bg-[#7BA4D0]/20 mb-5" />
                <p className="text-xs font-bold text-[#0D2440] dark:text-white tracking-wide">+91-120-2560586</p>
              </div>
            </motion.div>

            {/* Office Address */}
            <motion.div variants={cardVariants} className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 rounded-3xl group hover:border-[#2E5E99]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center">
              <div>
                <div className="w-13 h-13 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] text-[#2E5E99] group-hover:text-white">
                   <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest mb-1.5">Physical Desk</h4>
                <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2">Registered Office</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">Nodal Officer Reception, Head Quarters, Greater Noida</p>
              </div>
              <div>
                <div className="h-px w-full bg-[#7BA4D0]/20 mb-5" />
                <p className="text-xs font-bold text-[#0D2440] dark:text-white tracking-wide">Greater Noida, UP 201306, India</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-10">
            {[0, 1, 2, 3].map((i) => (
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
                aria-label={`Go to channel ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
