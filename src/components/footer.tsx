'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, LogOut, PlusCircle } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Logo } from './logo';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export function Footer() {
  const router = useRouter();
  const auth = useAuth();
  const { user, loading } = useUser();

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-4">
          <Logo />
           <div className="flex items-center gap-2">
            {loading && <Skeleton className="h-8 w-24" />}
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/admin/new-article">
                        <PlusCircle className="h-4 w-4" />
                        <span className="ml-2 hidden sm:inline">Neuer Artikel</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Abmelden</span>
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">
                      <LogIn className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Anmelden</span>
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flash Schulnachrichten. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
