'use server';
/**
 * @fileOverview Generates personalized invitation messages for guests using AI.
 *
 * - generatePersonalizedInvitationMessage - A function that generates a personalized invitation message.
 * - PersonalizedInvitationMessageInput - The input type for the generatePersonalizedInvitationMessage function.
 * - PersonalizedInvitationMessageOutput - The return type for the generatePersonalizedInvitationMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedInvitationMessageInputSchema = z.object({
  guestName: z.string().describe('The name of the guest.'),
  eventName: z.string().describe('The name of the event.'),
  eventDate: z.string().describe('The date of the event.'),
  eventTime: z.string().describe('The time of the event.'),
  specialNotes: z
    .string()
    .optional()
    .describe('Any special notes about the guest or their relationship to the event.'),
});
export type PersonalizedInvitationMessageInput = z.infer<typeof PersonalizedInvitationMessageInputSchema>;

const PersonalizedInvitationMessageOutputSchema = z.object({
  personalizedMessage: z.string().describe('The personalized invitation message.'),
});
export type PersonalizedInvitationMessageOutput = z.infer<typeof PersonalizedInvitationMessageOutputSchema>;

export async function generatePersonalizedInvitationMessage(
  input: PersonalizedInvitationMessageInput
): Promise<PersonalizedInvitationMessageOutput> {
  return personalizedInvitationMessageFlow(input);
}

const personalizedInvitationMessagePrompt = ai.definePrompt({
  name: 'personalizedInvitationMessagePrompt',
  input: {schema: PersonalizedInvitationMessageInputSchema},
  output: {schema: PersonalizedInvitationMessageOutputSchema},
  prompt: `You are an expert invitation message writer. You will generate a personalized invitation message for a guest to an event.

  Event Name: {{{eventName}}}
  Event Date: {{{eventDate}}}
  Event Time: {{{eventTime}}}
  Guest Name: {{{guestName}}}
  Special Notes: {{{specialNotes}}}

  Write a warm and inviting message, no more than 100 words, that encourages the guest to RSVP. Make the guest feel special and valued.
  `,
});

const personalizedInvitationMessageFlow = ai.defineFlow(
  {
    name: 'personalizedInvitationMessageFlow',
    inputSchema: PersonalizedInvitationMessageInputSchema,
    outputSchema: PersonalizedInvitationMessageOutputSchema,
  },
  async input => {
    const {output} = await personalizedInvitationMessagePrompt(input);
    return output!;
  }
);
