"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

export const articles = [
  {
    id: 1,
    title: "Optimizing Thermal Conductivity in Copper Assemblies",
    date: "Oct 28, 2025",
    time: "5 Min",
    category: "Technical",
    image: "/images/industry-hvac.png",
    desc: "A deep dive into material grain structure and its impact on heat exchange efficiency.",
    content: [
      "A deep dive into material grain structure and its impact on heat exchange efficiency.",
      "At J Pan Tubular Components Limited, we specialize in high-purity C12200 Deoxidized High Residual Phosphorus (DHP) copper to maximize thermal performance while maintaining structural ductility.",
      "By optimizing grain refinement during CNC bending and end-forming operations, our assemblies minimize internal thermal resistance, allowing HVAC coils and heat exchangers to achieve superior thermal transfer rates."
    ]
  },
  {
    id: 2,
    title: "Industry 4.0: The Connected Factory of the Future",
    date: "Oct 15, 2025",
    time: "6 Min",
    category: "Technology",
    image: "/images/about-manufacturing.png",
    desc: "How real-time data monitoring is reducing defect rates in high-volume production.",
    content: [
      "How real-time data monitoring is reducing defect rates in high-volume production.",
      "Our 6 manufacturing plants integrate IoT sensors, automated vision inspection, and real-time SPC tracking across automated rotary bending and brazing lines.",
      "This connected ecosystem provides total traceability and instant quality feedback, keeping our defect rate below 0.01% across global OEM shipments."
    ]
  },
  {
    id: 3,
    title: "Sustainable Manufacturing: Our Path to Net Zero",
    date: "Sept 30, 2025",
    time: "4 Min",
    category: "Company",
    image: "/images/industry-industrial.png",
    desc: "Detailing our recent solar integration and waste reduction strategies across the floor.",
    content: [
      "Detailing our recent solar integration and waste reduction strategies across the floor.",
      "Our A2 manufacturing plant features a dedicated rooftop solar installation, cutting industrial carbon emissions and powering clean energy production.",
      "In addition, our closed-loop water treatment and 100% scrap metal recycling ensure environmental compliance with global ISO 14001 green standards."
    ]
  },
  {
    id: 4,
    title: "Understanding CNC Bending Tolerances",
    date: "Sept 12, 2025",
    time: "7 Min",
    category: "Engineering",
    image: "/images/about-hero.png",
    desc: "An expert guide to achieving +/- 0.5mm precision in complex multi-plane bends.",
    content: [
      "An expert guide to achieving +/- 0.5mm precision in complex multi-plane bends.",
      "Complex HVAC branching, headers, and evaporator tubing require strict multi-axis CNC bending tolerances to prevent springback and wall thinning.",
      "Using multi-stack electric CNC bending machines with mandrel support, J Pan Tubular achieves zero ovality at tight bend radii while preserving wall thickness integrity."
    ]
  },
  {
    id: 5,
    title: "The Role of Tubular Components in EV Thermal Management",
    date: "Aug 25, 2025",
    time: "8 Min",
    category: "Innovation",
    image: "/images/industry-auto.png",
    desc: "Exploring the critical cooling requirements of next-generation electric vehicle batteries.",
    content: [
      "Exploring the critical cooling requirements of next-generation electric vehicle batteries.",
      "Electric vehicle battery cooling loops require high-pressure, leak-free liquid distribution manifolds crafted from lightweight aluminum and copper alloys.",
      "J Pan Tubular supplies custom formed cooling lines certified under IATF 16949 automotive quality standards for leading EV platforms."
    ]
  },
  {
    id: 6,
    title: "Metrology Standards in Industrial Fabrication",
    date: "Aug 05, 2025",
    time: "5 Min",
    category: "Quality",
    image: "/images/quality-hero.png",
    desc: "Why sub-micron measurement is the new standard for industrial component reliability.",
    content: [
      "Why sub-micron measurement is the new standard for industrial component reliability.",
      "Digital optical profile projectors, 3D coordinate measuring machines (CMM), and automated helium leak testing ensure that every component matches customer CAD specifications perfectly.",
      "Our metrology lab operates in a climate-controlled clean room environment for uncompromised measurement precision."
    ]
  }
];

interface BlogGridProps {
  selectedCategory?: string;
  searchQuery?: string;
  onReadMore: (article: any) => void;
}

export function BlogGrid({ selectedCategory = "All Insights", searchQuery = "", onReadMore }: BlogGridProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!cardsRef.current) return;
    const container = cardsRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex >= 0 && newIndex < filteredArticles.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All Insights" 
      ? true 
      : article.category.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
    const descMatch = article.desc.toLowerCase().includes(normalizedQuery);
    const catMatch = article.category.toLowerCase().includes(normalizedQuery);
    const dateMatch = article.date.toLowerCase().includes(normalizedQuery);

    return titleMatch || descMatch || catMatch || dateMatch;
  });

  return (
    <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white dark:bg-[#070b14] transition-colors">
      <div className="container-custom">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 px-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mx-auto mb-5 text-[#2E5E99] dark:text-[#7BA4D0]">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We couldn't find any technical insights matching "{searchQuery}". Try searching for another topic or selecting a category.
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-between w-full">
            <div 
              ref={cardsRef}
              onScroll={handleMobileScroll}
              className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto snap-x snap-mandatory pt-2 pb-3 md:py-0 px-1 md:px-0 gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
            >
              {filteredArticles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => onReadMore({
                    title: article.title,
                    date: article.date,
                    time: article.time,
                    category: article.category,
                    author: "Engineering Division",
                    image: article.image,
                    content: article.content
                  })}
                  className="group flex flex-col bg-white dark:bg-[#0c1527] border border-slate-200/80 dark:border-white/10 rounded-3xl overflow-hidden hover:border-[#2E5E99]/50 transition-all duration-300 cursor-pointer w-full min-w-full md:min-w-0 md:w-full shrink-0 snap-center justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Image with 100% Clarity */}
                    <div className="relative aspect-[16/10] overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 sm:gap-6 mb-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                          {article.time} Read
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white mb-3.5 leading-[1.25] tracking-tight group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 flex-grow">
                        {article.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                    <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-2 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:text-[#0D2440] dark:group-hover:text-white transition-colors self-start border-b border-[#2E5E99]/25 pb-1">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Pagination Indicator Dots */}
            {filteredArticles.length > 1 && (
              <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-10">
                {filteredArticles.map((_, i) => (
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
                    aria-label={`Go to article card ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
