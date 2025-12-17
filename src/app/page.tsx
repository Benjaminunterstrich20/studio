'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { articles } from '@/lib/data';
import type { Article } from '@/lib/data';

export default function Home() {
  const prioritizedArticles = articles.filter((a) => a.prioritized).slice(0, 2);
  const latestArticles = articles.filter((a) => !a.prioritized).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 animate-fade-in-up">
        <h1 className="mb-6 font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Wichtige Ankündigungen
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {prioritizedArticles.map((article, index) => (
            <div
              key={article.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ArticleCard article={article} isFeatured />
            </div>
          ))}
        </div>
      </section>

      <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
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
          {latestArticles.map((article, index) => (
            <div
              key={article.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150 + 450}ms` }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
