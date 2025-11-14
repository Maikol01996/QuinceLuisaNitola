export type Parent = {
  role: "Padre" | "Madre";
  name: string;
};

export type Godparent = {
  name: string;
  role?: string;
};

export type Venue = {
  type: "Ceremonia" | "Recepción";
  name:string;
  address: string;
  lat: number;
  lng: number;
  time: string;
  photoUrl?: string;
  imageHint?: string;
  mapUrl: string;
};

export type ProgramItem = {
  time: string;
  title: string;
  icon: string;
  imageUrl?: string;
};

export type ColorInfo = {
  name: string;
  value: string;
}

export type DressCode = {
  label: string;
  ladies: string;
  gentlemen: string;
  reservedColors?: ColorInfo[];
};

export type GiftInfo = {
  bank: {
    bankName: string;
    accountHolder: string;
    acctOrIban: string;
  };
  registryLabel?: string;
  registryUrl?: string;
};

export type Playlist = {
  provider: "spotify" | "youtube";
  url: string;
  public: boolean;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  timezone: string;
  hero: {
    headline: string;
    musicUrl?: string;
    backgroundStyle: "particles" | "gradient" | "parallax";
  };
  parents: Parent[];
  padrinos: Godparent[];
  venues: Venue[];
  program: ProgramItem[];
  dressCode: DressCode;
  gifts: GiftInfo;
  suggestions: {
    hotels: { name: string; phone: string; mapUrl: string }[];
    tourism: string[];
  };
  playlist: Playlist;
  hashtag: string;
  mediaWallEnabled: boolean;
  visibility: "private" | "public";
};

export type Guest = {
  id: string;
  eventId: string;
  name: string;
  email?: string;
  phone?: string;
  maxSeats: number;
  code: string;
  status: "invited" | "confirmed" | "declined" | "pending";
  notes?: string;
  rsvpId?: string;
};

export type Rsvp = {
  id: string;
  eventId: string;
  guestId: string;
  attending: boolean;
  totals: { adults: number; kids: number };
  attendees: { fullName: string; type: "adult" | "kid" }[];
  allergies?: string;
  needsBus?: boolean;
  messageForLuisa?: string;
  createdAt: Date;
};
