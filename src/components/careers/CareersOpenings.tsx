"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MapPin, Briefcase, ChevronRight, Building2, ArrowRight } from "lucide-react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

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
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
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

  // Row-by-Row Reveal Animation
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 45 },
    visible: (i: number) => {
      const rowIndex = Math.floor(i / 3);
      const colIndex = i % 3;
      return { 
        opacity: 1, 
        y: 0, 
        transition: { 
          delay: rowIndex * 0.22 + colIndex * 0.08,
          duration: 0.75, 
          ease: [0.16, 1, 0.3, 1] 
        } 
      };
    },
    exit: { 
      opacity: 0, 
      scale: 0.96, 
      transition: { duration: 0.2, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="openings"
      ref={containerRef}
      className="py-12 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 dark:from-[#070b14] dark:via-[#0c1424] dark:to-[#070b14] border-b border-slate-200/70 dark:border-white/5 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#2E5E99_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.025] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="overflow-visible">
              <ScrollWipeHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#0D2440] dark:text-white leading-[1.12] tracking-tight block"
                revealedColor="currentColor"
                wipingColor="#2E5E99"
                unrevealedColor="rgba(148, 163, 184, 0.4)"
              >
                Open
              </ScrollWipeHeading>
              <div className="pt-1 pb-2 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] bg-clip-text text-transparent italic font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                Positions
              </div>
            </div>
          </motion.div>
          
          {/* Department Filter Segmented Rail with layoutId (No Badge Pills) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-sm"
          >
             {departments.map((dept) => {
                const isActive = activeDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={cn(
                      "relative px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg sm:rounded-xl transition-colors duration-200 cursor-pointer",
                      isActive 
                        ? "text-white dark:text-[#0D2440]" 
                        : "text-slate-600 dark:text-slate-300 hover:text-[#0D2440] dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeDeptTab"
                        className="absolute inset-0 bg-[#0D2440] dark:bg-white rounded-lg sm:rounded-xl shadow-sm"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{dept}</span>
                  </button>
                );
             })}
          </motion.div>
        </div>

        {/* Job Grid: Industrial Spec-Sheet Dossier Cards (Distinct from all other sections) */}
        <motion.div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          layout
          className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-h-[380px] no-scrollbar pb-6 md:pb-0"
        >
           <AnimatePresence mode="popLayout">
              {filteredJobs.map((job, idx) => (
                <motion.div 
                  layout
                  key={job.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  exit="exit"
                  className="w-full shrink-0 snap-center md:w-auto md:shrink flex"
                >
                  <div className="group relative bg-gradient-to-br from-white via-white to-[#EBF3FC]/60 dark:from-[#0D2440] dark:via-[#091A2E] dark:to-[#071321] border border-[#7BA4D0]/30 dark:border-white/15 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#2E5E99]/5 overflow-hidden flex flex-col justify-between w-full cursor-default">
                    {/* Specular Radial Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E99]/12 via-[#7BA4D0]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl" />

                    <div className="relative z-10 mb-6">
                      {/* Top Row: Clean Icon Pod & Type Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-[#E7F0FA] dark:bg-white/10 border border-[#7BA4D0]/25 dark:border-white/15">
                          {job.type}
                        </span>
                      </div>

                      {/* Department Tag */}
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                        {job.department}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[#0D2440] dark:text-white group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors mb-3 sm:mb-4 line-clamp-2 min-h-[48px] sm:min-h-[56px]">
                        {job.title}
                      </h3>

                      {/* Metadata Rows */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                          <MapPin className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" strokeWidth={1.75} />
                          <span className="text-xs font-normal">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                          <Briefcase className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" strokeWidth={1.75} />
                          <span className="text-xs font-normal">Experience: {job.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer / Apply Link */}
                    <Link 
                      href={`/careers/${job.slug}`}
                      className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-semibold relative z-10 group/link mt-auto cursor-pointer"
                    >
                      <span className="uppercase tracking-wider text-[11px] font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] group-hover/link:text-[#0D2440] dark:group-hover/link:text-white transition-colors">
                        Apply Now
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#E7F0FA] dark:bg-white/10 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" strokeWidth={2} />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
           </AnimatePresence>
        </motion.div>

        {/* Mobile Linear Progress Tracker */}
        {filteredJobs.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-8 md:hidden">
            {filteredJobs.map((_, index) => (
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
                aria-label={`Go to job ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* General Inquiry */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
           <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-4">
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
             className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider hover:border-[#2E5E99] hover:text-[#2E5E99] transition-all duration-300 group/general cursor-pointer shadow-sm hover:shadow-md"
           >
             <span>Submit General Application</span>
             <ChevronRight className="w-4 h-4 group-hover/general:translate-x-1 transition-transform duration-300 text-[#2E5E99]" strokeWidth={2} />
           </button>
        </motion.div>
      </div>
    </section>
  );
}
