"use client";

import React, { useState } from "react";
import { X, Download, Share2, ExternalLink, Calendar, Bookmark, ShieldCheck, Check } from "lucide-react";
import { PdfDocumentViewer } from "@/components/ui/PdfDocumentViewer";

export interface DisclosureItem {
  id: number;
  reg: string;
  title: string;
  date: string;
  desc: string;
  status: string;
  link?: string;
}

interface SEBIDisclosureDetailModalProps {
  disclosure: DisclosureItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SEBIDisclosureDetailModal({ disclosure, isOpen, onClose }: SEBIDisclosureDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !disclosure) return null;

  const documentUrl = disclosure.link || "/sample-report.pdf";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${documentUrl}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0D2440]/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-[#0A192F] border border-[#7BA4D0]/30 dark:border-white/10 rounded-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-in zoom-in-95 duration-300 h-[92vh] max-h-[850px] shadow-2xl">
        {/* Sidebar: Regulatory Metadata */}
        <div className="w-full md:w-80 p-5 sm:p-8 bg-[#F8FAFC] dark:bg-[#0D2440]/60 border-b md:border-b-0 md:border-r border-[#7BA4D0]/20 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-6 bg-[#2E5E99] dark:bg-[#7BA4D0]" />
                <span className="text-[#2E5E99] dark:text-[#7BA4D0] font-heading font-black uppercase tracking-widest text-[10px]">
                  Filing Detail #{String(disclosure.id).padStart(2, "0")}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="md:hidden p-2 hover:bg-[#E7F0FA] dark:hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-[#0D2440] dark:text-white" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 bg-[#2E5E99]/10 text-[#2E5E99] dark:text-[#7BA4D0] text-[10px] font-heading font-bold uppercase tracking-widest rounded-lg border border-[#2E5E99]/20">
                  {disclosure.reg}
                </span>
                <span className="px-2.5 py-1 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-heading font-bold uppercase tracking-widest rounded-lg flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {disclosure.status}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight">
                {disclosure.title}
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                <div>
                  <p className="text-[10px] font-heading font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">Filing Period</p>
                  <p className="text-xs font-heading font-semibold text-[#0D2440] dark:text-white">{disclosure.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
                <div>
                  <p className="text-[10px] font-heading font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-widest">Regulatory Provision</p>
                  <p className="text-xs font-heading font-semibold text-[#0D2440] dark:text-white">{disclosure.reg} (LODR)</p>
                </div>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#071321] border border-[#7BA4D0]/20 rounded-xl">
                <p className="text-xs text-[#0D2440]/70 dark:text-white/70 leading-relaxed font-normal">
                  {disclosure.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#7BA4D0]/15 space-y-3">
            <a 
              href={documentUrl}
              download
              className="w-full bg-[#0D2440] hover:bg-[#2E5E99] text-white px-5 py-3.5 min-h-[44px] font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Official PDF
            </a>
            <div className="grid grid-cols-2 gap-2.5">
              <button 
                onClick={handleCopyLink}
                className="bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 hover:border-[#2E5E99] px-3 py-2.5 min-h-[40px] font-heading font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[#0D2440] dark:text-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />}
                {copied ? "Copied" : "Share"}
              </button>
              <a 
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 hover:border-[#2E5E99] px-3 py-2.5 min-h-[40px] font-heading font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[#0D2440] dark:text-white"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                Full View
              </a>
            </div>
          </div>
        </div>

        {/* Main Content: Interactive PDF Viewer */}
        <div className="flex-grow bg-[#F1F5F9] dark:bg-[#08121e] flex flex-col relative overflow-hidden min-h-0 h-full">
          <PdfDocumentViewer
            url={documentUrl}
            title={disclosure.title}
            className="w-full h-full flex-grow"
          />
        </div>
      </div>
    </div>
  );
}
