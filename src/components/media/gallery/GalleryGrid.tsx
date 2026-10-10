"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="py-10 md:py-16 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <motion.div 
          layout
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 no-scrollbar pb-4 md:pb-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group relative aspect-[4/3] sm:aspect-square w-full md:w-auto shrink-0 md:shrink snap-center bg-slate-50 dark:bg-[#070b14] border border-[#7BA4D0]/25 dark:border-[#2E5E99]/30 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setSelectedImage(item.image)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Radiant Gradient Frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/90 via-[#0D2440]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-7">
                  <div className="flex items-end justify-between gap-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-semibold uppercase tracking-wider text-[#7BA4D0] mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-white font-heading font-bold text-lg md:text-xl leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#0D2440] dark:hover:bg-[#7BA4D0] dark:hover:text-[#0D2440] border border-white/30 flex items-center justify-center shrink-0 backdrop-blur-md transition-all duration-200">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dot Indicators for Mobile Scroll */}
        {filteredItems.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-6 md:hidden">
            {filteredItems.map((_, index) => (
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0D2440]/90 dark:bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center transition-all duration-200 z-[110]"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div 
            className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
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

