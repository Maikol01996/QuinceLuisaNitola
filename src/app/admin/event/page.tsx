"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { eventData } from "@/lib/data";
import { Sparkles, Trash2, PlusCircle } from "lucide-react";
import { generateAdminContentSuggestions } from "@/ai/flows/admin-content-suggestions";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  headline: z.string().min(1),
  hashtag: z.string().min(1),
  venues: z.array(
    z.object({
      type: z.string(),
      name: z.string().min(1),
      address: z.string().min(1),
    })
  ),
  program: z.array(
    z.object({
      time: z.string().min(1),
      title: z.string().min(1),
    })
  ),
});

type EventFormValues = z.infer<typeof formSchema>;

// Helper para formatear Date -> "YYYY-MM-DDTHH:mm" sin usar toISOString
function formatDateTimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EventEditorPage() {
  const { toast } = useToast();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: eventData.title,
      // 👇 aquí ya no usamos toISOString
      date: formatDateTimeLocal(eventData.date),
      headline: eventData.hero.headline,
      hashtag: eventData.hashtag,
      venues: eventData.venues.map((v) => ({
        type: v.type,
        name: v.name,
        address: v.address,
      })),
      program: eventData.program.map((p) => ({
        time: p.time,
        title: p.title,
      })),
    },
  });

  const {
    fields: venueFields,
    append: appendVenue,
    remove: removeVenue,
  } = useFieldArray({ control: form.control, name: "venues" });

  const {
    fields: programFields,
    append: appendProgram,
    remove: removeProgram,
  } = useFieldArray({ control: form.control, name: "program" });

  const handleGenerateContent = async () => {
    toast({
      title: "Generando sugerencias...",
      description: "La IA está trabajando.",
    });
    try {
      const result = await generateAdminContentSuggestions({
        eventType: "Quinceañera",
        eventName: form.getValues("title"),
        eventDate: new Date(form.getValues("date")).toLocaleDateString(
          "es-CO",
          { dateStyle: "full" }
        ),
        targetAudience: "Amigos y Familia",
      });
      form.setValue("headline", result.eventDescription);
      toast({
        title: "Sugerencias generadas",
        description: 'El campo "Headline" ha sido actualizado.',
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron generar las sugerencias.",
      });
    }
  };

  function onSubmit(values: EventFormValues) {
    console.log(values);
    toast({
      title: "Evento guardado",
      description: "Los cambios han sido guardados (simulación).",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Editor del Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Evento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha y Hora</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-4 mb-2">
                <FormLabel>Headline (Descripción corta)</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleGenerateContent}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Sugerir con IA
                </Button>
              </div>
              <FormField
                control={form.control}
                name="headline"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Aparece en la sección principal de la invitación.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hashtag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hashtag del Evento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lugares (Venues)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {venueFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-end p-4 border rounded-lg"
              >
                <FormField
                  control={form.control}
                  name={`venues.${index}.type`}
                  render={({ field: f }) => <Input type="hidden" {...f} />}
                />
                <div className="flex-1 space-y-2">
                  <p className="font-medium">{field.type}</p>
                  <FormField
                    control={form.control}
                    name={`venues.${index}.name`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...f} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`venues.${index}.address`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input {...f} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeVenue(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Programa</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendProgram({ time: "", title: "" })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir item
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {programFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <FormField
                  control={form.control}
                  name={`program.${index}.time`}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="time" {...f} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`program.${index}.title`}
                  render={({ field: f }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...f} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProgram(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
}
