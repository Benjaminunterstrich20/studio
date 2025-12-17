"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  Menu,
  Search,
  PlusCircle,
  LogOut,
  LogIn
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { useUser, useFirebase } from "@/firebase";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}

function MainNav() {
  const { user } = useUser();
  
  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.name}
        </NavLink>
      ))}
       {user && (
        <NavLink href="/admin/new-article">Neuer Artikel</NavLink>
      )}
    </nav>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useUser();

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
            {user && (
               <Link
                href="/admin/new-article"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Neuer Artikel
              </Link>
            )}
          </nav>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Artikel suchen..." className="pl-9" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const isMobile = useIsMobile();
  const { user, isUserLoading } = useUser();
  const { auth } = useFirebase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Logo />
        </div>
        
        <MainNav />
        
        <div className="flex flex-1 items-center justify-end gap-4">
          {!isMobile && (
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Artikel suchen..." className="pl-9" />
            </div>
          )}

          <Button asChild>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              Schulwebseite
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>

          {!isUserLoading && (
            <>
              {user ? (
                <>
                  {!isMobile && (
                    <Button variant="outline" asChild>
                      <Link href="/admin/new-article">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Neuer Artikel
                      </Link>
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => auth.signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Abmelden
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Anmelden
                  </Link>
                </Button>
              )}
            </>
          )}

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
