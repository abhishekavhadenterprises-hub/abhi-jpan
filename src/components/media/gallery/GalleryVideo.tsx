"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const videos = [
  {
    id: 1,
    title: "Facility Walkthrough",
    duration: "2:45",
    thumbnail: "/images/advanced_manufacturing_facility_1778250027919.png",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "CNC Bending Process",
    duration: "1:30",
    thumbnail: "/images/industry-hvac.png",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export function GalleryVideo() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC]/50 dark:bg-[#070b14]/50 border-y border-[#7BA4D0]/15 dark:border-[#2E5E99]/20 transition-colors">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="mb-4 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              In <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0]">Action</span>
            </ScrollWipeHeading>
          </div>
          <p className="text-[#0D2440]/70 dark:text-silver/70 text-base md:text-lg leading-relaxed font-normal">
            Experience our manufacturing precision through immersive video 
            walkthroughs and process showcases.
          </p>
        </div>

        {/* Video Cards */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 no-scrollbar pb-4 md:pb-0"
        >
          {videos.map((v, idx) => (
            <motion.div 
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-video w-full md:w-auto shrink-0 md:shrink snap-center rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-[#7BA4D0]/25 dark:border-[#2E5E99]/30 shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => setActiveVideo(v.url)}
            >
              <Image
                src={v.thumbnail}
                alt={v.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
              />
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/90 via-black/20 to-black/20 group-hover:opacity-85 transition-opacity duration-300" />
              
              {/* Play Button Capsule */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/90 text-[#0D2440] dark:bg-[#2E5E99] dark:text-white flex items-center justify-center backdrop-blur-md shadow-xl group-hover:scale-110 group-hover:bg-[#0D2440] group-hover:text-white dark:group-hover:bg-[#7BA4D0] dark:group-hover:text-[#0D2440] transition-all duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-white font-heading font-bold text-xl sm:text-2xl mb-1">
                    {v.title}
                  </h3>
                  <p className="text-silver/80 text-xs sm:text-sm font-normal">
                    JPAN Precision Facility Tour
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider uppercase bg-white/20 text-white backdrop-blur-md border border-white/30 shrink-0">
                  {v.duration} Min
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot Indicators for Mobile Scroll */}
        {videos.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-6 md:hidden">
            {videos.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 rounded-sm transition-all duration-300",
                  activeIndex === index ? "bg-[#0D2440] dark:bg-[#7BA4D0] w-6" : "bg-[#7BA4D0]/30 dark:bg-white/20 w-2"
                )}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * scrollContainerRef.current.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0D2440]/90 dark:bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setActiveVideo(null)}
        >
          <button 
            className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center transition-all duration-200 z-[110]"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}

