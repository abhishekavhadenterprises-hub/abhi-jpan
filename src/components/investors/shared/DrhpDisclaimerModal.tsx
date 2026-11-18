"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  AlertTriangle, 
  Check, 
  X, 
  ShieldAlert 
} from "lucide-react";

export interface DrhpDisclaimerModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  targetTitle?: string;
}

export function DrhpDisclaimerModal({
  isOpen,
  onConfirm,
  onCancel,
  targetTitle
}: DrhpDisclaimerModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll and pause global Lenis smooth-scroller while modal is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (lenis && typeof lenis.stop === "function") {
        lenis.stop();
      }
      // Reset scroll position to top whenever opened
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="absolute inset-0 bg-[#0D2440]/80 dark:bg-black/90 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        >
          {/* Top Decorative Gradient Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#2E5E99] via-[#7BA4D0] to-[#2E5E99]" />

          {/* Modal Header */}
          <div className="p-5 sm:p-6 pb-4 sm:pb-4 border-b border-[#7BA4D0]/20 bg-[#F8FAFC] dark:bg-[#071321] relative shrink-0">
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#0D2440]/60 dark:text-white/60 hover:text-[#0D2440] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Close disclaimer modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center max-w-lg mx-auto">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#E7F0FA] dark:bg-[#0D2440] border border-[#7BA4D0]/30 flex items-center justify-center text-[#2E5E99] dark:text-[#7BA4D0] mx-auto mb-3 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-heading font-black text-[#2E5E99] dark:text-[#7BA4D0] uppercase tracking-[0.2em] block mb-1">
                Statutory Regulatory Disclaimer
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-black text-[#0D2440] dark:text-white tracking-tight leading-snug">
                Website Disclaimer for DRHP and the IPO AV
              </h2>
              {targetTitle && (
                <p className="text-xs text-[#0D2440]/65 dark:text-white/60 mt-1 font-medium">
                  Material: <span className="font-semibold text-[#0D2440] dark:text-white">{targetTitle}</span>
                </p>
              )}
            </div>
          </div>

          {/* Scrollable Legal Disclaimer Content (Explicit Scrollbar / Traveller Enabled) */}
          <div 
            ref={scrollContainerRef}
            data-lenis-prevent="true"
            tabIndex={0}
            className="p-5 sm:p-6 overflow-y-scroll flex-grow space-y-4 text-xs text-[#0D2440]/80 dark:text-white/80 leading-relaxed font-normal overscroll-contain select-text focus:outline-none 
              [&::-webkit-scrollbar]:w-3 
              [&::-webkit-scrollbar-track]:bg-[#E7F0FA] 
              dark:[&::-webkit-scrollbar-track]:bg-[#071321] 
              [&::-webkit-scrollbar-track]:rounded-full 
              [&::-webkit-scrollbar-thumb]:bg-[#2E5E99] 
              dark:[&::-webkit-scrollbar-thumb]:bg-[#7BA4D0] 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              hover:[&::-webkit-scrollbar-thumb]:bg-[#183B63] 
              dark:hover:[&::-webkit-scrollbar-thumb]:bg-[#A5C7EE] 
              [scrollbar-width:thin] 
              [scrollbar-color:#2E5E99_#E7F0FA] 
              dark:[scrollbar-color:#7BA4D0_#071321]"
          >
            {/* Territory Restriction Alert */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs font-semibold leading-relaxed">
                  THESE MATERIALS ARE NOT DIRECTED AT OR INTENDED TO BE ACCESSED BY PERSONS LOCATED OUTSIDE INDIA. THESE MATERIALS ARE BEING MADE AVAILABLE ON THIS WEBSITE TO COMPLY WITH SECURITIES AND EXCHANGE BOARD OF INDIA (ISSUE OF CAPITAL AND DISCLOSURE REQUIREMENTS) REGULATIONS, 2018, AS AMENDED (“SEBI ICDR REGULATIONS”). NOT FOR ACCESS IN OR BY, OR DISTRIBUTION OR TRANSMISSION IN, INTO OR TO, DIRECTLY OR INDIRECTLY, THE UNITED STATES OF AMERICA (INCLUDING ITS TERRITORIES AND POSSESSIONS), ANY STATE OF THE UNITED STATES AND THE DISTRICT OF COLUMBIA (THE “UNITED STATES”) OR ANY JURISDICTION WHERE IT IS UNLAWFUL TO DO SO.
                </p>
              </div>
            </div>

            {/* Disclaimer Body */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#050D18]/70 border border-[#7BA4D0]/20 space-y-3.5 text-xs">
              <p className="font-bold text-[#0D2440] dark:text-white text-xs uppercase tracking-wide text-rose-600 dark:text-rose-400">
                IMPORTANT: You must read and agree with the terms and conditions of the following disclaimer before continuing.
              </p>

              <p>
                The following disclaimer applies to the Draft Red Herring Prospectus (“DRHP”) and Draft Abridged Prospectus (the “Draft Abridged Prospectus”) of J Pan Tubular Components Limited (“Company”) dated July 10, 2026 filed with the Securities and Exchange Board of India (“SEBI”), BSE Limited and National Stock Exchange of India Limited (“NSE”, and together with BSE, the “Stock Exchanges”), as well as the audio visual film of the Company (“IPO AV”), in relation to the proposed initial public offering of the equity shares of face value of ₹10 each (“Equity Shares”) of the Company (“Offer”).
              </p>

              <div className="p-3 rounded-lg bg-white dark:bg-[#071321] border border-[#7BA4D0]/20 space-y-2">
                <p className="font-semibold text-[#0D2440] dark:text-white">
                  THE DRHP AND DRAFT ABRIDGED PROSPECTUS IS BEING MADE AVAILABLE ON THIS WEBSITE IN ELECTRONIC FORM SOLELY TO COMPLY WITH THE SECURITIES AND EXCHANGE BOARD OF INDIA (ISSUE OF CAPITAL AND DISCLOSURE REQUIREMENTS) REGULATIONS, 2018, AS AMENDED (“SEBI ICDR REGULATIONS”).
                </p>
                <p className="font-semibold text-[#0D2440] dark:text-white">
                  THE IPO AV IS BEING MADE AVAILABLE ON THIS WEBSITE IN ACCORDANCE WITH CIRCULAR ON “AUDIOVISUAL (AV) PRESENTATION OF DISCLOSURES MADE IN PUBLIC ISSUE OFFER DOCUMENTS” DATED MAY 24, 2024, ISSUED BY THE SECURITIES AND EXCHANGE BOARD OF INDIA.
                </p>
              </div>

              <p>
                The DRHP and Draft Abridged Prospectus have been hosted on this website as prescribed under Regulation 26(1) of the Securities and Exchange Board of India (Issue of Capital and Disclosure Requirements) Regulations, 2018, as amended (the “SEBI ICDR Regulations”). Our Company has taken all necessary steps to ensure that the contents of the IPO AV as appearing on this website are identical to the DRHP and Draft Abridged Prospectus filed with the SEBI. You are advised to read this disclaimer carefully before reading, accessing or making any other use of the DRHP, Draft Abridged Prospectus and the IPO AV. In accessing the Draft Red Herring Prospectus, Draft Abridged Prospectus and/or the IPO AV, you agree to be bound by the following terms and conditions, including any modifications to them from time to time.
              </p>

              <p>
                Each of the Draft Red Herring Prospectus, Draft Abridged Prospectus and the IPO AV is directed at, and is intended for distribution to, and use by, residents of India only. No part of the contents of the Draft Red Herring Prospectus, Draft Abridged Prospectus and the IPO AV shall be copied or duplicated in any form by any means or redistributed.
              </p>

              <p>
                The Draft Red Herring Prospectus, Draft Abridged Prospectus and the IPO AV are for information purposes only and do not constitute and should not be construed as, directly or indirectly, an offer or invitation to sell or the solicitation of an offer or invitation to purchase any Equity Shares in any jurisdiction. Any such offer or solicitation, if made, would only be made pursuant to the Red Herring Prospectus (“RHP”) which may be filed with the relevant Registrar of Companies in the future (if you are in India) or the RHP together with any supplementary pricing information. Potential investors should not rely on the DRHP and Draft Abridged Prospectus in making any investment decision.
              </p>

              <p>
                Potential investors should note that investment in the Equity Shares involves a high degree of risk and for details relating to such risks, please refer to the RHP (when available), including the section titled “Risk Factors” on page 30 of the DRHP.
              </p>

              <p>
                The Equity Shares to be issued in the Offer have not been and will not be registered, listed or otherwise qualified in any jurisdiction except India and may not be offered or sold to persons outside of India except in compliance with the applicable laws of each such jurisdiction. In particular, the Equity Shares to be issued in the Offer have not been and will not be registered under the U.S. Securities Act or the securities laws of any state of the United States and may not be offered or sold within the United States, except pursuant to an exemption from, or in a transaction not subject to, the registration requirements of the U.S. Securities Act and applicable state securities laws. The Equity Shares to be issued in the Issue will be offered and sold only outside the United States in “offshore transactions” as defined and in reliance on Regulation S under the U.S. Securities Act.
              </p>

              <p>
                Hem Securities Limited (“Book Running Lead Manager”), and its respective affiliates, directors, officers, agents, representatives, advisers and employees do not accept any liability whatsoever, direct or indirect, that may arise from the use of the information contained on this website.
              </p>

              <p>
                The information in the DRHP, Draft Abridged Prospectus and the IPO AV is as of the date thereof and none of the Company, Promoters, the Book Running Lead Manager or their respective affiliates, directors, officers, agents, representatives, advisers or employees are under any obligation to update or revise the DRHP, Draft Abridged Prospectus and the IPO AV to reflect circumstances arising after the date thereof.
              </p>

              <p>
                You are reminded that documents transmitted in electronic form may be altered or changed during the process of transmission and consequently, neither the Company, the Book Running Lead Manager nor any of their respective affiliates, directors, officers, agents, representatives, advisers or employees accepts any liability or responsibility whatsoever in respect of alterations or changes which have taken place during the course of transmission of the DRHP, Draft Abridged Prospectus and the IPO AV in electronic format.
              </p>

              <p>
                You are accessing this website at your own risk, and it is your responsibility to take precautions to ensure that it is free from viruses.
              </p>
            </div>

            {/* Exit Warning Banner */}
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 font-semibold text-xs flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>
                IF YOU ARE NOT PERMITTED TO VIEW THE MATERIALS ON THIS WEBSITE OR ARE IN ANY DOUBT AS TO WHETHER YOU ARE PERMITTED TO VIEW THESE MATERIALS, PLEASE EXIT THIS WEBPAGE.
              </span>
            </div>

          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-[#7BA4D0]/20 bg-[#F8FAFC] dark:bg-[#071321] flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>I Do Not Confirm</span>
            </button>

            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>I Confirm</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
