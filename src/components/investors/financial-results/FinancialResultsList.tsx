"use client";

import React from "react";
import { FileText, Download, Eye, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";

const results = [
  {
    id: 1,
    title: "Unaudited Financial Results - Quarter 3",
    period: "Q3 FY 2024-25",
    date: "Jan 14, 2026",
    type: "Quarterly Report",
    status: "Published"
  },
  {
    id: 2,
    title: "Unaudited Financial Results - Quarter 2",
    period: "Q2 FY 2024-25",
    date: "Oct 22, 2025",
    type: "Quarterly Report",
    status: "Published"
  },
  {
    id: 3,
    title: "Audited Financial Results - Annual",
    period: "Full Year 2023-24",
    date: "May 15, 2024",
    type: "Annual Report",
    status: "Audited"
  },
  {
    id: 4,
    title: "Unaudited Financial Results - Quarter 1",
    period: "Q1 FY 2024-25",
    date: "July 28, 2025",
    type: "Quarterly Report",
    status: "Published"
  },
  {
    id: 5,
    title: "Unaudited Financial Results - Quarter 4",
    period: "Q4 FY 2023-24",
    date: "April 10, 2024",
    type: "Quarterly Report",
    status: "Published"
  }
];

import { FinancialDetailModal } from "./FinancialDetailModal";

export function FinancialResultsList(props: any) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <FinancialResultsListInner {...props} />
    </React.Suspense>
  );
}

function FinancialResultsListInner() {
  const [selectedReport, setSelectedReport] = React.useState<null | typeof results[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const filteredResults = React.useMemo(() => {
    let filtered = [...results];
    if (query) {
      filtered = filtered.filter(
        (r) => 
          r.title.toLowerCase().includes(query) || 
          r.period.toLowerCase().includes(query) || 
          r.type.toLowerCase().includes(query) || 
          r.date.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [query]);

  const handleView = (report: typeof results[0]) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-white dark:bg-charcoal">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="w-12 h-1.5 md:w-1.5 md:h-10 bg-gold rounded-full" />
              <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <h2 className="text-xs font-bold text-gold uppercase tracking-[0.4em] mb-1 text-center md:text-left">Disclosure Archive</h2>
                <div className="h-[1px] w-full bg-border" />
              </div>
            </div>
            <div className="text-[10px] font-bold text-charcoal/70 dark:text-silver/90 uppercase tracking-widest text-center md:text-right">
              Showing {filteredResults.length} results for FY 2024-25
            </div>
          </div>

          <div className="space-y-4">
            {filteredResults.map((result) => (
              <div 
                key={result.id}
                className="group bg-silver/5 dark:bg-white/2 border border-border rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:border-gold hover:bg-white dark:hover:bg-charcoal transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white dark:bg-charcoal border border-border flex items-center justify-center rounded-sm shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold text-deepblue dark:text-gold uppercase tracking-widest px-2 py-0.5 bg-deepblue/5 dark:bg-gold/10 rounded-sm">
                        {result.period}
                      </span>
                      <span className="text-[10px] font-bold text-charcoal/70 dark:text-silver/90 uppercase tracking-widest">
                        {result.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors">
                      {result.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full md:w-auto">
                  <div className="flex items-center gap-6 text-[10px] font-bold text-charcoal/70 dark:text-silver/90 uppercase tracking-widest border-r border-border pr-8 hidden lg:flex">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      {result.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {result.status}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <a 
                      href="/sample-report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow md:flex-grow-0 flex items-center justify-center gap-3 bg-white dark:bg-charcoal border border-border hover:border-gold px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                    <a 
                      href="/sample-report.pdf"
                      download
                      className="flex-grow md:flex-grow-0 flex items-center justify-center gap-3 bg-deepblue hover:bg-gold text-white hover:text-charcoal px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Placeholder */}
          <div className="mt-16 text-center">
            <button className="text-[10px] font-bold text-charcoal/70 dark:text-silver/90 uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:text-gold transition-colors">
              Load Historical Archive <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <FinancialDetailModal 
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
