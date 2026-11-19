"use client";

import React, { useState } from "react";
import { X, Download, FileText, Share2, Printer, ShieldCheck, ExternalLink, Check } from "lucide-react";
import { PdfDocumentViewer } from "@/components/ui/PdfDocumentViewer";

export interface Policy {
  id?: number;
  title: string;
  category: string;
  description: string;
  lastUpdated?: string;
  access?: string;
  link?: string;
}

interface PoliciesDetailModalProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PoliciesDetailModal({ policy, isOpen, onClose }: PoliciesDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !policy) return null;

  const documentUrl = policy.link || "/sample-report.pdf";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${documentUrl}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.open(documentUrl, "_blank");
    }
  };

  return (
    <div data-lenis-prevent="true" className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0D2440]/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-full max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-[#0A192F] rounded-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 shadow-2xl border border-[#7BA4D0]/30 dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#7BA4D0]/20 bg-[#F8FAFC] dark:bg-[#0D2440]/60">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
            <div className="w-10 h-10 bg-[#2E5E99]/15 text-[#2E5E99] dark:text-[#7BA4D0] flex items-center justify-center rounded-xl shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#0D2440] dark:text-white leading-tight truncate">
                {policy.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 mt-1">
                <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider">{policy.category}</span>
                <div className="w-1 h-1 bg-[#7BA4D0]/40 rounded-full" />
                <span className="text-[10px] font-heading font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-wider truncate">
                  Official Statutory Directive
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button 
              onClick={handleCopyLink}
              title={copied ? "Link Copied!" : "Share Link"}
              className="p-2 sm:p-2.5 text-[#0D2440]/70 dark:text-white/70 hover:text-[#2E5E99] hover:bg-[#E7F0FA] dark:hover:bg-white/10 rounded-lg transition-all min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={handlePrint}
              title="Open / Print Document"
              className="hidden sm:flex p-2.5 text-[#0D2440]/70 dark:text-white/70 hover:text-[#2E5E99] hover:bg-[#E7F0FA] dark:hover:bg-white/10 rounded-lg transition-all min-w-[36px] min-h-[36px] items-center justify-center cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <div className="hidden sm:block w-px h-6 bg-[#7BA4D0]/20 mx-1" />
            <button 
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-[#0D2440] text-white hover:bg-[#2E5E99] rounded-lg transition-all min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
          {/* Interactive Multi-Page Canvas PDF Viewer */}
          <div className="flex-grow bg-[#F1F5F9] dark:bg-[#08121e] relative group overflow-hidden border-b lg:border-b-0 lg:border-r border-[#7BA4D0]/20 min-h-0 flex flex-col">
            <PdfDocumentViewer
              url={documentUrl}
              title={policy.title}
              className="w-full h-full flex-grow"
            />
          </div>

          {/* Sidebar / Metadata */}
          <div className="w-full lg:w-80 bg-white dark:bg-[#0D2440] p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[30vh] lg:max-h-full flex flex-col justify-between shrink-0">
            <div>
              <div className="mb-6 pb-6 border-b border-[#7BA4D0]/15">
                <h4 className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] mb-4">
                  Document Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-heading font-medium text-[#0D2440]/55 dark:text-white/55 uppercase tracking-wider mb-1">Last Updated</p>
                    <p className="text-xs font-heading font-bold text-[#0D2440] dark:text-white">{policy.lastUpdated || "May 2026"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-heading font-medium text-[#0D2440]/55 dark:text-white/55 uppercase tracking-wider mb-1">Access Classification</p>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-xs font-heading font-bold text-emerald-700 dark:text-emerald-400">{policy.access || "Statutory"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-heading font-medium text-[#0D2440]/55 dark:text-white/55 uppercase tracking-wider mb-1">Statutory Authority</p>
                    <p className="text-xs font-heading font-semibold text-[#0D2440]/80 dark:text-white/80">SEBI (LODR) & Companies Act, 2013</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] mb-3">
                  Scope & Objective
                </h4>
                <p className="text-xs text-[#0D2440]/75 dark:text-white/75 leading-relaxed font-normal">
                  {policy.description}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#7BA4D0]/15 space-y-3">
              <a 
                href={documentUrl} 
                download
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xl transition-all shadow-md group cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Official PDF</span>
              </a>

              <a 
                href={documentUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#F8FAFC] dark:bg-white/5 hover:bg-[#E7F0FA] dark:hover:bg-white/10 text-[#0D2440] dark:text-white border border-[#7BA4D0]/30 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" />
                <span>Open in Full Viewer</span>
              </a>

              <p className="text-[9px] text-center text-[#0D2440]/40 dark:text-white/40 uppercase tracking-widest pt-1">
                Verified Statutory PDF Document
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
