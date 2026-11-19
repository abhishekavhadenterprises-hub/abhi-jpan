"use client";

import React, { useEffect } from "react";
import { 
  X, Download, Share2, FileText, Calendar, 
  ShieldCheck, TrendingUp, ZoomIn, ZoomOut, Printer,
  BarChart3
} from "lucide-react";
import { PdfDocumentViewer } from "@/components/ui/PdfDocumentViewer";

interface RatingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ratingData: {
    rating: string;
    agency: string;
    date: string;
    outlook: string;
    ref: string;
  } | null;
}

export function RatingDetailModal({ isOpen, onClose, ratingData }: RatingDetailModalProps) {
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

  if (!isOpen || !ratingData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[900px] bg-white dark:bg-[#0A192F] rounded-2xl flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-700 shadow-2xl border border-border">
        
        {/* Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-border flex items-center justify-between bg-white dark:bg-[#0A192F] sticky top-0 z-10">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0 pr-2">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#2E5E99]/10 flex items-center justify-center rounded-xl border border-[#2E5E99]/20 shrink-0">
              <BarChart3 className="w-5 sm:w-6 h-5 sm:h-6 text-[#2E5E99] dark:text-[#7BA4D0]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <h2 className="text-sm sm:text-lg md:text-xl font-heading font-bold text-charcoal dark:text-white leading-tight truncate">
                  Rating Rationale: {ratingData.rating}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-silver/10 text-[8px] font-bold text-muted-foreground uppercase tracking-widest rounded-sm border border-border shrink-0">
                   {ratingData.ref}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-[9px] text-muted-foreground font-bold uppercase tracking-widest truncate">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#2E5E99] dark:text-[#7BA4D0]" /> {ratingData.date}</span>
                <span className="hidden sm:flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#2E5E99] dark:text-[#7BA4D0]" /> {ratingData.agency}</span>
                <span className={`flex items-center gap-1.5 ${ratingData.outlook === 'Positive' ? 'text-green-500' : 'text-[#2E5E99] dark:text-[#7BA4D0]'}`}>
                   <TrendingUp className="w-3 h-3" /> Outlook: {ratingData.outlook}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
             <div className="hidden md:flex items-center gap-1 bg-silver/5 border border-border rounded-lg p-1 mr-2">
                <button className="p-1.5 hover:bg-white dark:hover:bg-black/20 rounded-md transition-all"><ZoomOut className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-black/20 rounded-md transition-all"><ZoomIn className="w-4 h-4 text-muted-foreground" /></button>
             </div>
             <button className="hidden sm:flex p-2.5 bg-silver/5 hover:bg-silver/10 border border-border rounded-xl transition-all group min-w-[36px] min-h-[36px] items-center justify-center" title="Print">
                <Printer className="w-4 h-4 text-muted-foreground group-hover:text-[#2E5E99]" />
             </button>
             <a 
               href="/sample-report.pdf"
               download
               className="p-2 sm:px-4 sm:py-2.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white rounded-xl transition-all font-bold text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 min-h-[36px]"
             >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Report</span>
             </a>
             <div className="hidden sm:block w-px h-6 bg-border mx-1" />
             <button 
               onClick={onClose}
               className="p-2 sm:p-2.5 bg-charcoal dark:bg-white/10 text-white hover:bg-red-500 hover:text-white transition-all rounded-xl min-w-[36px] min-h-[36px] flex items-center justify-center"
               aria-label="Close dialog"
             >
               <X className="w-4 sm:w-5 h-4 sm:h-5" />
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden min-h-0">
          {/* Main Zero-Download Multi-Page Canvas Viewer */}
          <div className="flex-grow bg-[#F1F5F9] dark:bg-[#08121e] flex flex-col relative overflow-hidden min-h-0 h-full">
            <PdfDocumentViewer 
              url="/sample-report.pdf"
              title={`${ratingData.agency} Credit Rating Rationale`}
              className="w-full h-full flex-grow"
            />
          </div>

          {/* Sidebar Metadata */}
          <div className="w-full lg:w-96 bg-white dark:bg-[#0A192F] border-t lg:border-t-0 lg:border-l border-border flex flex-col overflow-y-auto max-h-[30vh] lg:max-h-full shrink-0">
             <div className="p-5 sm:p-8 space-y-8 sm:space-y-12 overflow-y-auto">
                <div className="animate-in fade-in slide-in-from-right duration-700 delay-500">
                   <h4 className="text-[10px] font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] mb-4 sm:mb-6">Rating Summary</h4>
                   <p className="text-xs text-muted-foreground leading-relaxed italic">
                      This credit rationale provides a detailed analysis of 
                      the factors influencing the {ratingData.rating} rating 
                      assigned to J Pan Tubular Components Limited. Key drivers include 
                      operational scale, capital management, and sector-specific 
                      performance.
                   </p>
                </div>

                <div className="animate-in fade-in slide-in-from-right duration-700 delay-700">
                   <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-[0.2em] mb-4 sm:mb-6">Evaluation Details</h4>
                   <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Agency Authority</span>
                         <span className="text-[9px] font-bold text-charcoal dark:text-white uppercase tracking-widest">{ratingData.agency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Effective Date</span>
                         <span className="text-[9px] font-bold text-charcoal dark:text-white uppercase tracking-widest">{ratingData.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Outlook</span>
                         <span className={`text-[9px] font-bold uppercase tracking-widest ${ratingData.outlook === 'Positive' ? 'text-green-500' : 'text-[#2E5E99] dark:text-[#7BA4D0]'}`}>
                            {ratingData.outlook}
                         </span>
                      </div>
                   </div>
                </div>

                <div className="pt-6 sm:pt-12 animate-in fade-in slide-in-from-right duration-700 delay-900">
                   <div className="p-5 sm:p-6 bg-silver/5 border border-border rounded-xl">
                      <BarChart3 className="w-8 h-8 text-[#2E5E99]/30 mb-4" />
                      <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest mb-2">Institutional Insight</h4>
                      <p className="text-[9px] text-muted-foreground leading-relaxed">
                         The rating is based on an independent assessment of 
                         historical performance and future revenue trajectories.
                      </p>
                   </div>
                </div>
             </div>

             <div className="mt-auto p-5 sm:p-8 border-t border-border">
                <button className="w-full py-3.5 sm:py-4 border border-border rounded-xl text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#0D2440] hover:text-white transition-all min-h-[44px]">
                   <Share2 className="w-4 h-4" />
                   Share Report Link
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
