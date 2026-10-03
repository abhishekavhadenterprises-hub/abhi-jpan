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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-charcoal rounded-sm overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
        <button 
          className="absolute top-6 right-6 text-charcoal dark:text-white hover:text-gold transition-colors z-10"
          onClick={onClose}
        >
          <X className="w-8 h-8" />
        </button>

        {/* Content Side */}
        <div className="w-full md:w-2/5 p-12 overflow-y-auto border-b md:border-b-0 md:border-r border-border">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Event Spotlight</span>
          </div>
          
          <h2 className="text-4xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
            {event.title}
          </h2>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-charcoal dark:text-white mb-4">Event Narrative</h4>
            <p className="text-muted-foreground leading-relaxed">
              {event.desc}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-charcoal dark:text-white mb-4">Key Highlights</h4>
            <ul className="space-y-3">
              {event.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery Side */}
        <div className="w-full md:w-3/5 p-4 md:p-8 overflow-y-auto bg-silver/5 dark:bg-black/20">
          <div className="grid grid-cols-2 gap-4">
            {event.gallery.map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-sm group ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                <Image
                  src={img}
                  alt={`Gallery ${i}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
