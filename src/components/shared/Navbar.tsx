"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, ChevronDown, ChevronRight, Layers, Newspaper, Calendar, BookOpen, Image as ImageIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { InvestorMegamenu } from "./InvestorMegamenu";

interface NavItem {
  name: string;
  href?: string;
  submenu?: {
    name: string;
    href: string;
    desc?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Products",
    submenu: [
      { name: "All Products", href: "/products", desc: "Complete metallurgical catalog", icon: Layers },
      { name: "Copper Components", href: "/products?category=Copper%20Components", desc: "DHP deoxidized high-purity assemblies" },
      { name: "Brass Components", href: "/products?category=Brass%20Components", desc: "Precision CNC turned & brazed parts" },
      { name: "Steel Components", href: "/products?category=Steel%20Components", desc: "High-pressure hydraulic & HVAC tubes" },
    ],
  },
  {
    name: "Investor Relation",
    // Handled specifically via InvestorMegamenu
  },
  { name: "Quality", href: "/quality" },
  {
    name: "Media",
    submenu: [
      { name: "Press Releases", href: "/press-releases", desc: "Formal announcements & disclosures", icon: Newspaper },
      { name: "Events & Exhibitions", href: "/events", desc: "Global trade fairs & industry expos", icon: Calendar },
      { name: "Industrial Blog", href: "/blog", desc: "Metallurgical insights & innovations", icon: BookOpen },
      { name: "Media Gallery", href: "/gallery", desc: "Visual showcase of our 6 plants", icon: ImageIcon },
    ],
  },
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
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center pointer-events-none px-3 sm:px-6">
      {/* Floating Island Capsule (Roveia Design System) */}
      <div
        ref={navRef}
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between w-full max-w-6xl xl:max-w-7xl rounded-full bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(13,36,64,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] transform-gpu",
          isScrolled
            ? "h-14 sm:h-[60px] px-4 sm:px-6 mt-2.5 sm:mt-3 shadow-[0_16px_45px_rgba(13,36,64,0.12)]"
            : "h-16 sm:h-[68px] px-5 sm:px-7 mt-3.5 sm:mt-5"
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
            const isInvestor = link.name === "Investor Relation";
            const isDropdownActive = activeDropdown === link.name;

            return (
              <div
                key={link.name}
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Trigger Button or Direct Link */}
                {link.submenu || isInvestor ? (
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
                      "text-xs xl:text-sm font-semibold transition-colors flex items-center gap-1.5 py-1 px-1 cursor-pointer select-none",
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
                    className="text-xs xl:text-sm font-semibold text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors block py-1 px-1"
                  >
                    {link.name}
                  </Link>
                )}

                {/* Standard Dropdown Menu (Products & Media) */}
                {link.submenu && !isInvestor && isDropdownActive && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72 pointer-events-auto z-[60]"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 rounded-2xl p-2 shadow-[0_16px_50px_rgba(13,36,64,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={closeDropdowns}
                          className="flex items-center gap-3 p-2.5 rounded-xl text-xs xl:text-sm font-medium text-[#0D2440] dark:text-white hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-[#2E5E99] group-hover:bg-[#EBF3FC] transition-colors shrink-0">
                            {subItem.icon ? <subItem.icon className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="font-semibold leading-tight">{subItem.name}</div>
                            {subItem.desc && (
                              <div className="text-[10px] text-slate-400 line-clamp-1">{subItem.desc}</div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
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

      {/* Cinematic 3D Investor Relations Megamenu (Strict Hover Gating) */}
      <InvestorMegamenu
        isOpen={activeDropdown === "Investor Relation"}
        onClose={closeDropdowns}
        onMouseEnter={() => handleMouseEnter("Investor Relation")}
        onMouseLeave={handleMouseLeave}
      />

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="pointer-events-auto lg:hidden fixed left-3 sm:left-6 right-3 sm:right-6 top-20 sm:top-24 bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-3xl p-5 text-[#0D2440] dark:text-white shadow-2xl flex flex-col gap-2 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col">
              {link.name === "Investor Relation" ? (
                <>
                  <button
                    className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-slate-200/70 dark:border-white/10"
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === link.name && "rotate-180 text-[#2E5E99]")} />
                  </button>
                  {activeDropdown === link.name && (
                    <div className="pl-3 py-2 space-y-1.5 bg-slate-50 dark:bg-white/5 rounded-xl my-1 text-xs">
                      <Link href="/financial-results" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Financial Results</Link>
                      <Link href="/annual-reports" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Annual Reports</Link>
                      <Link href="/shareholding-pattern" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Shareholding Pattern</Link>
                      <Link href="/investor-presentation" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Investor Presentation</Link>
                      <Link href="/call-audio-recordings" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Call Audio Recordings</Link>
                      <Link href="/call-transcripts" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Call Transcripts</Link>
                      <Link href="/unclaimed-unpaid" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Unclaimed & Unpaid</Link>
                      <Link href="/investor-grievance" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Investor Grievance</Link>
                      <Link href="/policies" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Corporate Policies</Link>
                      <Link href="/sebi-disclosures" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">SEBI LODR Disclosures</Link>
                      <Link href="/investor-contact" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#2E5E99]">Investor Contact Desk</Link>
                    </div>
                  )}
                </>
              ) : link.submenu ? (
                <>
                  <button
                    className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-slate-200/70 dark:border-white/10"
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === link.name && "rotate-180 text-[#2E5E99]")} />
                  </button>
                  {activeDropdown === link.name && (
                    <div className="pl-3 py-2 space-y-1 bg-slate-50 dark:bg-white/5 rounded-xl my-1">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:text-[#2E5E99]"
                        >
                          {sub.name}
                        </Link>
                      ))}
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
