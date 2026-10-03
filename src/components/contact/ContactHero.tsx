"use client";

import React from "react";
import Image from "next/image";
import { Headphones, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface ContactHeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

export function ContactHero({ 
  title = "Investor Contact", 
  subtitle = "Institutional Access",
  image = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2938&auto=format&fit=crop"
}: ContactHeroProps) {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const words = title.split(' ');
  const firstWord = words[0];
  const remainingTitle = words.slice(1).join(' ');

  return (
    <section className="relative h-[65vh] min-h-[600px] flex items-center overflow-hidden bg-charcoal">
      {/* Background Media */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={image} 
          alt={`J Pan Tubular Components Limited ${title}`}
          fill
          priority
          className="object-cover object-center opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent dark:from-black dark:via-black/90 dark:to-transparent" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
      </motion.div>

      {/* Institutional Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/30 via-transparent to-transparent" />
      
      {/* Animated Light Beam */}
      <motion.div 
        initial={{ opacity: 0, skewX: -15, x: "100%" }}
        animate={{ opacity: 1, x: "25%" }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-0 right-0 w-[40%] bg-white/2 skew-x-[-15deg] border-l border-white/5 pointer-events-none" 
      />

      <div className="container-custom relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center rounded-sm">
              <Headphones className="w-4 h-4 text-gold" />
            </div>
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold font-medium uppercase tracking-[0.2em] text-xs">{subtitle}</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-[1.1] text-white">
            {firstWord} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold italic font-light">{remainingTitle}</span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center gap-12">
            <p className="text-lg md:text-xl text-silver/60 font-light leading-relaxed max-w-xl">
              Direct and dedicated communication channels for J Pan Tubular Components Limited 
              stakeholders, ensuring absolute transparency and responsive 
              engagement.
            </p>
            
            <div className="flex items-center gap-8 border-l border-white/10 pl-10 hidden lg:flex">
               <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                     <Globe className="w-4 h-4 text-gold" strokeWidth={1.5} />
                     <span className="text-white font-heading font-bold text-2xl">Global</span>
                  </div>
                  <span className="text-[10px] text-silver/40 uppercase tracking-[0.2em] font-bold">Connectivity</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-white font-heading font-bold text-3xl mb-1">24/7</span>
                  <span className="text-[10px] text-silver/40 uppercase tracking-[0.2em] font-bold">Email Support</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Design Element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
      >
        <span className="text-[9px] font-bold text-gold uppercase tracking-[0.5em] rotate-90 origin-left translate-x-2 mb-12">Connect</span>
        <motion.div 
          animate={{ height: ["0px", "64px"] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="w-px bg-gradient-to-b from-transparent via-gold to-transparent" 
        />
      </motion.div>
    </section>
  );
}
