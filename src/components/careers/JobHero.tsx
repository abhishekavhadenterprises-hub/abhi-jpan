"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Briefcase, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface JobHeroProps {
  job: {
    title: string;
    location: string;
    experience: string;
    type: string;
    posted: string;
  };
}

export function JobHero({ job }: JobHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[400px] flex items-center overflow-hidden bg-charcoal">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/job-detail-hero.png" 
          alt={job.title}
          fill
          priority
          className="object-cover object-center opacity-30 grayscale brightness-75 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent dark:from-black dark:via-black/95 dark:to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <Link 
            href="/careers" 
            className="inline-flex items-center gap-3 text-[9px] font-bold text-gold uppercase tracking-[0.3em] mb-12 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Openings
          </Link>
          
          <h1 className="text-4xl md:text-7xl font-heading font-bold mb-8 leading-[1.1] text-white animate-in fade-in slide-in-from-left duration-1000">
            {job.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 md:gap-12 animate-in fade-in slide-in-from-left duration-1000 delay-200">
             <div className="flex items-center gap-3 text-silver/50">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{job.location}</span>
             </div>
             <div className="flex items-center gap-3 text-silver/50">
                <Briefcase className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{job.experience}</span>
             </div>
             <div className="flex items-center gap-3 text-silver/50">
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Posted: {job.posted}</span>
             </div>
             <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-white text-[9px] font-bold uppercase tracking-widest">
                {job.type}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
