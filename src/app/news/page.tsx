'use client';

import { ArticleCard } from '@/components/article-card';
import { useArticles } from '@/context/articles-context';

export default function NewsPage() {
  const { articles } = useArticles();
  const newsArticles = articles.filter(
    (article) => article.category === 'Nachrichten'
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
          Nachrichten
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Die neuesten Updates und Geschichten aus unserer Schulgemeinschaft.
        </p>
      </header>
      {newsArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Keine Nachrichtenartikel gefunden.</p>
      )}
    </div>
  );
}
