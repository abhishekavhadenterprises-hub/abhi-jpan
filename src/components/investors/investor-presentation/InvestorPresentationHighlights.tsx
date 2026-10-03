"use client";

import React from "react";
import { TrendingUp, Globe, Building2, ArrowUpRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  {
    id: 1,
    label: "Revenue Growth",
    value: "24.5%",
    trend: "YoY Increase",
    desc: "Robust expansion across high-precision automotive and HVAC segments.",
    icon: TrendingUp,
  },
  {
    id: 2,
    label: "Market Presence",
    value: "18+",
    trend: "Countries",
    desc: "Expanding our strategic footprint across EMEA and Southeast Asian markets.",
    icon: Globe,
  },
  {
    id: 3,
    label: "Expansion Index",
    value: "150K",
    trend: "Sq. Ft. Added",
    desc: "Commissioning new specialized tubing lines for sustainable energy verticals.",
    icon: Building2,
  }
];

export function InvestorPresentationHighlights() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <h2 className="text-3xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-tight tracking-tight">
              Strategic <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Benchmarks
              </span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Key performance indicators reflecting J Pan Tubular Components Limited's operational 
              resilience and market-leading expansion strategies.
            </p>
            <div className="p-5 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 rounded-2xl flex items-center gap-4">
              <div className="w-11 h-11 bg-white dark:bg-charcoal flex items-center justify-center rounded-xl border border-[#7BA4D0]/30 text-[#2E5E99] shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">Efficiency</p>
                <p className="text-[11px] text-muted-foreground">Certified Performance</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {metrics.map((metric, idx) => (
              <motion.div 
                key={metric.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 p-8 rounded-3xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-13 h-13 p-3 bg-white dark:bg-charcoal border border-[#7BA4D0]/30 rounded-2xl flex items-center justify-center group-hover:bg-[#0D2440] group-hover:text-white group-hover:border-[#0D2440] transition-colors">
                    <metric.icon className="w-6 h-6 text-[#2E5E99] group-hover:text-white transition-colors" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-[#2E5E99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-heading font-bold text-[#0D2440] dark:text-white block mb-2 tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-[10px] font-bold text-[#2E5E99] uppercase tracking-[0.18em] bg-[#EBF3FC] dark:bg-[#0D2440]/30 border border-[#7BA4D0]/25 px-2.5 py-1 rounded-full inline-block">
                    {metric.trend}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#0D2440] dark:text-white uppercase tracking-widest mb-3">
                  {metric.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {metric.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
