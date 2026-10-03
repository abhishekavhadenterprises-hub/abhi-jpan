"use client";

import React from "react";
import { X, FileText, Download, Calendar, ExternalLink, Shield } from "lucide-react";

interface FinancialReport {
  title: string;
  period: string;
  date: string;
  type: string;
  status: string;
}

interface FinancialDetailModalProps {
  report: FinancialReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FinancialDetailModal({ report, isOpen, onClose }: FinancialDetailModalProps) {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-charcoal border border-border rounded-sm flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Left Side: Info & Metadata */}
        <div className="w-full md:w-1/3 p-8 md:p-12 bg-silver/5 border-b md:border-b-0 md:border-r border-border">
          <button 
            onClick={onClose}
            className="mb-8 p-2 hover:bg-silver/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Official Disclosure</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal dark:text-white mb-6 leading-tight">
            {report.title}
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Filing Date</p>
                <p className="text-sm font-bold text-charcoal dark:text-white">{report.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Audit Status</p>
                <p className="text-sm font-bold text-charcoal dark:text-white">{report.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FileText className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Report Type</p>
                <p className="text-sm font-bold text-charcoal dark:text-white">{report.type}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-deepblue text-white px-6 py-4 font-bold text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <Download className="w-4 h-4" />
              Download Official PDF
            </button>
            <button className="w-full bg-white dark:bg-charcoal border border-border hover:border-gold px-6 py-4 font-bold text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <ExternalLink className="w-4 h-4" />
              Technical Reconciliation
            </button>
          </div>
        </div>

        {/* Right Side: Preview / Viewer Placeholder */}
        <div className="w-full md:w-2/3 h-[400px] md:h-auto bg-black/5 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
          
          <div className="relative z-10 text-center p-12">
            <div className="w-20 h-20 bg-gold/10 flex items-center justify-center rounded-full mx-auto mb-6">
              <FileText className="w-10 h-10 text-gold" />
            </div>
            <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white mb-4">Secure Report Viewer</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
              For security reasons, full financial reports are displayed within our 
              encrypted technical viewer. Click "Download" to save a permanent copy 
              of the audited filing.
            </p>
          </div>

          {/* Decorative PDF Bottom Strip */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gold" />
        </div>
      </div>
    </div>
  );
}
