"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const galleryItems = [
  { id: 1, category: "Manufacturing", title: "Automated Brazing Line", image: "/images/about-manufacturing.png" },
  { id: 2, category: "Machinery", title: "Precision CNC Bender", image: "/images/custom-engineering.png" },
  { id: 3, category: "Products", title: "Copper Manifold Assembly", image: "/images/copper_component.png" },
  { id: 4, category: "Facilities", title: "Quality Control Lab", image: "/images/quality-hero.png" },
  { id: 5, category: "Manufacturing", title: "Hydro-Testing Station", image: "/images/steel_component.png" },
  { id: 6, category: "Products", title: "Automotive Fuel Lines", image: "/images/industry-auto.png" },
  { id: 7, category: "Machinery", title: "Multi-Axis Bending", image: "/images/industry-hvac.png" },
  { id: 8, category: "Facilities", title: "Raw Material Storage", image: "/images/infrastructure.png" },
  { id: 9, category: "Manufacturing", title: "Tube Cutting Center", image: "/images/industrial_industry_bg.png" },
];

interface GalleryGridProps {
  selectedCategory: string;
}

export function GalleryGrid({ selectedCategory }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll and activeIndex when category filter changes
  useEffect(() => {
    setActiveIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [selectedCategory]);

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 no-scrollbar pb-4 md:pb-0"
        >
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group relative aspect-[4/3] sm:aspect-square w-full md:w-auto shrink-0 md:shrink snap-center bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
              onClick={() => setSelectedImage(item.image)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              

              {/* Bottom Meta Overlay (Smooth Reveal) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/90 via-[#0D2440]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7BA4D0] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white font-heading font-bold text-lg md:text-xl leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/95 text-white hover:text-[#0D2440] dark:hover:bg-[#7BA4D0] dark:hover:text-[#0D2440] border border-white/40 flex items-center justify-center shrink-0 backdrop-blur-md transition-colors duration-200">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators for Mobile Scroll */}
        {filteredItems.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {filteredItems.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-[#0D2440] dark:bg-[#7BA4D0] w-6" : "bg-[#7BA4D0]/40 dark:bg-white/20"
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0D2440]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Full view"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}

