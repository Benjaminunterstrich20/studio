import { notFound } from 'next/navigation';
import Image from 'next/image';
import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const placeholderImage = PlaceHolderImages.find(
    (img) => img.id === article.imageId
  );
  const imageUrl = placeholderImage?.imageUrl ?? 'https://picsum.photos/seed/placeholder/1200/800';
  const imageHint = placeholderImage?.imageHint ?? 'placeholder';

  return (
    <article className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8">
        <div className="relative mb-8 h-96 w-full rounded-lg">
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
          Von {article.author} • {format(parseISO(article.publishedAt), 'd. MMMM yyyy', { locale: de })}
        </p>
      </div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p>{article.content}</p>
      </div>
    </article>
  );
}
