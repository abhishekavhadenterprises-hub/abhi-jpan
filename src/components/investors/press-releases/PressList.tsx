"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, Download, ArrowUpRight } from "lucide-react";

const releases = [
  {
    id: 1,
    title: "New Series of Precision Copper Bends Launched",
    date: "Sept 15, 2025",
    category: "Product",
    desc: "Introducing our latest range of specialized copper bends designed for high-efficiency refrigeration cycles.",
    pdf: true
  },
  {
    id: 2,
    title: "J Pan Tubular Components Limited Awarded 'Innovation Excellence' at ACREX",
    date: "Aug 02, 2025",
    category: "Award",
    desc: "Recognizing our breakthrough in automated brazing technology for large-scale industrial assemblies.",
    pdf: false
  },
  {
    id: 3,
    title: "Q2 2025 Financial Performance Summary",
    date: "July 20, 2025",
    category: "Financial",
    desc: "J Pan Tubular Components Limited reports steady growth in the HVAC-R sector with a 15% increase in domestic market share.",
    pdf: true
  },
  {
    id: 4,
    title: "Sustainability Report: Achieving 30% Solar Power",
    date: "June 10, 2025",
    category: "Sustainability",
    desc: "Detailing our transition to renewable energy sources across our primary manufacturing lines.",
    pdf: true
  },
  {
    id: 5,
    title: "Strategic Partnership with Global Automotive OEM",
    date: "May 05, 2025",
    category: "Corporate",
    desc: "Expanding our reach into the electric vehicle market through high-precision cooling line assemblies.",
    pdf: false
  },
  {
    id: 6,
    title: "Participation in Global HVAC Expo 2025",
    date: "April 12, 2025",
    category: "Event",
    desc: "Join us in Milan as we showcase our latest innovations in tubular component fabrication.",
    pdf: false
  }
];

interface PressListProps {
  onReadMore: (article: any) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export function PressList({ onReadMore }: PressListProps) {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {releases.map((release) => (
            <motion.div 
              variants={cardVariants}
              key={release.id}
              className="group relative flex flex-col bg-silver/5 dark:bg-charcoal border border-border/50 dark:border-white/5 rounded-sm p-10 hover:border-gold/30 dark:hover:border-gold/30 transition-colors duration-700 overflow-hidden"
            >
              {/* Subtle hover glow */}

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  <Calendar className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
                  {release.date}
                </div>
                <div className="px-3 py-1 bg-white dark:bg-black border border-border/50 dark:border-white/10 rounded-sm">
                  <span className="text-[9px] font-bold text-charcoal dark:text-silver uppercase tracking-[0.2em]">
                    {release.category}
                  </span>
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-heading font-bold text-charcoal dark:text-white mb-4 leading-tight group-hover:text-gold transition-colors duration-500 relative z-10">
                {release.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-10 flex-grow relative z-10">
                {release.desc}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-border dark:border-white/10 relative z-10">
                <button 
                  onClick={() => onReadMore({
                    title: release.title,
                    date: release.date,
                    category: release.category,
                    hasPdf: release.pdf,
                    content: [
                      release.desc,
                      "Full details of this announcement include technical specifications and strategic alignment. J Pan Tubular Components Limited continues to lead the industry through specialized engineering and high-quality fabrication of tubular assemblies for diverse sectors including HVAC, Automotive, and Power Generation.",
                      "For official inquiries or to schedule a consultation regarding the impact of this development on your current projects, please contact our relationship management team."
                    ]
                  })}
                  className="group/btn text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-charcoal dark:text-white hover:text-gold dark:hover:text-gold transition-colors"
                >
                  View Detail 
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={1.5} />
                </button>
                {release.pdf && (
                  <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-silver/10 dark:bg-white/5 border border-transparent hover:border-gold/30 hover:bg-gold/10 text-muted-foreground hover:text-gold transition-all duration-300" title="Download Official PDF">
                    <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Architectural Pagination */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 flex items-center justify-center gap-3"
        >
          <button className="w-10 h-10 bg-gold text-charcoal font-bold text-xs flex items-center justify-center rounded-sm">1</button>
          <button className="w-10 h-10 bg-transparent border border-border dark:border-white/10 hover:border-gold/50 text-muted-foreground hover:text-gold font-bold text-xs flex items-center justify-center rounded-sm transition-all duration-300">2</button>
          <button className="w-10 h-10 bg-transparent border border-border dark:border-white/10 hover:border-gold/50 text-muted-foreground hover:text-gold font-bold text-xs flex items-center justify-center rounded-sm transition-all duration-300">3</button>
          <div className="px-4 text-muted-foreground tracking-widest text-xs">...</div>
          <button className="w-10 h-10 bg-transparent border border-border dark:border-white/10 hover:border-gold/50 text-muted-foreground hover:text-gold font-bold text-xs flex items-center justify-center rounded-sm transition-all duration-300">8</button>
        </motion.div>
      </div>
    </section>
  );
}
