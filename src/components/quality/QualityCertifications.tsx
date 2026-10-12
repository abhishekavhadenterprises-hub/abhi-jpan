"use client";

import React, { useRef, useState } from "react";
import { Shield, FileCheck, Globe, Award, CheckCircle2 } from "lucide-react";
import { motion, useInView, useMotionValue, useMotionTemplate, Variants } from "framer-motion";
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

function CertificationCard({ cert, itemVariants }: { cert: typeof certifications[0]; itemVariants: Variants }) {
  const boundingRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const bgSpotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(46, 94, 153, 0.12), transparent 80%)`;
  const bgBorder = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(46, 94, 153, 0.45), transparent 80%)`;

  return (
    <motion.div
      ref={boundingRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ 
        y: -6, 
        transition: { duration: 0.25, ease: "easeOut" } 
      }}
      className="group relative bg-white dark:bg-[#091524] border border-slate-200/80 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-[#2E5E99]/8 overflow-hidden flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center cursor-default h-full"
    >
      {/* Dynamic Spotlight Background (From OurStory) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bgSpotlight }}
      />
      
      {/* Dynamic Border Glow (From OurStory) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: bgBorder,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-10 mb-6 sm:mb-8">
        {/* Top Row: Icon Pod + Squircle Tag Badge */}
        <div className="flex items-center justify-between mb-5 sm:mb-7">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
            <cert.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/25 dark:border-white/15 truncate">
            {cert.tag}
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors mb-2 sm:mb-3">
          {cert.name}
        </h3>
        
        <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed font-normal">
          {cert.desc}
        </p>
      </div>

      {/* Card Footer Marker */}
      <div className="pt-3.5 sm:pt-4 border-t border-[#7BA4D0]/20 dark:border-white/10 flex items-center justify-between text-xs font-semibold relative z-10">
        <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] truncate">
          Verified Standard
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#E7F0FA] dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} />
        </div>
      </div>
    </motion.div>
  );
}

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Scroll-Based Content Reveal Animation
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 45, 
      scale: 0.94,
      filter: "blur(6px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1] 
      },
    },
  };

  return (
    <section 
      id="certifications" 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 bg-white dark:bg-black transition-colors"
    >
      <div className="container-custom px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
          <div className="mb-4 sm:mb-6 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              Recognized
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight">
              Quality & Accreditations
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#0D2440]/75 dark:text-silver/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Our facilities and processes are certified by leading international 
            bodies, ensuring that your products meet the highest regulatory standards.
          </motion.p>
        </div>

        {/* 4-Column Accreditation Bento Grid with Clean Level Alignment */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 px-1 md:px-0 gap-5 lg:gap-6 md:overflow-visible no-scrollbar w-full"
          >
            {certifications.map((cert) => (
              <CertificationCard key={cert.index} cert={cert} itemVariants={itemVariants} />
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
