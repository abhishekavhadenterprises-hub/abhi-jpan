"use client";

import React, { useState } from "react";
import { Loader2, ChevronRight, Activity, ShieldCheck, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function GrievanceTracking() {
  const [refId, setRefId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [status, setStatus] = useState<null | 'valid' | 'invalid'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    // Simulate API delay
    setTimeout(() => {
      setIsTracking(false);
      setStatus(refId.length > 5 ? 'valid' : 'invalid');
    }, 1200);
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
             <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
               Track Your <br />
               <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                 Grievance Status
               </span>
             </h2>
             <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
               Input your unique Reference ID to monitor the real-time 
               progress of our internal compliance review.
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 p-8 md:p-12 rounded-3xl relative"
          >
             <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                   <input 
                    type="text" 
                    value={refId}
                    onChange={(e) => setRefId(e.target.value)}
                    placeholder="Enter Reference ID (e.g., JP_GRV_2025_...)"
                    className="w-full bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-[#2E5E99] transition-all text-[#0D2440] dark:text-white placeholder:text-muted-foreground"
                   />
                   <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <button 
                  type="submit"
                  disabled={isTracking}
                  className="px-8 py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 sm:min-w-[200px]"
                >
                  {isTracking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      Track Status
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
             </form>

             {/* Dynamic Status Display */}
             {status === 'valid' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-2xl flex items-start gap-4"
                >
                   <div className="w-11 h-11 bg-[#EBF3FC] dark:bg-[#0D2440]/40 flex items-center justify-center rounded-xl shrink-0 text-[#2E5E99]">
                      <ShieldCheck className="w-6 h-6" />
                   </div>
                   <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Active Resolution Phase</h4>
                        <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-wider bg-[#EBF3FC] px-2.5 py-0.5 rounded-full border border-[#7BA4D0]/25 animate-pulse">In Verification</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                         Your grievance (Ref: {refId}) has been successfully logged. Our compliance officer 
                         is currently verifying the documentation against our shareholding registry.
                      </p>
                      <div className="w-full h-1.5 bg-[#7BA4D0]/20 rounded-full overflow-hidden">
                         <div className="h-full bg-[#2E5E99] w-2/5 rounded-full" />
                      </div>
                   </div>
                </motion.div>
             )}

             {status === 'invalid' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-red-50 dark:bg-red-950/20 border border-red-300 rounded-2xl flex items-start gap-4"
                >
                   <div className="w-11 h-11 bg-red-100 dark:bg-red-900/30 flex items-center justify-center rounded-xl shrink-0 text-red-600">
                      <AlertCircle className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-xs font-bold text-red-900 dark:text-red-200 uppercase tracking-wider mb-1">Invalid Reference ID</h4>
                      <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
                         The Reference ID provided could not be found in our central redressal registry. 
                         Please verify the ID from your confirmation email or contact the IR desk.
                      </p>
                   </div>
                </motion.div>
             )}
          </motion.div>

          <div className="mt-10 text-center opacity-60">
             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Registry Last Updated: May 09, 2026 – 10:00 AM IST
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
