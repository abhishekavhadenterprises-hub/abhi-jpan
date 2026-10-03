"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const eventsData = [
  {
    "id": 1,
    "title": "ACREX - 2026",
    "thumbnail": "/Event images/ACREX - 2026/sd.jpeg",
    "images": [
      "/Event images/ACREX - 2026/sd.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-12 at 11.51.39 AM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-12 at 11.51.46 AM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-14 at 4.45.58 PM (1).jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-14 at 4.45.58 PM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-14 at 4.46.24 PM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-14 at 4.46.25 PM (1).jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-14 at 4.46.25 PM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-14 at 4.46.26 PM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.45 AM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.47 AM (1).jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.47 AM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.48 AM (1).jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.48 AM (2).jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.48 AM (3).jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.48 AM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.07.49 AM.jpeg",
      "/Event images/ACREX - 2026/WhatsApp Image 2026-03-16 at 10.08.32 AM.jpeg"
    ]
  },
  {
    "id": 2,
    "title": "Fire Safety - 2026",
    "thumbnail": "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.09.46 AM.jpeg",
    "images": [
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.09.46 AM.jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.10.22 AM.jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.29 AM (1).jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.29 AM (2).jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.29 AM.jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.30 AM (1).jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.30 AM.jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.31 AM (1).jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.31 AM.jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.32 AM (1).jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.32 AM.jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.33 AM (1).jpeg",
      "/Event images/Fire Safety - 2026/WhatsApp Image 2026-02-20 at 9.27.33 AM.jpeg"
    ]
  },
  {
    "id": 3,
    "title": "Health Check Up",
    "thumbnail": "/Event images/Health Check Up/WhatsApp Image 2025-12-19 at 12.57.09 PM.jpeg",
    "images": [
      "/Event images/Health Check Up/WhatsApp Image 2025-12-19 at 12.57.09 PM.jpeg",
      "/Event images/Health Check Up/WhatsApp Image 2025-12-19 at 12.57.13 PM.jpeg",
      "/Event images/Health Check Up/WhatsApp Image 2025-12-19 at 12.57.15 PM.jpeg",
      "/Event images/Health Check Up/WhatsApp Image 2025-12-19 at 12.57.16 PM.jpeg"
    ]
  },
  {
    "id": 4,
    "title": "Health Talk",
    "thumbnail": "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.45 AM (1).jpeg",
    "images": [
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.45 AM (1).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.45 AM.jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.46 AM (1).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.46 AM (2).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.46 AM.jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.47 AM (1).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.47 AM (2).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-20 at 9.24.47 AM.jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.11 PM.jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.12 PM (1).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.12 PM (2).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.12 PM.jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.13 PM (1).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.13 PM (2).jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.13 PM.jpeg",
      "/Event images/Health Talk/WhatsApp Image 2025-12-22 at 3.07.14 PM.jpeg"
    ]
  },
  {
    "id": 5,
    "title": "ISO Training - 2026",
    "thumbnail": "/Event images/ISO Training - 2026/WhatsApp Image 2026-02-04 at 3.36.41 PM (1).jpeg",
    "images": [
      "/Event images/ISO Training - 2026/WhatsApp Image 2026-02-04 at 3.36.41 PM (1).jpeg",
      "/Event images/ISO Training - 2026/WhatsApp Image 2026-02-04 at 3.36.41 PM.jpeg",
      "/Event images/ISO Training - 2026/WhatsApp Image 2026-02-04 at 3.36.42 PM (1).jpeg",
      "/Event images/ISO Training - 2026/WhatsApp Image 2026-02-04 at 3.36.42 PM (2).jpeg",
      "/Event images/ISO Training - 2026/WhatsApp Image 2026-02-04 at 3.36.42 PM.jpeg",
      "/Event images/ISO Training - 2026/WhatsApp Image 2026-02-04 at 3.36.43 PM.jpeg"
    ]
  },
  {
    "id": 6,
    "title": "POSH - March 2026",
    "thumbnail": "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.04 PM.jpeg",
    "images": [
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.04 PM.jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.06 PM (1).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.06 PM.jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.07 PM (1).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.07 PM (2).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.07 PM.jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.08 PM (1).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.08 PM (2).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.08 PM.jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.09 PM (1).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.09 PM (2).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.09 PM.jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.10 PM (1).jpeg",
      "/Event images/POSH - March 2026/WhatsApp Image 2026-03-14 at 4.15.10 PM.jpeg"
    ]
  },
  {
    "id": 7,
    "title": "POSH December",
    "thumbnail": "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.29 AM (1).jpeg",
    "images": [
      "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.29 AM (1).jpeg",
      "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.29 AM.jpeg",
      "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.30 AM (1).jpeg",
      "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.30 AM (2).jpeg",
      "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.30 AM.jpeg",
      "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.31 AM (1).jpeg",
      "/Event images/POSH December/WhatsApp Image 2025-12-12 at 10.37.31 AM.jpeg"
    ]
  },
  {
    "id": 8,
    "title": "HOLI - 2026",
    "thumbnail": "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.16 PM.jpeg",
    "images": [
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.16 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.17 PM (1).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.17 PM (2).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.17 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.18 PM (1).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.18 PM (2).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.18 PM (3).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.18 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.19 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.21 PM (1).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.21 PM (2).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.21 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.22 PM (1).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.22 PM (2).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.22 PM (3).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.22 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.29 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.30 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.35 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.43 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.09.53 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.10.01 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.10.06 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.10.09 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.10.14 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.10.24 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-03 at 9.10.29 PM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 8.58.29 AM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.04 AM (1).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.04 AM (2).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.04 AM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.05 AM (1).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.05 AM (2).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.05 AM (3).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.05 AM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.06 AM (1).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.06 AM (2).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.06 AM (3).jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.06 AM.jpeg",
      "/Event images/HOLI - 2026/WhatsApp Image 2026-03-05 at 9.21.07 AM.jpeg"
    ]
  }
];

export function EventPhotos() {
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < eventsData.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle body scroll locking safely
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // reset completely
    }

    // Cleanup function ensures scrolling is restored when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  // Handle keyboard events (Esc to close, Left/Right arrow to navigate)
  useEffect(() => {
    if (!selectedEvent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => 
          prev === 0 ? selectedEvent.images.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  const openLightbox = (eventItem: typeof eventsData[0]) => {
    setSelectedEvent(eventItem);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedEvent(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 leading-[1.22] overflow-visible">
            Event{" "}
            <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
              Photos
            </span>
          </h2>
          <p className="text-[#0D2440]/70 dark:text-silver/70 text-sm sm:text-base leading-relaxed">
            Glimpses from our recent exhibitions, training sessions, and corporate milestones.
          </p>
        </div>

        {/* Gallery Cards: Single visible card at a time with horizontal scroll on mobile (< sm), 4-column grid on desktop (>= md) */}
        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row sm:grid sm:grid-cols-2 md:grid-cols-4 overflow-x-auto snap-x snap-mandatory py-2 px-1 gap-6 no-scrollbar w-full"
          >
            {eventsData.map((item) => (
              <div 
                key={item.id} 
                className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F8FAFC] dark:bg-charcoal/40 transition-all duration-500 border border-[#7BA4D0]/25 hover:border-[#7BA4D0]/60 w-full min-w-full sm:min-w-0 sm:w-full shrink-0 snap-center flex flex-col justify-between"
                onClick={() => openLightbox(item)}
              >
                <div className="aspect-square relative overflow-hidden shrink-0 bg-slate-100 dark:bg-[#0D2440]">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-charcoal/90 text-[#0D2440] dark:text-white flex items-center justify-center backdrop-blur-md">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-charcoal/80 border-t border-[#7BA4D0]/20 group-hover:border-[#7BA4D0]/40 transition-colors flex-grow flex flex-col justify-center">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-[#0D2440] dark:text-white text-center truncate">{item.title}</h3>
                  <p className="text-xs font-semibold text-[#2E5E99] text-center mt-1">{item.images.length} Photos</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-6 z-10">
            {eventsData.map((_, i) => (
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
                aria-label={`Go to event gallery card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedEvent && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col bg-[#050505] overflow-hidden animate-in fade-in duration-300">
          
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-6">
              <button 
                onClick={closeLightbox}
                className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-gold text-white hover:text-charcoal rounded-full border border-white/10 hover:border-gold transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Events</span>
              </button>
              <div className="hidden md:block w-px h-8 bg-white/20" />
              <div>
                 <h3 className="text-xl font-bold text-white leading-none">{selectedEvent.title}</h3>
                 <p className="text-gold text-xs font-medium mt-1.5 uppercase tracking-widest">
                   Image {currentImageIndex + 1} of {selectedEvent.images.length}
                 </p>
              </div>
            </div>
            
            <button 
              onClick={closeLightbox}
              className="p-2.5 bg-white/5 hover:bg-gold text-white hover:text-charcoal rounded-full border border-white/10 hover:border-gold transition-all duration-300"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center w-full p-4 md:p-8">
            <button 
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-gold hover:scale-110 text-white hover:text-charcoal rounded-full transition-all duration-300 z-50 backdrop-blur-md border border-white/10 hover:border-gold"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-gold hover:scale-110 text-white hover:text-charcoal rounded-full transition-all duration-300 z-50 backdrop-blur-md border border-white/10 hover:border-gold"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="relative w-full h-full max-w-5xl max-h-full animate-in zoom-in-95 duration-300">
              <Image
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} - ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1200px"
                className="object-contain select-none"
                priority
              />
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 shrink-0">
            <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2 px-4 max-w-7xl mx-auto">
              {selectedEvent.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={cn(
                    "relative w-28 h-20 shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300",
                    currentImageIndex === idx ? "border-gold opacity-100 scale-105" : "border-transparent opacity-40 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
