"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function PrecisionNutNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubscribed(true);
    toast.success("Subscribed successfully!");
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <div className="w-full flex justify-center px-2 sm:px-0">
      {/* Centered card with reduced horizontal width matching the reference image */}
      <div className="relative w-full max-w-3xl xl:max-w-[840px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#2868E8] via-[#3374F5] to-[#3D80FF] text-white p-4 sm:p-6 lg:p-7">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Left Side: 3D Floating Nut with Sparkles */}
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
              {/* Sparkles matching Image 2 */}
              <motion.span
                className="absolute top-0 left-2 text-white text-xs select-none pointer-events-none opacity-90"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.span>
              <motion.span
                className="absolute top-2 right-1 text-white text-[10px] select-none pointer-events-none opacity-80"
                animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                ✦
              </motion.span>

              {/* Floor Shadow */}
              <motion.div
                className="absolute bottom-1 w-12 sm:w-16 h-3 bg-black/20 rounded-full blur-xs"
                animate={{
                  scale: [1, 0.85, 1],
                  opacity: [0.3, 0.15, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating 3D Brass Nut */}
              <motion.div
                className="relative w-12 h-14 sm:w-14 sm:h-18 cursor-pointer"
                animate={{
                  y: [-3, 3, -3],
                  rotateY: [-8, 12, -8],
                  rotateZ: [-2, 2, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 20,
                  transition: { duration: 0.3 },
                }}
                style={{
                  perspective: 600,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src="/products/brass_nut_solo.png"
                  alt="Precision Brass Nut"
                  fill
                  className="object-contain filter brightness-110 contrast-105 select-none pointer-events-none"
                  priority
                />

                {/* Specular Gleam Sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none rounded-lg"
                  animate={{
                    x: ["-130%", "230%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold font-heading text-white tracking-tight leading-snug">
                Subscribe to our newsletter to get updates to our latest collections
              </h3>
              <p className="text-white/85 text-[11px] sm:text-xs leading-relaxed">
                Get 20% off on your first order just by subscribing to our newsletter
              </p>
            </div>
          </div>

          {/* Right Side: White Pill Input */}
          <div className="w-full md:w-auto md:min-w-[280px] lg:min-w-[340px] shrink-0 space-y-1.5">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center bg-white/20 hover:bg-white/25 border border-white/35 focus-within:border-white focus-within:bg-white/30 rounded-full p-1 sm:p-1.5 backdrop-blur-md transition-all duration-300">
                <div className="pl-3 pr-1.5 text-white/90">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/70 focus:outline-none pr-2 min-w-0 font-sans"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1 px-4 sm:px-5 py-1.5 rounded-full bg-white hover:bg-white/90 text-[#2563EB] font-heading font-bold text-xs transition-all duration-300 cursor-pointer shrink-0"
                >
                  {isSubscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </div>
            </form>

            {/* Unsubscribe note */}
            <p className="text-[10px] sm:text-[11px] text-white/75 text-center md:text-left font-sans">
              You will be able to unsubscribe at any time. Read our privacy policy{" "}
              <Link href="/privacy" className="underline hover:text-white font-medium">
                here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
