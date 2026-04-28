import { createContext, useContext } from 'react';

import { useGetCategoriesQuery } from '@src/store/api/services/subscriptionService.ts';

import type { CategoryResponse } from '@src/api/models';
import type { ReactNode, FC } from 'react';

interface CategoriesContextValue {
  categories: CategoryResponse[];
  isLoading: boolean;
  error: unknown | null;
}

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

type CategoriesProvider = {
  children: ReactNode;
};

export const CategoriesProvider: FC<CategoriesProvider> = ({ children }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery({});

  return (
    <CategoriesContext.Provider value={{ categories: categories || [], isLoading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): CategoriesContextValue => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
