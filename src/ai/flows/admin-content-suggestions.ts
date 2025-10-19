'use server';

/**
 * @fileOverview AI-powered content suggestions for event descriptions and social media posts.
 *
 * - generateAdminContentSuggestions - A function that generates content suggestions.
 * - AdminContentSuggestionsInput - The input type for the generateAdminContentSuggestions function.
 * - AdminContentSuggestionsOutput - The return type for the generateAdminContentSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminContentSuggestionsInputSchema = z.object({
  eventType: z.string().describe('The type of event, e.g., quinceañera.'),
  eventName: z.string().describe('The name of the event, e.g., Luisa Nitola\u2019s XV Fiesta.'),
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
  return adminContentSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminContentSuggestionsPrompt',
  input: {schema: AdminContentSuggestionsInputSchema},
  output: {schema: AdminContentSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping an event organizer generate content for their event.\n\nGiven the following event details, generate a short event description and a social media post to promote the event to the target audience.\n\nEvent Type: {{{eventType}}}\nEvent Name: {{{eventName}}}\nEvent Date: {{{eventDate}}}\nEvent Theme: {{{eventTheme}}}\nTarget Audience: {{{targetAudience}}}\n\nEvent Description:\nSocial Media Post: `,
});

const adminContentSuggestionsFlow = ai.defineFlow(
  {
    name: 'adminContentSuggestionsFlow',
    inputSchema: AdminContentSuggestionsInputSchema,
    outputSchema: AdminContentSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
