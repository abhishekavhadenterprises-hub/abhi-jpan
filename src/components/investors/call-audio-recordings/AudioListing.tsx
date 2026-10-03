"use client";

import React from "react";
import { Play, Download, FileText, Clock, Calendar, Radio, ChevronRight, Activity } from "lucide-react";

import { AudioPlayer } from "./AudioPlayer";

const recordings = [
  {
    id: 1,
    title: "Earnings Call – Q3 FY25",
    date: "Jan 22, 2025",
    duration: "45:20",
    type: "Earnings Call",
    fiscal: "FY 2024-25",
    quarter: "Q3"
  },
  {
    id: 2,
    title: "Investor Meet – Institutional Day",
    date: "Nov 15, 2024",
    duration: "1:12:05",
    type: "Investor Meet",
    fiscal: "FY 2024-25",
    quarter: "Q2"
  },
  {
    id: 3,
    title: "Earnings Call – Q2 FY25",
    date: "Oct 28, 2024",
    duration: "42:15",
    type: "Earnings Call",
    fiscal: "FY 2024-25",
    quarter: "Q2"
  },
  {
    id: 4,
    title: "Analyst Day Presentation",
    date: "Aug 10, 2024",
    duration: "2:05:30",
    type: "Analyst Day",
    fiscal: "FY 2024-25",
    quarter: "Q2"
  },
  {
    id: 5,
    title: "Earnings Call – Q1 FY25",
    date: "Jul 25, 2024",
    duration: "38:40",
    type: "Earnings Call",
    fiscal: "FY 2024-25",
    quarter: "Q1"
  },
  {
    id: 6,
    title: "Earnings Call – Q4 FY24",
    date: "May 15, 2024",
    duration: "48:10",
    type: "Earnings Call",
    fiscal: "FY 2023-24",
    quarter: "Q4"
  }
];

export function AudioListing() {
  const [selectedRecording, setSelectedRecording] = React.useState<null | typeof recordings[0]>(null);
  const [isPlayerOpen, setIsPlayerOpen] = React.useState(false);

  const handlePlay = (item: typeof recordings[0]) => {
    setSelectedRecording(item);
    setIsPlayerOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-silver/5 dark:bg-black/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-10 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Audio Archive</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Call <br />
                <span className="text-muted-foreground">Log & Transcripts</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               <div className="px-6 py-2 bg-white dark:bg-charcoal border border-border rounded-sm flex items-center gap-3">
                  <Activity className="w-3 h-3 text-gold animate-pulse" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Acoustic Repository Verified</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recordings.map((item, idx) => (
              <div 
                key={item.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group relative bg-white dark:bg-charcoal border border-border p-8 rounded-sm hover:border-gold transition-all duration-500 flex flex-col md:flex-row items-center gap-10 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              >
                {/* Play Trigger UI */}
                <div className="relative shrink-0">
                   <button 
                    onClick={() => handlePlay(item)}
                    className="w-20 h-20 bg-charcoal dark:bg-white text-white dark:text-charcoal rounded-sm flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all group/play"
                   >
                      <Play className="w-8 h-8 group-hover/play:scale-110 transition-transform fill-current" />
                   </button>
                   <div className="absolute -bottom-2 -right-2 bg-gold text-charcoal text-[8px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">
                      {item.duration}
                   </div>
                </div>

                {/* Info Hub */}
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                    <span className="px-3 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest border border-gold/30 text-gold bg-gold/5">
                      {item.type}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Radio className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.quarter} {item.fiscal}</span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-6">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-6 border-t border-border">
                     <button className="flex items-center gap-3 text-[9px] font-bold text-muted-foreground hover:text-gold uppercase tracking-[0.2em] transition-colors">
                        <Download className="w-4 h-4" />
                        Audio (.MP3)
                     </button>
                     <div className="w-px h-3 bg-border" />
                     <button className="flex items-center gap-3 text-[9px] font-bold text-muted-foreground hover:text-gold uppercase tracking-[0.2em] transition-colors">
                        <FileText className="w-4 h-4" />
                        Transcript (.PDF)
                     </button>
                  </div>
                </div>

                {/* Design Accent */}
                <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronRight className="w-6 h-6 text-gold" />
                </div>
              </div>
            ))}
          </div>

          {/* Multi-Year Access */}
          <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
             <button className="inline-flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] hover:text-gold transition-colors group">
               Access Historical Audio Archive (2018-2024)
               <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      <AudioPlayer 
        recording={selectedRecording}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
      />
    </>
  );
}

