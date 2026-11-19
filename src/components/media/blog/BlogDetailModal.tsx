"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Facebook, Twitter, Linkedin } from "@/components/shared/BrandIcons";

interface BlogArticle {
  title: string;
  date: string;
  time: string;
  category: string;
  author: string;
  image: string;
  content: string[];
}

interface BlogDetailModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export function BlogDetailModal({ article, onClose }: BlogDetailModalProps) {
  React.useEffect(() => {
    if (!article) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause Lenis smooth scroll on the background page while article modal is open
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div 
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100] w-full h-full bg-white dark:bg-[#070b14] overflow-y-auto overscroll-contain flex flex-col animate-in fade-in duration-300"
    >
      {/* Sticky Header Navigation Bar */}
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between shadow-xs">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-silver hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden xs:inline">Back to Insights</span>
          <span className="xs:hidden">Back</span>
        </button>
        
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-200 dark:border-white/10">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Share Article:</span>
            <button className="text-slate-500 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors cursor-pointer" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
            <button className="text-slate-500 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors cursor-pointer" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
            <button className="text-slate-500 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors cursor-pointer" aria-label="Share on Facebook"><Facebook className="w-4 h-4" /></button>
          </div>
          <button 
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#2E5E99] hover:text-white text-slate-700 dark:text-silver flex items-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer"
            onClick={onClose}
            aria-label="Close article"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* Main Full Page Content */}
      <article className="w-full flex-grow shrink-0 min-h-0">
        {/* Full-width Hero Banner */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] min-h-[300px] sm:min-h-[420px] max-h-[540px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/60 to-transparent" />
          <div className="absolute bottom-6 sm:bottom-10 md:bottom-14 left-0 right-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-5">
                <span className="px-3 py-1 bg-[#2E5E99] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                  {article.category}
                </span>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-white/90 text-xs font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#7BA4D0]" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#7BA4D0]" />
                    {article.time} Read
                  </div>
                </div>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.12] tracking-tight max-w-4xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
          {/* Author Attribution */}
          <div className="flex items-center gap-4 mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-slate-200 dark:border-white/10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#EBF3FC] dark:bg-[#2E5E99]/20 rounded-2xl flex items-center justify-center shrink-0">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-[#2E5E99] dark:text-[#7BA4D0]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">{article.author}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">J Pan Tubular Components Limited · Engineering & Metallurgy Division</p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg md:text-xl font-normal font-sans">
            {article.content.map((para, i) => (
              <p key={i}>
                {para}
              </p>
            ))}
          </div>

          {/* Newsletter Sign-up CTA Inside Article */}
          <div className="mt-14 sm:mt-20 p-6 sm:p-10 md:p-12 bg-slate-50 dark:bg-[#0c1527] rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 text-center shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-3">Subscribe to Technical Insights</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-6 max-w-lg mx-auto">Get the latest precision engineering and metallurgy deep-dives directly in your inbox.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input 
                type="email" 
                placeholder="Your corporate email address"
                className="w-full sm:flex-grow bg-white dark:bg-[#070b14] border border-slate-200 dark:border-white/15 px-4 sm:px-5 py-3 text-sm rounded-xl focus:outline-none focus:border-[#2E5E99] text-[#0D2440] dark:text-white shadow-xs"
              />
              <button className="w-full sm:w-auto bg-[#0D2440] hover:bg-[#2E5E99] dark:bg-[#2E5E99] text-white px-7 py-3 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
