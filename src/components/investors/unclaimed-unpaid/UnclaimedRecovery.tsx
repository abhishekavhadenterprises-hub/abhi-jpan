"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ClipboardList, FileCheck, Send, CheckCircle, ArrowRight, Download, HelpCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Verify Entitlement",
    desc: "Search the digital repository to confirm your name and folio number appear in the official unclaimed list.",
    icon: ClipboardList,
    actionText: "Verify Entitlement"
  },
  {
    title: "Document Preparation",
    desc: "Assemble required KYC evidence, certified original share certificates, and standard verification affidavits.",
    icon: FileCheck,
    actionText: "Check Checklist"
  },
  {
    title: "Submit Claim Form",
    desc: "File the statutory IEPF-5 claim through the Ministry of Corporate Affairs portal for formal asset processing.",
    icon: Send,
    actionText: "MCA Portal Login"
  },
  {
    title: "Final Verification",
    desc: "Our internal compliance desk coordinates directly with registrar agents to accelerate your payout release.",
    icon: CheckCircle,
    actionText: "Contact Desk"
  }
];

export function UnclaimedRecovery() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

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
    <section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Instructional Roadmap */}
          <div className="lg:w-7/12">

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-10 md:mb-16 leading-tight tracking-tight"
            >
              How to Claim <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Your Outstanding Assets
              </span>
            </motion.h2>

            {/* Steps Cards */}
            <div className="flex flex-col justify-between">
              <motion.div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-row lg:flex-col overflow-x-auto snap-x snap-mandatory pt-2 pb-3 lg:py-0 px-1 lg:px-0 gap-4 lg:space-y-5 lg:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full relative"
              >
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div 
                      key={step.title}
                      className="group cursor-pointer relative flex flex-col sm:flex-row gap-5 sm:gap-6 p-6 sm:p-7 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] dark:hover:bg-charcoal/60 rounded-3xl transition-all duration-300 w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center"
                    >
                      {/* Connecting line */}
                      {idx !== steps.length - 1 && (
                        <div className="absolute left-[38px] top-[80px] bottom-[-20px] w-[1.5px] bg-[#7BA4D0]/30 group-hover:bg-[#2E5E99] transition-colors z-0 hidden lg:block" />
                      )}

                      <div className="flex flex-col items-center shrink-0 z-10">
                        <div className="w-12 h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-2xl border border-[#7BA4D0]/30 transition-all duration-300 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] group-hover:text-white">
                          <Icon className="w-5 h-5 text-[#2E5E99] group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                      <div className="pt-0.5 flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-wider bg-[#EBF3FC] dark:bg-[#0D2440]/40 px-2.5 py-0.5 rounded-full border border-[#7BA4D0]/25">
                              Step 0{idx + 1}
                            </span>
                            <h3 className="text-base sm:text-lg font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
                          {step.desc}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#2E5E99] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                          {step.actionText} <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex lg:hidden items-center justify-center gap-2 mt-4 z-10">
                {steps.map((_, i) => (
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
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
 
          {/* Right: Document Checklist Sidebar */}
          <div className="lg:w-5/12">
            <div className="sticky top-28">
              <motion.div 
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0D2440]/50 dark:via-[#0D2440]/30 dark:to-charcoal/60 border border-[#7BA4D0]/35 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-white dark:bg-charcoal rounded-2xl border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99]">
                      <HelpCircle className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-widest block mb-0.5">Checklist</span>
                      <h4 className="text-base font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                        Essential Documents
                      </h4>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      "Client Master List (CML)",
                      "IEPF-5 Claim Form",
                      "Self-Attested PAN & Aadhar",
                      "Original Certificates"
                    ].map((doc, index) => (
                      <motion.li 
                        key={doc}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
                        className="flex items-center justify-between p-3.5 bg-white/80 dark:bg-charcoal/80 rounded-2xl border border-[#7BA4D0]/25 group/item hover:border-[#2E5E99]/40 transition-all"
                      >
                        <span className="text-xs font-medium text-[#0D2440] dark:text-white uppercase tracking-wider">{doc}</span>
                        <div className="w-8 h-8 bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center rounded-xl border border-[#7BA4D0]/30 text-[#2E5E99] group-hover/item:bg-[#0D2440] group-hover/item:text-white transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="p-6 bg-white/80 dark:bg-charcoal/80 rounded-2xl border border-[#7BA4D0]/25">
                    <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider mb-4 font-bold">
                      Need Help With Paperwork?
                    </p>
                    <Link 
                      href="/contact" 
                      className="w-full py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Request Support <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
