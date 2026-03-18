'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, LogOut } from 'lucide-react';
import { Logo } from './logo';
import { Button } from './ui/button';

export function Footer() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We need to check this on the client side
    const checkStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setLoading(false);
    };
    checkStatus();
    // Listen for storage changes to update UI across components
    window.addEventListener('storage', checkStatus);
    return () => window.removeEventListener('storage', checkStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    // Manually trigger a storage event so the header updates
    window.dispatchEvent(new Event("storage"));
    router.push('/');
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-4">
          <Logo />
          {!loading && (
            <>
              {isLoggedIn ? (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2">Abmelden</span>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4" />
                    <span className="ml-2">Anmelden</span>
                  </Link>
                </Button>
              )}
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flash Schulnachrichten. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
