"use client";

import React from "react";
import { Download, Eye, Calendar, ArrowRight, Presentation, BarChart, PieChart } from "lucide-react";

const presentations = [
  {
    id: 1,
    title: "Quarterly Earnings Presentation - Q3 FY 2024-25",
    date: "Jan 18, 2025",
    summary: "Comprehensive review of Q3 operational benchmarks, financial performance, and manufacturing vertical expansion.",
    type: "Quarterly Results",
    icon: BarChart
  },
  {
    id: 2,
    title: "Capital Markets Day Strategic Narrative",
    date: "Nov 05, 2024",
    summary: "A deep dive into J Pan Tubular Components Limited's 2030 vision, capital allocation strategy, and global market positioning.",
    type: "Corporate Strategy",
    icon: Presentation
  },
  {
    id: 3,
    title: "Investor Presentation - Q2 FY 2024-25",
    date: "Oct 28, 2024",
    summary: "Detailed analysis of first-half fiscal performance and upcoming capacity utilization roadmaps.",
    type: "Quarterly Results",
    icon: BarChart
  },
  {
    id: 4,
    title: "Sustainability & ESG Performance Review",
    date: "Sept 12, 2024",
    summary: "Annual update on environmental stewardship, governance standards, and sustainable tubing innovations.",
    type: "ESG Report",
    icon: PieChart
  }
];

import { InvestorPresentationDetailModal } from "./InvestorPresentationDetailModal";

export function InvestorPresentationListing() {
  const [selectedPresentation, setSelectedPresentation] = React.useState<null | typeof presentations[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleView = (pres: typeof presentations[0]) => {
    setSelectedPresentation(pres);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-silver/5 dark:bg-black/10">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-gold" />
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Strategy Archive</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Growth Narrative <br />
                <span className="text-muted-foreground">& Business Insights</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4 py-2 bg-white dark:bg-charcoal border border-border rounded-sm">
                {presentations.length} Strategic Assets
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {presentations.map((pres) => (
              <div 
                key={pres.id}
                className="group bg-white dark:bg-charcoal border border-border rounded-sm overflow-hidden hover:border-gold transition-all duration-500 flex flex-col"
              >
                <div className="p-10 flex-grow">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-silver/5 dark:bg-white/5 border border-border flex items-center justify-center rounded-sm group-hover:bg-gold/10 transition-colors">
                      <pres.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground border border-border px-3 py-1 uppercase tracking-[0.2em] group-hover:text-gold group-hover:border-gold/30 transition-colors">
                      {pres.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-3 h-3 text-gold" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{pres.date}</span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-6 leading-tight min-h-[4rem]">
                    {pres.title}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {pres.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 border-t border-border">
                  <button 
                    onClick={() => handleView(pres)}
                    className="flex items-center justify-center gap-3 py-6 text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-charcoal hover:bg-silver/5 transition-all group/btn"
                  >
                    <Eye className="w-4 h-4 text-gold group-hover/btn:scale-110 transition-transform" />
                    View Slides
                  </button>
                  <button className="flex items-center justify-center gap-3 py-6 text-[10px] font-bold uppercase tracking-widest bg-deepblue hover:bg-gold text-white hover:text-charcoal transition-all">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Utility */}
          <div className="mt-16 text-center">
            <button className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:text-gold transition-colors py-4 group">
              Discover Historical Strategic Presentations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <InvestorPresentationDetailModal 
        presentation={selectedPresentation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
