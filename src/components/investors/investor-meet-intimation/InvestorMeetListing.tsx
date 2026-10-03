"use client";

import React from "react";
import { Download, Eye, FileText, Calendar, ArrowRight, Mic, Video, Monitor } from "lucide-react";

const interactions = [
  {
    id: 1,
    type: "Earnings Call",
    title: "Q3 FY 2024-25 Earnings Conference Call",
    date: "Jan 18, 2025",
    desc: "Discussion on quarterly financial performance and strategic manufacturing vertical growth.",
    icon: Mic
  },
  {
    id: 2,
    type: "Conference",
    title: "Global Industrial Leaders Summit 2024",
    date: "Nov 12, 2024",
    desc: "Presentation on J Pan Tubular Components Limited's sustainable tubing innovations and market expansion.",
    icon: Monitor
  },
  {
    id: 3,
    type: "Analyst Meet",
    title: "Annual Institutional Analyst Meet 2024",
    date: "Sept 25, 2024",
    desc: "Deep dive into long-term capital allocation and technical R&D roadmap.",
    icon: Video
  },
  {
    id: 4,
    type: "Earnings Call",
    title: "Q2 FY 2024-25 Earnings Conference Call",
    date: "Oct 28, 2024",
    desc: "Institutional call regarding half-yearly audited financial results and outlook.",
    icon: Mic
  }
];

import { InvestorMeetDetailModal } from "./InvestorMeetDetailModal";

export function InvestorMeetListing() {
  const [selectedItem, setSelectedItem] = React.useState<null | typeof interactions[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleView = (item: typeof interactions[0]) => {
    setSelectedItem(item);
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
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Communication Records</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Interaction <br />
                <span className="text-muted-foreground">& Disclosures</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4 py-2 bg-white dark:bg-charcoal border border-border rounded-full">
                {interactions.length} Verified Intimations
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interactions.map((item) => (
              <div 
                key={item.id}
                className="group bg-white dark:bg-charcoal border border-border p-8 rounded-sm hover:border-gold transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-silver/10 dark:bg-white/5 border border-border flex items-center justify-center rounded-sm group-hover:bg-gold/10 transition-colors">
                    <item.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[9px] font-bold text-gold border border-gold/20 px-3 py-1 uppercase tracking-[0.2em]">
                    {item.type}
                  </span>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-4 line-clamp-2 min-h-[3.5rem]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-border">
                  <button 
                    onClick={() => handleView(item)}
                    className="flex-grow flex items-center justify-center gap-2 bg-white dark:bg-charcoal border border-border hover:border-gold px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    <Eye className="w-4 h-4 text-gold" />
                    View
                  </button>
                  <button className="flex-grow flex items-center justify-center gap-2 bg-deepblue text-white px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all btn-slide-gold group">
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
              Load Historical Market Interactions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <InvestorMeetDetailModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
