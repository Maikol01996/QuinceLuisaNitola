import type { Event, Guest } from './types';

// Calculate event date to be 31 days from now
const eventDate = new Date();
eventDate.setDate(eventDate.getDate() + 31);

export const eventData: Event = {
  id: 'luisa-xv-2025',
  title: 'XV de Luisa Nitola',
  // Use string to avoid timezone issues. This represents Bogota time (UTC-5).
  date: eventDate.toISOString(),
  timezone: 'America/Bogota',
  hero: {
    headline: 'Mis 15 Años',
    backgroundStyle: 'parallax',
  },
  parents: [
    { role: 'Padre', name: 'Jimmy Nitola' },
    { role: 'Madre', name: 'Heidy Torres' },
  ],
  padrinos: [
    { name: 'Brandon Torres', role: 'Padrino' },
    { name: 'Mayra Huamani', role: 'Madrina' },
  ],
  venues: [
    {
      type: 'Ceremonia',
      name: 'Hacienda Salamanca',
      address: 'Vía Tenjo, Cundinamarca',
      lat: 4.7783357,
      lng: -74.1757042,
      time: '16:00',
      photoUrl: '/Iglesia.jpeg',
      imageHint: 'church ceremony',
      mapUrl: 'https://www.google.com/maps/place/Hacienda+salamanca/@4.7783357,-74.1757042,14.61z/data=!4m14!1m7!3m6!1s0x8e3f81863e149d85:0x28f737da52c42c8e!2sHacienda+salamanca!8m2!3d4.7932181!4d-74.1803894!16s%2Fg%2F11c5wwwdtm!3m5!1s0x8e3f81863e149d85:0x28f737da52c42c8e!8m2!3d4.7932181!4d-74.1803894!16s%2Fg%2F11c5wwwdtm?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D',
    },
    {
      type: 'Recepción',
      name: 'Hacienda Salamanca',
      address: 'Vía Tenjo, Cundinamarca',
      lat: 4.7783357,
      lng: -74.1757042,
      time: '18:00',
      photoUrl: '/Salamanca.jpg',
      imageHint: 'event hall night',
      mapUrl: 'https://www.google.com/maps/place/Hacienda+salamanca/@4.7783357,-74.1757042,14.61z/data=!4m14!1m7!3m6!1s0x8e3f81863e149d85:0x28f737da52c42c8e!2sHacienda+salamanca!8m2!3d4.7932181!4d-74.1803894!16s%2Fg%2F11c5wwwdtm!3m5!1s0x8e3f81863e149d85:0x28f737da52c42c8e!8m2!3d4.7932181!4d-74.1803894!16s%2Fg%2F11c5wwwdtm?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D',
    },
  ],
  program: [
    { time: '16:00', title: 'Eucaristía de Acción de Gracias', icon: 'Church' },
    { time: '17:30', title: 'Recepción y sesión fotográfica', icon: 'Camera' },
    { time: '18:30', title: 'Entrada de la quinceañera', icon: 'Cocktail' },
    { time: '19:00', title: 'Vals de honor', icon: 'Music' },
    { time: '19:30', title: 'Brindis especial', icon: 'Champagne' },
    { time: '20:00', title: 'Cena', icon: 'Dinner' },
    { time: '21:00', title: 'Baile sorpresa', icon: 'Music' },
    { time: '22:00', title: 'Fiesta general', icon: 'Music' },
    { time: '02:00', title: 'Cierre de celebración', icon: 'Moon' },
  ],
  dressCode: {
    label: 'Etiqueta (Formal)',
    ladies: 'Vestido largo o coctel',
    gentlemen: 'Traje formal',
    reservedColors: [
        { name: 'Rosado', value: '#E83E8C' },
        { name: 'Verde', value: '#28A745' },
        { name: 'Dorado', value: '#FFC107' },
        { name: 'Morado', value: '#6F42C1' },
      ]
  },
  gifts: {
    bank: {
      bankName: 'Bancolombia',
      accountHolder: 'Luisa Nitola',
      acctOrIban: '123-456789-00',
    },
    registryLabel: 'Mesa de Regalos en Falabella',
    registryUrl: '#',
  },
  suggestions: {
    hotels: [
      { name: 'JW Marriott Hotel Bogota', phone: '+576014816000', mapUrl: '#' },
      { name: 'Sofitel Bogota Victoria Regia', phone: '+576016466390', mapUrl: '#' },
    ],
    tourism: ['Museo del Oro', 'Cerro de Monserrate'],
  },
  playlist: {
    provider: 'spotify',
    url: 'https://open.spotify.com/embed/playlist/1sXppDtN8afNNN1LD1B5tH?utm_source=generator',
    public: true,
  },
  hashtag: '#XVdeLuisa',
  mediaWallEnabled: true,
  visibility: 'public',
};

export const guestsData: Guest[] = [
    { id: 'g1', eventId: 'luisa-xv-2025', name: 'Familia Perez', maxSeats: 4, code: 'a1b2c', status: 'invited' },
    { id: 'g2', eventId: 'luisa-xv-2025', name: 'Juan Gonzalez', maxSeats: 2, code: 'd3e4f', status: 'invited' },
    { id: 'g3', eventId: 'luisa-xv-2025', name: 'Maria Lopez y Acompañante', maxSeats: 2, code: 'g5h6i', status: 'confirmed' },
    { id: 'g4', eventId: 'luisa-xv-2025', name: 'Carlos Sanchez', maxSeats: 1, code: 'j7k8l', status: 'declined' },
    { id: 'g5', eventId: 'luisa-xv-2025', name: 'Familia Diaz', maxSeats: 5, code: 'm9n0o', status: 'invited' },
    { id: 'g6', eventId: 'luisa-xv-2025', name: 'Ana Morales', maxSeats: 1, code: 'p1q2r', status: 'pending' },
    { id: 'g7', eventId: 'luisa-xv-2025', name: 'Luis Torres', maxSeats: 2, code: 's3t4u', status: 'confirmed' },
    { id: 'g8', eventId: 'luisa-xv-2025', name: 'Familia Castro', maxSeats: 3, code: 'v5w6x', status: 'invited' },
    { id: 'g9', eventId: 'luisa-xv-2025', name: 'Sofia Jimenez', maxSeats: 2, code: 'y7z8a', status: 'invited' },
    { id: 'g10', eventId: 'luisa-xv-2025', name: 'Pedro Vargas', maxSeats: 1, code: 'b9c0d', status: 'pending' },
];

export const galleryImages = [
  { src: '/LuisaPortadaCollage.jpg', alt: 'Luisa Quinceañera', hint: 'quinceanera portrait' },
  { src: '/Collage/Collage1.png', alt: 'Collage image 1', hint: 'quinceanera portrait' },
  { src: '/Collage/Collage2.png', alt: 'Collage image 2', hint: 'family picture' },
  { src: '/Collage/Collage3.png', alt: 'Collage image 3', hint: 'friends group photo' },
  { src: '/Collage/Collage4.png', alt: 'Collage image 4', hint: 'birthday cake' },
  { src: '/Collage/Collage5.png', alt: 'Collage image 5', hint: 'dancing party' },
  { src: '/Collage/Collage6.png', alt: 'Collage image 6', hint: 'childhood photo' },
  { src: '/Collage/Collage7.png', alt: 'Collage image 7', hint: 'travel picture' },
  { src: '/Collage/Collage8.png', alt: 'Collage image 8', hint: 'funny moment' },
];
