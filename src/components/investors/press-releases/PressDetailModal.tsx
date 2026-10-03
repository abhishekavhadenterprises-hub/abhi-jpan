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
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-charcoal rounded-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
        {/* Header Actions */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md border-b border-border p-6 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </button>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-gold transition-colors" title="Share Article">
              <Share2 className="w-5 h-5" />
            </button>
            {article.hasPdf && (
              <button className="flex items-center gap-2 px-4 py-2 bg-deepblue text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all btn-slide-gold group">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            )}
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
          {article.image && (
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
                  <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
                    <Calendar className="w-4 h-4 text-gold" />
                    {article.date}
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                  {article.title}
                </h2>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto py-16 px-8 md:px-12">
            {!article.image && (
               <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                      <Calendar className="w-4 h-4 text-gold" />
                      {article.date}
                    </div>
                  </div>
                  <h2 className="text-4xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                    {article.title}
                  </h2>
               </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {article.content.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  {para}
                </p>
              ))}
            </div>

            {/* Footer Sign-off */}
            <div className="mt-20 pt-10 border-t border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="font-heading font-bold text-charcoal dark:text-white mb-2">Media Inquiries</h4>
                  <p className="text-sm text-muted-foreground">Contact our communication team at enquiry@jpantubular.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-deepblue flex items-center justify-center rounded-sm">
                    <span className="text-gold font-bold">J</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal dark:text-white uppercase tracking-widest">J Pan Tubular Components Limited</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Official Press Release</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
