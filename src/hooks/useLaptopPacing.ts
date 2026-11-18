"use client";

import { useEffect, useState } from "react";

export function detectLaptopViewport(): boolean {
  if (typeof window === "undefined") return false;
  const w = window.innerWidth;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  return w >= 1024 && w <= 1599 && hasFinePointer;
}

/**
 * Strictly targets Laptop viewports (1024px–1599px with fine pointer).
 * Leaves Phone/Tablet (<1024px or touch) and Large Desktop PC (>=1600px) 100% untouched.
 * Reference pacing for laptop:
 * - Lenis: 1.0s (handled in SmoothScroll.tsx)
 * - Reveal: 0.7s
 * - Stagger: 0.1s
 * - Hover: 0.4s
 */
export function useLaptopPacing() {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const update = () => setIsLaptop(detectLaptopViewport());
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    isLaptop,
    revealDuration: (fallback: number) => (isLaptop ? 0.7 : fallback),
    staggerDelay: (fallback: number) => (isLaptop ? 0.1 : fallback),
    hoverDuration: (fallback: number) => (isLaptop ? 0.4 : fallback),
    hoverClass: (fallbackClass: string) =>
      isLaptop ? "duration-[400ms]" : fallbackClass,
  };
}
