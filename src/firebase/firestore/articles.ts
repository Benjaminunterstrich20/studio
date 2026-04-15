'use client';
import {
  addDoc,
  collection,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import type { Article } from '@/lib/data';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

type ArticleData = Omit<Article, 'id' | 'slug' | 'publishedAt' | 'author'>;

export async function addArticle(
  db: Firestore,
  authorId: string,
  authorName: string,
  articleData: ArticleData
) {
  const slug = articleData.title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const articleCollection = collection(db, 'articles');

  const newArticlePayload = {
    ...articleData,
    slug,
    author: authorName,
    authorId: authorId,
    publishedAt: serverTimestamp(),
    imageId: articleData.imageId || 'school-building',
  };

  try {
    const docRef = await addDoc(articleCollection, newArticlePayload);
    return { ...newArticlePayload, id: docRef.id, slug: slug };
  } catch (e: any) {
     if (e.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: articleCollection.path,
          operation: 'create',
          requestResourceData: newArticlePayload,
        });
        errorEmitter.emit('permission-error', permissionError);
     }
     // Re-throw other errors
     throw e;
  }
}
