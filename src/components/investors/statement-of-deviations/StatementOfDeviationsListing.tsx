"use client";

import React from "react";
import { Download, Eye, FileText, Calendar, ArrowRight, ShieldCheck, History } from "lucide-react";
import { useSearchParams } from "next/navigation";

const statements = [
  {
    id: 1,
    period: "Q3 FY 2024–25",
    title: "Statement of Deviations – Q3 2025",
    date: "Jan 18, 2025",
    desc: "Periodic disclosure of fund utilization and deviations for the quarter ended Dec 31, 2024.",
    status: "Latest"
  },
  {
    id: 2,
    period: "Q2 FY 2024–25",
    title: "Statement of Deviations – Q2 2025",
    date: "Oct 28, 2024",
    desc: "Quarterly statement confirming the adherence to planned capital allocation for the period July-Sept 2024.",
    status: "Verified"
  },
  {
    id: 3,
    period: "Q1 FY 2024–25",
    title: "Statement of Deviations – Q1 2025",
    date: "July 24, 2024",
    desc: "Initial quarterly fund utilization report for the beginning of the fiscal year 2024-25.",
    status: "Verified"
  }
];

import { StatementOfDeviationsDetailModal } from "./StatementOfDeviationsDetailModal";

export function StatementOfDeviationsListing(props: any) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <StatementOfDeviationsListingInner {...props} />
    </React.Suspense>
  );
}

function StatementOfDeviationsListingInner() {
  const [selectedStatement, setSelectedStatement] = React.useState<null | typeof statements[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "desc";
  const query = (searchParams.get("q") || "").toLowerCase();

  const sortedStatements = React.useMemo(() => {
    let filtered = [...statements];
    if (query) {
      filtered = filtered.filter(
        (s) => 
          s.title.toLowerCase().includes(query) || 
          s.period.toLowerCase().includes(query) || 
          s.desc.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      if (a.date && b.date) {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (!isNaN(dateA) && !isNaN(dateB)) {
          return sort === "desc" ? dateB - dateA : dateA - dateB;
        }
      }
      return sort === "desc" ? -1 : 1;
    });
  }, [sort]);

  const handleView = (statement: typeof statements[0]) => {
    setSelectedStatement(statement);
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
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Statutory Disclosures</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Periodic Archive <br />
                <span className="text-muted-foreground">& Fund Tracking</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-6 py-2 bg-white dark:bg-charcoal border border-border rounded-sm">
                {sortedStatements.length} Active Records
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {sortedStatements.map((statement, idx) => (
              <div 
                key={statement.id}
                style={{ animationDelay: `${idx * 150}ms` }}
                className="group bg-white dark:bg-charcoal border border-border p-8 md:p-12 rounded-sm hover:border-gold transition-all duration-500 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              >
                {/* Background Accent */}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                        <History className="w-3.5 h-3.5" />
                        {statement.period}
                      </span>
                      <div className="w-1 h-1 bg-border rounded-full" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {statement.date}
                      </span>
                      <div className="w-1 h-1 bg-border rounded-full" />
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm border border-border ${
                        statement.status === 'Latest' ? 'bg-deepblue text-white' : 'bg-silver/10 text-muted-foreground'
                      }`}>
                        {statement.status}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-4">
                      {statement.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
                      {statement.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
                    <button 
                      onClick={() => handleView(statement)}
                      className="flex-grow lg:flex-grow-0 px-8 py-5 bg-silver/5 dark:bg-white/2 border border-border hover:border-gold rounded-sm transition-all group/btn flex items-center justify-center gap-3"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground group-hover/btn:text-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">View Statement</span>
                    </button>
                    <button className="flex-grow lg:flex-grow-0 px-8 py-5 bg-charcoal text-white rounded-sm transition-all flex items-center justify-center gap-3 btn-slide-gold group">
                      <Download className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Load More Utility */}
          <div className="mt-16 text-center">
            <button className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:text-gold transition-colors py-4 group">
              Discover Historical Fund Disclosures
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <StatementOfDeviationsDetailModal 
        statement={selectedStatement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
