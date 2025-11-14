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
import { PlusCircle, Trash2, Users, Calendar, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import successAnimation from '@/lib/success-animation.json';
import { Label } from '@/components/ui/label';

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
    return data.attendees && data.attendees.length > 0 && data.attendees.every(a => a.name.length > 0);
  }
  return true;
}, {
  message: 'Por favor, añade los nombres de los asistentes.',
  path: ['attendees'],
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

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

    if (data.attending === 'yes') {
      const attendeeNames = data.attendees?.map(a => a.name).join(', ') || 'N/A';
      message = `🎉 ¡Confirmación de Asistencia para los 15 de Luisa! 🎉\n\n` +
                `*Nombre de Contacto:* ${data.contactName}\n` +
                `*Correo:* ${data.contactEmail || 'No proporcionado'}\n` +
                `*Asistentes (${data.attendees?.length || 0}):* ${attendeeNames}\n\n` +
                `*Alergias/Restricciones:* ${data.allergies || 'Ninguna'}\n` +
                `*Mensaje para Luisa:* ${data.messageForLuisa || '¡Nos vemos en la fiesta!'}\n\n` +
                `¡Gracias por confirmar!`;
    } else { // 'no'
      message = `😔 Notificación de Asistencia para los 15 de Luisa 😔\n\n` +
                `Lamentablemente, *${data.contactName}* no podrá asistir.\n\n` +
                `*Mensaje para Luisa:* ${data.messageForLuisa || 'Te echaremos de menos. ¡Muchos éxitos en tu día!'}`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  async function onSubmit(data: RsvpFormValues) {
    generateWhatsAppMessage(data);
    setIsSubmitted(true);
    // We don't reset the form immediately to allow the user to see the data
    // and in case they need to resend. The success screen will handle the next step.
    toast({
      title: "¡Gracias por responder!",
      description: "Se ha abierto WhatsApp para que envíes tu mensaje.",
    });
  }

  if (isSubmitted) {
    return (
      <section id="rsvp-success" className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <Lottie animationData={successAnimation} loop={false} style={{ height: 150, width: 150, margin: '0 auto' }} />
            <CardTitle className="font-headline text-3xl">¡Mensaje listo!</CardTitle>
            <CardDescription>Gracias por responder. Por favor, envía el mensaje en WhatsApp para finalizar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <p>Si la ventana de WhatsApp no se abrió, puedes hacer clic de nuevo en el botón de abajo.</p>
             <Button onClick={form.handleSubmit(onSubmit)}>Reintentar envío a WhatsApp</Button>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">Puedes agregar el evento a tu calendario para no olvidarlo.</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Google</Button>
              <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Apple</Button>
              <Button variant="outline"><Download className="mr-2 h-4 w-4" /> ICS</Button>
            </div>
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
                      <FormLabel className="text-lg font-semibold">¿Asistirás a la celebración?</FormLabel>
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
                            <Label htmlFor="yes" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              Sí, ¡allí estaré!
                            </Label>
                          </FormItem>
                          <FormItem className="flex-1">
                            <FormControl>
                              <RadioGroupItem value="no" id="no" className="peer sr-only" />
                            </FormControl>
                            <Label htmlFor="no" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              No podré asistir
                            </Label>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(watchAttending === 'yes' || watchAttending === 'no') && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <Separator />
                    <FormField control={form.control} name="contactName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tu nombre completo (o nombre de la familia)</FormLabel>
                          <FormControl><Input placeholder="Nombre y Apellido" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                  </div>
                )}

                {watchAttending === 'yes' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    
                    <FormField control={form.control} name="contactEmail" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tu correo electrónico (Opcional)</FormLabel>
                          <FormControl><Input placeholder="email@ejemplo.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <h3 className="text-lg font-semibold flex items-center gap-2"><Users /> Quiénes Asisten</h3>
                         <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '' })}><PlusCircle className="mr-2 h-4 w-4" />Añadir</Button>
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
                                  <Input placeholder={`Nombre del asistente ${index + 1}`} {...field} />
                                </FormControl>
                                {fields.length > 1 && (
                                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                      <FormMessage>{form.formState.errors.attendees?.message}</FormMessage>
                    </div>

                    <FormField control={form.control} name="allergies" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alergias o restricciones alimentarias</FormLabel>
                          <FormControl><Textarea placeholder="Ej: alergia a los frutos secos" {...field} /></FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField control={form.control} name="messageForLuisa" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje para Luisa</FormLabel>
                          <FormControl><Textarea placeholder="¡Déjale un bonito mensaje a la quinceañera!" {...field} /></FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {watchAttending === 'no' && (
                    <div className="animate-in fade-in duration-500">
                        <FormField control={form.control} name="messageForLuisa" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lamentamos que no puedas venir. Si quieres, deja un mensaje para Luisa.</FormLabel>
                                <FormControl><Textarea placeholder="Te echaremos de menos..." {...field} /></FormControl>
                            </FormItem>
                        )} />
                    </div>
                )}
                
                {watchAttending && (
                   <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
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
