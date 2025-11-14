'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Parent, Godparent } from '@/lib/types';
import { Heart } from 'lucide-react';

type FamilySectionProps = {
  parents: Parent[];
  padrinos: Godparent[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FamilySection({ parents, padrinos }: FamilySectionProps) {
  const parentNames = parents.map(p => p.name).join(' & ');

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="text-center"
      >
        <motion.h2
          className="font-headline text-4xl md:text-5xl mb-4"
          variants={itemVariants}
        >
          Con la bendición de mis Padres
        </motion.h2>
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
            <p className="font-headline text-3xl">{parentNames}</p>
        </motion.div>

        <motion.h2
          className="font-headline text-4xl md:text-5xl mb-4"
          variants={itemVariants}
        >
          Y mis Padrinos
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          {padrinos.map((padrino) => (
            <motion.div key={padrino.name} variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{padrino.name}</CardTitle>
                  <CardDescription className="text-accent">{padrino.role}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.p className="mt-12 text-lg text-muted-foreground flex items-center justify-center gap-2" variants={itemVariants}>
          <Heart className="text-accent" />
          Ustedes son mi mayor inspiración.
        </motion.p>
      </motion.div>
    </section>
  );
}
