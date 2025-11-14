
'use client';

import { Music, Music2 } from 'lucide-react';
import { useAudio } from './audio-provider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function MusicToggleButton() {
  const { isPlaying, toggle } = useAudio();

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggle}
        className="rounded-full h-12 w-12 shadow-lg bg-background/80 backdrop-blur-sm"
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? <Music className="h-6 w-6 animate-pulse" /> : <Music2 className="h-6 w-6" />}
      </Button>
    </motion.div>
  );
}
