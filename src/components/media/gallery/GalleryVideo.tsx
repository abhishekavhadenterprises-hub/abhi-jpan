"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section className="py-20 md:py-28 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 leading-[1.22] overflow-visible">
            In{" "}
            <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
              Action
            </span>
          </h2>
          <p className="text-[#0D2440]/70 dark:text-silver/70 text-base md:text-lg leading-relaxed">
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
          {videos.map((v) => (
            <div 
              key={v.id}
              className="group relative aspect-video w-full md:w-auto shrink-0 md:shrink snap-center rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-[#F8FAFC] dark:bg-charcoal/50 border border-[#7BA4D0]/25 transition-all duration-500"
              onClick={() => setActiveVideo(v.url)}
            >
              <Image
                src={v.thumbnail}
                alt={v.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/85 via-transparent to-black/20 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Play Button Capsule */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#0D2440] dark:bg-[#7BA4D0] dark:text-[#0D2440] flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-[#0D2440] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#0D2440] transition-all duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-white font-heading font-bold text-xl sm:text-2xl mb-1">
                    {v.title}
                  </h3>
                  <p className="text-silver/80 text-xs sm:text-sm">
                    JPAN Precision Facility Tour
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/20 text-white backdrop-blur-md border border-white/30 shrink-0">
                  {v.duration} Min
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators for Mobile Scroll */}
        {videos.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {videos.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-[#0D2440] w-6" : "bg-[#7BA4D0]/40"
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
          className="fixed inset-0 z-[100] bg-[#0D2440]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setActiveVideo(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-[110]"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20"
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

