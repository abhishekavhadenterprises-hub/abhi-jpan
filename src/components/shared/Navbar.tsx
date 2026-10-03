"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  name: string;
  href?: string;
  submenu?: NavItem[];
}

const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Home 2", href: "/home-2" },
  { name: "About Us", href: "/about" },
  {
    name: "Products",
    submenu: [
      { name: "All Products", href: "/products" },
      { name: "Copper Components", href: "/products?category=Copper%20Components" },
      { name: "Brass Components", href: "/products?category=Brass%20Components" },
      { name: "Steel Components", href: "/products?category=Steel%20Components" },
    ],
  },
  {
    name: "Investor Relation",
    submenu: [
      {
        name: "Annual Reports",
        submenu: [
          { name: "Annual Reports", href: "/annual-reports" },
          { name: "Annual Return", href: "/annual-return" },
          { name: "Notice Of Board Meeting", href: "/board-meeting-notices" },
          { name: "General Meeting Notices", href: "/general-meeting" },
          { name: "Secretarial Compliance Report", href: "/secretarial-compliance" },
        ],
      },
      {
        name: "Financial Information",
        submenu: [
          { name: "Financial Results", href: "/financial-results" },
          { name: "Investor Meet Intimation", href: "/investor-meet-intimation" },
          { name: "Investor Presentation", href: "/investor-presentation" },
          { name: "Press Release", href: "/press-releases" },
          { name: "Call Audio Recordings", href: "/call-audio-recordings" },
          { name: "Call Transcripts", href: "/call-transcripts" },
          { name: "Newspaper Publication", href: "/newspaper-publication" },
          { name: "Shareholding Pattern", href: "/shareholding-pattern" },
          { name: "Unclaimed And Unpaid Amounts", href: "/unclaimed-unpaid" },
          { name: "Statement Of Deviations Or Variations", href: "/statement-of-deviations" },
        ],
      },
      { name: "Investor Grievance", href: "/investor-grievance" },
      {
        name: "Corporate Governance",
        submenu: [
          { name: "Policies", href: "/policies" },
          { name: "Disclosures under Regulation 46 and 62 of SEBI LODR Regulations 2015", href: "/sebi-disclosures" },
        ],
      },
      {
        name: "Other Information",
        submenu: [
          { name: "Material Contracts and Documents", href: "/material-documents-contracts" },
          { name: "Credit Rating", href: "/credit-rating" },
        ],
      },
    ],
  },
  { name: "Quality", href: "/quality" },
  {
    name: "Media",
    submenu: [
      { name: "Press Release", href: "/press-releases" },
      { name: "Events & Exhibitions", href: "/events" },
      { name: "Industrial Blog", href: "/blog" },
      { name: "Media Gallery", href: "/gallery" },
    ],
  },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect scroll with requestAnimationFrame throttling to guarantee 60-120fps scrolling
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
      setActiveSubDropdown(null);
    }, 150);
  };

  const closeDropdowns = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  // Close dropdowns on click outside or Escape
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

  // Close mobile menu when window is resized to desktop
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
    <nav
      className="fixed left-0 right-0 top-0 z-50 flex justify-center pointer-events-none"
    >
      {/* Floating Glass Capsule with Optimized Glassmorphism & Scroll Shrink */}
      <div
        ref={navRef}
        className={cn(
          "pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between transform-gpu will-change-[width,max-width,margin,border-radius]",
          // High-efficiency glassmorphism styling
          "bg-white/90 dark:bg-[#0D2440]/90 backdrop-blur-xl border border-white/60 dark:border-white/15 shadow-[0_10px_35px_rgba(13,36,64,0.08),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:shadow-[0_14px_42px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
          // When at top (unscrolled): full width edge-to-edge, no rounding
          // When scrolled: shrinks back to floating compact pill with margin
          isScrolled
            ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-6xl xl:max-w-7xl h-14 sm:h-16 px-4 sm:px-6 rounded-xl sm:rounded-2xl mt-2.5 sm:mt-3.5 border-x border-t"
            : "w-full max-w-full h-16 sm:h-[72px] px-5 sm:px-8 xl:px-12 rounded-none border-x-0 border-t-0 mt-0"
        )}
      >
        {/* Left: Official Brand Logo Mark */}
        <Link href="/" className="flex items-center group shrink-0" onClick={closeDropdowns}>
          <div className={cn(
            "relative w-auto aspect-[963/384] shrink-0 transition-transform duration-300 group-hover:scale-[1.02]",
            isScrolled ? "h-8 sm:h-9" : "h-9 sm:h-10 md:h-11"
          )}>
            {/* Light Mode: Navy Logo */}
            <Image
              src="/images/jpan-logo.png"
              alt="J Pan Tubular Components Ltd"
              fill
              priority
              sizes="(max-width: 768px) 120px, 150px"
              className="object-contain object-left dark:hidden"
            />
            {/* Dark Mode: Pure White Logo */}
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
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group py-2"
              onMouseEnter={() => handleMouseEnter(link.name)}
              onMouseLeave={handleMouseLeave}
            >
              {link.submenu ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeDropdown === link.name) {
                      closeDropdowns();
                    } else {
                      handleMouseEnter(link.name);
                    }
                  }}
                  className={cn(
                    "text-xs xl:text-sm font-semibold text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors flex items-center gap-1.5 py-1 cursor-pointer",
                    activeDropdown === link.name && "text-[#2E5E99] dark:text-[#7BA4D0]"
                  )}
                  aria-expanded={activeDropdown === link.name}
                  aria-haspopup="true"
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-[#0D2440]/60 dark:text-white/60 transition-transform duration-200",
                      activeDropdown === link.name && "rotate-180 text-[#2E5E99] dark:text-[#7BA4D0]"
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={link.href || "#"}
                  onClick={closeDropdowns}
                  className="text-xs xl:text-sm font-semibold text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors block py-1"
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown Menu (Comfortable floating gap with seamless invisible hover bridge) */}
              {link.submenu && activeDropdown === link.name && (
                <div
                  className="absolute top-full left-0 pt-7 sm:pt-8 w-64 pointer-events-auto z-[60]"
                  onMouseEnter={() => {
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                      timeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white/85 dark:bg-[#0D2440]/90 backdrop-blur-2xl border border-white/60 dark:border-white/15 rounded-xl py-2 shadow-[0_16px_40px_rgba(13,36,64,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-2 duration-150">
                    {link.submenu.map((subItem) => (
                      <div
                        key={subItem.name}
                        className="relative group/sub"
                        onMouseEnter={() => {
                          if (subItem.submenu) {
                            setActiveSubDropdown(subItem.name);
                          } else {
                            setActiveSubDropdown(null);
                          }
                        }}
                      >
                        {subItem.submenu ? (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveSubDropdown(
                                activeSubDropdown === subItem.name ? null : subItem.name
                              )
                            }
                            className={cn(
                              "w-full text-left px-4 py-2.5 text-xs xl:text-sm font-medium text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] hover:bg-[#E7F0FA]/80 dark:hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer",
                              activeSubDropdown === subItem.name &&
                              "text-[#2E5E99] dark:text-[#7BA4D0] bg-[#E7F0FA]/80 dark:bg-white/10"
                            )}
                          >
                            <span>{subItem.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                          </button>
                        ) : (
                          <Link
                            href={subItem.href || "#"}
                            onClick={closeDropdowns}
                            className="block px-4 py-2.5 text-xs xl:text-sm font-medium text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] hover:bg-[#E7F0FA]/80 dark:hover:bg-white/10 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        )}

                        {/* Second Level Flyout Dropdown (No hover gap: padded wrapper bridges gap seamlessly) */}
                        {subItem.submenu && activeSubDropdown === subItem.name && (
                          <div
                            className="absolute top-0 left-full pl-3 w-72 pointer-events-auto z-[70]"
                            onMouseEnter={() => {
                              if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                                timeoutRef.current = null;
                              }
                            }}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="bg-white/85 dark:bg-[#0D2440]/90 backdrop-blur-2xl border border-white/60 dark:border-white/15 rounded-xl py-2 shadow-[0_16px_40px_rgba(13,36,64,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-left-2 duration-150">
                              {subItem.submenu.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href || "#"}
                                  onClick={closeDropdowns}
                                  className="block px-4 py-2 text-xs xl:text-sm font-medium text-[#0D2440]/85 dark:text-white/85 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] hover:bg-[#E7F0FA]/80 dark:hover:bg-white/10 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Shelf: Theme Toggle + CTA Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Interactive Dark Mode Switcher */}
          <ThemeToggle />

          {/* High-Contrast Action Button */}
          <Link
            href="/contact"
            className="group hidden sm:flex items-center gap-2.5 bg-[#2E5E99] hover:bg-[#0D2440] dark:hover:bg-[#1E3E66] text-white font-heading font-bold text-xs sm:text-sm pl-4 pr-1.5 py-1.5 rounded-lg transition-all active:scale-95 shrink-0"
          >
            <span>Get in touch</span>
            <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
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

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "pointer-events-auto lg:hidden fixed left-3 sm:left-6 right-3 sm:right-6 bg-white/90 dark:bg-[#0D2440]/95 backdrop-blur-2xl border border-white/60 dark:border-white/15 rounded-2xl p-5 text-[#0D2440] dark:text-white shadow-2xl flex flex-col gap-2 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 z-50 transition-all",
            isScrolled ? "top-18 sm:top-20" : "top-22 sm:top-26"
          )}
        >
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col">
              {link.submenu ? (
                <>
                  <button
                    className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-[#7BA4D0]/20 dark:border-white/10"
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        activeDropdown === link.name && "rotate-180 text-[#2E5E99] dark:text-[#7BA4D0]"
                      )}
                    />
                  </button>
                  {activeDropdown === link.name && (
                    <div className="pl-4 py-2 space-y-1 bg-[#E7F0FA]/50 dark:bg-white/5 rounded-lg my-1">
                      {link.submenu.map((subItem) => (
                        <div key={subItem.name}>
                          {subItem.submenu ? (
                            <>
                              <button
                                className="w-full text-left py-1.5 text-xs font-medium text-[#0D2440]/80 dark:text-white/80 hover:text-[#2E5E99] flex items-center justify-between"
                                onClick={() =>
                                  setActiveSubDropdown(
                                    activeSubDropdown === subItem.name ? null : subItem.name
                                  )
                                }
                              >
                                <span>{subItem.name}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                              {activeSubDropdown === subItem.name && (
                                <div className="pl-3 py-1 space-y-1">
                                  {subItem.submenu.map((nested) => (
                                    <Link
                                      key={nested.name}
                                      href={nested.href || "#"}
                                      className="block py-1 text-xs text-[#0D2440]/70 dark:text-white/70 hover:text-[#2E5E99]"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {nested.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={subItem.href || "#"}
                              className="block py-1.5 text-xs font-medium text-[#0D2440]/80 dark:text-white/80 hover:text-[#2E5E99]"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href || "#"}
                  className="py-2.5 text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] border-b border-[#7BA4D0]/20 dark:border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            className="mt-3 flex items-center justify-center gap-2 bg-[#2E5E99] hover:bg-[#0D2440] text-white font-heading font-bold text-sm py-3 rounded-xl transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
