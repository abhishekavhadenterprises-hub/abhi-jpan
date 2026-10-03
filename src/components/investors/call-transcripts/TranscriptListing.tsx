"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Download, Calendar, Radio, ChevronRight, Headphones, FileText, AlignLeft } from "lucide-react";

import { TranscriptDetailModal } from "./TranscriptDetailModal";

const transcripts = [
  {
    id: 1,
    title: "Earnings Call Transcript – Q3 FY25",
    date: "Jan 22, 2025",
    type: "Earnings Call",
    fiscal: "FY 2024-25",
    quarter: "Q3",
    audioHref: "/call-audio-recordings"
  },
  {
    id: 2,
    title: "Investor Meet Transcript – Institutional Day",
    date: "Nov 15, 2024",
    type: "Investor Meet",
    fiscal: "FY 2024-25",
    quarter: "Q2",
    audioHref: "/call-audio-recordings"
  },
  {
    id: 3,
    title: "Earnings Call Transcript – Q2 FY25",
    date: "Oct 28, 2024",
    type: "Earnings Call",
    fiscal: "FY 2024-25",
    quarter: "Q2",
    audioHref: "/call-audio-recordings"
  },
  {
    id: 4,
    title: "Analyst Day Presentation Transcript",
    date: "Aug 10, 2024",
    type: "Analyst Day",
    fiscal: "FY 2024-25",
    quarter: "Q2",
    audioHref: "/call-audio-recordings"
  },
  {
    id: 5,
    title: "Earnings Call Transcript – Q1 FY25",
    date: "Jul 25, 2024",
    type: "Earnings Call",
    fiscal: "FY 2024-25",
    quarter: "Q1",
    audioHref: "/call-audio-recordings"
  },
  {
    id: 6,
    title: "Earnings Call Transcript – Q4 FY24",
    date: "May 15, 2024",
    type: "Earnings Call",
    fiscal: "FY 2023-24",
    quarter: "Q4",
    audioHref: "/call-audio-recordings"
  }
];

export function TranscriptListing() {
  const [selectedTranscript, setSelectedTranscript] = React.useState<null | typeof transcripts[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleRead = (item: typeof transcripts[0]) => {
    setSelectedTranscript(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-silver/5 dark:bg-black/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-10 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Written Archive</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Verbatim <br />
                <span className="text-muted-foreground">Document Repository</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               <div className="px-6 py-2 bg-white dark:bg-charcoal border border-border rounded-sm flex items-center gap-3">
                  <AlignLeft className="w-3 h-3 text-gold" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Digital Transcription Active</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transcripts.map((item, idx) => (
              <div 
                key={item.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group relative bg-white dark:bg-charcoal border border-border p-8 rounded-sm hover:border-gold transition-all duration-500 flex flex-col animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-silver/5 flex items-center justify-center rounded-sm border border-border group-hover:bg-gold group-hover:border-transparent transition-all">
                       <FileText className="w-4 h-4 text-gold group-hover:text-charcoal transition-colors" />
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                       Ref: J Pan_TR_{item.date.replace(/,?\s/g, '_')}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest border border-gold/30 text-gold bg-gold/5">
                    {item.quarter}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-6 line-clamp-2 min-h-[64px]">
                  {item.title}
                </h3>

                <div className="flex flex-wrap items-center gap-6 mb-10 text-muted-foreground/50">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.type}</span>
                   </div>
                </div>

                <div className="mt-auto pt-8 border-t border-border space-y-4">
                   <button 
                    onClick={() => handleRead(item)}
                    className="w-full flex items-center justify-between py-4 px-6 bg-charcoal dark:bg-white text-white dark:text-charcoal rounded-sm hover:bg-gold hover:text-charcoal transition-all group/read"
                   >
                      <div className="flex items-center gap-3">
                         <BookOpen className="w-4 h-4" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Read Transcript</span>
                      </div>
                      <ChevronRight className="w-4 h-4 group-hover/read:translate-x-2 transition-transform" />
                   </button>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-3 py-3 bg-silver/10 dark:bg-white/5 hover:bg-silver/20 rounded-sm text-[9px] font-bold uppercase tracking-widest text-muted-foreground transition-all">
                         <Download className="w-3.5 h-3.5" />
                         PDF
                      </button>
                      <Link 
                        href={item.audioHref}
                        className="flex items-center justify-center gap-3 py-3 bg-gold/5 border border-gold/20 hover:bg-gold/10 rounded-sm text-[9px] font-bold uppercase tracking-widest text-gold transition-all"
                      >
                         <Headphones className="w-3.5 h-3.5" />
                         Listen
                      </Link>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Multi-Year Access */}
          <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
             <button className="inline-flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] hover:text-gold transition-colors group">
               Access Historical Transcript Archive (2015-2024)
               <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      <TranscriptDetailModal 
        transcript={selectedTranscript}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

