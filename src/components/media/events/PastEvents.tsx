"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Camera, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.1 } }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="lg:max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white tracking-tight leading-[1.22] overflow-visible">
              Past <br className="hidden md:block" />
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
                Participation
              </span>
            </h2>
          </div>
          
          <p className="text-[#0D2440]/70 dark:text-silver/70 text-base md:text-lg lg:max-w-md font-normal leading-relaxed">
            A track record of excellence across the world's leading industrial 
            and technical exhibitions.
          </p>
        </div>

        {/* Past Event Cards: Single visible card at a time with horizontal scroll on mobile (< md), 4-column grid on desktop (>= lg) */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {pastEvents.map((event, idx) => (
              <motion.div 
                variants={itemVariants}
                key={idx} 
                className="group flex flex-col bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#7BA4D0]/60 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 h-full relative w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center"
              >
                {/* Image Container - 100% clear and vibrant */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-[#0D2440]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Soft Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info Container */}
                <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#2E5E99] uppercase tracking-wider block mb-2">{event.date}</span>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2.5 group-hover:text-[#2E5E99] transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold text-[#0D2440]/60 dark:text-silver/70">
                      <MapPin className="w-3.5 h-3.5 text-[#2E5E99] shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-silver/80 leading-relaxed mb-6 font-normal">
                      {event.desc}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => onViewDetails({
                      ...event,
                      highlights: [
                        "Successful booth with 500+ visitors",
                        "Showcased new copper bend range",
                        "Networking with key OEM partners"
                      ],
                      gallery: [
                        event.image,
                        "/images/about-manufacturing.png",
                        "/images/industry-hvac.png",
                        "/images/quality-hero.png"
                      ]
                    })}
                    className="mt-auto group/btn flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0D2440] dark:text-white hover:text-[#2E5E99] transition-colors self-start"
                  >
                    <span>View Gallery</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 text-[#2E5E99]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
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
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
                )}
                aria-label={`Go to past event card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
