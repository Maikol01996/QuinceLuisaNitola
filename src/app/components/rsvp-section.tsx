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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, Users, Calendar, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import successAnimation from '@/lib/success-animation.json';

const rsvpSchema = z.object({
  attending: z.enum(['yes', 'no'], { required_error: 'Por favor selecciona una opción.' }),
  contactName: z.string().min(1, 'Tu nombre es requerido.'),
  contactEmail: z.string().email('Por favor ingresa un email válido.'),
  attendees: z.array(
    z.object({
      name: z.string().min(1, 'El nombre del asistente es requerido.'),
    })
  ).optional(),
  allergies: z.string().optional(),
  needsBus: z.boolean().default(false),
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
      needsBus: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'attendees',
  });

  const watchAttending = form.watch('attending');

  async function onSubmit(data: RsvpFormValues) {
    // Simulate server action
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    form.reset();
  }

  if (isSubmitted) {
    return (
      <section id="rsvp-success" className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <Lottie animationData={successAnimation} loop={false} style={{ height: 150, width: 150, margin: '0 auto' }} />
            <CardTitle className="font-headline text-3xl">¡Confirmación Recibida!</CardTitle>
            <CardDescription>Gracias por responder. ¡Nos vemos en la fiesta!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Puedes agregar el evento a tu calendario para no olvidarlo.</p>
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

                {watchAttending === 'yes' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Información de Contacto</h3>
                      <FormField control={form.control} name="contactName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tu nombre completo</FormLabel>
                            <FormControl><Input placeholder="Nombre y Apellido" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      <FormField control={form.control} name="contactEmail" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tu correo electrónico</FormLabel>
                            <FormControl><Input placeholder="email@ejemplo.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>

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

                    <FormField control={form.control} name="needsBus" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">¿Necesitas transporte?</FormLabel>
                            <p className="text-sm text-muted-foreground">Habrá un bus disponible desde el punto de encuentro.</p>
                          </div>
                          <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
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
                        <Separator />
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
                    {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Confirmación'}
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
