"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Icon3DMediaPress,
  Icon3DMediaEvents,
  Icon3DMediaBlog,
  Icon3DMediaGallery,
} from "./Premium3DIcons";

const mediaCards = [
  {
    id: "press-releases",
    title: "Press Releases",
    href: "/press-releases",
    icon: Icon3DMediaPress,
  },
  {
    id: "events",
    title: "Events & Exhibitions",
    href: "/events",
    icon: Icon3DMediaEvents,
  },
  {
    id: "blog",
    title: "Industrial Blog",
    href: "/blog",
    icon: Icon3DMediaBlog,
  },
  {
    id: "gallery",
    title: "Media Gallery",
    href: "/gallery",
    icon: Icon3DMediaGallery,
  },
];

interface MediaMegamenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MediaMegamenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MediaMegamenuProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-full max-w-4xl xl:max-w-5xl px-4 z-[90] pointer-events-auto"
        >
          {/* Master Clean Floating Box Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[28px] sm:rounded-[32px] bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_20px_60px_rgba(13,36,64,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-7 overflow-hidden transform-gpu"
          >
            {/* 4 Prominent Premium 3D Media Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-stretch">
              {mediaCards.map((media) => {
                const IconComponent = media.icon;
                const isHovered = hoveredCardId === media.id;

                return (
                  <Link
                    key={media.id}
                    href={media.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredCardId(media.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={cn(
                      "group/card relative p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer select-none min-h-[160px]",
                      isHovered
                        ? "bg-white dark:bg-[#0D2440] border-[#2563EB]/50 dark:border-[#3B82F6]/50 shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.45)] -translate-y-1"
                        : "bg-[#EEF1F5] dark:bg-white/[0.035] border-slate-200/90 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                    )}
                  >
                    {/* 3D Component Icon */}
                    <div className="flex-1 flex items-center justify-center my-1 w-full">
                      <IconComponent isHovered={isHovered} />
                    </div>

                    {/* Clean Bold Title */}
                    <h3
                      className={cn(
                        "text-xs sm:text-[13px] font-bold tracking-tight transition-colors text-center leading-snug mt-2",
                        isHovered
                          ? "text-[#1D4ED8] dark:text-[#93C5FD]"
                          : "text-slate-700 dark:text-slate-300"
                      )}
                    >
                      {media.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
