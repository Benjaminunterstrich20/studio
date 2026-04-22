export type Category = 'Aktuelles' | 'Schule' | 'Archiv';

export type Article = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  category: Category;
  author: string;
  authorId: string;
  publishedAt: any; // Can be Date, ISO string, or Firestore Timestamp
  updatedAt?: any;
  prioritized: boolean;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export const navItems = [
  { name: 'Aktuelles', href: '/news' },
  { name: 'Schule', href: '/school-life' },
  { name: 'Archiv', href: '/archive' },
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
