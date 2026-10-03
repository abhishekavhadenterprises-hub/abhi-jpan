"use client";

import React, { useState } from "react";
import { Eye, Download, Calendar, Newspaper, Globe, ChevronRight, ExternalLink } from "lucide-react";

import { PublicationDetailModal } from "./PublicationDetailModal";

const publications = [
  {
    id: 1,
    title: "Financial Results Notice – Q3 FY25",
    newspaper: "Financial Express",
    date: "Jan 22, 2025",
    language: "English",
    category: "Financial"
  },
  {
    id: 2,
    title: "Financial Results Notice – Q3 FY25",
    newspaper: "Jansatta",
    date: "Jan 22, 2025",
    language: "Hindi",
    category: "Financial"
  },
  {
    id: 3,
    title: "AGM Public Notice – 2024",
    newspaper: "The Economic Times",
    date: "Aug 15, 2024",
    language: "English",
    category: "Statutory"
  },
  {
    id: 4,
    title: "AGM Public Notice – 2024",
    newspaper: "Navbharat Times",
    date: "Aug 15, 2024",
    language: "Hindi",
    category: "Statutory"
  },
  {
    id: 5,
    title: "Unclaimed Dividend Notice – 2024",
    newspaper: "Financial Express",
    date: "Oct 10, 2024",
    language: "English",
    category: "Investor Info"
  },
  {
    id: 6,
    title: "Postal Ballot Notice – 2024",
    newspaper: "Jansatta",
    date: "Jun 05, 2024",
    language: "Hindi",
    category: "Governance"
  }
];

export function PublicationListing() {
  const [selectedPublication, setSelectedPublication] = useState<null | typeof publications[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (item: typeof publications[0]) => {
    setSelectedPublication(item);
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
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Press Archive</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Publication <br />
                <span className="text-muted-foreground">Log & Clippings</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               <div className="px-6 py-2 bg-white dark:bg-charcoal border border-border rounded-sm flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Bilingual Archiving Active</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((item, idx) => (
              <div 
                key={item.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group relative bg-white dark:bg-charcoal border border-border p-8 rounded-sm hover:border-gold transition-all duration-500 flex flex-col animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              >
                {/* Header Info */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-silver/5 flex items-center justify-center rounded-sm border border-border group-hover:bg-gold group-hover:border-transparent transition-all">
                       <Newspaper className="w-4 h-4 text-gold group-hover:text-charcoal transition-colors" />
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                       {item.newspaper}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest border ${
                    item.language === 'English' 
                    ? 'border-deepblue/30 text-deepblue bg-deepblue/5' 
                    : 'border-gold/30 text-gold bg-gold/5'
                  }`}>
                    {item.language}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-4 line-clamp-2 min-h-[56px]">
                  {item.title}
                </h3>

                <div className="flex items-center gap-6 mb-10 text-muted-foreground/50">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.category}</span>
                   </div>
                </div>

                <div className="mt-auto pt-8 border-t border-border grid grid-cols-2 gap-4">
                   <button 
                    onClick={() => handleView(item)}
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
            ))}
          </div>

          {/* Multi-Year Access */}
          <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
             <button className="inline-flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] hover:text-gold transition-colors group">
               Access Historical Publication Clippings (2015-2024)
               <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      <PublicationDetailModal 
        publication={selectedPublication}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

