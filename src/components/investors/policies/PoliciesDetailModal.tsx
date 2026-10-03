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
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-white leading-tight">
                {policy.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{policy.category}</span>
                <div className="w-1 h-1 bg-border rounded-full" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  Official Disclosure
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
