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

const motionComponents: Record<string, React.ComponentType<any>> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  span: motion.span,
  div: motion.div,
};

export function ScrollWipeHeading({
  as: Component = "h2",
  children,
  className = "",
  revealedColor = "currentColor", // Respects Tailwind text color (e.g. text-white, text-[#0D2440])
  wipingColor = "#2E5E99", // JPan Blue
  unrevealedColor = "rgba(156, 163, 175, 0.35)", // Muted grey/transparent
}: ScrollWipeHeadingProps) {
  const textRef = useRef<HTMLElement>(null);

  // Use a motion value that animates from 0 to 100 when in view
  const percentage = useMotionValue(0);
  const isInView = useInView(textRef, { once: true, amount: 0.25, margin: "0px 0px -40px 0px" });

  React.useEffect(() => {
    if (isInView) {
      percentage.set(0);
      const controls = animate(percentage, 100, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      });
      return () => controls.stop();
    }
  }, [isInView, percentage]);

  // Linear gradient for text clip wipe
  const bgImage = useMotionTemplate`linear-gradient(to right, ${revealedColor} calc(${percentage}% - 12%), ${wipingColor} ${percentage}%, ${unrevealedColor} calc(${percentage}% + 5%))`;

  const MotionComponent = motionComponents[Component] || motion.h2;

  return (
    <MotionComponent
      ref={textRef}
      className={`w-fit ${className.includes("block") ? "" : "inline-block"} pb-[0.2em] -mb-[0.2em] pr-[0.1em] overflow-visible [&_*]:[background-image:inherit] [&_*]:[background-clip:text] [&_*]:[-webkit-background-clip:text] [&_*]:[-webkit-text-fill-color:transparent] ${className}`}
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
