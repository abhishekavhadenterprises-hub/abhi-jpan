"use client";

import React, { useRef } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Image from "next/image";
import { Star } from "lucide-react";
import DriftWall from "@/components/ui/DriftWall";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface TestimonialCard {
  type: "review";
  id: string;
  rating: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  award?: string;
}

export interface PhotoCard {
  type: "photo";
  id: string;
  image: string;
  title: string;
}

export type StreamItem = TestimonialCard | PhotoCard;

export const allStreamItems: StreamItem[] = [
  {
    type: "review",
    id: "haier-2025",
    rating: 5,
    quote:
      "J Pan's zero-leak copper tubular assemblies have maintained 100% compliance across our high-efficiency refrigeration production cycles. Their micron CNC bending tolerance is best-in-class.",
    author: "Haier Quality Council",
    role: "OEM Evaluation Board",
    company: "Haier Appliances",
    award: "Best Quality Award · 2025",
  },
  {
    type: "review",
    id: "bluestar-2022",
    rating: 5,
    quote:
      "Exceptional consistency in CNC machined brass flare nuts and distribution manifolds. Zero defect deliveries over multiple fiscal quarters with dependable JIT delivery schedules.",
    author: "Procurement & Quality Head",
    role: "Central Sourcing",
    company: "Blue Star Limited",
    award: "Best Supplier Award · 2022",
  },
  {
    type: "photo",
    id: "photo-cnc",
    image: "/manufacturing_floor.png",
    title: "High-throughput Automated CNC Bending & Tooling",
  },
  {
    type: "review",
    id: "danfoss-2024",
    rating: 5,
    quote:
      "Outstanding adherence to strict delivery timelines for critical thermal loops. J Pan stands out for prompt engineering support and flawless helium leak integrity testing under 10⁻⁸ mbar·l/s.",
    author: "Supply Chain Operations",
    role: "Climate Solutions Division",
    company: "Danfoss",
    award: "On Time Delivery Award · 2024",
  },
  {
    type: "photo",
    id: "photo-testing",
    image: "/quality_precision.png",
    title: "100% Helium Mass Spectrometry & Metrology Lab",
  },
  {
    type: "review",
    id: "samsung-ehs",
    rating: 5,
    quote:
      "Commendable adherence to Environmental, Health, Safety (EHS) protocols and clean manufacturing standards. Their automated facility sets an industry benchmark for precision manufacturing.",
    author: "Vendor Quality Assurance",
    role: "Manufacturing Audit Team",
    company: "Samsung",
    award: "EHS Activities Appreciation",
  },
  {
    type: "photo",
    id: "photo-infra",
    image: "/images/infrastructure.png",
    title: "Robotic Induction Brazing & Automated Production Cell",
  },
  {
    type: "review",
    id: "lg-sps",
    rating: 5,
    quote:
      "Achieved Level 4 in Synchronized Production System audits. J Pan's disciplined manufacturing process and multi-axis CNC tooling guarantee consistent micron-level dimensional yields.",
    author: "Manufacturing Excellence Audit",
    role: "Global Production Strategy",
    company: "LG Electronics",
    award: "SPS Level 4 Certified",
  },
  {
    type: "review",
    id: "wabtec-2018",
    rating: 5,
    quote:
      "High-endurance stainless steel tubular components engineered for severe operating environments and extreme vibration transit lines with zero field failures.",
    author: "Locomotive Engineering Lead",
    role: "Strategic Component Sourcing",
    company: "Wabtec Corporation",
    award: "Supplier Excellence Award",
  },
  {
    type: "photo",
    id: "photo-neemrana",
    image: "/engineering_precision_facility_1778657209621.png",
    title: "Neemrana Precision Manufacturing Hub · DMIC Corridor",
  },
  {
    type: "review",
    id: "daikin-oem",
    rating: 5,
    quote:
      "Industry-leading helium mass spectrometry leak testing ensuring 100% reliability in our variable refrigerant volume applications. Unmatched engineering collaboration.",
    author: "Technical Operations Board",
    role: "HVAC Engineering Lead",
    company: "Daikin India",
    award: "Zero Defect Vendor 2024",
  },
  {
    type: "photo",
    id: "photo-sanand",
    image: "/premium_infrastructure_facility_1778674475991.png",
    title: "Sanand Unit · Tier-1 High-Volume Production Cell",
  },
];

export function Certifications() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Deceleration curve approaching -71% to bleed off velocity naturally
  const rawX = useTransform(scrollYProgress, [0, 0.7, 0.88, 0.96, 1], [0, -55, -68.5, -71, -71]);

  // Spring physics with tuned damping (drag/friction) for a luxurious, cinematic stop
  const smoothX = useSpring(rawX, {
    stiffness: 90,
    damping: 26, // Viscous drag that brings the cards to a silky, gradual halt
    mass: 0.5,
  });

  const x = useTransform(smoothX, (v) => `${v}%`);
  
  // Clean, responsive header fade & subtle slide without fighting scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.85, 1, 1, 0.85]);

  return (
    <section
      id="awards-recognition"
      ref={targetRef}
      className="relative h-[280vh] bg-transparent text-[#111] dark:text-white"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-b border-[#E5E5E5]/50 dark:border-[#222]/50">
        
        {/* Section Header */}
        <motion.div 
          style={{ opacity: headerOpacity }}
          className="max-w-[1400px] mx-auto px-6 md:px-12 relative w-full mb-8 sm:mb-10 text-center flex flex-col items-center pointer-events-none"
        >
          <ScrollWipeHeading as="h2" className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.08] uppercase whitespace-normal sm:whitespace-nowrap">
            What partners <span className="text-[#666]">are saying.</span>
          </ScrollWipeHeading>
        </motion.div>

        {/* Horizontal Scrolling Track */}
        <div className="relative w-full overflow-hidden flex items-center">
          <motion.div style={{ x }} className="flex gap-4 sm:gap-6 md:gap-10 px-4 sm:px-[10vw] md:px-[20vw] pr-[28vw]">
            {allStreamItems.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className="w-[min(85vw,360px)] sm:w-[380px] h-[420px] sm:h-[480px] shrink-0"
              >
                <CardRenderer item={item} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CardRenderer({ item }: { item: StreamItem }) {
  if (item.type === "photo") {
    return (
      <div className="relative w-full h-full rounded-2xl sm:rounded-[2rem] overflow-hidden border border-[#E5E5E5] dark:border-[#222] group shrink-0 bg-white dark:bg-[#111] transition-all duration-500 hover:scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90"
          sizes="360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 p-3 sm:p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
          <p className="text-xs sm:text-sm font-medium text-white leading-snug line-clamp-2">
            {item.title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-2xl sm:rounded-[2rem] bg-white dark:bg-[#111] p-5 sm:p-8 border border-[#E5E5E5] dark:border-[#222] flex flex-col justify-between shrink-0 text-[#111] dark:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden group hover:border-[#111] dark:hover:border-white/50">
      <div>
        <div className="flex items-center gap-1.5 mb-3 sm:mb-5">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#F5A623] text-[#F5A623]" />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-[#444] dark:text-[#CCC] leading-relaxed font-light line-clamp-5 sm:line-clamp-4">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="pt-4 sm:pt-5 border-t border-[#E5E5E5] dark:border-[#333] flex items-center justify-between gap-2 sm:gap-3 mt-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FAFAFA] dark:bg-black border border-[#E5E5E5] dark:border-[#333] text-[#111] dark:text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-sm">
            {item.company.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-[#111] dark:text-white leading-none mb-1 truncate">
              {item.company}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-[#666] dark:text-[#999] uppercase tracking-widest truncate">
              {item.role}
            </div>
          </div>
        </div>

        {item.award && (
          <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-black text-[8px] sm:text-[9px] font-semibold text-[#111] dark:text-[#DDD] uppercase tracking-widest text-right shrink-0 whitespace-nowrap shadow-sm">
            {item.award}
          </div>
        )}
      </div>
    </div>
  );
}

export default Certifications;
