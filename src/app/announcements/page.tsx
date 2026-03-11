'use client';

import { ArticleCard } from '@/components/article-card';
import { useArticleStore } from '@/lib/articles';

export default function AnnouncementsPage() {
  const { getArticlesByCategory, loading } = useArticleStore();
  const announcementArticles = getArticlesByCategory('Ankündigungen');

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
      {loading && <p>Lade Ankündigungen...</p>}
      {!loading && announcementArticles && announcementArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {announcementArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-muted-foreground">Keine Ankündigungen gefunden.</p>
        )
      )}
    </div>
  );
}
