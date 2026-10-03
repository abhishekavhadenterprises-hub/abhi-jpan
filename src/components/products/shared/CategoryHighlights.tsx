"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Box, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const mainCategories = [
  {
    name: "HVAC Solutions",
    count: "120+ Components",
    icon: Layers,
    image: "/images/industry-hvac.png",
    description: "High-performance precision manifolds and coils for global HVAC & refrigeration systems.",
    tag: "Thermal Systems",
    link: "/products?category=Copper%20Components"
  },
  {
    name: "Automotive Range",
    count: "85+ Components",
    icon: Settings,
    image: "/images/industry-auto.png",
    description: "Critical fuel lines, cooling circuits, and EV thermal assemblies for leading automotive OEMs.",
    tag: "Powertrain & EV",
    link: "/products?category=Steel%20Components"
  },
  {
    name: "Industrial Systems",
    count: "45+ Components",
    icon: Box,
    image: "/images/industry-industrial.png",
    description: "Heavy-duty CNC bent manifolds and robotic brazed assemblies for plant infrastructure.",
    tag: "Heavy Machinery",
    link: "/products?category=Brass%20Components"
  }
];

export function CategoryHighlights() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < mainCategories.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-14 md:py-20 bg-slate-50/60 dark:bg-[#070b14] overflow-visible border-t border-slate-200/80 dark:border-white/5 transition-colors duration-500">
      <div className="container-custom">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-2.5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E5E99]/10 dark:bg-white/5 border border-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0] text-xs font-heading font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Metallurgy Disciplines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight">
              Primary Product <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5E99] via-[#437ec4] to-[#7BA4D0]">
                Engineering Families
              </span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 md:mt-0"
          >
            <p className="text-slate-600 dark:text-white/65 text-xs sm:text-sm max-w-sm font-sans leading-relaxed">
              Explore our certified zero-defect tubular solutions custom manufactured across three high-precision domains.
            </p>
          </motion.div>
        </div>

        {/* Categories Grid - with ample headroom so hover lift never clips */}
        <div className="flex flex-col justify-between overflow-visible">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pt-3 pb-8 lg:pt-3 lg:pb-8 px-2 sm:px-3 lg:px-1 gap-5 sm:gap-6 lg:gap-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {mainCategories.map((cat, idx) => (
              <CategoryCard key={idx} category={cat} index={idx} />
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-2 z-10">
            {mainCategories.map((_, i) => (
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
                aria-label={`Go to category ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: (typeof mainCategories)[0]; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative h-[320px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center transition-all duration-500 border border-slate-200/80 dark:border-white/10"
    >
      <Link href={category.link} className="block w-full h-full">
        {/* Background Image with Smooth Zoom and Lighting Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover brightness-95 group-hover:brightness-105 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Multi-stage Contrast Scrim for Clear Image Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D18]/95 via-[#060D18]/40 to-black/15 group-hover:via-[#060D18]/25 transition-colors duration-500" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Component Count Glass Pill */}
          <div className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md border border-white/80 dark:border-white/20 rounded-full flex items-center gap-1.5 text-[#0D2440] dark:text-white">
            <category.icon className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
            <span className="text-[10px] font-heading font-semibold uppercase tracking-wider">{category.count}</span>
          </div>

          {/* Domain Tag */}
          <span className="text-[9px] font-heading font-semibold uppercase tracking-widest text-[#0D2440] dark:text-white bg-white/90 dark:bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/80 dark:border-white/20">
            {category.tag}
          </span>
        </div>

        {/* Bottom Card Content - Light Color Styling as requested */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20">
          <div className="relative flex flex-col justify-between bg-white/95 dark:bg-[#0B1728]/95 backdrop-blur-xl border border-white/80 dark:border-white/15 rounded-xl sm:rounded-2xl p-4 text-[#0D2440] dark:text-white transition-colors duration-300 group-hover:border-[#2E5E99]/50">
            {/* Title & Description */}
            <div className="space-y-1 pr-6">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white leading-snug group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-slate-600 dark:text-white/70 text-xs leading-relaxed line-clamp-1 font-sans font-normal">
                {category.description}
              </p>
            </div>

            {/* Bottom Strip */}
            <div className="pt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-white/10 mt-2.5">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#0D2440]/80 dark:text-white/80 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                Browse Components
              </span>
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/80 dark:border-white/20 group-hover:bg-[#2E5E99] group-hover:border-[#2E5E99] group-hover:text-white text-[#0D2440] dark:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
