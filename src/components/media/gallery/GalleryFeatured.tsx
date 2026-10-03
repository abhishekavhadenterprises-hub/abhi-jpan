"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveRight, CheckCircle2 } from "lucide-react";

const featured = [
  {
    title: "Main Assembly Floor",
    subtitle: "Scale & Precision",
    desc: "A 50,000 sq. ft. dedicated production facility optimized for high-volume component manufacturing and assembly.",
    image: "/images/about-manufacturing.png",
    specs: ["40+ CNC Lines", "ISO 9001 Certified", "Automated Brazing"]
  },
  {
    title: "The R&D Laboratory",
    subtitle: "Technical Excellence",
    desc: "In-house lab equipped with Spectrometry, Hydro-testing, and Metrology stations for uncompromising quality assurance.",
    image: "/images/quality-hero.png",
    specs: ["Spectrometry", "NABL Aligned", "24/7 Monitoring"]
  }
];

export function GalleryFeatured() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 leading-[1.22] overflow-visible">
            Featured{" "}
            <span className="font-serif italic font-normal text-[#2E5E99] inline-block pt-1 pb-2 pr-2">
              Highlights
            </span>
          </h2>
        </div>

        {/* Featured Items */}
        <div className="space-y-20 md:space-y-28">
          {featured.map((f, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-3/5 aspect-[16/10] relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#7BA4D0]/30 group bg-[#F8FAFC]">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-2/5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E5E99] block mb-3">
                  {f.subtitle}
                </span>
                <h3 className="text-2xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 leading-tight">
                  {f.title}
                </h3>
                <p className="text-[#0D2440]/75 dark:text-silver/80 text-base md:text-lg leading-relaxed mb-8">
                  {f.desc}
                </p>
                
                {/* Specs Capsules */}
                <div className="flex flex-wrap gap-2.5 mb-9">
                  {f.specs.map((spec, sidx) => (
                    <div 
                      key={sidx} 
                      className="px-4 py-2 rounded-xl bg-[#EBF3FC]/90 dark:bg-charcoal/80 border border-[#7BA4D0]/30 text-xs font-semibold text-[#0D2440] dark:text-white flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5E99] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href="/infrastructure"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 group/btn"
                >
                  <span>View Facility Details</span>
                  <MoveRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

