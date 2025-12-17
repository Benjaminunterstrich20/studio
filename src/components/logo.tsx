import Link from 'next/link';
import { Bolt } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
      <div className="rounded-lg bg-primary p-2">
        <Bolt className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-headline text-xl font-semibold tracking-tight text-foreground">
        flash
      </span>
    </Link>
  );
}
