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
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-[#0D2440]/80 dark:bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#070b14] rounded-2xl md:rounded-3xl overflow-hidden border border-[#7BA4D0]/30 dark:border-[#2E5E99]/30 shadow-2xl flex flex-col animate-in zoom-in-95 duration-400">
        {/* Header Actions */}
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 p-5 sm:p-6 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-silver hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-200 dark:border-white/10">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Share Article:</span>
              <button className="text-slate-500 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors"><Twitter className="w-4 h-4" /></button>
              <button className="text-slate-500 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors"><Linkedin className="w-4 h-4" /></button>
              <button className="text-slate-500 hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors"><Facebook className="w-4 h-4" /></button>
            </div>
            <button 
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#2E5E99] hover:text-white text-slate-700 dark:text-silver flex items-center justify-center transition-all duration-200 cursor-pointer"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Article Hero */}
          <div className="relative w-full aspect-[21/9] min-h-[260px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2440] via-[#0D2440]/50 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 right-6 sm:right-12">
              <div className="flex items-center gap-4 mb-3 sm:mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg">
                  {article.category}
                </span>
                <div className="flex flex-wrap items-center gap-5 text-white/90 text-[11px] font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7BA4D0]" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7BA4D0]" />
                    {article.time} Read
                  </div>
                </div>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto py-12 md:py-16 px-6 sm:px-10 md:px-12">
            {/* Author Attribution */}
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-200 dark:border-white/10">
              <div className="w-12 h-12 bg-[#EBF3FC] dark:bg-[#2E5E99]/20 rounded-xl flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-[#2E5E99] dark:text-[#7BA4D0]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">{article.author}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">J Pan Tubular Components Limited Engineering Division</p>
              </div>
            </div>

            <div className="space-y-6">
              {article.content.map((para, i) => (
                <p key={i} className="text-slate-600 dark:text-silver/90 leading-relaxed text-base sm:text-lg font-normal">
                  {para}
                </p>
              ))}
            </div>

            {/* Newsletter Sign-up CTA Inside Article */}
            <div className="mt-16 p-8 sm:p-10 bg-slate-50 dark:bg-[#0c1527] rounded-2xl border border-slate-200 dark:border-white/10 text-center">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-3">Subscribe to Technical Insights</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-lg mx-auto">Get the latest engineering deep-dives directly in your inbox.</p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2.5">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-grow bg-white dark:bg-[#070b14] border border-slate-200 dark:border-white/15 px-5 py-3 text-sm rounded-xl focus:outline-none focus:border-[#2E5E99] text-[#0D2440] dark:text-white"
                />
                <button className="bg-[#0D2440] hover:bg-[#2E5E99] dark:bg-[#2E5E99] text-white px-7 py-3 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
