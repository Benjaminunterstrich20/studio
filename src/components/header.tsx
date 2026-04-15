'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ExternalLink,
  Menu,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { useState } from 'react';
import { useUser } from '@/firebase';

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {children}
    </Link>
  );
}

function MainNav() {
  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Navigationsmenü umschalten</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-8">
          <Logo />
          <div className="flex flex-col gap-4">
             <a
              href="https://hardtberg-gymnasium.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Schulwebseite
              <ExternalLink className="ml-auto h-4 w-4" />
            </a>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const isMobile = useIsMobile();
  const { user, loading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Logo />
        </div>

        <MainNav />

        <div className="flex flex-1 items-center justify-end gap-4">
          {!isMobile && (
            <Button asChild>
              <a
                href="https://hardtberg-gymnasium.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schulwebseite
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
