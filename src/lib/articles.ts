'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Article, Category } from './data';
import { articles as initialArticles } from './data';

// This is a simple in-memory store for articles.
// In a real application, this would be a database.
let memoryArticles: Article[] = [...initialArticles];

function useArticleStore() {
  const [articles, setArticles] = useState<Article[]>(memoryArticles);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // This effect runs once on the client to sync state
    // with the module-level 'memoryArticles' variable.
    if (!isInitialized) {
      setArticles(memoryArticles);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const addArticle = useCallback((newArticleData: Omit<Article, 'id' | 'slug' | 'publishedAt' | 'author'>) => {
    const slug = newArticleData.title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const newArticle: Article = {
      ...newArticleData,
      id: Date.now().toString(),
      slug: slug,
      author: 'Admin', // Or get from logged in user
      publishedAt: new Date().toISOString(),
      imageId: newArticleData.imageId || 'school-building',
    };

    memoryArticles = [newArticle, ...memoryArticles];
    setArticles(memoryArticles);
    return newArticle;
  }, []);

  const getArticles = useCallback(() => {
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [articles]);

  const getArticleBySlug = useCallback((slug: string) => {
    return articles.find(article => article.slug === slug);
  }, [articles]);

  const getArticlesByCategory = useCallback((category: Category) => {
    return articles
      .filter(article => article.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [articles]);

  return {
    articles,
    addArticle,
    getArticles,
    getArticleBySlug,
    getArticlesByCategory,
    loading: !isInitialized,
  };
}

// Export a singleton instance of the store
// This is a simplified approach. For Next.js, especially with server components,
// a more robust state management solution (like Zustand, Redux, or React Context
// with a proper provider setup at the root) is recommended.
// However, for this client-side only example, this works.

// We need a way to share the store instance across components.
// A simple global instance can work for client-side only logic.
// NOTE: This approach is NOT safe for Server Components as it creates shared mutable state.
// Since all our pages are client components ('use client'), this will function correctly.

let articleStoreInstance: ReturnType<typeof useArticleStore>;

export function getArticleStore() {
    // This check is to avoid re-creating the hook's state on every call.
    // However, because React hooks can't be called outside components,
    // this approach is flawed. We will call useArticleStore directly in components.
    console.warn("getArticleStore is a conceptual function and should not be used directly in this implementation. Please use the useArticleStore hook in your components.");
}
export { useArticleStore };
