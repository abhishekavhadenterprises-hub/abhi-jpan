"use client";

import React from "react";
import { X, FileText, Download, Share2, ExternalLink, Calendar, History, ShieldCheck, Scale } from "lucide-react";

interface StatementItem {
  id: number;
  period: string;
  title: string;
  date: string;
  desc: string;
  status: string;
}

interface StatementOfDeviationsDetailModalProps {
  statement: StatementItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StatementOfDeviationsDetailModal({ statement, isOpen, onClose }: StatementOfDeviationsDetailModalProps) {
  if (!isOpen || !statement) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-charcoal border border-border rounded-sm flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 h-[90vh] max-h-[850px]">
        {/* Sidebar: Fiscal Metadata */}
        <div className="w-full md:w-80 p-8 md:p-10 bg-silver/5 border-b md:border-b-0 md:border-r border-border flex flex-col">
          <button 
            onClick={onClose}
            className="self-start mb-8 p-2 hover:bg-silver/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-6 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-[10px]">Statutory Disclosure Detail</span>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-sm border border-gold/20">
                {statement.period}
              </span>
              <span className="px-2 py-1 bg-deepblue text-white text-[9px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {statement.status}
              </span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white leading-tight">
              {statement.title}
            </h2>
          </div>

          <div className="space-y-6 mb-auto">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Filing Date</p>
                <p className="text-[10px] text-muted-foreground">{statement.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Fiscal Period</p>
                <p className="text-[10px] text-muted-foreground">{statement.period}</p>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-charcoal border border-border rounded-sm">
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                "{statement.desc}"
              </p>
            </div>
          </div>

          <div className="pt-10 space-y-4">
            <button className="w-full bg-deepblue text-white px-6 py-4 font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <Download className="w-4 h-4" />
              Download Official PDF
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white dark:bg-charcoal border border-border hover:border-gold px-4 py-3 font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 btn-slide-gold group">
                <Share2 className="w-4 h-4 text-gold" />
                Share
              </button>
              <button className="bg-white dark:bg-charcoal border border-border hover:border-gold px-4 py-3 font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 btn-slide-gold group">
                <ExternalLink className="w-4 h-4 text-gold" />
                BSE/NSE Link
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Document Viewer Placeholder */}
        <div className="flex-grow bg-black/5 dark:bg-white/2 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
          {/* Technical Grid Backdrop */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
          
          <div className="relative z-10 w-full max-w-2xl">
            <div className="aspect-[1/1.414] max-h-[600px] w-full bg-white dark:bg-black rounded-sm border border-border flex flex-col relative group overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[url('/images/blueprint.png')] bg-cover" />
              
              {/* Fake Document Header */}
              <div className="h-20 bg-silver/5 border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded-sm">
                    <FileText className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-charcoal dark:text-white uppercase tracking-widest">J Pan Tubular Components Limited</p>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Statement of Deviations</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Verified</span>
                </div>
              </div>

              {/* Fake Document Body */}
              <div className="flex-grow p-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-silver/10 flex items-center justify-center rounded-full mb-6">
                  <Scale className="w-10 h-10 text-silver/30" />
                </div>
                <h3 className="text-lg font-heading font-bold text-silver/40 mb-2 italic">Institutional Statement Viewer</h3>
                <p className="text-silver/20 text-[9px] uppercase tracking-[0.4em]">Securely Retrieving Fiscal Data...</p>
                
                <div className="mt-12 w-full space-y-4">
                  <div className="h-2 w-full bg-silver/5 rounded-full" />
                  <div className="h-2 w-3/4 bg-silver/5 rounded-full" />
                  <div className="h-2 w-full bg-silver/5 rounded-full" />
                  <div className="h-2 w-1/2 bg-silver/5 rounded-full" />
                </div>
              </div>

              {/* Progress Bar Decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-silver/5">
                <div className="h-full w-2/3 bg-gold" />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Statutory Fund Verification Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Institutional Corner Markers */}
          <div className="absolute top-0 right-0 p-10">
            <div className="h-1 w-20 bg-gold/20" />
            <div className="h-4 w-1 bg-gold/20 mt-2 ml-auto" />
          </div>
          <div className="absolute bottom-0 left-0 p-10">
            <div className="h-4 w-1 bg-gold/20 mb-2" />
            <div className="h-1 w-20 bg-gold/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
