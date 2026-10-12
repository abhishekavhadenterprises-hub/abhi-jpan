"use client";

import React from "react";
import { X, FileText, Download, Share2, ExternalLink, Calendar, Bookmark, ShieldCheck, Scale } from "lucide-react";

interface DisclosureItem {
  id: number;
  reg: string;
  title: string;
  date: string;
  desc: string;
  status: string;
}

interface SEBIDisclosureDetailModalProps {
  disclosure: DisclosureItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SEBIDisclosureDetailModal({ disclosure, isOpen, onClose }: SEBIDisclosureDetailModalProps) {
  if (!isOpen || !disclosure) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-[#0A192F] border border-border rounded-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-in zoom-in-95 duration-300 h-[92vh] max-h-[850px] shadow-2xl">
        {/* Sidebar: Regulatory Metadata */}
        <div className="w-full md:w-80 p-5 sm:p-8 md:p-10 bg-silver/5 border-b md:border-b-0 md:border-r border-border flex flex-col shrink-0">
          <button 
            onClick={onClose}
            className="self-start mb-6 sm:mb-8 p-2 hover:bg-silver/10 rounded-xl transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="h-0.5 w-6 bg-[#2E5E99] dark:bg-[#7BA4D0]" />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-bold uppercase tracking-widest text-[10px]">Statutory Filing Detail</span>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="px-2 py-1 bg-[#2E5E99]/10 text-[#2E5E99] dark:text-[#7BA4D0] text-[10px] font-bold uppercase tracking-widest rounded-lg border border-[#2E5E99]/20">
                {disclosure.reg}
              </span>
              <span className="px-2 py-1 bg-deepblue text-white text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {disclosure.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-charcoal dark:text-white leading-tight">
              {disclosure.title}
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6 mb-6 md:mb-auto">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Filing Date</p>
                <p className="text-[10px] text-muted-foreground">{disclosure.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 sm:w-5 h-4 sm:h-5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Regulation Type</p>
                <p className="text-[10px] text-muted-foreground">{disclosure.reg} (LODR)</p>
              </div>
            </div>
            <div className="p-3.5 sm:p-4 bg-white dark:bg-[#071321] border border-border rounded-xl">
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                "{disclosure.desc}"
              </p>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 space-y-3 sm:space-y-4">
            <a 
              href="/sample-report.pdf"
              download
              className="w-full bg-[#0D2440] hover:bg-[#2E5E99] text-white px-5 sm:px-6 py-3.5 min-h-[44px] font-bold text-[10px] uppercase tracking-[0.18em] rounded-xl transition-all flex items-center justify-center gap-3 shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Official PDF
            </a>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <button className="bg-white dark:bg-[#071321] border border-border hover:border-[#2E5E99] px-3.5 py-2.5 min-h-[40px] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                Share
              </button>
              <button className="bg-white dark:bg-[#071321] border border-border hover:border-[#2E5E99] px-3.5 py-2.5 min-h-[40px] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                NSE/BSE Link
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Document Viewer Placeholder */}
        <div className="flex-grow bg-black/5 dark:bg-white/2 flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 text-center relative overflow-hidden min-h-[350px]">
          {/* Technical Grid Backdrop */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
          
          <div className="relative z-10 w-full max-w-2xl">
            <div className="aspect-[1/1.414] max-h-[600px] w-full bg-white dark:bg-black rounded-sm border border-border flex flex-col relative group overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[url('/images/blueprint.png')] bg-cover" />
              
              {/* Fake Document Header */}
              <div className="h-20 bg-silver/5 border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
                    <FileText className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-charcoal dark:text-white uppercase tracking-widest">J Pan Tubular Components Limited</p>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Statutory Filing</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Certified</span>
                </div>
              </div>

              {/* Fake Document Body */}
              <div className="flex-grow p-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-silver/10 flex items-center justify-center rounded-full mb-6">
                  <Scale className="w-10 h-10 text-silver/30" />
                </div>
                <h3 className="text-lg font-heading font-bold text-silver/40 mb-2 italic">Institutional Disclosure Viewer</h3>
                <p className="text-silver/20 text-[9px] uppercase tracking-[0.4em]">Securely Fetching Document Data...</p>
                
                <div className="mt-12 w-full space-y-4">
                  <div className="h-2 w-full bg-silver/5 rounded-full" />
                  <div className="h-2 w-3/4 bg-silver/5 rounded-full" />
                  <div className="h-2 w-full bg-silver/5 rounded-full" />
                  <div className="h-2 w-1/2 bg-silver/5 rounded-full" />
                </div>
              </div>

              {/* Progress Bar Decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-silver/5">
                <div className="h-full w-2/3 bg-gold" />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Regulatory Authenticity Guaranteed</span>
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
