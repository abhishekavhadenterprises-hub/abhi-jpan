"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, MapPin, CheckCircle2, ArrowLeft } from "lucide-react";

interface EventDetail {
  title: string;
  date: string;
  location: string;
  desc: string;
  highlights: string[];
  gallery: string[];
}

interface EventDetailModalProps {
  event: EventDetail | null;
  onClose: () => void;
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  React.useEffect(() => {
    if (!event) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause Lenis smooth scroll on the background page while event modal is open
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div 
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100] w-full h-full bg-white dark:bg-[#070b14] overflow-y-auto overscroll-contain flex flex-col animate-in fade-in duration-300"
    >
      {/* Sticky Header Navigation Bar */}
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between shadow-xs">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-silver hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Events</span>
        </button>

        <button 
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#2E5E99] hover:text-white text-slate-700 dark:text-silver flex items-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </header>

      {/* Main Full Page Content */}
      <div className="max-w-6xl mx-auto w-full py-8 sm:py-12 md:py-16 px-4 sm:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12 flex-grow shrink-0 min-h-0">
        {/* Left Side: Narrative & Details */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EBF3FC] dark:bg-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0] text-xs font-bold uppercase tracking-wider mb-4">
              Event Spotlight
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-tight mb-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-600 dark:text-silver text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                <span className="font-semibold">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                <span className="font-semibold">{event.location}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-white/10 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Event Narrative</h4>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {event.desc}
            </p>
          </div>

          {/* Key Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="border-t border-slate-200 dark:border-white/10 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Key Highlights</h4>
              <ul className="space-y-3">
                {event.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side: Event Photo Gallery Grid */}
        <div className="w-full lg:w-1/2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Event Photo Gallery</h4>
          {event.gallery && event.gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {event.gallery.map((img, i) => (
                <div key={i} className={`relative overflow-hidden rounded-2xl group border border-slate-200/80 dark:border-white/10 shadow-sm ${i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'}`}>
                  <Image
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 text-center text-slate-400 text-sm">
              Official event photographs archived.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
