import { createContext, useContext, type ReactNode, type FC } from 'react';
import type { CategoryResponse } from '@src/api/models';
import { useGetCategoriesQuery } from '@src/store/api/services/subscriptionService.ts';

interface CategoriesContextValue {
  categories: CategoryResponse[];
  isLoading: boolean;
  error: unknown | null;
}

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export const CategoriesProvider: FC<Props> = ({ children }) => {
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
