"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Target, ShieldCheck, Cpu } from "lucide-react";

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

// Snappy, high-impact 3D flip-out / fan-out animation variants
const flipOutVariants: Variants[] = [
  // Card 1: Flips and fans outward to the left
  {
    hidden: {
      opacity: 0,
      rotateY: 42,
      rotateZ: -5,
      x: 36,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      rotateZ: 0,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  // Card 2: Flips forward from the center
  {
    hidden: {
      opacity: 0,
      rotateX: 35,
      y: 40,
      scale: 0.88,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        delay: 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  // Card 3: Flips and fans outward to the right
  {
    hidden: {
      opacity: 0,
      rotateY: -42,
      rotateZ: 5,
      x: -36,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      rotateZ: 0,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        delay: 0.24,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
];

export function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="relative py-20 md:py-36 bg-white dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden"
    >
      <div className="container-custom relative z-10 w-full">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white mb-6">
            Precision that builds <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
              enduring global partnerships.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#0D2440]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            From a 400 sq. ft. precision workshop to an institutional manufacturing powerhouse producing over 65,000 MT
            of mission-critical tubular assemblies annually.
          </p>
        </div>

        {/* 3 Premium 3D Flip-Out Elevated Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 [perspective:1400px]"
        >
          {storyCards.map((card, idx) => (
            <motion.div
              key={card.num}
              variants={flipOutVariants[idx]}
              whileHover={{
                y: -6,
                rotateY: idx === 0 ? -4 : idx === 2 ? 4 : 0,
                transition: { duration: 0.2 },
              }}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 dark:border-white/15 transition-colors duration-300 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] flex flex-col justify-between group transform-gpu [transform-style:preserve-3d]"
            >
              <div>
                {/* Top Row: Icon + Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#E7F0FA] dark:bg-white/10 text-[#2E5E99] dark:text-[#7BA4D0] border border-[#7BA4D0]/30 dark:border-white/15 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                    <card.icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-heading font-black text-[#0D2440]/25 dark:text-white/20 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                    {card.num}
                  </span>
                </div>

                <div className="text-[10px] font-sans font-bold tracking-widest text-[#2E5E99] dark:text-[#7BA4D0] uppercase mb-2">
                  {card.tag}
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-4">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-[#0D2440]/75 dark:text-white/75 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
