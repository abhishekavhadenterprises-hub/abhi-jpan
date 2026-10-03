"use client";

import React, { useEffect } from "react";
import { 
  X, Download, Share2, FileText, Calendar, 
  ShieldCheck, Bookmark, ZoomIn, ZoomOut, Printer 
} from "lucide-react";

interface MaterialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentData: {
    title: string;
    type: string;
    date: string;
    ref: string;
    fiscal: string;
    summary?: string;
  } | null;
}

export function MaterialDetailModal({ isOpen, onClose, documentData }: MaterialDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "unset";
    }
    return () => {
      window.document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !documentData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-7xl h-full bg-white dark:bg-charcoal rounded-sm flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-700">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-white dark:bg-charcoal sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-sm border border-gold/20">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-heading font-bold text-charcoal dark:text-white leading-none">
                  {documentData.title}
                </h2>
                <span className="px-2 py-0.5 bg-silver/10 text-[8px] font-bold text-muted-foreground uppercase tracking-widest rounded-sm border border-border">
                   {documentData.ref}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {documentData.date}</span>
                <span className="flex items-center gap-1.5"><Bookmark className="w-3 h-3" /> Material {documentData.type}</span>
                <span className="text-gold">{documentData.fiscal}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-1 bg-silver/5 border border-border rounded-sm p-1 mr-4">
                <button className="p-2 hover:bg-white dark:hover:bg-black/20 rounded-sm transition-all"><ZoomOut className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 hover:bg-white dark:hover:bg-black/20 rounded-sm transition-all"><ZoomIn className="w-4 h-4 text-muted-foreground" /></button>
             </div>
             <button className="p-3 bg-silver/5 hover:bg-silver/10 border border-border rounded-sm transition-all group" title="Print">
                <Printer className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
             </button>
             <button className="p-3 bg-gold text-charcoal rounded-sm hover:bg-white transition-all font-bold text-[9px] uppercase tracking-widest flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
             </button>
             <div className="w-px h-8 bg-border mx-2" />
             <button 
               onClick={onClose}
               className="p-3 bg-charcoal dark:bg-white/5 text-white hover:bg-red-500 hover:text-white transition-all rounded-sm"
             >
               <X className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          
          {/* Main Viewer (PDF Placeholder) */}
          <div className="flex-grow bg-silver/10 dark:bg-black/40 overflow-y-auto p-8 md:p-12 scrollbar-thin">
             <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                {/* PDF Aesthetic Mockup */}
                <div className="bg-white dark:bg-charcoal rounded-sm p-12 md:p-20 min-h-[1200px] border border-border relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
                   <div className="flex items-center justify-between mb-20 opacity-40">
                      <div className="w-24 h-12 border border-border" />
                      <div className="text-[10px] font-bold uppercase tracking-widest">Confidential / Statutory Disclosure</div>
                   </div>

                   <div className="space-y-12">
                      <div className="h-4 w-1/3 bg-silver/5 rounded-sm" />
                      <h1 className="text-4xl font-heading font-bold text-charcoal dark:text-white leading-tight underline underline-offset-8 decoration-gold/30">
                         {documentData.title}
                      </h1>
                      <div className="flex gap-4">
                         <div className="h-6 w-32 bg-gold/10 rounded-sm" />
                         <div className="h-6 w-32 bg-silver/10 rounded-sm" />
                      </div>

                      <div className="space-y-6 pt-10">
                         {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-3">
                               <div className="h-3 w-full bg-silver/5 rounded-sm" />
                               <div className="h-3 w-5/6 bg-silver/5 rounded-sm" />
                               <div className="h-3 w-4/6 bg-silver/5 rounded-sm" />
                            </div>
                         ))}
                      </div>

                      <div className="pt-20 border-t border-border/50">
                         <div className="flex items-center gap-4 text-silver/20 mb-8">
                            <ShieldCheck className="w-12 h-12" />
                            <div className="h-px flex-grow bg-silver/5" />
                         </div>
                         <div className="grid grid-cols-2 gap-20">
                            <div className="space-y-4">
                               <div className="h-10 w-40 border-b border-border" />
                               <p className="text-[8px] font-bold uppercase tracking-widest text-silver/30 italic">Authorized Signatory</p>
                            </div>
                            <div className="space-y-4">
                               <div className="h-10 w-40 border-b border-border" />
                               <p className="text-[8px] font-bold uppercase tracking-widest text-silver/30 italic">Compliance Verification</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Digital Watermark */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] pointer-events-none opacity-[0.03]">
                      <span className="text-[120px] font-bold whitespace-nowrap uppercase tracking-[0.5em]">STATUTORY</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="w-full lg:w-96 bg-white dark:bg-charcoal border-l border-border flex flex-col sticky bottom-0 lg:static">
             <div className="p-8 space-y-12 overflow-y-auto">
                <div className="animate-in fade-in slide-in-from-right duration-700 delay-500">
                   <h4 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-6">Document Summary</h4>
                   <p className="text-xs text-muted-foreground leading-relaxed italic">
                      This material disclosure outlines the primary terms and 
                      conditions governing the {documentData.title}. It includes 
                      board-approved resolutions and strategic compliance 
                      frameworks as mandated by Regulation 46.
                   </p>
                </div>

                <div className="animate-in fade-in slide-in-from-right duration-700 delay-700">
                   <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-[0.2em] mb-6">Verification Details</h4>
                   <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Authentication</span>
                         <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[8px] font-bold uppercase tracking-widest rounded-sm">Verified</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Board Approved</span>
                         <span className="text-[9px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Yes</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Disclosure Level</span>
                         <span className="text-[9px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Material</span>
                      </div>
                   </div>
                </div>

                <div className="pt-12 animate-in fade-in slide-in-from-right duration-700 delay-900">
                   <div className="p-6 bg-silver/5 border border-border rounded-sm">
                      <ShieldCheck className="w-8 h-8 text-gold/30 mb-4" />
                      <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest mb-2">Digital Integrity</h4>
                      <p className="text-[9px] text-muted-foreground leading-relaxed">
                         The digital version of this document is a certified copy 
                         of the original material contract maintained at the 
                         registered office.
                      </p>
                   </div>
                </div>
             </div>

             <div className="mt-auto p-8 border-t border-border">
                <button className="w-full py-4 border border-border rounded-sm text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-charcoal hover:text-white transition-all">
                   <Share2 className="w-4 h-4" />
                   Share Disclosure Link
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
