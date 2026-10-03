"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Thermometer, Car, Home, Factory, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const usageSectors = [
  {
    name: "HVAC & Refrigeration",
    icon: Thermometer,
    image: "/images/industry-hvac.png",
    desc: "Precision copper headers, VRF manifolds, suction tubes, and oil cooling loops.",
    tag: "High-Pressure Rated",
    link: "/industries",
    metrics: "Tier-1 Global Supplier"
  },
  {
    name: "Automotive & EV",
    icon: Car,
    image: "/images/industry-auto.png",
    desc: "Coolant distribution lines, battery chill plates, and hydraulic tubular assemblies.",
    tag: "EV Thermal Management",
    link: "/industries",
    metrics: "IATF 16949 Certified"
  },
  {
    name: "Home Appliances",
    icon: Home,
    image: "/images/industry-appliances.png",
    desc: "Custom evaporator lines, accumulator tubes, and compressor connection fittings.",
    tag: "White Goods OEM",
    link: "/industries",
    metrics: "Zero-Defect PPM"
  },
  {
    name: "Heavy Industrial",
    icon: Factory,
    image: "/images/industry-industrial.png",
    desc: "Large-diameter stainless-steel manifolds and heavy-duty robotic brazed fluid networks.",
    tag: "Critical Plant Infra",
    link: "/industries",
    metrics: "100% Helium Tested"
  }
];

export function ProductIndustries() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < usageSectors.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-slate-50/60 dark:bg-[#070b14] text-[#0D2440] dark:text-white relative overflow-visible border-t border-slate-200/80 dark:border-white/5 transition-colors duration-500">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10 space-y-2.5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E5E99]/10 dark:bg-white/5 border border-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0] text-xs font-heading font-semibold uppercase tracking-wider"
          >
            <span>Sector Deployments</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black leading-tight tracking-tight text-[#0D2440] dark:text-white"
          >
            Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5E99] via-[#437ec4] to-[#7BA4D0]">We Serve</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-slate-600 dark:text-white/65 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed"
          >
            Delivering mission-critical fluid distribution, heat exchange, and structural tubing engineered for the world&apos;s leading manufacturers.
          </motion.p>
        </div>

        {/* Sectors Grid with Compact Half-Height Cards */}
        <div className="flex flex-col justify-between overflow-visible">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-4 md:pt-2 md:pb-4 px-2 sm:px-3 md:px-0 gap-4 sm:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {usageSectors.map((sector, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative h-[225px] sm:h-[235px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0B1728] border border-slate-200/90 dark:border-white/10 hover:border-[#2E5E99]/40 dark:hover:border-[#7BA4D0]/50 transition-all duration-500 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between cursor-pointer p-4 sm:p-5"
              >
                {/* 100% Crisp Background Image with Zero Wash/Blur */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    className="object-cover scale-100 group-hover:scale-108 transition-all duration-700 ease-out"
                  />
                  {/* Subtle bottom shadow gradient to ground the text card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <Link href={sector.link} className="block w-full h-full relative z-10 flex flex-col justify-between">
                  {/* Top Header: Clean Icon Capsule & Top Arrow Action */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/95 dark:bg-[#0B1728]/95 border border-slate-200/80 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                      <sector.icon className="w-4 h-4" />
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/95 dark:bg-[#0B1728]/95 group-hover:bg-[#2E5E99] text-[#0D2440] dark:text-white group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-slate-200/80 dark:border-white/15">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Content: Crisp Solid Text Card */}
                  <div className="mt-auto p-2.5 sm:p-3 rounded-xl bg-white/95 dark:bg-[#0B1728]/95 border border-slate-200/80 dark:border-white/10 transition-colors duration-300 group-hover:border-[#2E5E99]/40">
                    <h3 className="text-sm sm:text-base font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300 line-clamp-1">
                      {sector.name}
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-white/75 leading-relaxed font-sans font-normal line-clamp-2 mt-0.5">
                      {sector.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-2 z-10">
            {usageSectors.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (cardsRef.current && cardsRef.current.children[i]) {
                    cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#2E5E99]" : "w-1.5 bg-slate-300 dark:bg-white/20"
                )}
                aria-label={`Go to sector card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
