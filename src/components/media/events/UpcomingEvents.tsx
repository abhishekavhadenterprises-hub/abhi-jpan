"use client";

import React, { useRef, useState } from "react";
import { Calendar, MapPin, ArrowRight, Building2 } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const upcomingEvents = [
  {
    title: "ACREX India 2026",
    date: "Feb 15 - 17, 2026",
    location: "BIEC, Bengaluru",
    desc: "South Asia's largest exhibition on Air Conditioning, Heating, Ventilation and Intelligent Buildings.",
    booth: "Hall 2, Booth A-45"
  },
  {
    title: "Auto Expo - Components 2026",
    date: "Jan 12 - 15, 2026",
    location: "Pragati Maidan, New Delhi",
    desc: "The primary event for the automotive component industry, showcasing the latest in precision engineering.",
    booth: "Hall 5, Stall 12"
  }
];

export function UpcomingEvents() {
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
  const cardFloat1 = useTransform(smoothProgress, [0, 1], [16, -16]);
  const cardFloats = [cardFloat0, cardFloat1];

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < upcomingEvents.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 bg-white dark:bg-black transition-colors relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="mb-2 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Upcoming
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
                Global Engagements
              </div>
            </div>
          </div>

          <motion.a 
            href="/contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-2xl bg-[#0D2440] hover:bg-[#2E5E99] text-white font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#2E5E99]/20 group self-start md:self-auto cursor-pointer"
          >
            <span>Schedule a Meeting</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Executive Exhibition Billboards: 2-Column Grid on Desktop with Parallax */}
        <div className="flex flex-col justify-between w-full">
          <motion.div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-row lg:grid lg:grid-cols-2 overflow-x-auto lg:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {upcomingEvents.map((event, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                style={{ y: cardFloats[idx] }}
                whileHover={{ 
                  y: -6, 
                  transition: { type: "spring", stiffness: 350, damping: 25 } 
                }}
                className="group flex flex-col md:flex-row bg-[#F8FAFC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-3xl overflow-hidden transition-colors duration-300 w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center shadow-xs hover:shadow-2xl hover:shadow-[#2E5E99]/8 cursor-default"
              >
                {/* Monolithic Date Vault */}
                <div className="w-full md:w-44 bg-[#0D2440] dark:bg-[#070b14] p-6 sm:p-8 flex flex-col items-center justify-center text-white shrink-0 border-b md:border-b-0 md:border-r border-[#7BA4D0]/20 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#7BA4D0] mb-3 group-hover:scale-105 transition-transform duration-300">
                    <Calendar className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-300">Starts</span>
                  <span className="text-2xl sm:text-3xl font-heading font-black text-white my-0.5">{event.date.split(' ')[1]}</span>
                  <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#7BA4D0]">{event.date.split(' ')[0]}</span>

                  {event.booth && (
                    <div className="mt-4 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-[10px] font-heading font-bold text-slate-200 uppercase tracking-wider text-center">
                      {event.booth}
                    </div>
                  )}
                </div>

                {/* Info Container */}
                <div className="flex-grow p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-[#EBF3FC] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-heading font-bold text-[#0D2440]/70 dark:text-silver/80 uppercase tracking-wider">{event.location}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-3 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {event.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#7BA4D0]/20">
                    <div className="flex items-center gap-1.5 text-xs text-[#0D2440]/60 dark:text-silver/70 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      <span>{event.booth}</span>
                    </div>
                    
                    <a 
                      href="/contact" 
                      className="text-xs font-heading font-bold uppercase tracking-wider text-[#0D2440] dark:text-white hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Connect with Team</span> 
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Pagination Indicator Dots - Squircle */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-6 z-10">
            {upcomingEvents.map((_, i) => (
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
                aria-label={`Go to event card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
