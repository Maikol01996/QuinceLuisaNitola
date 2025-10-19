'use client';
import { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import { motion } from 'framer-motion';

type CountdownProps = {
  date: Date;
};

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

const timeUnits: TimeUnit[] = ['days', 'hours', 'minutes', 'seconds'];
const timeLabels: Record<TimeUnit, string> = {
  days: 'Días',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
};

export function Countdown({ date }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<Duration>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const calculateTimeLeft = () => {
      const now = new Date();
      if (now < date) {
        const duration = intervalToDuration({ start: now, end: date });
        setTimeLeft(duration);
      } else {
        setTimeLeft({});
      }
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (!isClient) {
    return <div className="h-48" />; // Placeholder for SSR to prevent layout shift
  }

  const isEventTime = Object.values(timeLeft).every(val => val === 0 || val === undefined);

  if (isEventTime) {
    return (
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">¡El gran día ha llegado!</h2>
          <p className="mt-4 text-lg">Es hora de celebrar los 15 de Luisa.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 -mt-16 md:-mt-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-card p-6 md:p-10 rounded-2xl shadow-lg border max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center font-headline text-3xl md:text-4xl mb-6">Falta poco para la celebración</h2>
          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            {timeUnits.map((unit) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="bg-secondary w-full py-4 rounded-lg">
                  <span className="text-4xl md:text-6xl font-bold font-headline text-secondary-foreground">
                    {String(timeLeft[unit] ?? 0).padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-2 text-sm md:text-base text-muted-foreground">{timeLabels[unit]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
