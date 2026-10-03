"use client";

import React from "react";
import { TrendingUp, Target, Zap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function InvestorPresentationIntro() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D2440] dark:text-white mb-6 leading-[1.15] tracking-tight">
              Visualizing our <br />
              <span className="italic bg-gradient-to-r from-[#0D2440] via-[#2E5E99] to-[#7BA4D0] bg-clip-text text-transparent inline-block pb-1 pr-1">
                Future Trajectory
              </span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              Our investor presentations provide a high-fidelity window into 
              J Pan Tubular Components Limited's strategic decision-making. We combine rigorous financial 
              analytics with a clear vision for industrial innovation, 
              ensuring our growth narrative is both data-driven and forward-looking.
            </p>
            
            <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/20 max-w-md">
              <div className="space-y-1.5">
                <div className="text-3xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white">85%</div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.18em]">
                  Institutional Confidence Index
                </p>
              </div>
              <div className="space-y-1.5 border-l border-[#7BA4D0]/25 pl-6">
                <div className="text-3xl md:text-4xl font-heading font-bold text-[#0D2440] dark:text-white">12+</div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.18em]">
                  Global Manufacturing Verticals
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            {[
              {
                icon: TrendingUp,
                title: "Strategic Alignment",
                desc: "Synchronizing quarterly performance with long-term industrial market leadership."
              },
              {
                icon: Target,
                title: "Value Creation",
                desc: "Detailed breakdowns of capital allocation and operational efficiency benchmarks."
              },
              {
                icon: Zap,
                title: "Future Readiness",
                desc: "Providing clarity on R&D roadmaps and sustainable manufacturing expansion."
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 md:p-8 bg-[#F8FAFC] dark:bg-charcoal/40 border border-[#7BA4D0]/25 hover:border-[#2E5E99]/50 rounded-3xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-5">
                  <div className="w-13 h-13 p-3.5 bg-white dark:bg-charcoal flex items-center justify-center rounded-2xl shrink-0 border border-[#7BA4D0]/30 transition-all duration-300 group-hover:bg-[#0D2440] group-hover:text-white group-hover:border-[#0D2440]">
                    <item.icon className="w-6 h-6 text-[#2E5E99] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-[#0D2440] dark:text-white uppercase tracking-wider group-hover:text-[#2E5E99] transition-colors">
                        {item.title}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#2E5E99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
