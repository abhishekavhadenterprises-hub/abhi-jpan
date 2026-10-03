"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Download, Eye } from "lucide-react";

const editions = [
  {
    id: 1,
    title: "The Precision Edge - Autumn 2025",
    date: "October 2025",
    summary: "Spotlight on our new Haryana facility expansion and the launch of the PV-7 series component line.",
    image: "/images/about-manufacturing.png",
    featured: true
  },
  {
    id: 2,
    title: "Innovations in Automated Brazing",
    date: "September 2025",
    summary: "Technical deep-dive into our 99.9% leak-free reliability standards using robotic alloy deposition.",
    image: "/images/quality-hero.png",
    featured: false
  },
  {
    id: 3,
    title: "Quarterly Sustainability Report - Q3",
    date: "August 2025",
    summary: "Achieving a 30% reduction in carbon footprint through integrated solar-thermal energy cycles.",
    image: "/images/industry-heavy.png",
    featured: false
  },
  {
    id: 4,
    title: "Navigating Global HVAC Standards",
    date: "July 2025",
    summary: "An analysis of evolving regulatory landscapes in the EU and NA markets for industrial tubing.",
    image: "/images/industry-hvac.png",
    featured: false
  },
  {
    id: 5,
    title: "The Future of EV Cooling Lines",
    date: "June 2025",
    summary: "Exploring our collaborative development of multi-plane cooling assemblies for next-gen batteries.",
    image: "/images/industry-auto.png",
    featured: false
  },
  {
    id: 6,
    title: "J Pan Tubular Components Limited Corporate Milestone: 20 Years",
    date: "May 2025",
    summary: "A commemorative look back at two decades of engineering excellence and industrial growth.",
    image: "/images/about-hero.png",
    featured: false
  }
];

export function NewsletterGrid() {
  return (
    <section className="py-24 bg-silver/5 dark:bg-black/10">
      <div className="container-custom">
        <div className="flex items-center gap-2 mb-12">
          <div className="h-0.5 w-8 bg-gold" />
          <span className="text-gold font-bold uppercase tracking-widest text-xs">Past Editions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editions.map((edition) => (
            <div 
              key={edition.id}
              className={`group flex flex-col bg-white dark:bg-charcoal border border-border rounded-sm overflow-hidden  transition-all duration-500 ${
                edition.featured ? "ring-2 ring-gold/20" : ""
              }`}
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={edition.image}
                  alt={edition.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-deepblue/20 group-hover:bg-transparent transition-colors" />
                {edition.featured && (
                  <div className="absolute top-4 right-4 bg-gold text-charcoal text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                    Featured Edition
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {edition.date}
                </div>
                <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-4 leading-tight group-hover:text-gold transition-colors">
                  {edition.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow line-clamp-3">
                  {edition.summary}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <button className="flex items-center gap-2 text-[10px] font-bold text-deepblue dark:text-gold uppercase tracking-widest hover:translate-x-2 transition-transform">
                    <Eye className="w-4 h-4" />
                    Read Edition
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-gold transition-colors" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="w-10 h-10 bg-gold text-charcoal font-bold flex items-center justify-center rounded-sm">1</div>
          <div className="w-10 h-10 bg-silver/10 hover:bg-gold/20 text-muted-foreground hover:text-charcoal font-bold flex items-center justify-center rounded-sm cursor-pointer transition-colors">2</div>
          <div className="w-10 h-10 bg-silver/10 hover:bg-gold/20 text-muted-foreground hover:text-charcoal font-bold flex items-center justify-center rounded-sm cursor-pointer transition-colors text-xl leading-none">...</div>
        </div>
      </div>
    </section>
  );
}
