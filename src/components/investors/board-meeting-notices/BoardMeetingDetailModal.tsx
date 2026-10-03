"use client";

import React from "react";
import { X, FileText, Download, ShieldCheck, Scale, ClipboardList, ExternalLink } from "lucide-react";

interface BoardNotice {
  title: string;
  date: string;
  agenda: string;
  status: string;
}

interface BoardMeetingDetailModalProps {
  notice: BoardNotice | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BoardMeetingDetailModal({ notice, isOpen, onClose }: BoardMeetingDetailModalProps) {
  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-charcoal border border-border rounded-sm flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 h-[90vh] max-h-[800px]">
        {/* Sidebar: Executive Metadata */}
        <div className="w-full md:w-80 p-8 md:p-10 bg-silver/5 border-b md:border-b-0 md:border-r border-border flex flex-col">
          <button 
            onClick={onClose}
            className="self-start mb-8 p-2 hover:bg-silver/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-6 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-widest text-[10px]">Board Proclamation</span>
          </div>

          <div className="mb-10">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest block mb-2">
              {notice.date}
            </span>
            <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white leading-tight">
              {notice.title}
            </h2>
          </div>

          <div className="space-y-6 mb-auto">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Compliance Status</p>
                <p className="text-[10px] text-muted-foreground">{notice.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-gold" />
              <div>
                <p className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">Authority</p>
                <p className="text-[10px] text-muted-foreground">Board of Directors</p>
              </div>
            </div>
            <div className="bg-white dark:bg-charcoal/40 p-4 border border-border rounded-sm">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardList className="w-3 h-3 text-gold" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Agenda Summary</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {notice.agenda}
              </p>
            </div>
          </div>

          <div className="pt-10 space-y-4">
            <button className="w-full bg-deepblue text-white px-6 py-4 font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <Download className="w-4 h-4" />
              Official Notice PDF
            </button>
            <button className="w-full bg-white dark:bg-charcoal border border-border hover:border-gold px-6 py-4 font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
              <ExternalLink className="w-4 h-4 text-gold" />
              Governance Portal
            </button>
          </div>
        </div>

        {/* Main Content: Executive Doc Viewer Placeholder */}
        <div className="flex-grow bg-black/5 dark:bg-white/2 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gold/10 flex items-center justify-center rounded-full mx-auto mb-8 text-gold">
              <FileText className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-4">Board Proclamation Viewer</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed mb-10">
              The full official board meeting notice, including detailed technical 
              agendas and strategic propositions, is displayed within our 
              secure governance viewer.
            </p>
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white dark:bg-charcoal border border-border rounded-full">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Institutional Authenticity Verified</span>
            </div>
          </div>

          {/* Decorative Technical Lines */}
          <div className="absolute top-0 right-0 p-8 flex flex-col gap-2 items-end">
            <div className="h-0.5 w-16 bg-gold/30" />
            <div className="h-0.5 w-10 bg-gold/30" />
          </div>
          <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-2">
            <div className="h-0.5 w-10 bg-gold/30" />
            <div className="h-0.5 w-16 bg-gold/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
