"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const related = [
  {
    title: "Understanding CNC Bending Tolerances",
    time: "7 Min",
    date: "Sept 12, 2025",
    category: "Engineering",
    image: "/images/about-hero.png",
    content: [
      "An expert guide to achieving +/- 0.5mm precision in complex multi-plane bends.",
      "Complex HVAC branching, headers, and evaporator tubing require strict multi-axis CNC bending tolerances to prevent springback and wall thinning.",
      "Using multi-stack electric CNC bending machines with mandrel support, J Pan Tubular achieves zero ovality at tight bend radii while preserving wall thickness integrity."
    ]
  },
  {
    title: "The Impact of Solar Integration on Factory Floor",
    time: "4 Min",
    date: "Sept 30, 2025",
    category: "Sustainability",
    image: "/images/about-manufacturing.png",
    content: [
      "Detailing our recent solar integration and waste reduction strategies across the floor.",
      "Our A2 manufacturing plant features a dedicated rooftop solar installation, cutting industrial carbon emissions and powering clean energy production.",
      "In addition, our closed-loop water treatment and 100% scrap metal recycling ensure environmental compliance with global ISO 14001 green standards."
    ]
  },
  {
    title: "HVAC Market Trends for 2026",
    time: "7 Min",
    date: "Oct 28, 2025",
    category: "Market Outlook",
    image: "/images/industry-hvac.png",
    content: [
      "Exploring upcoming global refrigerant regulations (R32 & R454B) and their impact on OEM copper distributor and header designs.",
      "As high-efficiency VRF systems dominate commercial real estate, multi-port refnet joints and sub-cooled condenser loops are seeing unprecedented demand.",
      "J Pan Tubular is scaling production across 6 plants to meet 2026 thermal efficiency benchmarks."
    ]
  }
];

interface RelatedArticlesProps {
  onReadMore?: (article: any) => void;
}

export function RelatedArticles({ onReadMore }: RelatedArticlesProps) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < related.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 dark:bg-black/30 border-t border-slate-200/70 dark:border-white/5 transition-colors">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 rounded-full bg-[#2E5E99]" />
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
              You May Also <span className="text-[#2E5E99] dark:text-[#7BA4D0]">Like</span>
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="text-xs sm:text-sm font-semibold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider hover:text-[#0D2440] dark:hover:text-white transition-colors"
          >
            View All Insights
          </Link>
        </div>

        <div className="flex flex-col justify-between w-full">
          <div 
            ref={cardsRef}
            onScroll={handleMobileScroll}
            className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            {related.map((art, idx) => (
              <div 
                key={idx} 
                onClick={() => onReadMore && onReadMore({
                  title: art.title,
                  date: art.date,
                  time: art.time,
                  category: art.category,
                  author: "Engineering Division",
                  image: art.image,
                  content: art.content
                })}
                className="group relative bg-white dark:bg-[#0c1527] border border-slate-200/80 dark:border-white/10 rounded-3xl overflow-hidden hover:border-[#2E5E99]/50 transition-all duration-300 cursor-pointer w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                      <Clock className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                      <span>{art.time} Read</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0D2440] dark:text-white mb-4 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors line-clamp-2 leading-[1.25]">
                      {art.title}
                    </h3>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2E5E99] dark:text-[#7BA4D0] group-hover:translate-x-1 transition-transform">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-10">
            {related.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (cardsRef.current && cardsRef.current.children[i]) {
                    cardsRef.current.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-6 bg-[#2E5E99]" : "w-1.5 bg-slate-300 dark:bg-white/20"
                )}
                aria-label={`Go to related article card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
