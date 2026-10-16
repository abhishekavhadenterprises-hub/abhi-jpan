"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { InvestorMegamenu } from "./InvestorMegamenu";
import { ProductsMegamenu } from "./ProductsMegamenu";
import { MediaMegamenu } from "./MediaMegamenu";

interface NavLinkItem {
  name: string;
  href?: string;
  hasDropdown?: boolean;
}

const navLinks: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", hasDropdown: true },
  { name: "Investor Relation", hasDropdown: true },
  { name: "Quality", href: "/quality" },
  { name: "Media", hasDropdown: true },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 25;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeDropdowns = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeDropdowns();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdowns();
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center pointer-events-none">
      {/* Floating Island Capsule with Scroll Shrink Animation (Design 100% Untouched) */}
      <div
        ref={navRef}
        className={cn(
          "pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(13,36,64,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] transform-gpu will-change-[width,max-width,margin,border-radius]",
          isScrolled
            ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-6xl xl:max-w-7xl h-14 sm:h-[60px] px-4 sm:px-6 rounded-xl sm:rounded-2xl mt-2.5 sm:mt-3 border shadow-[0_16px_45px_rgba(13,36,64,0.12)]"
            : "w-full max-w-full h-16 sm:h-[72px] px-5 sm:px-8 xl:px-12 rounded-none border-b border-x-0 border-t-0 mt-0"
        )}
      >
        {/* Left: Official Brand Logo Mark */}
        <Link href="/" className="flex items-center group shrink-0" onClick={closeDropdowns}>
          <div className="relative w-28 sm:w-36 h-9 sm:h-11">
            <Image
              src="/images/jpan-logo.png"
              alt="J Pan Tubular Components Ltd"
              fill
              priority
              sizes="(max-width: 768px) 120px, 150px"
              className="object-contain object-left dark:hidden"
            />
            <Image
              src="/images/jpan-logo-white.png"
              alt="J Pan Tubular Components Ltd"
              fill
              priority
              sizes="(max-width: 768px) 120px, 150px"
              className="object-contain object-left hidden dark:block"
            />
          </div>
        </Link>

        {/* Center/Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => {
            const isDropdownActive = activeDropdown === link.name;

            return (
              <div
                key={link.name}
                className="relative py-2"
                onMouseEnter={() => {
                  if (link.hasDropdown) {
                    handleMouseEnter(link.name);
                  } else {
                    closeDropdowns();
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                {/* Trigger Button or Direct Link */}
                {link.hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (isDropdownActive) {
                        closeDropdowns();
                      } else {
                        handleMouseEnter(link.name);
                      }
                    }}
                    className={cn(
                      "text-xs xl:text-sm font-semibold transition-colors flex items-center gap-1.5 py-1 px-1 cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0",
                      isDropdownActive
                        ? "text-[#2E5E99] dark:text-[#7BA4D0]"
                        : "text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0]"
                    )}
                    aria-expanded={isDropdownActive}
                    aria-haspopup="true"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 text-[#0D2440]/60 dark:text-white/60 transition-transform duration-200",
                        isDropdownActive && "rotate-180 text-[#2E5E99] dark:text-[#7BA4D0]"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href || "#"}
                    onClick={closeDropdowns}
                    className="text-xs xl:text-sm font-semibold text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors block py-1 px-1 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 select-none"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Shelf: Theme Toggle + Roveia Pill CTA Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          {/* Roveia-style Black/Navy Pill Button */}
          <Link
            href="/contact"
            className="group hidden sm:inline-flex items-center gap-3 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-sans font-bold text-xs uppercase tracking-wider pl-5 pr-2 py-2 rounded-full transition-all duration-300 shadow-md shadow-[#0D2440]/15 hover:shadow-lg hover:shadow-[#2E5E99]/25 active:scale-95 shrink-0"
          >
            <span>Get in touch</span>
            <div className="w-7 h-7 rounded-full bg-white/15 dark:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-[#0D2440]">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-[#0D2440] dark:text-white hover:text-[#2E5E99] p-2 transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 1. Products Megamenu */}
      <ProductsMegamenu
        isOpen={activeDropdown === "Products"}
        onClose={closeDropdowns}
        onMouseEnter={() => handleMouseEnter("Products")}
        onMouseLeave={handleMouseLeave}
      />

      {/* 2. Investor Relations Megamenu */}
      <InvestorMegamenu
        isOpen={activeDropdown === "Investor Relation"}
        onClose={closeDropdowns}
        onMouseEnter={() => handleMouseEnter("Investor Relation")}
        onMouseLeave={handleMouseLeave}
      />

      {/* 3. Media Megamenu */}
      <MediaMegamenu
        isOpen={activeDropdown === "Media"}
        onClose={closeDropdowns}
        onMouseEnter={() => handleMouseEnter("Media")}
        onMouseLeave={handleMouseLeave}
      />

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="pointer-events-auto lg:hidden fixed left-3 sm:left-6 right-3 sm:right-6 top-20 sm:top-24 bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-3xl p-5 text-[#0D2440] dark:text-white shadow-2xl flex flex-col gap-2 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col">
              {link.name === "Products" ? (
                <>
                  <button
                    className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-slate-200/70 dark:border-white/10"
                    onClick={() => setActiveDropdown(activeDropdown === "Products" ? null : "Products")}
                  >
                    <span>Products</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "Products" && "rotate-180 text-[#2E5E99]")} />
                  </button>
                  {activeDropdown === "Products" && (
                    <div className="pl-3 py-2 space-y-1.5 bg-slate-50 dark:bg-white/5 rounded-xl my-1 text-xs">
                      <Link href="/products" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">All Products</Link>
                      <Link href="/products?category=Copper%20Components" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Copper Components</Link>
                      <Link href="/products?category=Brass%20Components" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Brass Components</Link>
                      <Link href="/products?category=Steel%20Components" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Steel Components</Link>
                    </div>
                  )}
                </>
              ) : link.name === "Investor Relation" ? (
                <>
                  <button
                    className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-slate-200/70 dark:border-white/10"
                    onClick={() => setActiveDropdown(activeDropdown === "Investor Relation" ? null : "Investor Relation")}
                  >
                    <span>Investor Relation</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "Investor Relation" && "rotate-180 text-[#2E5E99]")} />
                  </button>
                  {activeDropdown === "Investor Relation" && (
                    <div className="pl-3 py-2 space-y-1.5 bg-slate-50 dark:bg-white/5 rounded-xl my-1 text-xs">
                      <Link href="/annual-reports" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Annual Reports</Link>
                      <Link href="/financial-results" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Financial Results</Link>
                      <Link href="/investor-grievance" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Investor Grievance</Link>
                      <Link href="/policies" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Corporate Policies</Link>
                      <Link href="/material-documents-contracts" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Material Contracts</Link>
                    </div>
                  )}
                </>
              ) : link.name === "Media" ? (
                <>
                  <button
                    className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-slate-200/70 dark:border-white/10"
                    onClick={() => setActiveDropdown(activeDropdown === "Media" ? null : "Media")}
                  >
                    <span>Media</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "Media" && "rotate-180 text-[#2E5E99]")} />
                  </button>
                  {activeDropdown === "Media" && (
                    <div className="pl-3 py-2 space-y-1.5 bg-slate-50 dark:bg-white/5 rounded-xl my-1 text-xs">
                      <Link href="/press-releases" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Press Releases</Link>
                      <Link href="/events" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Events & Exhibitions</Link>
                      <Link href="/blog" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Industrial Blog</Link>
                      <Link href="/gallery" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Media Gallery</Link>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href || "#"}
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-slate-200/70 dark:border-white/10"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Action Button */}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-sans font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-colors shadow-md"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
