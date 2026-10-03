"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Maximize2, TrendingUp, Cpu, CheckCircle2, Factory, Sparkles, Activity } from "lucide-react";

// High-precision RAF count-up component with exponential easing
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
        setDisplayValue(Math.floor(current).toLocaleString("en-US"));
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

const manufacturingStats = [
  {
    icon: Maximize2,
    num: 32000,
    suffix: "+",
    decimals: 0,
    unit: "Sq. M.",
    label: "Production Floor Space",
    desc: "Across 6 synchronized manufacturing hubs in Delhi-NCR, Gujarat & Karnataka",
  },
  {
    icon: TrendingUp,
    num: 65000,
    suffix: "",
    decimals: 0,
    unit: "MT",
    label: "Annual Tubular Volume",
    desc: "Powering critical thermal fluid loops for global HVAC and EV mobility Tier-1s",
  },
  {
    icon: Cpu,
    num: 60,
    suffix: "+",
    decimals: 0,
    unit: "Units",
    label: "Automated CNC Tooling",
    desc: "Multi-axis computerized cold tube bending & automated robotic brazing cells",
  },
  {
    icon: CheckCircle2,
    num: 99.98,
    suffix: "%",
    decimals: 2,
    unit: "Yield",
    label: "First-Pass Precision Yield",
    desc: "Mass spectrometry vacuum helium leak clearance for zero-defect compliance",
  },
];

export function AboutManufacturing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll parallax for the facility photo
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="about-manufacturing"
      ref={containerRef}
      className="relative py-20 md:py-36 bg-slate-50/50 dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden"
    >
      <div className="container-custom relative z-10 w-full">
        {/* ========================================================
            EDITORIAL HEADER: High-End Corporate Typography
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white mb-6">
            High-throughput capacity, <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
              engineered for Tier-1 scale.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#0D2440]/80 dark:text-white/80 font-light leading-relaxed max-w-3xl">
            Our nationwide manufacturing footprint integrates automated high-speed cold drawing benches, multi-axis computerized
            bending stations, and robotic induction brazing lines. Backed by 6 synchronized facilities across India, we ensure
            uninterrupted, just-in-time continuity for mission-critical global supply chains.
          </p>
        </motion.div>

        {/* ========================================================
            SHOWCASE ARCHITECTURE: Parallax Viewport (7) + Metrics (5)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Visual Facility Canvas (7 Cols) with Scroll Parallax */}
          <motion.div
            ref={imageContainerRef}
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#7BA4D0]/30 dark:border-white/15 group h-[420px] sm:h-[500px] lg:h-full min-h-[420px]"
          >
            {/* Parallax Photo Layer */}
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-x-0 w-full h-[120%] -top-[10%] z-0"
            >
              <Image
                src="/images/about-manufacturing.png"
                alt="J Pan Tubular Automated CNC Cold Bending Facility"
                fill
                className="object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
              />
            </motion.div>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060D18]/90 via-[#060D18]/20 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060D18]/60 via-transparent to-transparent pointer-events-none z-10" />

            {/* Bottom Control Bar */}
            <div className="absolute bottom-6 left-6 right-6 z-20 p-5 rounded-2xl bg-white/90 dark:bg-[#0D2440]/90 backdrop-blur-md border border-[#7BA4D0]/40 dark:border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#2E5E99] text-white flex items-center justify-center shrink-0">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-heading font-bold tracking-wider text-[#2E5E99] dark:text-[#7BA4D0] uppercase">
                    QUALITY SYSTEM COMPLIANCE
                  </div>
                  <div className="text-sm font-heading font-bold text-[#0D2440] dark:text-white leading-tight">
                    100% Mass Spectrometer Leak Tested
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-sans font-medium text-xs text-[#0D2440]/70 dark:text-white/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>IATF 16949 &amp; ISO 9001:2015</span>
              </div>
            </div>
          </motion.div>

          {/* Telemetry Metrics Matrix (5 Cols - 2x2 Grid) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {manufacturingStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                className="relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 dark:border-white/15 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all duration-300 group flex flex-col justify-between overflow-hidden transform-gpu"
              >
                {/* Top Row: Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E7F0FA] dark:bg-white/10 text-[#2E5E99] dark:text-[#7BA4D0] flex items-center justify-center group-hover:bg-[#2E5E99] group-hover:text-white transition-colors duration-300">
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Counter Value */}
                  <div className="text-3xl sm:text-4xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight mb-1.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                    <AnimatedCounter
                      value={stat.num}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      duration={1.0}
                    />
                  </div>

                  {/* Label */}
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-[#0D2440] dark:text-white mb-1.5 leading-snug">
                    {stat.label}
                  </h4>

                  {/* Description */}
                  <p className="text-[11px] text-[#0D2440]/70 dark:text-white/70 font-light leading-relaxed">
                    {stat.desc}
                  </p>
                </div>

                {/* Bottom Calibration Accent Line */}
                <div className="mt-4 pt-3 border-t border-[#7BA4D0]/15 dark:border-white/10">
                  <div className="h-1 w-full bg-[#E7F0FA] dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#2E5E99] to-[#7BA4D0] origin-left rounded-full"
                    />
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
