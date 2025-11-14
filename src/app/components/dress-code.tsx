'use client';
import { motion } from 'framer-motion';
import type { DressCode as DressCodeType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type DressCodeProps = {
  dressCode: DressCodeType;
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

const DressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-foreground/80">
    <path d="M12 2l4 4-2 3-2-2-2 2-2-3z" fill="currentColor"/>
    <path d="M6 11l-2 11h16l-2-11H6z" fill="currentColor"/>
  </svg>
);


const TuxedoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-foreground/80">
    <path d="M12 2l4 4-4 4-4-4 4-4z" fill="currentColor"/>
    <path d="M10 10l-2 12h8l-2-12H10z" fill="currentColor"/>
    <path d="M10 10l2-2 2 2" stroke="hsl(var(--background))" strokeWidth="1"/>
  </svg>
);


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
        <Card className="max-w-xl mx-auto shadow-lg bg-card border">
          <CardContent className="p-8">
            <motion.div
              className="space-y-8"
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="flex items-center gap-6">
                  <DressIcon />
                  <div className="text-left">
                    <h3 className="font-semibold text-xl">Damas:</h3>
                    <p className="text-lg text-muted-foreground">{dressCode.ladies}</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-6">
                  <TuxedoIcon />
                  <div className="text-left">
                    <h3 className="font-semibold text-xl">Caballeros:</h3>
                    <p className="text-lg text-muted-foreground">{dressCode.gentlemen}</p>
                  </div>
                </motion.div>
              </div>

            {dressCode.reservedColors && dressCode.reservedColors.length > 0 && (
                <>
                <Separator className="my-10" />
                <motion.div variants={itemVariants} className="space-y-4 text-center">
                    <h3 className="font-semibold text-xl">Colores Reservados</h3>
                    <p className="text-muted-foreground">
                        Estos colores son para los anfitriones, por favor evita usarlos.
                    </p>
                    <div className="flex justify-center items-center gap-4 pt-4">
                      {dressCode.reservedColors.map((color) => (
                          <div key={color.name} className="flex flex-col items-center gap-2">
                              <div
                                  className="h-16 w-16 rounded-full border-2 border-border flex items-center justify-center text-xs font-semibold text-white"
                                  style={{ backgroundColor: color.value, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                              >
                                  {color.name}
                              </div>
                          </div>
                      ))}
                    </div>
                </motion.div>
                </>
            )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
