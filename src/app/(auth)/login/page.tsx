import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PartyPopper } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <PartyPopper className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-headline">Admin Console</CardTitle>
          <CardDescription>
            Ingresa tu email para recibir un enlace de acceso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar enlace mágico
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
