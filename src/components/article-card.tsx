import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format, fromUnixTime } from 'date-fns';
import { de } from 'date-fns/locale';

type ArticleCardProps = {
  article: Article;
  isFeatured?: boolean;
};

export function ArticleCard({ article, isFeatured = false }: ArticleCardProps) {
  const imageUrl = article.imageUrl || 'https://picsum.photos/seed/placeholder/600/400';

  // Firestore timestamps can be complex. Handle both server and client-side timestamps.
  const getPublishedDate = () => {
    if (!article.publishedAt) return new Date();
    // It's a Firestore Timestamp object on the server, or after fetch.
    if (typeof article.publishedAt === 'object' && 'seconds' in article.publishedAt) {
      // @ts-ignore
      return fromUnixTime(article.publishedAt.seconds);
    }
    // It's an ISO string if just created on the client.
    return new Date(article.publishedAt);
  };

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className={cn('p-6', isFeatured ? 'sm:p-8' : 'p-6')}>
          <Badge variant="secondary" className="mb-2">
            {article.category}
          </Badge>
          <h3
            className={cn(
              'font-headline font-semibold tracking-tight text-foreground',
              isFeatured ? 'text-2xl' : 'text-xl'
            )}
          >
            {article.title}
          </h3>
          {article.subtitle && (
            <p className="mt-2 text-muted-foreground">{article.subtitle}</p>
          )}
        </CardContent>
        <CardFooter className={cn('pb-6', isFeatured ? 'sm:px-8 sm:pb-8' : 'px-6 pb-6')}>
          <p className="text-sm text-muted-foreground">
             {article.author ? `Von ${article.author} • ` : ''}
            {format(getPublishedDate(), 'd. MMMM yyyy', { locale: de })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
