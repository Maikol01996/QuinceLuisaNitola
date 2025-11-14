'use client';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, Users, Calendar, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import successAnimation from '@/lib/success-animation.json';
import { Label } from '@/components/ui/label';
import { eventData } from '@/lib/data';

const rsvpSchema = z.object({
  attending: z.enum(['yes', 'no'], { required_error: 'Por favor selecciona una opción.' }),
  contactName: z.string().min(1, 'Tu nombre es requerido.'),
  contactEmail: z.string().email('Por favor ingresa un email válido.').optional().or(z.literal('')),
  attendees: z.array(
    z.object({
      name: z.string().min(1, 'El nombre del asistente es requerido.'),
    })
  ).optional(),
  allergies: z.string().optional(),
  messageForLuisa: z.string().optional(),
}).refine(data => {
  if (data.attending === 'yes') {
    return data.attendees && data.attendees.length > 0 && data.attendees.every(a => a.name.trim().length > 0);
  }
  return true;
}, {
  message: 'Por favor, añade los nombres de los asistentes.',
  path: ['attendees'],
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

// --- helper sin toISOString ---
const formatUtcForCalendar = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  // Formato: YYYYMMDDTHHMMSSZ
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

export function RsvpSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: undefined,
      contactName: '',
      contactEmail: '',
      attendees: [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attendees',
  });

  const watchAttending = form.watch('attending');

  function generateWhatsAppMessage(data: RsvpFormValues) {
    const phoneNumber = '573204264195';
    let message = '';
    const attendeeList = data.attendees?.map(a => `• ${a.name}`).join('\n') || '';

    if (data.attending === 'yes') {
      message = `🎀 Confirmación de asistencia a los 15 de Luisa 🎀\n\n` +
                `Hola, soy ${data.contactName} 😊\n` +
                `Te confirmo nuestra asistencia a la celebración de los 15 años de Luisa.\n\n` +
                `👥 Asistentes (${data.attendees?.length || 0})\n${attendeeList}\n\n` +
                `📧 Correo de contacto: ${data.contactEmail || 'No proporcionado'}\n\n` +
                `🍽️ Alergias o restricciones alimentarias: ${data.allergies || 'Ninguna'}\n\n` +
                `💌 Mensaje para Luisa:\n${data.messageForLuisa || '¡Nos vemos en la fiesta!'} ✨\n\n` +
                `¡Muchas gracias por la invitación, nos vemos en la fiesta! 🎉`;
    } else { // 'no'
        message = `🎀 Notificación de asistencia a los 15 de Luisa 🎀\n\n` +
              `Hola, soy ${data.contactName} 😊\n` +
              `Con mucha pena te contamos que no podremos asistir a la celebración.\n\n` +
              (attendeeList.trim() ? `👥 Quiénes no asisten:\n${attendeeList}\n\n` : '') +
              `💌 Mensaje para Luisa:\n${data.messageForLuisa || 'Te deseamos un día absolutamente maravilloso. ¡Muchos éxitos!'}\n\n` +
              `¡Los recordaremos en este día tan especial! 😔`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  async function onSubmit(data: RsvpFormValues) {
    generateWhatsAppMessage(data);
    setIsSubmitted(true);
    toast({
      title: "¡Gracias por responder!",
      description: "Se ha abierto WhatsApp para que envíes tu mensaje.",
    });
  }

  const handleResetForm = () => {
    setIsSubmitted(false);
    form.reset({
      attending: undefined,
      contactName: '',
      contactEmail: '',
      attendees: [{ name: '' }],
      allergies: '',
      messageForLuisa: '',
    });
  };

  // --- Calendar Logic ---
  const getCalendarLinks = () => {
    const eventDate = new Date(eventData.date);
    const ceremonyStartTime = eventData.program.find(p => p.icon === 'Church')?.time;

    let celebrationEndTime;
    if (eventData.program && eventData.program.length > 0) {
      celebrationEndTime = eventData.program[eventData.program.length - 1].time;
    }

    if (!ceremonyStartTime || !celebrationEndTime) return { google: '#', ics: '#' };

    const [startHour, startMinute] = ceremonyStartTime.split(':').map(Number);
    const startDate = new Date(eventDate);
    startDate.setHours(startHour, startMinute, 0, 0);

    const [endHour, endMinute] = celebrationEndTime.split(':').map(Number);
    const endDate = new Date(eventDate);
    if (endHour < startHour) { // Event ends on the next day
      endDate.setDate(endDate.getDate() + 1);
    }
    endDate.setHours(endHour, endMinute, 0, 0);
    
    // 👇 sin usar toISOString
    const startTimeUtc = formatUtcForCalendar(startDate);
    const endTimeUtc = formatUtcForCalendar(endDate);

    const title = encodeURIComponent(eventData.title);
    const details = encodeURIComponent(
      `Únete a la celebración de los 15 años de Luisa. Código de vestimenta: ${eventData.dressCode.label}. Hashtag: ${eventData.hashtag}`
    );
    const location = encodeURIComponent(`${eventData.venues[0].name}, ${eventData.venues[0].address}`);

    // Google Calendar Link
    const googleLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeUtc}/${endTimeUtc}&details=${details}&location=${location}`;

    // ICS File Content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      `DTSTART:${startTimeUtc}`,
      `DTEND:${endTimeUtc}`,
      `SUMMARY:${eventData.title}`,
      `DESCRIPTION:${details.replace(/%0A/g, '\\n')}`,
      `LOCATION:${eventData.venues[0].name}, ${eventData.venues[0].address}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
    const icsLink = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

    return { google: googleLink, ics: icsLink };
  };

  const { google, ics } = getCalendarLinks();

  if (isSubmitted) {
    return (
      <section id="rsvp-success" className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <Lottie
              animationData={successAnimation}
              loop={false}
              style={{ height: 150, width: 150, margin: '0 auto' }}
            />
            <CardTitle className="font-headline text-3xl">¡Mensaje listo!</CardTitle>
            <CardDescription>
              Gracias por responder. Por favor, envía el mensaje en WhatsApp para finalizar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Si la ventana de WhatsApp no se abrió, puedes hacer clic de nuevo en el botón de abajo.</p>
            <Button onClick={form.handleSubmit(onSubmit)}>Reintentar envío a WhatsApp</Button>
            <Separator className="my-6" />
            <p className="text-sm text-muted-foreground">
              Puedes agregar el evento a tu calendario para no olvidarlo.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href={google} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" /> Google
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={ics} download="invitacion-luisa-xv.ics">
                  <Download className="mr-2 h-4 w-4" /> Apple/ICS
                </a>
              </Button>
            </div>
            <Separator className="my-6" />
            <Button variant="link" onClick={handleResetForm}>
              <RefreshCw className="mr-2 h-4 w-4" /> Confirmar por otra persona
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="rsvp" className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl md:text-5xl">Confirmar Asistencia</CardTitle>
            <CardDescription>Por favor, responde antes del 1 de Diciembre.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="attending"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-lg font-semibold">
                        ¿Asistirás a la celebración?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col md:flex-row gap-4"
                        >
                          <FormItem className="flex-1">
                            <FormControl>
                              <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
                            </FormControl>
                            <Label
                              htmlFor="yes"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              Sí, ¡allí estaré!
                            </Label>
                          </FormItem>
                          <FormItem className="flex-1">
                            <FormControl>
                              <RadioGroupItem value="no" id="no" className="peer sr-only" />
                            </FormControl>
                            <Label
                              htmlFor="no"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              No podré asistir
                            </Label>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchAttending && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <Separator />
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tu nombre completo (o nombre de la familia)</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre y Apellido" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {watchAttending && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    {watchAttending === 'yes' && (
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tu correo electrónico (Opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="email@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Users />
                          {watchAttending === 'yes'
                            ? 'Quiénes Asisten'
                            : 'Quiénes no podrán asistir (Opcional)'}
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => append({ name: '' })}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Añadir
                        </Button>
                      </div>
                      {fields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`attendees.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input placeholder={`Nombre ${index + 1}`} {...field} />
                                </FormControl>
                                {fields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                      {form.formState.errors.attendees && watchAttending === 'yes' && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.attendees.message}
                        </p>
                      )}
                    </div>

                    {watchAttending === 'yes' && (
                      <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alergias o restricciones alimentarias</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ej: alergia a los frutos secos"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="messageForLuisa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {watchAttending === 'yes'
                              ? 'Mensaje para Luisa'
                              : 'Lamentamos que no puedas venir. Si quieres, deja un mensaje para Luisa.'}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={
                                watchAttending === 'yes'
                                  ? '¡Déjale un bonito mensaje a la quinceañera!'
                                  : 'Te echaremos de menos...'
                              }
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {watchAttending && (
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Confirmación por WhatsApp'}
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
