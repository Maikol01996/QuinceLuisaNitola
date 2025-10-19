import type { Event, Guest } from './types';

export const eventData: Event = {
  id: 'luisa-xv-2025',
  title: 'XV de Luisa Nitola',
  date: new Date('2025-12-14T16:00:00-05:00'),
  timezone: 'America/Bogota',
  hero: {
    headline: 'Mis 15 Años',
    backgroundStyle: 'parallax',
  },
  parents: [
    { role: 'Padre', name: 'Carlos Nitola' },
    { role: 'Madre', name: 'Maria Rodriguez' },
  ],
  padrinos: [
    { name: 'Juan Gonzalez', role: 'Padrino' },
    { name: 'Ana Perez', role: 'Madrina' },
  ],
  venues: [
    {
      type: 'Ceremonia',
      name: 'Parroquia de Nuestra Señora de Chiquinquirá',
      address: 'Cra. 13 #51-53, Bogotá, Colombia',
      lat: 4.6377,
      lng: -74.064,
      time: '16:00',
      photoUrl: 'https://picsum.photos/seed/ceremony/800/600',
      imageHint: 'church interior',
      mapUrl: 'https://maps.app.goo.gl/g2d5Yk2z5GqN8Xqf9',
    },
    {
      type: 'Recepción',
      name: 'Club El Nogal',
      address: 'Cra. 7 #78-96, Bogotá, Colombia',
      lat: 4.6625,
      lng: -74.05,
      time: '18:00',
      photoUrl: 'https://picsum.photos/seed/reception/800/600',
      imageHint: 'event hall',
      mapUrl: 'https://maps.app.goo.gl/f7hN1rT5wJ9k4KxP7',
    },
  ],
  program: [
    { time: '16:00', title: 'Ceremonia Religiosa', icon: 'Church' },
    { time: '17:30', title: 'Fotografías', icon: 'Camera' },
    { time: '18:00', title: 'Recepción y Cóctel', icon: 'Cocktail' },
    { time: '19:00', title: 'Cena', icon: 'Dinner' },
    { time: '20:00', title: 'Vals y Brindis', icon: 'Champagne' },
    { time: '21:00', title: 'Fiesta y Baile', icon: 'Music' },
    { time: '02:00', title: 'Fin de la Fiesta', icon: 'Moon' },
  ],
  dressCode: {
    label: 'Etiqueta (Formal)',
    palette: ['#F6D1E7', '#D3E4FD', '#FFF3C4'],
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
    url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
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
