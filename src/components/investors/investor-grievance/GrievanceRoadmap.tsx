"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Send, Search, CheckCircle2, Clock, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "01",
    title: "Submission",
    description: "Submit your concern via our digital portal or physical desk.",
    icon: Send,
    duration: "Day 0"
  },
  {
    id: "02",
    title: "Verification",
    description: "Our compliance team validates the concern against statutory records.",
    icon: Search,
    duration: "Day 1-3"
  },
  {
    id: "03",
    title: "Evaluation",
    description: "Impartial review of the grievance substance for resolution.",
    icon: Activity,
    duration: "Day 4-10"
  },
  {
    id: "04",
    title: "Resolution",
    description: "Official response and closure of the grievance in the IR registry.",
    icon: CheckCircle2,
    duration: "Day 11-15"
  }
];

export function GrievanceRoadmap() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
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
    if (newIndex >= 0 && newIndex < steps.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight tracking-tight">
              Resolution <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Framework Timeline
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
             <div className="px-6 py-3 bg-[#F8FAFC] dark:bg-charcoal/60 border border-[#7BA4D0]/25 rounded-2xl flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#2E5E99] shrink-0" />
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">7-15 Working Days</span>
             </div>
          </motion.div>
        </div>

        <div className="relative">
          {/* Animated Connector Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA4D0]/40 to-transparent -translate-y-1/2 origin-left hidden lg:block" 
          />
          
          {/* Roadmap Cards */}
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
              {steps.map((step) => (
                <motion.div 
                  variants={cardVariants}
                  key={step.id}
                  className="relative group w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
                >
                  <div className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-7 rounded-3xl relative z-10 hover:border-[#2E5E99]/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between overflow-hidden">
                     
                     <div className="flex items-center justify-between mb-6 relative z-10">
                        <span className="text-3xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors tracking-tight">{step.id}</span>
                        <div className="w-12 h-12 bg-white dark:bg-charcoal flex items-center justify-center rounded-2xl border border-[#7BA4D0]/30 group-hover:bg-[#0D2440] group-hover:border-[#0D2440] transition-colors shrink-0 text-[#2E5E99] group-hover:text-white">
                           <step.icon className="w-5 h-5" />
                        </div>
                     </div>
                     
                     <div>
                       <h3 className="text-lg font-heading font-bold text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] transition-colors">
                          {step.title}
                       </h3>
                       <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                          {step.description}
                       </p>
                     </div>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-[#7BA4D0]/20">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target</span>
                        <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-wider bg-[#EBF3FC] dark:bg-[#0D2440]/30 px-3 py-1 rounded-full border border-[#7BA4D0]/25">{step.duration}</span>
                     </div>
                  </div>
                </motion.div>
              ))}
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
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Verification Marker */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
           <div className="flex items-center gap-2.5 text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-[#2E5E99]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Verified Statutory Process</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
