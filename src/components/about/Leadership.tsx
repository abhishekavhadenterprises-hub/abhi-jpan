"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, ChevronRight } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

interface LeaderDossier {
  id: string;
  name: string;
  prefixName: string;
  role: string;
  image: string;
  directiveQuote: string;
  bioP1: string;
  bioP2: string;
}

const leadersData: LeaderDossier[] = [
  {
    id: "jignesh-panchal",
    name: "Mr. Jignesh Panchal",
    prefixName: "Mr. Jignesh Panchal",
    role: "Founder & Managing Director",
    image: "/leader_1.png",
    directiveQuote: "“Every manufacturing process must begin and end with the customer's exacting standard.”",
    bioP1: "The evolution of global precision requirements has redefined what industrial partners demand. At J Pan, customer satisfaction is not a downstream checkpoint—it is the foundational constraint that governs our metallurgy, toolmaking, robotic bending, and zero-defect mass spectrometry testing.",
    bioP2: "From our beginnings as a precision startup to a pan-India network of 6 advanced facilities, our growth has been driven by a relentless focus on engineering integrity and exceeding OEM tolerances.",
  },
  {
    id: "jugal-panchal",
    name: "Mr. Jugal Jignesh Panchal",
    prefixName: "Mr. Jugal Jignesh Panchal",
    role: "Whole-time Director",
    image: "/leader_2.png",
    directiveQuote: "“Replacing operational variability with deterministic robotic accuracy guarantees micron-level fidelity.”",
    bioP1: "Modern automotive and HVAC manufacturing demands absolute cycle repeatability. By integrating real-time laser SPC monitoring, multi-axis robotic bending, and automated induction brazing, we eliminate human variability across high-volume production.",
    bioP2: "Overseeing multi-plant operations, our mission is to deliver zero downtime for Tier-1 assembly lines through synchronized just-in-time delivery and uncompromising metallurgical integrity.",
  },
  {
    id: "dina-panchal",
    name: "Mrs. Dina Panchal",
    prefixName: "Mrs. Dina Panchal",
    role: "Whole-time Director",
    image: "/leader_3.png",
    directiveQuote: "“Our people and sustainability commitments are the real engines driving our manufacturing excellence.”",
    bioP1: "Industrial leadership is far more than machine capacity—it is about cultivating institutional trust, empowering a 1,200+ skilled workforce, and embedding rigorous ethical and environmental governance into daily manufacturing life.",
    bioP2: "Guiding our ESG roadmaps, we have transitioned our flagship facilities to solar rooftop power, closed-loop scrap remelting, and zero liquid discharge, ensuring our industrial growth protects tomorrow's environment.",
  },
  {
    id: "navneet-bhardwaj",
    name: "Mr. Navneet Bhardwaj",
    prefixName: "Mr. Navneet Bhardwaj",
    role: "Whole-time Director",
    image: "/leader_1.png",
    directiveQuote: "“Partnering with global OEMs means co-engineering critical solutions before challenges reach the factory floor.”",
    bioP1: "Deep technical alignment with Tier-1 automotive and HVAC OEMs has enabled J Pan to transition from a trusted component manufacturer into an indispensable end-to-end engineering partner for high-pressure fluid systems.",
    bioP2: "Leading commercial strategy and global market penetration, we ensure our clients receive specialized metallurgy, tailored logistical pipelines, and dedicated localized engineering support across all regions.",
  },
];

export function Leadership() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default is null so without hover, no detail data is shown
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="leadership"
      ref={containerRef}
      className="relative pt-20 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 bg-[#F8FAFC] dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden"
    >
      {/* Background Subtle Tech Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      {/* Expanded Container Width to Acquire Left & Right Space and Enlarge Images */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          <div>
            <ScrollWipeHeading
              as="h2"
              className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white max-w-2xl"
            >
              Leadership driving <br />
              <span className="text-[#2563EB] dark:text-[#7BA4D0] font-light italic">
                institutional excellence.
              </span>
            </ScrollWipeHeading>
          </div>

          <p className="text-xs sm:text-base md:text-lg text-[#0D2440]/75 dark:text-white/75 font-light leading-relaxed max-w-md">
            Decades of specialized engineering mastery directing over 65,000 MT of annual production capacity across 6 facilities.
          </p>
        </motion.div>

        {/* 4 Cards Row: Reduced card height matching user's marked bounds */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="flex flex-col lg:flex-row gap-4 sm:gap-5 min-h-[440px] lg:h-[485px] xl:h-[495px] w-full items-stretch"
        >
          {leadersData.map((leader, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <motion.div
                key={leader.id}
                layout
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(isHovered ? null : idx)}
                transition={{
                  layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 flex flex-col lg:flex-row ${
                  isHovered
                    ? "flex-[3.5] lg:flex-[3.8] bg-white dark:bg-[#0A1626] shadow-2xl border-2 border-[#2563EB] dark:border-[#7BA4D0] ring-2 ring-[#2563EB]/15"
                    : isAnyHovered
                    ? "flex-[0.8] lg:flex-[0.85] bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-md group"
                    : "flex-1 bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-lg group"
                }`}
              >
                {/* 1. LEFT PORTION: EXECUTIVE PORTRAIT (Large Previous Image Card Design) */}
                <div
                  className={`relative overflow-hidden shrink-0 transition-all duration-500 ${
                    isHovered
                      ? "w-full lg:w-[280px] xl:w-[320px] h-[280px] sm:h-[320px] lg:h-full rounded-2xl lg:rounded-l-3xl lg:rounded-r-none"
                      : "w-full h-full absolute inset-0"
                  }`}
                >
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    priority={idx === 0}
                    className={`object-cover object-top filter contrast-105 transition-all duration-700 ease-out ${
                      isHovered ? "scale-100" : "group-hover:scale-105 group-hover:brightness-95"
                    }`}
                  />

                  {/* Dark Vignette Overlay for Crisp Typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

                  {/* Bottom Role & Name on Image */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 z-20 flex flex-col justify-end">
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase text-[#7BA4D0] block mb-1">
                      {leader.role}
                    </span>
                    <h3 className="text-base sm:text-lg lg:text-xl font-heading font-bold text-white leading-tight drop-shadow-md">
                      {leader.name}
                    </h3>

                    {/* Subtle Hover Cue when card is collapsed */}
                    {!isHovered && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-white/70 group-hover:text-white transition-colors">
                        <span>EXPLORE PROFILE</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. RIGHT PORTION (JUST RIGHT TO THE IMAGE): ACCESSIBLE DETAILS ONLY ON HOVER */}
                <div
                  className={`flex-1 h-full relative z-10 transition-opacity duration-300 ${
                    isHovered
                      ? "opacity-100 pointer-events-auto delay-100 px-5 sm:px-7 lg:px-8 py-4 sm:py-5 flex flex-col justify-center overflow-hidden"
                      : "opacity-0 pointer-events-none hidden lg:block lg:w-0"
                  }`}
                >
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex flex-col justify-center"
                    >
                      {/* Executive Directive Tag */}
                      <div className="flex items-center gap-2 text-[#2563EB] dark:text-[#7BA4D0] font-mono text-xs font-bold tracking-wider uppercase mb-2.5">
                        <Quote className="w-3.5 h-3.5 fill-current rotate-180" />
                        <span>EXECUTIVE DIRECTIVE</span>
                      </div>

                      {/* Editorial Directive Headline with Comfortable Scale */}
                      <h4 className="text-base sm:text-lg lg:text-xl font-heading font-black tracking-tight leading-snug text-slate-900 dark:text-white uppercase mb-3.5">
                        {leader.directiveQuote}
                      </h4>

                      {/* Detailed Bio Narrative (No text cut-off) */}
                      <div className="space-y-2.5 text-xs sm:text-[13px] lg:text-[13.5px] text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-4">
                        <p>{leader.bioP1}</p>
                        <p>{leader.bioP2}</p>
                      </div>

                      {/* Attribution Footer */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-200/80 dark:border-white/10">
                        <div className="w-5 h-0.5 bg-[#2563EB] dark:bg-[#7BA4D0] rounded-full" />
                        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 truncate">
                          {leader.name} · {leader.role}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
