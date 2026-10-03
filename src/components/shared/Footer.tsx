"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll position for cinematic reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Track scroll for the text wipe animation (expanded offset for a slower, smoother scrub)
  const { scrollYProgress: wipeProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 1,
    restDelta: 0.001,
  });

  const smoothWipe = useSpring(wipeProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Inner content floats up and fades in as footer enters screen
  const y = useTransform(smoothProgress, [0, 1], [150, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1]);

  // Wipe percentage for CTA (goes to 120% so the gradient completes fully off-screen)
  const ctaPercentage = useTransform(smoothWipe, [0, 1], [0, 120]);
  
  // Diagonal wipe for multi-line CTA text
  const ctaBgImage = useMotionTemplate`linear-gradient(135deg, #111111 calc(${ctaPercentage}% - 12%), #2E5E99 ${ctaPercentage}%, #CCCCCC calc(${ctaPercentage}% + 5%))`;
  
  // Sequential wipe percentages for JPAN and TUBULAR
  const jpanPercentage = useTransform(smoothWipe, [0, 0.5], [0, 120]);
  const tubularPercentage = useTransform(smoothWipe, [0.4, 1], [0, 120]);

  // Horizontal wipe for JPAN (wipes to Black)
  const jpanBgImage = useMotionTemplate`linear-gradient(to right, #111111 calc(${jpanPercentage}% - 12%), #2E5E99 ${jpanPercentage}%, #EEEEEE calc(${jpanPercentage}% + 5%))`;
  
  // Horizontal wipe for TUBULAR (wipes to Blue)
  const tubularBgImage = useMotionTemplate`linear-gradient(to right, #2E5E99 calc(${tubularPercentage}% - 12%), #2E5E99 ${tubularPercentage}%, #EEEEEE calc(${tubularPercentage}% + 5%))`;

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Quality", href: "/quality" },
    { name: "Infrastructure", href: "/about#infrastructure" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer
      ref={containerRef}
      className="relative z-30 bg-white text-[#111] font-sans overflow-hidden rounded-t-[2.5rem] border-t border-gray-200"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="w-full relative z-10 will-change-transform px-6 md:px-12 pt-16 pb-6 max-w-[1600px] mx-auto flex flex-col justify-between min-h-[60vh]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* CTA */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] tracking-[0.2em] text-gray-500 uppercase font-medium">
                Let's Build The Future
              </span>
            </div>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tighter leading-[1.05] mb-8"
              style={{ 
                backgroundImage: ctaBgImage,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              READY TO ENGINEER <br />
              PRECISION?
            </motion.h2>
            
            <a
              href="mailto:sales@jpantubular.com"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#111] text-white font-semibold text-xs uppercase tracking-widest overflow-hidden transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-[#2E5E99] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
              <span className="relative z-10 transition-colors duration-500">Contact Sales</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-all duration-500 group-hover:rotate-45" />
            </a>
          </div>

          {/* Links & Info */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-bold mb-4">Navigation</h4>
                <nav className="flex flex-col gap-2.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm font-light text-gray-500 hover:text-[#111] hover:translate-x-1.5 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <h4 className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-bold mb-4">Location</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  Neemrana, Rajasthan <br />
                  Sanand, Gujarat <br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Base Divider & Text */}
        <div className="border-t border-gray-200 pt-6 flex flex-col items-center mt-auto">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative h-10 w-28 md:h-12 md:w-36">
              <Image
                src="/images/jpan-logo-transparent.png"
                alt="J Pan Tubular Components Ltd"
                fill
                className="object-contain object-left opacity-60 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="flex gap-4 text-[9px] uppercase tracking-widest text-gray-400">
              <span>© {new Date().getFullYear()} JPan Tubular.</span>
              <Link href="#" className="hover:text-[#111] transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-[#111] transition-colors">Terms</Link>
            </div>
          </div>

          <div className="w-full flex justify-center items-center pointer-events-none select-none pb-2 gap-4 md:gap-6">
            <motion.span 
              className="text-[11vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap"
              style={{
                backgroundImage: jpanBgImage,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              JPAN
            </motion.span>
            <motion.span 
              className="text-[11vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap"
              style={{
                backgroundImage: tubularBgImage,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              TUBULAR
            </motion.span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
