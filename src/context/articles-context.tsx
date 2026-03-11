'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { type Article } from '@/lib/data';

interface ArticlesContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
}

const ArticlesContext =
  createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedArticles = localStorage.getItem('articles');
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      }
    } catch (e) {
      console.error('Could not load articles from local storage', e);
    }
    setIsInitialLoad(false);
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Save to localStorage on change, but not on initial load
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }, [articles, isInitialLoad]);

  const addArticle = (article: Article) => {
    setArticles((prevArticles) => [article, ...prevArticles]);
  };

  return (
    <ArticlesContext.Provider value={{ articles, addArticle }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
}
