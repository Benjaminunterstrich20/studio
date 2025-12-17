"use client";

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/lib/data';
import { format } from 'date-fns';
import { Badge } from './ui/badge';

export function EventCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const selectedDayEvents = React.useMemo(() => {
    if (!date) return [];
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  }, [date]);

  const eventDays = React.useMemo(() => events.map(e => e.date), []);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
              modifiers={{ event: eventDays }}
              modifiersStyles={{
                event: {
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Events for{' '}
              {date ? format(date, 'MMMM d, yyyy') : 'selected date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayEvents.length > 0 ? (
              <ul className="space-y-4">
                {selectedDayEvents.map((event) => (
                  <li key={event.id} className="flex flex-col rounded-lg border p-4">
                      <span className="font-semibold">{event.title}</span>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No events scheduled for this day.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
