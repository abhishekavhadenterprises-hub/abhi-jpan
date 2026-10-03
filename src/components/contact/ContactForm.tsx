"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, User, Mail, Phone, MessageSquare, ShieldCheck, CheckCircle2, ChevronDown, Lock } from "lucide-react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";

const subjectOptions = [
  { value: "dividend", label: "Dividend Inquiry" },
  { value: "shareholding", label: "Shareholding Pattern" },
  { value: "annual-report", label: "Annual Report Request" },
  { value: "others", label: "Others" }
];

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function ContactForm({
  title = "Investor Inquiry Engine",
  subtitle = "Direct Inquiry",
  description = "Have specific questions regarding shareholder services, dividends, or financial reporting? Use our secure portal for structured communication."
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.96, 
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const successVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } 
    }
  };

  const titleWords = title.split(" ");
  const mainTitle = titleWords.length > 2 ? titleWords.slice(0, -2).join(" ") : titleWords.slice(0, 1).join(" ");
  const highlightedTitle = titleWords.length > 2 ? titleWords.slice(-2).join(" ") : titleWords.slice(1).join(" ");

  return (
    <section 
      id="enquiry-form" 
      ref={containerRef} 
      className="relative py-16 md:py-28 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 dark:from-[#070b14] dark:via-[#0c1424] dark:to-[#070b14] overflow-hidden border-b border-slate-200/70 dark:border-white/5 scroll-mt-24"
    >
      {/* Anchor for Digital Inquiry scrolling */}
      <div id="digital-inquiry" className="absolute -top-24" />

      {/* Ambient background glows */}

      <div className="container-custom relative z-10">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center min-h-[460px] py-12"
            >
              <div className="max-w-xl w-full mx-auto text-center p-10 md:p-14 rounded-3xl bg-white dark:bg-[#0c1527]/90 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 relative overflow-hidden">
                
                <div className="w-20 h-20 bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center rounded-2xl mx-auto mb-8 border border-emerald-500/25 relative">
                  <div className="absolute inset-0 border border-emerald-500/40 rounded-2xl animate-ping opacity-25" />
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" strokeWidth={1.75} />
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-5 leading-tight">
                  Inquiry <br />
                  <span className="text-[#2E5E99] dark:text-[#7BA4D0] italic font-light">Received</span>
                </h2>
                
                <p className="text-slate-600 dark:text-slate-300 font-normal text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your inquiry has been routed to our 
                  relevant desk. You will receive a response within 
                  24–48 working hours.
                </p>
                
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-4 bg-gradient-to-r from-[#0D2440] to-[#2E5E99] hover:from-[#112f54] hover:to-[#3b72b8] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Another Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              variants={formVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-start"
            >
              {/* Left Column: Heading & Assurances */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-[1.22] tracking-tight overflow-visible">
                  <span className="inline-block">{mainTitle}</span> <br />
                  <span className="inline-block pt-1 pb-2.5 pr-4 bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-[#7BA4D0] font-light italic">
                    {highlightedTitle}
                  </span>
                </h2>

                <p className="text-slate-600 dark:text-slate-300 font-normal text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                  {description}
                </p>
                
                {/* Privacy Assured Card */}
                <div className="p-6 md:p-7 bg-white/90 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl relative overflow-hidden group shadow-blue-950/[0.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2E5E99]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#2E5E99]/10 dark:bg-[#7BA4D0]/10 border border-[#2E5E99]/20 dark:border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0]">
                      <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Privacy Assured</h4>
                      <p className="text-[10px] text-[#2E5E99] dark:text-[#7BA4D0] font-medium flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> End-to-end encrypted protocol
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">
                    Your contact information is handled in accordance with our 
                    Privacy Policy and used solely for addressing your 
                    investor-related queries.
                  </p>
                </div>
              </div>

              {/* Right Column: Modern Luxury Form */}
              <div className="lg:col-span-7">
                <form 
                  onSubmit={handleSubmit} 
                  className="bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl p-7 sm:p-10 md:p-12 border border-slate-200/90 dark:border-white/10 rounded-3xl relative overflow-hidden space-y-6"
                >
                  {/* Subtle top brand hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2E5E99] to-transparent opacity-75" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {/* Full Name */}
                    <div className="space-y-2.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={2} />
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-sm text-[#0D2440] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2E5E99] focus:ring-4 focus:ring-[#2E5E99]/10 focus:bg-white dark:focus:bg-[#0e192f] transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={2} />
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-sm text-[#0D2440] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2E5E99] focus:ring-4 focus:ring-[#2E5E99]/10 focus:bg-white dark:focus:bg-[#0e192f] transition-all"
                      />
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-2.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={2} />
                        Contact Number
                      </label>
                      <input 
                        type="tel" 
                        placeholder="+91 00000 00000"
                        className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-sm text-[#0D2440] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2E5E99] focus:ring-4 focus:ring-[#2E5E99]/10 focus:bg-white dark:focus:bg-[#0e192f] transition-all"
                      />
                    </div>

                    {/* Subject Dropdown */}
                    <div className="space-y-2.5 relative">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0]" strokeWidth={2} />
                        Subject
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full flex items-center justify-between bg-slate-50 dark:bg-white/[0.04] border rounded-xl py-3.5 px-4 text-sm text-left transition-all cursor-pointer ${
                            isDropdownOpen 
                              ? "border-[#2E5E99] ring-4 ring-[#2E5E99]/10 bg-white dark:bg-[#0e192f]" 
                              : "border-slate-200 dark:border-white/10 hover:border-[#2E5E99]/50"
                          }`}
                        >
                          <span className={selectedSubject ? "text-[#0D2440] dark:text-white font-medium" : "text-slate-400 dark:text-slate-500"}>
                            {selectedSubject 
                              ? subjectOptions.find(opt => opt.value === selectedSubject)?.label 
                              : "Select query type"}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-[#2E5E99] dark:text-[#7BA4D0]" : ""}`} />
                        </button>
                        
                        <input type="hidden" name="subject" value={selectedSubject} required />

                        {isDropdownOpen && (
                          <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                        )}

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                              className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-[#0d172b]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 rounded-2xl overflow-hidden z-50 p-1.5"
                            >
                              {subjectOptions.map(opt => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setSelectedSubject(opt.value);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-xs rounded-xl font-medium transition-colors flex items-center justify-between ${
                                    selectedSubject === opt.value
                                      ? "bg-[#2E5E99]/10 text-[#2E5E99] dark:text-[#7BA4D0] font-bold"
                                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                                  }`}
                                >
                                  <span>{opt.label}</span>
                                  {selectedSubject === opt.value && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
                                  )}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Message */}
                  <div className="space-y-2.5 relative z-10">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Detailed Message</label>
                    <textarea 
                      rows={5}
                      required
                      placeholder="Please provide details of your inquiry..."
                      className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-sm text-[#0D2440] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2E5E99] focus:ring-4 focus:ring-[#2E5E99]/10 focus:bg-white dark:focus:bg-[#0e192f] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-gradient-to-r from-[#0D2440] via-[#1A365D] to-[#2E5E99] hover:from-[#112F55] hover:to-[#386fb3] text-white font-semibold text-xs uppercase tracking-[0.25em] rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 group/btn relative overflow-hidden z-10 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Send Inquiry
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
