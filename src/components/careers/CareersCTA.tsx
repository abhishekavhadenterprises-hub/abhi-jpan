"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Mail, Headphones, UserPlus, ShieldCheck } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

// High-precision 3D Gyroscopic Tilt Card (Distinct animation signature for CTA)
function GyroContactCard({ 
  children, 
  className, 
  href 
}: { 
  children: React.ReactNode; 
  className?: string; 
  href?: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Controlled tilt range
    setRotateX(-(y / rect.height) * 14);
    setRotateY((x / rect.width) * 14);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ transformStyle: "preserve-3d", perspective: 650 }}
      className={className}
    >
      <div style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.a>
  );
}

export function CareersCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
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
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="careers-cta" ref={containerRef} className="py-20 md:py-32 bg-white dark:bg-[#070b14] overflow-hidden relative border-t border-slate-200/60 dark:border-white/5">
      <div className="container-custom relative z-10">
        {/* Atmospheric Horizon Monolith Container with horizon zoom */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#EBF3FC] via-[#F2F7FD] to-[#E2EFFC] dark:from-[#0a182a] dark:via-[#0d223c] dark:to-[#091524] border border-[#7BA4D0]/35 dark:border-white/10 p-8 sm:p-12 lg:p-16 shadow-lg group"
        >
          {/* Subtle architectural background texture */}
          <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          {/* Ambient horizon light cone */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#7BA4D0]/20 dark:bg-[#2E5E99]/20 blur-3xl pointer-events-none" />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="lg:col-span-6">
              <div className="mb-6 overflow-visible">
                <ScrollWipeHeading
                  as="h2"
                  className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.15] tracking-tight block"
                  revealedColor="currentColor"
                  wipingColor="#2E5E99"
                  unrevealedColor="rgba(148, 163, 184, 0.4)"
                >
                  Shape Your
                </ScrollWipeHeading>
                <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#1B365D] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-3xl sm:text-4xl md:text-5xl font-heading tracking-tight">
                  Future With Us
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mb-8 leading-relaxed font-normal max-w-lg">
                Ready to contribute to J Pan Tubular Components Limited's legacy of excellence? 
                Connect with our recruitment desk or apply for open roles 
                to begin your institutional career.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => {
                    const openings = document.getElementById("openings");
                    if (openings) {
                      openings.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = "/careers#openings";
                    }
                  }}
                  className="px-8 py-4 bg-[#0D2440] hover:bg-[#1A365D] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0D2440] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] group/btn cursor-pointer shadow-md"
                >
                  <span>View All Roles</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" strokeWidth={2} />
                </button>
                
                <div className="flex items-center gap-3 px-5 py-3.5 bg-white/80 dark:bg-white/[0.06] border border-[#7BA4D0]/30 dark:border-white/10 rounded-xl text-[#0D2440] dark:text-white backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-[#2E5E99]/10 dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                    <UserPlus className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#0D2440] dark:text-slate-200">
                    Institutional Onboarding
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Contact Info: 3D Gyroscopic Floating Plaquettes */}
            <div className="lg:col-span-6 flex flex-col">
              <motion.div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                variants={itemVariants} 
                className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 no-scrollbar pb-4 sm:pb-0"
              >
                {/* Talent Email (3D Gyro Interactive Card) */}
                <GyroContactCard 
                  href="mailto:enquiry@jpantubular.com"
                  className="p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.1] border border-[#7BA4D0]/30 dark:border-white/10 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0]/50 backdrop-blur-xl transition-shadow duration-300 group/card relative overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink block shadow-sm hover:shadow-xl cursor-pointer"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2E5E99] to-[#7BA4D0] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/15 border border-[#2E5E99]/15 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-110 transition-transform duration-300 shadow-sm">
                      <Mail className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10">
                    Talent Email
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-xs relative z-10 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-[#7BA4D0] transition-colors break-all">
                    enquiry@jpantubular.com
                  </p>
                </GyroContactCard>
                
                {/* Recruitment Desk (3D Gyro Interactive Card) */}
                <GyroContactCard 
                  href="tel:+911202560586"
                  className="p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.1] border border-[#7BA4D0]/30 dark:border-white/10 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0]/50 backdrop-blur-xl transition-shadow duration-300 group/card relative overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink block shadow-sm hover:shadow-xl cursor-pointer"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2E5E99] to-[#7BA4D0] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/15 border border-[#2E5E99]/15 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover/card:scale-110 transition-transform duration-300 shadow-sm">
                      <Headphones className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                  </div>
                  <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10">
                    Recruitment Desk
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-xs relative z-10 group-hover/card:text-[#2E5E99] dark:group-hover/card:text-[#7BA4D0] transition-colors">
                    +91-120-2560586
                  </p>
                </GyroContactCard>
                
                {/* Employer Authority: Zero Badge Pills */}
                <div className="sm:col-span-2 p-6 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-white/[0.04] hover:bg-white/90 dark:hover:bg-white/[0.07] border border-[#7BA4D0]/20 dark:border-white/10 flex items-center gap-4 group hover:border-[#2E5E99]/30 transition-all duration-300 w-full shrink-0 snap-center sm:w-auto sm:shrink backdrop-blur-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#2E5E99]/10 dark:bg-white/[0.08] border border-[#2E5E99]/15 dark:border-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 group-hover:scale-105 transition-all">
                    <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[#0D2440] dark:text-white font-bold text-xs uppercase tracking-wider">
                        Employer Authority
                      </h4>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-normal text-xs leading-relaxed">
                      J Pan Tubular Components Limited is an equal opportunity employer committed to meritocracy.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Linear Progress Tracker */}
              <div className="flex items-center justify-center gap-1.5 mt-5 sm:hidden">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-1 rounded-sm transition-all duration-300 cursor-pointer",
                      activeIndex === index 
                        ? "bg-[#2E5E99] dark:bg-[#7BA4D0] w-8" 
                        : "bg-slate-300 dark:bg-white/20 w-4"
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
            </div>
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
