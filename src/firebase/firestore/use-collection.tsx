'use client';

import { useState, useEffect } from 'react';
import {
  onSnapshot,
  type Query,
  type DocumentData,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection<T extends DocumentData>(
  query: Query<T> | null,
  collectionPath?: string
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setData([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(docs);
        setLoading(false);
      },
      (err: any) => {
        if (err.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
              path: collectionPath || 'unknown collection',
              operation: 'list',
            });
            errorEmitter.emit('permission-error', permissionError);
        } else {
            // For other errors (like missing index), we want to see the original error
            // in the Next.js development overlay.
            if (process.env.NODE_ENV === 'development') {
                throw err;
            }
            console.error("Firestore query failed:", err);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query, collectionPath]);

  return { data, loading };
}
