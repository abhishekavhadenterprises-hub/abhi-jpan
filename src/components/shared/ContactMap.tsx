"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";

// Client-only dynamic import for the WebGL Cobe globe
const CobeInteractiveGlobe = dynamic(
  () => import("./CobeInteractiveGlobe").then((m) => m.CobeInteractiveGlobe),
  { ssr: false }
);

export interface HubLocation {
  id: string;
  title: string;
  city: string;
  state: string;
  type: string;
  corridor: string;
  address: string;
  phone: string;
  plantId: string;
  lat: number;
  lng: number;
  phi: number;
  theta: number;
  image: string;
  verifiedBadge: string;
  tagline: string;
}

export const hubLocations: HubLocation[] = [
  {
    id: "greater-noida-1",
    title: "GREATER NOIDA",
    city: "Greater Noida 1",
    state: "Uttar Pradesh",
    type: "Corporate HO & Plant VI",
    corridor: "Delhi-NCR Industrial Corridor",
    address: "B-2/31, 32 & 42, Surajpur Site B Industrial Area, Greater Noida, UP 201306",
    phone: "+91-120-2560586",
    plantId: "JPAN-HO-01",
    lat: 28.5129,
    lng: 77.5014,
    phi: -2.9235,
    theta: 0.4976,
    image: "/infrastructure_facility.png",
    verifiedBadge: "IATF 16949 / ISO 9001 VERIFIED",
    tagline: "Corporate Headquarters & Advanced Precision Robotic Tubular Lines."
  },
  {
    id: "greater-noida-2",
    title: "NOIDA UNIT 2",
    city: "Greater Noida 2",
    state: "Uttar Pradesh",
    type: "Manufacturing Unit v2",
    corridor: "Delhi-NCR Industrial Corridor",
    address: "A2/1A, Surajpur Site B Industrial Block G Rd, Greater Noida, UP 201306",
    phone: "+91-120-2560586",
    plantId: "JPAN-PLANT-02",
    lat: 28.5148,
    lng: 77.4925,
    phi: -2.9233,
    theta: 0.4977,
    image: "/manufacturing_floor.png",
    verifiedBadge: "OPERATIONS VERIFIED",
    tagline: "High-volume precision tubular fabrication & specialized CNC tooling facility."
  },
  {
    id: "neemrana",
    title: "NEEMRANA",
    city: "Neemrana",
    state: "Rajasthan",
    type: "Manufacturing Unit v3",
    corridor: "Delhi-Mumbai Industrial Corridor (DMIC)",
    address: "Plot No. E-16 Industrial Area, Kolila Joga, Neemrana, Rajasthan 301020",
    phone: "+91-120-2560586",
    plantId: "JPAN-DMIC-03",
    lat: 27.9868,
    lng: 76.3884,
    phi: -2.9040,
    theta: 0.4885,
    image: "/engineering_precision_facility_1778657209621.png",
    verifiedBadge: "OPERATIONS VERIFIED",
    tagline: "Rapid-response localized manufacturing for leading two-wheeler & automotive OEMs."
  },
  {
    id: "sanand",
    title: "SANAND",
    city: "Sanand (Ahmedabad)",
    state: "Gujarat",
    type: "Manufacturing Unit v4",
    corridor: "Western Automotive Corridor",
    address: "E-235, SANAND Industrial Estate, Ahmedabad, Gujarat 382170",
    phone: "+91-120-2560586",
    plantId: "JPAN-WEST-04",
    lat: 22.9868,
    lng: 72.3857,
    phi: -2.8342,
    theta: 0.4012,
    image: "/premium_infrastructure_facility_1778674475991.png",
    verifiedBadge: "TIER-1 OEM APPROVED",
    tagline: "Strategic Western India auto hub delivering specialized copper & steel tubular assemblies."
  },
  {
    id: "ranjangaon",
    title: "PUNE",
    city: "Ranjangaon (Pune)",
    state: "Maharashtra",
    type: "Manufacturing Unit v5",
    corridor: "Pune Industrial & Auto Belt",
    address: "C-9 & C-10, Ranjangaon MIDC, Shirur, Pune, Maharashtra 412220",
    phone: "+91-120-2560586",
    plantId: "JPAN-PUNE-05",
    lat: 18.7845,
    lng: 74.2404,
    phi: -2.8665,
    theta: 0.3279,
    image: "/company_overview_precision.png",
    verifiedBadge: "OPERATIONS VERIFIED",
    tagline: "State-of-the-art precision plant powering auto & white-goods supply chains."
  },
  {
    id: "jigani",
    title: "BENGALURU",
    city: "Jigani (Bengaluru)",
    state: "Karnataka",
    type: "Manufacturing Unit v6",
    corridor: "Southern Electronics & Precision Corridor",
    address: "Jigani Hobli, Bommandahalli, Bengaluru, Karnataka 560106",
    phone: "+91-120-2560586",
    plantId: "JPAN-SOUTH-06",
    lat: 12.7845,
    lng: 77.6304,
    phi: -2.9257,
    theta: 0.2231,
    image: "/quality_precision.png",
    verifiedBadge: "PRECISION AUDITED",
    tagline: "Southern India flagship hub providing JIT delivery for precision aerospace & industrial applications."
  }
];

export function ContactMap() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const activeHub = hubLocations[activeIdx] || hubLocations[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted ? resolvedTheme === "dark" : false;

  const handleSelectHub = (index: number) => {
    setActiveIdx(index);
    setIsCardOpen(true);
  };

  return (
    <section className="relative w-full min-h-[95vh] lg:min-h-[110vh] xl:min-h-[115vh] bg-white dark:bg-[#070b14] overflow-hidden font-heading selection:bg-[#2E5E99] selection:text-white z-20 text-[#0D2440] dark:text-white transition-colors duration-500 py-12 lg:py-0 flex flex-col justify-center select-none">

      {/* Interactive 3D Dotted WebGL Globe (Restored Large Dimension with Slow Motion) */}
      <div className="relative lg:absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[-12vw] xl:left-[-8vw] top-auto lg:top-[50%] lg:-translate-y-[50%] w-[92vw] h-[92vw] sm:w-[620px] sm:h-[620px] lg:w-[115vh] lg:h-[115vh] xl:w-[122vh] xl:h-[122vh] max-w-[1100px] max-h-[1100px] z-10 opacity-90 lg:opacity-85 pointer-events-auto my-6 lg:my-0">
        <CobeInteractiveGlobe
          markers={hubLocations.map((h) => ({
            id: h.id,
            name: h.title,
            city: h.city,
            lat: h.lat,
            lng: h.lng,
            phi: h.phi,
            theta: h.theta
          }))}
          activeIndex={activeIdx}
          onSelectMarker={(idx) => handleSelectHub(idx)}
          accentColor={[46 / 255, 94 / 255, 153 / 255]}
          isDark={isDarkTheme}
        />
      </div>

      {/* Floating Tactical Detail Card */}
      <div className="relative lg:absolute left-1/2 -translate-x-1/2 lg:left-[43%] xl:left-[45%] lg:-translate-x-1/2 top-auto lg:top-1/2 lg:-translate-y-1/2 w-full max-w-[480px] sm:max-w-[500px] px-4 sm:px-0 z-[50] pointer-events-none my-6 lg:my-0">
        <AnimatePresence mode="wait">
          {isCardOpen && (
            <motion.div
              key={activeHub.id}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full min-h-[225px] sm:min-h-[210px]"
            >
              <div className="bg-white/95 dark:bg-[#0D2440]/95 rounded-3xl border border-[#7BA4D0]/35 backdrop-blur-xl p-5 sm:p-6 text-[#0D2440] dark:text-white transition-all">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black tracking-tight uppercase leading-tight text-[#0D2440] dark:text-white">
                      {activeHub.title}
                    </h4>
                    <div className="text-[11px] font-bold text-[#0D2440]/60 dark:text-white/60 mt-0.5 uppercase tracking-wider">
                      {activeHub.type} • {activeHub.state}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCardOpen(false)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E7F0FA] dark:bg-white/10 hover:bg-[#2E5E99] hover:text-white dark:hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer shrink-0 ml-2"
                    aria-label="Close hub details"
                  >
                    <X className="w-4 h-4 text-[#0D2440] dark:text-white" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-stretch">
                  <div className="w-full sm:w-[170px] lg:w-[185px] h-[135px] sm:h-[150px] rounded-2xl overflow-hidden shrink-0 border border-[#7BA4D0]/30 group relative bg-[#0D2440]">
                    <Image
                      src={activeHub.image}
                      alt={activeHub.city}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 185px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440]/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-0.5 w-full space-y-3">
                    <div className="space-y-2">
                      <p className="text-[#0D2440] dark:text-white text-xs sm:text-sm font-bold leading-snug tracking-tight">
                        &quot;{activeHub.tagline}&quot;
                      </p>
                      <p className="text-[11px] text-[#0D2440]/70 dark:text-white/70 font-normal leading-relaxed line-clamp-2">
                        {activeHub.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#7BA4D0]/20 pt-3 mt-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#2E5E99]" />
                        <span className="text-[10px] font-sans font-bold text-[#0D2440]/80 dark:text-white/80 uppercase tracking-wider">
                          ID: {activeHub.plantId}
                        </span>
                      </div>

                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(activeHub.title + " " + activeHub.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D2440] hover:bg-[#2E5E99] text-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer group/btn"
                        title="Open in Google Maps"
                      >
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Top Corner: Heading & Interactive City Names */}
      <div className="relative lg:absolute right-6 sm:right-10 lg:right-12 xl:right-16 top-6 sm:top-8 lg:top-10 xl:top-12 z-[40] flex flex-col items-start lg:items-end text-left lg:text-right select-none">
        {/* Right Top Corner Heading */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-heading font-black uppercase tracking-tight text-[#0D2440] dark:text-white leading-tight">
            Manufacturing <span className="text-[#2E5E99]">Hubs</span>
          </h2>
        </div>

        {/* City Names List in Screenshot 2 Typography */}
        <ul className="list-none p-0 m-0 flex flex-col items-start lg:items-end gap-2.5 sm:gap-3 lg:gap-3.5">
          {hubLocations.map((hub, idx) => {
            const isActive = activeIdx === idx;
            return (
              <li
                key={hub.id}
                onClick={() => handleSelectHub(idx)}
                className={cn(
                  "font-heading font-black italic uppercase tracking-tight cursor-pointer transition-all duration-300 select-none flex items-center gap-3",
                  "text-xl sm:text-2xl lg:text-[28px] xl:text-[34px] leading-none",
                  isActive
                    ? "text-[#2E5E99] lg:-translate-x-2 scale-[1.03]"
                    : "text-[#0D2440]/[0.18] dark:text-white/25 hover:text-[#2E5E99]/75"
                )}
              >
                <span>{hub.city}</span>
                {isActive && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E5E99] shrink-0 animate-pulse" />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom-Left Legend */}
      <div className="relative lg:absolute bottom-4 lg:bottom-7 left-6 lg:left-10 z-[40] text-[10px] sm:text-[11px] text-[#0D2440] dark:text-white flex flex-row lg:flex-col flex-wrap gap-4 lg:gap-2.5 font-bold uppercase tracking-[0.25em] px-6 lg:px-0 mt-8 lg:mt-0 select-none">
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E5E99] mr-2.5" />
          <span>Strategic Hub</span>
        </div>
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7BA4D0] mr-2.5 border border-[#2E5E99]/20" />
          <span>Precision Unit</span>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
