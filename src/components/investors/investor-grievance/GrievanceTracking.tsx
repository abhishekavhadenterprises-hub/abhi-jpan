"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight, ShieldCheck, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function GrievanceTracking() {
  const [refId, setRefId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [status, setStatus] = useState<null | 'valid' | 'invalid'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) return;
    setIsTracking(true);
    // Simulate API delay
    setTimeout(() => {
      setIsTracking(false);
      setStatus(refId.length > 5 ? 'valid' : 'invalid');
    }, 1200);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 overflow-hidden relative transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5E99] dark:bg-[#7BA4D0]" />
              Real-time Audit Trace
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white mb-6 leading-[1.12] tracking-tight">
              Track Your <br />
              <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                Grievance Status
              </span>
            </h2>
            <p className="text-[#0D2440]/70 dark:text-white/65 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Input your unique Reference ID to monitor the real-time 
              progress of our internal compliance review.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 p-8 sm:p-12 rounded-3xl shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 relative"
          >
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#2E5E99]" />
                <input 
                  type="text" 
                  value={refId}
                  onChange={(e) => setRefId(e.target.value)}
                  placeholder="Enter Reference ID (e.g., JP_GRV_2025_...)"
                  className="w-full bg-[#F8FAFC] dark:bg-[#071321] border border-[#7BA4D0]/30 rounded-2xl py-4 pl-12 pr-4 text-xs font-heading font-bold uppercase tracking-wider focus:outline-none focus:border-[#2E5E99] transition-all text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/40 dark:placeholder:text-white/40 shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isTracking || !refId.trim()}
                className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] disabled:opacity-50 text-white font-heading font-bold text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shrink-0 shadow-md"
              >
                {isTracking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Track Status</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Dynamic Result State */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-[#7BA4D0]/20"
              >
                {status === 'valid' ? (
                  <div className="p-6 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/40 flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-heading font-black text-[#0D2440] dark:text-white mb-1">
                        Active Ticket Found: {refId.toUpperCase()}
                      </h4>
                      <p className="text-xs text-[#0D2440]/75 dark:text-white/70 leading-relaxed font-normal">
                        Status: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Stage 02 - In Verification</strong>. The compliance desk is reviewing your submitted documentation. Estimated resolution by Day 7.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/40 flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-heading font-black text-[#0D2440] dark:text-white mb-1">
                        Invalid Reference ID
                      </h4>
                      <p className="text-xs text-[#0D2440]/75 dark:text-white/70 leading-relaxed font-normal">
                        Please check your reference number sent via acknowledgment email. If you need assistance, contact our Nodal Desk at <span className="font-bold">enquiry@jpantubular.com</span>.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
