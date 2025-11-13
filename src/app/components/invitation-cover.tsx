
'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

type InvitationCoverProps = {
  onOpen: () => void;
};

export function InvitationCover({ onOpen }: InvitationCoverProps) {
  return (
    <motion.div
      key="cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center cursor-pointer"
      onClick={onOpen}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } }}
        whileHover={{ scale: 1.05 }}
        className="relative flex flex-col items-center justify-center w-80 h-56 md:w-96 md:h-64 bg-card border-2 border-primary/30 rounded-lg shadow-2xl p-6 text-center"
      >
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-primary/20 rounded-t-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-primary/10" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}/>
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-primary/10" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}/>
        
        <div className="relative z-10 flex flex-col items-center">
            <Mail className="w-12 h-12 text-primary" />
            <h1 className="font-headline text-3xl mt-4">Luisa Nitola</h1>
            <p className="text-lg text-muted-foreground">Mis 15 Años</p>
            <p className="mt-4 font-bold text-accent animate-pulse">Haz clic para abrir</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
