/**
 * @fileOverview AI-powered content suggestions for event descriptions and social media posts.
 *
 * - generateAdminContentSuggestions - A function that generates content suggestions.
 * - AdminContentSuggestionsInput - The input type for the generateAdminContentSuggestions function.
 * - AdminContentSuggestionsOutput - The return type for the generateAdminContentSuggestions function.
 */

import {z} from 'zod';

const AdminContentSuggestionsInputSchema = z.object({
  eventType: z.string().describe('The type of event, e.g., quinceañera.'),
  eventName: z.string().describe('The name of the event, e.g., Luisa Nitola’s XV Fiesta.'),
  eventDate: z.string().describe('The date of the event, e.g., December 14, 2025.'),
  eventTheme: z.string().optional().describe('The theme of the event, if any.'),
  targetAudience: z.string().describe('The target audience for the content, e.g., friends and family.'),
});
export type AdminContentSuggestionsInput = z.infer<
  typeof AdminContentSuggestionsInputSchema
>;

const AdminContentSuggestionsOutputSchema = z.object({
  eventDescription: z.string().describe('A suggested short event description.'),
  socialMediaPost: z.string().describe('A suggested social media post to promote the event.'),
});
export type AdminContentSuggestionsOutput = z.infer<
  typeof AdminContentSuggestionsOutputSchema
>;

export async function generateAdminContentSuggestions(
  input: AdminContentSuggestionsInput
): Promise<AdminContentSuggestionsOutput> {
  // Static/dummy version for GitHub Pages (no server actions)
  return {
    eventDescription: `Acompáñanos a celebrar los ${input.eventType.toLowerCase()} de ${input.eventName} el ${input.eventDate}. Será una noche inolvidable llena de alegría y momentos especiales.`,
    socialMediaPost: `¡La cuenta regresiva ha comenzado! Únete a nosotros para celebrar la espectacular fiesta de ${input.eventName} el ${input.eventDate}. ¡No te lo puedes perder! #FiestaInolvidable #${input.eventName.replace(/\s/g, '')}`,
  };
}
