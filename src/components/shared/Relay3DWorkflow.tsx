"use client";

import React, { useRef, useState, useEffect, useId } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Play, 
  MousePointer, 
  Plus, 
  CornerDownRight, 
  Zap
} from "lucide-react";

export function Relay3DWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterId = useId();

  // Mouse tilt physics for genuine 3D perspective
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [radarPings, setRadarPings] = useState<Array<{ id: number; x: number; y: number }>>([
    { id: 1, x: 500, y: 380 }
  ]);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      setRadarPings((prev) => [
        ...prev.slice(-2),
        { id: Date.now(), x: 480 + (Math.random() * 60 - 30), y: 350 + (Math.random() * 40 - 20) }
      ]);
    }, 2500);

    return () => {
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#07080a] text-white flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden font-sans select-none">
      {/* Background Micro-Grid & Ambient Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(196, 242, 67, 0.25) 1px, transparent 0),
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 120px 120px, 120px 120px'
        }}
      />
      
      {/* Subtle atmospheric lime glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #c4f243 0%, rgba(10,12,16,0) 70%)' }}
      />

      {/* Top Navbar matching Relay template */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#c4f243] flex items-center justify-center text-black font-black text-lg shadow-[0_0_20px_rgba(196,242,67,0.5)]">
            <span className="tracking-tighter">»</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">Relay</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#customers" className="hover:text-white transition-colors">Customers</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111317] border border-white/10 text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#c4f243] animate-pulse shadow-[0_0_8px_#c4f243]" />
            all systems normal
          </div>
          <button className="px-4 py-2 rounded-full bg-[#c4f243] text-black font-medium text-sm hover:brightness-110 transition-all shadow-[0_0_25px_rgba(196,242,67,0.35)] cursor-pointer">
            Start free
          </button>
        </div>
      </header>

      {/* Main Grid: Headline Left + 3D Stage Right */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8 z-10">
        
        {/* Left Headline Section */}
        <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#13151b] border border-white/10 text-xs font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-xs bg-[#c4f243]" />
            open beta / 240 apps connected
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
            The handoffs run <br />
            <span className="font-serif italic font-normal tracking-normal text-neutral-200">themselves.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-md font-light leading-relaxed">
            Relay runs the steps between your apps and only pings a person when it matters.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="px-6 py-3 rounded-full bg-[#c4f243] text-black font-semibold text-sm hover:brightness-110 transition-all shadow-[0_0_30px_rgba(196,242,67,0.4)] flex items-center gap-2 cursor-pointer">
              Start free
            </button>
            <button className="px-5 py-3 rounded-full bg-[#121418] hover:bg-[#1a1c22] text-white border border-white/10 font-medium text-sm transition-all flex items-center gap-2.5 cursor-pointer">
              <Play className="w-3.5 h-3.5 fill-current text-neutral-300" />
              Watch a build, 2 minutes
            </button>
          </div>

          <div className="pt-2 text-xs font-mono text-neutral-500">
            free for 14 days / no card required
          </div>
        </div>

        {/* Right 3D Workflow Component */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 relative w-full h-[520px] sm:h-[560px] flex items-center justify-center perspective-[1200px]"
        >
          {/* Animated 3D Tilting Canvas Card */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full h-full rounded-2xl bg-[#0c0e12]/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden p-6 flex flex-col justify-between"
          >
            {/* Top Toolbar / Status */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-white/5 pb-3.5">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">Refunds over 5000</span>
                <span className="text-neutral-600">|</span>
                <span className="text-neutral-400">3 steps / 1 branch</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-neutral-500 text-[11px] tracking-wider uppercase">running</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">100%</span>
              </div>
            </div>

            {/* Left Micro Action Tools */}
            <div className="absolute left-6 top-20 z-20 flex flex-col gap-2 p-1 rounded-lg bg-[#14171d]/80 border border-white/10 backdrop-blur-md">
              <button className="w-7 h-7 rounded flex items-center justify-center text-[#c4f243] bg-white/5 hover:bg-white/10 transition-colors">
                <MousePointer className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                <CornerDownRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive 3D Canvas / SVG Relay Network */}
            <div className="relative w-full h-[380px] my-auto">
              
              {/* SVG Connecting Relay Curves + Energy Packets */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 650 360"
                fill="none"
              >
                <defs>
                  <filter id={`glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Base Wire Paths (dim) */}
                <path
                  d="M 180 180 C 230 180, 240 110, 310 110"
                  stroke="rgba(196, 242, 67, 0.25)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 180 180 C 230 180, 240 250, 310 250"
                  stroke="rgba(196, 242, 67, 0.2)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 450 110 C 490 110, 500 180, 530 180"
                  stroke="rgba(196, 242, 67, 0.25)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 450 250 C 490 250, 500 180, 530 180"
                  stroke="rgba(196, 242, 67, 0.15)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Branch Labels */}
                <text x="215" y="135" fill="#71717a" fontSize="10" fontFamily="monospace">true</text>
                <text x="215" y="235" fill="#71717a" fontSize="10" fontFamily="monospace">else</text>

                {/* --- REAL-TIME TRAVELLING RELAY ENERGY PACKETS --- */}
                {/* Photon Packet 1 (Upper Branch) */}
                <g filter={`url(#glow-${filterId})`}>
                  <circle r="3.5" fill="#c4f243">
                    <animateMotion
                      path="M 180 180 C 230 180, 240 110, 310 110"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="7" fill="none" stroke="#c4f243" strokeOpacity="0.4" strokeWidth="1.5">
                    <animateMotion
                      path="M 180 180 C 230 180, 240 110, 310 110"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                {/* Photon Packet 2 (Lower Branch) */}
                <g filter={`url(#glow-${filterId})`}>
                  <circle r="3" fill="#a3e635">
                    <animateMotion
                      path="M 180 180 C 230 180, 240 250, 310 250"
                      dur="3.2s"
                      begin="0.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                {/* Photon Packet 3 (To Final Node) */}
                <g filter={`url(#glow-${filterId})`}>
                  <circle r="3.5" fill="#c4f243">
                    <animateMotion
                      path="M 450 110 C 490 110, 500 180, 530 180"
                      dur="2s"
                      begin="1.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                {/* Connection Junction Dot */}
                <circle cx="180" cy="180" r="3.5" fill="#c4f243" />
                <circle cx="310" cy="110" r="3" fill="#c4f243" />
                <circle cx="450" cy="110" r="3" fill="#c4f243" />
                <circle cx="530" cy="180" r="3" fill="#c4f243" />
              </svg>

              {/* Expanding 3D Sonar Wave Ripples */}
              {radarPings.map((ping) => (
                <div
                  key={ping.id}
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c4f243]/60 animate-ping"
                  style={{
                    left: `${ping.x * 0.15}%`,
                    top: `${ping.y * 0.22}%`,
                    width: '60px',
                    height: '60px',
                    animationDuration: '3.6s',
                    boxShadow: '0 0 20px rgba(196,242,67,0.2)'
                  }}
                />
              ))}

              {/* NODE 1: Refund created (Stripe) */}
              <motion.div 
                className="absolute left-[6%] top-[40%] -translate-y-1/2 w-44 p-3 rounded-xl bg-[#12141a]/90 border border-white/10 shadow-lg backdrop-blur-md cursor-pointer hover:border-[#c4f243]/50 transition-colors"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white tracking-tight">Refund created</span>
                  <span className="w-2 h-2 rounded-full bg-[#c4f243] shadow-[0_0_8px_#c4f243]" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">stripe</div>
              </motion.div>

              {/* NODE 2: Amount over 5000 (condition) */}
              <motion.div 
                className="absolute left-[44%] top-[18%] -translate-y-1/2 w-44 p-3 rounded-xl bg-[#12141a]/90 border border-[#c4f243]/30 shadow-[0_0_20px_rgba(196,242,67,0.1)] backdrop-blur-md cursor-pointer hover:border-[#c4f243] transition-colors"
                style={{ transform: "translateZ(45px)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white tracking-tight">Amount over 5000</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">condition</div>
              </motion.div>

              {/* NODE 3: Log to warehouse (postgres) */}
              <motion.div 
                className="absolute left-[44%] top-[68%] -translate-y-1/2 w-44 p-3 rounded-xl bg-[#12141a]/90 border border-white/10 shadow-lg backdrop-blur-md cursor-pointer hover:border-[#c4f243]/40 transition-colors"
                style={{ transform: "translateZ(35px)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white tracking-tight">Log to warehouse</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">postgres</div>
              </motion.div>

              {/* NODE 4: Ask finance (waiting on a yes) */}
              <motion.div 
                className="absolute right-[4%] top-[40%] -translate-y-1/2 w-44 p-3 rounded-xl bg-[#12141a]/90 border border-white/10 shadow-lg backdrop-blur-md cursor-pointer hover:border-[#c4f243]/40 transition-colors"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white tracking-tight">Ask finance</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">waiting on a yes</div>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  26 min
                </div>
              </motion.div>

            </div>

            {/* Bottom Status / Last Runs */}
            <div className="relative z-10 pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-neutral-400">last runs</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-300">09:41:02 refunds over 5000</span>
                <span className="text-neutral-500">129 ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">09:38:57 weekly export</span>
                <span className="text-neutral-500">2.1 s</span>
              </div>
            </div>

          </motion.div>
        </div>

      </div>

      {/* 3D Wave Relay Scroll Spine Banner */}
      <div className="w-full max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 z-10 text-neutral-400 text-xs font-mono">
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-[#c4f243]" />
          <span>Real-time WebGL / Canvas physics ready for page-wide scroll connection</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-500">
          <span>Tension: 120</span>
          <span>•</span>
          <span>Friction: 25</span>
          <span>•</span>
          <span>Packets: Active</span>
        </div>
      </div>

    </div>
  );
}
export default Relay3DWorkflow;
