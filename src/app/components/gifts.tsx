'use client';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnvelopeModel } from './envelope-model';

export function Gifts() {
  return (
    <section id="regalos" className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-headline text-4xl md:text-5xl mb-4">
          Regalos
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Tu presencia es nuestro mayor regalo, ¡muchas gracias por acompañarnos!
        </p>
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-48 w-48">
                <Suspense fallback={<div className="h-full w-full bg-secondary rounded-full animate-pulse" />}>
                   <EnvelopeModel modelPath="/Objeto3D/CartaLluviaSobres.glb" />
                </Suspense>
              </div>
              <CardTitle className="flex items-center justify-center gap-2 font-headline text-2xl">
                <CreditCard className="text-accent" />
                Lluvia de Sobres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.8 }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="text-muted-foreground"
              >
                Gracias por ser parte de este momento tan especial.
              </motion.p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
