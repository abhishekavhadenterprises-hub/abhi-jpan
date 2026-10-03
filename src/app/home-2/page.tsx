"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Quote, Cpu, ShieldCheck, Flame, Award, MapPin, Mail, Phone } from "lucide-react";

const capabilityModules = [
  { id: "01", name: "Multi-Axis CNC Cold Bending", sublabel: "CLOSED-LOOP AUTOMATION", image: "/manufacturing_floor.png", badge: "PLANT VI • CNC FORMING", specValue: "±0.01 mm", specLabel: "TOLERANCE", headline: "Closed-Loop Robotic 3D Cold Bending", icon: Cpu },
  { id: "02", name: "Mass-Spectrometry Helium Leak Testing", sublabel: "VACUUM CHAMBER VERIFIED", image: "/quality_precision.png", badge: "LABORATORY • VACUUM QA", specValue: "< 10⁻⁸", specLabel: "LEAK RATE", headline: "Molecular Helium Seal Integrity", icon: ShieldCheck },
  { id: "03", name: "Induction & Controlled Atmosphere Brazing", sublabel: "INERT NITROGEN SHIELDING", image: "/industrial_precision_tubing_1778827579055.png", badge: "PLANT IV • BRAZING LINE", specValue: "ZERO", specLabel: "OXIDATION", headline: "High-Frequency Induction Brazing", icon: Flame },
  { id: "04", name: "IATF 16949 & ISO 9001:2015 Certified", sublabel: "GLOBAL TIER-1 AUDIT", image: "/engineering_precision_facility_1778657209621.png", badge: "GLOBAL OEM VERIFIED", specValue: "0 DEFECT", specLabel: "POLICY", headline: "Institutional Zero-Tolerance QA", icon: Award },
];

export default function Home2() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveModuleIndex(prev => (prev + 1) % capabilityModules.length), 6000);
    return () => clearInterval(interval);
  }, []);
  const activeModule = capabilityModules[activeModuleIndex];

  return (
    <main className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#586854] selection:text-white pb-0">
      
      {/* 1. Hero Section (Ultra-Premium Cinematic Redesign) */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0D2440] mb-24 md:mb-32">
        <motion.div 
          style={{ y: heroY }} 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <motion.div
            animate={{ scale: [1.05, 1.15] }}
            transition={{ duration: 20, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image src="/premium_infrastructure_facility_1778674475991.png" alt="J Pan Tubular Components Manufacturing" fill className="object-cover object-center opacity-40" priority />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D2440]/90 via-[#0D2440]/40 to-[#0D2440] mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0D2440]/60 to-[#0D2440]" />
        </motion.div>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#2E5E99]/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#586854]/20 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center text-center mt-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="flex items-center gap-3 mb-8 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-medium">Global Manufacturing Hub</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[6.5rem] font-light tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/60 mb-10 max-w-5xl"
          >
            Precision Engineered <br/>
            <span className="italic font-serif opacity-90">At Industrial Scale</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }}
            className="text-lg md:text-xl text-[#A0AEC0] max-w-2xl leading-relaxed mb-12 font-light"
          >
            J Pan Tubular Components brings decades of expertise to global OEMs, ensuring flawless zero-defect molecular integrity across every assembly.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="flex flex-col sm:flex-row gap-6">
            <Link href="/products" className="group relative overflow-hidden bg-white text-[#0D2440] px-10 py-5 rounded-full flex items-center gap-3 font-semibold text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10">Explore Capabilities</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Core Capabilities (Premium UI) */}
      <section className="px-4 md:px-8 mb-24 md:mb-40 relative">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#586854]/10 to-transparent blur-[100px] rounded-full -z-10" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col mb-16">
          <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-4">Manufacturing Excellence</h2>
          <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#111]">Core Capabilities</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 relative z-10">
            {capabilityModules.map((mod, idx) => {
              const isActive = activeModuleIndex === idx;
              const ModIcon = mod.icon;
              return (
                <motion.button
                  key={mod.id} onClick={() => setActiveModuleIndex(idx)}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group text-left p-6 rounded-3xl transition-all duration-700 ease-out flex items-center justify-between border ${isActive ? "border-white/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] scale-[1.02]" : "border-transparent bg-transparent hover:bg-white/50 hover:border-white/40"}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? "bg-[#111] text-white shadow-lg" : "bg-white/50 text-[#999] group-hover:bg-white"}`}><ModIcon className="w-5 h-5 stroke-[1.5]" /></div>
                    <div>
                      <span className={`block text-[10px] tracking-[0.15em] uppercase mb-1.5 transition-colors duration-500 ${isActive ? 'text-[#586854] font-medium' : 'text-[#999]'}`}>{mod.sublabel}</span>
                      <span className={`block text-lg tracking-tight transition-colors duration-500 ${isActive ? 'text-[#111] font-semibold' : 'text-[#666]'}`}>{mod.name}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:col-span-7 relative min-h-[500px] lg:min-h-[650px] bg-[#111] overflow-hidden group rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <AnimatePresence mode="wait">
              <motion.div key={activeModule.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="absolute inset-0">
                <Image src={activeModule.image} alt={activeModule.headline} fill className="object-cover transition-transform duration-[15s] group-hover:scale-110" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/90 via-black/20 to-transparent mix-blend-multiply" />
                <div className="absolute top-8 left-8 z-10">
                  <span className="text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> {activeModule.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-10 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <span className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-3">{activeModule.specLabel}</span>
                    <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight max-w-md">{activeModule.headline}</h3>
                  </div>
                  <div className="text-left md:text-right p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="block text-4xl md:text-5xl font-light text-white tracking-tighter mb-1">{activeModule.specValue}</span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/60">Verified Spec</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 3. Metrics Grid (Premium Eye-Catchy Redesign) */}
      <section className="px-4 md:px-8 mb-24 md:mb-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] to-white -z-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { value: "28+", label: "Years of Excellence", desc: "Decades of manufacturing innovation." },
            { value: "6", label: "Specialized Plants", desc: "Strategically situated across India." },
            { value: "65k MT", label: "Annual Capacity", desc: "High-throughput volume production." },
            { value: "120+", label: "Global OEM Partners", desc: "Verified Tier-1 supplier." },
          ].map((stat, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="relative p-10 rounded-2xl bg-white border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[240px] group overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#586854]/10 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700" />
              <div>
                <div className="text-5xl lg:text-6xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#111] to-[#666] mb-4 group-hover:scale-105 transform origin-left transition-transform duration-500">{stat.value}</div>
                <h4 className="text-sm font-semibold text-[#111] mb-2 uppercase tracking-wide">{stat.label}</h4>
              </div>
              <p className="text-sm text-[#666] leading-relaxed relative z-10">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Industries Served (Premium Redesign) */}
      <section className="px-4 md:px-8 mb-24 md:mb-32 py-16 md:py-24 relative overflow-hidden rounded-[2.5rem] bg-[#0D2440] text-white shadow-2xl mx-4 md:mx-8">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2E5E99]/40 via-[#0D2440] to-[#0D2440] opacity-80" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#586854]/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col items-center justify-center text-center pb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#A0AEC0] mb-4">Precision For</h2>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight">Critical Sectors</h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 lg:px-16">
            {[
              { title: "HVAC & Commercial Air", desc: "Heavy-duty manifolds and distribution networks for chiller systems.", icon: "01" },
              { title: "Automotive & EV", desc: "High-vibration resistant tubular networks for modern powertrains.", icon: "02" },
              { title: "White Goods Refrigeration", desc: "Zero-defect capillary and suction tube assemblies for home appliances.", icon: "03" }
            ].map((ind, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className="group relative p-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="text-5xl font-light text-white/10 mb-6 font-mono group-hover:text-white/20 transition-colors duration-500">{ind.icon}</div>
                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">{ind.title}</h3>
                <p className="text-sm text-[#A0AEC0] leading-relaxed">{ind.desc}</p>
                
                <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us (Premium Glass UI) */}
      <section className="px-4 md:px-8 mb-24 md:mb-40 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#586854]/5 to-[#2E5E99]/5 rounded-full blur-[120px] -z-10" />
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="md:w-1/3 flex flex-col justify-center">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#666]" /> Why J Pan
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#111] leading-[1.1] mb-8">
              Precision delivered at industrial scale.
            </h3>
            <p className="text-[#666] leading-relaxed mb-10">Our synchronized production systems and in-house tooling capabilities allow us to meet the exact tolerances required by global OEMs.</p>
            <div>
              <Link href="/about" className="inline-flex items-center gap-3 text-sm font-medium text-[#111] hover:text-[#586854] transition-colors group">
                Discover Our Process <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Zero Defect Policy", desc: "100% helium mass spectrometry testing ensuring absolute molecular integrity.", icon: ShieldCheck },
              { title: "Just In Time Delivery", desc: "Synchronized production systems audited by Hitachi and LG.", icon: Flame },
              { title: "In-House Tooling", desc: "Complete CAD/CAM capability for rapid prototyping and die development.", icon: Cpu },
              { title: "Metallurgical Purity", desc: "Controlled atmosphere brazing preventing internal oxidation.", icon: Award }
            ].map((reason, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-bl from-[#586854]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#111] transition-colors duration-500">
                  <reason.icon className="w-6 h-6 text-[#111] group-hover:text-white transition-colors duration-500 stroke-[1.5]" />
                </div>
                <h4 className="text-xl font-semibold text-[#111] mb-3">{reason.title}</h4>
                <p className="text-sm text-[#666] leading-relaxed relative z-10">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Facilities (Premium Redesign) */}
      <section className="px-4 md:px-8 mb-24 md:mb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col items-center text-center pb-12">
          <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-4">Infrastructure</h2>
          <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#111]">Featured Facilities</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 lg:px-8">
          {[
            { img: "/engineering_precision_facility_1778657209621.png", title: "Neemrana Plant I", desc: "Flagship CNC Bending" },
            { img: "/premium_infrastructure_facility_1778674475991.png", title: "Sanand Plant II", desc: "Automotive Tubular Hub" },
            { img: "/manufacturing_floor.png", title: "Noida Plant III", desc: "Multi-axis Forming" },
            { img: "/quality_precision.png", title: "R&D Metrology Lab", desc: "Vacuum Quality Assurance" }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }} 
              className="group cursor-pointer relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-[10s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/70 uppercase tracking-widest">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Executive Perspective (Testimonials) */}
      <section className="px-4 md:px-8 mb-24 md:mb-32">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#586854] text-white p-8 md:p-16 lg:p-24 rounded-[3rem] shadow-2xl mx-2 md:mx-8 relative overflow-hidden">
          <div className="absolute -top-64 -right-64 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden bg-[#4A5747] rounded-3xl shadow-inner">
             <Image src="/images/jignesh-panchal.png" alt="Jignesh Panchal" fill className="object-cover object-top opacity-90 transition-transform duration-[10s] hover:scale-105" />
          </div>
          <div className="lg:col-span-7 pl-0 lg:pl-12 relative z-10">
            <Quote className="w-12 h-12 text-white/20 mb-8" />
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight leading-[1.15] mb-12">
              "Every manufacturing process must begin and end with the customer's exacting standard. Customer satisfaction is our foundational constraint."
            </h2>
            <div className="uppercase tracking-[0.2em] text-sm font-semibold mb-1 border-t border-white/20 pt-6 inline-block text-white">Jignesh Panchal</div>
            <div className="text-white/60 text-sm mt-2">Founder & Managing Director</div>
          </div>
        </motion.div>
      </section>

      {/* 8. Precision Components (Premium Cards) */}
      <section className="px-4 md:px-8 mb-24 md:mb-32 relative">
        <div className="absolute inset-0 bg-[#F8FAFC] -z-10 skew-y-2 transform origin-top-left" />
        <div className="pt-24 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col md:flex-row items-center justify-between mb-16 px-4 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#111]">Precision Components</h2>
            <Link href="/products" className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#111] bg-white border border-[#E5E5E5] px-8 py-4 rounded-full shadow-sm hover:shadow-md hover:bg-[#111] hover:text-white transition-all mt-6 md:mt-0">
              View All Catalog <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-8">
            {[
              { name: "Copper Tubular Assemblies", category: "HVAC Systems" },
              { name: "Brass Distribution Manifolds", category: "Commercial Cooling" },
              { name: "Stainless Steel Headers", category: "Automotive" },
              { name: "Aluminum Micro-Channel Tubes", category: "Refrigeration" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }} 
                className="group relative bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-square w-full mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#F1F5F9] rounded-2xl transform group-hover:scale-95 transition-transform duration-500 ease-out" />
                  <div className="relative z-10 text-xs font-mono text-[#999] tracking-widest uppercase">Product View</div>
                </div>
                <h3 className="text-lg font-semibold text-[#111] mb-2 relative z-10">{item.name}</h3>
                <p className="text-xs text-[#666] uppercase tracking-[0.15em] relative z-10">{item.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Engineering Knowledge (Premium Redesign) */}
      <section className="bg-gradient-to-b from-white to-[#F8FAFC] pt-24 pb-32 px-4 md:px-8 mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col items-center text-center pb-16">
          <h2 className="text-xs tracking-[0.3em] uppercase text-[#666] mb-4">Certifications</h2>
          <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#111]">Engineering Knowledge</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 lg:px-12 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="group cursor-pointer bg-white rounded-[2rem] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2 border border-white/60">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] mb-8">
              <Image src="/industrial_precision_tubing_1778827579055.png" alt="Knowledge 1" fill className="object-cover transition-transform duration-[10s] group-hover:scale-105" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center gap-4 text-[10px] text-[#586854] uppercase tracking-widest mb-4 font-semibold"><span>Quality Assurance</span><span className="w-4 h-px bg-[#586854]"></span><span>IATF 16949</span></div>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#111] leading-snug group-hover:text-[#586854] transition-colors">The Evolution of Zero-Defect Helium Mass Spectrometry in HVAC Systems</h3>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="group cursor-pointer bg-white rounded-[2rem] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2 border border-white/60">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] mb-8">
              <Image src="/manufacturing_floor.png" alt="Knowledge 2" fill className="object-cover transition-transform duration-[10s] group-hover:scale-105" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center gap-4 text-[10px] text-[#586854] uppercase tracking-widest mb-4 font-semibold"><span>Process Control</span><span className="w-4 h-px bg-[#586854]"></span><span>SPS Level 4</span></div>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#111] leading-snug group-hover:text-[#586854] transition-colors">Achieving Synchronized Production System Audits for Global Tier-1 Leaders</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Contact Preview Section (High-Tech Glass UI) */}
      <section className="px-4 md:px-8 mb-32 relative">
        <div className="bg-[#0D2440] rounded-[3rem] p-8 md:p-16 lg:p-24 overflow-hidden relative shadow-2xl mx-2 md:mx-8">
          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2E5E99]/30 via-transparent to-transparent opacity-80" />
          
          <div className="flex flex-col lg:flex-row gap-16 relative z-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="lg:w-1/2">
               <h2 className="text-5xl lg:text-7xl font-light tracking-tight leading-[0.95] mb-10 text-white">Reach Out <br/><span className="text-white/60">To Our Team</span></h2>
               <p className="text-base text-[#A0AEC0] leading-relaxed mb-12 max-w-md">Submit an engineering RFQ or request CAD tooling feasibility. Our team of experts will respond within 24 hours.</p>
               
               <div className="space-y-8">
                  <div className="flex items-center gap-6 text-sm group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl group-hover:bg-white group-hover:text-[#0D2440] transition-all duration-500 cursor-pointer backdrop-blur-sm"><MapPin className="w-5 h-5 text-white group-hover:text-[#0D2440] transition-colors" /></div>
                    <span className="text-base text-white/80 group-hover:text-white transition-colors">Noida, Uttar Pradesh, India</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl group-hover:bg-white group-hover:text-[#0D2440] transition-all duration-500 cursor-pointer backdrop-blur-sm"><Mail className="w-5 h-5 text-white group-hover:text-[#0D2440] transition-colors" /></div>
                    <span className="text-base text-white/80 group-hover:text-white transition-colors cursor-pointer">info@jpantubular.com</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl group-hover:bg-white group-hover:text-[#0D2440] transition-all duration-500 cursor-pointer backdrop-blur-sm"><Phone className="w-5 h-5 text-white group-hover:text-[#0D2440] transition-colors" /></div>
                    <span className="text-base text-white/80 group-hover:text-white transition-colors cursor-pointer">+91 120 2560586</span>
                  </div>
               </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className="lg:w-1/2 relative flex items-center justify-center min-h-[500px]">
               {/* Abstract Glowing Rings */}
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
                 <div className="absolute w-[600px] h-[600px] rounded-full border border-white/10 border-dashed" />
                 <div className="absolute w-[450px] h-[450px] rounded-full border border-[#2E5E99]/40" />
                 <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 border-dashed" />
               </motion.div>
               
               <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center hover:-translate-y-2 transition-transform duration-700">
                  <h3 className="text-2xl font-light tracking-tight mb-4 text-white">Global Shipping Network</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-10">Our strategic location in the DMIC corridor enables rapid logistics and JIT delivery across 12+ international markets.</p>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#0D2440] bg-white px-8 py-4 rounded-full font-semibold hover:bg-[#586854] hover:text-white transition-colors w-full shadow-[0_10px_30px_rgba(255,255,255,0.15)]">
                    Contact Us <ArrowUpRight className="w-4 h-4" />
                  </Link>
               </div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* 11. Custom Editorial Footer */}
      <footer className="bg-[#FAFAFA] text-[#111] pt-16 pb-6 px-4 md:px-8 border-t border-[#E5E5E5]">
        {/* Massive Logo Section */}
        <div className="w-full flex justify-center mb-16 px-4 overflow-hidden">
          <h2 className="text-[12vw] font-bold tracking-tighter leading-none text-[#111] uppercase mix-blend-multiply">
            JPANTUBULAR
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E5E5E5] mb-12" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Newsletter Section */}
          <div className="w-full lg:w-[25%] lg:border-r border-[#E5E5E5] lg:pr-12">
            <h3 className="font-mono text-sm mb-8 text-[#333]">Newsletter</h3>
            <div className="relative border-b border-[#E5E5E5] pb-2 mb-4 group">
              <input 
                type="email" 
                placeholder="email@company.com" 
                className="w-full bg-transparent text-sm outline-none placeholder-[#999] text-[#111]"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#111] hover:text-[#586854] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-[#999] mb-12">I ACCEPT THE CONDITIONS</p>
            
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors duration-300">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors duration-300">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="w-full lg:w-[75%] lg:pl-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-mono text-sm mb-6 text-[#333]">Capabilities</h4>
              <ul className="space-y-4 text-sm text-[#666]">
                <li><Link href="#" className="hover:text-[#111] transition-colors">CNC Bending</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Helium Testing</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Induction Brazing</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">End Forming</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm mb-6 text-[#333]">Quality</h4>
              <ul className="space-y-4 text-sm text-[#666]">
                <li><Link href="#" className="hover:text-[#111] transition-colors">IATF 16949</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">SPS Level 4</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Zero Defect</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Traceability</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm mb-6 text-[#333]">Company</h4>
              <ul className="space-y-4 text-sm text-[#666]">
                <li><Link href="#" className="hover:text-[#111] transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Facilities</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-sm mb-6 text-[#333]">Support</h4>
              <ul className="space-y-4 text-sm text-[#666]">
                <li><Link href="#" className="hover:text-[#111] transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">RFQ Portal</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#111] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full h-px bg-[#E5E5E5] mt-16 mb-4" />
        <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-[#999] px-2">
          <span>COPYRIGHT JPAN TUBULAR 2025</span>
        </div>
      </footer>
    </main>
  );
}
