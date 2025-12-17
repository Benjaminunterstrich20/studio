'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { useCollection, useFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { Article } from '@/lib/data';

export default function Home() {
  const { firestore } = useFirebase();

  const articlesRef = collection(firestore, 'articles');
  const articlesQuery = query(
    articlesRef,
    orderBy('publishedAt', 'desc'),
    limit(8)
  );

  const { data: articles, isLoading } = useCollection<Article>(articlesQuery);

  if (isLoading) {
    return <div>Wird geladen...</div>;
  }

  const prioritizedArticles = articles?.filter((a) => a.prioritized).slice(0, 2) || [];
  const latestArticles = articles?.filter((a) => !a.prioritized).slice(0, 6) || [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12">
        <h1 className="mb-6 font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Wichtige Ankündigungen
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {prioritizedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} isFeatured />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            Aktuelle Nachrichten
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/news">
              Alle ansehen <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
