import { EventCalendar } from '@/components/event-calendar';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
          Upcoming Events
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Stay up-to-date with school events, holidays, and important dates.
        </p>
      </header>
      <EventCalendar />
    </div>
  );
}
