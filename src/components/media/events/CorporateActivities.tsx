"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { Users, GraduationCap, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  const cardFloat0 = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const cardFloat1 = useTransform(smoothProgress, [0, 1], [0, 0]);
  const cardFloat2 = useTransform(smoothProgress, [0, 1], [16, -16]);
  const cardFloats = [cardFloat0, cardFloat1, cardFloat2];

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
      transition: { staggerChildren: 0.14, delayChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors border-t border-[#7BA4D0]/15"
    >
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="mb-2 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Corporate Culture &
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
                Team Engagement
              </div>
            </div>
          </div>
          
          <p className="text-[#0D2440]/70 dark:text-silver/70 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Beyond engineering, we are committed to workforce empowerment, social responsibility, and a vibrant manufacturing culture.
          </p>
        </div>

        {/* Corporate Activity Cards: 3-Column Grid on Desktop */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {activities.map((act, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                style={{ y: cardFloats[idx] }}
                whileHover={{ 
                  y: -7, 
                  transition: { type: "spring", stiffness: 350, damping: 25 } 
                }}
                className="group bg-[#F8FAFC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl p-6 sm:p-7 overflow-hidden transition-colors duration-300 flex flex-col justify-between w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
              >
                {/* Image Side - Compact 16:10 Ratio */}
                <div className="space-y-5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#7BA4D0]/20 dark:border-white/10 shrink-0 bg-slate-100 dark:bg-[#0D2440]">
                    <Image
                      src={act.image}
                      alt={act.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Squircle Category Tag */}
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-xl bg-white/95 dark:bg-[#0D2440]/95 backdrop-blur-md border border-[#7BA4D0]/25 text-[10px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider shadow-sm">
                      {act.category}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                      {act.title}
                    </h3>
                    <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs sm:text-sm leading-relaxed font-normal">
                      {act.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Marker */}
                <div className="pt-4 mt-5 border-t border-[#7BA4D0]/20 flex items-center justify-between text-xs font-semibold text-[#0D2440]/70 dark:text-silver/70 group-hover:text-[#2E5E99] transition-colors">
                  <span className="uppercase tracking-wider text-[10px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0]">
                    Culture Initiative
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
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
                  "h-1.5 rounded-sm transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#0D2440] dark:bg-white" : "w-1.5 bg-[#7BA4D0]/40"
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
