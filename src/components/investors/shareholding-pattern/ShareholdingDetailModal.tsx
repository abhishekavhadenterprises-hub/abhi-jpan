"use client";

import React from "react";
import { X, Download, FileText, Share2, Printer, ExternalLink, ShieldCheck, BarChart3, Info } from "lucide-react";

interface Report {
  title: string;
  period: string;
  date: string;
  status?: string;
}

interface ShareholdingDetailModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareholdingDetailModal({ report, isOpen, onClose }: ShareholdingDetailModalProps) {
  if (!isOpen || !report) return null;

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
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-white leading-tight">
                {report.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{report.period}</span>
                <div className="w-1 h-1 bg-border rounded-full" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                   Fiscal Disclosure
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
          {/* Document Viewer Placeholder */}
          <div className="flex-grow bg-silver/10 relative group overflow-hidden border-r border-border">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-white dark:bg-charcoal border border-border rounded-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <FileText className="w-10 h-10 text-gold/20" />
              </div>
              <h4 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-4">
                Statutory Filing Viewer
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-8">
                Official shareholding pattern filing as submitted to the Exchanges. 
                Optimized for technical review and compliance audit.
              </p>
              <div className="flex items-center gap-4">
                 <button className="px-8 py-3 bg-gold text-charcoal font-bold text-[9px] uppercase tracking-widest rounded-sm flex items-center gap-3 transition-all btn-slide-white group">
                   <ExternalLink className="w-4 h-4" />
                   Open Original Filing
                 </button>
              </div>
            </div>
            
            {/* Design accents */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4 opacity-20 group-hover:opacity-40 transition-opacity">
               <span className="text-[8px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Secure View Mode</span>
               <div className="w-8 h-[1px] bg-charcoal dark:bg-white" />
            </div>
          </div>

          {/* Sidebar / Metadata */}
          <div className="w-full lg:w-80 bg-white dark:bg-charcoal p-8 overflow-y-auto">
            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Filing Details</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Submission Date</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">{report.date}</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Reporting Entity</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">J Pan Tubular Components Limited Limited</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Regulation Basis</p>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <p className="text-xs font-bold text-charcoal dark:text-white">SEBI LODR 2015</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Note to Investors</h4>
              <div className="p-4 bg-silver/5 border border-border rounded-sm">
                <div className="flex items-center gap-2 mb-3">
                   <Info className="w-3.5 h-3.5 text-gold" />
                   <span className="text-[9px] font-bold uppercase tracking-widest text-gold">Ownership Insight</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                   This report provides a detailed break-up of ownership across 
                   promoter and non-promoter categories as of the quarter ending {report.period}.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <button className="w-full flex items-center justify-center gap-3 py-5 bg-charcoal hover:bg-deepblue text-white rounded-sm transition-all">
                <Download className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download Full Report</span>
              </button>
              <p className="text-[8px] text-center text-muted-foreground/40 mt-4 uppercase tracking-widest">
                File Size: 1.8 MB | format: PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
