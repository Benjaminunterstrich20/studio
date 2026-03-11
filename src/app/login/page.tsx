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

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'benni' && password === '12345') {
      // In a real app, you'd use a secure session management system.
      // For this example, we'll use localStorage.
      localStorage.setItem('isLoggedIn', 'true');
      toast({
        title: 'Anmeldung erfolgreich',
        description: 'Sie werden weitergeleitet.',
      });
      router.push('/admin/new-article');
    } else {
      toast({
        variant: 'destructive',
        title: 'Anmeldung fehlgeschlagen',
        description: 'Falscher Benutzername oder falsches Passwort.',
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
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                type="text"
                placeholder="benni"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
      </Card>
    </div>
  );
}
