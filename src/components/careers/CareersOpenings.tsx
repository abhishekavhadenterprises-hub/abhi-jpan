"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MapPin, Briefcase, ChevronRight, Building2, ArrowRight } from "lucide-react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const jobs = [
  {
    id: 1,
    title: "Senior Production Engineer",
    slug: "senior-production-engineer",
    department: "Manufacturing",
    location: "Sarkhej, Ahmedabad",
    experience: "5-8 Years",
    type: "Full-Time"
  },
  {
    id: 2,
    title: "Quality Assurance Specialist",
    slug: "quality-assurance-specialist",
    department: "Engineering",
    location: "Sarkhej, Ahmedabad",
    experience: "3-5 Years",
    type: "Full-Time"
  },
  {
    id: 3,
    title: "Operations Manager",
    slug: "operations-manager",
    department: "Operations",
    location: "Corporate Office",
    experience: "8-12 Years",
    type: "Full-Time"
  },
  {
    id: 4,
    title: "HR Generalist",
    slug: "hr-generalist",
    department: "HR / Admin",
    location: "Corporate Office",
    experience: "2-4 Years",
    type: "Full-Time"
  },
  {
    id: 5,
    title: "Maintenance Technician",
    slug: "maintenance-technician",
    department: "Manufacturing",
    location: "Sarkhej, Ahmedabad",
    experience: "2-5 Years",
    type: "Full-Time"
  },
  {
    id: 6,
    title: "Structural Design Lead",
    slug: "structural-design-lead",
    department: "Engineering",
    location: "Corporate Office",
    experience: "10+ Years",
    type: "Full-Time"
  }
];

const departments = ["All", "Manufacturing", "Engineering", "Operations", "HR / Admin"];

export function CareersOpenings() {
  const [activeDept, setActiveDept] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll and activeIndex when activeDept changes
  useEffect(() => {
    setActiveIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeDept]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientWidth > 0) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
    }
  };

  const filteredJobs = activeDept === "All" 
    ? jobs 
    : jobs.filter(job => job.department === activeDept);

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.96, 
      transition: { duration: 0.25, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="openings"
      ref={containerRef}
      className="py-16 md:py-28 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 dark:from-[#070b14] dark:via-[#0c1424] dark:to-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.025] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.12] tracking-tight overflow-visible">
              <span className="inline-block">Open</span> <br />
              <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light">
                Positions
              </span>
            </h2>
          </motion.div>
          
          {/* Department Filter Segmented Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10"
          >
             {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl sm:rounded-full transition-all duration-300 cursor-pointer ${
                    activeDept === dept 
                    ? "bg-[#0D2440] text-white" 
                    : "text-slate-600 dark:text-slate-300 hover:text-[#0D2440] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {dept}
                </button>
             ))}
          </motion.div>
        </div>

        {/* Job Grid */}
        <motion.div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          layout
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[380px] no-scrollbar pb-6 md:pb-0"
        >
           <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div 
                  layout
                  key={job.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -6 }}
                  className="group relative bg-white dark:bg-[#0c1527] border border-slate-200/80 dark:border-white/10 p-7 lg:p-8 rounded-3xl hover:border-[#2E5E99]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden w-full shrink-0 snap-center md:w-auto md:shrink"
                >
                  {/* Top hairline accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E5E99] to-[#7BA4D0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7BA4D0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Card Header */}
                  <div>
                    <div className="relative z-10 flex items-center justify-between mb-6">
                       <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#2E5E99]/10 dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                             <Building2 className="w-4 h-4" strokeWidth={1.75} />
                          </div>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                             {job.department}
                          </span>
                       </div>
                       <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#2E5E99] dark:text-[#7BA4D0] bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 border border-[#2E5E99]/20">
                          {job.type}
                       </span>
                    </div>

                    <h3 className="relative z-10 text-xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors duration-300 mb-6 line-clamp-2 min-h-[56px]">
                       {job.title}
                    </h3>

                    <div className="relative z-10 space-y-2.5 mb-8">
                       <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <MapPin className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={1.75} />
                          <span className="text-xs font-normal">{job.location}</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <Briefcase className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={1.75} />
                          <span className="text-xs font-normal">Experience: {job.experience}</span>
                       </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 dark:border-white/10">
                     <Link 
                       href={`/careers/${job.slug}`}
                       className="w-full flex items-center justify-between py-3 px-5 bg-slate-50 hover:bg-[#0D2440] dark:bg-white/5 dark:hover:bg-white text-[#0D2440] hover:text-white dark:text-white dark:hover:text-[#0D2440] rounded-xl border border-slate-200/80 dark:border-white/10 hover:border-transparent transition-all duration-300 group/apply font-semibold text-xs uppercase tracking-wider"
                     >
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4 group-hover/apply:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                     </Link>
                  </div>
                </motion.div>
              ))}
           </AnimatePresence>
        </motion.div>

        {/* Dot Indicators for Mobile Scroll */}
        {filteredJobs.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {filteredJobs.map((_, index) => (
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

        {/* General Inquiry */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-20 text-center"
        >
           <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
              Don't see a role that fits?
           </p>
           <button 
             onClick={() => {
               const cta = document.getElementById("careers-cta");
               if (cta) {
                 cta.scrollIntoView({ behavior: 'smooth' });
               } else {
                 window.location.href = "/contact";
               }
             }}
             className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider hover:border-[#2E5E99] hover:text-[#2E5E99] transition-all duration-300 group/general cursor-pointer"
           >
             <span>Submit General Application</span>
             <ChevronRight className="w-4 h-4 group-hover/general:translate-x-1 transition-transform duration-300 text-[#2E5E99]" strokeWidth={2} />
           </button>
        </motion.div>
      </div>
    </section>
  );
}
