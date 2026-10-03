"use client";

import React, { useRef, ReactNode, MouseEvent } from "react";
import "./SpotlightCard.css";

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  zoomOnHover?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(46, 94, 153, 0.12)",
  zoomOnHover = false,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${zoomOnHover ? "transition-transform duration-300 ease-out hover:scale-[1.015]" : ""} ${className}`}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
