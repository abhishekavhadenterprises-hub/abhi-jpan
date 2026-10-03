"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Award } from "lucide-react";

export function QualityHero() {
  const [selectedCert, setSelectedCert] = useState("IATF 16949");

  return (
    <section className="relative h-[78vh] min-h-[530px] max-h-[800px] pt-24 pb-12 lg:pt-28 lg:pb-14 flex items-center overflow-hidden bg-[#071321]">
      {/* Immersive Crystal-Clear Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/quality-hero-cinematic.jpg"
          alt="J Pan Precision Quality Inspection & Metrology"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-100 contrast-100"
        />
        {/* Soft, crystal-clear gradient scrims ensuring flawless visibility and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      </div>

      <div className="container-custom relative z-10 text-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Display Headline matching reference, using J-Pan Color System */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-heading font-bold text-white tracking-tight leading-[1.08]">
                Better precision<br />
                <span className="text-[#7BA4D0]">Built with J-Pan.</span>
              </h1>
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed max-w-xl">
              IATF 16949 & ISO 9001:2015 accredited zero-defect metallurgical manufacturing for global automotive, HVAC, and industrial leaders.
            </p>

            {/* Call to Actions with J-Pan Royal Blue and Ice Blue accents */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#certifications"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#2E5E99] hover:bg-[#1E4370] text-white font-semibold text-sm sm:text-base rounded-full transition-all duration-300 hover:scale-[1.02]"
              >
                <span>View Certifications</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="#commitment"
                className="inline-flex items-center px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-sm sm:text-base rounded-full border border-[#7BA4D0]/30 backdrop-blur-md transition-all duration-300"
              >
                Quality Policy
              </Link>
            </div>
          </div>

          {/* Right Column: Fully Transparent Certified Company Showcase Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-transparent border border-white/25 rounded-[28px] p-6 sm:p-8 space-y-5">
              
              {/* Card Header: Certified Company */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7BA4D0]">
                    Official Accreditation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                    Certified Company
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#7BA4D0]">
                  <ShieldCheck className="w-5 h-5 text-[#7BA4D0]" />
                </div>
              </div>

              {/* Tag Badges Row: J-Pan Color System */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCert("IATF 16949")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCert === "IATF 16949"
                      ? "bg-[#2E5E99] border-[#7BA4D0] text-white"
                      : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7BA4D0]" />
                  <span>IATF 16949</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCert("ISO 9001:2015")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCert === "ISO 9001:2015"
                      ? "bg-[#2E5E99] border-[#7BA4D0] text-white"
                      : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7BA4D0]" />
                  <span>ISO 9001:2015</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCert("ISO 14001")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCert === "ISO 14001"
                      ? "bg-[#2E5E99] border-[#7BA4D0] text-white"
                      : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-[#7BA4D0]" />
                  <span>+ ZED Gold</span>
                </button>
              </div>

              {/* Verified Certificate Showcase Box - Fully Transparent */}
              <div className="relative rounded-2xl bg-white/[0.03] border border-white/15 p-5 min-h-[145px] flex flex-col justify-between group/box hover:border-white/30 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7BA4D0]">
                      J Pan Tubular Components Ltd.
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-sm text-white font-medium">
                    {selectedCert === "IATF 16949" && "IATF 16949:2016 — Automotive Quality Management"}
                    {selectedCert === "ISO 9001:2015" && "ISO 9001:2015 — Global Quality Management System"}
                    {selectedCert === "ISO 14001" && "MSME ZED Gold & ISO 14001 Sustainable Manufacturing"}
                  </p>
                  <p className="text-xs text-[#7BA4D0]/80 leading-relaxed font-normal">
                    Accredited by TUV SUD & NABCB. Full batch traceability & sub-micron CMM metrology compliance.
                  </p>
                </div>

                {/* Circular Action Button */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-2">
                  <span className="text-[11px] text-white/60 font-mono">DIN 8964 & RoHS / REACH</span>
                  <Link
                    href="#certifications"
                    aria-label="View certification details"
                    className="w-10 h-10 rounded-full bg-[#2E5E99] hover:bg-[#7BA4D0] hover:text-[#0D2440] text-white dark:text-white dark:hover:text-[#0D2440] flex items-center justify-center transition-all duration-300 group/btn cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
