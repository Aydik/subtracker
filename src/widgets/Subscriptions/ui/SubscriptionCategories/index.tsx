import { type FC, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useCategories } from '@app/context/CategoriesContext.tsx';
import { CATEGORIES_LOCALIZATION } from '@shared/types/Categories.ts';

export const SubscriptionCategories: FC = () => {
  const { categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

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
