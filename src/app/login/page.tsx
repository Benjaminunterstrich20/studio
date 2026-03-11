'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Anmeldung erfolgreich',
        description: 'Sie werden weitergeleitet.',
      });
      router.push('/admin/new-article');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Anmeldung fehlgeschlagen',
        description:
          error.code === 'auth/invalid-credential'
            ? 'Falsche E-Mail oder falsches Passwort.'
            : error.message,
      });
    }
  };

  const handleCreateAccount = async () => {
     if (!auth) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Konto erstellt!',
        description: 'Sie können sich jetzt anmelden.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Kontoerstellung fehlgeschlagen',
        description: error.message,
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center bg-background animate-fade-in-up">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin-Anmeldung</CardTitle>
          <CardDescription>
            Melden Sie sich an, um neue Artikel zu erstellen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="benni@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Anmelden
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-4">
           <p className="text-xs text-muted-foreground">Noch kein Konto?</p>
            <Button variant="outline" className="w-full" onClick={handleCreateAccount}>
              Admin-Konto erstellen
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
