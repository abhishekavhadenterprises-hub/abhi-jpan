"use client";

import React from "react";
import { Building2, MapPin, Briefcase, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const relatedJobs = [
  {
    title: "Quality Assurance Specialist",
    department: "Engineering",
    location: "Sarkhej, Ahmedabad",
    experience: "3-5 Years",
    slug: "quality-assurance-specialist"
  },
  {
    title: "Operations Manager",
    department: "Operations",
    location: "Corporate Office",
    experience: "8-12 Years",
    slug: "operations-manager"
  }
];

export function JobRelated() {
  return (
    <section className="py-24 bg-silver/5 dark:bg-black/10 border-b border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Talent Discovery</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight">
              Related <br />
              <span className="text-muted-foreground">Opportunities</span>
            </h2>
          </div>
          
          <Link 
            href="/careers" 
            className="flex items-center gap-4 text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-[0.3em] hover:text-gold transition-colors group animate-in fade-in slide-in-from-right duration-700"
          >
            View All Openings
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {relatedJobs.map((job, idx) => (
              <Link 
                key={idx}
                href={`/careers/${job.slug}`}
                className="group relative bg-white dark:bg-charcoal border border-border p-10 rounded-sm hover:border-gold transition-all duration-500 flex flex-col animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-silver/5 flex items-center justify-center rounded-sm border border-border group-hover:bg-gold group-hover:border-transparent transition-all">
                         <Building2 className="w-4 h-4 text-gold group-hover:text-charcoal transition-colors" />
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                         {job.department}
                      </span>
                   </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-charcoal dark:text-white group-hover:text-gold transition-colors mb-6">
                   {job.title}
                </h3>

                <div className="flex items-center gap-8 text-muted-foreground">
                   <div className="flex items-center gap-3">
                      <MapPin className="w-3.5 h-3.5 text-gold/50" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{job.location}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Briefcase className="w-3.5 h-3.5 text-gold/50" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{job.experience}</span>
                   </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
                   <span className="text-[9px] font-bold text-gold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                   <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
           ))}
        </div>
      </div>
    </section>
  );
}
