'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirebase } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { auth } = useFirebase();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/admin/new-article');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Anmelden</CardTitle>
          <CardDescription>
            Melden Sie sich an, um neue Artikel zu erstellen und zu verwalten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button onClick={handleGoogleSignIn} variant="outline">
              Mit Google anmelden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
