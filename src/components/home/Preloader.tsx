"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onCurtainOpen?: () => void;
  onCurtainComplete?: () => void;
}

export function Preloader({ onCurtainOpen, onCurtainComplete }: PreloaderProps) {
  const [showLogo, setShowLogo] = useState(true);
  const [isCurtainUp, setIsCurtainUp] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Cinematic choreography:
    // 1. Logo displays with smooth ease (0ms - 900ms)
    // 2. Logo gently fades out (at 950ms)
    // 3. Arched curtain wipe smoothly pulls up (at 1250ms)
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 950);

    const curtainTimer = setTimeout(() => {
      setIsCurtainUp(true);
    }, 1200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(curtainTimer);
    };
  }, []);

  // Completely unmount once finished
  if (isFinished) return null;

  // Initial and exit paths for the cinematic arched curtain wipe
  const initialPath = "M 0 0 L 1000 0 L 1000 1000 Q 500 1000 0 1000 Z";

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden select-none">
      {/* Light Blue SVG Arched Curtain Mask */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d={initialPath}
          animate={
            isCurtainUp
              ? {
                  d: [
                    "M 0 0 L 1000 0 L 1000 1000 Q 500 1000 0 1000 Z",
                    "M 0 0 L 1000 0 L 1000 180 Q 500 620 0 180 Z",
                    "M 0 0 L 1000 0 L 1000 0 Q 500 0 0 0 Z",
                  ],
                }
              : { d: initialPath }
          }
          transition={{
            duration: 1.1,
            times: [0, 0.52, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={() => {
            if (isCurtainUp) {
              setIsFinished(true);
              onCurtainComplete?.();
            }
          }}
          fill="#7BA4D0"
        />
      </svg>

      {/* Preloader Content: Pure Brand Logo Only (No lines, No numbers, No %) */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.97,
              transition: { duration: 0.35, ease: "easeInOut" },
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10 px-6 select-none"
          >
            {/* J Pan Official Brand Monogram & Logo */}
            <div className="relative w-52 sm:w-64 md:w-72 lg:w-80 aspect-[963/384]">
              <Image
                src="/images/jpan-logo.png"
                alt="J Pan Tubular Components Ltd"
                fill
                priority
                className="object-contain drop-shadow-[0_4px_20px_rgba(13,36,64,0.18)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
