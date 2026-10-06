"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Target, ShieldCheck, Cpu } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const storyCards = [
  {
    icon: Target,
    num: "01",
    tag: "AGILE OEM ALIGNMENT",
    title: "Core Mission",
    description:
      "To be competitive in cost, quality, and delivery while staying highly responsive to customers in the HVAC, Refrigeration, and Transportation sectors through innovation and empowering people.",
  },
  {
    icon: ShieldCheck,
    num: "02",
    tag: "ZERO-DEFECT INTEGRITY",
    title: "Trusted Components",
    description:
      "From brass flare nuts and copper tubular assemblies to advanced machined components, our products are trusted by leading data center, air conditioning, and refrigeration brands worldwide.",
  },
  {
    icon: Cpu,
    num: "03",
    tag: "6 ROBOTIC FACILITIES",
    title: "Evolving Capabilities",
    description:
      "Driven by advanced technology, robust quality systems, and customer-centric manufacturing, we continue to expand our capabilities to meet the evolving demands of global OEM industries.",
  },
];

function GodlySpotlightCard({ card, idx }: { card: any; idx: number }) {
  const boundingRef = useRef<HTMLDivElement>(null);
  
  // 1. Hover Coordinates for Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 2. Coordinates for 3D Tilt (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    
    // For Spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    
    // For Tilt
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bgSpotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(46, 94, 153, 0.08), transparent 80%)`;
  const bgBorder = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(46, 94, 153, 0.4), transparent 80%)`;

  return (
    <motion.div
      ref={boundingRef}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-8 sm:p-10 rounded-[2rem] bg-white dark:bg-[#091524] border border-slate-200/60 dark:border-white/5 shadow-lg flex flex-col justify-between group cursor-crosshair overflow-visible transition-colors duration-500"
    >
      {/* 1. Dynamic Spotlight Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: bgSpotlight,
        }}
      />
      
      {/* 2. Dynamic Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: bgBorder,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {/* Top Row: Icon + Number */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-white/[0.02] text-[#2E5E99] dark:text-[#7BA4D0] border border-slate-200 dark:border-white/10 group-hover:bg-[#2E5E99] group-hover:border-[#2E5E99] group-hover:text-white transition-all duration-500 shadow-sm">
            <card.icon className="w-5 h-5" />
          </div>
          <span className="text-3xl font-mono font-black text-slate-200 dark:text-white/5 group-hover:text-[#2E5E99]/20 dark:group-hover:text-[#7BA4D0]/20 transition-colors duration-500">
            {card.num}
          </span>
        </div>

        <div className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase mb-4">
          {card.tag}
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-[#0D2440] dark:text-white mb-4 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
          {card.title}
        </h3>

        <p className="text-sm sm:text-[15px] text-[#0D2440]/70 dark:text-white/60 font-medium leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

export function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#FAFAFA] dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden perspective-[2000px]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black dark:bg-white" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-black dark:bg-white" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black dark:bg-white" />
      </div>

      <div className="container-custom relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <ScrollWipeHeading as="h2" className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-[#0D2440] dark:text-white mb-6">
            Precision that builds <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
              enduring global partnerships.
            </span>
          </ScrollWipeHeading>

          <p className="text-base sm:text-lg text-[#0D2440]/75 dark:text-white/75 font-medium leading-relaxed max-w-2xl mx-auto">
            From a 400 sq. ft. precision workshop to an institutional manufacturing powerhouse producing over 65,000 MT
            of mission-critical tubular assemblies annually.
          </p>
        </div>

        {/* 3 Premium Godly Grid Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          style={{ perspective: "1200px" }}
        >
          {storyCards.map((card, idx) => (
            <GodlySpotlightCard key={card.num} card={card} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
