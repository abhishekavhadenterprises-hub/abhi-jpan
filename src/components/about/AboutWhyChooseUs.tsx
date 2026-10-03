"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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

export function AboutWhyChooseUs() {
  return (
    <section
      id="about-why-choose-us"
      className="relative py-24 sm:py-32 md:py-36 bg-white dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10"
    >
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white">
              The structural advantage of <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
                single-source accountability.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-[#0D2440]/80 dark:text-white/80 font-light leading-relaxed">
              Global OEMs rely on J Pan Tubular because we control the entire value chain—from raw material extrusion and multi-axis CNC bending to automated induction brazing and 100% cycle-tested clearance.
            </p>
          </div>
        </div>

        {/* Consistent Minimalist List */}
        <div className="border-b border-[#0D2440]/10 dark:border-white/10">
          {pillars.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-t border-[#0D2440]/10 dark:border-white/10 py-8 sm:py-10 transition-colors duration-300 hover:bg-slate-50/60 dark:hover:bg-white/[0.02] px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                {/* Index & Category Tag */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <span className="font-heading text-lg font-black text-[#2E5E99] dark:text-[#7BA4D0]">
                    {item.num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA4D0]/40" />
                  <span className="text-xs font-sans font-bold tracking-wider text-[#0D2440]/60 dark:text-white/60 uppercase">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="lg:col-span-6 space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white tracking-tight group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0D2440]/75 dark:text-white/75 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Metric & Detail */}
                <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between items-center pt-2 lg:pt-0">
                  <div className="text-base sm:text-lg font-heading font-bold text-[#0D2440] dark:text-white">
                    {item.metric}
                  </div>
                  <div className="text-xs text-[#0D2440]/60 dark:text-white/60 font-normal">
                    {item.detail}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clean Footer Link */}
        <div className="pt-8 sm:pt-10 flex justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] hover:text-[#0D2440] dark:hover:text-white transition-colors group"
          >
            <span>Request Technical Manufacturing Audit</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
