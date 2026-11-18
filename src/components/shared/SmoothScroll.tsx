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
];

function isCalibratedLaptopRoute(pathname: string): boolean {
  return CALIBRATED_LAPTOP_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function SmoothScroll() {
  const pathname = usePathname() || "/";
  const pathnameRef = useRef(pathname);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
    // Dynamically switch Lenis settle duration (1.0s on calibrated laptop pages, 1.15s everywhere else)
    if (lenisRef.current) {
      const useLaptopProfile =
        isCalibratedLaptopRoute(pathname) && isLaptopScreen();
      lenisRef.current.options.duration = useLaptopProfile ? 1.0 : 1.15;
    }
  }, [pathname]);

  useEffect(() => {
    const initialLaptopProfile =
      isCalibratedLaptopRoute(pathnameRef.current) && isLaptopScreen();

    // Ultra-smooth, cinematic scrolling with authentic physical drag & weighted deceleration
    const lenis = new Lenis({
      duration: initialLaptopProfile ? 1.0 : 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // Quartic drag curve: natural viscous friction and silky settle
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.25, // Base multiplier for Desktop PC (kept untouched)
      touchMultiplier: 1.2, // Base multiplier for Phone/Touch (kept untouched)
      infinite: false,
      virtualScroll: (data) => {
        // Apply moderate laptop-only damping ONLY on calibrated pages & laptop screens
        if (
          data.event instanceof WheelEvent &&
          isCalibratedLaptopRoute(pathnameRef.current) &&
          isLaptopScreen()
        ) {
          // Bring effective multiplier from 1.25 -> ~0.75 (moderate: not too fast, not too slow)
          let scaled = data.deltaY * 0.6;

          // Softly compress extreme MacBook/Windows trackpad inertia bursts (> 95px per tick)
          // while keeping gentle & normal scrolling completely linear and natural
          const abs = Math.abs(scaled);
          if (abs > 95) {
            scaled = Math.sign(scaled) * (95 + (abs - 95) * 0.35);
          }

          data.deltaY = scaled;
        }
        return true;
      },
    });

    lenisRef.current = lenis;

    const handleResize = () => {
      const useLaptopProfile =
        isCalibratedLaptopRoute(pathnameRef.current) && isLaptopScreen();
      lenis.options.duration = useLaptopProfile ? 1.0 : 1.15;
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
