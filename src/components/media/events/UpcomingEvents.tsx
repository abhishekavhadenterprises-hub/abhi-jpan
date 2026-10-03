"use client";

import React, { useRef, useState } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] overflow-visible">
              Upcoming{" "}
              <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
                Engagements
              </span>
            </h2>
          </div>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 group self-start md:self-auto"
          >
            <span>Schedule a Meeting</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Upcoming Event Cards: Single visible card at a time with horizontal scroll on mobile (< lg), 2-column grid on desktop (>= lg) */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row lg:grid lg:grid-cols-2 overflow-x-auto lg:overflow-visible snap-x snap-mandatory py-2 px-1 gap-6 lg:gap-8 no-scrollbar w-full"
          >
            {upcomingEvents.map((event, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col md:flex-row bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#2E5E99]/60 hover:bg-[#F1F6FB] transition-all duration-500 w-full min-w-full lg:min-w-0 lg:w-full shrink-0 snap-center"
              >
                {/* Date Box */}
                <div className="md:w-36 bg-[#0D2440] p-6 sm:p-8 flex flex-col items-center justify-center text-white shrink-0 border-b md:border-b-0 md:border-r border-[#7BA4D0]/20">
                  <Calendar className="w-6 h-6 mb-2 text-[#7BA4D0]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-silver/70">Starts</span>
                  <span className="text-2xl sm:text-3xl font-heading font-bold text-white my-0.5">{event.date.split(' ')[1]}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7BA4D0]">{event.date.split(' ')[0]}</span>
                </div>

                {/* Info */}
                <div className="flex-grow p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <MapPin className="w-4 h-4 text-[#2E5E99] shrink-0" />
                      <span className="text-xs font-semibold text-[#0D2440]/60 dark:text-silver/70 uppercase tracking-wider">{event.location}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-3 group-hover:text-[#2E5E99] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-[#0D2440]/75 dark:text-silver/80 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {event.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-end pt-4 border-t border-[#7BA4D0]/20">
                    <a 
                      href="/contact" 
                      className="text-xs font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Know More</span> 
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
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
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#0D2440]" : "w-1.5 bg-[#7BA4D0]/40"
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
