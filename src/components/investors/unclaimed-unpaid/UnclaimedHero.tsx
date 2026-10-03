"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Landmark, Receipt } from "lucide-react";

export function UnclaimedHero() {
  return (
    <section className="relative h-[40vh] min-h-[400px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/finance-secure.png" 
          alt="J Pan Tubular Components Limited Unclaimed and Unpaid Amounts"
          fill
          priority
          className="object-cover object-center opacity-20 grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent" />
      </div>

      {/* Institutional Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/30 via-transparent to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[45%] bg-white/2 skew-x-[-15deg] translate-x-1/4 border-l border-white/5" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="w-8 h-8 bg-gold/10 flex items-center justify-center rounded-sm">
              <Receipt className="w-4 h-4 text-gold" />
            </div>
            <div className="h-px w-10 bg-gold/30" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">Investor Entitlement</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight text-white animate-in fade-in slide-in-from-left duration-700 delay-100">
            Unclaimed & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold italic font-medium">Unpaid Amounts</span>
          </h1>
          
          <p className="text-xl text-silver/40 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left duration-700 delay-200">
            Ensuring the protection of your financial interests through 
            transparent disclosure of outstanding dividends and 
            unclaimed shares.
          </p>
        </div>
      </div>
      
      {/* Design Element */}
      <div className="absolute bottom-12 right-12 animate-in fade-in duration-1000 delay-500">
         <div className="flex flex-col items-end gap-2">
            <span className="text-[8px] font-bold text-gold uppercase tracking-widest">Compliance Standard</span>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">MCA & SEBI LODR</span>
               <ShieldCheck className="w-4 h-4 text-gold" />
            </div>
         </div>
      </div>
    </section>
  );
}
