"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ClipboardList, FileCheck, Send, CheckCircle, ArrowRight, ArrowUpRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Verify Entitlement",
    desc: "Search the digital repository to confirm your name and folio number appear in the official unclaimed list.",
    icon: ClipboardList,
    actionText: "Search Folio",
    href: "#unclaimed-table"
  },
  {
    step: "02",
    title: "Document Preparation",
    desc: "Assemble required KYC evidence, certified original share certificates, and standard verification affidavits.",
    icon: FileCheck,
    actionText: "View Checklist",
    href: "/contact"
  },
  {
    step: "03",
    title: "Submit Claim Form",
    desc: "File the statutory IEPF-5 claim through the Ministry of Corporate Affairs portal for formal asset processing.",
    icon: Send,
    actionText: "MCA Portal Login",
    href: "https://www.iepf.gov.in"
  },
  {
    step: "04",
    title: "Final Verification",
    desc: "Our internal compliance desk coordinates directly with registrar agents to accelerate your payout release.",
    icon: CheckCircle,
    actionText: "Contact Desk",
    href: "/contact"
  }
];

export function UnclaimedRecovery() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < steps.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-18 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
              Sequential Recovery Protocol
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
              4-Step Shareholder <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Recovery Pathway
              </span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#0D2440]/70 dark:text-white/65 text-sm sm:text-base leading-relaxed font-normal max-w-md"
          >
            Follow this clear step-by-step roadmap to establish shareholder entitlement 
            and complete the formal claim transmission with the IEPF Authority.
          </motion.p>
        </div>

        {/* 4-Step Interactive Horizontal Flow Ribbon */}
        <div className="relative">
          {/* Subtle Connecting Desktop Track Line */}
          <div className="hidden lg:block absolute top-[52px] left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-[#2E5E99]/20 via-[#7BA4D0]/40 to-[#2E5E99]/20 z-0" />

          <div className="flex flex-col justify-between w-full relative z-10">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pt-2 pb-4 lg:py-0 px-1 lg:px-0 gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {steps.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-white dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-7 sm:p-8 rounded-3xl hover:-translate-y-1.5 transition-all duration-300 w-full min-w-full sm:min-w-[320px] lg:min-w-0 lg:w-full shrink-0 snap-center flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
                >
                  {/* Giant Step Numeric Watermark */}
                  <div className="absolute top-4 right-6 text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/20 transition-colors duration-500 select-none pointer-events-none">
                    {item.step}
                  </div>

                  <div className="relative z-10">
                    {/* Step Icon Pod & Step Pill */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-13 h-13 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25">
                        Step {item.step}
                      </span>
                    </div>

                    <h4 className="text-xl font-heading font-black text-[#0D2440] dark:text-white mb-3 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal mb-8">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] hover:text-[#0D2440] dark:hover:text-white uppercase tracking-wider transition-colors"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="w-7 h-7 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            <div className="flex lg:hidden items-center justify-center gap-2 mt-6 z-10">
              {steps.map((_, i) => (
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
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
