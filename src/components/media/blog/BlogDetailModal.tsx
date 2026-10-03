"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react";
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-charcoal rounded-sm overflow-hidden border border-border flex flex-col animate-in zoom-in-95 duration-500">
        {/* Header Actions */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md border-b border-border p-6 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 pr-4 border-r border-border">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Share Article:</span>
              <button className="text-muted-foreground hover:text-gold transition-colors"><Twitter className="w-4 h-4" /></button>
              <button className="text-muted-foreground hover:text-gold transition-colors"><Linkedin className="w-4 h-4" /></button>
              <button className="text-muted-foreground hover:text-gold transition-colors"><Facebook className="w-4 h-4" /></button>
            </div>
            <button 
              className="p-2 text-muted-foreground hover:text-gold transition-colors"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Article Hero */}
          <div className="relative w-full aspect-[21/9]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <div className="absolute bottom-10 left-12 right-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {article.category}
                </span>
                <div className="flex flex-wrap items-center gap-6 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    {article.time} Read
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto py-16 px-8 md:px-12">
            {/* Author Attribution */}
            <div className="flex items-center gap-4 mb-12 pb-12 border-b border-border">
              <div className="w-12 h-12 bg-silver/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal dark:text-white uppercase tracking-widest">{article.author}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">J Pan Tubular Components Limited Engineering Division</p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {article.content.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  {para}
                </p>
              ))}
            </div>

            {/* Newsletter Sign-up CTA Inside Article */}
            <div className="mt-20 p-10 bg-silver/5 dark:bg-white/5 rounded-sm border border-border text-center">
              <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-4">Subscribe to Technical Insights</h3>
              <p className="text-muted-foreground mb-8">Get the latest engineering deep-dives directly in your inbox.</p>
              <div className="flex max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-grow bg-white dark:bg-charcoal border border-border px-6 py-3 text-sm rounded-l-sm focus:outline-none focus:border-gold"
                />
                <button className="bg-deepblue text-white px-8 py-3 font-bold text-sm uppercase tracking-widest rounded-r-sm transition-all btn-slide-gold group">
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
