"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
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

const INVESTOR_ROUTES = [
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
];

const MEDIA_ROUTES = [
  "/press-releases",
  "/events",
  "/blog",
  "/gallery",
  "/certifications",
  "/certificate",
  "/newsletter",
];

export function Navbar() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isRouteMatch = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);

  const isNavActive = (link: NavLinkItem): boolean => {
    if (link.name === "Home") {
      return pathname === "/";
    }
    if (link.name === "Products") {
      return isRouteMatch("/products");
    }
    if (link.name === "Investor Relation") {
      return INVESTOR_ROUTES.some(isRouteMatch);
    }
    if (link.name === "Media") {
      return MEDIA_ROUTES.some(isRouteMatch);
    }
    if (link.href) {
      return isRouteMatch(link.href);
    }
    return false;
  };

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
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const isDropdownActive = activeDropdown === link.name;
            const isActive = isNavActive(link);

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
                      "relative z-10 text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 py-1.5 px-2.5 xl:px-3.5 rounded-xl cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0",
                      isActive
                        ? "text-[#2563EB] dark:text-[#93C5FD] font-bold"
                        : isDropdownActive
                          ? "text-[#2563EB] dark:text-[#7BA4D0] bg-slate-100/80 dark:bg-white/[0.06]"
                          : "text-[#0D2440]/85 dark:text-white/85 hover:text-[#2563EB] dark:hover:text-[#7BA4D0] hover:bg-slate-100/70 dark:hover:bg-white/[0.05]"
                    )}
                    aria-expanded={isDropdownActive}
                    aria-haspopup="true"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-highlight"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-[#EFF6FF] dark:bg-[#2563EB]/20 -z-10 pointer-events-none"
                      />
                    )}
                    <span>{link.name}</span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        isActive || isDropdownActive
                          ? "text-[#2563EB] dark:text-[#93C5FD]"
                          : "text-[#0D2440]/60 dark:text-white/60",
                        isDropdownActive && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href || "#"}
                    onClick={closeDropdowns}
                    className={cn(
                      "relative z-10 text-xs xl:text-sm font-semibold transition-all duration-200 block py-1.5 px-2.5 xl:px-3.5 rounded-xl outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 select-none",
                      isActive
                        ? "text-[#2563EB] dark:text-[#93C5FD] font-bold"
                        : "text-[#0D2440]/85 dark:text-white/85 hover:text-[#2563EB] dark:hover:text-[#7BA4D0] hover:bg-slate-100/70 dark:hover:bg-white/[0.05]"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-highlight"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-[#EFF6FF] dark:bg-[#2563EB]/20 -z-10 pointer-events-none"
                      />
                    )}
                    <span>{link.name}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Shelf: Roveia Pill CTA Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Roveia-style Black/Navy Pill Button */}
          <Link
            href="/contact#enquiry-form"
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
        <div className="pointer-events-auto lg:hidden fixed left-3 sm:left-6 right-3 sm:right-6 top-20 sm:top-24 bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-3xl p-5 text-[#0D2440] dark:text-white shadow-2xl flex flex-col gap-1.5 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {navLinks.map((link) => {
            const isActive = isNavActive(link);
            const activeItemClass =
              "bg-[#EFF6FF] dark:bg-[#2563EB]/20 text-[#2563EB] dark:text-[#93C5FD] font-bold rounded-xl px-3.5";
            const inactiveItemClass =
              "text-[#0D2440] dark:text-white hover:text-[#2563EB] dark:hover:text-[#93C5FD] border-b border-slate-200/70 dark:border-white/10 px-2";

            return (
              <div key={link.name} className="flex flex-col">
                {link.name === "Products" ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center justify-between py-2.5 text-sm font-semibold transition-all",
                        isActive ? activeItemClass : inactiveItemClass
                      )}
                      onClick={() => setActiveDropdown(activeDropdown === "Products" ? null : "Products")}
                    >
                      <span>Products</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "Products" && "rotate-180 text-[#2563EB]", isActive && "text-[#2563EB] dark:text-[#93C5FD]")} />
                    </button>
                    {activeDropdown === "Products" && (
                      <div className="pl-3 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-white/5 rounded-xl my-1 text-xs">
                        <Link href="/products" onClick={() => setIsOpen(false)} className={cn("block py-1.5 px-2.5 rounded-lg transition-colors", isRouteMatch("/products") ? "bg-[#EFF6FF] dark:bg-[#2563EB]/25 text-[#2563EB] dark:text-[#93C5FD] font-bold" : "hover:text-[#2563EB]")}>All Products</Link>
                        <Link href="/products?category=Copper%20Components" onClick={() => setIsOpen(false)} className="block py-1.5 px-2.5 rounded-lg hover:text-[#2563EB]">Copper Components</Link>
                        <Link href="/products?category=Brass%20Components" onClick={() => setIsOpen(false)} className="block py-1.5 px-2.5 rounded-lg hover:text-[#2563EB]">Brass Components</Link>
                        <Link href="/products?category=Steel%20Components" onClick={() => setIsOpen(false)} className="block py-1.5 px-2.5 rounded-lg hover:text-[#2563EB]">Steel Components</Link>
                      </div>
                    )}
                  </>
                ) : link.name === "Investor Relation" ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center justify-between py-2.5 text-sm font-semibold transition-all",
                        isActive ? activeItemClass : inactiveItemClass
                      )}
                      onClick={() => setActiveDropdown(activeDropdown === "Investor Relation" ? null : "Investor Relation")}
                    >
                      <span>Investor Relation</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "Investor Relation" && "rotate-180 text-[#2563EB]", isActive && "text-[#2563EB] dark:text-[#93C5FD]")} />
                    </button>
                    {activeDropdown === "Investor Relation" && (
                      <div className="pl-3 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-white/5 rounded-xl my-1 text-xs">
                        {[
                          { href: "/annual-reports", label: "Annual Reports" },
                          { href: "/financial-results", label: "Financial Results" },
                          { href: "/investor-grievance", label: "Investor Grievance" },
                          { href: "/policies", label: "Corporate Policies" },
                          { href: "/material-documents-contracts", label: "Material Contracts" },
                          { href: "/industry-report", label: "Industry Report" },
                          { href: "/material-creditors", label: "Material Creditors" },
                          { href: "/initial-public-offer", label: "Initial Public Offer" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block py-1.5 px-2.5 rounded-lg transition-colors",
                              isRouteMatch(item.href)
                                ? "bg-[#EFF6FF] dark:bg-[#2563EB]/25 text-[#2563EB] dark:text-[#93C5FD] font-bold"
                                : "hover:text-[#2563EB]"
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : link.name === "Media" ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center justify-between py-2.5 text-sm font-semibold transition-all",
                        isActive ? activeItemClass : inactiveItemClass
                      )}
                      onClick={() => setActiveDropdown(activeDropdown === "Media" ? null : "Media")}
                    >
                      <span>Media</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "Media" && "rotate-180 text-[#2563EB]", isActive && "text-[#2563EB] dark:text-[#93C5FD]")} />
                    </button>
                    {activeDropdown === "Media" && (
                      <div className="pl-3 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-white/5 rounded-xl my-1 text-xs">
                        {[
                          { href: "/press-releases", label: "Press Releases" },
                          { href: "/events", label: "Events & Exhibitions" },
                          { href: "/blog", label: "Industrial Blog" },
                          { href: "/gallery", label: "Media Gallery" },
                          { href: "/certifications", label: "Certifications" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block py-1.5 px-2.5 rounded-lg transition-colors",
                              isRouteMatch(item.href)
                                ? "bg-[#EFF6FF] dark:bg-[#2563EB]/25 text-[#2563EB] dark:text-[#93C5FD] font-bold"
                                : "hover:text-[#2563EB]"
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href || "#"}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-2.5 text-sm font-semibold transition-all",
                      isActive ? activeItemClass : inactiveItemClass
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            );
          })}

          {/* Mobile Action Button */}
          <Link
            href="/contact#enquiry-form"
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
