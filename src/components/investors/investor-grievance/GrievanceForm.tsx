"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Send, Upload, ShieldCheck, AlertCircle, CheckCircle2, ChevronDown, User, Mail, Phone, Hash, FileText } from "lucide-react";

const grievanceCategories = [
  "Dividend Issue",
  "Share Transfer / Transmission",
  "Unclaimed Amount / IEPF",
  "Annual Report Non-receipt",
  "Demat / Remat Request",
  "Others"
];

export function GrievanceForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-white dark:bg-[#071321] flex items-center justify-center min-h-[500px] relative overflow-hidden transition-colors">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="container-custom text-center relative z-10 max-w-2xl p-10 md:p-14 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/40 rounded-3xl shadow-xl"
        >
          <div className="w-20 h-20 bg-white dark:bg-[#071321] flex items-center justify-center rounded-2xl mx-auto mb-6 border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-[#0D2440] dark:text-white mb-4 tracking-tight">
            Grievance <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
              Submitted Successfully
            </span>
          </h2>
          <p className="text-[#0D2440]/75 dark:text-white/70 text-sm mb-8 leading-relaxed font-normal">
            Your concern has been registered in our institutional redressal system. 
            A reference ID has been sent to your registered email. Our compliance 
            team will review and respond within 7–15 working days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <div className="px-6 py-3.5 bg-white dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl flex items-center gap-3 shadow-xs">
                <span className="text-[10px] font-heading font-bold text-[#0D2440]/60 dark:text-white/60 uppercase tracking-wider">Ref ID:</span>
                <span className="text-xs font-heading font-black text-[#0D2440] dark:text-white tracking-widest">JP_GRV_2025_4821</span>
             </div>
             <button 
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-3.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-heading font-bold uppercase tracking-widest rounded-2xl transition-all shadow-md cursor-pointer"
             >
               Submit Another Concern
             </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Context */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
                Official Statutory Registry
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white mb-6 leading-[1.12] tracking-tight">
                Institutional <br />
                <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                  Concern Registration
                </span>
              </h2>
              <p className="text-[#0D2440]/75 dark:text-white/70 text-base leading-relaxed mb-8 font-normal">
                Please provide precise details regarding your concern. 
                Accurate documentation ensures a swifter resolution 
                through our verified compliance protocols.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/30">
                  <div className="w-12 h-12 bg-white dark:bg-[#071321] rounded-2xl flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] border border-[#7BA4D0]/30 shrink-0 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                      Secure Transmission
                    </h4>
                    <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                      All submissions are encrypted and handled with absolute confidentiality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D2440]/40 border border-[#7BA4D0]/30">
                  <div className="w-12 h-12 bg-white dark:bg-[#071321] rounded-2xl flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] border border-[#7BA4D0]/30 shrink-0 shadow-xs">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-black text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">
                      Statutory Guidelines
                    </h4>
                    <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal">
                      Submissions must adhere to SEBI and Companies Act disclosure mandates.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actual Form */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-xl shadow-[#2E5E99]/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#2E5E99]" />
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter shareholder name"
                    className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-3 px-4 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] transition-all font-medium"
                  />
                </motion.div>
                {/* Email */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#2E5E99]" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-3 px-4 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] transition-all font-medium"
                  />
                </motion.div>
                {/* Phone */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#2E5E99]" />
                    Contact Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 00000 00000"
                    className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-3 px-4 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] transition-all font-medium"
                  />
                </motion.div>
                {/* Folio / Client ID */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#2E5E99]" />
                    Folio / Client ID (Optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter reference number"
                    className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-3 px-4 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] transition-all font-medium"
                  />
                </motion.div>
              </motion.div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#2E5E99]" />
                  Grievance Category
                </label>
                <div className="relative">
                  <select className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-3 px-4 text-xs text-[#0D2440] dark:text-white appearance-none focus:outline-none focus:border-[#2E5E99] transition-all cursor-pointer font-medium">
                    <option value="" className="text-muted-foreground dark:bg-[#0D2440]">Select a category</option>
                    {grievanceCategories.map(cat => (
                      <option key={cat} value={cat} className="text-[#0D2440] dark:text-white dark:bg-[#0D2440]">{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0D2440]/50 dark:text-white/50 pointer-events-none" />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  placeholder="Brief summary of your concern"
                  className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-3 px-4 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] transition-all font-medium"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Detailed Description</label>
                <textarea 
                  rows={5}
                  placeholder="Describe your concern in detail for faster processing..."
                  className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-3 px-4 text-xs text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] transition-all resize-none font-medium"
                />
              </div>

              {/* File Upload Zone */}
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Supporting Documents (Optional)</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    dragActive ? "border-[#2E5E99] bg-[#E7F0FA]/50" : "border-[#7BA4D0]/30 hover:border-[#2E5E99]/50 bg-[#F8FAFC] dark:bg-[#071321]"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="w-8 h-8 text-[#2E5E99]" />
                    <div>
                      <p className="text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider mb-1">Click to upload or drag & drop</p>
                      <p className="text-[10px] text-[#0D2440]/60 dark:text-white/60 font-medium">PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4.5 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-heading font-bold text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 group/submit shadow-md cursor-pointer"
              >
                Submit Official Grievance
                <Send className="w-4 h-4 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-0.5 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[#0D2440]/60 dark:text-white/60 text-[10px] font-heading font-bold uppercase tracking-widest pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E5E99]" />
                <span>Official Redressal Portal</span>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
