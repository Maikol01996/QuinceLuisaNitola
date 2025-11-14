/**
 * @fileOverview Generates personalized invitation messages for guests using AI.
 *
 * - generatePersonalizedInvitationMessage - A function that generates a personalized invitation message.
 * - PersonalizedInvitationMessageInput - The input type for the generatePersonalizedInvitationMessage function.
 * - PersonalizedInvitationMessageOutput - The return type for the generatePersonalizedInvitationMessage function.
 */

import {z} from 'zod';

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
  // Static/dummy version for GitHub Pages (no server actions)
  return {
    personalizedMessage: `¡Hola ${input.guestName}! Nos encantaría que nos acompañes a celebrar el ${input.eventName} el día ${input.eventDate} a las ${input.eventTime}. ¡Tu presencia es el mejor regalo! Esperamos contar contigo.`,
  };
}
