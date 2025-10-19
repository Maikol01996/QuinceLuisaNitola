'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Playlist } from '@/lib/types';
import { MusicIcon } from 'lucide-react';

type MusicProps = {
  playlist: Playlist;
};

export function Music({ playlist }: MusicProps) {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically call a server action
    console.log('Song request submitted');
    toast({
      title: '¡Gracias por tu sugerencia!',
      description: 'Hemos recibido tu canción.',
    });
    (event.target as HTMLFormElement).reset();
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Playlist Oficial</CardTitle>
              <CardDescription>¡Para que te vayas preparando para la fiesta!</CardDescription>
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

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Pide una Canción</CardTitle>
              <CardDescription>¿Qué canción no puede faltar en la pista de baile?</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="songTitle">Título de la canción</Label>
                  <Input id="songTitle" name="songTitle" required placeholder="Ej: "Vivir Mi Vida"" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artista</Label>
                  <Input id="artist" name="artist" placeholder="Ej: Marc Anthony" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dedication">Dedicatoria (opcional)</Label>
                  <Textarea id="dedication" name="dedication" placeholder="Para..." />
                </div>
                <Button type="submit" className="w-full">
                  <MusicIcon className="mr-2 h-4 w-4" />
                  Enviar Sugerencia
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
