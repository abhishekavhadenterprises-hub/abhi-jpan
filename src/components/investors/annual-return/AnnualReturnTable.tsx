"use client";

import React from "react";
import { Download, Eye, FileText, Calendar, CheckCircle2 } from "lucide-react";

const filings = [
  {
    id: 1,
    year: "2024-25",
    title: "Annual Return (Form MGT-7)",
    date: "Oct 28, 2024",
    status: "Filed",
    auth: "MCA / SEBI"
  },
  {
    id: 2,
    year: "2023-24",
    title: "Annual Return (Form MGT-7)",
    date: "Oct 30, 2023",
    status: "Filed",
    auth: "MCA / SEBI"
  },
  {
    id: 3,
    year: "2022-23",
    title: "Annual Return (Form MGT-7)",
    date: "Nov 02, 2022",
    status: "Filed",
    auth: "MCA / SEBI"
  },
  {
    id: 4,
    year: "2021-22",
    title: "Annual Return (Form MGT-7)",
    date: "Oct 15, 2021",
    status: "Filed",
    auth: "MCA / SEBI"
  }
];

import { AnnualReturnDetailModal } from "./AnnualReturnDetailModal";

export function AnnualReturnTable() {
  const [selectedFiling, setSelectedFiling] = React.useState<null | typeof filings[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleView = (filing: typeof filings[0]) => {
    setSelectedFiling(filing);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-white dark:bg-charcoal">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-8 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Filing Repository</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 py-1 bg-silver/5 rounded-full">
                {filings.length} Filings Found
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-silver/5 dark:bg-white/2">
                  <th className="text-left py-6 px-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Financial Year</th>
                  <th className="text-left py-6 px-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Document Details</th>
                  <th className="text-left py-6 px-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] hidden md:table-cell">Filing Date</th>
                  <th className="text-left py-6 px-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] hidden lg:table-cell">Authority</th>
                  <th className="text-center py-6 px-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filings.map((filing) => (
                  <tr 
                    key={filing.id}
                    className="border-b border-border hover:bg-silver/5 dark:hover:bg-white/2 transition-colors group"
                  >
                    <td className="py-8 px-8">
                      <span className="text-lg font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors">
                        {filing.year}
                      </span>
                    </td>
                    <td className="py-8 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-silver/10 flex items-center justify-center rounded-sm shrink-0">
                          <FileText className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-charcoal dark:text-white mb-1">{filing.title}</h4>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{filing.status}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-8 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4 text-gold" />
                        {filing.date}
                      </div>
                    </td>
                    <td className="py-8 px-8 hidden lg:table-cell">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1 border border-border rounded-sm">
                        {filing.auth}
                      </span>
                    </td>
                    <td className="py-8 px-8">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleView(filing)}
                          className="p-3 bg-white dark:bg-charcoal border border-border hover:border-gold rounded-sm transition-all group/btn" 
                          title="View Document"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground group-hover/btn:text-gold" />
                        </button>
                        <button className="p-3 bg-deepblue hover:bg-gold rounded-sm transition-all" title="Download PDF">
                          <Download className="w-4 h-4 text-white hover:text-charcoal" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Technical Footer Note */}
          <div className="mt-12 p-6 bg-silver/5 dark:bg-white/2 border-l-4 border-gold rounded-r-sm">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <span className="font-bold text-charcoal dark:text-white uppercase tracking-widest mr-2">Note:</span>
              Annual returns are filed digitally with the Ministry of Corporate Affairs (MCA). 
              Physical verification of original filings can be requested through the 
              Compliance Office during official working hours.
            </p>
          </div>
        </div>
      </section>

      <AnnualReturnDetailModal 
        filing={selectedFiling}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
