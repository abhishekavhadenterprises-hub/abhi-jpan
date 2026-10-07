"use client";

import React, { useRef, useState, useEffect } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Activity, Zap, Gauge, Factory, CheckCircle2 } from "lucide-react";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums font-heading font-black">
      {count}
      <span className="text-[#2E5E99] dark:text-cyan-400 font-sans ml-1 text-4xl">{suffix}</span>
    </span>
  );
}

const features = [
  {
    id: "capacity",
    tag: "CAPACITY METRICS",
    subTag: "P95 CONTINUOUS OUTPUT",
    title: "Annual Processed Tubular Capacity",
    val: <Counter value={65} suffix="k MT" />,
    valRaw: "65",
    desc: "High-throughput automated extrusion, cold drawing, and CNC bending infrastructure supporting primary global OEM seasonal production surges.",
    icon: Activity,
    color: "text-[#2E5E99]",
    bgHover: "group-hover:bg-[#2E5E99]",
    glow: "from-[#2E5E99]/10",
    footer1: "99.8% On-Time Delivery",
    footer2: "100% In-House Tooling",
    num: "01",
    valClass: "text-7xl md:text-8xl",
  },
  {
    id: "precision",
    tag: "MICRON PRECISION",
    subTag: "",
    title: "CNC Cold Bending",
    val: <>±0.01<span className="text-[#2E5E99] font-sans text-3xl md:text-4xl ml-1 font-semibold">mm</span></>,
    valRaw: "0.01",
    desc: "Automated multi-plane mandrel bending cells ensuring zero tube-wall collapse and laser-verified dimensional repeatability.",
    icon: Zap,
    color: "text-[#2E5E99]",
    bgHover: "group-hover:bg-[#2E5E99]",
    glow: "from-[#2E5E99]/10",
    footer1: "",
    footer2: "",
    num: "02",
    valClass: "text-6xl md:text-7xl",
  },
  {
    id: "helium",
    tag: "ZERO LEAK INTEGRITY",
    subTag: "",
    title: "Mass Spectrometry",
    val: <>&lt; 10⁻⁸<span className="text-[#2E5E99] font-sans text-2xl md:text-3xl ml-2 font-semibold tracking-wider">mbar·l/s</span></>,
    valRaw: "10-8",
    desc: "100% production vacuum chamber helium testing ensures complete hermetic seal integrity exceeding international standards.",
    icon: Gauge,
    color: "text-[#2E5E99]",
    bgHover: "group-hover:bg-[#2E5E99]",
    glow: "from-[#2E5E99]/10",
    footer1: "",
    footer2: "",
    num: "03",
    valClass: "text-5xl md:text-6xl whitespace-nowrap",
  },
  {
    id: "panindia",
    tag: "TIER-1 FOOTPRINT",
    subTag: "STRATEGIC LOGISTICS",
    title: "Pan-India Integration",
    val: <Counter value={6} suffix="Plants" />,
    valRaw: "6",
    desc: "6 integrated manufacturing hubs across Greater Noida, Pune, Sanand, Neemrana, and Bengaluru, supporting JIT deliveries along primary industrial corridors.",
    icon: Factory,
    color: "text-[#2E5E99]",
    bgHover: "group-hover:bg-[#2E5E99]",
    glow: "from-[#2E5E99]/10",
    footer1: "50,000+ M² Combined Capacity",
    footer2: "ISO 9001 & IATF 16949 Certified",
    num: "04",
    valClass: "text-7xl md:text-8xl",
  }
];

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative py-8 min-h-[90svh] flex flex-col justify-center bg-[#FAFAFA] dark:bg-[#030303] text-[#111] dark:text-white overflow-hidden transition-colors duration-700"
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#2E5E99]/5 dark:from-[#2E5E99]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-500/5 dark:from-purple-900/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-24 xl:px-32 relative z-10 flex flex-col justify-center">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#111]/10 dark:border-white/10">
          <div className="max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.4em] uppercase font-bold text-[#2E5E99] dark:text-cyan-400 mb-6"
            >
              Benchmarks & Telemetry
            </motion.h2>
            <ScrollWipeHeading as="h3" className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tighter text-[#111] dark:text-white leading-[1.05]">
              Performance <br />
              <span className="text-[#666] dark:text-[#888]">proven at scale.</span>
            </ScrollWipeHeading>
          </div>
          <div className="max-w-lg space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#666] dark:text-[#999] text-sm leading-relaxed font-light"
            >
              Engineered for mission-critical operating environments where zero-defect reliability
              is non-negotiable. Continuously audited under ISO 9001 and IATF 16949 standards across six automated facilities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/quality"
                className="group/btn px-8 py-4 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#050505] font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 inline-flex items-center gap-4 hover:shadow-[0_0_30px_rgba(46,94,153,0.3)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                <span>Audit Specifications</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Staircase Layout */}
        <div className="relative w-full flex flex-col pb-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            // Alternate left and right for animation
            const fromLeft = idx % 2 === 0;
            // Enhanced Staircase indent
            const indentClass = [
              "ml-0 lg:w-[70%]",
              "ml-[5%] lg:ml-[10%] lg:w-[70%]",
              "ml-[10%] lg:ml-[20%] lg:w-[70%]",
              "ml-[15%] lg:ml-[30%] lg:w-[70%]"
            ][idx];

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: fromLeft ? "-50vw" : "50vw", y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`relative ${indentClass} mb-3 z-10`}
              >
                {/* Premium Animated Connecting SVG Line */}
                {idx < features.length - 1 && (
                  <div className="hidden lg:block absolute left-[3rem] -bottom-6 w-24 h-12 -z-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path
                        d="M 10,0 L 10,70 Q 10,90 30,90 L 100,90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 6"
                        className="text-[#111]/20 dark:text-white/20"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </svg>
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative"
                >
                  {/* Glowing Border Hover Effect */}
                  <div className={`absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-r ${feature.glow} opacity-0 group-hover:opacity-100 blur-md transition duration-700 pointer-events-none`} />

                  <div className="relative p-4 md:p-6 rounded-[1.5rem] bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-700 overflow-hidden">

                    {/* Internal Gradient Glow */}
                    <div className={`absolute -top-32 -right-32 w-[400px] h-[400px] bg-gradient-to-bl ${feature.glow} to-transparent blur-[80px] opacity-20 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none mix-blend-multiply dark:mix-blend-screen`} />

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">

                      {/* Icon Box */}
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={`shrink-0 w-14 h-14 rounded-[1rem] bg-white dark:bg-[#151515] border border-black/5 dark:border-white/10 flex items-center justify-center ${feature.color} ${feature.bgHover} group-hover:text-white transition-colors duration-500 shadow-md`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className={`text-sm uppercase tracking-widest font-black ${feature.color}`}>
                            {feature.num}
                          </span>
                          <span className="w-8 h-[1px] bg-black/10 dark:bg-white/10" />
                          <span className="text-xs uppercase tracking-widest font-bold text-[#666] dark:text-[#888]">
                            {feature.tag}
                          </span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-medium tracking-tight text-[#111] dark:text-white mb-1 group-hover:translate-x-2 transition-transform duration-500">
                          {feature.title}
                        </h4>
                        <p className="text-xs md:text-sm text-[#555] dark:text-[#AAA] leading-snug max-w-lg font-light">
                          {feature.desc}
                        </p>
                      </div>

                      {/* Value Display */}
                      <div className="shrink-0 pt-4 md:pt-0 pl-0 md:pl-6 md:border-l border-black/5 dark:border-white/10">
                        <motion.div
                          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-[#111] dark:text-white group-hover:scale-105 transition-transform origin-left md:origin-right duration-700"
                        >
                          {feature.val}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
