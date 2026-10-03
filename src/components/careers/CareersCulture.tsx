"use client";

import React, { useRef, useState } from "react";
import { Camera, Users, Zap, Heart } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const cultureImages = [
  { 
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", 
    alt: "Precision Engineering", 
    span: "lg:col-span-2 lg:row-span-2" 
  },
  { 
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop", 
    alt: "Collaborative Workspace", 
    span: "lg:col-span-1 lg:row-span-1" 
  },
  { 
    src: "https://images.unsplash.com/photo-1565439390118-2831b14249bf?q=80&w=2070&auto=format&fit=crop", 
    alt: "Advanced Manufacturing", 
    span: "lg:col-span-1 lg:row-span-1" 
  },
  { 
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop", 
    alt: "Team Synergy", 
    span: "lg:col-span-2 lg:row-span-1" 
  }
];

export function CareersCulture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  const galleryVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-32 bg-slate-50/60 dark:bg-black overflow-hidden relative border-b border-slate-200/70 dark:border-white/5"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-20 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.12] mb-6 tracking-tight overflow-visible">
              <span className="inline-block">Life at</span> <br />
              <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light">
                J Pan Tubular Components Limited
              </span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg leading-relaxed max-w-xl">
              We foster an environment where precision meets passion. Explore 
              our vibrant workplace culture through the eyes of those who 
              build the legacy every day.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 sm:gap-4 flex-wrap"
          >
             <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <Users className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={1.75} />
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Collaborative</span>
             </div>
             <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <Zap className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={1.75} />
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Innovative</span>
             </div>
             <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <Heart className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={1.75} />
                <span className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Inclusive</span>
             </div>
          </motion.div>
        </div>

        {/* Masonry Gallery */}
        <motion.div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          variants={galleryVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-[280px_280px] lg:grid-rows-[340px_340px] gap-5 no-scrollbar pb-6 md:pb-0 h-[340px] md:h-auto"
        >
           {cultureImages.map((img, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className={cn("relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-200/80 dark:border-white/10 transition-all duration-500 w-full shrink-0 snap-center h-full md:shrink", img.span)}
              >
                {/* Image Component with Crisp Rendering */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-90 group-hover:opacity-100"
                />
                
                {/* Subtle Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Meta Data Box */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                   <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white">
                      <Camera className="w-3.5 h-3.5 text-[#7BA4D0]" strokeWidth={2} />
                      <span className="font-medium text-xs tracking-wider">{img.alt}</span>
                   </div>
                </div>
              </motion.div>
           ))}
        </motion.div>

        {/* Dot Indicators for Mobile Scroll */}
        {cultureImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {cultureImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-[#2E5E99] dark:bg-[#7BA4D0] w-6" : "bg-slate-300 dark:bg-white/20"
                )}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * scrollContainerRef.current.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
