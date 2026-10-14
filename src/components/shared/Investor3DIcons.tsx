"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Icon3DProps {
  className?: string;
  isHovered?: boolean;
}

/**
 * 3D Bar Stack Icon (Financial Results)
 * Features isometric financial bars with metallic gradient fill and luminous cap highlights.
 */
export function Icon3DFinancialResults({ className, isHovered }: Icon3DProps) {
  return (
    <div
      className={cn(
        "relative w-11 h-11 flex items-center justify-center transition-all duration-500",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
          isHovered
            ? "bg-[#2E5E99]/30 blur-md scale-125"
            : "bg-[#2E5E99]/5 blur-xs scale-90"
        )}
      />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "w-10 h-10 transition-transform duration-500 transform-gpu",
          isHovered ? "scale-110 -rotate-2" : "scale-100"
        )}
      >
        <defs>
          <linearGradient id="barGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7BA4D0" />
            <stop offset="100%" stopColor="#2E5E99" />
          </linearGradient>
          <linearGradient id="barGlow2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#0D2440" />
          </linearGradient>
          <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        {/* 3D Base Plate */}
        <polygon
          points="22,38 38,30 22,22 6,30"
          fill="#0D2440"
          fillOpacity={isHovered ? "0.3" : "0.15"}
        />

        {/* Bar 1 (Left - Lowest) */}
        <path d="M10,28 L15,25.5 L15,33 L10,35.5 Z" fill="#2E5E99" fillOpacity="0.85" />
        <path d="M15,25.5 L20,28 L20,35.5 L15,33 Z" fill="#1E3A8A" />
        <polygon points="10,28 15,25.5 20,28 15,30.5" fill="url(#goldCap)" />

        {/* Bar 2 (Center - Mid) */}
        <path d="M18,20 L23,17.5 L23,31 L18,33.5 Z" fill="url(#barGlow1)" />
        <path d="M23,17.5 L28,20 L28,33.5 L23,31 Z" fill="#0D2440" />
        <polygon points="18,20 23,17.5 28,20 23,22.5" fill="url(#goldCap)" />

        {/* Bar 3 (Right - Highest with vibrant glow) */}
        <path d="M26,11 L31,8.5 L31,28 L26,30.5 Z" fill="url(#barGlow2)" />
        <path d="M31,8.5 L36,11 L36,30.5 L31,28 Z" fill="#1E40AF" />
        <polygon points="26,11 31,8.5 36,11 31,13.5" fill="#BFDBFE" />

        {/* Micro Sparkle / Specular highlight */}
        {isHovered && (
          <circle cx="31" cy="9" r="2.5" fill="#FFFFFF" className="animate-ping" />
        )}
      </svg>
    </div>
  );
}

/**
 * 3D Broadcast Beacon (Investor Meet Intimation)
 */
export function Icon3DInvestorMeet({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#3B82F6]/30 blur-md scale-125" : "bg-[#3B82F6]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        <defs>
          <radialGradient id="beaconCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="70%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0D2440" />
          </radialGradient>
        </defs>

        {/* Concentric Signal Rings */}
        <path
          d="M7,14 C15,6 29,6 37,14"
          stroke="#7BA4D0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity={isHovered ? "1" : "0.4"}
          className={cn(isHovered && "animate-pulse")}
        />
        <path
          d="M12,19 C18,13 26,13 32,19"
          stroke="#2E5E99"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity={isHovered ? "1" : "0.6"}
        />

        {/* 3D Transmitter Core Sphere */}
        <circle cx="22" cy="24" r="5" fill="url(#beaconCore)" />
        <circle cx="20.5" cy="22.5" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />

        {/* 3D Tripod Stand Base */}
        <path d="M22,29 L22,38 M22,34 L15,38 M22,34 L29,38" stroke="#0D2440" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * 3D Keynote Deck (Investor Presentation)
 */
export function Icon3DPresentation({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#2E5E99]/30 blur-md scale-125" : "bg-[#2E5E99]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 rotate-3" : "scale-100")}
      >
        <defs>
          <linearGradient id="deckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2EFFC" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
        </defs>

        {/* Bottom Shadow Page */}
        <polygon points="12,15 36,11 32,33 8,37" fill="#0D2440" fillOpacity="0.2" />

        {/* Middle Page */}
        <polygon points="10,13 34,9 30,31 6,35" fill="#CBD5E1" />

        {/* Top 3D Glossy Slide */}
        <polygon points="8,11 32,7 28,29 4,33" fill="url(#deckGrad)" stroke="#7BA4D0" strokeWidth="1" />

        {/* Slide Content Lines */}
        <line x1="10" y1="16" x2="24" y2="13.5" stroke="#2E5E99" strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="21" x2="21" y2="19" stroke="#7BA4D0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="26" x2="16" y2="24.5" stroke="#7BA4D0" strokeWidth="1.5" strokeLinecap="round" />

        {/* Micro Play Badge */}
        <circle cx="24" cy="22" r="4" fill="#0D2440" />
        <polygon points="23,20.5 26,22 23,23.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/**
 * 3D Megaphone Acoustic Wave (Press Releases)
 */
export function Icon3DPressRelease({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#38BDF8]/30 blur-md scale-125" : "bg-[#38BDF8]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 -rotate-3" : "scale-100")}
      >
        <defs>
          <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0D2440" />
          </linearGradient>
        </defs>

        {/* 3D Speaker Horn Body */}
        <path d="M12,18 L24,12 L24,30 L12,24 Z" fill="url(#hornGrad)" />
        <ellipse cx="24" cy="21" rx="2.5" ry="9" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
        <rect x="7" y="19" width="5" height="4" rx="1" fill="#0D2440" />
        <path d="M14,24 L16,33 L19,32 L17,24 Z" fill="#0D2440" />

        {/* Acoustic Waves radiating outward */}
        <path
          d="M29,15 C33,18 33,24 29,27"
          stroke="#0284C7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity={isHovered ? "1" : "0.5"}
        />
        <path
          d="M34,11 C40,16 40,26 34,31"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity={isHovered ? "1" : "0.3"}
        />
      </svg>
    </div>
  );
}

/**
 * 3D High-Fidelity Acoustic Pod (Call Audio Recordings)
 */
export function Icon3DAudioRecordings({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#6366F1]/30 blur-md scale-125" : "bg-[#6366F1]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        <defs>
          <linearGradient id="micHead" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0E7FF" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
        </defs>

        {/* Studio Microphone Capsule */}
        <rect x="17" y="9" width="10" height="18" rx="5" fill="url(#micHead)" />
        <line x1="17" y1="16" x2="27" y2="16" stroke="#4338CA" strokeWidth="1" />
        <line x1="17" y1="20" x2="27" y2="20" stroke="#4338CA" strokeWidth="1" />

        {/* 3D Metallic Cradle */}
        <path d="M12,18 C12,27 32,27 32,18" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="27" x2="22" y2="36" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="22" cy="36" rx="8" ry="3" fill="#1E1B4B" />

        {/* Glowing Equalizer bars */}
        {isHovered && (
          <g>
            <rect x="6" y="18" width="2" height="6" rx="1" fill="#818CF8" />
            <rect x="36" y="16" width="2" height="10" rx="1" fill="#818CF8" />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * 3D Notarized Document (Call Transcripts)
 */
export function Icon3DCallTranscripts({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#0EA5E9]/30 blur-md scale-125" : "bg-[#0EA5E9]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 -rotate-2" : "scale-100")}
      >
        <defs>
          <linearGradient id="transcriptSheet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>

        {/* 3D Folded Document */}
        <polygon points="10,7 28,7 34,13 34,37 10,37" fill="url(#transcriptSheet)" stroke="#0284C7" strokeWidth="1.5" />
        <polygon points="28,7 34,13 28,13" fill="#0284C7" />

        {/* Document Line Rules */}
        <line x1="15" y1="18" x2="29" y2="18" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="23" x2="29" y2="23" stroke="#7BA4D0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="15" y1="28" x2="25" y2="28" stroke="#7BA4D0" strokeWidth="1.5" strokeLinecap="round" />

        {/* Seal Stamp */}
        <circle cx="28" cy="32" r="3.5" fill="#0284C7" />
        <circle cx="28" cy="32" r="2" fill="#E0F2FE" />
      </svg>
    </div>
  );
}

/**
 * 3D Gazette Folio (Newspaper Publication)
 */
export function Icon3DNewspaper({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#64748B]/30 blur-md scale-125" : "bg-[#64748B]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        <rect x="8" y="10" width="28" height="24" rx="2" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
        <rect x="12" y="14" width="10" height="8" rx="1" fill="#0D2440" />
        <line x1="25" y1="15" x2="32" y2="15" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="18" x2="32" y2="18" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="21" x2="30" y2="21" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="26" x2="32" y2="26" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="29" x2="28" y2="29" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * 3D Pie Segments (Shareholding Pattern)
 */
export function Icon3DShareholding({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#3B82F6]/30 blur-md scale-125" : "bg-[#3B82F6]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 rotate-6" : "scale-100")}
      >
        {/* Isometric 3D Pie Disc */}
        <ellipse cx="22" cy="25" rx="14" ry="7" fill="#0D2440" />
        {/* Major Sector (Promoter 60%) */}
        <path d="M22,23 L36,23 A14,7 0 0,0 12,20 Z" fill="#2E5E99" />
        {/* Displaced Slices (Public 40%) */}
        <path d="M22,21 L12,18 A14,7 0 0,1 28,15 Z" fill="#60A5FA" className={cn(isHovered && "translate-y-[-2px]")} />
        {/* Central Core */}
        <circle cx="22" cy="20" r="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/**
 * 3D Safety Vault (Unclaimed & Unpaid Amounts)
 */
export function Icon3DUnclaimed({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#10B981]/30 blur-md scale-125" : "bg-[#10B981]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        {/* 3D Vault Box Body */}
        <rect x="9" y="10" width="26" height="24" rx="4" fill="#065F46" />
        <rect x="11" y="12" width="22" height="20" rx="3" fill="#10B981" />
        <circle cx="22" cy="22" r="6" fill="#064E3B" stroke="#A7F3D0" strokeWidth="1.5" />
        {/* Dial Teeth */}
        <circle cx="22" cy="22" r="2.5" fill="#FFFFFF" />
        <line x1="22" y1="16" x2="22" y2="18" stroke="#A7F3D0" strokeWidth="1.5" />
        <line x1="22" y1="26" x2="22" y2="28" stroke="#A7F3D0" strokeWidth="1.5" />
        <line x1="16" y1="22" x2="18" y2="22" stroke="#A7F3D0" strokeWidth="1.5" />
        <line x1="26" y1="22" x2="28" y2="22" stroke="#A7F3D0" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/**
 * 3D Balance Scales (Statement of Deviations)
 */
export function Icon3DDeviations({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#F59E0B]/30 blur-md scale-125" : "bg-[#F59E0B]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        {/* Fulcrum Pillar */}
        <line x1="22" y1="10" x2="22" y2="34" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="22" cy="34" rx="7" ry="2.5" fill="#78350F" />
        {/* Horizontal Beam */}
        <line x1="10" y1="14" x2="34" y2="14" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left Scale */}
        <path d="M12,14 L9,22 M12,14 L15,22" stroke="#B45309" strokeWidth="1" />
        <path d="M7,22 C7,26 17,26 17,22 Z" fill="#FBBF24" />
        {/* Right Scale */}
        <path d="M32,14 L29,22 M32,14 L35,22" stroke="#B45309" strokeWidth="1" />
        <path d="M27,22 C27,26 37,26 37,22 Z" fill="#FBBF24" />
      </svg>
    </div>
  );
}

/**
 * 3D Hardbound Fiscal Volume (Annual Reports)
 */
export function Icon3DAnnualReport({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#2563EB]/30 blur-md scale-125" : "bg-[#2563EB]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 -rotate-3" : "scale-100")}
      >
        {/* 3D Book Spine & Pages */}
        <path d="M12,8 L28,8 C31,8 33,10 33,13 L33,35 C33,32 31,30 28,30 L12,30 Z" fill="#1D4ED8" />
        <path d="M10,8 C11,8 12,9 12,11 L12,33 C12,31 11,30 10,30 L8,30 L8,8 Z" fill="#1E3A8A" />
        {/* Pages Edge */}
        <path d="M12,30 L28,30 L32,34 L12,34 Z" fill="#DBEAFE" />
        {/* Gold Seal Emblem */}
        <circle cx="21" cy="18" r="4" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
        <line x1="16" y1="24" x2="26" y2="24" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * 3D Statutory Registry Cylinder (Annual Return MGT-7)
 */
export function Icon3DAnnualReturn({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#38BDF8]/30 blur-md scale-125" : "bg-[#38BDF8]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        {/* 3D Cylinder Stack */}
        <ellipse cx="22" cy="12" rx="12" ry="5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.5" />
        <path d="M10,12 L10,22 A12,5 0 0,0 34,22 L34,12 Z" fill="#0284C7" />
        <ellipse cx="22" cy="22" rx="12" ry="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        <path d="M10,22 L10,32 A12,5 0 0,0 34,32 L34,22 Z" fill="#0369A1" />
        <ellipse cx="22" cy="32" rx="12" ry="5" fill="#0284C7" />
      </svg>
    </div>
  );
}

/**
 * 3D Executive Plaque (Notice of Board Meeting)
 */
export function Icon3DBoardMeeting({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#F97316]/30 blur-md scale-125" : "bg-[#F97316]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 rotate-3" : "scale-100")}
      >
        <rect x="9" y="10" width="26" height="24" rx="3" fill="#EA580C" />
        <rect x="9" y="10" width="26" height="7" fill="#9A3412" rx="2" />
        <circle cx="16" cy="8" r="1.5" fill="#FED7AA" />
        <circle cx="28" cy="8" r="1.5" fill="#FED7AA" />
        {/* Calendar Grid Date */}
        <rect x="14" y="21" width="16" height="9" rx="1.5" fill="#FFFFFF" />
        <text x="22" y="28" fill="#C2410C" fontSize="7" fontWeight="bold" textAnchor="middle">15</text>
      </svg>
    </div>
  );
}

/**
 * 3D Shareholder Assembly (General Meeting Notices)
 */
export function Icon3DGeneralMeeting({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#8B5CF6]/30 blur-md scale-125" : "bg-[#8B5CF6]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        {/* 3D Tiered Assembly Rows */}
        <ellipse cx="22" cy="28" rx="14" ry="5" fill="#4C1D95" />
        <ellipse cx="22" cy="24" rx="11" ry="4" fill="#6D28D9" />
        <ellipse cx="22" cy="20" rx="8" ry="3" fill="#8B5CF6" />
        {/* Center Podium Speaker */}
        <circle cx="22" cy="12" r="3" fill="#C4B5FD" />
        <path d="M19,19 L25,19 L23,15 L21,15 Z" fill="#DDD6FE" />
      </svg>
    </div>
  );
}

/**
 * 3D Certified Wax Seal (Secretarial Compliance Report)
 */
export function Icon3DSecretarial({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#E11D48]/30 blur-md scale-125" : "bg-[#E11D48]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 rotate-6" : "scale-100")}
      >
        {/* 3D Wax Seal Body */}
        <path d="M22,7 L26,9 L30,8 L32,12 L36,13 L36,17 L39,20 L37,24 L39,28 L36,31 L34,35 L30,34 L26,37 L22,35 L18,37 L14,34 L10,35 L8,31 L5,28 L7,24 L5,20 L8,17 L8,13 L12,12 L14,8 L18,9 Z" fill="#BE123C" />
        <circle cx="22" cy="22" r="10" fill="#E11D48" stroke="#FDA4AF" strokeWidth="1.5" />
        {/* Crest Stamp Checkmark */}
        <path d="M17,22 L20,25 L27,18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Ribbon Ends */}
        <polygon points="18,32 15,40 21,37" fill="#9F1239" />
        <polygon points="26,32 29,40 23,37" fill="#9F1239" />
      </svg>
    </div>
  );
}

/**
 * 3D Code of Conduct Shield (Policies)
 */
export function Icon3DPolicies({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#2563EB]/30 blur-md scale-125" : "bg-[#2563EB]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        <path d="M22,7 L34,11 L34,22 C34,29 22,36 22,36 C22,36 10,29 10,22 L10,11 Z" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5" />
        <path d="M22,10 L31,13 L31,22 C31,27 22,33 22,33 Z" fill="#3B82F6" />
        <path d="M17,21 L20,24 L27,17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/**
 * 3D Regulatory Compliance Gateway (SEBI LODR Disclosures)
 */
export function Icon3DSEBI({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#0284C7]/30 blur-md scale-125" : "bg-[#0284C7]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        {/* Classical Pediment */}
        <polygon points="22,9 35,16 9,16" fill="#0369A1" stroke="#BAE6FD" strokeWidth="1" />
        {/* Pillars */}
        <rect x="12" y="17" width="4" height="15" fill="#0284C7" />
        <rect x="20" y="17" width="4" height="15" fill="#38BDF8" />
        <rect x="28" y="17" width="4" height="15" fill="#0284C7" />
        {/* Plinth Base */}
        <rect x="8" y="32" width="28" height="4" rx="1" fill="#0C4A6E" />
      </svg>
    </div>
  );
}

/**
 * 3D SCORES Escutcheon (Investor Grievance Redressal)
 */
export function Icon3DGrievance({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#14B8A6]/30 blur-md scale-125" : "bg-[#14B8A6]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        <path d="M22,8 L35,13 L35,24 C35,31 22,37 22,37 C22,37 9,31 9,24 L9,13 Z" fill="#0F766E" />
        <circle cx="22" cy="21" r="6" fill="#14B8A6" />
        <path d="M19,21 L21,23 L25,19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/**
 * 3D Telephone & Headset Station (Investor Contact Desk)
 */
export function Icon3DContactDesk({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#0D9488]/30 blur-md scale-125" : "bg-[#0D9488]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        <path d="M12,24 C12,16 32,16 32,24" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" />
        <rect x="9" y="21" width="5" height="9" rx="2.5" fill="#0F766E" />
        <rect x="30" y="21" width="5" height="9" rx="2.5" fill="#0F766E" />
        <path d="M30,28 L25,33 L21,33" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="33" r="1.5" fill="#2DD4BF" />
      </svg>
    </div>
  );
}

/**
 * 3D Notarial Folder (Material Contracts)
 */
export function Icon3DMaterialContracts({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#CA8A04]/30 blur-md scale-125" : "bg-[#CA8A04]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110" : "scale-100")}
      >
        <path d="M8,14 L18,14 L21,17 L36,17 L36,33 L8,33 Z" fill="#854D0E" />
        <path d="M10,17 L36,17 L34,33 L8,33 Z" fill="#CA8A04" />
        <rect x="18" y="22" width="8" height="6" rx="1.5" fill="#FEF08A" stroke="#713F12" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * 3D CRISIL Triple-A Golden Medallion (Credit Rating)
 */
export function Icon3DCreditRating({ className, isHovered }: Icon3DProps) {
  return (
    <div className={cn("relative w-11 h-11 flex items-center justify-center transition-all duration-500", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
        isHovered ? "bg-[#EAB308]/30 blur-md scale-125" : "bg-[#EAB308]/5 blur-xs scale-90"
      )} />
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-10 h-10 transition-transform duration-500 transform-gpu", isHovered ? "scale-110 rotate-6" : "scale-100")}
      >
        <circle cx="22" cy="20" r="12" fill="#CA8A04" />
        <circle cx="22" cy="20" r="10" fill="#EAB308" stroke="#FEF08A" strokeWidth="1.5" />
        <text x="22" y="24" fill="#713F12" fontSize="9" fontWeight="900" textAnchor="middle">A+</text>
        <polygon points="17,30 15,38 21,34" fill="#A16207" />
        <polygon points="27,30 29,38 23,34" fill="#A16207" />
      </svg>
    </div>
  );
}
