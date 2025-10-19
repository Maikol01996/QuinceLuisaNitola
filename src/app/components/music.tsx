'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Playlist } from '@/lib/types';
import React from 'react';

type MusicProps = {
  playlist: Playlist;
};

export function Music({ playlist }: MusicProps) {

  return (
    <section id="musica" className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-headline text-4xl md:text-5xl text-center mb-10">
          Música para la Fiesta
        </h2>
        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-center">La Playlist de la Fiesta</CardTitle>
              <CardDescription className="text-center">¡Síguenos en Spotify y prepárate para bailar!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={playlist.url}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
