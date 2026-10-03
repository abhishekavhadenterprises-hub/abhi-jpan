"use client";

import React from "react";
import { Mail, ArrowRight } from "lucide-react";

export function PressCTA() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="bg-charcoal border border-border/10 p-8 md:p-12 rounded-sm text-center max-w-5xl mx-auto backdrop-blur-sm relative overflow-hidden">
          {/* Decorative Blueprint Background Overlay inside the card */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/blueprint.png')] bg-repeat opacity-20" />
          </div>

          <div className="relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gold flex items-center justify-center rounded-full mx-auto mb-6">
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-charcoal" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Stay Updated with <br />
              <span className="text-gold">Official News</span>
            </h2>
            
            <p className="text-silver/60 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Subscribe to our media list to receive the latest press releases, 
              corporate announcements, and industry updates directly in your inbox.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your professional email"
                className="flex-grow bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-white focus:outline-none focus:border-gold transition-colors"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-deepblue text-white font-bold rounded-sm flex items-center justify-center gap-3 transition-all whitespace-nowrap btn-slide-gold group"
              >
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <p className="mt-6 text-[10px] text-silver/40 uppercase tracking-[0.2em]">
              No spam. Only official corporate communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
