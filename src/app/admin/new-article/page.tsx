'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
import { useUser, useFirestore, useFirebaseApp } from '@/firebase';
import { addArticle } from '@/firebase/firestore/articles';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Progress } from '@/components/ui/progress';
import { UploadCloud } from 'lucide-react';


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
  const app = useFirebaseApp();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


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

  useEffect(() => {
    if (!imageFile || !app) return;
    const storage = getStorage(app);
    const storageRef = ref(storage, `articles/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    setUploadProgress(0);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        },
        (error) => {
            console.error("Upload failed:", error);
            toast({
                variant: 'destructive',
                title: 'Upload fehlgeschlagen',
                description: 'Das Bild konnte nicht hochgeladen werden.',
            });
            setUploadProgress(null);
            setImagePreview(null);
            setImageFile(null);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                toast({
                  title: 'Upload erfolgreich!',
                  description: 'Das Bild wurde hochgeladen.',
                });
                form.setValue('imageUrl', downloadURL, { shouldValidate: true });
                setImagePreview(downloadURL);
                setUploadProgress(null);
            });
        }
    );
  }, [imageFile, app, form, toast]);

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

  const handleFileSelect = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
        setImageFile(file);
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(URL.createObjectURL(file));
    } else if (file) {
        toast({
          variant: 'destructive',
          title: 'Ungültiger Dateityp',
          description: 'Bitte wählen Sie eine Bilddatei aus.',
        })
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
        handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
        handleFileSelect(files[0]);
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
            render={() => (
              <FormItem>
                <FormLabel>Artikelbild</FormLabel>
                <FormControl>
                  <div
                    className="relative flex justify-center w-full h-64 p-2 border-2 border-dashed rounded-lg cursor-pointer border-muted-foreground/50 hover:border-primary transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Vorschau" fill className="object-contain rounded-lg" />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <UploadCloud className="w-12 h-12 mb-2" />
                            <p className="text-sm">Bild hierher ziehen</p>
                            <p className="text-xs">oder klicken zum Auswählen</p>
                        </div>
                    )}
                    {uploadProgress !== null && (
                        <div className="absolute bottom-2 left-2 right-2">
                            <Progress value={uploadProgress} className="w-full h-2" />
                             <p className="text-xs text-center text-white mt-1">{Math.round(uploadProgress)}%</p>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileInputChange}
                    />
                  </div>
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
          <Button type="submit" disabled={form.formState.isSubmitting || uploadProgress !== null}>
             {form.formState.isSubmitting ? 'Veröffentlichen...' : 'Artikel veröffentlichen'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
