"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Info, ScrollText, ArrowRight } from "lucide-react";
import Link from "next/link";

const infoCards = [
  {
    id: 1,
    title: "Dividend Policy",
    desc: "Our framework for sustainable capital allocation and shareholder returns.",
    icon: Shield,
    link: "View Policy",
    href: "/policies"
  },
  {
    id: 2,
    title: "Insider Trading Code",
    desc: "Rigorous standards for the prevention of insider trading and price manipulation.",
    icon: Lock,
    link: "Read Guidelines",
    href: "/policies"
  },
  {
    id: 3,
    title: "Familiarization Programs",
    desc: "Official orientation and training initiatives for independent directors.",
    icon: Info,
    link: "Explore Details",
    href: "/policies"
  },
  {
    id: 4,
    title: "Terms of Appointment",
    desc: "Formal documentation outlining the roles and duties of independent directors.",
    icon: ScrollText,
    link: "Download Terms",
    href: "/policies"
  }
];

export function FinancialInvestorInfo() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white dark:bg-[#071321] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight mb-3 sm:mb-4">
            Policies & <br />
            <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
              Regulatory Disclosures
            </span>
          </h2>
          <p className="text-[#0D2440]/70 dark:text-white/65 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            Maintaining institutional trust through rigorous compliance and clear 
            operational policies. Explore our foundational governance documents below.
          </p>
        </div>

        {/* 4 Cards Grid (Mobile: Stacked Vertically, Tablet/Desktop: 2-4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {infoCards.map((card, idx) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#F8FAFC] dark:bg-[#0D2440]/30 hover:bg-white dark:hover:bg-[#0D2440]/60 border border-[#7BA4D0]/30 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full w-full shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 overflow-hidden"
            >
              <div>
                <div className="w-11 h-11 sm:w-13 sm:h-13 bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-[#2E5E99] dark:text-[#7BA4D0] group-hover:scale-105 group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shadow-xs">
                  <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-black text-[#0D2440] dark:text-white mb-2 sm:mb-2.5 group-hover:text-[#2E5E99] dark:group-hover:text-[#7BA4D0] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0D2440]/70 dark:text-white/65 leading-relaxed font-normal mb-6 sm:mb-8">
                  {card.desc}
                </p>
              </div>
              
              <Link 
                href={card.href}
                className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider group-hover:gap-3 transition-all pt-3 sm:pt-4 border-t border-[#7BA4D0]/20 min-h-[40px] items-center"
              >
                <span>{card.link}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
