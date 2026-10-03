"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Tag, ChevronRight, Share2, ArrowUpRight } from "lucide-react";

interface PressFeaturedProps {
  onReadMore: (article: any) => void;
}

export function PressFeatured({ onReadMore }: PressFeaturedProps) {
  const featuredArticle = {
    title: "J Pan Tubular Components Limited Announces Major Facility Expansion in Haryana",
    date: "Oct 24, 2025",
    category: "Corporate",
    image: "/engineering_precision_facility_1778657209621.png",
    hasPdf: true,
    excerpt: "We are excited to announce a 50,000 sq. ft. expansion of our main manufacturing facility, aimed at increasing production capacity for HVAC-R components by 40%. This strategic move aligns with our Industry 4.0 roadmap.",
    content: [
      "J Pan Tubular Components Limited, a leader in precision industrial tubing, is proud to announce a significant expansion of its flagship manufacturing facility in Haryana. The 50,000 sq. ft. expansion is designed to meet the surging global demand for high-efficiency HVAC-R components.",
      "The new facility will feature state-of-the-art automated CNC bending lines and high-frequency induction brazing stations. This investment is expected to increase overall production capacity by 40% and create over 150 new skilled engineering roles in the region.",
      "\"This expansion is a testament to our commitment to engineering excellence and our customers' growing needs,\" said the Managing Director of J Pan Tubular Components Limited. \"By integrating the latest Industry 4.0 technologies, we are not just increasing volume, but significantly enhancing the precision and reliability of our output.\""
    ]
  };

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Prime Disclosure</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal dark:text-white leading-[1.05] tracking-tight">
              Featured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold italic font-medium">Editorial</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="hidden lg:flex"
          >
            <div className="px-6 py-3 bg-charcoal/5 dark:bg-white/5 border border-border rounded-sm flex items-center gap-4 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] font-bold text-charcoal dark:text-silver uppercase tracking-[0.2em]">High Priority Release</span>
            </div>
          </motion.div>
        </div>

        {/* Featured Card - Architectural Layout */}
        <div className="relative group">
          {/* Ambient Background Glow */}
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row bg-charcoal dark:bg-charcoal/90 rounded-sm overflow-hidden border border-white/5 group-hover:border-gold/20 transition-colors duration-700 relative z-10"
          >
            {/* Visual Canvas */}
            <div className="w-full lg:w-[50%] relative min-h-[300px] lg:min-h-[450px] overflow-hidden bg-black">
              {/* Curtain Reveal */}
              <motion.div 
                initial={{ x: 0 }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-charcoal dark:bg-white z-20 flex items-center justify-center"
              >
                 <div className="w-px h-12 bg-gold/50" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
              </motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              
              {/* Floating Tag */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-sm flex items-center gap-3">
                  <Tag className="w-3 h-3 text-gold" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{featuredArticle.category}</span>
                </div>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="w-full lg:w-[50%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative bg-charcoal dark:bg-transparent">
              <div className="relative z-10 space-y-8">
                
                {/* Meta Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3 text-gold">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{featuredArticle.date}</span>
                  </div>
                  <button className="w-8 h-8 rounded-sm border border-white/5 flex items-center justify-center text-silver/40 hover:text-gold hover:border-gold/30 transition-all duration-300">
                    <Share2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Typography Focus */}
                <div>
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-white leading-[1.1] mb-4 group-hover:text-gold transition-colors duration-700">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-silver/60 text-sm lg:text-base leading-relaxed font-light line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                {/* Call to Action */}
                <div className="pt-4">
                  <button 
                    onClick={() => onReadMore(featuredArticle)}
                    className="group/btn relative flex items-center gap-4 px-8 py-4 bg-gold text-charcoal font-bold text-[9px] uppercase tracking-[0.3em] rounded-sm transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10 group-hover/btn:text-black transition-colors duration-500">Read Full Release</span>
                    <ArrowUpRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-500 group-hover/btn:text-black" strokeWidth={2} />
                    
                  </button>
                </div>
                
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
