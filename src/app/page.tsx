import { eventData } from '@/lib/data';
import { Hero } from './components/hero';
import { Countdown } from './components/countdown';
import { FamilySection } from './components/family';
import { Venues } from './components/venues';
import { Timeline } from './components/timeline';
import { DressCode } from './components/dress-code';
import { Gifts } from './components/gifts';
import { Music } from './components/music';
import { RsvpSection } from './components/rsvp-section';
import { AppFooter } from './components/footer';
import { BottomNav } from './components/bottom-nav';
import { Suspense } from 'react';
import { PhotoGallery } from './components/photo-gallery';

export default function Home() {
  const { hero, date, parents, padrinos, venues, program, dressCode, gifts, playlist, hashtag } = eventData;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero headline={hero.headline} date={date} />
        
        <div className="relative z-10 bg-background space-y-16 md:space-y-24 pb-16 md:pb-24">
          <Suspense fallback={null}>
            <Countdown date={date} />
          </Suspense>
          <FamilySection parents={parents} padrinos={padrinos} />
          <Venues venues={venues} />
          <Timeline items={program} />
          <DressCode dressCode={dressCode} />
          <Gifts gifts={gifts} />
          <Music playlist={playlist} />
          <PhotoGallery />
          <RsvpSection />
        </div>
      </main>
      <AppFooter hashtag={hashtag} />
      <BottomNav />
    </div>
  );
}
