"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, MapPin, CheckCircle2 } from "lucide-react";

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
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-[#0D2440]/80 dark:bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#070b14] border border-[#7BA4D0]/30 dark:border-[#2E5E99]/30 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-400">
        <button 
          className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#2E5E99] hover:text-white text-slate-700 dark:text-silver flex items-center justify-center transition-all duration-200 z-20"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EBF3FC] dark:bg-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0] text-xs font-semibold uppercase tracking-wider mb-5">
            Event Spotlight
          </div>
          
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#0D2440] dark:text-white mb-5 leading-tight">
            {event.title}
          </h2>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-slate-600 dark:text-silver/90 text-sm">
              <Calendar className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-silver/90 text-sm">
              <MapPin className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Event Narrative</h4>
            <p className="text-slate-600 dark:text-silver/80 text-sm leading-relaxed font-normal">
              {event.desc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Key Highlights</h4>
            <ul className="space-y-2.5">
              {event.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-700 dark:text-silver/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery Side */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto bg-slate-50 dark:bg-black/40">
          <div className="grid grid-cols-2 gap-3.5">
            {event.gallery.map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl group border border-slate-200 dark:border-white/10 ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                <Image
                  src={img}
                  alt={`Gallery ${i}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
