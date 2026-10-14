"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Only scroll to top if there's no hash anchor in the URL
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate: boolean }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return null;
}
