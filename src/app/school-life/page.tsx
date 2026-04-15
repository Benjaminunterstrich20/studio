'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { ArticleCard } from '@/components/article-card';
import { useFirestore, useCollection } from '@/firebase';
import type { Article } from '@/lib/data';

export default function SchoolLifePage() {
  const db = useFirestore();
  const articlesQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'articles'), where('category', '==', 'Schule'), orderBy('publishedAt', 'desc'));
  }, [db]);

  const { data: schoolLifeArticles, loading } = useCollection<Article>(articlesQuery);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Schule
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ein Einblick in Schüleraktivitäten, Clubs und die Campus-Kultur.
        </p>
      </header>
      {loading && <p>Lade Artikel...</p>}
      {!loading && schoolLifeArticles && schoolLifeArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {schoolLifeArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-muted-foreground">
            Keine Artikel gefunden.
          </p>
        )
      )}
    </div>
  );
}
