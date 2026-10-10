"use client";

import React, { useRef, useState } from "react";
import { ShieldCheck, Target, Users, CheckCircle2 } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

export function QualityCommitment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll Parallax Hooks for Multi-Layered Depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Differential vertical offsets for the 3 slabs
  const slabY0 = useTransform(smoothProgress, [0, 1], [-22, 22]);
  const slabY1 = useTransform(smoothProgress, [0, 1], [-6, 6]);
  const slabY2 = useTransform(smoothProgress, [0, 1], [18, -18]);
  const quoteY = useTransform(smoothProgress, [0, 1], [14, -14]);

  const slabOffsets = [slabY0, slabY1, slabY2];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < features.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const features = [
    {
      icon: Target,
      title: "Precision Oriented",
      desc: "Focusing on micron-level accuracy across all copper and steel tubular parts.",
    },
    {
      icon: ShieldCheck,
      title: "Consistency Guaranteed",
      desc: "Maintaining identical quality standards across high-volume production batches.",
    },
    {
      icon: Users,
      title: "Customer Satisfaction",
      desc: "Building trust through reliable performance and transparent quality reporting.",
    }
  ];

  return (
    <section 
      id="commitment"
      ref={containerRef}
      className="relative py-16 md:py-24 bg-white dark:bg-black overflow-hidden transition-colors"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Side - Dual-Axis Architectural Left Split */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="mb-6 overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.18] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                A Culture of
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
                Zero-Defect Manufacturing
              </div>
            </div>
            
            <div className="space-y-4 text-[#0D2440]/75 dark:text-silver/80 text-base md:text-lg leading-relaxed font-normal mb-8">
              <p>
                At J Pan Tubular Components Limited, quality is not just a final check—it's the foundational principle of 
                our entire manufacturing lifecycle. From raw material sourcing to final component 
                dispatch, our &quot;Quality First&quot; mandate ensures uncompromising precision.
              </p>
              <p>
                We believe that consistency is the hallmark of a great manufacturer. By integrating 
                advanced automated inspection systems and rigorous manual verification, we maintain 
                tolerance levels that exceed industry expectations.
              </p>
            </div>

            {/* Quote block with subtle scroll counter-float on desktop */}
            <motion.div 
              style={{ y: quoteY }}
              className="flex items-start sm:items-center gap-4 p-5 sm:p-6 border-l-4 border-[#2E5E99] bg-[#EBF3FC]/80 dark:bg-[#0D2440]/40 rounded-r-2xl border border-[#7BA4D0]/20 shadow-xs"
            >
              <CheckCircle2 className="w-6 h-6 text-[#2E5E99] shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-[#0D2440] dark:text-white leading-relaxed">
                Continuously upgrading testing protocols to ensure every part delivered contributes to long-term reliability.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature Slabs: Monolithic Architectural Stack with Differential Scroll Parallax & Spring Hover */}
          <div className="flex flex-col justify-between w-full">
            <motion.div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-row md:flex-col overflow-x-auto snap-x snap-mandatory py-2 px-1 gap-4 md:space-y-5 md:gap-0 no-scrollbar w-full"
            >
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  style={{ y: slabOffsets[idx] }}
                  whileHover={{ 
                    x: 10, 
                    transition: { type: "spring", stiffness: 350, damping: 25 } 
                  }}
                  className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 sm:p-7 bg-[#F8FAFC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl transition-colors duration-300 overflow-hidden w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center shadow-xs hover:shadow-xl hover:shadow-[#2E5E99]/5 cursor-default"
                >
                  {/* Subtle top hairline gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2E5E99]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-14 h-14 shrink-0 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs">
                    <feature.icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-1.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[#0D2440]/75 dark:text-silver/80 leading-relaxed text-xs sm:text-sm font-normal">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Pagination Indicator Dots - Squircle */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-6 z-10">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    if (cardsRef.current && cardsRef.current.children[i]) {
                      cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }}
                  className={cn(
                    "h-1.5 rounded-sm transition-all duration-300",
                    activeIndex === i ? "w-6 bg-[#0D2440] dark:bg-white" : "w-1.5 bg-[#7BA4D0]/40"
                  )}
                  aria-label={`Go to feature card ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
