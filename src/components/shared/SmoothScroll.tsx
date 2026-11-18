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

const DESKTOP_EASING = (t: number) => 1 - Math.pow(1 - t, 4);

function applyLenisProfile(lenis: Lenis, useLaptopProfile: boolean) {
  const opts = lenis.options as {
    lerp?: number;
    duration?: number;
    easing?: (t: number) => number;
  };

  if (useLaptopProfile) {
    // Pure frame-rate-independent exponential damping (lerp) on laptop:
    // Eliminates sawtooth velocity resets caused by duration+easing on 60Hz/120Hz trackpads
    opts.lerp = 0.1;
    delete opts.duration;
    delete opts.easing;
  } else {
    // Original Desktop PC / Mobile config (100% untouched)
    delete opts.lerp;
    opts.duration = 1.15;
    opts.easing = DESKTOP_EASING;
  }

  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("laptop-scroll-opt", useLaptopProfile);
  }
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

      // Recalculate scroll limits immediately on route transitions to prevent stale-height scroll glitches
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

    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("laptop-scroll-opt", initialLaptopProfile);
    }

    // Laptop uses pure exponential lerp (zero sawtooth trackpad jitter on 60Hz/120Hz displays)
    // Desktop PC & Phone retain exact original quartic duration profile
    const lenis = new Lenis({
      ...(initialLaptopProfile
        ? { lerp: 0.1 }
        : { duration: 1.15, easing: DESKTOP_EASING }),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.25, // Base multiplier for Desktop PC (kept untouched)
      touchMultiplier: 1.2, // Base multiplier for Phone/Touch (kept untouched)
      infinite: false,
      virtualScroll: (data) => {
        // Apply smooth continuous laptop-only damping ONLY on calibrated pages & laptop screens
        if (
          data.event instanceof WheelEvent &&
          isCalibratedLaptopRoute(pathnameRef.current) &&
          isLaptopScreen()
        ) {
          // Smooth C-infinity tanh compression:
          // - Gentle/moderate scrolling stays linear (~0.75x effective pace, never sluggish)
          // - Extreme MacBook/Windows trackpad inertia spikes taper smoothly with ZERO kink or jerk
          const linear = data.deltaY * 0.62;
          const maxStep = 115;
          data.deltaY =
            Math.sign(linear) * maxStep * Math.tanh(Math.abs(linear) / maxStep);
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
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("laptop-scroll-opt");
      }
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return null;
}
