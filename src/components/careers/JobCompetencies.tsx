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
    <section className="py-12 sm:py-20 md:py-28 bg-silver/5 dark:bg-black/10 border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
          
          {/* Qualifications */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="h-0.5 w-8 sm:w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Educational Roadmap</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal dark:text-white mb-6 sm:mb-10 uppercase tracking-widest">
              Required <br />
              <span className="text-muted-foreground italic font-medium">Qualifications</span>
            </h3>
            <ul className="space-y-4 sm:space-y-6">
              {qualifications.map((item, idx) => (
                <li key={idx} className="flex items-start sm:items-center gap-4 sm:gap-5">
                   <GraduationCap className="w-5 h-5 text-gold shrink-0 mt-0.5 sm:mt-0" />
                   <span className="text-xs sm:text-sm font-bold text-charcoal dark:text-white uppercase tracking-wider sm:tracking-widest leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div className="animate-in fade-in slide-in-from-right duration-700">
             <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="h-0.5 w-8 sm:w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs">Competency Framework</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal dark:text-white mb-6 sm:mb-10 uppercase tracking-widest">
              Technical <br />
              <span className="text-muted-foreground italic font-medium">Proficiency</span>
            </h3>
            <div className="flex flex-wrap gap-2.5 sm:gap-4">
               {skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="px-4 sm:px-6 py-2.5 sm:py-3.5 bg-white dark:bg-charcoal border border-border rounded-lg sm:rounded-xl flex items-center gap-2.5 sm:gap-4 hover:border-gold transition-all group"
                  >
                     <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold group-hover:scale-110 transition-transform shrink-0" />
                     <span className="text-[9px] sm:text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-wider sm:tracking-widest">{skill}</span>
                  </div>
               ))}
            </div>

            {certifications && (
              <div className="mt-8 sm:mt-12 p-5 sm:p-7 md:p-8 border border-gold/10 bg-gold/5 rounded-xl sm:rounded-2xl flex items-center gap-4 sm:gap-6">
                 <Award className="w-7 h-7 sm:w-8 sm:h-8 text-gold shrink-0" />
                 <div>
                    <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest mb-1">Preferred Certifications</h4>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{certifications}</p>
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
