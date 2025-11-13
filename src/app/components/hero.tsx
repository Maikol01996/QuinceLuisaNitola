
'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

type HeroProps = {
  headline: string;
  date: string;
};

export function Hero({ headline, date: dateString }: HeroProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const date = new Date(dateString);
    // This ensures date formatting happens only on the client, avoiding hydration mismatch.
    setFormattedDate(format(date, "eeee, dd 'de' MMMM 'de' yyyy", { locale: es }));
    setFormattedTime(format(date, "h:mm a", { locale: es }));
  }, [dateString]);

  return (
    <div
      ref={targetRef}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="/Luisaportada.png"
          alt="Luisa Nitola Quinceañera"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground"
      >
        <div className="flex flex-col items-center p-4 rounded-lg">
          <h2 className="font-headline text-2xl md:text-3xl tracking-tight">
            Luisa Nitola
          </h2>
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold my-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/80">
            {headline}
          </h1>
          {formattedDate && (
             <>
              <p className="text-lg md:text-xl mt-4 max-w-2xl">
                {formattedDate} &bull; {formattedTime}
              </p>
              <p className="text-lg md:text-xl">Bogotá, Colombia</p>
             </>
          )}
        </div>

        <Button
          asChild
          size="lg"
          className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 animate-bounce"
        >
          <a href="#rsvp">
            <ArrowDown className="mr-2 h-5 w-5" />
            Confirmar Asistencia
          </a>
        </Button>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-foreground/80 animate-pulse">
        <ArrowDown className="h-6 w-6 mx-auto" />
        <span className="text-xs">Desliza para ver más</span>
      </div>
    </div>
  );
}
