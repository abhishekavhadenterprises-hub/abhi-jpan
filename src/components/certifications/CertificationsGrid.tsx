"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
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
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Move
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLaptopPacing } from "@/hooks/useLaptopPacing";

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
  "Greater Noida",
  "Maharashtra",
  "Bangalore",
  "Neemrana",
  "Sanand"
] as const;

export function CertificationsGrid() {
  const [selectedLocation, setSelectedLocation] = useState<string>("Greater Noida");
  const [previewCert, setPreviewCert] = useState<CertificateData | null>(null);
  const { isLaptop, revealDuration, staggerDelay, hoverClass } = useLaptopPacing();

  // High-Resolution Interactive Zoom & Pan State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);

  // Filter only by location
  const filteredCertificates = useMemo(() => {
    return certificatesList.filter((cert) => cert.location === selectedLocation);
  }, [selectedLocation]);

  const handleSelectCert = useCallback((cert: CertificateData) => {
    setPreviewCert(cert);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleCloseModal = useCallback(() => {
    setPreviewCert(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const currentCertIndex = useMemo(() => {
    if (!previewCert) return -1;
    return filteredCertificates.findIndex((c) => c.id === previewCert.id);
  }, [previewCert, filteredCertificates]);

  const handlePrevCert = useCallback(() => {
    if (currentCertIndex > 0) {
      handleSelectCert(filteredCertificates[currentCertIndex - 1]);
    }
  }, [currentCertIndex, filteredCertificates, handleSelectCert]);

  const handleNextCert = useCallback(() => {
    if (currentCertIndex < filteredCertificates.length - 1) {
      handleSelectCert(filteredCertificates[currentCertIndex + 1]);
    }
  }, [currentCertIndex, filteredCertificates, handleSelectCert]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(Number((prev + 0.5).toFixed(2)), 3.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(2)), 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3.5));
    } else if (e.deltaY > 0) {
      setZoom((prev) => {
        const next = Math.max(Number((prev - 0.25).toFixed(2)), 1);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Pointer Drag Handlers (with smooth boundaries)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
    }
    if (zoom > 1) {
      const maxBoundX = 400 * (zoom - 1);
      const maxBoundY = 500 * (zoom - 1);
      const newX = Math.max(-maxBoundX, Math.min(maxBoundX, panStartRef.current.x + dx));
      const newY = Math.max(-maxBoundY, Math.min(maxBoundY, panStartRef.current.y + dy));
      setPan({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Finger swipe left/right between certificates on phone/mobile when not zoomed
    if (hasMovedRef.current && zoom === 1) {
      const dx = e.clientX - dragStartRef.current.x;
      if (dx < -40) {
        handleNextCert();
        return;
      } else if (dx > 40) {
        handlePrevCert();
        return;
      }
    }

    // Click toggle zoom if not dragged
    if (!hasMovedRef.current) {
      if (zoom === 1) {
        setZoom(2.2);
      } else {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    }
  };

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    if (!previewCert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetZoom();
      } else if (e.key === "ArrowLeft" && zoom === 1) {
        handlePrevCert();
      } else if (e.key === "ArrowRight" && zoom === 1) {
        handleNextCert();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewCert, zoom, handleCloseModal, handleZoomIn, handleZoomOut, handleResetZoom, handlePrevCert, handleNextCert]);

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
        <div className="mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
              Certified Manufacturing <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Excellence Across Plants
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Location Tabs Only */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {locations.map((loc) => {
              const isActive = selectedLocation === loc;
              const count = certificatesList.filter((c) => c.location === loc).length;

              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocation(loc)}
                  className={cn(
                    "px-3 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer",
                    isActive
                      ? "bg-[#2E5E99] text-white shadow-md shadow-[#2E5E99]/20"
                      : "bg-white dark:bg-[#0D2440]/50 text-[#0D2440]/80 dark:text-white/80 border border-[#7BA4D0]/25 hover:border-[#2E5E99] hover:bg-[#E7F0FA] dark:hover:bg-[#0D2440]"
                  )}
                >
                  <MapPin className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0", isActive ? "text-white" : "text-[#2E5E99] dark:text-[#7BA4D0]")} />
                  <span>{loc}</span>
                  <span
                    className={cn(
                      "px-1.5 sm:px-2 py-0.5 rounded-md text-[10px]",
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
        </div>

        {/* Certificate Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
        >
          {filteredCertificates.map((cert, idx) => {
            const badge = getCategoryBadge(cert.category);
            const BadgeIcon = badge.icon;

            return (
              <motion.div
                layout
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: revealDuration(0.5), delay: isLaptop ? Math.min(idx % 6, 5) * staggerDelay(0) : 0, ease: [0.16, 1, 0.3, 1] }}
                className={cn("group bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] rounded-2xl sm:rounded-3xl p-5 sm:p-5.5 flex flex-col justify-between shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 transition-all hover:-translate-y-1 relative overflow-hidden", hoverClass("duration-300"))}
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
                    onClick={() => handleSelectCert(cert)}
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
                      <span className="px-3.5 py-1.5 rounded-lg bg-white text-[#0D2440] font-heading font-bold text-xs flex items-center gap-1.5 shadow-md">
                        <ZoomIn className="w-3.5 h-3.5 text-[#2E5E99]" />
                        View & Zoom
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
                    onClick={() => handleSelectCert(cert)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-heading font-bold text-[#0D2440] dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-[#E7F0FA] dark:hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                    <span>View & Zoom</span>
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

      </div>

      {/* High-Resolution Certificate Lightbox Modal with Full Zoom & Pan Controls */}
      <AnimatePresence>
        {previewCert && (
          <div 
            data-lenis-prevent="true"
            className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-[#0D2440]/85 dark:bg-black/92 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent="true"
              className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]"
            >
              {/* Header */}
              <div className="p-3.5 sm:p-4.5 border-b border-[#7BA4D0]/20 bg-[#F8FAFC] dark:bg-[#071321] flex items-center justify-between gap-3 sm:gap-4 shrink-0">
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
                  {/* Quick Zoom Buttons in Header */}
                  <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-xl px-2 py-1 shadow-xs">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoom <= 1}
                      className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Zoom Out (-)"
                    >
                      <ZoomOut className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded hover:bg-[#2E5E99]/10 text-[#0D2440] dark:text-white transition-colors cursor-pointer"
                      title="Reset Zoom"
                    >
                      {Math.round(zoom * 100)}%
                    </button>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoom >= 3.5}
                      className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Zoom In (+)"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                    </button>
                    {zoom > 1 && (
                      <button
                        onClick={handleResetZoom}
                        className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-[#0D2440] dark:hover:text-white transition-colors cursor-pointer ml-0.5 border-l border-slate-200 dark:border-white/15 pl-1.5"
                        title="Reset to Fit (0)"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <a
                    href={previewCert.image}
                    download
                    className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-heading font-bold text-white bg-[#2E5E99] hover:bg-[#1D3E66] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-xl text-[#0D2440]/60 dark:text-white/60 hover:text-[#0D2440] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close certificate lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Canvas with Interactive Pan & Zoom */}
              <div 
                data-lenis-prevent="true"
                onWheel={handleWheel}
                className="relative p-2 sm:p-4 md:p-6 bg-[#EBF3FC]/50 dark:bg-black/60 overflow-hidden flex-grow flex justify-center items-center min-h-[460px] max-h-[75vh] select-none"
              >
                {/* Floating Left / Right Certificate Navigation Buttons */}
                {currentCertIndex > 0 && (
                  <button
                    onClick={handlePrevCert}
                    aria-label="Previous certificate"
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 dark:bg-[#0D2440]/90 text-[#0D2440] dark:text-white border border-[#7BA4D0]/30 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {currentCertIndex < filteredCertificates.length - 1 && (
                  <button
                    onClick={handleNextCert}
                    aria-label="Next certificate"
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 dark:bg-[#0D2440]/90 text-[#0D2440] dark:text-white border border-[#7BA4D0]/30 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Draggable & Scalable Certificate Image */}
                <div 
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className={cn(
                    "relative flex justify-center items-center py-1 sm:py-2 touch-none select-none max-h-full max-w-full",
                    zoom === 1 ? "cursor-zoom-in" : isDragging ? "cursor-grabbing" : "cursor-grab"
                  )}
                >
                  <img
                    src={previewCert.image}
                    alt={`${previewCert.standard} - ${previewCert.unit}`}
                    draggable={false}
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transformOrigin: "center center",
                      transition: isDragging ? "none" : "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="w-auto h-auto max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl bg-white p-2 sm:p-3 border border-[#7BA4D0]/20 pointer-events-none select-none"
                  />
                </div>

                {/* Floating Bottom Zoom & Navigation Control Bar */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 dark:bg-[#0D2440]/95 backdrop-blur-xl border border-[#7BA4D0]/35 shadow-xl text-xs text-[#0D2440] dark:text-white">
                  {/* Zoom Out Button */}
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 1}
                    className="p-1 sm:p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                  </button>

                  {/* Zoom Percentage / Reset Pill */}
                  <button
                    onClick={handleResetZoom}
                    className="px-2 py-0.5 rounded-md font-mono font-bold text-[11px] sm:text-xs hover:bg-[#2E5E99]/10 text-[#0D2440] dark:text-white transition-colors cursor-pointer"
                    title="Click to Reset Zoom (100%)"
                  >
                    {Math.round(zoom * 100)}%
                  </button>

                  {/* Zoom In Button */}
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 3.5}
                    className="p-1 sm:p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                  </button>

                  {/* Reset Icon Button */}
                  {zoom > 1 && (
                    <button
                      onClick={handleResetZoom}
                      className="p-1 sm:p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-[#0D2440] dark:hover:text-white transition-colors cursor-pointer"
                      title="Reset to Fit (0)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-white/20 mx-0.5 sm:mx-1" />

                  {/* Certificate index badge */}
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {currentCertIndex + 1} / {filteredCertificates.length}
                  </span>

                  {/* Helpful Interaction Tip */}
                  <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 pl-1 border-l border-slate-200 dark:border-white/10">
                    {zoom > 1 ? (
                      <>
                        <Move className="w-2.5 h-2.5" /> Drag to pan
                      </>
                    ) : (
                      <>
                        <ZoomIn className="w-2.5 h-2.5" /> Click or scroll to zoom
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Footer Scope Info */}
              <div className="p-3 sm:p-3.5 border-t border-[#7BA4D0]/15 bg-white dark:bg-[#0D2440] text-center text-xs text-[#0D2440]/70 dark:text-white/70 shrink-0">
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
