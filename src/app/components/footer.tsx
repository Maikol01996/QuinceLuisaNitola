import { Card, CardContent } from "@/components/ui/card";

type AppFooterProps = {
  hashtag: string;
};

export function AppFooter({ hashtag }: AppFooterProps) {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 text-center text-secondary-foreground">
        <h3 className="font-headline text-3xl font-bold text-primary">{hashtag}</h3>
        <p className="mt-2">&copy; {new Date().getFullYear()} Luisa Nitola. Todos los derechos reservados.</p>
        <p className="text-sm mt-4">Diseñado con ♥</p>
      </div>
    </footer>
  );
}
