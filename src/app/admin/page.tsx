import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { guestsData } from '@/lib/data';
import type { Guest } from '@/lib/types';
import { Users, CheckCircle, XCircle, Hourglass, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const totalGuests = guestsData.length;
  const confirmed = guestsData.filter(g => g.status === 'confirmed').length;
  const declined = guestsData.filter(g => g.status === 'declined').length;
  const pending = guestsData.filter(g => g.status === 'pending' || g.status === 'invited').length;

  const totalSeats = guestsData.reduce((sum, g) => sum + g.maxSeats, 0);

  const stats = [
    { title: 'Invitaciones Enviadas', value: totalGuests, icon: Mail, color: 'text-blue-500' },
    { title: 'Confirmados', value: confirmed, icon: CheckCircle, color: 'text-green-500' },
    { title: 'Declinados', value: declined, icon: XCircle, color: 'text-red-500' },
    { title: 'Pendientes', value: pending, icon: Hourglass, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Resumen de Asistentes</CardTitle>
                <CardDescription>Basado en el cupo máximo por invitación.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="text-4xl font-bold flex items-center gap-2">
                    <Users className="h-8 w-8 text-primary"/>
                    {totalSeats} Cupos Totales
                </div>
                <p className="text-xs text-muted-foreground mt-1">Este es el número máximo de personas esperadas.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Próximos Pasos</CardTitle>
                <CardDescription>Acciones recomendadas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>1. Enviar recordatorios a los invitados pendientes.</p>
                <p>2. Revisar las solicitudes de canciones.</p>
                <p>3. Moderar las fotos de la galería.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
