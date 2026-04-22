import type { Dispatch, FC, SetStateAction } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useCategories } from '@app/context/CategoriesContext.tsx';
import { CATEGORIES_LOCALIZATION } from '@shared/types/Categories.ts';

interface Props {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export const SubscriptionCategories: FC<Props> = ({ selectedCategory, setSelectedCategory }) => {
  const { categories } = useCategories();

  return (
    <div className={styles.subscriptionCategories}>
      {[{ name: 'ALL' }, ...categories].map((category) => (
        <button
          key={category.name}
          className={clsx(
            styles.categoryButton,
            selectedCategory === category.name ? styles.categoryButton_active : undefined,
          )}
          onClick={() => category.name && setSelectedCategory(category.name)}
        >
          {CATEGORIES_LOCALIZATION[category.name || 'OTHER']}
        </button>
      ))}
    </div>
  );
};
