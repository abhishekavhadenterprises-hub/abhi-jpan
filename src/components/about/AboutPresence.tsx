"use client";

import React, { useRef, useState, useEffect } from "react";
import { Building2, Factory, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface FacilityData {
  id: string;
  num: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  address: string;
  pills: string[];
  icon: React.ComponentType<{ className?: string }>;
  lightGradient: string;
  darkGradient: string;
  accentColor: string;
}

const facilities: FacilityData[] = [
  {
    id: "gn1",
    num: "01",
    phase: "PHASE 01 // NORTHERN CORRIDOR",
    title: "GREATER NOIDA 1",
    subtitle: "Corporate Headquarters & Advanced Robotic Cells",
    description: "Our flagship 4,170 Sq. M industrial campus housing high-speed automated CNC bending cells, advanced computerized toolrooms, and comprehensive metallurgical testing laboratories.",
    address: "Surajpur Site B Industrial Area, Greater Noida, UP 201306",
    pills: ["4,170 SQ. M", "CNC TOOLROOM", "AUTOMATED EXTRUSION", "CORPORATE HQ"],
    icon: Building2,
    lightGradient: "linear-gradient(135deg, #EBF3FA 0%, #DCE9F6 50%, #CADDF2 100%)",
    darkGradient: "linear-gradient(135deg, #0c223c 0%, #112e4f 50%, #173b64 100%)",
    accentColor: "#2E5E99",
  },
  {
    id: "gn2",
    num: "02",
    phase: "PHASE 02 // AUTOMOTIVE LOOP",
    title: "GREATER NOIDA 2",
    subtitle: "Automotive HVAC & Stainless Steel Precision Hub",
    description: "5,767 Sq. M solar-powered continuous manufacturing center dedicated to high-volume automotive HVAC lines, stainless steel manifolds, and robotic induction brazing cells.",
    address: "Block A, Industrial Area, Surajpur, Greater Noida, UP 201306",
    pills: ["5,767 SQ. M", "SOLAR POWERED", "STAINLESS STEEL", "AUTOMOTIVE HVAC"],
    icon: Factory,
    lightGradient: "linear-gradient(135deg, #E6F5ED 0%, #D8EFE2 50%, #C7E8D3 100%)",
    darkGradient: "linear-gradient(135deg, #09261a 0%, #0d3424 50%, #134731 100%)",
    accentColor: "#16A34A",
  },
  {
    id: "neemrana",
    num: "03",
    phase: "PHASE 03 // HVAC & VRV/VRF",
    title: "NEEMRANA",
    subtitle: "Commercial VRV & VRF Thermal Loop Lines",
    description: "4,024 Sq. M specialized facility focused on multi-circuit HVAC cooling assemblies, 100% mass spectrometer vacuum helium leak verification, and precision copper distribution headers.",
    address: "Plot No. E-16 Industrial Area, Kolila Joga, Neemrana, RJ 301020",
    pills: ["4,024 SQ. M", "VRV / VRF LOOPS", "HELIUM MASS-SPEC", "COPPER HEADERS"],
    icon: Factory,
    lightGradient: "linear-gradient(135deg, #F2EEFA 0%, #E7DEF5 50%, #D9CCED 100%)",
    darkGradient: "linear-gradient(135deg, #1b132a 0%, #251a3a 50%, #31234c 100%)",
    accentColor: "#7C3AED",
  },
  {
    id: "sanand",
    num: "04",
    phase: "PHASE 04 // WESTERN CORRIDOR",
    title: "SANAND",
    subtitle: "High-Volume Western Automotive Assembly Cluster",
    description: "Massive 9,982 Sq. M production complex positioned at the heart of Gujarat's automotive hub, supplying precision copper loops and Tier-1 automotive assemblies with zero-delay logistics.",
    address: "SANAND Industrial Estate, Ahmedabad, Gujarat 382170",
    pills: ["9,982 SQ. M", "TIER-1 OEM CLUSTER", "HIGH-VOLUME COPPER", "WESTERN HUB"],
    icon: Building2,
    lightGradient: "linear-gradient(135deg, #FFF4EB 0%, #FEE8D6 50%, #FDD9BF 100%)",
    darkGradient: "linear-gradient(135deg, #2c1a0a 0%, #3a220d 50%, #4b2d11 100%)",
    accentColor: "#EA580C",
  },
  {
    id: "pune",
    num: "05",
    phase: "PHASE 05 // MOBILITY FLUIDS",
    title: "PUNE",
    subtitle: "Mobility & High-Pressure Industrial Fluid Loops",
    description: "5,500 Sq. M facility serving Maharashtra's automotive and heavy commercial corridor with multi-axis robotic cold bending, hydro-burst testing, and precision fluid routing assemblies.",
    address: "Ranjangaon MIDC, Shirur, Pune, Maharashtra 412220",
    pills: ["5,500 SQ. M", "ROBOTIC BENDING", "FLUID LOOPS", "HYDRO-TESTED"],
    icon: Factory,
    lightGradient: "linear-gradient(135deg, #EBF8FA 0%, #DCF1F5 50%, #C8EAEE 100%)",
    darkGradient: "linear-gradient(135deg, #092329 0%, #0d3039 50%, #12404c 100%)",
    accentColor: "#0891B2",
  },
  {
    id: "bengaluru",
    num: "06",
    phase: "PHASE 06 // SOUTHERN CORRIDOR & EOU",
    title: "BENGALURU",
    subtitle: "100% EOU Export & Hyperscale Data Center Cooling",
    description: "3,047 Sq. M high-precision facility producing liquid cooling manifolds, engineered busbars, and export-grade thermal assemblies for global data center and HVAC OEMs.",
    address: "Jigani Industrial Area, Bengaluru, Karnataka 560106",
    pills: ["3,047 SQ. M", "100% EOU EXPORT", "DATA CENTER COOLING", "BUSBAR ASSEMBLY"],
    icon: Building2,
    lightGradient: "linear-gradient(135deg, #EFF4F9 0%, #E2EBF4 50%, #D0DFEE 100%)",
    darkGradient: "linear-gradient(135deg, #101e2e 0%, #16283d 50%, #1e3652 100%)",
    accentColor: "#2563EB",
  },
];

function StackingFacilityCard({
  facility,
  index,
  isLast,
}: {
  facility: FacilityData;
  index: number;
  isLast: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse 3D tilt & flashlight effect matching reference site
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const IconComponent = facility.icon;

  return (
    <div
      className="sticky-card sticky top-[10vh] sm:top-[12vh] h-[72vh] min-h-[500px] max-h-[700px] [perspective:1200px] mb-[28vh] sm:mb-[36vh]"
      style={{ zIndex: index + 1 }}
    >
      <div className="card-scroll-wrap w-full h-full origin-top transition-transform duration-150 ease-out will-change-transform">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          className="card-inner relative w-full h-full rounded-[36px] sm:rounded-[48px] overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 border border-[#0F172A]/10 dark:border-white/10 transition-all duration-700 ease-out [background:var(--card-grad-light)] dark:[background:var(--card-grad-dark)]"
          style={{
            transformStyle: "preserve-3d",
            ["--card-grad-light" as string]: facility.lightGradient,
            ["--card-grad-dark" as string]: facility.darkGradient,
          }}
        >
        {/* Top Edge Specular Highlight Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/60 dark:bg-white/20" />

        {/* Subtle Radial Glow Mesh */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30"
          style={{
            background: `radial-gradient(circle at 75% 30%, ${facility.accentColor} 0%, transparent 60%)`,
          }}
        />

        {/* Dot Grid Background Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Interactive Mouse Flashlight Spotlight */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[36px] sm:rounded-[48px] opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.4), transparent 45%)`,
            }}
          />
        )}

        {/* Giant Rotated Background Watermark Icon */}
        <div
          className="pointer-events-none absolute -right-6 -bottom-6 opacity-10 dark:opacity-[0.07] rotate-[-12deg] scale-[1.5] transition-transform duration-700 select-none text-[#0F172A] dark:text-white"
          aria-hidden="true"
        >
          <IconComponent className="w-80 h-80 sm:w-96 sm:h-96" />
        </div>

        {/* Main Content (Reference Typography Hierarchy) */}
        <div className="relative z-10 max-w-3xl pointer-events-none">
          {/* Huge Bold Title */}
          <h3 className="text-[clamp(2.5rem,6.5vw,5rem)] font-black text-[#0F172A] dark:text-white leading-[0.9] tracking-[-0.04em] uppercase mb-4 font-heading">
            {facility.title}
          </h3>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#0F172A] dark:text-white/95 font-bold tracking-tight mb-3 sm:mb-4">
            {facility.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#0F172A]/70 dark:text-white/70 font-medium leading-relaxed max-w-2xl mb-6 sm:mb-8">
            {facility.description}
          </p>
        </div>

        {/* Interactive Pills & Bottom Shelf */}
        <div className="relative z-10 pt-4 border-t border-[#0F172A]/10 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tags / Pills matching reference site buttons */}
          <div className="flex gap-2.5 sm:gap-3 flex-wrap pointer-events-auto">
            {facility.pills.map((pill, pIdx) => (
              <button
                key={pIdx}
                type="button"
                className="px-4 sm:px-6 py-2 sm:py-2.5 border border-[#0F172A]/15 dark:border-white/15 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] uppercase tracking-[1.5px] font-black text-[#0F172A] dark:text-white bg-white/50 dark:bg-white/10 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#0D2440] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                <span>{pill}</span>
              </button>
            ))}
          </div>

          {/* Location & Navigation Link */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="text-xs font-sans font-medium text-[#0F172A]/60 dark:text-white/60 hidden sm:inline-block">
              {facility.address.split(",")[0]}
            </span>
            <Link
              href="/presence"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] dark:bg-white text-white dark:text-[#0D2440] text-xs font-heading font-bold hover:scale-105 transition-all duration-300"
            >
              <span>Explore Hub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPresence() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact reference site scroll stacking effect:
  // As incoming card approaches, previous card scales down (1 -> 0.95) and darkens slightly (brightness 1 -> 0.78).
  // Works reliably in both downward and upward scroll directions.
  useEffect(() => {
    const handleScroll = () => {
      const cards = containerRef.current?.querySelectorAll<HTMLElement>(".sticky-card");
      if (!cards) return;

      const stickyTop = window.innerHeight * 0.12;

      cards.forEach((card, index) => {
        const wrap = card.querySelector<HTMLElement>(".card-scroll-wrap");
        if (!wrap) return;

        const nextCard = cards[index + 1];
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const distance = window.innerHeight - stickyTop;
          const current = window.innerHeight - nextRect.top;
          const progress = Math.max(0, Math.min(1, current / distance));
          const scale = 1 - progress * 0.05;
          const brightness = 1 - progress * 0.22;
          wrap.style.transform = `scale(${scale})`;
          wrap.style.filter = `brightness(${brightness})`;
        } else {
          wrap.style.transform = "scale(1)";
          wrap.style.filter = "brightness(1)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about-presence"
      className="relative py-20 md:py-32 bg-slate-50/50 dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10"
    >
      <div className="container-custom relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white mb-4">
            Strategically situated near <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
              key OEM industrial corridors.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#0D2440]/80 dark:text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
            Spanning over 32,000 sq. meters across 6 specialized manufacturing campuses in Northern, Western, and Southern corridors, delivering high-volume supply continuity.
          </p>
        </div>

        {/* Stacking Cards Container (Matching Reference Architecture) */}
        <div ref={containerRef} className="pb-[12vh] sm:pb-[16vh]">
          {facilities.map((facility, index) => (
            <StackingFacilityCard
              key={facility.id}
              facility={facility}
              index={index}
              isLast={index === facilities.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
