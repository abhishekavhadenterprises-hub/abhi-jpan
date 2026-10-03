"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Upload, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

export function JobApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setFileName(file.name);
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-white dark:bg-charcoal" id="apply">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto p-12 md:p-24 bg-silver/5 border border-border rounded-sm text-center animate-in fade-in zoom-in-95 duration-700">
             <div className="w-20 h-20 bg-gold/10 flex items-center justify-center rounded-full mx-auto mb-10">
                <CheckCircle2 className="w-10 h-10 text-gold" />
             </div>
             <h2 className="text-3xl font-heading font-bold text-charcoal dark:text-white mb-6 uppercase tracking-widest">Application Received</h2>
             <p className="text-muted-foreground text-sm leading-relaxed mb-12">
               Your professional portfolio has been securely uploaded to our recruitment repository. 
               Our talent acquisition team will review your credentials and contact you if there is 
               an institutional alignment.
             </p>
             <button 
               onClick={() => setIsSubmitted(false)}
               className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] hover:text-charcoal dark:hover:text-white transition-colors"
             >
               Submit Another Application
             </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-charcoal border-b border-border" id="apply">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-4 animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Join the Team</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-charcoal dark:text-white leading-tight mb-8">
              Submit Your <br />
              <span className="text-deepblue dark:text-gold italic font-medium">Application</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              Begin your journey towards professional excellence. Complete 
              the digital portfolio submission to initiate our 
              institutional evaluation process.
            </p>
            
            <div className="space-y-8">
               <div className="flex items-start gap-5">
                  <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest mb-1">Secure Submission</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">Your data is protected by industry-standard encryption protocols.</p>
                  </div>
               </div>
               <div className="flex items-start gap-5">
                  <Send className="w-6 h-6 text-gold shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-bold text-charcoal dark:text-white uppercase tracking-widest mb-1">Direct Evaluation</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">Applications go directly to our specialized recruitment desk.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 animate-in fade-in slide-in-from-right duration-700 delay-200">
            <form onSubmit={handleSubmit} className="bg-silver/5 border border-border p-10 md:p-16 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/blueprint.png')] bg-repeat pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your professional name"
                      className="w-full pl-12 pr-6 py-4 bg-white dark:bg-charcoal border border-border rounded-sm text-sm focus:outline-none focus:border-gold transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com"
                      className="w-full pl-12 pr-6 py-4 bg-white dark:bg-charcoal border border-border rounded-sm text-sm focus:outline-none focus:border-gold transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 00000 00000"
                      className="w-full pl-12 pr-6 py-4 bg-white dark:bg-charcoal border border-border rounded-sm text-sm focus:outline-none focus:border-gold transition-all"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Resume / CV (PDF)</label>
                  <div className="relative group">
                    <label className="flex items-center gap-4 w-full pl-12 pr-6 py-4 bg-white dark:bg-charcoal border border-border rounded-sm text-sm cursor-pointer hover:border-gold transition-all overflow-hidden whitespace-nowrap">
                       <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-gold" />
                       <span className={fileName ? "text-charcoal dark:text-white" : "text-muted-foreground"}>
                          {isUploading ? "Uploading Portfolio..." : (fileName || "Upload Resume (PDF)")}
                       </span>
                       <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Cover Letter / Message (Optional)</label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe your suitability for this role..."
                    className="w-full px-6 py-4 bg-white dark:bg-charcoal border border-border rounded-sm text-sm focus:outline-none focus:border-gold transition-all resize-none"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="w-full py-6 bg-charcoal dark:bg-white text-white dark:text-charcoal font-bold text-[10px] uppercase tracking-[0.4em] rounded-sm hover:bg-gold hover:text-charcoal transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing Institutional Application..." : "Submit Application"}
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </button>
                  <p className="text-center mt-6 text-[8px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">
                    By submitting, you agree to our talent acquisition privacy policy.
                  </p>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
