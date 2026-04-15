'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useToast } from '@/hooks/use-toast';
import { navItems, type Category } from '@/lib/data';
import { useUser, useFirestore } from '@/firebase';
import { addArticle } from '@/firebase/firestore/articles';

const articleSchema = z.object({
  title: z.string().min(1, 'Titel ist erforderlich'),
  subtitle: z.string().optional(),
  content: z.string().min(1, 'Inhalt ist erforderlich'),
  category: z.string().min(1, 'Kategorie ist erforderlich'),
  imageUrl: z.string().url('Bitte geben Sie eine gültige URL ein.').optional().or(z.literal('')),
  prioritized: z.boolean().default(false),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function NewArticlePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: userLoading } = useUser();
  const db = useFirestore();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      content: '',
      category: '',
      imageUrl: '',
      prioritized: false,
    },
  });

  const onSubmit = async (values: ArticleFormValues) => {
    if (!db || !user) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Benutzer oder Datenbank nicht verfügbar.',
      });
      return;
    }

    try {
      const newArticle = await addArticle(db, user.uid, 'Benni', {
        ...values,
        category: values.category as Category,
      });
      toast({
        title: 'Artikel erstellt!',
        description: 'Ihr neuer Artikel wurde hinzugefügt.',
      });
      form.reset();
      router.push(`/article/${newArticle.slug}`);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh oh! Etwas ist schief gelaufen.',
        description: error.message || 'Der Artikel konnte nicht gespeichert werden.',
      });
    }
  };

  if (userLoading || !user) {
    return (
       <div className="container mx-auto px-4 py-8">
        <p>Laden...</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12 animate-fade-in-up">
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
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Untertitel</FormLabel>
                <FormControl>
                  <Input placeholder="Eine kurze Vorschau des Artikels" {...field} />
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
                    {navItems
                      .filter((item) => item.name !== 'Archiv')
                      .map((item) => (
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bild-URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://beispiel.com/bild.jpg" {...field} />
                </FormControl>
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
             {form.formState.isSubmitting ? 'Veröffentlichen...' : 'Artikel veröffentlichen'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
