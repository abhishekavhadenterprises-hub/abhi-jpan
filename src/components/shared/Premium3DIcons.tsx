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

import { Clay3DAnnualReportsComponent } from "./Clay3DAnnualReportsComponent";
import { Clay3DFinancialInfoComponent } from "./Clay3DFinancialInfoComponent";
import { Clay3DGrievanceComponent } from "./Clay3DGrievanceComponent";
import { Clay3DGovernanceComponent } from "./Clay3DGovernanceComponent";
import { Clay3DOtherInfoComponent } from "./Clay3DOtherInfoComponent";

/** 1. Annual Reports 3D Claymorphic Component */
export function Icon3DAnnualReport({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 75 : 95;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DAnnualReportsComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** 2. Financial Information / Results 3D Claymorphic Component */
export function Icon3DFinancialResults({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 75 : 95;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DFinancialInfoComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** 3. Investor Grievance 3D Claymorphic Component */
export function Icon3DGrievance({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 75 : 95;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DGrievanceComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** 4. Corporate Governance 3D Claymorphic Component */
export function Icon3DGovernance({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 75 : 95;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DGovernanceComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** 5. Other Information / Contracts 3D Claymorphic Component */
export function Icon3DOtherInfo({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 75 : 95;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DOtherInfoComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

import { Clay3DDocumentComponent } from "./Clay3DDocumentComponent";
import { Clay3DCalendarComponent } from "./Clay3DCalendarComponent";
import { Clay3DAssemblyComponent } from "./Clay3DAssemblyComponent";
import { Clay3DWaxSealComponent } from "./Clay3DWaxSealComponent";
import { Clay3DPresentationComponent } from "./Clay3DPresentationComponent";
import { Clay3DAudioComponent } from "./Clay3DAudioComponent";
import { Clay3DNewspaperComponent } from "./Clay3DNewspaperComponent";
import { Clay3DChartComponent } from "./Clay3DChartComponent";
import { Clay3DScalesComponent } from "./Clay3DScalesComponent";
import { Clay3DCreditScoreComponent } from "./Clay3DCreditScoreComponent";

/* =========================================================================
   SUB-OPTIONS 3D CLAY COMPONENTS
   ========================================================================= */

/** Document / Generic Statutory Filing 3D Clay Component */
export function Icon3DDocument({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DDocumentComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Call Audio Recording 3D Clay Component */
export function Icon3DAudio({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DAudioComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Presentation / Keynote 3D Clay Component */
export function Icon3DPresentation({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DPresentationComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Shareholding Donut Chart 3D Clay Component */
export function Icon3DChart({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DChartComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Statement of Deviations Scales 3D Clay Component */
export function Icon3DScales({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DScalesComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Board Meeting Calendar 3D Clay Component */
export function Icon3DCalendar({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DCalendarComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** General Meeting Assembly 3D Clay Component */
export function Icon3DAssembly({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DAssemblyComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Secretarial Compliance Wax Seal 3D Clay Component */
export function Icon3DWaxSeal({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DWaxSealComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Newspaper Publications 3D Clay Component */
export function Icon3DNewspaper({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DNewspaperComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Credit Rating Gauge 3D Clay Component */
export function Icon3DCreditScore({ isHovered, size = "sm" }: IconProps) {
  const pixelSize = size === "lg" ? 95 : size === "md" ? 85 : 75;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DCreditScoreComponent isHovered={isHovered} size={pixelSize} />
    </div>
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

import { Clay3DCopperComponent } from "./Clay3DCopperComponent";
import { Clay3DBrassComponent } from "./Clay3DBrassComponent";
import { Clay3DSteelComponent } from "./Clay3DSteelComponent";
import { Clay3DAllProductsComponent } from "./Clay3DAllProductsComponent";

/** All Products Catalog Claymorphic 3D Component */
export function Icon3DAllProducts({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DAllProductsComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Copper Components Claymorphic 3D Component */
export function Icon3DCopper({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DCopperComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Brass Components Claymorphic 3D Component */
export function Icon3DBrass({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DBrassComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Steel Components Claymorphic 3D Component */
export function Icon3DSteel({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DSteelComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/* =========================================================================
   MEDIA 3D CLAYMORPHIC COMPONENTS (GROUP 3)
   ========================================================================= */

import { Clay3DMediaPressComponent } from "./Clay3DMediaPressComponent";
import { Clay3DMediaEventsComponent } from "./Clay3DMediaEventsComponent";
import { Clay3DMediaBlogComponent } from "./Clay3DMediaBlogComponent";
import { Clay3DMediaGalleryComponent } from "./Clay3DMediaGalleryComponent";

/** Press Releases 3D Claymorphic Component */
export function Icon3DMediaPress({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DMediaPressComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Events & Exhibitions 3D Claymorphic Component */
export function Icon3DMediaEvents({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DMediaEventsComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Industrial Blog 3D Claymorphic Component */
export function Icon3DMediaBlog({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DMediaBlogComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

/** Media Gallery 3D Claymorphic Component */
export function Icon3DMediaGallery({ isHovered, size = "md" }: IconProps) {
  const pixelSize = size === "lg" ? 115 : size === "sm" ? 80 : 100;
  return (
    <div className="flex items-center justify-center -my-1">
      <Clay3DMediaGalleryComponent isHovered={isHovered} size={pixelSize} />
    </div>
  );
}

