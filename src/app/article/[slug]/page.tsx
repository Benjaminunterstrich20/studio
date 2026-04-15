'use client';

import { useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { collection, query, where, limit } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { format, fromUnixTime } from 'date-fns';
import { de } from 'date-fns/locale';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useFirestore, useCollection } from '@/firebase';
import type { Article } from '@/lib/data';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const db = useFirestore();

  const articleQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'articles'), where('slug', '==', slug), limit(1));
  }, [db, slug]);

  const { data: articles, loading } = useCollection<Article>(articleQuery);
  const article = articles?.[0];

  if (loading) {
    return <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">Laden...</div>;
  }

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
    <article className="container mx-auto max-w-4xl px-4 py-8 md:py-12 animate-fade-in-up">
      <div className="mb-8">
        <div className="relative mb-8 w-full overflow-hidden rounded-lg aspect-video">
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
          {format(getPublishedDate(), 'd. MMMM yyyy', { locale: de })}
        </p>
      </div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p>{article.content}</p>
      </div>
    </article>
  );
}
