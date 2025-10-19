'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Clock, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Venue } from '@/lib/types';

type VenuesProps = {
  venues: Venue[];
};

export function Venues({ venues }: VenuesProps) {
  const { toast } = useToast();

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: 'Dirección copiada',
      description: 'La dirección ha sido copiada a tu portapapeles.',
    });
  };

  return (
    <section id="detalles" className="container mx-auto px-4">
      <motion.h2 
        className="font-headline text-4xl md:text-5xl text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        Dónde y Cuándo
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.type}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col group">
              <div className="relative h-60 w-full">
                <Image
                  src={venue.photoUrl || ''}
                  alt={`Foto de ${venue.name}`}
                  data-ai-hint={venue.imageHint || 'event venue'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="font-headline text-3xl text-primary">{venue.type}</h3>
                <p className="text-lg font-semibold mt-1">{venue.name}</p>
                <div className="mt-4 space-y-3 text-muted-foreground flex-1">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 shrink-0" />
                    <span>{venue.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 shrink-0" />
                    <span>{venue.time}</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1 bg-primary/90 hover:bg-primary">
                    <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-4 w-4" /> Ver Mapa
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleCopy(venue.address)}>
                    <Copy className="mr-2 h-4 w-4" /> Copiar Dirección
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
