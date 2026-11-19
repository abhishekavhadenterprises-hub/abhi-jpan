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
import {
  Icon3DAllProducts,
  Icon3DCopper,
  Icon3DBrass,
  Icon3DSteel,
  Icon3DAnnualReport,
  Icon3DFinancialResults,
  Icon3DGrievance,
  Icon3DGovernance,
  Icon3DOtherInfo,
  Icon3DDocument,
  Icon3DAudio,
  Icon3DPresentation,
  Icon3DChart,
  Icon3DScales,
  Icon3DCalendar,
  Icon3DAssembly,
  Icon3DWaxSeal,
  Icon3DNewspaper,
  Icon3DCreditScore,
  Icon3DMediaPress,
  Icon3DMediaEvents,
  Icon3DMediaBlog,
  Icon3DMediaGallery,
} from "./Premium3DIcons";

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

type MobileIconComponent = (props: { isHovered?: boolean; size?: "xs" | "sm" | "md" | "lg" }) => React.JSX.Element;

interface MobileMenuLinkItem {
  href: string;
  label: string;
  icon: MobileIconComponent;
}

interface MobileInvestorGroup {
  id: string;
  title: string;
  href?: string;
  icon: MobileIconComponent;
  items?: MobileMenuLinkItem[];
}

const MOBILE_PRODUCTS_ITEMS: MobileMenuLinkItem[] = [
  { href: "/products", label: "All Products", icon: Icon3DAllProducts },
  { href: "/products?category=Copper%20Components", label: "Copper Components", icon: Icon3DCopper },
  { href: "/products?category=Brass%20Components", label: "Brass Components", icon: Icon3DBrass },
  { href: "/products?category=Steel%20Components", label: "Steel Components", icon: Icon3DSteel },
];

const MOBILE_MEDIA_ITEMS: MobileMenuLinkItem[] = [
  { href: "/press-releases", label: "Press Releases", icon: Icon3DMediaPress },
  { href: "/events", label: "Events & Exhibitions", icon: Icon3DMediaEvents },
  { href: "/blog", label: "Industrial Blog", icon: Icon3DMediaBlog },
  { href: "/gallery", label: "Media Gallery", icon: Icon3DMediaGallery },
  { href: "/certifications", label: "Certifications", icon: Icon3DWaxSeal },
];

const MOBILE_INVESTOR_GROUPS: MobileInvestorGroup[] = [
  {
    id: "annual-reports",
    title: "Annual Reports",
    icon: Icon3DAnnualReport,
    items: [
      { href: "/annual-reports", label: "Annual Reports", icon: Icon3DAnnualReport },
      { href: "/annual-return", label: "Annual Return", icon: Icon3DDocument },
      { href: "/board-meeting-notices", label: "Notice of Board Meeting", icon: Icon3DCalendar },
      { href: "/general-meeting", label: "General Meeting Notices", icon: Icon3DAssembly },
      { href: "/secretarial-compliance", label: "Secretarial Compliance", icon: Icon3DWaxSeal },
    ],
  },
  {
    id: "financial-info",
    title: "Financial Information",
    icon: Icon3DFinancialResults,
    items: [
      { href: "/financial-results", label: "Financial Results", icon: Icon3DFinancialResults },
      { href: "/investor-meet-intimation", label: "Investor Meet Intimation", icon: Icon3DPresentation },
      { href: "/investor-presentation", label: "Investor Presentation", icon: Icon3DPresentation },
      { href: "/call-audio-recordings", label: "Call Audio Recordings", icon: Icon3DAudio },
      { href: "/call-transcripts", label: "Call Transcripts", icon: Icon3DDocument },
      { href: "/newspaper-publication", label: "Newspaper Publications", icon: Icon3DNewspaper },
      { href: "/shareholding-pattern", label: "Shareholding Pattern", icon: Icon3DChart },
      { href: "/unclaimed-unpaid", label: "Unclaimed & Unpaid", icon: Icon3DOtherInfo },
      { href: "/statement-of-deviations", label: "Statement of Deviations", icon: Icon3DScales },
    ],
  },
  {
    id: "investor-grievance",
    title: "Investor Grievance",
    href: "/investor-grievance",
    icon: Icon3DGrievance,
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance",
    icon: Icon3DGovernance,
    items: [
      { href: "/policies", label: "Corporate Policies", icon: Icon3DGovernance },
      { href: "/sebi-disclosures", label: "SEBI LODR Disclosures", icon: Icon3DDocument },
    ],
  },
  {
    id: "other-information",
    title: "Other Information",
    icon: Icon3DOtherInfo,
    items: [
      { href: "/material-documents-contracts", label: "Material Contracts", icon: Icon3DOtherInfo },
      { href: "/credit-rating", label: "Credit Rating", icon: Icon3DCreditScore },
      { href: "/industry-report", label: "Industry Report", icon: Icon3DNewspaper },
      { href: "/material-creditors", label: "Material Creditors", icon: Icon3DScales },
      { href: "/initial-public-offer", label: "Initial Public Offer", icon: Icon3DPresentation },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileInvestorGroup, setMobileInvestorGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);
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

  // Throttled scroll listener: handles initial capsule transition & upward hide/reveal
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const lastScrollY = lastScrollYRef.current;
          const diff = currentScrollY - lastScrollY;

          // 1. Initial capsule shrink trigger (Design 100% untouched)
          const scrolled = currentScrollY > 25;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          // 2. Upward Hide / Reveal: as initial animation completes and user scrolls a little further, hide upward
          if (currentScrollY <= 40) {
            setIsHidden(false);
          } else if (currentScrollY > 90 && diff > 8) {
            setIsHidden(true);
          } else if (diff < -8) {
            setIsHidden(false);
          }

          lastScrollYRef.current = currentScrollY;
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

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileDropdown(null);
    setMobileInvestorGroup(null);
    closeDropdowns();
  };

  // Auto-close menus whenever route changes (guarantees phone drawer closes on navigation)
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdown(null);
    setMobileInvestorGroup(null);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock background scroll & pause Lenis while mobile drawer is open so phone touch-scrolling works cleanly inside drawer
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (lenis && typeof lenis.stop === "function") {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [isOpen]);

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeDropdowns();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
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
        setMobileDropdown(null);
        setMobileInvestorGroup(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldHide = isHidden && !isOpen && !activeDropdown;

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex justify-center pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        shouldHide ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* Floating Island Capsule with Scroll Shrink Animation (Design 100% Untouched) */}
      <div
        ref={navRef}
        className={cn(
          "relative z-50 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(13,36,64,0.08)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] transform-gpu will-change-[width,max-width,margin,border-radius]",
          isScrolled
            ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-6xl xl:max-w-7xl h-14 sm:h-[60px] px-4 sm:px-6 rounded-xl sm:rounded-2xl mt-2.5 sm:mt-3 border shadow-[0_16px_45px_rgba(13,36,64,0.12)]"
            : "w-full max-w-full h-16 sm:h-[72px] px-5 sm:px-8 xl:px-12 rounded-none border-b border-x-0 border-t-0 mt-0"
        )}
      >
        {/* Left: Official Brand Logo Mark */}
        <Link href="/" className="flex items-center group shrink-0" onClick={closeMobileMenu}>
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
            type="button"
            className="lg:hidden text-[#0D2440] dark:text-white hover:text-[#2E5E99] p-2 transition-colors cursor-pointer"
            onClick={() => {
              if (isOpen) {
                closeMobileMenu();
              } else {
                closeDropdowns();
                setIsOpen(true);
              }
            }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Megamenus Only (Hidden on Phone/Tablet so they never collide with Mobile Drawer) */}
      <div className="hidden lg:block">
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
      </div>

      {/* Mobile Navigation Drawer & Backdrop (Phone/Tablet Only) */}
      {isOpen && (
        <>
          {/* Click-outside Backdrop */}
          <div
            data-lenis-prevent="true"
            onClick={closeMobileMenu}
            className="pointer-events-auto lg:hidden fixed inset-0 bg-[#0D2440]/35 dark:bg-black/55 backdrop-blur-[2px] z-40"
            aria-hidden="true"
          />

          {/* Scrollable Mobile Drawer */}
          <div
            data-lenis-prevent="true"
            style={{ WebkitOverflowScrolling: "touch" }}
            className="pointer-events-auto lg:hidden fixed left-3 sm:left-6 right-3 sm:right-6 top-[4.5rem] sm:top-[5.25rem] bg-white/98 dark:bg-[#0c1527]/98 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-3xl p-4 sm:p-5 pb-6 text-[#0D2440] dark:text-white shadow-2xl flex flex-col gap-1.5 max-h-[calc(100dvh-5.5rem)] sm:max-h-[calc(100dvh-6.25rem)] overflow-y-auto overscroll-contain touch-pan-y animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          >
            {navLinks.map((link) => {
              const isActive = isNavActive(link);
              const activeItemClass =
                "bg-[#EFF6FF] dark:bg-[#2563EB]/20 text-[#2563EB] dark:text-[#93C5FD] font-bold rounded-xl px-3.5";
              const inactiveItemClass =
                "text-[#0D2440] dark:text-white hover:text-[#2563EB] dark:hover:text-[#93C5FD] border-b border-slate-200/70 dark:border-white/10 px-2";

              return (
                <div key={link.name} className="flex flex-col shrink-0">
                  {link.name === "Products" ? (
                    <>
                      <button
                        type="button"
                        className={cn(
                          "flex items-center justify-between py-2.5 text-sm font-semibold transition-all w-full text-left cursor-pointer",
                          isActive ? activeItemClass : inactiveItemClass
                        )}
                        onClick={() => {
                          setMobileDropdown(mobileDropdown === "Products" ? null : "Products");
                          setMobileInvestorGroup(null);
                        }}
                      >
                        <span>Products</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform shrink-0", mobileDropdown === "Products" && "rotate-180 text-[#2563EB]", isActive && "text-[#2563EB] dark:text-[#93C5FD]")} />
                      </button>
                      {mobileDropdown === "Products" && (
                        <div className="p-2.5 bg-slate-50/90 dark:bg-white/[0.04] rounded-2xl my-1.5 border border-slate-200/70 dark:border-white/10">
                          <div className="grid grid-cols-2 gap-2">
                            {MOBILE_PRODUCTS_ITEMS.map((item) => {
                              const ItemIcon = item.icon;
                              const isItemActive =
                                item.href === "/products"
                                  ? pathname === "/products"
                                  : false;

                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={closeMobileMenu}
                                  className={cn(
                                    "flex flex-col items-center justify-center text-center gap-1.5 p-2.5 rounded-xl border transition-all",
                                    isItemActive
                                      ? "bg-[#EFF6FF] dark:bg-[#0D2440] border-[#BFDBFE] dark:border-[#3B82F6]/50 text-[#2563EB] dark:text-[#93C5FD] font-bold"
                                      : "bg-white dark:bg-[#0D2440]/40 border-slate-200/80 dark:border-white/10 text-[#0D2440] dark:text-white/90 hover:border-[#2563EB]/40"
                                  )}
                                >
                                  <ItemIcon isHovered={isItemActive} size="xs" />
                                  <span className="text-[11px] font-semibold leading-tight">
                                    {item.label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : link.name === "Investor Relation" ? (
                    <>
                      <button
                        type="button"
                        className={cn(
                          "flex items-center justify-between py-2.5 text-sm font-semibold transition-all w-full text-left cursor-pointer",
                          isActive ? activeItemClass : inactiveItemClass
                        )}
                        onClick={() => {
                          const next = mobileDropdown === "Investor Relation" ? null : "Investor Relation";
                          setMobileDropdown(next);
                          if (!next) setMobileInvestorGroup(null);
                        }}
                      >
                        <span>Investor Relation</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform shrink-0", mobileDropdown === "Investor Relation" && "rotate-180 text-[#2563EB]", isActive && "text-[#2563EB] dark:text-[#93C5FD]")} />
                      </button>
                      {mobileDropdown === "Investor Relation" && (
                        <div className="p-2.5 space-y-2 bg-slate-50/90 dark:bg-white/[0.04] rounded-2xl my-1.5 border border-slate-200/70 dark:border-white/10 text-xs">
                          {MOBILE_INVESTOR_GROUPS.map((group) => {
                            const GroupIcon = group.icon;
                            const isGroupActive = group.href
                              ? isRouteMatch(group.href)
                              : Boolean(group.items?.some((sub) => isRouteMatch(sub.href)));
                            const isGroupExpanded = mobileInvestorGroup === group.id;

                            if (group.href && !group.items) {
                              return (
                                <Link
                                  key={group.id}
                                  href={group.href}
                                  onClick={closeMobileMenu}
                                  className={cn(
                                    "flex items-center gap-3 p-2 rounded-xl border font-semibold transition-all",
                                    isGroupActive
                                      ? "bg-[#EFF6FF] dark:bg-[#0D2440] border-[#BFDBFE] dark:border-[#3B82F6]/50 text-[#2563EB] dark:text-[#93C5FD] font-bold"
                                      : "bg-white dark:bg-[#0D2440]/40 border-slate-200/80 dark:border-white/10 text-[#0D2440] dark:text-white/90 hover:border-[#2563EB]/40"
                                  )}
                                >
                                  <div className="shrink-0">
                                    <GroupIcon isHovered={isGroupActive} size="xs" />
                                  </div>
                                  <span className="text-xs font-bold leading-snug">{group.title}</span>
                                </Link>
                              );
                            }

                            return (
                              <div key={group.id} className="flex flex-col">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileInvestorGroup(isGroupExpanded ? null : group.id)
                                  }
                                  className={cn(
                                    "flex items-center justify-between gap-2 p-2 rounded-xl border font-semibold transition-all w-full text-left cursor-pointer",
                                    isGroupActive || isGroupExpanded
                                      ? "bg-[#EFF6FF] dark:bg-[#0D2440] border-[#BFDBFE] dark:border-[#3B82F6]/50 text-[#2563EB] dark:text-[#93C5FD] font-bold"
                                      : "bg-white dark:bg-[#0D2440]/40 border-slate-200/80 dark:border-white/10 text-[#0D2440] dark:text-white/90 hover:border-[#2563EB]/40"
                                  )}
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="shrink-0">
                                      <GroupIcon isHovered={isGroupActive || isGroupExpanded} size="xs" />
                                    </div>
                                    <span className="text-xs font-bold leading-snug truncate">
                                      {group.title}
                                    </span>
                                  </div>
                                  <ChevronDown
                                    className={cn(
                                      "w-4 h-4 transition-transform shrink-0 mr-1",
                                      isGroupExpanded && "rotate-180 text-[#2563EB] dark:text-[#93C5FD]"
                                    )}
                                  />
                                </button>
                                {isGroupExpanded && group.items && (
                                  <div className="grid grid-cols-2 gap-2 pt-2 pb-1 px-0.5">
                                    {group.items.map((item) => {
                                      const SubIcon = item.icon;
                                      const isSubActive = isRouteMatch(item.href);

                                      return (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          onClick={closeMobileMenu}
                                          className={cn(
                                            "flex flex-col items-center justify-center text-center gap-1.5 p-2.5 rounded-xl border transition-all",
                                            isSubActive
                                              ? "bg-[#EFF6FF] dark:bg-[#0D2440] border-[#BFDBFE] dark:border-[#3B82F6]/50 text-[#2563EB] dark:text-[#93C5FD] font-bold"
                                              : "bg-white dark:bg-[#0D2440]/50 border-slate-200/80 dark:border-white/10 text-[#0D2440]/90 dark:text-white/85 hover:border-[#2563EB]/40"
                                          )}
                                        >
                                          <SubIcon isHovered={isSubActive} size="xs" />
                                          <span className="text-[11px] font-semibold leading-tight line-clamp-2">
                                            {item.label}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : link.name === "Media" ? (
                    <>
                      <button
                        type="button"
                        className={cn(
                          "flex items-center justify-between py-2.5 text-sm font-semibold transition-all w-full text-left cursor-pointer",
                          isActive ? activeItemClass : inactiveItemClass
                        )}
                        onClick={() => {
                          setMobileDropdown(mobileDropdown === "Media" ? null : "Media");
                          setMobileInvestorGroup(null);
                        }}
                      >
                        <span>Media</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform shrink-0", mobileDropdown === "Media" && "rotate-180 text-[#2563EB]", isActive && "text-[#2563EB] dark:text-[#93C5FD]")} />
                      </button>
                      {mobileDropdown === "Media" && (
                        <div className="p-2.5 bg-slate-50/90 dark:bg-white/[0.04] rounded-2xl my-1.5 border border-slate-200/70 dark:border-white/10">
                          <div className="grid grid-cols-2 gap-2">
                            {MOBILE_MEDIA_ITEMS.map((item) => {
                              const ItemIcon = item.icon;
                              const isItemActive = isRouteMatch(item.href);

                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={closeMobileMenu}
                                  className={cn(
                                    "flex flex-col items-center justify-center text-center gap-1.5 p-2.5 rounded-xl border transition-all",
                                    isItemActive
                                      ? "bg-[#EFF6FF] dark:bg-[#0D2440] border-[#BFDBFE] dark:border-[#3B82F6]/50 text-[#2563EB] dark:text-[#93C5FD] font-bold"
                                      : "bg-white dark:bg-[#0D2440]/40 border-slate-200/80 dark:border-white/10 text-[#0D2440] dark:text-white/90 hover:border-[#2563EB]/40"
                                  )}
                                >
                                  <ItemIcon isHovered={isItemActive} size="xs" />
                                  <span className="text-[11px] font-semibold leading-tight">
                                    {item.label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href || "#"}
                      onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
              className="mt-3 shrink-0 flex items-center justify-center gap-2 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-sans font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-colors shadow-md"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
