
'use client';

import { motion } from 'framer-motion';
import { useAudio } from './audio-provider';

type InvitationCoverProps = {
  onOpen: () => void;
};

export function InvitationCover({ onOpen }: InvitationCoverProps) {
  const { play } = useAudio();

  const handleOpen = () => {
    play();
    onOpen();
  };

  return (
    <motion.div
      key="cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center cursor-pointer"
      onClick={handleOpen}
    >
      <div className="absolute inset-0 bg-card opacity-90" />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.7, type: 'spring', stiffness: 100 } }}
        whileHover={{ scale: 1.1, rotate: 2 }}
        className="relative flex flex-col items-center justify-center text-center"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            {/* Seal shape */}
            <div className="absolute inset-0 bg-red-600 rounded-full shadow-2xl animate-pulse" style={{ filter: 'url(#wavy)' }}/>
            <div className="absolute inset-2 bg-red-700 rounded-full" />

            {/* "L" initial */}
            <span className="relative font-headline text-7xl md:text-9xl text-white/80" style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.3)'}}>
              L
            </span>
        </div>
        <p className="mt-8 font-semibold text-lg text-foreground/80 animate-pulse">Haz clic en el sello para abrir</p>
      </motion.div>
      
      {/* SVG filter for the wavy edge effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="wavy">
            <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="15" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
