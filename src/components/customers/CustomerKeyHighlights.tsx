"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";

const highlights = [
  {
    company: "Tata Motors",
    industry: "Automotive",
    duration: "12+ Years",
    desc: "A strategic relationship focused on delivering precision fuel lines and hydraulic assemblies for heavy commercial vehicles.",
    image: "/images/industry-auto.png"
  },
  {
    company: "Daikin Industries",
    industry: "HVAC & R",
    duration: "15+ Years",
    desc: "Supporting global cooling standards with high-fidelity copper bends and complex brazed heat exchanger manifolds.",
    image: "/images/industry-hvac.png"
  },
  {
    company: "LG Electronics",
    industry: "Home Appliances",
    duration: "10+ Years",
    desc: "Providing high-volume, defect-free tubular components for international refrigeration and air conditioning systems.",
    image: "/images/industry-appliances.png"
  }
];

export function CustomerKeyHighlights() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Premium Partnerships</span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-6">
            Key <span className="text-deepblue dark:text-gold">Strategic Highlights</span>
          </h2>
        </div>

        <div className="space-y-12">
          {highlights.map((h, idx) => (
            <div 
              key={idx}
              className={`flex flex-col lg:flex-row items-stretch border border-border rounded-sm overflow-hidden transition-all duration-500 group ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="lg:w-1/2 relative min-h-[300px]">
                <Image
                  src={h.image}
                  alt={h.company}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-silver/5 dark:bg-white/2">
                <div className="flex items-center gap-3 mb-4">
                  <BadgeCheck className="w-5 h-5 text-gold" />
                  <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{h.duration} Partnership</span>
                </div>
                <h3 className="text-3xl font-heading font-bold text-charcoal dark:text-white mb-2">{h.company}</h3>
                <p className="text-deepblue dark:text-gold font-bold text-sm uppercase tracking-widest mb-6">{h.industry}</p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {h.desc}
                </p>
                <button className="flex items-center gap-2 text-charcoal dark:text-white font-bold text-sm uppercase tracking-widest group/btn">
                  Read Partnership Story
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
