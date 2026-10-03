"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

// In React 19 and Next.js 15/16, React flags the inline script tag injected by
// next-themes to prevent FOUC (flash of unstyled content) as a console error.
// We safely filter out this specific false-positive console error.
if (typeof window !== "undefined") {
  const origConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    origConsoleError(...args);
  };
} else {
  // Also filter on server side during SSR
  const origConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    origConsoleError(...args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
