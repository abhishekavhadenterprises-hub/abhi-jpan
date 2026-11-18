"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Strict laptop-only detection: 1024px–1599px with fine pointer (trackpad/mouse)
// Leaves Mobile/Tablet (<1024px or touch) and Large Desktop PC (>=1600px) 100% untouched
function isLaptopScreen(): boolean {
  if (typeof window === "undefined") return false;
  const w = window.innerWidth;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  return w >= 1024 && w <= 1599 && hasFinePointer;
}

// Pages currently opted into laptop-only moderate scroll calibration (page-wise rollout)
const CALIBRATED_LAPTOP_ROUTES = [
  "/",
  "/about",
  "/products",
  // Investor Relations (All 23 pages)
  "/annual-reports",
  "/annual-return",
  "/board-meeting-notices",
  "/general-meeting",
  "/secretarial-compliance",
  "/financial-results",
  "/investor-meet-intimation",
  "/investor-presentation",
  "/call-audio-recordings",
  "/call-transcripts",
  "/newspaper-publication",
  "/shareholding-pattern",
  "/unclaimed-unpaid",
  "/statement-of-deviations",
  "/investor-grievance",
  "/investor-contact",
  "/policies",
  "/sebi-disclosures",
  "/material-documents-contracts",
  "/credit-rating",
  "/industry-report",
  "/material-creditors",
  "/initial-public-offer",
  // Quality
  "/quality",
  // Media Dropdown Pages
  "/press-releases",
  "/events",
  "/blog",
  "/gallery",
  "/certifications",
  "/certificate",
  "/newsletter",
  // Careers
  "/careers",
  // Contact
  "/contact",
  // Secondary / Footer Pages
  "/industries",
  "/customers",
  "/presence",
  "/privacy",
  "/terms",
  "/sitemap",
  "/design-history",
];

function isCalibratedLaptopRoute(pathname: string): boolean {
  return CALIBRATED_LAPTOP_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`)
  );
}

const QUARTIC_EASING = (t: number) => 1 - Math.pow(1 - t, 4);

function applyLenisProfile(lenis: Lenis, useLaptopProfile: boolean) {
  // Exact same PC quartic smoothness on laptop — just slightly more weighted delay (1.35s vs 1.15s)
  lenis.options.duration = useLaptopProfile ? 1.35 : 1.15;
  lenis.options.easing = QUARTIC_EASING;
}

export function SmoothScroll() {
  const pathname = usePathname() || "/";
  const pathnameRef = useRef(pathname);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
    if (lenisRef.current) {
      const useLaptopProfile =
        isCalibratedLaptopRoute(pathname) && isLaptopScreen();
      applyLenisProfile(lenisRef.current, useLaptopProfile);

      // Keep scroll height bounds accurate after route transitions
      const lenis = lenisRef.current;
      const rafResize = requestAnimationFrame(() => lenis.resize());
      const settledResize = setTimeout(() => lenis.resize(), 300);
      return () => {
        cancelAnimationFrame(rafResize);
        clearTimeout(settledResize);
      };
    }
  }, [pathname]);

  useEffect(() => {
    const initialLaptopProfile =
      isCalibratedLaptopRoute(pathnameRef.current) && isLaptopScreen();

    // Exact same PC quartic smoothness across devices; laptop gets a gentle weighted delay (1.35s)
    // and calmer linear travel (~0.81x) so scrolling is never too fast
    const lenis = new Lenis({
      duration: initialLaptopProfile ? 1.35 : 1.15,
      easing: QUARTIC_EASING,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.25, // Base multiplier for Desktop PC (100% untouched)
      touchMultiplier: 1.2, // Base multiplier for Phone/Touch (100% untouched)
      infinite: false,
      virtualScroll: (data) => {
        // Strictly Laptop-only linear slowdown (brings 1.25 -> ~0.81, pure PC smoothness without distortion)
        if (
          data.event instanceof WheelEvent &&
          isCalibratedLaptopRoute(pathnameRef.current) &&
          isLaptopScreen()
        ) {
          data.deltaY *= 0.65;
        }
        return true;
      },
    });

    lenisRef.current = lenis;

    const handleResize = () => {
      const useLaptopProfile =
        isCalibratedLaptopRoute(pathnameRef.current) && isLaptopScreen();
      applyLenisProfile(lenis, useLaptopProfile);
      lenis.resize();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Provide global access for smooth programmatic navigation & anchor jumps
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return null;
}
