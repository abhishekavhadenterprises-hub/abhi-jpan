"use client";

import React, { useState } from "react";
import { Download, Eye, FileText, Calendar, Clock, ChevronRight, FileBarChart } from "lucide-react";
import { ShareholdingDetailModal } from "./ShareholdingDetailModal";

const reports = [
  {
    id: 1,
    title: "Shareholding Pattern – Q3 2025",
    period: "Q3 FY 2024-25",
    date: "Jan 15, 2025",
    status: "Latest"
  },
  {
    id: 2,
    title: "Shareholding Pattern – Q2 2025",
    period: "Q2 FY 2024-25",
    date: "Oct 18, 2024",
    status: "Audited"
  },
  {
    id: 3,
    title: "Shareholding Pattern – Q1 2025",
    period: "Q1 FY 2024-25",
    date: "Jul 21, 2024",
    status: "Audited"
  },
  {
    id: 4,
    title: "Shareholding Pattern – Q4 2024",
    period: "Q4 FY 2023-24",
    date: "Apr 25, 2024",
    status: "Annual"
  },
  {
    id: 5,
    title: "Shareholding Pattern – Q3 2024",
    period: "Q3 FY 2023-24",
    date: "Jan 20, 2024",
    status: "Audited"
  },
  {
    id: 6,
    title: "Shareholding Pattern – Q2 2024",
    period: "Q2 FY 2023-24",
    date: "Oct 22, 2023",
    status: "Audited"
  }
];

export function ShareholdingListing() {
  const [selectedReport, setSelectedReport] = useState<null | typeof reports[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (report: typeof reports[0]) => {
    setSelectedReport(report);
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
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Filing Archive</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Quarterly <br />
                <span className="text-muted-foreground">Disclosures</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               <div className="px-6 py-2 bg-white dark:bg-charcoal border border-border rounded-sm flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Repository Sync Active</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report, idx) => (
              <div 
                key={report.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group relative bg-white dark:bg-charcoal border border-border p-8 rounded-sm hover:border-gold transition-all duration-500 flex flex-col animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              >
                {/* Period Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-silver/5 flex items-center justify-center rounded-sm border border-border group-hover:bg-gold group-hover:border-transparent transition-all">
                       <FileBarChart className="w-4 h-4 text-gold group-hover:text-charcoal transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                       {report.period}
                    </span>
                  </div>
                  {report.status === 'Latest' && (
                    <span className="px-3 py-1 bg-gold text-charcoal text-[8px] font-bold uppercase tracking-widest rounded-sm">
                      {report.status}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-4 line-clamp-1">
                  {report.title}
                </h3>

                <div className="flex items-center gap-4 mb-10 text-muted-foreground/50">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{report.date}</span>
                   </div>
                   <div className="w-px h-3 bg-border" />
                   <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Verified</span>
                   </div>
                </div>

                <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleView(report)}
                      className="flex items-center justify-center gap-2 py-4 bg-silver/10 dark:bg-white/5 hover:bg-gold hover:text-charcoal border border-transparent rounded-sm transition-all group/btn"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground group-hover/btn:text-charcoal" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">View</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-charcoal dark:bg-white/2 hover:bg-deepblue text-white rounded-sm transition-all">
                      <Download className="w-4 h-4" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination/Load More */}
          <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
             <button className="inline-flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] hover:text-gold transition-colors group">
               Access Multi-Year Disclosure Logs
               <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      <ShareholdingDetailModal 
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
