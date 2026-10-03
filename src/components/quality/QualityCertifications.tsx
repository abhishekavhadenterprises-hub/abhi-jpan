"use client";

import React, { useRef, useState } from "react";
import { Shield, FileCheck, Globe, Award } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const certifications = [
  {
    name: "ISO 9001:2015",
    desc: "The gold standard for Quality Management Systems across the globe.",
    icon: Shield,
    tag: "QMS Standard"
  },
  {
    name: "IATF 16949",
    desc: "Stringent quality requirements for the international automotive industry.",
    icon: FileCheck,
    tag: "Automotive"
  },
  {
    name: "ISO 14001",
    desc: "Recognized international standard for environmental management systems.",
    icon: Globe,
    tag: "Environmental"
  },
  {
    name: "MSME ZED Gold",
    desc: "Zero Defect Zero Effect certification for sustainable manufacturing.",
    icon: Award,
    tag: "Zero Defect"
  }
];

export function QualityCertifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < certifications.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="certifications" 
      ref={containerRef}
      className="py-16 md:py-24 bg-white dark:bg-black transition-colors"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 overflow-visible leading-tight"
          >
            Recognized <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">Quality</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#0D2440]/75 dark:text-silver/80 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Our facilities and processes are certified by leading international 
            bodies, ensuring that your products meet the highest regulatory standards.
          </motion.p>
        </div>

        {/* Certification Cards */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 md:pt-4 md:pb-4 px-1 md:px-0 gap-5 lg:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group relative bg-[#F8FAFC] dark:bg-charcoal/40 p-7 sm:p-8 rounded-3xl border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 hover:-translate-y-2 transition-all duration-500 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EBF3FC] dark:bg-white/10 border border-[#7BA4D0]/30 flex items-center justify-center rounded-2xl group-hover:bg-[#0D2440] group-hover:text-white transition-all duration-500 shrink-0 text-[#2E5E99]">
                      <cert.icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E5E99] bg-[#EBF3FC] dark:bg-white/5 border border-[#7BA4D0]/25 px-2.5 py-1 rounded-full">
                      {cert.tag}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-3 group-hover:text-[#2E5E99] transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {cert.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {certifications.map((_, i) => (
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
                  activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
                )}
                aria-label={`Go to certification card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

