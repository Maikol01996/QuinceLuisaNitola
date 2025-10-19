'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { GiftInfo } from '@/lib/types';

type GiftsProps = {
  gifts: GiftInfo;
};

export function Gifts({ gifts }: GiftsProps) {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const { toast } = useToast();

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${field} copiado`,
      description: `El ${field.toLowerCase()} ha sido copiado a tu portapapeles.`,
    });
  };

  return (
    <section id="regalos" className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-headline text-4xl md:text-5xl text-center mb-4">
          Regalos
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Tu presencia es mi mayor regalo, pero si deseas obsequiarme algo, aquí tienes algunas opciones.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {gifts.registryUrl && gifts.registryLabel && (
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 font-headline text-2xl">
                  <Gift className="text-primary" />
                  Mesa de Regalos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{gifts.registryLabel}</p>
                <Button asChild>
                  <a href={gifts.registryUrl} target="_blank" rel="noopener noreferrer">
                    Ver Opciones
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 font-headline text-2xl">
                <CreditCard className="text-accent" />
                Lluvia de Sobres
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!showBankDetails ? (
                <>
                  <p className="mb-4">Si prefieres, puedes dar tu obsequio en efectivo.</p>
                  <Button variant="outline" onClick={() => setShowBankDetails(true)}>
                    Ver datos para transferencia
                  </Button>
                </>
              ) : (
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{gifts.bank.bankName}</p>
                      <p className="text-sm text-muted-foreground">Banco</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{gifts.bank.accountHolder}</p>
                      <p className="text-sm text-muted-foreground">Titular</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold font-mono">{gifts.bank.acctOrIban}</p>
                      <p className="text-sm text-muted-foreground">Cuenta de Ahorros</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(gifts.bank.acctOrIban, 'Número de cuenta')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
