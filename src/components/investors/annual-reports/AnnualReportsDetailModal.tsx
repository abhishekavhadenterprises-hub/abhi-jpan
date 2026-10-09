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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0D2440]/80 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl md:rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[85vh]">
        {/* Sidebar: Metadata */}
        <div className="w-full md:w-80 p-6 md:p-8 bg-[#F8FAFC] dark:bg-black/30 border-b md:border-b-0 md:border-r border-[#7BA4D0]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-6 bg-[#2E5E99]" />
                <span className="text-[#2E5E99] font-bold uppercase tracking-widest text-[10px]">Fiscal Publication</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-[#7BA4D0]/10 rounded-full transition-colors text-[#0D2440] dark:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-3xl sm:text-4xl font-heading font-black text-[#0D2440] dark:text-white mb-2 block tracking-tight">
                {displayYear}
              </span>
              <h2 className="text-base font-heading font-semibold text-[#0D2440]/80 dark:text-white/80 leading-snug">
                {displayTitle}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <p className="text-[11px] font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Audited & Verified</p>
              </div>
              <p className="text-xs text-[#0D2440]/60 dark:text-white/60 leading-relaxed">
                Official statutory filing containing audited financial statements, director reports, and governance disclosures for {displayYear}.
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <a 
              href={downloadLink}
              download
              className="w-full bg-[#0D2440] hover:bg-[#2E5E99] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Official PDF
            </a>
            <button 
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-full bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 hover:border-[#2E5E99] text-[#0D2440] dark:text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5"
            >
              <Share2 className="w-4 h-4 text-[#2E5E99]" />
              Share Link
            </button>
          </div>
        </div>

        {/* Main Content: PDF Preview Panel */}
        <div className="flex-grow bg-[#EBF3FC]/40 dark:bg-black/50 flex flex-col items-center justify-center p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-md">
            <div className="w-20 h-20 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md text-[#2E5E99] dark:text-[#7BA4D0]">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0D2440] dark:text-white mb-3">
              Official Disclosure Document
            </h3>
            <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/70 leading-relaxed mb-8">
              Full statutory accounts, governance disclosures, audit verifications, and notes to financial statements for the fiscal cycle {displayYear}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a 
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5E99] hover:bg-[#0D2440] text-white text-xs font-semibold transition-all shadow-md"
              >
                Open in Full Viewer <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bottom Security Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E5E99] via-[#7BA4D0] to-[#2E5E99]" />
        </div>
      </div>
    </div>
  );
}
