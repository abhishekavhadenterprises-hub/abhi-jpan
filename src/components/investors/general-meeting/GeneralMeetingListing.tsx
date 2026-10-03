"use client";

import React from "react";
import { Download, Eye, FileText, Calendar, ArrowRight } from "lucide-react";

const notices = [
  {
    id: 1,
    type: "AGM",
    title: "Notice of 20th Annual General Meeting",
    date: "Sept 25, 2024",
    desc: "Official notice and explanatory statement for the upcoming shareholder assembly.",
    status: "Upcoming"
  },
  {
    id: 2,
    type: "EGM",
    title: "Extraordinary General Meeting Notice",
    date: "June 12, 2024",
    desc: "Notice regarding strategic capital allocation and structural adjustments.",
    status: "Completed"
  },
  {
    id: 3,
    type: "AGM",
    title: "Notice of 19th Annual General Meeting",
    date: "Sept 28, 2023",
    desc: "Archived notice for the fiscal year 2023 performance review and voting.",
    status: "Completed"
  },
  {
    id: 4,
    type: "EGM",
    title: "Extraordinary General Meeting Notice",
    date: "Jan 15, 2023",
    desc: "Discussion on technical manufacturing expansion and subsidiary integration.",
    status: "Completed"
  }
];

import { GeneralMeetingDetailModal } from "./GeneralMeetingDetailModal";

export function GeneralMeetingListing() {
  const [selectedNotice, setSelectedNotice] = React.useState<null | typeof notices[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleView = (notice: typeof notices[0]) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-silver/5 dark:bg-black/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Statutory Documents</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Meeting Notices <br />
                <span className="text-muted-foreground">& Proclamations</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4 py-2 bg-white dark:bg-charcoal border border-border rounded-full">
                {notices.length} Official Records
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {notices.map((notice) => (
              <div 
                key={notice.id}
                className="group bg-white dark:bg-charcoal border border-border p-6 md:p-10 rounded-sm hover:border-gold transition-all duration-500 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12"
              >
                <div className="flex items-start md:items-center gap-8">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 bg-silver/10 dark:bg-white/5 border border-border flex flex-col items-center justify-center rounded-sm group-hover:scale-110 transition-transform">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${notice.type === "AGM" ? "text-gold" : "text-deepblue dark:text-gold"}`}>
                        {notice.type}
                      </span>
                      <FileText className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                    </div>
                    {notice.status === "Upcoming" && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gold rounded-full animate-pulse border-2 border-white dark:border-charcoal" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gold" />
                        {notice.date}
                      </span>
                      <div className="w-1 h-1 bg-border rounded-full" />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${notice.status === "Upcoming" ? "text-gold" : "text-muted-foreground"}`}>
                        {notice.status}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                      {notice.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                  <button 
                    onClick={() => handleView(notice)}
                    className="flex-grow lg:flex-grow-0 flex items-center justify-center gap-3 bg-white dark:bg-charcoal border border-border hover:border-gold px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    View Notice
                  </button>
                  <button className="flex-grow lg:flex-grow-0 flex items-center justify-center gap-3 bg-deepblue text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all btn-slide-gold group">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <button className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:text-gold transition-colors py-4 group">
              Load Historical Meeting Records
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <GeneralMeetingDetailModal 
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
