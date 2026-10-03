"use client";

import React from "react";
import Image from "next/image";

export function SecretarialComplianceHero() {
  return (
    <section className="relative h-[35vh] min-h-[300px] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blueprint.png" 
          alt="Secretarial Compliance Governance"
          fill
          priority
          className="object-cover object-center opacity-[0.05] grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-transparent dark:from-black dark:via-black/95 dark:to-transparent" />
      </div>

      {/* Institutional Pillar Accent */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-white/2 skew-x-[-15deg] translate-x-1/4 border-l border-white/5" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Corporate Governance</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-white">
            Secretarial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver to-gold">Compliance Report</span>
          </h1>
          <p className="text-lg text-silver/50 leading-relaxed max-w-xl">
            Annual secretarial compliance reports as per regulatory requirements. 
            Detailed audit of J Pan Tubular Components Limited's adherence to the Companies Act 
            and SEBI mandates.
          </p>
        </div>
      </div>
    </section>
  );
}
