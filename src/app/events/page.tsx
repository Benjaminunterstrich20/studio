import { EventCalendar } from '@/components/event-calendar';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Kommende Veranstaltungen
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bleiben Sie über Schulveranstaltungen, Feiertage und wichtige Termine auf dem Laufenden.
        </p>
      </header>
      <EventCalendar />
    </div>
  );
}
