"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, Tag, Download, Share2, ArrowLeft } from "lucide-react";

interface PressArticle {
  title: string;
  date: string;
  category: string;
  content: string[];
  image?: string;
  hasPdf?: boolean;
}

interface PressDetailModalProps {
  article: PressArticle | null;
  onClose: () => void;
}

export function PressDetailModal({ article, onClose }: PressDetailModalProps) {
  React.useEffect(() => {
    if (!article) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause Lenis smooth scroll on the background page while press modal is open
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
          <span>Back to News</span>
        </button>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="p-2 text-slate-500 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors cursor-pointer" title="Share Article" aria-label="Share article">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          {article.hasPdf && (
            <button className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#2E5E99] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#7BA4D0] transition-all cursor-pointer shadow-xs">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          )}
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
        {/* Article Hero Banner */}
        {article.image ? (
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] min-h-[280px] sm:min-h-[400px] max-h-[520px]">
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
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="px-3 py-1 bg-[#2E5E99] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[#7BA4D0]" />
                    {article.date}
                  </div>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight max-w-4xl">
                  {article.title}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-black/40 border-b border-slate-200 dark:border-white/10 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#2E5E99] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg">
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0]" />
                  {article.date}
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
          <div className="space-y-6 sm:space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg md:text-xl font-normal font-sans">
            {article.content.map((para, i) => (
              <p key={i}>
                {para}
              </p>
            ))}
          </div>

          {/* Footer Sign-off */}
          <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-200 dark:border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-heading font-bold text-base text-[#0D2440] dark:text-white mb-1">Media Inquiries</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Contact our communication division at enquiry@jpantubular.com</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0D2440] dark:bg-[#2E5E99] flex items-center justify-center rounded-xl shadow-sm">
                  <span className="text-[#7BA4D0] font-heading font-black text-lg">J</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">J Pan Tubular Components Limited</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">Official Press Release</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
