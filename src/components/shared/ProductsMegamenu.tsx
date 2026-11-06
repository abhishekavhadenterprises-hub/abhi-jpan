"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Icon3DAllProducts,
  Icon3DCopper,
  Icon3DBrass,
  Icon3DSteel,
} from "./Premium3DIcons";

const productCards = [
  {
    id: "all-products",
    badge: "Full Portfolio",
    tag: "Series 100-200",
    title: "All Products",
    subtitle: "Complete range of custom & standardized tubular assemblies",
    href: "/products",
    icon: Icon3DAllProducts,
  },
  {
    id: "copper-components",
    badge: "HVAC & Refrigeration",
    tag: "99.9% Cu Purity",
    title: "Copper Components",
    subtitle: "Distributors, Y-Joints, Return Bends, Headers & Assemblies",
    href: "/products?category=Copper%20Components",
    icon: Icon3DCopper,
  },
  {
    id: "brass-components",
    badge: "Valves & Connectors",
    tag: "Forged Brass",
    title: "Brass Components",
    subtitle: "Precision Flare Nuts, Bushings, Adapters & Couplings",
    href: "/products?category=Brass%20Components",
    icon: Icon3DBrass,
  },
  {
    id: "steel-components",
    badge: "Automotive & Auto",
    tag: "High Pressure",
    title: "Steel Components",
    subtitle: "Compressor Lines, Mufflers & High-Tensile Assemblies",
    href: "/products?category=Steel%20Components",
    icon: Icon3DSteel,
  },
];

interface ProductsMegamenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ProductsMegamenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: ProductsMegamenuProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-full max-w-5xl xl:max-w-6xl px-4 z-[90] pointer-events-auto"
        >
          {/* Master Premium Floating Box Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-[28px] sm:rounded-[32px] bg-white/95 dark:bg-[#0D2440]/95 backdrop-blur-2xl border border-[#7BA4D0]/30 dark:border-[#7BA4D0]/20 shadow-[0_24px_70px_rgba(13,36,64,0.16)] dark:shadow-[0_28px_85px_rgba(0,0,0,0.85)] p-6 sm:p-7 overflow-hidden transform-gpu"
          >
            {/* Top Luxury Metallic Accent Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#2E5E99] to-transparent opacity-80" />

            {/* Top Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#7BA4D0]/15 select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#2E5E99] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-heading font-black uppercase tracking-[0.22em] text-[#0D2440] dark:text-[#E7F0FA]">
                  Precision Tubular Product Lines
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E7F0FA] dark:bg-[#2E5E99]/30 text-[#2E5E99] dark:text-[#7BA4D0] font-bold tracking-wide">
                  150+ OEM Assemblies
                </span>
              </div>
              <Link
                href="/products"
                onClick={onClose}
                className="text-[11px] sm:text-xs font-bold text-[#2E5E99] dark:text-[#7BA4D0] hover:text-[#0D2440] dark:hover:text-white flex items-center gap-1 group/link transition-colors"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>

            {/* 4 Prominent Premium 3D Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {productCards.map((product) => {
                const IconComponent = product.icon;
                const isHovered = hoveredCardId === product.id;

                return (
                  <Link
                    key={product.id}
                    href={product.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredCardId(product.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={cn(
                      "group/card relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none min-h-[220px]",
                      isHovered
                        ? "bg-white dark:bg-[#071322] border-[#2E5E99] dark:border-[#7BA4D0] shadow-[0_14px_32px_rgba(46,94,153,0.18)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.55)] -translate-y-1.5"
                        : "bg-gradient-to-b from-[#E7F0FA]/50 to-white dark:from-white/[0.04] dark:to-white/[0.015] border-[#7BA4D0]/25 dark:border-white/10 hover:border-[#7BA4D0]/50"
                    )}
                  >
                    {/* Top Micro Tag & Arrow */}
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#2E5E99] dark:text-[#7BA4D0] bg-[#2E5E99]/[0.08] dark:bg-[#2E5E99]/25 px-2 py-0.5 rounded-md">
                        {product.badge}
                      </span>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300",
                          isHovered
                            ? "bg-[#2E5E99] text-white rotate-45 scale-110 shadow-sm"
                            : "bg-[#7BA4D0]/15 text-[#7BA4D0] dark:text-[#E7F0FA]/60"
                        )}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* 3D Component Icon on Pedestal */}
                    <div className="flex-1 flex items-center justify-center my-2 w-full">
                      <div
                        className={cn(
                          "relative w-full h-[105px] rounded-xl flex items-center justify-center transition-transform duration-500",
                          isHovered ? "scale-105" : "scale-100"
                        )}
                      >
                        {/* Soft pedestal glow */}
                        <div
                          className={cn(
                            "absolute inset-0 rounded-xl transition-opacity duration-300",
                            isHovered
                              ? "bg-gradient-to-b from-[#2E5E99]/[0.08] to-transparent dark:from-[#7BA4D0]/10"
                              : "bg-transparent"
                          )}
                        />
                        <IconComponent isHovered={isHovered} />
                      </div>
                    </div>

                    {/* Clean Bold Title & Subtitle */}
                    <div className="text-left w-full mt-2 pt-2 border-t border-[#7BA4D0]/15">
                      <h3
                        className={cn(
                          "text-sm font-heading font-black tracking-tight transition-colors leading-snug flex items-center justify-between",
                          isHovered
                            ? "text-[#2E5E99] dark:text-[#E7F0FA]"
                            : "text-[#0D2440] dark:text-[#E7F0FA]"
                        )}
                      >
                        <span>{product.title}</span>
                      </h3>
                      <p className="text-[11px] text-[#0D2440]/65 dark:text-[#E7F0FA]/65 font-normal leading-relaxed line-clamp-2 mt-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Trust & Quality Assurance Bar */}
            <div className="mt-4 pt-3.5 border-t border-[#7BA4D0]/15 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] text-[#0D2440]/70 dark:text-[#E7F0FA]/60 select-none">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E5E99] shrink-0" />
                <span className="font-semibold tracking-wide">
                  IATF 16949 & ISO 9001 Certified Manufacturing
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span>Robotic Precision Lines</span>
                <span className="opacity-30">•</span>
                <span>Custom OEM Tooling</span>
                <span className="opacity-30">•</span>
                <span className="font-bold text-[#2E5E99] dark:text-[#7BA4D0]">
                  Global JIT Dispatch
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
