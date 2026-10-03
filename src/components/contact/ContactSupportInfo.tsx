"use client";

import React, { useRef, useState } from "react";
import { Clock, Calendar, ShieldCheck, Mail } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const supportMetrics = [
  {
    icon: Mail,
    label: "Digital Inquiry",
    value: "24/7 Access",
    detail: "Primary channel for formal queries"
  },
  {
    icon: Clock,
    label: "Response Window",
    value: "24-48 Hours",
    detail: "Standard institutional turnaround"
  },
  {
    icon: Calendar,
    label: "Support Hours",
    value: "Mon - Sat",
    detail: "8:30 AM – 5:30 PM IST"
  },
  {
    icon: ShieldCheck,
    label: "Authorized",
    value: "100% Nodal",
    detail: "Verified compliance channels"
  }
];

export function ContactSupportInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section ref={containerRef} className="py-12 md:py-20 bg-white dark:bg-[#070b14] relative transition-colors duration-500 overflow-visible">
      <div className="container-custom relative z-10">
        <motion.div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 no-scrollbar pt-2 pb-6 md:pb-2"
        >
          {supportMetrics.map((metric, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-[#0B1728] border border-slate-200/90 dark:border-white/10 p-7 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden transition-all duration-400 hover:border-[#2E5E99]/40 w-full shrink-0 snap-center md:w-auto md:shrink flex flex-col justify-between cursor-default"
            >
               {/* Inner Ambient Glow on Hover */}
               
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300">
                       <metric.icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div className="h-0.5 w-6 bg-slate-200 dark:bg-white/10 group-hover:bg-[#2E5E99] group-hover:w-10 transition-all duration-300" />
                 </div>
                 
                 <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60 mb-1.5">{metric.label}</p>
                 <h4 className="text-2xl sm:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-2 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300 tracking-tight">
                    {metric.value}
                 </h4>
                 <p className="text-xs text-slate-500 dark:text-white/65 font-sans leading-relaxed">{metric.detail}</p>
               </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dot Indicators for Mobile Scroll */}
        {supportMetrics.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {supportMetrics.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-[#2E5E99] w-6" : "bg-slate-300 dark:bg-white/20 w-1.5"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
