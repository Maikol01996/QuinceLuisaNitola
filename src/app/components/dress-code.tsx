'use client';
import { motion } from 'framer-motion';
import type { DressCode as DressCodeType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type DressCodeProps = {
  dressCode: DressCodeType;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export function DressCode({ dressCode }: DressCodeProps) {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.h2
          className="font-headline text-4xl md:text-5xl text-center mb-4"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          Código de Vestuario
        </motion.h2>
        <motion.p
          className="text-center text-lg text-muted-foreground mb-8"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          {dressCode.label}
        </motion.p>
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-center">Colores Reservados</CardTitle>
            <CardDescription className="text-center">Agradecemos no usar estos colores, son exclusivos para los anfitriones.</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="flex justify-center gap-4 flex-wrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              {dressCode.palette.map((color, index) => (
                <motion.div key={index} variants={itemVariants} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/50 shadow-md flex items-center justify-center"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{color.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
