"use client";

import React from "react";
import { Download, Eye, FileText, Calendar, ArrowRight, ShieldCheck, BadgeCheck } from "lucide-react";

const reports = [
  {
    id: 1,
    fy: "2025-2026",
    title: "J Pan Tubular Components Limited - Secretarial Compliance Report",
    date: "2025-2026",
    desc: "Annual secretarial compliance report for the financial year 2025-2026.",
    status: "Latest"
  }
];

import { SecretarialComplianceDetailModal } from "./SecretarialComplianceDetailModal";

export function SecretarialComplianceListing() {
  const [selectedReport, setSelectedReport] = React.useState<null | typeof reports[0]>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleView = (report: typeof reports[0]) => {
    setSelectedReport(report);
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
                <span className="text-gold font-bold uppercase tracking-widest text-xs">Annual Records</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
                Audit Archive <br />
                <span className="text-muted-foreground">& Governance Reports</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-6 py-2 bg-white dark:bg-charcoal border border-border rounded-sm">
                {reports.length} Verified Reports
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="group bg-white dark:bg-charcoal border border-border p-8 md:p-12 rounded-sm hover:border-gold transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Accent */}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        FY {report.fy}
                      </span>
                      <div className="w-1 h-1 bg-border rounded-full" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {report.date}
                      </span>
                      <div className="w-1 h-1 bg-border rounded-full" />
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm border border-border ${
                        report.status === 'Latest' ? 'bg-deepblue text-white' : 'bg-silver/10 text-muted-foreground'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-4">
                      {report.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
                      {report.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
                    <button 
                      onClick={() => handleView(report)}
                      className="flex-grow lg:flex-grow-0 px-8 py-5 bg-silver/5 dark:bg-white/2 border border-border hover:border-gold rounded-sm transition-all group/btn flex items-center justify-center gap-3"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground group-hover/btn:text-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">View Report</span>
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
              Discover Historical Compliance Records
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <SecretarialComplianceDetailModal 
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
