import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flash School News. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
