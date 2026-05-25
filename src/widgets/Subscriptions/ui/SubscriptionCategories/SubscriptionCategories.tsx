import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@app/context/CategoriesContext.tsx';

import type { Dispatch, FC, SetStateAction } from 'react';

import styles from './SubscriptionCategories.module.scss';

export type SubscriptionCategoriesProps = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export const SubscriptionCategories: FC<SubscriptionCategoriesProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { t } = useTranslation();

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
          {t(`categories.${category.name || 'OTHER'}`)}
        </button>
      ))}
    </div>
  );
};
