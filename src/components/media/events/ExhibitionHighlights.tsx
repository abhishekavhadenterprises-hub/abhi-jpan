"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Globe, Users, Target, CheckCircle2 } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const exhibitions = [
  {
    title: "Global HVAC Fairs",
    desc: "A consistent presence at ACREX, Chillventa, and AHR Expo, demonstrating our leadership in thermal component precision.",
    icon: Globe,
    image: "/images/industry-hvac.png"
  },
  {
    title: "Automotive Expos",
    desc: "Showcasing our IATF-certified fuel and hydraulic lines at major auto component fairs across Asia and Europe.",
    icon: Target,
    image: "/images/industry-auto.png"
  },
  {
    title: "Industry Networking",
    desc: "Engaging with global engineering communities to co-create the next generation of tubular solutions.",
    icon: Users,
    image: "/images/about-hero.png"
  }
];

export function ExhibitionHighlights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Differential Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  const cardFloat0 = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const cardFloat1 = useTransform(smoothProgress, [0, 1], [0, 0]);
  const cardFloat2 = useTransform(smoothProgress, [0, 1], [18, -18]);
  const cardFloats = [cardFloat0, cardFloat1, cardFloat2];

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < exhibitions.length && newIndex !== activeIndex) {
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
      className="py-16 md:py-24 bg-[#F8FAFC]/50 dark:bg-black/50 transition-colors border-y border-[#7BA4D0]/15 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="mb-2 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              Global Trade
            </ScrollWipeHeading>
            <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
              Show Presence & Expos
            </div>
          </div>
        </div>

        {/* Exhibition Cards: 3-Column Grid on Desktop with Differential Parallax */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {exhibitions.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                style={{ y: cardFloats[idx] }}
                whileHover={{ 
                  y: -7, 
                  transition: { type: "spring", stiffness: 350, damping: 25 } 
                }}
                className="group relative flex flex-col bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl overflow-hidden transition-colors duration-300 w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
              >
                {/* Radiant Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/12 via-[#7BA4D0]/8 to-[#EBF3FC]/40 dark:from-[#2E5E99]/25 dark:via-[#1B365D]/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                {/* Top Panoramic Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-[#0D2440]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content Side */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow relative z-20">
                  <div>
                    <div className="w-13 h-13 rounded-2xl bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 mb-5 shrink-0 shadow-xs">
                      <item.icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-3 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Footer Marker */}
                  <div className="pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between text-xs font-semibold">
                    <span className="uppercase tracking-wider text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0]">
                      Global Showcase
                    </span>
                    <div className="w-7 h-7 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {exhibitions.map((_, i) => (
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
                aria-label={`Go to exhibition card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
