"use client";

import React from "react";
import { X, Download, FileText, Share2, Printer, ShieldCheck, Scale, ExternalLink } from "lucide-react";

interface Policy {
  title: string;
  category: string;
  description: string;
  lastUpdated?: string;
  access?: string;
}

interface PoliciesDetailModalProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PoliciesDetailModal({ policy, isOpen, onClose }: PoliciesDetailModalProps) {
  if (!isOpen || !policy) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-full max-h-[92vh] sm:max-h-[90vh] bg-white dark:bg-[#0A192F] rounded-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 shadow-2xl border border-border">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-silver/5">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
            <div className="w-10 h-10 bg-[#2E5E99]/10 text-[#2E5E99] flex items-center justify-center rounded-xl shrink-0">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading font-bold text-base sm:text-lg text-charcoal dark:text-white leading-tight truncate">
                {policy.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 mt-1">
                <span className="text-[9px] font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-widest">{policy.category}</span>
                <div className="w-1 h-1 bg-border rounded-full" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">
                  Official Disclosure
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button className="p-2 sm:p-2.5 text-muted-foreground hover:text-[#2E5E99] hover:bg-silver/10 rounded-lg transition-all min-w-[36px] min-h-[36px] flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="hidden sm:flex p-2.5 text-muted-foreground hover:text-[#2E5E99] hover:bg-silver/10 rounded-lg transition-all min-w-[36px] min-h-[36px] items-center justify-center">
              <Printer className="w-4 h-4" />
            </button>
            <div className="hidden sm:block w-px h-6 bg-border mx-1" />
            <button 
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-charcoal text-white hover:bg-[#2E5E99] rounded-lg transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
          {/* PDF Viewer Placeholder */}
          <div className="flex-grow bg-silver/10 relative group overflow-hidden border-r border-border">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-white dark:bg-charcoal border border-border rounded-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <FileText className="w-10 h-10 text-gold/20" />
              </div>
              <h4 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-4">
                Secure Document Viewer
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-8">
                The full policy document is being rendered in a secure environment. 
                You can view the interactive PDF or download the official copy for your records.
              </p>
              <div className="flex items-center gap-4">
                 <button className="px-8 py-3 bg-gold text-charcoal font-bold text-[9px] uppercase tracking-widest rounded-sm flex items-center gap-3 transition-all btn-slide-white group">
                   <ExternalLink className="w-4 h-4" />
                   Open in New Tab
                 </button>
              </div>
            </div>
            
            {/* Mock PDF Content Structure */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none p-20">
               <div className="w-full h-full border-4 border-dashed border-charcoal/20" />
            </div>
          </div>

          {/* Sidebar / Metadata */}
          <div className="w-full lg:w-80 bg-white dark:bg-charcoal p-8 overflow-y-auto">
            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Document Info</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Last Updated</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">{policy.lastUpdated || "March 2025"}</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Access Level</p>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <p className="text-xs font-bold text-charcoal dark:text-white">{policy.access || "Public"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">Statutory Basis</p>
                  <p className="text-xs font-bold text-charcoal dark:text-white">SEBI Compliance Framework</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Contextual Overview</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {policy.description}
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <button className="w-full flex items-center justify-center gap-3 py-5 bg-charcoal hover:bg-deepblue text-white rounded-sm transition-all">
                <Download className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download Official PDF</span>
              </button>
              <p className="text-[8px] text-center text-muted-foreground/40 mt-4 uppercase tracking-widest">
                File Size: 1.2 MB | format: PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
