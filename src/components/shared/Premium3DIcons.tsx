"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Landmark,
  FolderArchive,
  Mic,
  Presentation,
  PieChart,
  Scale,
  Calendar,
  Users,
  Award,
  Newspaper,
  TrendingUp,
  Boxes,
  Layers,
  Hexagon,
  Megaphone,
  CalendarDays,
  PenTool,
  Image as GalleryImage,
  Flame,
} from "lucide-react";

interface IconProps {
  className?: string;
  isHovered?: boolean;
  size?: "sm" | "md" | "lg";
}

type ColorVariant = "blue" | "copper" | "brass" | "steel" | "emerald" | "purple";

interface SquircleBadgeProps {
  children: React.ReactNode;
  className?: string;
  isHovered?: boolean;
  variant?: ColorVariant;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<ColorVariant, { base: string; hovered: string; icon: string }> = {
  // Brand Precision Blue (J-Pan corporate identity: #2E5E99 / #0D2440 / #7BA4D0)
  blue: {
    base: "bg-[#2E5E99]/[0.08] dark:bg-[#2E5E99]/20 border-[#2E5E99]/25 dark:border-[#7BA4D0]/35 text-[#2E5E99] dark:text-[#7BA4D0]",
    hovered: "bg-[#2E5E99]/[0.16] dark:bg-[#2E5E99]/35 border-[#2E5E99]/50 dark:border-[#7BA4D0]/60 shadow-[0_8px_20px_rgba(46,94,153,0.18)] text-[#0D2440] dark:text-white",
    icon: "text-[#2E5E99] dark:text-[#7BA4D0]",
  },
  // Copper Components Tint
  copper: {
    base: "bg-amber-600/[0.08] dark:bg-amber-500/20 border-amber-600/25 dark:border-amber-400/35 text-amber-600 dark:text-amber-400",
    hovered: "bg-amber-600/[0.16] dark:bg-amber-500/35 border-amber-600/50 dark:border-amber-400/60 shadow-[0_8px_20px_rgba(217,119,6,0.18)] text-amber-700 dark:text-amber-200",
    icon: "text-amber-600 dark:text-amber-400",
  },
  // Brass Components Tint
  brass: {
    base: "bg-yellow-600/[0.08] dark:bg-yellow-500/20 border-yellow-600/25 dark:border-yellow-400/35 text-yellow-600 dark:text-yellow-400",
    hovered: "bg-yellow-600/[0.16] dark:bg-yellow-500/35 border-yellow-600/50 dark:border-yellow-400/60 shadow-[0_8px_20px_rgba(202,138,4,0.18)] text-yellow-700 dark:text-yellow-200",
    icon: "text-yellow-600 dark:text-yellow-400",
  },
  // Steel Components Tint
  steel: {
    base: "bg-slate-600/[0.08] dark:bg-slate-400/20 border-slate-600/25 dark:border-slate-400/35 text-slate-700 dark:text-slate-300",
    hovered: "bg-slate-600/[0.16] dark:bg-slate-400/35 border-slate-600/50 dark:border-slate-400/60 shadow-[0_8px_20px_rgba(100,116,139,0.18)] text-slate-900 dark:text-white",
    icon: "text-slate-700 dark:text-slate-300",
  },
  // Emerald Tint (Grievance & ESG)
  emerald: {
    base: "bg-teal-600/[0.08] dark:bg-teal-500/20 border-teal-600/25 dark:border-teal-400/35 text-teal-600 dark:text-teal-400",
    hovered: "bg-teal-600/[0.16] dark:bg-teal-500/35 border-teal-600/50 dark:border-teal-400/60 shadow-[0_8px_20px_rgba(13,148,136,0.18)] text-teal-700 dark:text-teal-200",
    icon: "text-teal-600 dark:text-teal-400",
  },
  // Purple Tint (Media & Events)
  purple: {
    base: "bg-indigo-600/[0.08] dark:bg-indigo-500/20 border-indigo-600/25 dark:border-indigo-400/35 text-indigo-600 dark:text-indigo-400",
    hovered: "bg-indigo-600/[0.16] dark:bg-indigo-500/35 border-indigo-600/50 dark:border-indigo-400/60 shadow-[0_8px_20px_rgba(79,70,229,0.18)] text-indigo-700 dark:text-indigo-200",
    icon: "text-indigo-600 dark:text-indigo-400",
  },
};

/**
 * Squircle Icon Badge
 * Exactly matching user reference image:
 * Soft rounded squircle plate with subtle tinted wash and clean monoline stroke icon.
 */
export function SquircleIconBadge({
  children,
  className,
  isHovered,
  variant = "blue",
  size = "md",
}: SquircleBadgeProps) {
  const styles = variantStyles[variant];

  const sizeClasses = {
    sm: "w-10 h-10 rounded-[14px]",
    md: "w-12 h-12 sm:w-13 sm:h-13 rounded-[18px]",
    lg: "w-14 h-14 rounded-2xl",
  }[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center border transition-all duration-300 transform-gpu select-none",
        sizeClasses,
        isHovered ? cn(styles.hovered, "scale-105 -translate-y-0.5") : styles.base,
        className
      )}
    >
      {/* Specular Ambient Glow on Hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] transition-opacity duration-300 pointer-events-none blur-sm",
          isHovered ? "opacity-60 bg-radial from-current/25 to-transparent" : "opacity-0"
        )}
      />
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Backward-compatibility container alias
export const GlassIconContainer = SquircleIconBadge;

/* =========================================================================
   PRIMARY INVESTOR PILLARS (SQUIRCLE LINE-ART BADGES)
   ========================================================================= */

/** 1. Annual Reports Squircle Badge */
export function Icon3DAnnualReport({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] transition-transform duration-300 group-hover/box:scale-110" />
    </SquircleIconBadge>
  );
}

/** 2. Financial Information / Results Squircle Badge */
export function Icon3DFinancialResults({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] transition-transform duration-300 group-hover/box:scale-110" />
    </SquircleIconBadge>
  );
}

/** 3. Investor Grievance Squircle Badge */
export function Icon3DGrievance({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] transition-transform duration-300 group-hover/box:scale-110" />
    </SquircleIconBadge>
  );
}

/** 4. Corporate Governance Squircle Badge */
export function Icon3DGovernance({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <Landmark className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] transition-transform duration-300 group-hover/box:scale-110" />
    </SquircleIconBadge>
  );
}

/** 5. Other Information / Contracts Squircle Badge */
export function Icon3DOtherInfo({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <FolderArchive className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] transition-transform duration-300 group-hover/box:scale-110" />
    </SquircleIconBadge>
  );
}

/* =========================================================================
   SUB-OPTIONS SQUIRCLE LINE-ART BADGES
   ========================================================================= */

/** Document / Generic Filing Squircle Badge */
export function Icon3DDocument({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <FileText className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Audio Recording Squircle Badge */
export function Icon3DAudio({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <Mic className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Presentation / Keynote Squircle Badge */
export function Icon3DPresentation({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <Presentation className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Shareholding Chart Squircle Badge */
export function Icon3DChart({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <PieChart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Statement of Deviations Scales Squircle Badge */
export function Icon3DScales({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <Scale className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Board Meeting Calendar Squircle Badge */
export function Icon3DCalendar({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** General Meeting Assembly Squircle Badge */
export function Icon3DAssembly({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <Users className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Secretarial Compliance Wax Seal Squircle Badge */
export function Icon3DWaxSeal({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <Award className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Newspaper Publications Squircle Badge */
export function Icon3DNewspaper({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Credit Rating Squircle Badge */
export function Icon3DCreditScore({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="sm">
      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

// Aliases for compatibility
export const Icon3DGenericDoc = Icon3DDocument;
export const Icon3DGenericAudio = Icon3DAudio;
export const Icon3DGenericPresentation = Icon3DPresentation;
export const Icon3DGenericChart = Icon3DChart;
export const Icon3DGenericScales = Icon3DScales;

/* =========================================================================
   PRODUCTS SQUIRCLE LINE-ART BADGES (ALL UNIFORMLY J-PAN BLUE)
   ========================================================================= */

/** All Products Catalog Squircle Badge */
export function Icon3DAllProducts({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <Boxes className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Copper Components Squircle Badge */
export function Icon3DCopper({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <Flame className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Brass Components Squircle Badge */
export function Icon3DBrass({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <Hexagon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Steel Components Squircle Badge */
export function Icon3DSteel({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <Layers className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/* =========================================================================
   MEDIA SQUIRCLE LINE-ART BADGES (ALL UNIFORMLY J-PAN BLUE)
   ========================================================================= */

/** Press Releases Squircle Badge */
export function Icon3DMediaPress({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Events & Exhibitions Squircle Badge */
export function Icon3DMediaEvents({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Industrial Blog Squircle Badge */
export function Icon3DMediaBlog({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <PenTool className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}

/** Media Gallery Squircle Badge */
export function Icon3DMediaGallery({ isHovered }: IconProps) {
  return (
    <SquircleIconBadge isHovered={isHovered} variant="blue" size="md">
      <GalleryImage className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
    </SquircleIconBadge>
  );
}
