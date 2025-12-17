import { ArticleCard } from '@/components/article-card';
import { articles } from '@/lib/data';

export default function AnnouncementsPage() {
  const announcementArticles = articles.filter(
    (article) => article.category === 'Ankündigungen'
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
          Ankündigungen
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Wichtige Updates und Hinweise für Schüler, Eltern und Mitarbeiter.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {announcementArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
