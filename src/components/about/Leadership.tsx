"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { Linkedin } from "@/components/shared/BrandIcons";

const leaders = [
  {
    name: "Mr. Jignesh Panchal",
    role: "Managing Director",
    image: "/leader_1.png",
    bio: "Guiding the strategic vision, capital allocation, and global OEM expansion of J Pan Tubular since inception.",
    email: "mailto:jignesh@jpantubular.com",
    linkedin: "#",
  },
  {
    name: "Mr. Jugal Jignesh Panchal",
    role: "Whole-time Director",
    image: "/leader_2.png",
    bio: "Driving multi-plant operational discipline, robotic CNC bending automation, and supply chain synchronization.",
    email: "mailto:jugal@jpantubular.com",
    linkedin: "#",
  },
  {
    name: "Mrs. Dina Panchal",
    role: "Whole-time Director",
    image: "/leader_3.png",
    bio: "Leading organizational culture, institutional HR governance, and corporate stakeholder administration.",
    email: "mailto:dina@jpantubular.com",
    linkedin: "#",
  },
  {
    name: "Mr. Navneet Bhardwaj",
    role: "Whole-time Director",
    image: "/leader_1.png",
    bio: "Spearheading advanced business development, technical metallurgy client relations, and market footprint expansion.",
    email: "mailto:navneet@jpantubular.com",
    linkedin: "#",
  },
];

// Individual Executive Card with Dual Parallax and Slide-Up Hover Reveal for Name & Description
function ParallaxLeaderCard({
  leader,
  idx,
}: {
  leader: (typeof leaders)[number];
  idx: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Scroll-driven parallax: Photo glides vertically inside the card frame
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Subtle alternating vertical float on scroll across columns
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    idx % 2 === 0 ? [-10, 10] : [10, -10]
  );

  // 2. Interactive mouse 3D parallax tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width - 0.5) * 2;
    const normalizedY = (y / rect.height - 0.5) * 2;

    setTilt({
      rotateX: -normalizedY * 8, // 8 deg tilt on X
      rotateY: normalizedX * 8,  // 8 deg tilt on Y
    });
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y: cardY }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="[perspective:1200px] h-full"
    >
      <motion.div
        whileHover={{
          y: -8,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transition: { type: "spring", stiffness: 280, damping: 22 },
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-[#7BA4D0]/30 dark:border-white/15 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all duration-500 group transform-gpu cursor-pointer bg-slate-900"
      >
        {/* Parallax Background Portrait */}
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 w-full h-[120%] -top-[10%] z-0"
        >
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover object-top filter contrast-105 group-hover:scale-108 group-hover:brightness-90 transition-all duration-700 ease-out"
          />
        </motion.div>

        {/* Ambient Default Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-30" />

        {/* Specular Spotlight Gleam */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-15"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 94, 153, 0.25), transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* Reactive Specular Border Beam on Hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-500 z-15"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(123, 164, 208, 0.5), transparent 70%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
          aria-hidden="true"
        />

        {/* SLIDE-UP HOVER DRAWER: Name, Role & Description come smoothly on hover */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 bg-gradient-to-t from-[#060D18]/95 via-[#060D18]/85 to-transparent backdrop-blur-md border-t border-white/10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out z-30 flex flex-col justify-end pointer-events-auto">
          <div className="space-y-2">
            <div className="text-xs font-heading font-bold tracking-wider uppercase text-[#7BA4D0]">
              {leader.role}
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight">
              {leader.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              {leader.bio}
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <a
                href={leader.email}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#2E5E99] text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label={`Email ${leader.name}`}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href={leader.linkedin}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#2E5E99] text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label={`LinkedIn profile of ${leader.name}`}
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Leadership() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="leadership"
      ref={containerRef}
      className="relative py-20 md:py-36 bg-slate-50/50 dark:bg-[#071321] text-[#0D2440] dark:text-white transition-colors duration-300 border-b border-[#7BA4D0]/20 dark:border-white/10 overflow-hidden"
    >
      <div className="container-custom relative z-10 w-full">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-[#0D2440] dark:text-white max-w-2xl">
              Leadership driving <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-light italic">
                institutional excellence.
              </span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#0D2440]/75 dark:text-white/75 font-light leading-relaxed max-w-md">
            Decades of specialized engineering mastery directing over 65,000 MT of annual production capacity across 6 facilities.
          </p>
        </motion.div>

        {/* Premium Executive Card Grid with Parallax Effect & Hover Slide-Up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {leaders.map((leader, idx) => (
            <ParallaxLeaderCard key={leader.name} leader={leader} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
