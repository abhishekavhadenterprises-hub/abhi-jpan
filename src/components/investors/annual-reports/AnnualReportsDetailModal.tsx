"use client";

import React from "react";
import { X, FileText, Download, Share2, ExternalLink, ShieldCheck } from "lucide-react";
import { PdfDocumentViewer } from "@/components/ui/PdfDocumentViewer";

interface AnnualReport {
  id?: number;
  year?: string;
  date?: string;
  title?: string;
  particulars?: string;
  desc?: string;
  link?: string;
}

interface AnnualReportsDetailModalProps {
  report: AnnualReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnnualReportsDetailModal({ report, isOpen, onClose }: AnnualReportsDetailModalProps) {
  if (!isOpen || !report) return null;

  const displayYear = report.date || report.year || "";
  const displayTitle = report.particulars || report.title || "Annual Report";
  const downloadLink = report.link || "/sample-report.pdf";

  return (
    <div data-lenis-prevent="true" className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0D2440]/85 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl md:rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 h-[94vh] sm:h-[90vh] md:h-[88vh]">
        {/* Sidebar: Metadata (Compact on Mobile, Full column on Desktop) */}
        <div className="w-full md:w-80 p-3.5 sm:p-5 md:p-6 lg:p-8 bg-[#F8FAFC] dark:bg-black/40 border-b md:border-b-0 md:border-r border-[#7BA4D0]/20 flex flex-col justify-between shrink-0 overflow-y-auto max-h-[35vh] md:max-h-full">
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-5">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-5 bg-[#2E5E99]" />
                <span className="text-[#2E5E99] font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Fiscal Publication</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-[#7BA4D0]/10 rounded-full transition-colors text-[#0D2440] dark:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-3 sm:mb-5">
              <span className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-[#0D2440] dark:text-white mb-1 block tracking-tight">
                {displayYear}
              </span>
              <h2 className="text-xs sm:text-sm md:text-base font-heading font-semibold text-[#0D2440]/80 dark:text-white/80 leading-snug line-clamp-2 md:line-clamp-none">
                {displayTitle}
              </h2>
            </div>

            <div className="space-y-2.5 sm:space-y-3.5 hidden xs:block">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <p className="text-[10px] sm:text-[11px] font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Audited & Verified</p>
              </div>
              <p className="text-[11px] sm:text-xs text-[#0D2440]/60 dark:text-white/60 leading-relaxed line-clamp-2 md:line-clamp-none">
                Official statutory filing containing audited financial statements, director reports, and governance disclosures for {displayYear}.
              </p>
            </div>
          </div>

          <div className="pt-3 sm:pt-6 space-y-2">
            <a 
              href={downloadLink}
              download
              className="w-full bg-[#0D2440] hover:bg-[#2E5E99] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              Download Official PDF
            </a>
            <a 
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white px-4 py-2 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all hidden sm:flex items-center justify-center gap-2 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#2E5E99]" />
              Open External Tab
            </a>
          </div>
        </div>

        {/* Main Content: Zero-Download Multi-Page Scroll & Zoom Canvas Viewer */}
        <div className="flex-grow bg-[#EBF3FC]/40 dark:bg-black/50 flex flex-col relative overflow-hidden h-full w-full min-h-0">
          <PdfDocumentViewer 
            url={downloadLink}
            title={`${displayYear} — ${displayTitle}`}
            className="w-full h-full flex-grow"
          />
          {/* Bottom Security Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E5E99] via-[#7BA4D0] to-[#2E5E99]" />
        </div>
      </div>
    </div>
  );
}
