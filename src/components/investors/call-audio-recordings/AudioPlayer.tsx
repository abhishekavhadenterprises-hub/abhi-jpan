"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Download, Share2, Maximize2, Headphones, Activity } from "lucide-react";

interface Recording {
  title: string;
  date: string;
  duration: string;
  type: string;
}

interface AudioPlayerProps {
  recording: Recording | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AudioPlayer({ recording, isOpen, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  if (!isOpen || !recording) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] animate-in slide-in-from-bottom duration-500">
      {/* Immersive Backdrop for mobile/compact */}
      <div 
        className="absolute inset-0 -top-screen bg-charcoal/20 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      <div className="relative bg-charcoal dark:bg-black border-t border-white/10">
        {/* Progress Bar (Global) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 cursor-pointer group">
           <div 
            className="h-full bg-gold relative" 
            style={{ width: `${progress}%` }}
           >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
        </div>

        <div className="container-custom py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            
            {/* Meta Hub */}
            <div className="flex items-center gap-6 w-full lg:w-1/4">
               <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center relative overflow-hidden group">
                  <Headphones className="w-6 h-6 text-gold relative z-10" />
                  <div className="absolute inset-0 bg-gold/5 animate-pulse" />
               </div>
               <div className="overflow-hidden">
                  <h3 className="text-white font-bold text-sm md:text-base truncate mb-1">
                    {recording.title}
                  </h3>
                  <div className="flex items-center gap-3">
                     <span className="text-gold font-bold text-[9px] uppercase tracking-widest">{recording.type}</span>
                     <div className="w-1 h-1 bg-white/20 rounded-full" />
                     <span className="text-silver/30 text-[9px] font-bold uppercase tracking-widest">{recording.date}</span>
                  </div>
               </div>
               <button 
                onClick={onClose}
                className="lg:hidden ml-auto p-2 text-white/50 hover:text-gold transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-col items-center gap-4 flex-grow max-w-2xl w-full">
               <div className="flex items-center gap-10">
                  <button className="text-white/30 hover:text-gold transition-colors">
                     <SkipBack className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-white text-charcoal rounded-full flex items-center justify-center hover:bg-gold transition-all scale-110"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-0.5" />}
                  </button>
                  <button className="text-white/30 hover:text-gold transition-colors">
                     <SkipForward className="w-6 h-6" />
                  </button>
               </div>
               <div className="flex items-center gap-4 w-full text-[10px] font-bold text-silver/30 uppercase tracking-[0.2em]">
                  <span>0:00</span>
                  <div className="flex-grow h-0.5 bg-white/5 relative">
                     <div className="absolute inset-0 bg-white/20" style={{ width: '40%' }} />
                  </div>
                  <span>{recording.duration}</span>
               </div>
            </div>

            {/* Utility Hub */}
            <div className="hidden lg:flex items-center justify-end gap-8 w-1/4">
               <div className="flex items-center gap-4 group">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/50 hover:text-gold transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <div className="w-24 h-1 bg-white/5 rounded-full relative overflow-hidden">
                     <div 
                      className="absolute left-0 top-0 h-full bg-white/40 group-hover:bg-gold transition-colors" 
                      style={{ width: `${volume}%` }} 
                     />
                  </div>
               </div>
               <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                  <button className="p-2 text-white/30 hover:text-gold transition-colors" title="Download Audio">
                     <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/30 hover:text-gold transition-colors" title="Share Recording">
                     <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={onClose}
                    className="p-2 bg-white/5 text-white/50 hover:bg-gold hover:text-charcoal rounded-sm transition-all ml-4"
                  >
                     <X className="w-4 h-4" />
                  </button>
               </div>
            </div>

          </div>
        </div>
        
        {/* Institutional Signature */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-4 opacity-[0.02] pointer-events-none hidden xl:flex">
           <span className="text-[10px] font-bold text-white uppercase tracking-[1em] rotate-90">AUTHORIZED</span>
           <Activity className="w-20 h-20 text-white" />
        </div>
      </div>
    </div>
  );
}
