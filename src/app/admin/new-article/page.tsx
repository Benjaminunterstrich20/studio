'use client';

import { useForm, zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useFirebase, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { navItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const articleSchema = z.object({
  title: z.string().min(1, 'Titel ist erforderlich'),
  content: z.string().min(1, 'Inhalt ist erforderlich'),
  category: z.string().min(1, 'Kategorie ist erforderlich'),
  imageId: z.string().optional(),
  prioritized: z.boolean().default(false),
});

export default function NewArticlePage() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      imageId: '',
      prioritized: false,
    },
  });

  if (isUserLoading) {
    return <div>Wird geladen...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const onSubmit = async (values: z.infer<typeof articleSchema>) => {
    try {
      const slug = values.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/[\s-]+/g, '-');
      const articleRef = doc(collection(firestore, 'articles'), slug);
      await setDoc(articleRef, {
        ...values,
        slug,
        author: user.displayName || 'Anonym',
        authorId: user.uid,
        publishedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: 'Artikel erstellt!',
        description: 'Ihr neuer Artikel wurde erfolgreich veröffentlicht.',
      });
      router.push(`/article/${slug}`);
    } catch (error) {
      console.error('Fehler beim Erstellen des Artikels', error);
      toast({
        variant: 'destructive',
        title: 'Oh oh! Etwas ist schief gelaufen.',
        description:
          'Der Artikel konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',
      });
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <h1 className="mb-8 font-headline text-3xl font-bold">
        Neuen Artikel erstellen
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Artikelüberschrift" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inhalt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Schreiben Sie hier Ihren Artikel..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategorie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie eine Kategorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {navItems.map((item) => (
                      <SelectItem key={item.href} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vorschaubild</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie ein Bild" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PlaceHolderImages.map((image) => (
                      <SelectItem key={image.id} value={image.id}>
                        {image.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prioritized"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Priorisierter Artikel</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Priorisierte Artikel werden auf der Startseite hervorgehoben.
                  </p>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Artikel veröffentlichen</Button>
        </form>
      </Form>
    </div>
  );
}
