"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLaptopPacing } from "@/hooks/useLaptopPacing";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { isLaptop, revealDuration, staggerDelay, hoverClass } = useLaptopPacing();

  // Touch swipe gesture tracking for full-screen gallery modal
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev ?? 0) - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    touchDeltaXRef.current = deltaX;
    setDragOffset(deltaX * 0.7);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    const deltaX = touchDeltaXRef.current;
    if (deltaX < -40) {
      nextImage();
    } else if (deltaX > 40) {
      prevImage();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setDragOffset(0);
  };

  return (
    <section className="pt-2 pb-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: revealDuration(0.45), delay: isLaptop ? Math.min(idx % 6, 5) * staggerDelay(0.04) : idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={cn("group relative aspect-[4/3] sm:aspect-square w-full bg-slate-50 dark:bg-[#070b14] border border-[#7BA4D0]/25 dark:border-[#2E5E99]/30 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all", hoverClass("duration-500"))}
                onClick={() => setSelectedIndex(idx)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Radiant Gradient Frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/90 via-[#0D2440]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 md:p-7">
                  <div className="flex items-end justify-between gap-3 sm:gap-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#7BA4D0] mb-1.5 sm:mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-white font-heading font-bold text-base sm:text-lg md:text-xl leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#0D2440] dark:hover:bg-[#7BA4D0] dark:hover:text-[#0D2440] border border-white/30 flex items-center justify-center shrink-0 backdrop-blur-md transition-all duration-200">
                      <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with Finger Swipe Support */}
      {selectedIndex !== null && filteredItems[selectedIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0D2440]/90 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 animate-in fade-in duration-300 select-none touch-pan-y"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between z-[110] px-2 sm:px-4 py-2 shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-white/15 text-white text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider">
                {filteredItems[selectedIndex].category}
              </span>
              <span className="text-white/80 text-xs sm:text-sm font-heading font-medium">
                {filteredItems[selectedIndex].title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#7BA4D0] text-xs font-mono">
                {selectedIndex + 1} / {filteredItems.length}
              </span>
              <button 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center transition-all duration-200"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Main Swipable Image Area */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full flex-1 flex items-center justify-center min-h-0 py-2 sm:py-4"
          >
            {/* Desktop / Tablet Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-[#2E5E99] text-white border border-white/15 backdrop-blur-md z-30 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-[#2E5E99] text-white border border-white/15 backdrop-blur-md z-30 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Draggable/Swipable Image Container */}
            <div 
              style={{
                transform: dragOffset !== 0 ? `translateX(${dragOffset}px)` : undefined,
                transition: isSwiping ? "none" : "transform 0.25s ease-out"
              }}
              className="relative w-full h-full max-w-6xl max-h-[82vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl cursor-grab active:cursor-grabbing"
            >
              <Image
                src={filteredItems[selectedIndex].image}
                alt={filteredItems[selectedIndex].title}
                fill
                className="object-contain select-none pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

