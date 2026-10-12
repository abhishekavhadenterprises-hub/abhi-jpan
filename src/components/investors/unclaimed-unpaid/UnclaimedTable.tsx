"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronRight, Download, User, Receipt, ExternalLink, ShieldAlert } from "lucide-react";

const unclaimedData = [
  {
    id: 1,
    name: "Rajesh Kumar Mehta",
    folio: "JPN004523",
    amount: "₹ 12,450.00",
    year: "2023-24",
    status: "Unclaimed",
    type: "Final Dividend"
  },
  {
    id: 2,
    name: "Sunita Devi Sharma",
    folio: "JPN009112",
    amount: "₹ 8,120.00",
    year: "2023-24",
    status: "Unpaid",
    type: "Interim Dividend"
  },
  {
    id: 3,
    name: "Amitabh Vishwakarma",
    folio: "JPN002234",
    amount: "₹ 24,900.00",
    year: "2022-23",
    status: "Unclaimed",
    type: "Final Dividend"
  },
  {
    id: 4,
    name: "Priya Malhotra",
    folio: "JPN005567",
    amount: "₹ 5,600.00",
    year: "2022-23",
    status: "Unclaimed",
    type: "Final Dividend"
  },
  {
    id: 5,
    name: "Vikram Singh Rathore",
    folio: "JPN007788",
    amount: "₹ 18,340.00",
    year: "2021-22",
    status: "IEPF Pending",
    type: "Unclaimed Shares"
  },
  {
    id: 6,
    name: "Ananya Iyer",
    folio: "JPN001122",
    amount: "₹ 2,450.00",
    year: "2023-24",
    status: "Unpaid",
    type: "Final Dividend"
  }
];

export function UnclaimedTable() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
      <div className="container-custom relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-6 sm:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white leading-tight tracking-tight">
              Shareholder <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Entitlement Data
              </span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center w-full sm:w-auto"
          >
             <a 
                href="/documents/j-pan-unclaimed-database.pdf" 
                download="J_Pan_Tubular_Unclaimed_Database.pdf"
                className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-[#0D2440] hover:bg-[#2E5E99] text-white text-xs font-bold uppercase tracking-widest rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 transition-all group min-h-[44px]"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                <span>Download Full Database (PDF)</span>
             </a>
          </motion.div>
        </div>

        {/* Technical Table Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-silver/10 [&::-webkit-scrollbar-thumb]:bg-[#7BA4D0]/50 hover:[&::-webkit-scrollbar-thumb]:bg-[#2E5E99]/80 [&::-webkit-scrollbar-thumb]:rounded-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#EBF3FC]/80 dark:bg-[#0D2440]/30 border-b border-[#7BA4D0]/25">
                  <th className="px-4 sm:px-6 py-3.5 sm:py-5 text-[10px] font-bold text-[#0D2440] dark:text-white uppercase tracking-widest whitespace-nowrap">Shareholder Details</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-5 text-[10px] font-bold text-[#0D2440] dark:text-white uppercase tracking-widest whitespace-nowrap">Folio / Client ID</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-5 text-[10px] font-bold text-[#0D2440] dark:text-white uppercase tracking-widest whitespace-nowrap">Entitlement Type</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-5 text-[10px] font-bold text-[#0D2440] dark:text-white uppercase tracking-widest whitespace-nowrap text-right">Amount</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-5 text-[10px] font-bold text-[#0D2440] dark:text-white uppercase tracking-widest whitespace-nowrap">Period</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-5 text-[10px] font-bold text-[#0D2440] dark:text-white uppercase tracking-widest whitespace-nowrap">Status</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-5 text-[10px] font-bold text-[#0D2440] dark:text-white uppercase tracking-widest whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <motion.tbody 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="divide-y divide-[#7BA4D0]/15"
              >
                {unclaimedData.map((row) => (
                  <motion.tr 
                    variants={rowVariants}
                    key={row.id} 
                    className="hover:bg-white/80 dark:hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td className="px-4 sm:px-6 py-3.5 sm:py-5">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white dark:bg-charcoal border border-[#7BA4D0]/25 flex items-center justify-center rounded-full text-[#2E5E99] group-hover:bg-[#0D2440] group-hover:text-white group-hover:border-[#0D2440] transition-colors duration-200 shrink-0">
                             <User className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-[#0D2440] dark:text-white tracking-wide whitespace-nowrap">{row.name}</span>
                       </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-5 text-xs font-heading font-semibold text-muted-foreground tracking-wider whitespace-nowrap">{row.folio}</td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-5">
                       <div className="flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-[#2E5E99] shrink-0" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{row.type}</span>
                       </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-5 text-xs font-heading font-black text-[#0D2440] dark:text-white tracking-tight text-right whitespace-nowrap">{row.amount}</td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-5 text-xs font-heading font-bold text-muted-foreground whitespace-nowrap">{row.year}</td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-5 whitespace-nowrap">
                       <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 w-max ${
                          row.status === 'Unclaimed' 
                          ? 'border-[#7BA4D0]/30 text-[#2E5E99] bg-[#EBF3FC] dark:bg-[#0D2440]/30' 
                          : row.status === 'IEPF Pending'
                          ? 'border-amber-400/40 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30'
                          : 'border-[#7BA4D0]/30 text-[#0D2440] dark:text-[#7BA4D0] bg-[#F2F7FD] dark:bg-[#0D2440]/20'
                       }`}>
                          {row.status === 'IEPF Pending' && <ShieldAlert className="w-3 h-3" />}
                          {row.status}
                       </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-5 text-center">
                       <button className="p-2 sm:p-2.5 min-w-[36px] min-h-[36px] bg-white dark:bg-charcoal border border-[#7BA4D0]/30 hover:bg-[#0D2440] hover:text-white text-[#2E5E99] transition-all duration-200 rounded-lg sm:rounded-xl inline-flex items-center justify-center" aria-label={`View details for ${row.name}`}>
                          <ExternalLink className="w-3.5 h-3.5" />
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination / Archive Access */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-12 text-center"
        >
           <button className="inline-flex items-center gap-2 sm:gap-3 text-xs font-bold text-[#0D2440] dark:text-[#7BA4D0] uppercase tracking-widest hover:text-[#2E5E99] transition-colors group p-2">
             <span>Access Historical Unclaimed Dividends Archive</span>
             <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform shrink-0" />
           </button>
        </motion.div>
      </div>
    </section>
  );
}
