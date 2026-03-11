'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { type Article } from '@/lib/data';

interface ArticlesContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);

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
