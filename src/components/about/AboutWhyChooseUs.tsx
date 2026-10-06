"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const pillars = [
  {
    num: "01",
    tag: "QUALITY INTEGRITY",
    title: "Zero-Defect Verification",
    desc: "100% non-destructive helium mass spectrometry vacuum leak testing and automated optical CMM dimensional inspection before customer dispatch.",
    metric: "100% Helium Tested",
    detail: "< 1×10⁻⁶ mbar·l/s leak rate",
  },
  {
    num: "02",
    tag: "SUPPLY CONTINUITY",
    title: "6 Synchronized Production Hubs",
    desc: "Spanning 32,000+ sq. meters across NCR, Rajasthan, Gujarat, Maharashtra, and Karnataka to ensure rapid just-in-time delivery direct to OEM assembly lines.",
    metric: "32,000+ Sq. Meters",
    detail: "6 strategic OEM corridors",
  },
  {
    num: "03",
    tag: "METALLURGICAL IP",
    title: "28+ Years Engineering Memory",
    desc: "Nearly three decades of continuous tooling IP, proprietary cold-draw formulas, and robotic induction brazing parameters across critical fluid and thermal loops.",
    metric: "Established 1998",
    detail: "1,400+ active tooling dies",
  },
  {
    num: "04",
    tag: "ENGINEERING AGILITY",
    title: "Direct R&D Co-Development",
    desc: "Dedicated resident application engineers partnering directly with your design teams for rapid CAD feasibility reviews, material optimization, and prototype iteration.",
    metric: "< 24h Feasibility",
    detail: "Direct CATIA / NX integration",
  },
];

// Interactive Bento Card Component
function BentoCard({ item, index }: { item: typeof pillars[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const hoverGlow = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(123, 164, 208, 0.15), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] p-8 sm:p-10 lg:p-12 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 ${index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"
        }`}
    >
      {/* Dynamic Mouse Tracking Hover Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block mix-blend-multiply dark:mix-blend-screen"
        style={{ background: hoverGlow }}
      />

      {/* Fallback Static Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/5 dark:from-[#7BA4D0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none sm:hidden" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Header Section */}
        <div className="flex justify-between items-start mb-12 sm:mb-20">
          <div className="flex flex-col">
            <span className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black text-[#0D2440]/10 dark:text-[#7BA4D0]/20 leading-none -ml-1">
              {item.num}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#2E5E99] dark:text-[#7BA4D0] uppercase">
              {item.tag}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-sm sm:text-base text-[#0D2440]/75 dark:text-white/70 font-light leading-relaxed max-w-sm">
            {item.desc}
          </p>

          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="text-xs text-[#0D2440]/60 dark:text-white/50 font-mono tracking-widest uppercase">
              {item.detail}
            </div>
            <div className="text-xl sm:text-2xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0]">
              {item.metric}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutWhyChooseUs() {
  return (
    <section
      id="about-why-choose-us"
      className="relative bg-white dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(13,36,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(13,36,64,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/80 via-transparent to-white/90 dark:from-[#071321]/80 dark:via-transparent dark:to-[#071321]/90 pointer-events-none" />

      <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left Side: Sticky Header and Context */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 flex flex-col z-20">
            <ScrollWipeHeading as="h2" className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-[#0D2440] dark:text-white drop-shadow-sm dark:drop-shadow-md mb-8">
              The structural advantage of <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
                single-source accountability.
              </span>
            </ScrollWipeHeading>

            <p className="text-lg sm:text-xl text-[#0D2440]/80 dark:text-white/80 font-light leading-relaxed backdrop-blur-md bg-white/50 dark:bg-black/10 p-6 rounded-3xl border border-[#0D2440]/5 dark:border-white/5 mb-10 shadow-xl shadow-slate-200/20 dark:shadow-none">
              Global OEMs rely on J Pan Tubular because we control the entire value chain—from raw material extrusion and multi-axis CNC bending to automated induction brazing and 100% cycle-tested clearance.
            </p>

            <Link
              href="/contact"
              className="group relative inline-flex items-center w-fit gap-4 px-8 py-4 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-[#0D2440]/10 dark:border-white/10 hover:border-[#2E5E99]/50 dark:hover:border-[#7BA4D0]/50 transition-all duration-300 backdrop-blur-md shadow-lg shadow-slate-200/20 dark:shadow-none"
            >
              <span className="text-sm sm:text-base font-heading font-bold text-[#0D2440] dark:text-white tracking-wide">
                Request Technical Audit
              </span>
              <div className="w-10 h-10 rounded-full bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/20 flex items-center justify-center group-hover:bg-[#2E5E99] dark:group-hover:bg-[#7BA4D0] transition-colors">
                <ArrowUpRight className="w-5 h-5 text-[#2E5E99] dark:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </div>

          {/* Right Side: Naturally Scrolling Pillar Cards */}
          <div className="lg:w-7/12 flex flex-col gap-12 sm:gap-16 w-full pb-16 lg:pb-32">
            {pillars.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full p-8 sm:p-12 lg:p-14 rounded-[3rem] bg-white/80 dark:bg-black/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-[#2E5E99]/5 dark:shadow-black/50 flex flex-col group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="flex justify-between items-start mb-10 sm:mb-14">
                  <span className="font-heading text-7xl sm:text-8xl lg:text-9xl font-black text-[#0D2440]/5 dark:text-[#7BA4D0]/10 leading-none -ml-2 -mt-4 group-hover:text-[#2E5E99]/10 dark:group-hover:text-[#7BA4D0]/20 transition-colors duration-500">
                    {item.num}
                  </span>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0] animate-pulse" />
                    <span className="text-xs font-sans font-bold tracking-[0.2em] text-[#2E5E99] dark:text-[#7BA4D0] uppercase">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight mb-6 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-[#0D2440]/75 dark:text-white/70 font-light leading-relaxed max-w-lg mb-10">
                    {item.desc}
                  </p>

                  <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-[#0D2440]/50 dark:text-white/50 font-mono tracking-widest uppercase">
                        {item.detail}
                      </span>
                      <span className="text-3xl sm:text-5xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0]">
                        {item.metric}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
