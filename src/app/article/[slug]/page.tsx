'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { useArticles } from '@/context/articles-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { articles } = useArticles();

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const placeholderImage = PlaceHolderImages.find(
    (img) => img.id === article.imageId
  );
  const imageUrl =
    article.imageId && placeholderImage
      ? placeholderImage.imageUrl
      : 'https://picsum.photos/seed/placeholder/1200/800';
  const imageHint =
    article.imageId && placeholderImage
      ? placeholderImage.imageHint
      : 'placeholder';

  return (
    <article className="container mx-auto max-w-4xl px-4 py-8 md:py-12 animate-fade-in-up">
      <div className="mb-8">
        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="rounded-lg object-cover"
            data-ai-hint={imageHint}
          />
        </div>
        <Badge variant="secondary" className="mb-2">
          {article.category}
        </Badge>
        <h1 className="mb-4 font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {article.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {article.author ? `Von ${article.author} • ` : ''}
          {format(parseISO(article.publishedAt), 'd. MMMM yyyy', { locale: de })}
        </p>
      </div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p>{article.content}</p>
      </div>
    </article>
  );
}
