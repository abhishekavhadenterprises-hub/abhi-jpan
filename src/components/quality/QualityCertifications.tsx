"use client";

import React, { useRef, useState } from "react";
import { Shield, FileCheck, Globe, Award, CheckCircle2 } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const certifications = [
  {
    index: "01",
    name: "ISO 9001:2015",
    desc: "The gold standard for Quality Management Systems across the globe.",
    icon: Shield,
    tag: "QMS Standard"
  },
  {
    index: "02",
    name: "IATF 16949",
    desc: "Stringent quality requirements for the international automotive industry.",
    icon: FileCheck,
    tag: "Automotive"
  },
  {
    index: "03",
    name: "ISO 14001",
    desc: "Recognized international standard for environmental management systems.",
    icon: Globe,
    tag: "Environmental"
  },
  {
    index: "04",
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

  // Scroll Parallax Hooks for Column Alternation & Watermark Depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Alternating column vertical floating offsets
  const colYEven = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const colYOdd = useTransform(smoothProgress, [0, 1], [16, -16]);
  const watermarkY = useTransform(smoothProgress, [0, 1], [-20, 20]);

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
          <div className="mb-6 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              Recognized
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
              Quality & Accreditations
            </div>
          </div>
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

        {/* 4-Column Accreditation Emblem Plaques with Alternating Scroll Parallax */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 px-1 md:px-0 gap-5 lg:gap-6 md:overflow-visible no-scrollbar w-full"
          >
            {certifications.map((cert, idx) => (
              <motion.div 
                key={cert.index}
                variants={itemVariants}
                style={{ y: idx % 2 === 0 ? colYEven : colYOdd }}
                whileHover={{ 
                  y: -7, 
                  transition: { type: "spring", stiffness: 350, damping: 25 } 
                }}
                className="group relative bg-white dark:bg-[#0D2440]/30 hover:bg-[#E7F0FA]/40 dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-7 sm:p-8 rounded-3xl transition-colors duration-300 shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 overflow-hidden flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center cursor-default"
              >
                {/* Giant Numeric Watermark with Scroll Depth Scrub */}
                <motion.div 
                  style={{ y: watermarkY }}
                  className="absolute top-4 right-6 text-6xl font-heading font-black italic text-[#7BA4D0]/15 dark:text-white/5 group-hover:text-[#2E5E99]/20 dark:group-hover:text-[#7BA4D0]/20 transition-colors duration-500 select-none pointer-events-none"
                >
                  {cert.index}
                </motion.div>

                <div className="relative z-10 mb-8">
                  {/* Top Row: Icon Pod + Squircle Tag Badge */}
                  <div className="flex items-center justify-between mb-7">
                    <div className="w-13 h-13 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                      <cert.icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider px-3 py-1 rounded-xl bg-[#E7F0FA] dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25">
                      {cert.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors mb-3">
                    {cert.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
                    {cert.desc}
                  </p>
                </div>

                {/* Card Footer Marker */}
                <div className="pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between text-xs font-semibold relative z-10">
                  <span className="uppercase tracking-wider text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0]">
                    Verified Standard
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-[#E7F0FA] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
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
                  "h-1.5 rounded-sm transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#0D2440] dark:bg-white" : "w-1.5 bg-[#7BA4D0]/40"
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
