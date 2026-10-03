"use client";

import React from "react";
import { X, FileText, Download, Share2, ExternalLink, ShieldCheck } from "lucide-react";

interface AnnualReport {
  year: string;
  title: string;
  desc: string;
}

interface AnnualReportsDetailModalProps {
  report: AnnualReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnnualReportsDetailModal({ report, isOpen, onClose }: AnnualReportsDetailModalProps) {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-charcoal border border-border rounded-sm flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 h-[90vh] max-h-[800px]">
        {/* Sidebar: Metadata */}
        <div className="w-full md:w-80 p-8 md:p-10 bg-silver/5 border-b md:border-b-0 md:border-r border-border flex flex-col">
          <button 
            onClick={onClose}
            className="self-start mb-8 p-2 hover:bg-silver/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-6 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-[10px]">Fiscal Publication</span>
          </div>

          <div className="mb-10">
            <span className="text-4xl font-heading font-bold text-charcoal dark:text-white mb-2 block">
              {report.year}
            </span>
            <h2 className="text-xl font-heading font-bold text-muted-foreground leading-tight">
              {report.title}
            </h2>
          </div>

          <div className="space-y-6 mb-auto">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Audited & Verified</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This report includes the full balance sheet, profit and loss statement, 
              and strategic management commentary for the fiscal year.
            </p>
          </div>

          <div className="pt-10 space-y-4">
            <button className="w-full bg-deepblue text-white px-6 py-4 font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <Download className="w-4 h-4" />
              Official PDF
            </button>
            <button className="w-full bg-white dark:bg-charcoal border border-border hover:border-gold px-6 py-4 font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <Share2 className="w-4 h-4" />
              Share Report
            </button>
          </div>
        </div>

        {/* Main Content: PDF Preview Placeholder */}
        <div className="flex-grow bg-black/5 dark:bg-white/2 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
          {/* Technical Drawing Backdrop */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gold/10 flex items-center justify-center rounded-full mx-auto mb-8">
              <FileText className="w-12 h-12 text-gold" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-4">Chronological Disclosure Viewer</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed mb-10">
              For complete transparency, all historical reports are accessible in our 
              technical document viewer. Detailed operational summaries and auditor 
              notes are available within the official publication.
            </p>
            <button className="inline-flex items-center gap-3 text-gold font-bold text-[10px] uppercase tracking-[0.3em] hover:gap-6 transition-all">
              Load Digital Flipbook <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Security Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-deepblue via-gold to-deepblue" />
        </div>
      </div>
    </div>
  );
}
