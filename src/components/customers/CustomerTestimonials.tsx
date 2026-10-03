"use client";

import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "J Pan Tubular Components Limited has consistently delivered high-precision components that meet our rigorous automotive standards. Their commitment to zero-defect manufacturing makes them a vital part of our supply chain.",
    author: "Chief Procurement Officer",
    company: "Leading Automotive OEM"
  },
  {
    quote: "The technical support and co-engineering capabilities provided by the J Pan Tubular Components Limited team helped us optimize our heat exchanger designs, resulting in a 15% increase in thermal efficiency for our new product line.",
    author: "Head of Engineering",
    company: "Global HVAC Manufacturer"
  },
  {
    quote: "Reliability and transparency are the two words that define our decade-long relationship with J Pan Tubular Components Limited. Every batch comes with complete material traceability and perfect dimensional accuracy.",
    author: "Director of Operations",
    company: "Industrial Systems Group"
  }
];

export function CustomerTestimonials() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Social Proof</span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-6">
            Client <span className="text-deepblue dark:text-gold">Voices</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="relative p-12 bg-silver/5 dark:bg-white/2 border border-border rounded-sm group hover:border-gold transition-all duration-500">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-silver/20 dark:text-white/5 group-hover:text-gold/20 transition-colors" />
              
              <div className="relative z-10">
                <p className="text-muted-foreground text-lg italic leading-relaxed mb-10">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-1 h-10 bg-gold" />
                  <div>
                    <h4 className="font-heading font-bold text-charcoal dark:text-white uppercase tracking-wider text-sm">
                      {t.author}
                    </h4>
                    <p className="text-xs text-gold font-bold uppercase tracking-widest">
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
