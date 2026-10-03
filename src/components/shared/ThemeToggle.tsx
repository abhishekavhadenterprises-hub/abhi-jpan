"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center opacity-70 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-[#7BA4D0]/30 dark:border-white/15 flex items-center justify-center transition-all duration-300 cursor-pointer group shrink-0 ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Sun Icon */}
      <Sun
        className={`w-4 h-4 text-amber-500 dark:text-amber-400 transition-all duration-300 transform ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0 absolute"
        }`}
      />

      {/* Moon Icon */}
      <Moon
        className={`w-4 h-4 text-[#0D2440] dark:text-white transition-all duration-300 transform ${
          isDark
            ? "rotate-90 scale-0 opacity-0 absolute"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
