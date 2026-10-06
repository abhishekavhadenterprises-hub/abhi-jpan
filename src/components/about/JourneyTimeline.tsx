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
  const [activeIdx, setActiveIdx] = React.useState(0);

  return (
    <section
      id="journey-timeline"
      className="py-24 md:py-32 bg-[#FAFAFA] dark:bg-[#071321] transition-colors duration-300 relative border-b border-slate-200 dark:border-white/10 overflow-hidden"
    >
      <div className="w-full relative z-10">
        
        {/* Header (Constrained) */}
        <div className="container-custom max-w-7xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollWipeHeading as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-[#0D2440] dark:text-white mb-6 tracking-tight leading-[1.05]">
              Company <span className="font-light italic text-[#2E5E99] dark:text-[#7BA4D0]">Road Map</span>
            </ScrollWipeHeading>
            <p className="text-[#0D2440]/70 dark:text-white/60 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
              From a modest inception to a nationwide manufacturing powerhouse. Our growth is a testament to persistent innovation, engineering scale, and global customer trust.
            </p>
          </motion.div>
        </div>

        {/* Award-Winning Hover Grid Accordion (Full Screen Edge-to-Edge) */}
        <style dangerouslySetInnerHTML={{__html: `
          .accordion-grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: ${units.map((_, i) => i === activeIdx ? "6fr" : "1fr").join(" ")};
            transition: grid-template-rows 0.7s cubic-bezier(0.16, 1, 0.3, 1), grid-template-columns 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @media (min-width: 1024px) {
            .accordion-grid {
              grid-template-rows: 1fr;
              grid-template-columns: ${units.map((_, i) => i === activeIdx ? "6fr" : "1fr").join(" ")};
            }
          }
        `}} />
        
        <div className="accordion-grid w-full h-[85vh] lg:h-[70vh] min-h-[500px] max-h-[800px] px-4 lg:px-8 gap-2 lg:gap-3">
          {units.map((unit, idx) => {
            const isActive = activeIdx === idx;
            const Icon = unit.icon;
            
            return (
              <div
                key={unit.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end bg-white dark:bg-[#091524] border border-slate-200/80 dark:border-white/10 transition-shadow duration-700",
                  isActive ? "shadow-2xl" : "shadow-sm"
                )}
              >
                {/* Collapsed State (Visible when not active) */}
                <div 
                  className={cn(
                    "absolute inset-0 p-4 lg:p-6 flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-4 transition-opacity duration-500", 
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-200"
                  )}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 shrink-0">
                    <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <span className="font-mono text-xl lg:text-2xl font-bold text-slate-300 dark:text-white/20 lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap">
                    {unit.year}
                  </span>
                </div>

                {/* Expanded State (Visible when active) */}
                <div 
                  className={cn(
                    "absolute inset-0 p-6 lg:p-12 flex flex-col justify-end transition-opacity duration-500 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#091524] dark:via-[#091524]/90", 
                    isActive ? "opacity-100 delay-200" : "opacity-0 pointer-events-none"
                  )}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#2E5E99] dark:bg-[#7BA4D0] text-white flex items-center justify-center mb-6 shadow-xl shadow-[#2E5E99]/30 shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <span className="font-mono text-4xl sm:text-5xl font-bold text-[#2E5E99] dark:text-[#7BA4D0] mb-3">
                    {unit.year}
                  </span>
                  
                  <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#0D2440] dark:text-white mb-3 line-clamp-1 whitespace-nowrap">
                    {unit.title.split(" // ")[0]}
                  </h3>
                  
                  <span className="text-[11px] sm:text-sm font-mono tracking-widest text-slate-500 dark:text-white/40 uppercase mb-6 block line-clamp-1 whitespace-nowrap">
                    {unit.title.split(" // ")[1]} • {unit.tag}
                  </span>

                  <div className="space-y-3 opacity-90 max-w-2xl">
                    {unit.details.slice(0, 3).map((detail: string, dIdx: number) => (
                      <div key={dIdx} className="flex items-start gap-4 text-sm sm:text-base text-slate-600 dark:text-white/70 font-light min-w-[300px]">
                        <span className="w-2 h-2 rounded-full bg-[#2E5E99]/50 dark:bg-[#7BA4D0]/50 shrink-0 mt-2" />
                        <span className="line-clamp-2 leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
