
'use client';

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

type AudioContextType = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children, src }: { children: React.ReactNode; src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = 'auto';
      audio.addEventListener('canplaythrough', () => {
        setIsReady(true);
      });
      audioRef.current = audio;
      
      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [src]);

  const play = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const value = { isPlaying, play, pause, toggle };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
