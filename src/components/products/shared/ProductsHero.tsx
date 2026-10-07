"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function ProductsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Premium Parallax Math
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Staggered Text Animation Variants
  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const titleText = "Precision Engineered.";
  const subtitleText = "Tubular Solutions.";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* Dynamic Cinematic Inset Frame */}
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.95, 
          borderRadius: "100px",
          top: "2rem",
          bottom: "2rem",
          left: "2rem",
          right: "2rem"
        }}
        whileInView={{ 
          opacity: 1, 
          scale: 1, 
          borderRadius: "0px",
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px"
        }}
        viewport={{ once: true }}
        transition={{ 
          opacity: { duration: 1 },
          scale: { duration: 1 },
          default: { duration: 4, delay: 2, ease: [0.16, 1, 0.3, 1] } 
        }}
        className="absolute z-0 overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50"
      >
        <motion.div 
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <Image
            src="/images/products-hero-craftsmanship.jpg"
            alt="J Pan Precision Products & Engineering"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-90 dark:brightness-[0.35] saturate-[0.85] contrast-[1.1]"
          />
        </motion.div>
        
        {/* Gradients for typography legibility and depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/90 via-[#0D2440]/30 to-transparent mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle glowing edges */}
        <motion.div 
          initial={{ borderRadius: "100px" }}
          whileInView={{ borderRadius: "0px" }}
          viewport={{ once: true }}
          transition={{ duration: 4, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 border border-white/20 dark:border-white/10 pointer-events-none mix-blend-overlay" 
        />
      </motion.div>

      {/* Centered Hero Content Lockup */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="container-custom relative z-10 w-full flex flex-col items-center text-center justify-center h-full px-4"
      >
        {/* Floating Glassmorphic Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-12 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7BA4D0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7BA4D0]"></span>
          </span>
          <span className="text-xs sm:text-sm font-sans font-bold text-white uppercase tracking-[0.3em]">
            The Catalog
          </span>
        </motion.div>

        {/* Staggered 3D Typography Reveal */}
        <motion.div
          variants={sentence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-2 md:space-y-4"
          style={{ perspective: "1000px" }}
        >
          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-heading font-black text-white tracking-tighter leading-[0.9]">
            {titleText.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-heading font-light italic text-[#7BA4D0] tracking-tight leading-[0.9] pr-4">
            {subtitleText.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Subtitle with fade up */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto"
        >
          Zero-defect brass, copper, and steel components engineered with sub-micron precision for automotive, HVAC, and industrial leaders worldwide.
        </motion.p>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-16 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-sans font-bold text-white/50 uppercase tracking-[0.4em]">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-white absolute top-0 left-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
