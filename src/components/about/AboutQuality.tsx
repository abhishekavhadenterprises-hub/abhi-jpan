"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

const certifications = [
  {
    id: "iatf",
    num: "01",
    category: "Automotive Tier-1",
    code: "IATF 16949:2016",
    title: "Zero-Defect Automotive Systems",
    desc: "OEM-accredited quality assurance engineered for critical EV thermal loops, powertrain, and braking lines.",
    highlights: [
      "APQP & PPAP Level 3 Qualified",
      "Inline Laser SPC (Cpk ≥ 1.67)",
      "100% Mass-Spec Helium Tested",
      "Full Raw-to-Part Traceability",
    ],
  },
  {
    id: "iso9001",
    num: "02",
    category: "Precision Manufacturing",
    code: "ISO 9001:2015",
    title: "Total Quality Management",
    desc: "Rigorous dimensional repeatability and zero-defect fulfillment across all 6 production plants.",
    highlights: [
      "Multi-Axis Optical CMM Verified",
      "Continuous Statistical Auditing",
      "Robotic Automated Induction Brazing",
      "Sub-micron Tube Tolerances",
    ],
  },
  {
    id: "iso14001",
    num: "03",
    category: "ESG & Sustainability",
    code: "ISO 14001:2015",
    title: "Sustainable Clean Metallurgy",
    desc: "Closed-loop green manufacturing powered by rooftop solar and 100% metallurgical recycling.",
    highlights: [
      "100% Closed-Loop Scrap Remelt",
      "Rooftop Solar Photovoltaic Power",
      "RoHS & EU REACH Compliant",
      "Zero Toxic Effluent Discharge",
    ],
  },
];

export function AboutQuality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Track scroll position through the section runway
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveIdx(0);
    } else if (latest < 0.70) {
      setActiveIdx(1);
    } else {
      setActiveIdx(2);
    }
  });

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    if (sectionRef.current && typeof window !== "undefined") {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = rect.top + scrollTop;
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const targetScroll = sectionTop + (idx / 2) * sectionHeight;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const activeCert = certifications[activeIdx];

  return (
    <section
      id="about-quality"
      ref={sectionRef}
      className="relative h-[250vh] bg-slate-50/70 dark:bg-[#060e18] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] flex flex-col justify-center items-center px-4 sm:px-6">
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight leading-tight text-[#0D2440] dark:text-white mb-2">
              Uncompromising standards,{" "}
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
                verified at every cycle.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 font-light max-w-lg mx-auto">
              Precision inspection and zero-defect quality control across all critical assemblies.
            </p>
          </div>

          {/* Segmented Switcher Controls */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/80 dark:bg-white/[0.06] border border-[#7BA4D0]/25 dark:border-white/10 mb-6 backdrop-blur-md">
            {certifications.map((cert, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={cert.id}
                  onClick={() => handleSelect(idx)}
                  className={`relative px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-[#0D2440]/60 dark:text-white/60 hover:text-[#0D2440] dark:hover:text-white"
                  }`}
                  aria-label={`Select ${cert.code}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeQualitySegment"
                      className="absolute inset-0 rounded-full bg-[#2E5E99]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cert.code}</span>
                </button>
              );
            })}
          </div>

          {/* Premium Focused Showcase Card */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/90 dark:bg-[#0b1b2d]/90 backdrop-blur-xl border border-[#7BA4D0]/30 dark:border-white/10 overflow-hidden">
            {/* Top Glowing Scroll Progress Bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E5E99] via-[#4A85C6] to-[#7BA4D0] origin-left"
              style={{ scaleX: scrollYProgress }}
            />

            {/* Ambient Background Watermark */}
            <div
              className="pointer-events-none absolute -bottom-6 -right-2 font-mono font-black text-[140px] sm:text-[180px] text-[#2E5E99]/[0.03] dark:text-white/[0.02] select-none leading-none z-0"
              aria-hidden="true"
            >
              {activeCert.num}
            </div>

            {/* Short Form Content with Smooth Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {/* Title & Short Description */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight leading-snug mb-2">
                  {activeCert.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl mb-5">
                  {activeCert.desc}
                </p>

                {/* 4 Compact Key Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
                  {activeCert.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-xs sm:text-sm font-medium text-[#0D2440] dark:text-white/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Meta & Link */}
            <div className="relative z-10 pt-4 border-t border-[#7BA4D0]/15 dark:border-white/10 flex items-center justify-end">
              <Link
                href="/quality"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] hover:text-[#0D2440] dark:hover:text-white transition-colors group"
              >
                <span>View Quality Laboratory</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
