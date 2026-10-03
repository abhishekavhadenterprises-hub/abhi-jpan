"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BrandLetter {
  id: string;
  char: string;
}

const LETTERS: BrandLetter[] = [
  { id: "j", char: "J" },
  { id: "p", char: "P" },
  { id: "a", char: "A" },
  { id: "n", char: "N" },
];

export function KineticBrandJPan() {
  const [spinningIndex, setSpinningIndex] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    let timeoutIds: NodeJS.Timeout[] = [];

    const startScanSequence = () => {
      // 0: Logo, 1: J, 2: P, 3: A, 4: N
      [0, 1, 2, 3, 4].forEach((idx) => {
        const tid = setTimeout(() => {
          setSpinningIndex(idx);
        }, idx * 350);
        timeoutIds.push(tid);
      });

      // Clear active spin after sequence finishes so all remain perfectly straight
      const finishTid = setTimeout(() => {
        setSpinningIndex(-1);
      }, 5 * 350 + 1000);
      timeoutIds.push(finishTid);
    };

    // Initial start after 1s
    const initialTid = setTimeout(startScanSequence, 1000);
    timeoutIds.push(initialTid);

    // Repeat cycle every 2 seconds after sequence completes
    const interval = setInterval(startScanSequence, 4800);

    return () => {
      clearInterval(interval);
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [isHovered]);

  return (
    <div
      className="relative w-full select-none py-6 sm:py-8 my-2 overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpinningIndex(-1);
      }}
    >
      {/* Main Row */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto px-4 perspective-[1000px]">
        {/* ========================================================
            PART 1: 3D LOGO EMBLEM
           ======================================================== */}
        <div className="relative group cursor-pointer mr-1 sm:mr-4 shrink-0">
          <Link href="/" aria-label="J Pan Brand Logo">
            <motion.div
              className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#1E4373] via-[#0D2440] to-[#081729] border border-[#2E5E99]/30 flex flex-col items-center justify-center font-heading font-black text-white"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: spinningIndex === 0 ? 360 : 0,
              }}
              transition={{
                duration: 1.0,
                ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier slow motion
              }}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.2 },
              }}
            >
              {/* Front Face */}
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="flex items-center gap-1 text-base sm:text-xl md:text-2xl tracking-tighter">
                  <span className="bg-gradient-to-b from-white via-[#E7F0FA] to-[#7BA4D0] bg-clip-text text-transparent">
                    JP
                  </span>
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#7BA4D0]" />
                </div>
                <span className="text-[7px] sm:text-[8px] font-heading tracking-widest text-[#7BA4D0] uppercase font-bold">
                  TUBULAR
                </span>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="flex items-center gap-1 text-base sm:text-xl md:text-2xl tracking-tighter">
                  <span className="bg-gradient-to-b from-white via-[#E7F0FA] to-[#7BA4D0] bg-clip-text text-transparent">
                    JP
                  </span>
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#7BA4D0]" />
                </div>
                <span className="text-[7px] sm:text-[8px] font-heading tracking-widest text-[#7BA4D0] uppercase font-bold">
                  TUBULAR
                </span>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Clean Divider Line */}
        <div className="h-8 sm:h-12 w-[1px] bg-slate-200 dark:bg-slate-300 mr-1 sm:mr-3 hidden xs:block" />

        {/* ========================================================
            PART 2: HIGH-CONTRAST LETTERS "J - P - A - N" FOR WHITE BG
           ======================================================== */}
        <div className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
          {LETTERS.map((item, idx) => {
            const letterIndex = idx + 1; // 1 for J, 2 for P, 3 for A, 4 for N
            const isSpinning = spinningIndex === letterIndex;

            return (
              <div key={item.id} className="relative group cursor-pointer">
                <motion.div
                  className="relative flex items-center justify-center"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateY: isSpinning ? 360 : 0,
                  }}
                  transition={{
                    duration: 1.0,
                    ease: [0.4, 0, 0.2, 1], // Fluid slow-motion easing, lands exactly straight at 360°/0°
                  }}
                  whileHover={{
                    scale: 1.08,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Front Face (Deep Navy on White Background, like Planux) */}
                  <span
                    className="relative block font-heading font-black tracking-tight text-[clamp(3rem,7.5vw,5.75rem)] leading-none select-none text-[#0D2440]"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {item.char}
                  </span>

                  {/* Back Face (Reads correctly forward so it never looks inverted during 360° spin) */}
                  <span
                    aria-hidden="true"
                    className="absolute font-heading font-black tracking-tight text-[clamp(3rem,7.5vw,5.75rem)] leading-none select-none pointer-events-none text-[#0D2440]"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {item.char}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
