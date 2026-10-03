"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Users, GraduationCap, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    title: "Technical Training & L&D",
    category: "Knowledge",
    icon: GraduationCap,
    image: "/images/about-hero.png",
    desc: "Regular workshop sessions focusing on CNC automation, metallurgy standards, and shop floor safety protocols."
  },
  {
    title: "Team Culture & Offsites",
    category: "Culture",
    icon: Users,
    image: "/images/about-manufacturing.png",
    desc: "Annual engineering off-sites and collaborative hackathons to foster inter-departmental innovation."
  },
  {
    title: "CSR & Community Engagement",
    category: "Community",
    icon: Heart,
    image: "/images/industry-appliances.png",
    desc: "Supporting local technical education and environmental conservation projects across our manufacturing plant regions."
  }
];

export function CorporateActivities() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < activities.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] overflow-visible">
              Corporate{" "}
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
                Activities
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#0D2440]/70 dark:text-silver/70 text-sm sm:text-base max-w-md font-normal leading-relaxed"
          >
            Beyond engineering, we are committed to workforce empowerment, social responsibility, and a vibrant manufacturing culture.
          </motion.p>
        </div>

        {/* Corporate Activity Cards: Single visible card at a time with horizontal scroll on mobile (< md), 3-column grid on desktop (>= md) */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {activities.map((act, idx) => (
              <motion.div 
                variants={itemVariants}
                key={idx} 
                className="group bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl p-6 sm:p-7 overflow-hidden hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all duration-500 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                {/* Image Side - Compact 16:10 Ratio */}
                <div className="space-y-5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-[#7BA4D0]/20 dark:border-white/10 shrink-0 bg-slate-100 dark:bg-[#0D2440]">
                    <Image
                      src={act.image}
                      alt={act.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    </div>

                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs sm:text-sm leading-relaxed font-normal">
                      {act.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Marker */}
                <div className="pt-4 mt-5 border-t border-[#7BA4D0]/20 flex items-center justify-between text-xs font-semibold text-[#0D2440]/70 dark:text-silver/70 group-hover:text-[#2E5E99] transition-colors">
                  <span className="uppercase tracking-wider text-[10px]">Culture Initiative</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2E5E99] group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {activities.map((_, i) => (
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
                  activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
                )}
                aria-label={`Go to corporate activity card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
