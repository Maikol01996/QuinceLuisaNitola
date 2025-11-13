'use client';
import { motion } from 'framer-motion';
import { Church, Camera, Utensils, GlassWater, Music, Moon } from 'lucide-react';
import type { ProgramItem } from '@/lib/types';
import React from 'react';

type TimelineProps = {
  items: ProgramItem[];
};

const iconMap: Record<string, React.ReactNode> = {
  Church: <Church />,
  Camera: <Camera />,
  Cocktail: <GlassWater />,
  Dinner: <Utensils />,
  Champagne: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8"/><path d="M7 14h10"/><path d="M12 4v10"/><path d="m16 4-4 4-4-4"/></svg>
  ),
  Music: <Music />,
  Moon: <Moon />,
};

export function Timeline({ items }: TimelineProps) {
  return (
    <section id="programa" className="container mx-auto px-4">
      <motion.h2 
        className="font-headline text-4xl md:text-5xl text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Programa
      </motion.h2>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />

        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-center justify-between w-full mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {index % 2 === 0 ? (
              <>
                <div className="w-[calc(50%-2rem)] text-right">
                  <p className="font-bold text-lg">{item.title}</p>
                  <p className="text-muted-foreground">{item.time}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground z-10">
                  <div className="[&>svg]:w-6 [&>svg]:h-6">{iconMap[item.icon] || <Church />}</div>
                </div>
                <div className="w-[calc(50%-2rem)]" />
              </>
            ) : (
              <>
                <div className="w-[calc(50%-2rem)]" />
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground z-10">
                  <div className="[&>svg]:w-6 [&>svg]:h-6">{iconMap[item.icon] || <Church />}</div>
                </div>
                <div className="w-[calc(50%-2rem)] text-left">
                  <p className="font-bold text-lg">{item.title}</p>
                  <p className="text-muted-foreground">{item.time}</p>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
