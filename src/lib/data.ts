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
    slug: 'new-school-year-kickoff',
    title: 'Neues Schuljahr beginnt mit jährlicher Versammlung',
    content:
      'Unser Schuljahr begann mit einer inspirierenden Versammlung, die neue und wiederkehrende Schüler willkommen hieß. Rektor Thompson skizzierte die Vision für das Jahr und betonte Gemeinschaft und akademische Exzellenz. Wir sind gespannt auf das, was vor uns liegt!',
    imageId: 'auditorium',
    category: 'Ankündigungen',
    author: 'Verwaltungsbüro',
    publishedAt: '2023-09-01',
    prioritized: true,
  },
  {
    id: '2',
    slug: 'parent-teacher-conferences-schedule',
    title: 'Eltern-Lehrer-Konferenzen für Oktober geplant',
    content:
      'Merken Sie sich das Datum vor! Die Eltern-Lehrer-Konferenzen finden am 15. und 16. Oktober statt. Dies ist eine großartige Gelegenheit, den Fortschritt Ihres Kindes zu besprechen. Anmeldelisten werden nächste Woche online verfügbar sein.',
    imageId: 'classroom',
    category: 'Ankündigungen',
    author: 'Beratungsabteilung',
    publishedAt: '2023-09-15',
    prioritized: true,
  },
  {
    id: '3',
    slug: 'varsity-soccer-team-wins-championship',
    title: 'Fußball-Uni-Mannschaft gewinnt Bezirksmeisterschaft',
    content:
      'Herzlichen Glückwunsch an unsere Fußball-Uni-Mannschaft zu ihrem aufregenden 2:1-Sieg im Bezirksfinale! Ihre harte Arbeit und ihr Engagement haben sich ausgezahlt. Das letzte Tor erzielte Senior-Kapitänin Jane Doe in der letzten Spielminute.',
    imageId: 'sports-day',
    category: 'Nachrichten',
    author: 'Sportabteilung',
    publishedAt: '2023-10-28',
    prioritized: false,
  },
  {
    id: '4',
    slug: 'annual-science-fair-showcases-innovation',
    title: 'Jährliche Wissenschaftsmesse zeigt studentische Innovation',
    content:
      'Die diesjährige Wissenschaftsmesse war ein großer Erfolg mit Projekten, die von Lösungen für erneuerbare Energien bis hin zu Robotik reichten. Der Hauptpreis ging an den Zehntklässler Michael Smith für sein Projekt zur Wasserreinigung.',
    imageId: 'science-fair',
    category: 'Schulleben',
    author: 'Wissenschaftsabteilung',
    publishedAt: '2023-11-05',
    prioritized: false,
  },
  {
    id: '5',
    slug: 'meet-the-new-art-teacher',
    title: 'Ein Scheinwerferlicht auf unseren neuen Kunstlehrer, Herrn Evans',
    content:
      'Wir heißen Herrn David Evans, unseren neuen Kunstlehrer, herzlich willkommen. Mit über 10 Jahren Erfahrung bringt er eine Leidenschaft für Kreativität mit und freut sich darauf, die Schüler in unserem neu renovierten Kunstatelier zu inspirieren.',
    imageId: 'art-class',
    category: 'Schulleben',
    author: 'Schülerrat',
    publishedAt: '2023-09-10',
    prioritized: false,
  },
  {
    id: '6',
    slug: 'library-receives-new-book-donation',
    title: 'Bibliothek erhält eine großzügige Spende neuer Bücher',
    content:
      'Dank einer großzügigen Spende eines lokalen Gemeinschaftspartners ist unsere Bibliothek jetzt mit Hunderten von neuen Titeln gefüllt, von klassischer Literatur bis hin zu modernen Bestsellern. Kommen Sie und schauen Sie sie sich an!',
    imageId: 'library',
    category: 'Nachrichten',
    author: 'Frau Gable, Bibliothekarin',
    publishedAt: '2023-10-02',
    prioritized: false,
  },
  {
    id: '7',
    slug: 'upcoming-winter-concert',
    title: 'Machen Sie sich bereit für das jährliche Winterkonzert!',
    content:
      'Die Musikabteilung ist stolz darauf, das bevorstehende Winterkonzert am 12. Dezember anzukündigen. Unsere talentierten Schüler aus Chor, Band und Orchester werden eine Auswahl an festlichen und klassischen Stücken aufführen.',
    imageId: 'auditorium',
    category: 'Veranstaltungen',
    author: 'Musikabteilung',
    publishedAt: '2023-11-20',
    prioritized: false,
  },
  {
    id: '8',
    slug: 'student-collaboration-project',
    title: 'Abteilungsübergreifendes Zusammenarbeitsprojekt ein Erfolg',
    content:
      'Schüler aus den Geschichts- und Informatikabteilungen haben sich zusammengetan, um ein interaktives digitales Museum zur lokalen Geschichte zu erstellen. Das Projekt wurde für seine Innovation und seinen Bildungswert gelobt.',
    imageId: 'students-collaborating',
    category: 'Nachrichten',
    author: 'Technische Abteilung',
    publishedAt: '2023-11-15',
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
