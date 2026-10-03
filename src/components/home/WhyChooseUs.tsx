"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative py-28 md:py-36 bg-[#FAFAFA] dark:bg-[#050505] text-[#111] dark:text-white transition-colors duration-500 overflow-hidden"
    >
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

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 pb-8 border-b border-[#E5E5E5] dark:border-[#222]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-6">Benchmarks & Telemetry</h2>
            <h3 className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">
              Performance <br />
              <span className="text-[#666]">proven at scale.</span>
            </h3>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="max-w-md lg:pb-4 space-y-8">
            <p className="text-[#666] dark:text-[#999] text-sm md:text-base leading-relaxed font-light">
              Engineered for mission-critical operating environments where zero-defect reliability
              is non-negotiable. Continuously audited under ISO 9001 and IATF 16949 standards across six automated facilities.
            </p>
            <div>
              <Link
                href="/quality"
                className="group/btn px-8 py-4 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#111] font-semibold text-xs uppercase tracking-widest transition-all duration-500 inline-flex items-center gap-3 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105"
              >
                <span>Audit Specifications</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bento Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Bento 1: Flagship Capacity Scale (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="lg:col-span-7 relative p-10 md:p-14 rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#222] transition-all duration-700 flex flex-col justify-between overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#2E5E99]/10 to-transparent blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] flex items-center justify-center text-[#2E5E99] group-hover:scale-110 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-700 shadow-sm">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-[#2E5E99] font-medium mb-1">
                      CAPACITY METRICS
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] text-[9px] text-[#666] uppercase tracking-widest font-semibold">
                      P95 CONTINUOUS OUTPUT
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E5E5E5] dark:text-[#333] group-hover:text-[#2E5E99] transition-colors duration-500">01 //</span>
              </div>

              <div className="text-7xl md:text-8xl font-light tracking-tighter text-[#111] dark:text-white mb-6 group-hover:scale-[1.02] transition-transform duration-700 origin-left">
                <Counter value={65} suffix="k MT" />
              </div>
              <h3 className="text-3xl font-light tracking-tight text-[#111] dark:text-white mb-4 group-hover:text-[#2E5E99] transition-colors duration-500">
                Annual Processed Tubular Capacity
              </h3>
              <p className="text-base text-[#666] font-light leading-relaxed max-w-xl group-hover:translate-x-2 transition-transform duration-700">
                High-throughput automated extrusion, cold drawing, and CNC bending infrastructure supporting primary global OEM seasonal production surges.
              </p>
            </div>

            <div className="pt-10 mt-10 border-t border-[#E5E5E5] dark:border-[#222] flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#666]">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
                <CheckCircle2 className="w-4 h-4" />
                99.8% On-Time Delivery
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] text-[#666] dark:text-[#999]">
                100% In-House Tooling
              </span>
            </div>
          </motion.div>

          {/* Bento 2: Micron Precision (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}
            className="lg:col-span-5 relative p-10 md:p-14 rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#222] transition-all duration-700 flex flex-col justify-between overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-amber-500/10 to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-700 shadow-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-amber-600 font-medium mb-1">
                      MICRON PRECISION
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E5E5E5] dark:text-[#333] group-hover:text-amber-500 transition-colors duration-500">02 //</span>
              </div>

              <div className="text-6xl md:text-7xl font-light tracking-tighter text-[#111] dark:text-white mb-6 group-hover:scale-[1.02] transition-transform duration-700 origin-left">
                ±0.01<span className="text-amber-500 font-sans text-3xl md:text-4xl ml-1 font-semibold">mm</span>
              </div>
              <h3 className="text-3xl font-light tracking-tight text-[#111] dark:text-white mb-4 group-hover:text-amber-600 transition-colors duration-500">
                CNC Cold Bending
              </h3>
              <p className="text-base text-[#666] font-light leading-relaxed group-hover:translate-x-2 transition-transform duration-700">
                Automated multi-plane mandrel bending cells ensuring zero tube-wall collapse and laser-verified dimensional repeatability.
              </p>
            </div>
          </motion.div>

          {/* Bento 3: Helium Leak Integrity (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative p-10 md:p-14 rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#222] transition-all duration-700 flex flex-col justify-between overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-emerald-500/10 to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-sm">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-emerald-600 font-medium mb-1">
                      ZERO LEAK INTEGRITY
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E5E5E5] dark:text-[#333] group-hover:text-emerald-500 transition-colors duration-500">03 //</span>
              </div>

              <div className="text-5xl md:text-6xl font-light tracking-tighter text-[#111] dark:text-white mb-6 whitespace-nowrap group-hover:scale-[1.02] transition-transform duration-700 origin-left">
                &lt; 10⁻⁸<span className="text-emerald-600 font-sans text-2xl md:text-3xl ml-2 font-semibold tracking-wider">mbar·l/s</span>
              </div>
              <h3 className="text-3xl font-light tracking-tight text-[#111] dark:text-white mb-4 group-hover:text-emerald-600 transition-colors duration-500">
                Mass Spectrometry
              </h3>
              <p className="text-base text-[#666] font-light leading-relaxed group-hover:translate-x-2 transition-transform duration-700">
                100% production vacuum chamber helium testing ensures complete hermetic seal integrity exceeding international standards.
              </p>
            </div>
          </motion.div>

          {/* Bento 4: Pan-India Tier-1 Footprint (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-7 relative p-10 md:p-14 rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#222] transition-all duration-700 flex flex-col justify-between overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/10 to-transparent blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] flex items-center justify-center text-purple-600 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-700 shadow-sm">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-purple-600 font-medium mb-1">
                      TIER-1 FOOTPRINT
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222] text-[9px] text-[#666] uppercase tracking-widest font-semibold">
                      STRATEGIC LOGISTICS
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E5E5E5] dark:text-[#333] group-hover:text-purple-500 transition-colors duration-500">04 //</span>
              </div>

              <div className="text-7xl md:text-8xl font-light tracking-tighter text-[#111] dark:text-white mb-6 group-hover:scale-[1.02] transition-transform duration-700 origin-left">
                <Counter value={6} suffix="Plants" />
              </div>
              <h3 className="text-3xl font-light tracking-tight text-[#111] dark:text-white mb-4 group-hover:text-purple-600 transition-colors duration-500">
                Pan-India Integration
              </h3>
              <p className="text-base text-[#666] font-light leading-relaxed max-w-xl group-hover:translate-x-2 transition-transform duration-700">
                6 integrated manufacturing hubs across Greater Noida, Pune, Sanand, Neemrana, and Bengaluru, supporting JIT deliveries along primary industrial corridors.
              </p>
            </div>

            <div className="pt-10 mt-10 border-t border-[#E5E5E5] dark:border-[#222] flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#666]">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222]">
                50,000+ M² Combined Capacity
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#222]">
                ISO 9001 & IATF 16949 Certified
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
