"use client";

import React from "react";
import { X, Download, Share2, Printer, Newspaper, Calendar, Globe, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface Publication {
  title: string;
  newspaper: string;
  date: string;
  language: string;
  category?: string;
}

interface PublicationDetailModalProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PublicationDetailModal({ publication, isOpen, onClose }: PublicationDetailModalProps) {
  if (!isOpen || !publication) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-charcoal rounded-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-silver/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
              <Newspaper className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-white leading-tight">
                {publication.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{publication.newspaper}</span>
                <div className="w-1 h-1 bg-border rounded-full" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                   {publication.language} Publication
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 text-muted-foreground hover:text-gold hover:bg-silver/10 rounded-sm transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2.5 text-muted-foreground hover:text-gold hover:bg-silver/10 rounded-sm transition-all">
              <Printer className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-border mx-2" />
            <button 
              onClick={onClose}
              className="p-2.5 bg-charcoal text-white hover:bg-gold hover:text-charcoal rounded-sm transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
          {/* Media Viewer Placeholder */}
          <div className="flex-grow bg-silver/10 relative group overflow-hidden border-r border-border flex items-center justify-center p-8 md:p-12">
            <div className="w-full h-full bg-white dark:bg-black/20 border border-border rounded-sm flex flex-col items-center justify-center p-12 text-center relative group/clipping">
               <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover/clipping:opacity-100 transition-opacity">
                  <button className="p-2 bg-white dark:bg-charcoal border border-border rounded-sm hover:text-gold transition-colors">
                     <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white dark:bg-charcoal border border-border rounded-sm hover:text-gold transition-colors">
                     <ZoomOut className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white dark:bg-charcoal border border-border rounded-sm hover:text-gold transition-colors">
                     <Maximize2 className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="w-24 h-32 border-2 border-dashed border-border flex items-center justify-center mb-8 bg-silver/5">
                  <Newspaper className="w-10 h-10 text-gold/10" />
               </div>
               <h4 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-4">
                 Publication Clipping
               </h4>
               <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-8">
                 Authenticated media clipping of the public notice as it appeared 
                 in {publication.newspaper} on {publication.date}.
               </p>
               <button className="px-8 py-3 bg-gold text-charcoal font-bold text-[9px] uppercase tracking-widest rounded-sm flex items-center gap-3 transition-all btn-slide-white group">
                 <Maximize2 className="w-4 h-4" />
                 View Full Size
               </button>
            </div>
            
            {/* Design accents */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4 opacity-20">
               <span className="text-[8px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Digital Press Archive</span>
               <div className="w-8 h-[1px] bg-charcoal dark:bg-white" />
            </div>
          </div>

          {/* Sidebar / Metadata */}
          <div className="w-full lg:w-80 bg-white dark:bg-charcoal p-8 overflow-y-auto">
            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Media Details</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Publication Date</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">{publication.date}</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Source Periodical</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">{publication.newspaper}</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Market Coverage</p>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-gold" />
                    <p className="text-xs font-bold text-charcoal dark:text-white">
                       {publication.language === 'English' ? 'National' : 'Regional'} Reach
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Archive Note</h4>
              <div className="p-4 bg-silver/5 border border-border rounded-sm">
                <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                   "This publication is a certified statutory disclosure made in 
                   compliance with the applicable listing agreements. It is archived 
                   here for historical record and public verification."
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <button className="w-full flex items-center justify-center gap-3 py-5 bg-charcoal hover:bg-deepblue text-white rounded-sm transition-all">
                <Download className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download Clipping</span>
              </button>
              <p className="text-[8px] text-center text-muted-foreground/40 mt-4 uppercase tracking-widest">
                File: PRESS_CLIP_{publication.date.replace(/,?\s/g, '_')}.PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
