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
    <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Role Overview</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white mb-10 leading-tight">
              Institutional <br />
              <span className="text-deepblue dark:text-gold italic font-medium">Objective</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mb-12">
              {job.summary}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="flex items-center gap-6 p-8 bg-silver/5 border border-border rounded-sm group hover:border-gold transition-all">
                  <div className="w-14 h-14 bg-white dark:bg-charcoal flex items-center justify-center rounded-sm border border-border group-hover:bg-gold transition-all">
                     <Building2 className="w-6 h-6 text-gold group-hover:text-charcoal" />
                  </div>
                  <div>
                     <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Department</h4>
                     <p className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest">{job.department}</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 p-8 bg-silver/5 border border-border rounded-sm group hover:border-gold transition-all">
                  <div className="w-14 h-14 bg-white dark:bg-charcoal flex items-center justify-center rounded-sm border border-border group-hover:bg-gold transition-all">
                     <UserCircle className="w-6 h-6 text-gold group-hover:text-charcoal" />
                  </div>
                  <div>
                     <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Reporting To</h4>
                     <p className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest">{job.reportingTo}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 animate-in fade-in slide-in-from-right duration-700 delay-200">
             <div className="p-10 bg-charcoal dark:bg-black/20 border border-white/5 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/blueprint.png')] bg-repeat" />
                <div className="relative z-10">
                   <Info className="w-12 h-12 text-gold/30 mb-8" />
                   <h3 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-widest">Candidate Guide</h3>
                   <p className="text-[11px] text-silver/40 leading-relaxed mb-8 italic">
                     "We are looking for individuals who demonstrate both technical 
                     precision and a commitment to J Pan Tubular Components Limited's core values 
                     of industrial integrity."
                   </p>
                   <div className="h-px w-full bg-white/5 mb-8" />
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-silver/30">
                         <span>Application Status</span>
                         <span className="text-gold">Active</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-silver/30">
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
