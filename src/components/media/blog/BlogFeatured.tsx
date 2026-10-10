"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

interface BlogFeaturedProps {
  onReadMore: (article: any) => void;
}

export function BlogFeatured({ onReadMore }: BlogFeaturedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const featuredArticle = {
    title: "The Evolution of Automated Brazing in HVAC-R Systems",
    date: "Nov 12, 2025",
    time: "8 Min",
    category: "Technology",
    author: "Engineering Team",
    image: "/images/quality-hero.png",
    content: [
      "The industrial cooling sector is undergoing a massive transformation, driven by both regulatory pressures and technological breakthroughs. At the heart of this shift is the brazing process—the critical junction where precision meets reliability.",
      "Traditional manual brazing, while effective in the hands of a master craftsman, introduces inherent variability. In high-volume production for HVAC-R systems, this variability can lead to microscopic leakages that compromise the lifecycle efficiency of the entire unit.",
      "J Pan Tubular Components Limited's transition to automated induction brazing has set a new benchmark. By using precisely controlled thermal cycles and robotic alloy deposition, we achieve 99.99% leak-free reliability. This technology doesn't just increase speed; it ensures that every single joint meets the exact same metallurgical standard.",
      "As we look towards 2026, the integration of real-time thermal imaging and AI-driven quality inspection will further refine this process, making 'Zero-Defect' manufacturing a reality for the global market."
    ]
  };

  return (
    <section ref={containerRef} className="py-14 md:py-20 bg-white dark:bg-[#070b14] border-b border-slate-200/70 dark:border-white/5 transition-colors">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex flex-col lg:flex-row bg-white dark:bg-[#0c1527] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-[#2E5E99]/50 shadow-sm hover:shadow-2xl transition-all duration-500"
        >
          {/* Image Side with Parallax */}
          <div className="w-full lg:w-3/5 aspect-video lg:aspect-auto relative overflow-hidden bg-slate-100 dark:bg-slate-900 min-h-[320px] lg:min-h-[460px]">
            <motion.div style={{ y: imageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <Image
                src="/images/quality-hero.png"
                alt="The Future of Automated Brazing in HVAC"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-2/5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            {/* Category Squircle Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-lg bg-[#EBF3FC] dark:bg-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0] text-xs font-semibold uppercase tracking-wider">
                {featuredArticle.category} Spotlight
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5 mb-5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                Nov 12, 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                8 Min Read
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                Engineering Team
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#0D2440] dark:text-white mb-5 leading-[1.2] tracking-tight group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors overflow-visible">
              The Evolution of Automated Brazing in HVAC-R Systems
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-8 leading-relaxed font-normal">
              As global energy standards tighten, the precision of tubular 
              joints has become critical. We explore how next-generation 
              automation is redefining the reliability of copper assemblies.
            </p>

            <div>
              <button 
                onClick={() => onReadMore(featuredArticle)}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] dark:bg-[#2E5E99] dark:hover:bg-[#1A365D] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#0D2440]/15 group/btn cursor-pointer"
              >
                <span>Continue Reading</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
