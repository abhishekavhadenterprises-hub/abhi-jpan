"use client";

import React from "react";
import { X, FileText, Download, Share2, ExternalLink, ShieldCheck } from "lucide-react";

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0D2440]/80 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl md:rounded-3xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[92vh] sm:max-h-[85vh]">
        {/* Sidebar: Metadata */}
        <div className="w-full md:w-80 p-4 sm:p-6 md:p-8 bg-[#F8FAFC] dark:bg-black/30 border-b md:border-b-0 md:border-r border-[#7BA4D0]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-6 bg-[#2E5E99]" />
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

            <div className="mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#0D2440] dark:text-white mb-1.5 sm:mb-2 block tracking-tight">
                {displayYear}
              </span>
              <h2 className="text-sm sm:text-base font-heading font-semibold text-[#0D2440]/80 dark:text-white/80 leading-snug">
                {displayTitle}
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <p className="text-[10px] sm:text-[11px] font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Audited & Verified</p>
              </div>
              <p className="text-xs text-[#0D2440]/60 dark:text-white/60 leading-relaxed">
                Official statutory filing containing audited financial statements, director reports, and governance disclosures for {displayYear}.
              </p>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 space-y-2.5 sm:space-y-3">
            <a 
              href={downloadLink}
              download
              className="w-full bg-[#0D2440] hover:bg-[#2E5E99] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Official PDF
            </a>
            <a 
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-[#2E5E99]" />
              Open in Full Viewer
            </a>
            <button 
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-full bg-transparent border border-slate-200 dark:border-white/10 hover:border-[#7BA4D0]/50 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Link
            </button>
          </div>
        </div>

        {/* Main Content: PDF Preview Panel */}
        <div className="flex-grow bg-[#EBF3FC]/40 dark:bg-black/50 flex flex-col relative overflow-hidden min-h-[460px] md:min-h-[580px] w-full">
          <iframe
            src={`${downloadLink}#view=FitH`}
            className="w-full h-full min-h-[460px] md:min-h-[580px] border-0 flex-grow"
            title={displayTitle}
          />
          {/* Bottom Security Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E5E99] via-[#7BA4D0] to-[#2E5E99]" />
        </div>
      </div>
    </div>
  );
}
