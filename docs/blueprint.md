# **App Name**: Luisa's XV Fiesta

## Core Features:

- Animated Digital Invitation: A fully responsive digital invitation with elegant animations, micro-interactions, parallax background, and a confetti effect on initial interaction. Includes sections for event details, timeline, family introductions with animated cards, dress code palette animation, and gift registry information.
- Interactive RSVP Flow: An RSVP system to confirm attendance, specify the number of adults and children, collect attendee names, allergies, transport preferences, and personalized messages. Features dynamic input fields, optimistic UI updates, Lottie animations for success states, and 'Add to Calendar' functionality.
- Music Dedication Moderation: Allow guests to suggest songs and write dedications (subject to admin approval), synchronizing playlist via a button. Apply rate limiting to submissions. Tool for reviewing song requests and synchronizing with embedded playlist.
- Media Wall: Enable guests to upload photos and videos (subject to moderation), with admin tools to approve/reject media. Configure Storage with Extensions → Resize Images for responsive variants.
- Personalized Guest Access: Generate signed guest links with QR codes. Implement personalized URLs /i/{guestCode} pre-filling RSVP and displaying 'Invitación para: {Nombre}'. Callable function verifies signed guest code, accesses their RSVP if it exists, otherwise directs them to create it
- Admin Content Editor: A console for event owners and staff to manage event details, guest lists (import via CSV), RSVP responses, music requests, and media. Features include live preview, template creation for communications, and data exports (CSV).
- Event Configuration and Seeding: Seed event with name ‘XV de Luisa Nitola’, 2025-12-14T16:00:00-05:00. Load sample data for ceremony and reception, setting appropriate timezone. Include 10 guest invitations. Also, generate guest invites with codes.

## Style Guidelines:

- Primary color: Lilac (#D8B4FE) evoking celebration and femininity.
- Background color: Light lilac (#F5EEFF), creating a soft and elegant base.
- Accent color: Lavender Pink (#EBB2E5) for highlights, RSVP buttons, and interactive elements, ensuring visibility against the background.
- Headline font: 'Playfair', a modern serif with an elegant, high-end feel.
- Body font: 'PT Sans' (sans-serif) used to ensure readability and a modern style.
- Use elegant, custom icons related to event milestones, music notes, gifts, etc.
- Implement a responsive layout using a fluid grid, ensuring perfect display on mobile, tablet, and desktop. Employ clamp-based typography and utilize safe areas.
- Use subtle animations (Framer Motion and GSAP ScrollTrigger) for staggered reveals, parallax effects, and interactive elements. A global toggle to reduce motion should be provided.