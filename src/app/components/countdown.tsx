'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

const timeUnits: TimeUnit[] = ['days', 'hours', 'minutes', 'seconds'];
const timeLabels: Record<TimeUnit, string> = {
  days: 'Días',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
};

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// 🎯 Fecha fija: 14 diciembre 2025, 19:00 (tu ejemplo)
function getFixedTargetDate() {
  return new Date(2025, 11, 14, 19, 0, 0);
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);
  const [eventDate, setEventDate] = useState<Date | null>(null);

  // Fecha objetivo fija
  useEffect(() => {
    setIsClient(true);
    const targetDate = getFixedTargetDate();
    setEventDate(targetDate);

    // 👉 Si ya no quieres alerta, quítala
    // alert('Fecha objetivo: ' + targetDate.toString());
  }, []);

  // Lógica de cuenta regresiva
  useEffect(() => {
    if (!eventDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const diffMs = eventDate.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      let totalSeconds = Math.floor(diffMs / 1000);

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      totalSeconds -= days * 60 * 60 * 24;

      const hours = Math.floor(totalSeconds / (60 * 60));
      totalSeconds -= hours * 60 * 60;

      const minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= minutes * 60;

      const seconds = totalSeconds;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!isClient || !eventDate) {
    return <div className="h-48" />;
  }

  const formattedDate = format(
    eventDate,
    "eeee, dd 'de' MMMM 'de' yyyy",
    { locale: es }
  );

  const values = Object.values(timeLeft);
  const isEventTime = values.every((val) => val === 0);

  if (isEventTime && isClient) {
    return (
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            ¡El gran día ha llegado!
          </h2>
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
          <h2 className="text-center font-headline text-3xl md:text-4xl mb-6">
            Falta poco para la celebración
          </h2>

          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            {timeUnits.map((unit) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="bg-secondary w-full py-4 rounded-lg">
                  <span className="text-4xl md:text-6xl font-bold font-headline text-secondary-foreground">
                    {String(timeLeft[unit]).padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-2 text-sm md:text-base text-muted-foreground">
                  {timeLabels[unit]}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-muted-foreground mt-6">
            {formattedDate}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
