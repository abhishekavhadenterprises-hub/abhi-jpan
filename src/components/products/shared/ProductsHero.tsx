"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

// 12 Flagship J-Pan Products for the 3D Inspection Stream
const inspectionProducts = [
  {
    id: 114,
    name: "Copper Distributor (24 Holes)",
    category: "Copper Components",
    material: "Pure Deoxidized Copper",
    spec: "±0.005mm Tolerance",
    image: "/products/Copper Distributor - 24 Holes.png",
  },
  {
    id: 104,
    name: "Brass Distributor (Coated)",
    category: "Brass Components",
    material: "High-Tensile Brass",
    spec: "Balanced Dispensing",
    image: "/products/Brass Distributors.png",
  },
  {
    id: 139,
    name: "Refnet Joint (Y-Joint)",
    category: "Copper Components",
    material: "High-Purity Copper",
    spec: "Optimal Flow Routing",
    image: "/products/Refnet or Y Joint-1.png",
  },
  {
    id: 100,
    name: "5A Distributor",
    category: "Copper Components",
    material: "Refrigerant Grade Cu",
    spec: "Equal Pressure Chamber",
    image: "/products/5A-Distributor.png",
  },
  {
    id: 108,
    name: "Capillary Tube Assembly",
    category: "Copper Components",
    material: "Precision Bended Cu",
    spec: "3D CNC Formed",
    image: "/products/CAPILLARY TUBE ASSEMBLY.png",
  },
  {
    id: 143,
    name: "SS Thermal Assembly 1",
    category: "Stainless Steel",
    material: "Grade 304 Stainless",
    spec: "Helium Leak Tested",
    image: "/products/SS Assembly 1.png",
  },
  {
    id: 105,
    name: "Brazing Ring",
    category: "Copper Components",
    material: "Silver-Copper Alloy",
    spec: "Zero Slag Purity",
    image: "/products/Brazing Ring.png",
  },
  {
    id: 106,
    name: "Bus Bar",
    category: "Copper Components",
    material: "ETP Electrical Copper",
    spec: "100% Conductivity",
    image: "/products/Bus Bar.png",
  },
  {
    id: 121,
    name: "Flare Nuts",
    category: "Brass Components",
    material: "Forged Brass CW617N",
    spec: "ISO Metric Threaded",
    image: "/products/Flare Nuts.png",
  },
  {
    id: 113,
    name: "Condenser Inlet Loop",
    category: "Copper Components",
    material: "Automotive Grade Copper",
    spec: "Zero-Defect Formed",
    image: "/products/Condenser Inlet.png",
  },
  {
    id: 144,
    name: "SS Dual Assembly",
    category: "Stainless Steel",
    material: "Automotive Grade SS",
    spec: "High Vibration Duty",
    image: "/products/SS Assembly 2.png",
  },
  {
    id: 140,
    name: "Return Bend & Sensor Holder",
    category: "Copper Components",
    material: "Seamless Copper Tubing",
    spec: "OEM Verified Fit",
    image: "/products/Return Bend and Sensor Holder.png",
  },
];

export function ProductsHero() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [stepX, setStepX] = useState(145);
  const totalProducts = inspectionProducts.length;

  // Responsive step spacing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setStepX(100);
      } else if (window.innerWidth < 1024) {
        setStepX(125);
      } else {
        setStepX(145);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatic transition: Slides advance smoothly every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Smooth scroll handler to the catalog filter bar
  const scrollToCatalog = (category?: string) => {
    if (category) {
      const url = new URL(window.location.href);
      url.searchParams.set("category", category);
      window.history.pushState({}, "", url);
      window.dispatchEvent(new Event("popstate"));
    }
    const filterElement =
      document.querySelector("input[placeholder*='Search']") ||
      document.querySelector("main");
    if (filterElement) {
      filterElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Generate virtual window of visible cards around the current index
  // Range from -4 to +4 (9 visible fanned cards)
  const visibleCards = [];
  for (let offset = -4; offset <= 4; offset++) {
    const k = virtualIndex + offset;
    const productIndex = ((k % totalProducts) + totalProducts) % totalProducts;
    visibleCards.push({
      key: k,
      product: inspectionProducts[productIndex],
      offset: offset,
    });
  }

  return (
    <section className="relative w-full flex flex-col justify-start overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#EEF4FB] via-[#F8FAFC] to-white dark:from-[#060D17] dark:via-[#081220] dark:to-[#050B14] transition-colors duration-500">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-[#7BA4D0]/15 dark:bg-[#2E5E99]/15 blur-[130px] rounded-full pointer-events-none" />

      {/* 
        ========================================================================
        TOP HEADING: Positioned at the very top as requested
        ========================================================================
      */}
      <div className="container-custom relative z-10 w-full max-w-4xl mx-auto text-center mb-8 sm:mb-12 px-4">
        <ScrollWipeHeading
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.08] tracking-tight block"
          revealedColor="currentColor"
          wipingColor="#2E5E99"
          unrevealedColor="rgba(148, 163, 184, 0.4)"
        >
          <span>Precision Engineered.</span> <br />
          <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0]">
            Tubular Solutions.
          </span>
        </ScrollWipeHeading>
      </div>

      {/* 
        ========================================================================
        FAVORITE 3D FANNED CAROUSEL DESIGN (Flicker-Free Virtual Window Architecture)
        - Horizontal fanned arc with 3D inward tilt
        - Directional smooth translation: no card ever flips or teleports
        - Automatically changes every 3 seconds
        - Zero unneeded UI elements
        ========================================================================
      */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden py-4 select-none">
        <div
          className="relative w-full h-[390px] sm:h-[430px] md:h-[460px] flex items-center justify-center [perspective:1200px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {visibleCards.map(({ key, product, offset }) => {
            const absOffset = Math.abs(offset);

            // 3D coverflow geometry
            const xPos = offset * stepX;
            const rotateY =
              offset === 0
                ? 0
                : offset < 0
                ? Math.min(22 + (absOffset - 1) * 9, 44)
                : -Math.min(22 + (absOffset - 1) * 9, 44);
            const zPos = offset === 0 ? 50 : -absOffset * 48;
            const scale = offset === 0 ? 1.05 : Math.max(0.74, 1 - absOffset * 0.08);
            const zIndex = 40 - absOffset * 6;
            const opacity =
              absOffset >= 4
                ? 0.25
                : absOffset === 3
                ? 0.72
                : absOffset === 2
                ? 0.92
                : 1;

            const isCenter = offset === 0;

            return (
              <motion.div
                key={key}
                onClick={() => {
                  if (isCenter) {
                    scrollToCatalog(product.category);
                  } else {
                    setVirtualIndex((prev) => prev + offset);
                  }
                }}
                animate={{
                  x: xPos,
                  z: zPos,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                }}
                className={`absolute w-[220px] sm:w-[250px] md:w-[270px] h-[310px] sm:h-[350px] md:h-[380px] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-shadow duration-300 ${
                  isCenter
                    ? "bg-white dark:bg-[#0e1a2d] border-2 border-[#2E5E99]/40 dark:border-[#7BA4D0]/40 shadow-2xl shadow-[#2E5E99]/20"
                    : "bg-white/95 dark:bg-[#0c1527]/95 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-[#0D2440]/8 hover:brightness-105"
                }`}
              >
                {/* Subtle Ambient Light Glow on Active Center Card */}
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#EBF3FC]/60 via-transparent to-transparent rounded-[28px] sm:rounded-[32px] pointer-events-none" />
                )}

                {/* Card Top: Clean Category Badge (No Part Codes) */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider ${
                      isCenter
                        ? "bg-[#2E5E99] text-white shadow-sm"
                        : "bg-[#EBF3FC] dark:bg-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0]"
                    }`}
                  >
                    {product.category.replace(" Components", "")}
                  </span>
                </div>

                {/* Card Center: Crystal Clear Transparent Product Cutout Image */}
                <div className="relative z-10 w-full h-[150px] sm:h-[180px] md:h-[200px] my-auto flex items-center justify-center p-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 240px, 270px"
                    priority={isCenter}
                    className={`object-contain p-2 transition-transform duration-500 drop-shadow-md ${
                      isCenter ? "scale-105 drop-shadow-xl" : ""
                    }`}
                  />
                </div>

                {/* Card Bottom: Product Title & Engineering Specification */}
                <div className="relative z-10 pt-2.5 border-t border-slate-100 dark:border-white/10">
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-[#0D2440] dark:text-white leading-tight line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 dark:text-silver/70">
                    <span className="truncate max-w-[170px]">{product.spec}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-[#2E5E99] transition-transform ${
                        isCenter ? "translate-x-0.5 opacity-100" : "opacity-40"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
