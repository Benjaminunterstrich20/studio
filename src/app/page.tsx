import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/lib/data';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const prioritizedArticles = articles.filter((a) => a.prioritized).slice(0, 2);
  const latestArticles = articles.filter((a) => !a.prioritized).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12">
        <h1 className="mb-6 font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Important Announcements
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
            Latest News
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/news">
              View all <ArrowRight className="ml-2 h-4 w-4" />
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
