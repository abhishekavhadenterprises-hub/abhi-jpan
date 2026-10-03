"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Award, Globe, Activity } from "lucide-react";

// Fast, energetic count-up counter component
function AnimatedCounter({
  value,
  decimals = 0,
  duration = 1.0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = React.useState("0");

  React.useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * value;

      if (decimals > 0) {
        setDisplayValue(current.toFixed(decimals));
      } else {
        setDisplayValue(Math.floor(current).toString());
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

const highlights = [
  {
    icon: Award,
    val: 28,
    suffix: "+",
    decimals: 0,
    unit: "Years",
    title: "Continuous Engineering Memory",
    desc: "Established in 1998, scaling from a localized toolroom to an international Tier-1 OEM supply network.",
  },
  {
    icon: ShieldCheck,
    val: 99.98,
    suffix: "%",
    decimals: 2,
    unit: "Yield",
    title: "Micron-Tolerance CNC Standards",
    desc: "Multi-axis computerized cold bending and mass spectrometry helium leak defense for critical loops.",
  },
  {
    icon: Globe,
    val: 12,
    suffix: "+",
    decimals: 0,
    unit: "Markets",
    title: "Global Supply Continuity",
    desc: "Powering systems for enterprise OEM leaders across HVAC, commercial refrigeration, and automotive transit.",
  },
];

// Snappy fan-in card variants with 3D perspective
const cardVariants: Variants[] = [
  {
    hidden: { opacity: 0, x: -25, y: 25, rotate: -2, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  },
  {
    hidden: { opacity: 0, y: 30, scale: 0.93 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
    },
  },
  {
    hidden: { opacity: 0, x: 25, y: 25, rotate: 2, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
  },
];

export function CompanyOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 bg-slate-50/50 dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden"
    >
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: High-Definition Photography with Floating Telemetry Badge */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.96, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#7BA4D0]/35 dark:border-white/15 w-full group">
              <Image
                src="/industrial_precision_tubing_1778827579055.png"
                alt="Precision Tubular Engineering"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/80 via-transparent to-transparent" />

              {/* Floating Architectural Telemetry Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-[#0D2440]/90 backdrop-blur-md border border-[#7BA4D0]/40 dark:border-white/20 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2E5E99] text-white flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-widest text-[#2E5E99] dark:text-[#7BA4D0] uppercase">
                    QUALITY ASSURANCE PASS
                  </div>
                  <div className="text-xs sm:text-sm font-heading font-bold text-[#0D2440] dark:text-white">
                    100% Mass Spectrometer Leak Tested
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Authoritative Editorial & Elevated Cards */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-[1.1] text-[#0D2440] dark:text-white">
                Engineered for environments where <br />
                <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
                  failure is not an option.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#0D2440]/80 dark:text-white/80 font-light leading-relaxed max-w-2xl">
                We combine decades of institutional metallurgy expertise with high-speed automated CNC bending,
                end-forming, and induction brazing lines. Our continuous investments in multi-axis automation
                ensure that every component leaving our shop floors complies with the tightest tolerances in the industry.
              </p>
            </motion.div>

            {/* Elevated Spec Highlight Cards with 3D Fan-In & Live Counter */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 [perspective:1200px]"
            >
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants[idx]}
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 dark:border-white/15 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-colors duration-300 group flex flex-col justify-between transform-gpu"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#E7F0FA] dark:bg-white/10 text-[#2E5E99] dark:text-[#7BA4D0] flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#2E5E99] dark:text-[#7BA4D0] tracking-wider">
                        {item.unit}
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight">
                      <AnimatedCounter
                        value={item.val}
                        decimals={item.decimals}
                        suffix={item.suffix}
                        duration={1.0}
                      />
                    </div>

                    <h4 className="text-sm font-heading font-bold text-[#0D2440] dark:text-white leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#0D2440]/70 dark:text-white/70 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
