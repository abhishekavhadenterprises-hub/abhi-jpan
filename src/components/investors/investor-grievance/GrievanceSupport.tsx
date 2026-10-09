"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, User, ShieldCheck, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function GrievanceSupport() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
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
    <section className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
              Support Infrastructure
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
              Direct <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
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
            <div className="px-6 py-3.5 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl flex items-center gap-3.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#E7F0FA] dark:bg-[#071321] flex items-center justify-center border border-[#7BA4D0]/30 shrink-0 text-[#2E5E99] dark:text-[#7BA4D0]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                Nodal Officer Verified
              </span>
            </div>
          </motion.div>
        </div>

        {/* 4 Support Channels Grid */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-4 md:py-0 px-1 md:px-0 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {/* Nodal Officer - Hero Card */}
            <motion.div variants={cardVariants} className="bg-gradient-to-br from-[#E7F0FA] via-[#F2F7FD] to-[#E7F0FA] dark:from-[#0D2440] dark:via-[#102D50] dark:to-[#0D2440] border border-[#7BA4D0]/40 p-8 rounded-3xl group hover:border-[#2E5E99] transition-all duration-300 relative overflow-hidden flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-sm hover:shadow-xl shadow-[#2E5E99]/5">
              <div>
                <div className="w-13 h-13 bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#2E5E99] text-[#2E5E99] dark:text-[#7BA4D0] group-hover:text-white shadow-xs">
                  <User className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-widest mb-1.5">
                  Nodal Officer
                </h4>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
                  Sunil Mehra
                </h3>
                <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed mb-6 font-normal">
                  Chief Financial Officer & Nodal Officer for Grievances
                </p>
              </div>
              
              <div className="pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider group/btn hover:text-[#2E5E99] transition-colors">
                  View Profile
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Email Support */}
            <motion.div variants={cardVariants} className="bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 p-8 rounded-3xl group hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-sm hover:shadow-xl shadow-[#2E5E99]/5">
              <div>
                <div className="w-13 h-13 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#2E5E99] text-[#2E5E99] dark:text-[#7BA4D0] group-hover:text-white shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-widest mb-1.5">
                  Email Channel
                </h4>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
                  Grievance Desk
                </h3>
                <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed mb-6 font-normal">
                  Dedicated digital channel for concern submission
                </p>
              </div>
              <div className="pt-4 border-t border-[#7BA4D0]/20">
                <a href="mailto:enquiry@jpantubular.com" className="text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline block break-all">
                  enquiry@jpantubular.com
                </a>
              </div>
            </motion.div>

            {/* Phone Support */}
            <motion.div variants={cardVariants} className="bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 p-8 rounded-3xl group hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-sm hover:shadow-xl shadow-[#2E5E99]/5">
              <div>
                <div className="w-13 h-13 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#2E5E99] text-[#2E5E99] dark:text-[#7BA4D0] group-hover:text-white shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-widest mb-1.5">
                  Voice Channel
                </h4>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
                  Support Helpline
                </h3>
                <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed mb-6 font-normal">
                  Monday to Friday (10:00 AM – 6:00 PM IST)
                </p>
              </div>
              <div className="pt-4 border-t border-[#7BA4D0]/20">
                <p className="text-xs font-heading font-bold text-[#0D2440] dark:text-white">
                  +91-120-2560586
                </p>
              </div>
            </motion.div>

            {/* Office Address */}
            <motion.div variants={cardVariants} className="bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 p-8 rounded-3xl group hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-sm hover:shadow-xl shadow-[#2E5E99]/5">
              <div>
                <div className="w-13 h-13 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:bg-[#2E5E99] text-[#2E5E99] dark:text-[#7BA4D0] group-hover:text-white shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-widest mb-1.5">
                  Physical Desk
                </h4>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white mb-2">
                  Registered Office
                </h3>
                <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed mb-6 font-normal">
                  Nodal Officer Reception, Greater Noida
                </p>
              </div>
              <div className="pt-4 border-t border-[#7BA4D0]/20">
                <p className="text-xs font-heading font-bold text-[#0D2440] dark:text-white">
                  Greater Noida, UP 201306, India
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {[0, 1, 2, 3].map((i) => (
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
                  activeIndex === i ? "w-8 bg-[#2E5E99]" : "w-2 bg-[#7BA4D0]/40"
                }`}
                aria-label={`Go to channel ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
