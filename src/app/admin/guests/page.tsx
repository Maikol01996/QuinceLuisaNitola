import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, PlusCircle, QrCode, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { guestsData } from '@/lib/data';
import type { Guest } from '@/lib/types';

const statusVariant: Record<Guest['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
  invited: 'outline',
  confirmed: 'default',
  declined: 'destructive',
  pending: 'secondary',
};

const statusLabel: Record<Guest['status'], string> = {
    invited: 'Invitado',
    confirmed: 'Confirmado',
    declined: 'Declinado',
    pending: 'Pendiente',
}

export default function GuestManagementPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle>Gestor de Invitados</CardTitle>
                <CardDescription>
                Administra tu lista de invitados, genera enlaces y exporta datos.
                </CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
                <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Importar CSV</Button>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Añadir Invitado</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Cupos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Código</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guestsData.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>{guest.maxSeats}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[guest.status]}>{statusLabel[guest.status]}</Badge>
                </TableCell>
                <TableCell className="font-mono">{guest.code}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" title="Enviar enlace">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Ver QR">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
