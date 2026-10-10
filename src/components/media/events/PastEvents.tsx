"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { MapPin, ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const pastEvents = [
  {
    title: "Chillventa 2024",
    date: "October 2024",
    location: "Nuremberg, Germany",
    desc: "Showcasing advanced manifold solutions for the European refrigeration market.",
    image: "/images/about-manufacturing.png"
  },
  {
    title: "IREE 2023",
    date: "November 2023",
    location: "New Delhi, India",
    desc: "Presenting precision tubular components for the high-growth rail transportation sector.",
    image: "/images/industry-auto.png"
  },
  {
    title: "AHR Expo 2023",
    date: "February 2023",
    location: "Atlanta, USA",
    desc: "A successful showcase of custom-engineered copper assemblies for global HVAC OEMs.",
    image: "/images/industry-hvac.png"
  },
  {
    title: "MCE 2022",
    date: "June 2022",
    location: "Milan, Italy",
    desc: "Connecting with European cooling specialists and showcasing our fabrication excellence.",
    image: "/images/advanced_manufacturing_facility_1778250027919.png"
  }
];

interface PastEventsProps {
  onViewDetails: (event: any) => void;
}

export function PastEvents({ onViewDetails }: PastEventsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Alternating Column Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  const colYEven = useTransform(smoothProgress, [0, 1], [-16, 16]);
  const colYOdd = useTransform(smoothProgress, [0, 1], [16, -16]);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < pastEvents.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
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
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="lg:max-w-2xl">
            <div className="mb-2 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Past
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
                Global Participation
              </div>
            </div>
          </div>
          
          <p className="text-[#0D2440]/70 dark:text-silver/70 text-base md:text-lg lg:max-w-md font-normal leading-relaxed">
            A track record of excellence across the world's leading industrial 
            and technical exhibitions.
          </p>
        </div>

        {/* Past Event Cards: 4-Column Grid with Alternating Scroll Parallax */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {pastEvents.map((event, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                style={{ y: idx % 2 === 0 ? colYEven : colYOdd }}
                whileHover={{ 
                  y: -7, 
                  transition: { type: "spring", stiffness: 350, damping: 25 } 
                }}
                className="group flex flex-col bg-[#F8FAFC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl overflow-hidden transition-colors duration-300 h-full relative w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
              >
                {/* Image Container - Crisp, Vibrant Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#0D2440]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Top-Right Date Tag */}
                  <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-xl bg-white/95 dark:bg-[#0D2440]/95 backdrop-blur-md border border-[#7BA4D0]/25 text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] shadow-sm">
                    {event.date}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2.5 text-xs font-heading font-semibold text-[#0D2440]/65 dark:text-silver/70">
                      <MapPin className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors leading-snug">
                      {event.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed mb-6 font-normal">
                      {event.desc}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-[#7BA4D0]/20 flex items-center justify-between">
                    <button 
                      onClick={() => onViewDetails(event)}
                      className="text-xs font-heading font-bold uppercase tracking-wider text-[#2E5E99] dark:text-[#7BA4D0] hover:text-[#0D2440] dark:hover:text-white flex items-center gap-1.5 transition-colors group/btn cursor-pointer"
                    >
                      <span>View Highlights</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    
                    <div className="w-7 h-7 rounded-xl bg-[#EBF3FC] dark:bg-[#0D2440] flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
            {pastEvents.map((_, i) => (
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
                aria-label={`Go to past event ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
