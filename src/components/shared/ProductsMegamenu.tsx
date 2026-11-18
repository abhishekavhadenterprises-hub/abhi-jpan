"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    title: "All Products",
    href: "/products",
    icon: Icon3DAllProducts,
  },
  {
    id: "copper-components",
    title: "Copper Components",
    href: "/products?category=Copper%20Components",
    icon: Icon3DCopper,
  },
  {
    id: "brass-components",
    title: "Brass Components",
    href: "/products?category=Brass%20Components",
    icon: Icon3DBrass,
  },
  {
    id: "steel-components",
    title: "Steel Components",
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
  const pathname = usePathname() || "/";
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveCategory(params.get("category"));
    }
  }, [pathname, isOpen]);

  const isProductCardActive = (id: string) => {
    if (pathname !== "/products" && !pathname.startsWith("/products/")) return false;
    if (id === "all-products") return !activeCategory;
    if (id === "copper-components") return activeCategory === "Copper Components";
    if (id === "brass-components") return activeCategory === "Brass Components";
    if (id === "steel-components") return activeCategory === "Steel Components";
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-full max-w-4xl xl:max-w-5xl px-4 z-[90] pointer-events-auto"
        >
          {/* Master Clean Floating Box Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[28px] sm:rounded-[32px] bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_20px_60px_rgba(13,36,64,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-7 overflow-hidden transform-gpu"
          >
            {/* 4 Prominent Clean 3D Product Cards (1:1 Unified with Investor Menu Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
              {productCards.map((product) => {
                const IconComponent = product.icon;
                const isHovered = hoveredCardId === product.id;
                const isActive = isProductCardActive(product.id);

                return (
                  <Link
                    key={product.id}
                    href={product.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredCardId(product.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={cn(
                      "group/card relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer select-none min-h-[145px]",
                      isActive
                        ? "bg-[#EFF6FF] dark:bg-[#0D2440] border-[#2563EB] dark:border-[#60A5FA] shadow-[0_0_20px_rgba(37,99,235,0.18)] dark:shadow-[0_0_22px_rgba(59,130,246,0.3)]"
                        : isHovered
                          ? "bg-white dark:bg-[#0D2440] border-[#2563EB] dark:border-[#3B82F6] shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.45)] -translate-y-1"
                          : "bg-[#EEF1F5] dark:bg-white/[0.035] border-slate-200/90 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                    )}
                  >
                    {/* 3D Component Icon */}
                    <div className="mb-3 flex items-center justify-center">
                      <IconComponent isHovered={isHovered || isActive} />
                    </div>

                    {/* Clean Bold Title */}
                    <h3
                      className={cn(
                        "text-xs sm:text-[13px] font-bold tracking-tight transition-colors text-center leading-snug",
                        isActive
                          ? "text-[#2563EB] dark:text-[#93C5FD]"
                          : isHovered
                            ? "text-[#0D2440] dark:text-white"
                            : "text-slate-700 dark:text-slate-200"
                      )}
                    >
                      {product.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
