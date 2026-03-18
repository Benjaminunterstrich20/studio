'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { useArticleStore } from '@/lib/articles';

export default function Home() {
  const { getArticles, loading } = useArticleStore();
  const articles = getArticles().slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Aktuelle Nachrichten
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/news">
              Alle ansehen <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {loading && <p>Lade Artikel...</p>}
        {!loading && articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150 + 450}ms` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="py-16 text-center text-muted-foreground">
              <p>Noch keine Artikel vorhanden.</p>
              <p>
                Erstellen Sie Ihren ersten Artikel auf der Seite &quot;Neuer
                Artikel&quot;.
              </p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
