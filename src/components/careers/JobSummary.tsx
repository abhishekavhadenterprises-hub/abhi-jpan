"use client";

import React from "react";
import { Info, UserCircle, Building2 } from "lucide-react";

interface JobSummaryProps {
  job: {
    summary: string;
    department: string;
    reportingTo: string;
  };
}

export function JobSummary({ job }: JobSummaryProps) {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">
          
          <div className="lg:col-span-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="h-0.5 w-8 sm:w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Role Overview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal dark:text-white mb-6 sm:mb-10 leading-tight">
              Institutional <br />
              <span className="text-deepblue dark:text-gold italic font-medium">Objective</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mb-8 sm:mb-12">
              {job.summary}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
               <div className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 bg-silver/5 border border-border rounded-xl sm:rounded-2xl group hover:border-gold transition-all">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-charcoal flex items-center justify-center rounded-lg sm:rounded-xl border border-border group-hover:bg-gold transition-all shrink-0">
                     <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-gold group-hover:text-charcoal" />
                  </div>
                  <div className="min-w-0">
                     <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Department</h4>
                     <p className="text-xs sm:text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest truncate">{job.department}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 bg-silver/5 border border-border rounded-xl sm:rounded-2xl group hover:border-gold transition-all">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-charcoal flex items-center justify-center rounded-lg sm:rounded-xl border border-border group-hover:bg-gold transition-all shrink-0">
                     <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gold group-hover:text-charcoal" />
                  </div>
                  <div className="min-w-0">
                     <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Reporting To</h4>
                     <p className="text-xs sm:text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest truncate">{job.reportingTo}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 animate-in fade-in slide-in-from-right duration-700 delay-200 w-full">
             <div className="p-6 sm:p-8 md:p-10 bg-charcoal dark:bg-black/20 border border-white/5 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
                <div className="relative z-10">
                   <Info className="w-10 h-10 sm:w-12 sm:h-12 text-gold/30 mb-6 sm:mb-8" />
                   <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-4 sm:mb-6 uppercase tracking-widest">Candidate Guide</h3>
                   <p className="text-[11px] sm:text-xs text-silver/40 leading-relaxed mb-6 sm:mb-8 italic">
                     &ldquo;We are looking for individuals who demonstrate both technical 
                     precision and a commitment to J Pan Tubular Components Limited&apos;s core values 
                     of industrial integrity.&rdquo;
                   </p>
                   <div className="h-px w-full bg-white/5 mb-6 sm:mb-8" />
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-silver/30">
                         <span>Application Status</span>
                         <span className="text-gold">Active</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-silver/30">
                         <span>Priority Level</span>
                         <span className="text-white">Institutional</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
