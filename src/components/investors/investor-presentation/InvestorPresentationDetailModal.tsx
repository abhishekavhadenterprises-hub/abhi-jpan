"use client";

import React from "react";
import { X, Presentation, Download, Share2, ExternalLink, Calendar, Layers, BarChart, PieChart } from "lucide-react";

interface PresentationItem {
  title: string;
  date: string;
  summary: string;
  type: string;
  icon: any;
}

interface InvestorPresentationDetailModalProps {
  presentation: PresentationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvestorPresentationDetailModal({ presentation, isOpen, onClose }: InvestorPresentationDetailModalProps) {
  if (!isOpen || !presentation) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-charcoal border border-border rounded-sm flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 h-[90vh] max-h-[850px]">
        {/* Sidebar: Strategic Metadata */}
        <div className="w-full md:w-80 p-8 md:p-10 bg-silver/5 border-b md:border-b-0 md:border-r border-border flex flex-col">
          <button 
            onClick={onClose}
            className="self-start mb-8 p-2 hover:bg-silver/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-6 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-[10px]">Strategic Disclosure</span>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-sm">
                {presentation.type}
              </span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white leading-tight">
              {presentation.title}
            </h2>
          </div>

          <div className="space-y-6 mb-auto">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Publication Date</p>
                <p className="text-[10px] text-muted-foreground">{presentation.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Interaction Focus</p>
                <p className="text-[10px] text-muted-foreground">{presentation.type}</p>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-charcoal border border-border rounded-sm">
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                "{presentation.summary}"
              </p>
            </div>
          </div>

          <div className="pt-10 space-y-4">
            <button className="w-full bg-deepblue text-white px-6 py-4 font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <Download className="w-4 h-4" />
              Download Full Slides
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white dark:bg-charcoal border border-border hover:border-gold px-4 py-3 font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 btn-slide-gold group">
                <Share2 className="w-4 h-4 text-gold" />
                Share
              </button>
              <button className="bg-white dark:bg-charcoal border border-border hover:border-gold px-4 py-3 font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 btn-slide-gold group">
                <ExternalLink className="w-4 h-4 text-gold" />
                Mirror
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Slide Viewer Placeholder */}
        <div className="flex-grow bg-black/5 dark:bg-white/2 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
          {/* Technical Grid Backdrop */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
          
          <div className="relative z-10 w-full max-w-2xl">
            <div className="aspect-video bg-charcoal dark:bg-black rounded-sm border border-white/5 flex items-center justify-center relative group">
              <div className="absolute inset-0 opacity-10 bg-[url('/images/blueprint.png')] bg-cover" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-gold/10 flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <presentation.icon className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2 italic">Institutional Strategic Viewer</h3>
                <p className="text-silver/30 text-[10px] uppercase tracking-[0.3em]">Processing Slide Data...</p>
              </div>

              {/* Progress Bar Decoration */}
              <div className="absolute bottom-6 left-6 right-6 h-0.5 bg-white/5">
                <div className="h-full w-1/3 bg-gold" />
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-4">Strategic Business Roadmap</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-lg mx-auto">
                Detailed business insights, financial projections, and operational 
                milestones are displayed within this secure, high-fidelity 
                institutional presentation viewer.
              </p>
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-white dark:bg-charcoal border border-border rounded-full">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Certified Financial Narrative</span>
              </div>
            </div>
          </div>

          {/* Institutional Corner Markers */}
          <div className="absolute top-0 right-0 p-10">
            <div className="h-1 w-20 bg-gold/20" />
            <div className="h-4 w-1 bg-gold/20 mt-2 ml-auto" />
          </div>
          <div className="absolute bottom-0 left-0 p-10">
            <div className="h-4 w-1 bg-gold/20 mb-2" />
            <div className="h-1 w-20 bg-gold/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
