"use client";

import React from "react";
import { GraduationCap, Code, Award, ShieldCheck } from "lucide-react";

interface JobCompetenciesProps {
  qualifications: string[];
  skills: string[];
  certifications?: string;
}

export function JobCompetencies({ qualifications, skills, certifications }: JobCompetenciesProps) {
  return (
    <section className="py-24 bg-silver/5 dark:bg-black/10 border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Qualifications */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Educational Roadmap</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-10 uppercase tracking-widest">
              Required <br />
              <span className="text-muted-foreground italic font-medium">Qualifications</span>
            </h3>
            <ul className="space-y-6">
              {qualifications.map((item, idx) => (
                <li key={idx} className="flex items-center gap-5">
                   <GraduationCap className="w-5 h-5 text-gold" />
                   <span className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div className="animate-in fade-in slide-in-from-right duration-700">
             <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Competency Framework</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-10 uppercase tracking-widest">
              Technical <br />
              <span className="text-muted-foreground italic font-medium">Proficiency</span>
            </h3>
            <div className="flex flex-wrap gap-4">
               {skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="px-6 py-4 bg-white dark:bg-charcoal border border-border rounded-sm flex items-center gap-4 hover:border-gold transition-all group"
                  >
                     <Code className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                     <span className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest">{skill}</span>
                  </div>
               ))}
            </div>

            {certifications && (
              <div className="mt-12 p-8 border border-gold/10 bg-gold/5 rounded-sm flex items-center gap-6">
                 <Award className="w-8 h-8 text-gold" />
                 <div>
                    <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest mb-1">Preferred Certifications</h4>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">{certifications}</p>
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
