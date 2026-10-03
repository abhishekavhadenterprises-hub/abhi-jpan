"use client";

import React from "react";
import { X, Download, Share2, Printer, FileText, Calendar, Radio, ChevronRight, User, Search, ZoomIn, ZoomOut } from "lucide-react";

interface Transcript {
  title: string;
  date: string;
  type: string;
  fiscal: string;
  quarter: string;
}

interface TranscriptDetailModalProps {
  transcript: Transcript | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TranscriptDetailModal({ transcript, isOpen, onClose }: TranscriptDetailModalProps) {
  if (!isOpen || !transcript) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-full max-h-[95vh] bg-white dark:bg-charcoal rounded-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-silver/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-white leading-tight">
                {transcript.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{transcript.quarter} {transcript.fiscal}</span>
                <div className="w-1 h-1 bg-border rounded-full" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                   Published: {transcript.date}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-white dark:bg-black/20 border border-border rounded-sm px-3 py-1.5 mr-4 group/search">
               <Search className="w-3.5 h-3.5 text-muted-foreground group-focus-within:text-gold" />
               <input 
                type="text" 
                placeholder="Search transcript..." 
                className="bg-transparent border-none text-[10px] focus:outline-none w-32 placeholder:text-muted-foreground/30"
               />
            </div>
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
          
          {/* Main Reading Area */}
          <div className="flex-grow overflow-y-auto bg-white dark:bg-charcoal p-8 md:p-16 scrollbar-thin scrollbar-thumb-gold/20">
             <div className="max-w-3xl mx-auto space-y-12">
                {/* Speaker Block: Management */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gold/10 flex items-center justify-center rounded-full">
                         <User className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                         <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Rajesh Khanna</h4>
                         <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Managing Director, J Pan Tubular Components Limited</p>
                      </div>
                      <span className="ml-auto text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest">[00:02:15]</span>
                   </div>
                   <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-11">
                     Good morning, everyone. Welcome to J Pan Tubular Components Limited’s Q3 earnings call. 
                     We are pleased to report a resilient performance this quarter, driven 
                     by our focus on operational efficiencies and strong demand in the 
                     precision tubing segment. Our revenue grew by 12% year-over-year...
                   </p>
                </div>

                {/* Speaker Block: Analyst */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-silver/10 flex items-center justify-center rounded-full">
                         <User className="w-4 h-4 text-silver" />
                      </div>
                      <div>
                         <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Amit Shah</h4>
                         <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Analyst, Global Securities</p>
                      </div>
                      <span className="ml-auto text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest">[00:15:42]</span>
                   </div>
                   <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-11 italic border-l-2 border-silver/10">
                     Congratulations on a strong set of numbers. Could you provide 
                     more color on the export volumes and what you see as the key 
                     growth drivers for the next fiscal year?
                   </p>
                </div>

                {/* Speaker Block: Management Response */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gold/10 flex items-center justify-center rounded-full">
                         <User className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                         <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Sunil Mehra</h4>
                         <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Chief Financial Officer</p>
                      </div>
                      <span className="ml-auto text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest">[00:16:10]</span>
                   </div>
                   <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-11">
                     Thank you, Amit. On the export front, we’ve seen significant 
                     traction in the European markets. For the next fiscal, our 
                     primary growth drivers will be our upcoming plant expansion 
                     and the increased adoption of our specialized alloy products...
                   </p>
                </div>

                <div className="py-12 flex flex-col items-center gap-6 border-t border-border mt-24">
                   <div className="w-12 h-1 bg-gold/20 rounded-full" />
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">End of Verbatim Segment</p>
                </div>
             </div>
          </div>

          {/* Sidebar / Metadata */}
          <div className="w-full lg:w-80 bg-silver/5 dark:bg-black/20 p-8 overflow-y-auto border-l border-border">
            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Document Metadata</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Transcription Ref</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">J Pan_TR_{transcript.date.replace(/,?\s/g, '_')}</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Filing Type</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">{transcript.type}</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Read Duration</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">Approx. 12 mins</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Reading Controls</h4>
              <div className="grid grid-cols-2 gap-4">
                 <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all">
                    <ZoomIn className="w-5 h-5 text-gold mb-2" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Zoom In</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-charcoal border border-border rounded-sm hover:border-gold transition-all">
                    <ZoomOut className="w-5 h-5 text-gold mb-2" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Zoom Out</span>
                 </button>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <button className="w-full flex items-center justify-center gap-3 py-5 bg-charcoal hover:bg-deepblue text-white rounded-sm transition-all">
                <Download className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download Full PDF</span>
              </button>
              <div className="flex items-center justify-center gap-4 mt-8 opacity-20">
                 <div className="h-px w-8 bg-charcoal dark:bg-white" />
                 <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Official Record</span>
                 <div className="h-px w-8 bg-charcoal dark:bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
