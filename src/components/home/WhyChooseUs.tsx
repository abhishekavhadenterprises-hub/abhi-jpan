"use client";

import React, { useRef, useState, useEffect } from "react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";
import Link from "next/link";
import { motion, useInView, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Activity, Zap, Gauge, Factory, CheckCircle2 } from "lucide-react";
import MagicRings from "@/components/ui/MagicRings";

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
    val: <>±0.01<span className="text-amber-500 font-sans text-3xl md:text-4xl ml-1 font-semibold">mm</span></>,
    valRaw: "0.01",
    desc: "Automated multi-plane mandrel bending cells ensuring zero tube-wall collapse and laser-verified dimensional repeatability.",
    icon: Zap,
    color: "text-amber-500",
    bgHover: "group-hover:bg-amber-500",
    glow: "from-amber-500/10",
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
    val: <>&lt; 10⁻⁸<span className="text-emerald-600 font-sans text-2xl md:text-3xl ml-2 font-semibold tracking-wider">mbar·l/s</span></>,
    valRaw: "10-8",
    desc: "100% production vacuum chamber helium testing ensures complete hermetic seal integrity exceeding international standards.",
    icon: Gauge,
    color: "text-emerald-600",
    bgHover: "group-hover:bg-emerald-500",
    glow: "from-emerald-500/10",
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
    color: "text-purple-600",
    bgHover: "group-hover:bg-purple-600",
    glow: "from-purple-500/10",
    footer1: "50,000+ M² Combined Capacity",
    footer2: "ISO 9001 & IATF 16949 Certified",
    num: "04",
    valClass: "text-7xl md:text-8xl",
  }
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (features.length - 1));
    index = Math.max(0, Math.min(features.length - 1, index));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="relative h-[400vh] bg-[#FAFAFA] dark:bg-[#050505] text-[#111] dark:text-white transition-colors duration-500"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* MagicRings Premium Background */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-auto">
          <MagicRings
            color="#2E5E99"
            colorTwo="#999999"
            ringCount={7}
            speed={0.8}
            attenuation={15}
            lineThickness={3}
            baseRadius={0.4}
            radiusStep={0.15}
            scaleRate={0.05}
            opacity={0.3}
            blur={1}
            noiseAmount={0.03}
            rotation={0}
            ringGap={1.2}
            fadeIn={0.6}
            fadeOut={0.7}
            followMouse={true}
            mouseInfluence={0.15}
            hoverScale={1.05}
            parallax={0.03}
            clickBurst={true}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#E5E5E5] dark:border-[#222]">
            <div className="max-w-3xl">
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-4">Benchmarks & Telemetry</h2>
              <ScrollWipeHeading as="h3" className="text-4xl md:text-5xl lg:text-[4rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">
                Performance <br />
                <span className="text-[#666]">proven at scale.</span>
              </ScrollWipeHeading>
            </div>
            <div className="max-w-md space-y-6">
              <p className="text-[#666] dark:text-[#999] text-sm leading-relaxed font-light">
                Engineered for mission-critical operating environments where zero-defect reliability
                is non-negotiable. Continuously audited under ISO 9001 and IATF 16949 standards across six automated facilities.
              </p>
              <div>
                <Link
                  href="/quality"
                  className="group/btn px-6 py-3 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#111] font-semibold text-[10px] uppercase tracking-widest transition-all duration-500 inline-flex items-center gap-3 shadow-lg hover:scale-105"
                >
                  <span>Audit Specifications</span>
                  <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Interactive Title List */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-8 py-10 relative">
              {/* Background Track Line */}
              <div className="absolute left-[2px] top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10" />

              {features.map((feature, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div 
                    key={feature.id}
                    className={`relative transition-all duration-700 ease-out py-2 pl-12 group`}
                  >
                    {/* Active Track Line */}
                    <div 
                      className={`absolute left-[1px] top-0 bottom-0 w-[3px] bg-[#111] dark:bg-white transition-all duration-700 ease-[0.16,1,0.3,1] origin-top rounded-full ${isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} 
                    />

                    <div className={`transition-all duration-700 ease-[0.16,1,0.3,1] ${isActive ? "opacity-100 translate-x-4 blur-0" : "opacity-30 translate-x-0 blur-[1px]"}`}>
                      <div className="flex items-center gap-4 mb-3">
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isActive ? feature.color : "text-[#666]"}`}>
                          {feature.num}
                        </span>
                        <div className={`h-[1px] transition-all duration-1000 ${isActive ? "w-8 bg-black/20 dark:bg-white/20" : "w-0 bg-transparent"}`} />
                        <span className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${isActive ? "text-[#111] dark:text-white" : "text-[#666]"}`}>
                          {feature.tag}
                        </span>
                      </div>
                      <h4 className={`text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight leading-tight transition-colors duration-700 ${isActive ? "text-[#111] dark:text-white" : "text-[#999] dark:text-[#555]"}`}>
                        {feature.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Dynamic Bento Card Reveal */}
            <div className="lg:col-span-7 relative h-[450px]">
              <AnimatePresence mode="wait">
                {features.map((feature, idx) => {
                  if (idx !== activeIndex) return null;
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.75, y: -20, rotateX: -5, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full p-10 rounded-[2.5rem] bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#E5E5E5] dark:border-[#222] flex flex-col justify-between overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
                    >
                      <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl ${feature.glow} to-transparent blur-[100px] opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-multiply dark:mix-blend-screen`} />

                      <div>
                        <div className="flex items-center justify-between gap-4 mb-8">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] flex items-center justify-center ${feature.color} ${feature.bgHover} group-hover:text-white transition-all duration-700 shadow-sm`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            {feature.subTag && (
                              <span className="inline-block px-3 py-1 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] text-[9px] text-[#666] uppercase tracking-widest font-semibold">
                                {feature.subTag}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className={`${feature.valClass} font-light tracking-tighter text-[#111] dark:text-white mb-6 group-hover:scale-[1.02] transition-transform duration-700 origin-left`}>
                          {feature.val}
                        </div>
                        <p className="text-sm md:text-base text-[#666] dark:text-[#999] font-light leading-relaxed max-w-xl">
                          {feature.desc}
                        </p>
                      </div>

                      {(feature.footer1 || feature.footer2) && (
                        <div className="pt-8 border-t border-[#E5E5E5] dark:border-[#222] flex flex-wrap items-center gap-4 text-[10px] font-semibold uppercase tracking-widest text-[#666]">
                          {feature.footer1 && (
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222]">
                              {feature.id === 'capacity' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                              {feature.footer1}
                            </span>
                          )}
                          {feature.footer2 && (
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222]">
                              {feature.footer2}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

