"use client";

import React from "react";
import { Download, Eye, FileText, Calendar, ArrowRight, ClipboardList } from "lucide-react";

const boardNotices = [
  {
    id: 1,
    title: "Board Meeting – Q3 FY 2024-25",
    date: "Jan 12, 2025",
    agenda: "Review of Q3 Financial Performance & Strategic Expansion Plans.",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Board Meeting – Q2 FY 2024-25",
    date: "Oct 24, 2024",
    agenda: "Approval of Unaudited Financial Results for the half year ended Sept 30.",
    status: "Completed"
  },
  {
    id: 3,
    title: "Board Meeting – Q1 FY 2024-25",
    date: "July 28, 2024",
    agenda: "Technical assessment of manufacturing vertical and budget allocation.",
    status: "Completed"
  },
  {
    id: 4,
    title: "Board Meeting – FY 2023-24 Summary",
    date: "May 15, 2024",
    agenda: "Dividend recommendation and approval of annual audited accounts.",
    status: "Completed"
  }
];

import { BoardMeetingDetailModal } from "./BoardMeetingDetailModal";

export function BoardMeetingListing() {
  const [selectedNotice, setSelectedNotice] = React.useState<null | typeof boardNotices[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleView = (notice: typeof boardNotices[0]) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-white dark:bg-charcoal">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Official Proclamations</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Board Meeting <br />
                <span className="text-muted-foreground">& Resolutions</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4 py-2 bg-silver/5 rounded-full border border-border">
                {boardNotices.length} Proclamations
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {boardNotices.map((notice) => (
              <div 
                key={notice.id}
                className="group bg-silver/5 dark:bg-white/2 border border-border p-8 md:p-12 rounded-sm hover:border-gold transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {notice.date}
                      </span>
                      <div className="w-1 h-1 bg-border rounded-full" />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${notice.status === "Upcoming" ? "text-deepblue dark:text-gold" : "text-muted-foreground"}`}>
                        {notice.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-4">
                      {notice.title}
                    </h3>
                    <div className="flex items-start gap-3 bg-white dark:bg-charcoal/40 p-4 rounded-sm border border-border">
                      <ClipboardList className="w-4 h-4 text-gold shrink-0 mt-1" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-bold text-charcoal dark:text-white uppercase tracking-widest text-[9px] mr-2">Agenda Snapshot:</span>
                        {notice.agenda}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
                    <button 
                      onClick={() => handleView(notice)}
                      className="flex-grow lg:flex-grow-0 p-4 bg-white dark:bg-charcoal border border-border hover:border-gold rounded-sm transition-all group/btn flex items-center justify-center gap-3"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground group-hover/btn:text-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">View notice</span>
                    </button>
                    <button className="flex-grow lg:flex-grow-0 p-4 bg-deepblue hover:bg-gold text-white hover:text-charcoal rounded-sm transition-all flex items-center justify-center gap-3">
                      <Download className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <button className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:text-gold transition-colors py-4 group">
              Load Historical Governance Records
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <BoardMeetingDetailModal 
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
