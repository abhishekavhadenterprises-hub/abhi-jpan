"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Leaf, 
  Award, 
  HeartHandshake, 
  MapPin, 
  Eye, 
  Download, 
  X, 
  Search, 
  FileCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CertificateData {
  id: string;
  standard: string;
  title: string;
  unit: string;
  location: "Greater Noida" | "Maharashtra" | "Bangalore" | "Neemrana" | "Sanand";
  category: "Quality" | "Environmental" | "Safety" | "Zero Defect";
  image: string;
  scope: string;
  validity: string;
}

export const certificatesList: CertificateData[] = [
  // Greater Noida
  {
    id: "gn-b2-14001",
    standard: "ISO 14001:2015",
    title: "Environmental Management System",
    unit: "Greater Noida B2 Unit",
    location: "Greater Noida",
    category: "Environmental",
    image: "/images/certificates/B2_14001_2015.jpg",
    scope: "Manufacture of Copper, Brass & Steel Precision Tubular Assemblies",
    validity: "Accredited Standard",
  },
  {
    id: "gn-b2-9001",
    standard: "ISO 9001:2015",
    title: "Quality Management System",
    unit: "Greater Noida B2 Unit",
    location: "Greater Noida",
    category: "Quality",
    image: "/images/certificates/B2_9001_2015.jpg",
    scope: "Manufacture & Supply of Precision Engineered Tubular Components",
    validity: "Accredited Standard",
  },
  {
    id: "gn-a2-14001",
    standard: "ISO 14001:2015",
    title: "Environmental Management System",
    unit: "Greater Noida A2 Unit",
    location: "Greater Noida",
    category: "Environmental",
    image: "/images/certificates/A2_14001_2015.jpg",
    scope: "HVAC & Thermal Loop Tubular Component Fabrication",
    validity: "Accredited Standard",
  },
  {
    id: "gn-a2-9001",
    standard: "ISO 9001:2015",
    title: "Quality Management System",
    unit: "Greater Noida A2 Unit",
    location: "Greater Noida",
    category: "Quality",
    image: "/images/certificates/A2_9001_2015.jpg",
    scope: "Precision CNC Bending & End-Forming Manufacturing",
    validity: "Accredited Standard",
  },
  {
    id: "gn-a2-45001",
    standard: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    unit: "Greater Noida A2 Unit",
    location: "Greater Noida",
    category: "Safety",
    image: "/images/certificates/JPan_Tubular_Components_Pvt._Ltd._45_page-0001.jpg",
    scope: "Workplace Health & Operational Safety Management System",
    validity: "Accredited Standard",
  },
  {
    id: "gn-a2-zed",
    standard: "MSME ZED GOLD",
    title: "Zero Defect Zero Effect Certification",
    unit: "Greater Noida A2 Unit",
    location: "Greater Noida",
    category: "Zero Defect",
    image: "/images/certificates/Zed_Gold_Certificate_page.jpg",
    scope: "Ministry of MSME, Government of India National Benchmark",
    validity: "National Benchmark",
  },

  // Maharashtra
  {
    id: "mh-pune-9001",
    standard: "ISO 9001:2015",
    title: "Quality Management System",
    unit: "Pune Unit",
    location: "Maharashtra",
    category: "Quality",
    image: "/images/certificates/ISO_9001_Pune.jpg",
    scope: "Automotive & HVAC Tubular Manifold Production",
    validity: "Accredited Standard",
  },
  {
    id: "mh-pune-14001",
    standard: "ISO 14001:2015",
    title: "Environmental Management System",
    unit: "Pune Unit",
    location: "Maharashtra",
    category: "Environmental",
    image: "/images/certificates/ISO_14001_Pune.jpg",
    scope: "Sustainable Manufacturing & Environmental Compliance",
    validity: "Accredited Standard",
  },

  // Bangalore
  {
    id: "blr-14001",
    standard: "ISO 14001:2015",
    title: "Environmental Management System",
    unit: "Bangalore Unit",
    location: "Bangalore",
    category: "Environmental",
    image: "/images/certificates/Bangalore_14001_2015.jpg",
    scope: "Precision Refrigeration Tubular Lines & Component Finishing",
    validity: "Accredited Standard",
  },
  {
    id: "blr-9001",
    standard: "ISO 9001:2015",
    title: "Quality Management System",
    unit: "Bangalore Unit",
    location: "Bangalore",
    category: "Quality",
    image: "/images/certificates/Bangalore_9001_2015.jpg",
    scope: "Precision Brazing & Multi-Port Manifold Assembly",
    validity: "Accredited Standard",
  },

  // Neemrana
  {
    id: "neem-9001",
    standard: "ISO 9001:2015",
    title: "Quality Management System",
    unit: "Neemrana Unit",
    location: "Neemrana",
    category: "Quality",
    image: "/images/certificates/NEEMRANA_ISO_9001_2015.jpg",
    scope: "Industrial HVAC Sub-Assemblies & CNC Pipe Fabrication",
    validity: "Accredited Standard",
  },

  // Sanand
  {
    id: "sanand-9001",
    standard: "ISO 9001:2015",
    title: "Quality Management System",
    unit: "Sanand Unit",
    location: "Sanand",
    category: "Quality",
    image: "/images/certificates/Sanand_9001_2015.jpg",
    scope: "High-Volume Tubular Lines & OEM Precision Supply",
    validity: "Accredited Standard",
  },
];

const locations = [
  "All Locations",
  "Greater Noida",
  "Maharashtra",
  "Bangalore",
  "Neemrana",
  "Sanand"
] as const;

const categories = [
  "All Standards",
  "Quality",
  "Environmental",
  "Safety",
  "Zero Defect"
] as const;

export function CertificationsGrid() {
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Standards");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewCert, setPreviewCert] = useState<CertificateData | null>(null);

  // Filter logic
  const filteredCertificates = useMemo(() => {
    return certificatesList.filter((cert) => {
      const matchesLocation =
        selectedLocation === "All Locations" || cert.location === selectedLocation;
      const matchesCategory =
        selectedCategory === "All Standards" || cert.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        cert.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesLocation && matchesCategory && matchesSearch;
    });
  }, [selectedLocation, selectedCategory, searchQuery]);

  const getCategoryBadge = (category: CertificateData["category"]) => {
    switch (category) {
      case "Quality":
        return {
          icon: ShieldCheck,
          label: "QMS ISO 9001",
          color: "text-[#2E5E99] dark:text-[#7BA4D0] bg-[#E7F0FA] dark:bg-[#2E5E99]/20 border-[#7BA4D0]/30",
        };
      case "Environmental":
        return {
          icon: Leaf,
          label: "EMS ISO 14001",
          color: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/40",
        };
      case "Safety":
        return {
          icon: HeartHandshake,
          label: "OH&S ISO 45001",
          color: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700/40",
        };
      case "Zero Defect":
        return {
          icon: Award,
          label: "MSME ZED GOLD",
          color: "text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/40",
        };
    }
  };

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      {/* Background Radial Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-bold uppercase tracking-wider mb-3">
              Institutional Compliance
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
              Certified Manufacturing <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Excellence Across Plants
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="px-4 py-2.5 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-xl sm:rounded-2xl flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#E7F0FA] dark:bg-[#071321] flex items-center justify-center border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0]">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider block">
                  12 Official Accreditations
                </span>
                <span className="text-[11px] text-[#0D2440]/60 dark:text-white/60">
                  5 Manufacturing Hubs
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10 sm:mb-12">
          {/* Location Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {locations.map((loc) => {
              const isActive = selectedLocation === loc;
              const count =
                loc === "All Locations"
                  ? certificatesList.length
                  : certificatesList.filter((c) => c.location === loc).length;

              return (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-2 cursor-pointer",
                    isActive
                      ? "bg-[#2E5E99] text-white shadow-md shadow-[#2E5E99]/20"
                      : "bg-white dark:bg-[#0D2440]/50 text-[#0D2440]/80 dark:text-white/80 border border-[#7BA4D0]/25 hover:border-[#2E5E99] hover:bg-[#E7F0FA] dark:hover:bg-[#0D2440]"
                  )}
                >
                  <MapPin className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-[#2E5E99] dark:text-[#7BA4D0]")} />
                  <span>{loc}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-md text-[10px]",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#7BA4D0]/15 text-[#2E5E99] dark:text-[#7BA4D0]"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Search & Standards Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Standards Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[11px] font-heading font-bold transition-all shrink-0 cursor-pointer",
                      isActive
                        ? "bg-[#0D2440] text-white dark:bg-white dark:text-[#0D2440]"
                        : "bg-white dark:bg-[#0D2440]/40 text-[#0D2440]/70 dark:text-white/70 border border-[#7BA4D0]/20 hover:text-[#0D2440] dark:hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7BA4D0]" />
              <input
                type="text"
                placeholder="Search certificate or plant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-sans bg-white dark:bg-[#0D2440]/60 border border-[#7BA4D0]/25 text-[#0D2440] dark:text-white placeholder-[#0D2440]/45 dark:placeholder-white/40 focus:outline-none focus:border-[#2E5E99] dark:focus:border-[#7BA4D0] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0D2440]/50 hover:text-[#0D2440]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-[#0D2440]/30 rounded-3xl border border-[#7BA4D0]/25 p-8 max-w-lg mx-auto">
            <Award className="w-12 h-12 text-[#7BA4D0] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-heading font-black text-[#0D2440] dark:text-white">
              No Certificates Found
            </h3>
            <p className="text-xs text-[#0D2440]/70 dark:text-white/70 mt-1">
              Try adjusting your search query or location filter to see our accreditations.
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
          >
            {filteredCertificates.map((cert) => {
              const badge = getCategoryBadge(cert.category);
              const BadgeIcon = badge.icon;

              return (
                <motion.div
                  layout
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-5 sm:p-5.5 flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div>
                    {/* Top Metadata Badge & Location */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-heading font-bold uppercase tracking-wider border",
                          badge.color
                        )}
                      >
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0D2440]/70 dark:text-white/70">
                        <MapPin className="w-3 h-3 text-[#2E5E99] dark:text-[#7BA4D0]" />
                        <span>{cert.location}</span>
                      </span>
                    </div>

                    {/* Certificate Thumbnail Preview Container */}
                    <div 
                      onClick={() => setPreviewCert(cert)}
                      className="relative w-full aspect-[3/4] bg-[#F1F5F9] dark:bg-[#071321] rounded-xl sm:rounded-2xl overflow-hidden border border-[#7BA4D0]/20 mb-4 cursor-pointer group/img"
                    >
                      <Image
                        src={cert.image}
                        alt={`${cert.standard} - ${cert.unit}`}
                        fill
                        className="object-contain p-2 group-hover/img:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#0D2440]/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                        <span className="px-3 py-1.5 rounded-lg bg-white text-[#0D2440] font-heading font-bold text-xs flex items-center gap-1.5 shadow-md">
                          <Eye className="w-3.5 h-3.5" />
                          View Full
                        </span>
                      </div>
                    </div>

                    {/* Standard & Unit Details */}
                    <div>
                      <h3 className="text-base sm:text-lg font-heading font-black text-[#0D2440] dark:text-white leading-snug tracking-tight">
                        {cert.standard}
                      </h3>
                      <p className="text-xs font-semibold text-[#2E5E99] dark:text-[#7BA4D0] mt-0.5">
                        {cert.unit}
                      </p>
                      <p className="text-[11px] text-[#0D2440]/70 dark:text-white/65 mt-1 leading-relaxed line-clamp-2">
                        {cert.scope}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 mt-4 border-t border-[#7BA4D0]/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-heading font-bold text-[#0D2440] dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-[#E7F0FA] dark:hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      <span>Preview</span>
                    </button>

                    <a
                      href={cert.image}
                      download
                      className="px-3.5 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#0D2440] hover:bg-[#2E5E99] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      title="Download Certificate"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Save</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {previewCert && (
          <div 
            data-lenis-prevent="true"
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewCert(null)}
              className="absolute inset-0 bg-[#0D2440]/85 dark:bg-black/92 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent="true"
              className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-[#7BA4D0]/20 bg-[#F8FAFC] dark:bg-[#071321] flex items-center justify-between gap-4 shrink-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider bg-[#E7F0FA] dark:bg-[#2E5E99]/20 text-[#2E5E99] dark:text-[#7BA4D0]">
                      {previewCert.category}
                    </span>
                    <span className="text-xs text-[#0D2440]/60 dark:text-white/60">
                      {previewCert.location}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-black text-[#0D2440] dark:text-white truncate">
                    {previewCert.standard} — {previewCert.unit}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={previewCert.image}
                    download
                    className="px-3.5 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#2E5E99] hover:bg-[#1D3E66] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  
                  <button
                    onClick={() => setPreviewCert(null)}
                    className="p-2 rounded-xl text-[#0D2440]/60 dark:text-white/60 hover:text-[#0D2440] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close certificate lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Canvas */}
              <div 
                data-lenis-prevent="true"
                className="p-4 sm:p-6 bg-[#EBF3FC]/40 dark:bg-black/50 overflow-y-auto flex-grow flex items-center justify-center max-h-[78vh]"
              >
                <div className="relative w-full max-w-2xl aspect-[3/4] shadow-2xl rounded-xl overflow-hidden bg-white">
                  <Image
                    src={previewCert.image}
                    alt={`${previewCert.standard} - ${previewCert.unit}`}
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>

              {/* Footer Scope Info */}
              <div className="p-3.5 sm:p-4 border-t border-[#7BA4D0]/15 bg-white dark:bg-[#0D2440] text-center text-xs text-[#0D2440]/70 dark:text-white/70">
                <span className="font-semibold text-[#0D2440] dark:text-white">Scope: </span>
                {previewCert.scope}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
