"use client";

import React, { useRef, useState } from "react";
import { ShieldCheck, Scale, FileText, CheckCircle2, AlertCircle, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatementOfDeviationsNote() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Header Side */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 md:mb-8 leading-tight tracking-tight">
              Regulatory <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Adherence Note
              </span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
              J Pan Tubular Components Limited maintains absolute transparency in fund utilization. 
              Our Statement of Deviations is prepared in accordance with 
              Regulation 32 of SEBI (LODR) Regulations, 2015, ensuring 
              that any variance from planned expenditure is disclosed with 
              technical precision.
            </p>
            
            <div className="space-y-3.5">
              <div className="flex items-center gap-3.5 p-4 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl group hover:border-[#2E5E99]/50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#2E5E99] shrink-0" />
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Certified Fund Utilization
                </span>
              </div>
              <div className="flex items-center gap-3.5 p-4 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl group hover:border-[#2E5E99]/50 transition-colors">
                <AlertCircle className="w-5 h-5 text-[#2E5E99] shrink-0" />
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Materiality Disclosure Protocol
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cards Side */}
          <div className="lg:col-span-7 relative w-full">
            <div className="flex flex-col justify-between w-full">
              <div 
                ref={cardsRef}
                onScroll={handleMobileScroll}
                className="flex flex-row md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-6 md:pt-4 md:pb-6 px-1 md:px-0 gap-4 md:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="p-6 sm:p-7 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all group w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] mb-5 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] group-hover:text-white transition-colors">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-widest mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Statutory Basis
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Reporting based on SEBI Circulars for monitoring fund utilization and providing explanations for any deviations.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-6 sm:p-7 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all group md:translate-y-4 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] mb-5 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] group-hover:text-white transition-colors">
                    <ScrollText className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-widest mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Verification Loop
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Statements are reviewed by the Audit Committee and subsequently filed with Stock Exchanges (NSE/BSE).
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-6 sm:p-7 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all group w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] mb-5 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-widest mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Disclosure Frequency
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Quarterly disclosures maintained until funds are fully utilized for the objects stated in the offer document.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="p-6 sm:p-7 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-3xl hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all group md:translate-y-4 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] mb-5 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] group-hover:text-white transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-widest mb-2 group-hover:text-[#2E5E99] transition-colors">
                    Ethical Governance
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Upholding fiduciary duties to shareholders through accurate and timely financial resource disclosures.
                  </p>
                </motion.div>
              </div>

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
                    aria-label={`Go to note card ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
