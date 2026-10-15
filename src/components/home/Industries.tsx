"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Fan, Car, Home, Factory, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  {
    id: "hvac",
    num: "01",
    title: "HVAC & Climate Control",
    icon: Fan,
    image: "/industry_hvac.png",
    tag: "THERMAL TRANSFER",
    description:
      "Advanced copper, stainless steel and aluminum solutions designed for high-efficiency air conditioning and refrigeration applications.",
    href: "/products",
  },
  {
    id: "automotive",
    num: "02",
    title: "Automotive Engineering",
    icon: Car,
    image: "/industry_auto.png",
    tag: "BRAKE & FUEL LINES",
    description:
      "Precision-manufactured components supporting performance-driven automotive and mobility systems.",
    href: "/products",
  },
  {
    id: "appliances",
    num: "03",
    title: "Consumer Appliances",
    icon: Home,
    image: "/industry_appliances.png",
    tag: "REFRIGERATION",
    description:
      "Reliable engineered solutions powering modern home and commercial appliance technologies.",
    href: "/products",
  },
  {
    id: "industrial",
    num: "04",
    title: "Industrial & Data Infrastructure",
    icon: Factory,
    image: "/industry_industrial.png",
    tag: "CRITICAL COOLING",
    description:
      "Heavy-duty precision components supporting industrial operations and mission-critical data center cooling environments.",
    href: "/products",
  },
];

export function Industries() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-[#EEF5FC] dark:bg-[#081220] transition-colors duration-500 overflow-hidden border-y border-slate-200/70 dark:border-white/5">
      {/* 1. Dynamic Section Background Image on Card Hover */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {industries.map((ind, idx) => (
          <div
            key={ind.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              hoveredIdx === idx ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={ind.image}
              alt={ind.title}
              fill
              priority={idx === 0}
              className="object-cover object-center scale-100 transition-transform duration-700 ease-out filter contrast-105 brightness-95"
            />
            {/* Subtle 20% Blur & Gentle Gradient so foreground text reads comfortably while image remains recognizable */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#EEF5FC]/35 via-transparent to-[#EEF5FC]/45 dark:from-[#081220]/45 dark:via-transparent dark:to-[#081220]/55 backdrop-blur-[2px] pointer-events-none" />
          </div>
        ))}
      </div>

      {/* 2. Default Ambient Atmospheric Glows (Fades out when hovered to keep the image 100% crisp) */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-500",
          hoveredIdx !== null ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-blue-200/40 dark:bg-blue-600/10 blur-[130px]" />
        <div className="absolute bottom-0 right-10 w-[600px] h-[400px] rounded-full bg-sky-200/30 dark:bg-sky-500/5 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* =========================================================================
           SECTION HEADER
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20 space-y-4">
          {/* Top Tag: STRATEGIC EXCELLENCE with flanking decorative lines */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-[#2E5E99] dark:text-[#60A5FA]"
          >
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#2E5E99]/40 dark:bg-blue-400/40" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase">
              STRATEGIC EXCELLENCE
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#2E5E99]/40 dark:bg-blue-400/40" />
          </motion.div>

          {/* Main Title: Pioneering Critical Solutions */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-[#0D2440] dark:text-white leading-[1.12]"
          >
            Pioneering <br />
            <span className="text-[#2563EB] dark:text-[#60A5FA]">
              Critical Solutions
            </span>
          </motion.h2>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto font-normal px-2"
          >
            From HVAC and refrigeration systems to automotive, home appliances, industrial machinery, and modern data center cooling infrastructure — our precision-engineered components power the technologies driving today&apos;s industries.
          </motion.p>
        </div>

        {/* =========================================================================
           4 SECTOR CARDS: Clean White Cards with D-Shape Curving Right Edge on Hover
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  "relative group flex flex-col justify-between p-7 sm:p-8 min-h-[390px] sm:min-h-[430px]",
                  "bg-white/95 dark:bg-[#0c1626]/95 backdrop-blur-md text-left cursor-pointer overflow-hidden",
                  // D-shape continuous circular arch on hover
                  "transition-all duration-500 ease-out transform-gpu select-none",
                  isHovered
                    ? "rounded-l-2xl rounded-tr-[210px] rounded-br-[210px] border-2 border-[#2563EB] shadow-[0_25px_60px_rgba(37,99,235,0.22)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] -translate-y-2"
                    : "rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(46,94,153,0.06)] hover:border-slate-300"
                )}
              >
                {/* Top Section: Icon Circle Badge */}
                <div className="max-w-[85%]">
                  <div className="mb-6">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300",
                        isHovered
                          ? "bg-[#0D2440] text-white border-[#0D2440] shadow-md scale-105"
                          : "bg-slate-50 dark:bg-white/5 text-[#0D2440] dark:text-white border-slate-200 dark:border-white/15"
                      )}
                    >
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-[#0D2440] dark:text-white tracking-tight leading-snug mb-3">
                    {ind.title}
                  </h3>

                  {/* Accent Underline */}
                  <div
                    className={cn(
                      "h-[2px] transition-all duration-500 mb-4",
                      isHovered ? "w-12 bg-[#2563EB]" : "w-7 bg-slate-200 dark:bg-white/20"
                    )}
                  />

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {ind.description}
                  </p>
                </div>

                {/* Bottom Section: READ MORE Pill Button */}
                <div className="pt-8">
                  <Link
                    href={ind.href}
                    className={cn(
                      "inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300",
                      isHovered
                        ? "bg-[#0D2440] text-white shadow-md border border-[#0D2440]"
                        : "bg-transparent text-[#0D2440] dark:text-white border border-slate-300 dark:border-white/20 hover:border-slate-400"
                    )}
                  >
                    <span>READ MORE</span>
                    <ArrowRight
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        isHovered && "translate-x-1"
                      )}
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
