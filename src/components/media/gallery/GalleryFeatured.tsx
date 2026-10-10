"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight, CheckCircle2 } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

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

function FeaturedCard({ item, idx }: { item: typeof featured[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
        idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image Side with Parallax */}
      <div className="w-full lg:w-3/5 aspect-[16/10] relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#7BA4D0]/30 dark:border-[#2E5E99]/30 group bg-slate-100 dark:bg-[#070b14] shadow-xl">
        <motion.div style={{ y: imageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </motion.div>
        
        {/* Soft Ambient Light Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-2/5">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E5E99] dark:text-[#7BA4D0] block mb-3">
          {item.subtitle}
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white mb-4 leading-tight">
          {item.title}
        </h3>
        <p className="text-[#0D2440]/75 dark:text-silver/80 text-base md:text-lg leading-relaxed mb-8 font-normal">
          {item.desc}
        </p>
        
        {/* Specs Squircles */}
        <div className="flex flex-wrap gap-2.5 mb-9">
          {item.specs.map((spec, sidx) => (
            <div 
              key={sidx} 
              className="px-4 py-2 rounded-xl bg-[#EBF3FC]/90 dark:bg-[#0D2440]/80 border border-[#7BA4D0]/30 dark:border-[#2E5E99]/30 text-xs font-semibold text-[#0D2440] dark:text-white flex items-center gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        <a 
          href="/infrastructure"
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#0D2440] hover:bg-[#2E5E99] text-white font-semibold text-sm hover:-translate-y-0.5 shadow-md shadow-[#0D2440]/15 transition-all duration-300 group/btn"
        >
          <span>View Facility Details</span>
          <MoveRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export function GalleryFeatured() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black transition-colors">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="mb-4 overflow-visible">
            <ScrollWipeHeading
              as="h2"
              className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.22] block"
              revealedColor="currentColor"
              wipingColor="#2E5E99"
              unrevealedColor="rgba(148, 163, 184, 0.4)"
            >
              Featured <span className="font-serif italic font-normal text-[#2E5E99] dark:text-[#7BA4D0]">Highlights</span>
            </ScrollWipeHeading>
          </div>
        </div>

        {/* Featured Items */}
        <div className="space-y-20 md:space-y-28">
          {featured.map((f, idx) => (
            <FeaturedCard key={idx} item={f} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

