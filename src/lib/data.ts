export type Category = 'Nachrichten' | 'Ankündigungen' | 'Schulleben' | 'Veranstaltungen';

export type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  imageId: string;
  category: Category;
  author: string;
  authorId?: string;
  publishedAt: string;
  prioritized: boolean;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export const navItems = [
  { name: 'Nachrichten', href: '/news' },
  { name: 'Ankündigungen', href: '/announcements' },
  { name: 'Schulleben', href: '/school-life' },
  { name: 'Veranstaltungen', href: '/events' },
];

export const articles: Article[] = [
  {
    id: '1',
    slug: 'willkommen-zurueck-in-der-schule',
    title: 'Willkommen zurück in der Schule!',
    content: 'Ein neues Schuljahr beginnt! Wir freuen uns, alle Schüler und Lehrer wieder auf dem Campus begrüßen zu dürfen. Auf ein erfolgreiches und spannendes Jahr!',
    imageId: 'school-building',
    category: 'Nachrichten',
    author: 'Admin',
    publishedAt: '2024-08-15T10:00:00Z',
    prioritized: false,
  },
  {
    id: '2',
    slug: 'ankuendigung-des-wissenschaftstags',
    title: 'Ankündigung des Wissenschaftstags',
    content: 'Machen Sie sich bereit, Ihre Projekte zu präsentieren! Der jährliche Wissenschaftstag findet nächsten Monat statt. Weitere Details zur Anmeldung folgen in Kürze.',
    imageId: 'science-fair',
    category: 'Ankündigungen',
    author: 'Admin',
    publishedAt: '2024-08-20T14:30:00Z',
    prioritized: false,
  },
];

export const events: Event[] = [
  {
    id: 1,
    title: 'Schulversammlung',
    description: 'Gesamtschulversammlung zum Auftakt des neuen Semesters.',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
  },
  {
    id: 2,
    title: 'Eltern-Lehrer-Konferenzen',
    description: 'Treffen Sie sich mit Lehrern, um den Schülerfortschritt zu besprechen.',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  },
  {
    id: 3,
    title: 'Eltern-Lehrer-Konferenzen',
    description: 'Treffen Sie sich mit Lehrern, um den Schülerfortschritt zu besprechen.',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
  },
  {
    id: 4,
    title: 'Heimkehr-Fußballspiel',
    description: 'Feuern Sie die Heimmannschaft an!',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
  },
  {
    id: 5,
    title: 'Winter-Bandkonzert',
    description: 'Genießen Sie einen Abend mit Musik von unseren talentierten Schülern.',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 12),
  },
];
