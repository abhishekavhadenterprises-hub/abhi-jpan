"use client";

import React, { useRef } from "react";
import { motion, useInView, useMotionValue, animate, useMotionTemplate } from "framer-motion";

interface ScrollWipeHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  children: React.ReactNode;
  className?: string;
  revealedColor?: string;
  wipingColor?: string;
  unrevealedColor?: string;
}

export function ScrollWipeHeading({
  as: Component = "h2",
  children,
  className = "",
  revealedColor = "currentColor", // Respects Tailwind text color (e.g. text-white, text-[#0D2440])
  wipingColor = "#2E5E99", // JPan Blue
  unrevealedColor = "rgba(156, 163, 175, 0.4)", // Muted grey/transparent
}: ScrollWipeHeadingProps) {
  const textRef = useRef<HTMLElement>(null);

  // Use a motion value that animates from 0 to 100 when in view
  const percentage = useMotionValue(0);
  const isInView = useInView(textRef, { once: true, amount: 0.3 });

  React.useEffect(() => {
    if (isInView) {
      animate(percentage, 100, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, percentage]);

  // Linear gradient for text clip wipe
  const bgImage = useMotionTemplate`linear-gradient(to right, ${revealedColor} calc(${percentage}% - 12%), ${wipingColor} ${percentage}%, ${unrevealedColor} calc(${percentage}% + 5%))`;

  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      ref={textRef}
      className={`w-fit inline-block ${className}`}
      style={{
        backgroundImage: bgImage,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        /* We DO NOT set color: "transparent" here, so that Tailwind's text-* classes can set the 'currentColor' which is used by the gradient! */
      }}
    >
      {children}
    </MotionComponent>
  );
}
