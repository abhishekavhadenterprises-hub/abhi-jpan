"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { Factory, MapPin, Building2, Workflow, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const units = [
  {
    id: 1,
    title: "Unit-1 // Greater Noida, Uttar Pradesh",
    year: "1998",
    tag: "FOUNDATIONAL HUB",
    details: [
      "Incepted in 1998 in a 400 sq. ft. workshop; expanded to 2,020 sq. meters in 2002.",
      "Currently operating in an expanded 4,170 sq. meters facility.",
      "Registered as J Pan Tubular Component Pvt Ltd in 2007.",
      "Extrusion plant initiated in 2023 for brass components.",
    ],
    icon: Building2,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50/70 dark:bg-[#0D2440]",
    borderColor: "border-blue-200 dark:border-blue-900/50",
    hoverBorder: "hover:border-blue-500 dark:hover:border-blue-400",
    hoverBg: "group-hover:bg-blue-600",
    offset: "translate-x-0",
  },
  {
    id: 2,
    title: "Unit-2 // Pune, Maharashtra",
    year: "2009",
    tag: "WESTERN AUTOMOTIVE CLUSTER",
    details: [
      "Commercial operations commenced in 2009.",
      "Dedicated high-volume copper tubular manufacturing for Tier-1 HVAC OEMs.",
      "Currently operating in a 5,500 sq. meters facility.",
    ],
    icon: Factory,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50/70 dark:bg-[#0D2440]",
    borderColor: "border-indigo-200 dark:border-indigo-900/50",
    hoverBorder: "hover:border-indigo-500 dark:hover:border-indigo-400",
    hoverBg: "group-hover:bg-indigo-600",
    offset: "-translate-x-5 md:-translate-x-10",
  },
  {
    id: 3,
    title: "Unit-3 // Bengaluru, Karnataka",
    year: "2012",
    tag: "100% EOU EXPORT & DATA CENTERS",
    details: [
      "Export Oriented Unit (EOU) dedicated to international supply chains.",
      "Supplying copper tubes and brass components for electrical applications.",
      "Manufacturing chiller sets and cooling assemblies for hyperscale data centers.",
      "Busbar systems with aluminium and copper solid rods for power infrastructure.",
      "Operating across a 3,047 sq. meters facility.",
    ],
    icon: Workflow,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50/70 dark:bg-[#0D2440]",
    borderColor: "border-purple-200 dark:border-purple-900/50",
    hoverBorder: "hover:border-purple-500 dark:hover:border-purple-400",
    hoverBg: "group-hover:bg-purple-600",
    offset: "-translate-x-8 md:-translate-x-16",
  },
  {
    id: 4,
    title: "Unit-4 // Greater Noida, Uttar Pradesh",
    year: "2015",
    tag: "SOLAR-POWERED SUSTAINABLE FACILITY",
    details: [
      "Advanced production for HVAC units and commercial refrigeration.",
      "Manufacturing stainless-steel cluster assemblies for heavy cooling circuits.",
      "Operating in a 5,767 sq. meters facility.",
      "Pioneer in sustainable manufacturing with self-consumption solar energy arrays.",
    ],
    icon: Building2,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50/70 dark:bg-[#0D2440]",
    borderColor: "border-emerald-200 dark:border-emerald-900/50",
    hoverBorder: "hover:border-emerald-500 dark:hover:border-emerald-400",
    hoverBg: "group-hover:bg-emerald-600",
    offset: "translate-x-0",
  },
  {
    id: 5,
    title: "Unit-5 // Neemrana, Rajasthan",
    year: "2016",
    tag: "VRV & VRF THERMAL LOOPS",
    details: [
      "Initiated operations primarily for VRV and HVAC components.",
      "100% mass spectrometry helium leak verification cells.",
      "Currently operating in a 4,024 sq. meters facility.",
    ],
    icon: Factory,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50/70 dark:bg-[#0D2440]",
    borderColor: "border-orange-200 dark:border-orange-900/50",
    hoverBorder: "hover:border-orange-500 dark:hover:border-orange-400",
    hoverBg: "group-hover:bg-orange-600",
    offset: "translate-x-8 md:translate-x-16",
  },
  {
    id: 6,
    title: "Unit-6 // Sanand, Gujarat",
    year: "2023",
    tag: "MEGA MANUFACTURING HUB",
    details: [
      "Started manufacturing high-volume HVAC and copper components.",
      "Distribution and centralized hub for brass components.",
      "Currently operating in a massive 9,982 sq. meters facility.",
    ],
    icon: Building2,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50/70 dark:bg-[#0D2440]",
    borderColor: "border-cyan-200 dark:border-cyan-900/50",
    hoverBorder: "hover:border-cyan-500 dark:hover:border-cyan-400",
    hoverBg: "group-hover:bg-cyan-600",
    offset: "translate-x-5 md:translate-x-10",
  },
  {
    id: 7,
    title: "Unit-7 // Sri City, Andhra Pradesh",
    year: "2027",
    tag: "UPCOMING SOUTHERN LANDMARK",
    details: [
      "Upcoming landmark manufacturing unit in Sri City industrial corridor.",
      "Will specialize in manufacturing HVAC and advanced mobility components.",
    ],
    icon: MapPin,
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-50/70 dark:bg-[#0D2440]",
    borderColor: "border-sky-200 dark:border-sky-900/50",
    hoverBorder: "hover:border-sky-500 dark:hover:border-sky-400",
    hoverBg: "group-hover:bg-sky-600",
    offset: "translate-x-0",
  },
];


export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey-timeline"
      ref={containerRef}
      className="py-10 md:py-14 bg-white dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 overflow-hidden relative border-b border-[#7BA4D0]/20 dark:border-white/10"
    >
      <div className="container-custom relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
          <ScrollWipeHeading as="h2" className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Company{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5E99] via-[#4A7BB0] to-[#7BA4D0]">
              Road Map
            </span>
          </ScrollWipeHeading>

          <p className="text-[#0D2440]/70 dark:text-white/70 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            From a modest inception to a nationwide manufacturing powerhouse. Our timeline is a testament to persistent
            innovation, engineering scale, and global customer trust.
          </p>
        </div>

        {/* Roadmap Container */}
        <div className="relative">
          {/* Animated SVG Path (Winding Road) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[110px] md:w-[160px] pointer-events-none opacity-30 dark:opacity-20 hidden md:block">
            <svg viewBox="0 0 100 800" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <path
                d="M50 0 C50 100, 20 150, 20 250 C20 350, 80 450, 80 550 C80 650, 50 700, 50 800"
                fill="none"
                stroke="currentColor"
                strokeWidth="15"
                className="text-slate-300 dark:text-white/10"
              />
              <motion.path
                d="M50 0 C50 100, 20 150, 20 250 C20 350, 80 450, 80 550 C80 650, 50 700, 50 800"
                fill="none"
                stroke="currentColor"
                strokeWidth="15"
                strokeDasharray="1 0"
                style={{ pathLength }}
                className="text-[#2E5E99] dark:text-[#7BA4D0]"
              />
            </svg>
          </div>

          {/* Unit Milestone List - Compact Spacing for Smooth, Effortless Scrolling */}
          <div className="space-y-5 sm:space-y-6 md:space-y-7 relative">
            {units.map((unit, idx) => (
              <div
                key={unit.id}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-6 md:gap-0",
                  idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Content Side */}
                <div className="flex-1 w-full flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "p-5 sm:p-6 md:p-7 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1.5 group w-full max-w-[480px] shadow-sm hover:shadow-md",
                      unit.bgColor,
                      unit.borderColor,
                      unit.hoverBorder
                    )}
                  >
                    <div className="flex items-start gap-3.5 sm:gap-5">
                      {/* Icon container */}
                      <div
                        className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border border-current/15 group-hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-white/10",
                          unit.color,
                          unit.hoverBg
                        )}
                      >
                        <unit.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className={cn(
                              "text-xs sm:text-xs font-black uppercase tracking-[0.2em] font-heading",
                              unit.color
                            )}
                          >
                            Established {unit.year}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-heading tracking-wider text-[#0D2440]/50 dark:text-white/50 uppercase font-semibold">
                            {unit.tag}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 sm:mb-3 leading-snug">
                          {unit.title}
                        </h3>

                        <ul className="space-y-2 sm:space-y-2.5">
                          {unit.details.map((detail, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/80 leading-relaxed font-normal"
                            >
                              <span
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full shrink-0 mt-1.5",
                                  idx % 2 === 0 ? "bg-[#2E5E99] dark:bg-[#7BA4D0]" : "bg-[#4A7BB0] dark:bg-[#7BA4D0]"
                                )}
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Road Connector (Center) */}
                <div className={cn("relative z-20 flex justify-center w-10 md:w-24 shrink-0", unit.offset)}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-white dark:bg-[#071321] border-4 border-[#2E5E99] dark:border-[#7BA4D0] rounded-full flex items-center justify-center shadow-sm"
                  >
                    <div className="w-2 h-2 bg-[#0D2440] dark:bg-[#7BA4D0] rounded-full" />
                  </motion.div>
                </div>

                {/* Empty Side for balancing on desktop */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Subtle Watermark Text */}
      <div className="absolute right-0 top-1/4 opacity-[0.03] dark:opacity-[0.05] rotate-90 origin-right select-none pointer-events-none hidden lg:block">
        <span className="text-[15rem] font-heading font-black tracking-tighter text-[#0D2440] dark:text-white uppercase">
          LEGACY
        </span>
      </div>
    </section>
  );
}
