"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function YoutubeBackground({ videoId }: { videoId: string }) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING === 1
            if (event.data === 1) {
              setIsPlaying(true);
              setOpacity(1);
            }
            // YT.PlayerState.ENDED === 0
            if (event.data === 0) {
              setOpacity(0);
              // Give it 500ms to fade out, then restart
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.seekTo(0);
                  playerRef.current.playVideo();
                }
              }, 500);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
    >
      {/* 
        We make the iframe larger than the container to hide YouTube UI borders 
        and scale it so it acts like object-fit: cover 
      */}
      <div className="absolute inset-0 z-[1] grayscale contrast-[1.1] opacity-35 dark:opacity-25 mix-blend-multiply dark:mix-blend-lighten">
        <div
          ref={containerRef}
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-[1920px] min-h-[1080px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
      
      {/* Premium Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white dark:from-[#070b14] dark:via-[#070b14]/50 dark:to-[#070b14] z-[2]" />
      
      {/* Vignette (Soft edges) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,11,20,0.7)_100%)] z-[3]" />
    </motion.div>
  );
}
