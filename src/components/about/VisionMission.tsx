"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Compass, Target, CheckCircle2, Sparkles } from "lucide-react";

const visionPoints = [
  {
    title: "Global Supply Network",
    desc: "Powering Tier-1 OEMs across 12+ international industrial corridors.",
  },
  {
    title: "Zero-Defect Standard",
    desc: "100% helium mass spectrometry testing for mission-critical reliability.",
  },
  {
    title: "Sustainable Metallurgy",
    desc: "Clean solar-powered operations and 100% closed-loop scrap recycling.",
  },
];

const missionPoints = [
  {
    title: "Rapid OEM Agility",
    desc: "Sub-24-hour CAD feasibility reviews and rapid prototype turnarounds.",
  },
  {
    title: "High-Throughput Scale",
    desc: "65,000+ MT annual volume backed by 6 synchronized production hubs.",
  },
  {
    title: "Robotic Precision",
    desc: "Continuous investment in multi-axis CNC bending and automated brazing.",
  },
];

// Awwwards-style elastic 3D perspective entrance variants
const awwwardsEntranceLeft: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 18,
    rotateY: 10,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // Quintessential Awwwards elastic cubic-bezier
    },
  },
};

const awwwardsEntranceRight: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 18,
    rotateY: -10,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: 0.16,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Interactive 3D Holographic Card with Mouse Tracking & Specular Spotlight
function AwwwardsTiltCard({
  children,
  className = "",
  initialVariant,
}: {
  children: React.ReactNode;
  className?: string;
  initialVariant?: Variants;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normalizedY = (y / rect.height - 0.5) * 2; // -1 to 1

    setTilt({
      rotateX: -normalizedY * 11, // Max 11 deg tilt on X axis
      rotateY: normalizedX * 11,  // Max 11 deg tilt on Y axis
    });
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={initialVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 dark:border-white/15 transition-colors duration-300 flex flex-col justify-between group transform-gpu cursor-default overflow-hidden ${className}`}
    >
      {/* Specular Radial Spotlight following cursor (Awwwards Signature) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 94, 153, 0.16), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Reactive Specular Border Beam */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(123, 164, 208, 0.5), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      {/* Floating 3D Layered Content */}
      <div className="relative z-30" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export function VisionMission() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="vision-mission"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-slate-50/50 dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden"
    >
      <div className="container-custom relative z-10 w-full">
        {/* Clean, Focused Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white mb-4">
            Purpose that guides <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
              every manufacturing cycle.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#0D2440]/75 dark:text-white/75 font-light leading-relaxed">
            Our foundational vision and operational mandate directing institutional growth and precision engineering since 1998.
          </p>
        </motion.div>

        {/* 2 Awwwards-Grade 3D Holographic Perspective Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch [perspective:1400px]">
          {/* Card 1: OUR VISION */}
          <AwwwardsTiltCard initialVariant={awwwardsEntranceLeft}>
            <div>
              {/* Top Row: Icon (Floating at translateZ: 38px) */}
              <div 
                className="flex items-center justify-between mb-8 transition-transform duration-200"
                style={{ transform: "translateZ(38px)" }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E7F0FA] dark:bg-white/10 text-[#2E5E99] dark:text-[#7BA4D0] border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Compass className="w-7 h-7" />
                </div>
              </div>

              {/* Title & Core Summary (Floating at translateZ: 28px) */}
              <div style={{ transform: "translateZ(28px)" }} className="transition-transform duration-200">
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-4 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                  Our Vision
                </h3>

                <p className="text-base sm:text-lg text-[#0D2440]/85 dark:text-white/85 font-light leading-relaxed mb-8">
                  To be the most admired and preferred tubular engineering partner across international HVAC,
                  refrigeration, and high-performance mobility OEM markets.
                </p>
              </div>

              {/* 3 Summarised Key Commitments (Floating at translateZ: 18px) */}
              <div 
                className="space-y-4 pt-6 border-t border-[#7BA4D0]/20 dark:border-white/10 transition-transform duration-200"
                style={{ transform: "translateZ(18px)" }}
              >
                {visionPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group/item">
                    <CheckCircle2 className="w-5 h-5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AwwwardsTiltCard>

          {/* Card 2: OUR MISSION */}
          <AwwwardsTiltCard initialVariant={awwwardsEntranceRight}>
            <div>
              {/* Top Row: Icon (Floating at translateZ: 38px) */}
              <div 
                className="flex items-center justify-between mb-8 transition-transform duration-200"
                style={{ transform: "translateZ(38px)" }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E7F0FA] dark:bg-white/10 text-[#2E5E99] dark:text-[#7BA4D0] border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Target className="w-7 h-7" />
                </div>
              </div>

              {/* Title & Core Summary (Floating at translateZ: 28px) */}
              <div style={{ transform: "translateZ(28px)" }} className="transition-transform duration-200">
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-4 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                  Our Mission
                </h3>

                <p className="text-base sm:text-lg text-[#0D2440]/85 dark:text-white/85 font-light leading-relaxed mb-8">
                  To deliver precision-engineered tubular solutions with competitive cost, uncompromising quality,
                  and rapid response through technological innovation and human empowerment.
                </p>
              </div>

              {/* 3 Summarised Key Commitments (Floating at translateZ: 18px) */}
              <div 
                className="space-y-4 pt-6 border-t border-[#7BA4D0]/20 dark:border-white/10 transition-transform duration-200"
                style={{ transform: "translateZ(18px)" }}
              >
                {missionPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group/item">
                    <CheckCircle2 className="w-5 h-5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AwwwardsTiltCard>
        </div>
      </div>
    </section>
  );
}
