"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";

const certifications = [
  {
    id: "iatf",
    num: "01",
    category: "Automotive Tier-1",
    code: "IATF 16949:2016",
    title: "Zero-Defect Automotive Systems",
    desc: "OEM-accredited quality assurance engineered for critical EV thermal loops, powertrain, and braking lines.",
    highlights: [
      "APQP & PPAP Level 3 Qualified",
      "Inline Laser SPC (Cpk ≥ 1.67)",
      "100% Mass-Spec Helium Tested",
      "Full Raw-to-Part Traceability",
    ],
  },
  {
    id: "iso9001",
    num: "02",
    category: "Precision Manufacturing",
    code: "ISO 9001:2015",
    title: "Total Quality Management",
    desc: "Rigorous dimensional repeatability and zero-defect fulfillment across all 6 production plants.",
    highlights: [
      "Multi-Axis Optical CMM Verified",
      "Continuous Statistical Auditing",
      "Robotic Automated Induction Brazing",
      "Sub-micron Tube Tolerances",
    ],
  },
  {
    id: "iso14001",
    num: "03",
    category: "ESG & Sustainability",
    code: "ISO 14001:2015",
    title: "Sustainable Clean Metallurgy",
    desc: "Closed-loop green manufacturing powered by rooftop solar and 100% metallurgical recycling.",
    highlights: [
      "100% Closed-Loop Scrap Remelt",
      "Rooftop Solar Photovoltaic Power",
      "RoHS & EU REACH Compliant",
      "Zero Toxic Effluent Discharge",
    ],
  },
];

export function AboutQuality() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  
  // Create a mouse position tracker for a subtle global spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Pre-calculate gradient strings for the background
  const bgGlowDark = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(123, 164, 208, 0.1), transparent 80%)`;

  return (
    <section
      id="about-quality"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-slate-50 dark:bg-[#060e18] text-[#0D2440] dark:text-white border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden transition-colors duration-300 py-24 sm:py-32"
    >
      {/* Interactive Global Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden sm:block mix-blend-multiply dark:mix-blend-screen"
        style={{ background: bgGlowDark }}
      />
      
      {/* Static Ambient Glow */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none block sm:hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-[#2E5E99]/5 dark:bg-[#7BA4D0]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <ScrollWipeHeading as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white mb-6">
            Uncompromising standards,{" "}
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
              verified at every cycle.
            </span>
          </ScrollWipeHeading>
          <p className="text-base sm:text-lg text-[#0D2440]/70 dark:text-white/60 font-light leading-relaxed max-w-xl mx-auto">
            Precision inspection and zero-defect quality control across all critical assemblies.
          </p>
        </div>

        {/* Premium Expanding Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-[800px] lg:h-[600px] w-full">
          {certifications.map((cert, i) => {
            const isActive = activeIdx === i;

            return (
              <motion.div
                key={cert.id}
                layout
                onClick={() => setActiveIdx(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.5, delay: i * 0.1 } 
                }}
                className={`relative rounded-3xl sm:rounded-[2.5rem] bg-white dark:bg-white/[0.02] backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer group flex flex-col lg:flex-row items-center transition-colors duration-500 hover:border-slate-300 dark:hover:border-white/20 ${
                  isActive ? "flex-[4] lg:flex-[3]" : "flex-1 hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                {/* Subtle inner gradient hover */}
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#2E5E99]/5 dark:from-[#7BA4D0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Vertical/Collapsed Title Area */}
                <motion.div 
                  layout="position"
                  className={`flex flex-row lg:flex-col items-center justify-between lg:justify-center w-full lg:w-24 h-24 lg:h-full shrink-0 p-6 sm:p-8 z-20 ${isActive ? 'bg-slate-50/50 dark:bg-black/20 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10' : ''}`}
                >
                  <div className="text-3xl font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] opacity-50">
                    {cert.num}
                  </div>
                  
                  {/* Vertical text on desktop, horizontal on mobile */}
                  <div className="hidden lg:flex flex-grow items-center justify-center -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    <h3 className={`text-xl font-heading font-bold whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#0D2440] dark:text-white' : 'text-[#0D2440]/60 dark:text-white/50 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0]'}`}>
                      {cert.code}
                    </h3>
                  </div>
                  
                  <div className="block lg:hidden text-right">
                    <h3 className={`text-lg font-heading font-bold transition-colors duration-300 ${isActive ? 'text-[#0D2440] dark:text-white' : 'text-[#0D2440]/60 dark:text-white/50'}`}>
                      {cert.code}
                    </h3>
                  </div>

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-[#2E5E99] dark:bg-[#7BA4D0] rotate-90 lg:rotate-0' : 'bg-slate-100 dark:bg-white/5 group-hover:bg-[#2E5E99]/10 dark:group-hover:bg-white/10'}`}>
                    <ChevronRight className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-[#0D2440]/40 dark:text-white/40 group-hover:text-[#2E5E99] dark:group-hover:text-white'}`} />
                  </div>
                </motion.div>

                {/* Expanded Content Area */}
                <div className={`flex-grow h-full relative z-10 overflow-hidden transition-opacity duration-500 ${isActive ? 'opacity-100 pointer-events-auto delay-200' : 'opacity-0 pointer-events-none absolute'}`}>
                  <div className="p-6 sm:p-10 lg:p-12 w-full h-full flex flex-col justify-center min-w-[300px]">
                    <motion.div
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
                      transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
                    >
                      <div className="inline-flex px-3 py-1 rounded-full bg-slate-100 dark:bg-[#7BA4D0]/10 border border-slate-200 dark:border-[#7BA4D0]/30 text-[10px] sm:text-xs font-mono tracking-widest text-[#2E5E99] dark:text-[#7BA4D0] uppercase mb-4">
                        {cert.category}
                      </div>
                      <h4 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight mb-4 leading-tight">
                        {cert.title}
                      </h4>
                      <p className="text-sm sm:text-base text-[#0D2440]/75 dark:text-white/70 font-light leading-relaxed mb-8 max-w-md">
                        {cert.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cert.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05]">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-[#0D2440]/80 dark:text-white/80 leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
