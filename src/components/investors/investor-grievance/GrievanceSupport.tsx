"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";
import { useLaptopPacing } from "@/hooks/useLaptopPacing";

export function GrievanceSupport() {
  const { revealDuration, staggerDelay, hoverClass } = useLaptopPacing();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay(0.12), 
        delayChildren: 0.1 
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: revealDuration(0.6), ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#050D18] border-b border-[#7BA4D0]/15 relative overflow-hidden transition-colors">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#7BA4D0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.08] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION 1: INVESTOR GRIEVANCES OFFICER (2 Cards Layout)                  */}
        {/* ========================================================================= */}
        <div className="mb-14 sm:mb-20">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-bold uppercase tracking-wider mb-3.5">
                Key Institutional Contacts
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.12] tracking-tight">
                Investor Grievances <br />
                <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                  Officer Desk
                </span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <div className="px-4 sm:px-6 py-2.5 sm:py-3.5 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-3.5 shadow-xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#E7F0FA] dark:bg-[#071321] flex items-center justify-center border border-[#7BA4D0]/30 shrink-0 text-[#2E5E99] dark:text-[#7BA4D0]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-heading font-bold text-[#0D2440] dark:text-white uppercase tracking-wider">
                  Compliance Officers
                </span>
              </div>
            </motion.div>
          </div>

          {/* Two Officers Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {/* Card 1: Ishan Yadav */}
            <motion.div 
              variants={cardVariants}
              className={`bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all ${hoverClass("duration-300")} hover:-translate-y-1 flex flex-col justify-between group`}
            >
              <div>
                {/* Officer Profile Header */}
                <div className="flex items-start gap-4 sm:gap-4.5 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-[#071321] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                    <User className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight">
                      Ishan Yadav
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#2E5E99] dark:text-[#7BA4D0] mt-0.5">
                      Company Secretary & Compliance Officer
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#7BA4D0]/20 mb-5 sm:mb-6" />

                {/* Contact & Company Details */}
                <div className="space-y-4 sm:space-y-5">
                  {/* Company & Office */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-heading font-bold text-[#0D2440] dark:text-white">
                        J Pan Tubular Components Limited
                      </h4>
                      <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed mt-0.5 font-normal">
                        B-2/31, 32 & 42, Site-B, Surajpur Industrial Area, Greater Noida, Gautam Buddha Nagar – 201306, Uttar Pradesh, India.
                      </p>
                    </div>
                  </div>

                  {/* Telephone */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block">
                        Telephone
                      </span>
                      <a 
                        href="tel:+911202560586"
                        className="text-xs sm:text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors"
                      >
                        +91-120-2560 586
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block">
                        Email
                      </span>
                      <a 
                        href="mailto:cs@jpantubular.com" 
                        className="text-xs sm:text-sm font-semibold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline break-all"
                      >
                        cs@jpantubular.com
                      </a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block">
                        Website
                      </span>
                      <a 
                        href="https://www.jpantubular.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline inline-flex items-center gap-1"
                      >
                        <span>www.jpantubular.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Navneet Bhardwaj */}
            <motion.div 
              variants={cardVariants}
              className={`bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all ${hoverClass("duration-300")} hover:-translate-y-1 flex flex-col justify-between group`}
            >
              <div>
                {/* Officer Profile Header */}
                <div className="flex items-start gap-4 sm:gap-4.5 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-[#071321] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                    <User className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight">
                      Navneet Bhardwaj
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#2E5E99] dark:text-[#7BA4D0] mt-0.5">
                      Chief Financial Officer
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#7BA4D0]/20 mb-5 sm:mb-6" />

                {/* Contact & Company Details */}
                <div className="space-y-4 sm:space-y-5">
                  {/* Company & Office */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-heading font-bold text-[#0D2440] dark:text-white">
                        J Pan Tubular Components Limited
                      </h4>
                      <p className="text-xs text-[#0D2440]/70 dark:text-white/65 leading-relaxed mt-0.5 font-normal">
                        B-2/31, 32 & 42, Site-B, Surajpur Industrial Area, Greater Noida, Gautam Buddha Nagar – 201306, Uttar Pradesh, India.
                      </p>
                    </div>
                  </div>

                  {/* Telephone */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block">
                        Telephone
                      </span>
                      <a 
                        href="tel:+911202560586"
                        className="text-xs sm:text-sm font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors"
                      >
                        +91-120-2560 586
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block">
                        Email
                      </span>
                      <a 
                        href="mailto:cfo@jpantubular.com" 
                        className="text-xs sm:text-sm font-semibold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline break-all"
                      >
                        cfo@jpantubular.com
                      </a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block">
                        Website
                      </span>
                      <a 
                        href="https://www.jpantubular.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline inline-flex items-center gap-1"
                      >
                        <span>www.jpantubular.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: REGISTRAR & SHARE TRANSFER AGENT (RTA)                         */}
        {/* ========================================================================= */}
        <div>
          {/* Header */}
          <div className="mb-8 sm:mb-10 text-center sm:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 text-[#2E5E99] dark:text-[#7BA4D0] text-[11px] font-heading font-bold uppercase tracking-wider mb-3.5">
                Statutory Agency
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#0D2440] dark:text-white leading-[1.15] tracking-tight">
                Registrar & Share Transfer Agent{" "}
                <span className="text-[#2E5E99] dark:text-[#7BA4D0]">
                  (RTA)
                </span>
              </h2>
            </motion.div>
          </div>

          {/* RTA Wide Card */}
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white dark:bg-[#0D2440]/30 border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-xl shadow-[#2E5E99]/5 hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Entity & Physical Address */}
              <div className="lg:col-span-6 space-y-6">
                {/* Agency Name & Official Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#E7F0FA] dark:bg-[#071321] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] group-hover:bg-[#2E5E99] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                    <Building2 className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight">
                      Bigshare Services Private Limited
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#0D2440]/80 dark:text-white/80 mt-0.5">
                      (Mr. Babu Raphael C.)
                    </p>
                    <span className="inline-block text-[11px] font-heading font-bold uppercase tracking-wider text-[#2E5E99] dark:text-[#7BA4D0] mt-1">
                      Registrar & Transfer Agent
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#7BA4D0]/20" />

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block mb-1">
                      Address
                    </span>
                    <p className="text-xs sm:text-sm text-[#0D2440]/75 dark:text-white/70 leading-relaxed font-normal">
                      S6-2, 6th Floor, Pinnacle Business Park, Next to Ahura Centre, Mahakali Caves Road, Andheri (East) Mumbai – 400093, Maharashtra, India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Telephone & Fax, Email Support, Website */}
              <div className="lg:col-span-6 space-y-5 lg:pl-4 lg:border-l lg:border-[#7BA4D0]/20">
                {/* Telephone & Fax */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block mb-0.5">
                      Telephone & Fax
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/75 font-normal">
                        Tel:{" "}
                        <a 
                          href="tel:+912262638200" 
                          className="font-semibold text-[#0D2440] dark:text-white hover:text-[#2E5E99] dark:hover:text-[#7BA4D0] transition-colors"
                        >
                          +91-22-6263 8200
                        </a>
                      </p>
                      <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/75 font-normal">
                        Fax:{" "}
                        <span className="font-semibold text-[#0D2440] dark:text-white">
                          +91-22-6263 8299
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block mb-0.5">
                      Email Support
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/75 font-normal">
                        E-mail:{" "}
                        <a 
                          href="mailto:ipo@bigshareonline.com" 
                          className="font-semibold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline"
                        >
                          ipo@bigshareonline.com
                        </a>
                      </p>
                      <p className="text-xs sm:text-sm text-[#0D2440]/80 dark:text-white/75 font-normal">
                        Investor grievance e-mail:{" "}
                        <a 
                          href="mailto:investor@bigshareonline.com" 
                          className="font-semibold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline"
                        >
                          investor@bigshareonline.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E7F0FA]/70 dark:bg-[#071321]/70 border border-[#7BA4D0]/20 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] shrink-0 mt-0.5">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-wider block mb-0.5">
                      Website
                    </span>
                    <a 
                      href="https://www.bigshareonline.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-[#2E5E99] dark:text-[#7BA4D0] hover:underline inline-flex items-center gap-1"
                    >
                      <span>www.bigshareonline.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
