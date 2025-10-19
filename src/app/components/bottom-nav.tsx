import Link from 'next/link';
import { Home, Calendar, Gift, Music, CheckCircle } from 'lucide-react';

const navItems = [
  { href: '#', icon: Home, label: 'Inicio' },
  { href: '#detalles', icon: Calendar, label: 'Detalles' },
  { href: '#regalos', icon: Gift, label: 'Regalos' },
  { href: '#musica', icon: Music, label: 'Música' },
  { href: '#rsvp', icon: CheckCircle, label: 'RSVP' },
];

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around h-16">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors gap-1 flex-1">
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
